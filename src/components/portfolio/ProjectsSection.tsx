import { Github, ExternalLink } from "lucide-react";
import { Reveal, FadeInStagger, FadeInItem } from "@/components/animations/Reveal";
import { PORTFOLIO_DATA, type Project } from "@/data/portfolio-data";
import { RAIL_GUTTER } from "@/constants";

/**
 * Project card.
 *
 * Deliberately image-free. The committed version rendered the previous author's
 * screenshots (Ledger, ApexScript, TradePro) as if they were the work on this
 * site. Real screenshots can go back in as soon as they exist — the layout below
 * is already sized for a preview panel to sit above the title.
 */
const ProjectCard = ({ project }: { project: Project }) => (
  <FadeInItem className="relative neobrutalist-card h-full flex flex-col group overflow-hidden transition-all duration-300 hover:translate-y-[-4px]">
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

const ProjectsSection = () => (
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

      <FadeInStagger className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {PORTFOLIO_DATA.projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </FadeInStagger>
    </div>
  </section>
);

export default ProjectsSection;
