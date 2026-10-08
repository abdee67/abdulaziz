import { useMemo, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ExternalLink, Github, Globe, Smartphone } from "lucide-react";
import { Reveal, FadeInStagger, FadeInItem } from "@/components/animations/Reveal";
import {
  PORTFOLIO_DATA,
  type Project,
  type ProjectCategory,
  type ProjectImage,
} from "@/data/portfolio-data";
import { RAIL_GUTTER } from "@/constants";
import { cn } from "@/lib/utils";
import { assetUrl } from "@/lib/asset";
import ProjectImageViewer, { type ViewerState } from "@/components/portfolio/ProjectImageViewer";
import { createPortal } from "react-dom";

/**
 * Media is two elements, not one: a **band** that bleeds to the card edges and
 * a **frame** that owns the aspect ratio. Keeping them separate is what lets
 * `phone` be a narrow centered portrait sitting in a muted strip, while `wide`
 * is a full-bleed banner — with the same wrapper markup either way.
 *
 * The `aspect-*` sits on the frame, so space is reserved before the file
 * downloads and the grid never reflows around an image.
 *
 * - `phone` is 9/19.5, the true iPhone screen ratio, so an uncropped screenshot
 *   fills it exactly. `max-h` clamps that to 24rem so one tall screenshot can't
 *   bury the copy; a source exceeding it gets trimmed from the bottom.
 * - `wide` is 11/5 (2.2), matched to the actual captures (1875–1920 wide ×
 *   814–886 tall, so 2.17–2.33). The previous 16/10 assumed a 16:9-ish browser
 *   shot and would have driven `object-cover` to trim ~20% off the sides of
 *   these.
 *
 * Both use `object-top`, so the *bottom* is always what's trimmed: headlines and
 * nav survive, footers don't. Single phone frames are capped at 14rem because a
 * full-bleed portrait would run ~700px tall; pairs sit side by side instead and
 * are already narrow enough from the grid.
 */
const MEDIA_KIND: Record<ProjectImage["kind"], { band: string; frame: string }> = {
  phone: {
    band: "bg-muted/40 px-4 py-5",
    frame: "aspect-[9/19.5] max-h-[24rem] rounded-lg border-2 border-border",
  },
  wide: {
    band: "",
    frame: "aspect-[11/5]",
  },
};

/**
 * Renders `project.images` as a band at the top of the card. Two or more sit in
 * a 2-up grid, one runs full width (narrowed for `phone` so it reads as a
 * device rather than a poster).
 *
 * `kind` is read per image, so a project can mix phone and desktop shots — the
 * band's padding only applies when *every* shot is a phone, otherwise the
 * portraits would be inset while a browser shot bleeds to the edge.
 *
 * `limit` truncates before any of that runs, so the band is laid out around the
 * images actually shown rather than the ones held in the data. Both tabs use it
 * to show a single hero capture — the remaining shots are still one click away
 * in the full-screen viewer.
 *
 * Every frame is a `<button>`, so a thumbnail can be clicked to open the
 * full-screen viewer (see ProjectImageViewer) starting at that image.
 */
const ProjectMedia = ({
  images,
  eager,
  limit,
  onOpen,
}: {
  images: ProjectImage[];
  eager: boolean;
  limit?: number;
  /** Called with the clicked index and the button that was clicked. */
  onOpen: (index: number, trigger: HTMLButtonElement) => void;
}) => {
  const shown = limit ? images.slice(0, limit) : images;
  const allPhone = shown.every((image) => image.kind === "phone");
  const paired = shown.length > 1;

  return (
    <div
      className={cn(
        "-mx-6 -mt-6 mb-6 overflow-hidden border-b-2 border-border md:-mx-8 md:-mt-8",
        allPhone && MEDIA_KIND.phone.band,
      )}
    >
      <div className={cn("grid gap-3", paired ? "grid-cols-2" : "grid-cols-1")}>
        {shown.map((image, imageIndex) => (
          <button
            key={image.src}
            type="button"
            onClick={(e) => onOpen(imageIndex, e.currentTarget)}
            aria-label={`View ${image.alt} full size`}
            className={cn(
              "block cursor-zoom-in overflow-hidden",
              MEDIA_KIND[image.kind].frame,
              !paired && image.kind === "phone" && "mx-auto w-full max-w-[14rem]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            )}
          >
            <img
              src={assetUrl(image.src)}
              alt={image.alt}
              width={image.kind === "phone" ? 480 : 1920}
              height={image.kind === "phone" ? 960 : 864}
              loading={eager && imageIndex === 0 ? "eager" : "lazy"}
              decoding="async"
              className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

/**
 * Project card.
 *
 * Text-only by default. The previous author's screenshots (Ledger, ApexScript,
 * TradePro) were removed because they implied work on this site that doesn't
 * exist; screenshots return per-project via `project.images`, so an entry only
 * shows a picture the owner actually took.
 */
const ProjectCard = ({
  project,
  index,
  imageLimit,
  onOpenViewer,
}: {
  project: Project;
  index: number;
  /** Cards show one hero capture; the full set opens in the viewer. */
  imageLimit?: number;
  onOpenViewer: (project: Project, index: number, trigger: HTMLButtonElement) => void;
}) => (
  <FadeInItem className="relative neobrutalist-card h-full flex flex-col group overflow-hidden transition-all duration-300 hover:translate-y-[-4px]">
    {project.images && project.images.length > 0 && (
      <ProjectMedia
        images={project.images}
        eager={index === 0}
        limit={imageLimit}
        onOpen={(index, trigger) => onOpenViewer(project, index, trigger)}
      />
    )}

    <div className="flex items-start justify-between gap-4 mb-6">
      <h3 className="text-xl font-bold text-foreground transition-colors group-hover:text-primary">
        {project.title}
      </h3>

      <div className="flex shrink-0 items-center gap-3">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} source code on GitHub`}
            className="border-2 border-border p-1.5 text-foreground transition-colors duration-200 hover:border-primary hover:text-primary"
          >
            <Github size={18} aria-hidden="true" />
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.title}${project.liveLabel ? ` on ${project.liveLabel}` : " live"}`}
            className="border-2 border-border p-1.5 text-foreground transition-colors duration-200 hover:border-primary hover:text-primary"
          >
            <ExternalLink size={18} aria-hidden="true" />
          </a>
        )}
      </div>
    </div>

    <p className="text-foreground/80 leading-relaxed mb-6 flex-1">{project.description}</p>

    <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-border">
      {project.techStack.map((tech) => (
        <span
          key={tech}
          className="text-xs font-mono text-secondary bg-secondary/5 border border-secondary/30 px-2 py-1 transition-colors group-hover:bg-secondary/10"
        >
          {tech}
        </span>
      ))}
    </div>
  </FadeInItem>
);

const TABS: { id: ProjectCategory; label: string; hint: string; Icon: typeof Globe }[] = [
  {
    id: "mobile",
    label: "Mobile Apps",
    hint: "Flutter clients shipped to Android and iOS — business systems, media and booking apps.",
    Icon: Smartphone,
  },
  {
    id: "web",
    label: "Web Apps",
    hint: "Sites, portals and dashboards built with Next.js, React and TypeScript.",
    Icon: Globe,
  },
];

/**
 * Column counts are per tab, and deliberately not the same:
 *
 * - `web` is one project per row. A wide capture is 2.2:1, so two across would
 *   render each ~564 × 256 — a screenshot at that size can't be read, which is
 *   the only reason to show one. Full width gives ~1152 × 524.
 * - `mobile` is one on a phone and two from a tablet up — the portraits are
 *   narrow enough to sit denser than a desktop capture, but two per row keeps
 *   each card wide enough for its screenshot to read.
 */
const GRID_CLASS: Record<ProjectCategory, string> = {
  web: "grid gap-6 grid-cols-1",
  mobile: "grid gap-6 grid-cols-1 md:grid-cols-2",
};

const ProjectsSection = () => {
  const [active, setActive] = useState<ProjectCategory>("mobile");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const prefersReduced = useReducedMotion();

  const counts = useMemo(() => {
    const totals: Record<ProjectCategory, number> = { web: 0, mobile: 0 };
    for (const project of PORTFOLIO_DATA.projects) totals[project.category] += 1;
    return totals;
  }, []);

  const visible = useMemo(
    () => PORTFOLIO_DATA.projects.filter((project) => project.category === active),
    [active],
  );

  /** The viewer: a full-screen image gallery. Opening a project while another's
   *  viewer is open simply swaps in the new image set. */
  const [viewer, setViewer] = useState<ViewerState | null>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  const openViewer = (project: Project, index: number, trigger: HTMLButtonElement) => {
    lastTriggerRef.current = trigger;
    setViewer({ images: project.images ?? [], index, title: project.title });
  };

  const closeViewer = () => {
    setViewer(null);
    // Restore focus to the thumbnail that opened the viewer.
    lastTriggerRef.current?.focus();
  };

  /**
   * Roving tabindex: the tablist is one tab stop and the arrows move between
   * tabs, per the WAI-ARIA tabs pattern. Without it the two buttons are two
   * separate stops and the tabs cannot be switched from the keyboard at all.
   */
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const current = TABS.findIndex((tab) => tab.id === active);
    let next: number;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (current + 1) % TABS.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp")
      next = (current - 1 + TABS.length) % TABS.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = TABS.length - 1;
    else return;

    event.preventDefault();
    setActive(TABS[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="projects" className={`py-24 ${RAIL_GUTTER}`}>
      <div className="container mx-auto max-w-6xl">
        <Reveal>
          <h2 className="section-title text-center">Projects</h2>
        </Reveal>

        <Reveal>
          <p className="mt-4 text-center text-muted-foreground max-w-2xl mx-auto">
            Production applications, internal business systems, and a few things built to learn
            something specific.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 flex justify-center">
            <div
              role="tablist"
              aria-label="Filter projects by platform"
              onKeyDown={handleKeyDown}
              className="inline-flex border-2 border-border bg-card p-1.5 shadow-[4px_4px_0_hsl(var(--border))]"
            >
              {TABS.map(({ id, label, Icon }, tabIndex) => {
                const selected = active === id;
                return (
                  <button
                    key={id}
                    ref={(element) => {
                      tabRefs.current[tabIndex] = element;
                    }}
                    type="button"
                    role="tab"
                    id={`projects-tab-${id}`}
                    aria-selected={selected}
                    aria-controls={`projects-panel-${id}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(id)}
                    className={cn(
                      "relative flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-widest",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      selected
                        ? "text-primary-foreground"
                        : "text-foreground/70 transition-colors duration-200 hover:text-foreground",
                    )}
                  >
                    {selected && (
                      <motion.span
                        layoutId="projects-tab-indicator"
                        aria-hidden="true"
                        className="absolute inset-0 bg-primary"
                        transition={
                          prefersReduced
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 460, damping: 38, mass: 0.7 }
                        }
                      />
                    )}

                    <span className="relative flex items-center gap-2">
                      <Icon size={15} aria-hidden="true" />
                      {label}
                      <span
                        className={cn(
                          "border px-1.5 py-0.5 font-mono text-[0.65rem] leading-none",
                          selected
                            ? "border-primary-foreground/40 bg-primary-foreground/15"
                            : "border-border bg-secondary/10",
                        )}
                      >
                        {counts[id]}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/*
         * Fixed reserve, not just a gap: the container only ever holds one hint,
         * so without a height the panel would jump every time the copy changes
         * length. Two lines below `md` where the mobile hint wraps, one above.
         */}
        <div className="mt-5 min-h-[2.75rem] text-center text-sm text-muted-foreground md:min-h-[1.5rem]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={active}
              initial={prefersReduced ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: prefersReduced ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              {TABS.find((tab) => tab.id === active)?.hint}
            </motion.p>
          </AnimatePresence>
        </div>

        <div
          role="tabpanel"
          id={`projects-panel-${active}`}
          aria-labelledby={`projects-tab-${active}`}
          tabIndex={0}
          className="mt-12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
        >
          {/*
           * `initial={false}` stops the first render from fading in — on load the
           * grid belongs to FadeInStagger's scroll reveal instead, and only a real
           * tab change runs the crossfade. The two never stack.
           */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: prefersReduced ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <FadeInStagger className={GRID_CLASS[active]}>
                {visible.map((project, index) => (
                  <ProjectCard
                    key={project.title}
                    project={project}
                    index={index}
                    imageLimit={1}
                    onOpenViewer={openViewer}
                  />
                ))}
              </FadeInStagger>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/*
       * Full-screen gallery, portalled to `document.body`: `FadeInItem` and the
       * cards apply `transform`, and a fixed overlay inside a transformed
       * ancestor is positioned against that ancestor, not the viewport.
       */}
      {createPortal(
        <AnimatePresence>
          {viewer && (
            <ProjectImageViewer
              key={viewer.title}
              viewer={viewer}
              onClose={closeViewer}
            />
          )}
        </AnimatePresence>,
        document.body,
      )}
    </section>
  );
};

export default ProjectsSection;
