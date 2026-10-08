/**
 * Full-screen image viewer for project screenshots.
 *
 * Not a dialog box: the entire viewport becomes one slide per image with
 * horizontal scroll-snap, so a project with several screenshots reads like an
 * app gallery. Click an image in a project card to open it here.
 *
 * Portaled into `document.body` because `FadeInItem` and the cards apply
 * `transform`, which would otherwise trap a `position: fixed` element as a
 * child of the card.
 */

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import type { ProjectImage } from "@/data/portfolio-data";
import { cn } from "@/lib/utils";
import { assetUrl } from "@/lib/asset";
import { startScroll, stopScroll } from "@/lib/scroll";

export interface ViewerState {
  images: ProjectImage[];
  index: number;
  title: string;
}

const ProjectImageViewer = ({
  viewer,
  onClose,
}: {
  viewer: ViewerState;
  onClose: () => void;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const prefersReduced = useReducedMotion();
  const [current, setCurrent] = useState(viewer.index);

  // The ref keeps the latest index in sync with the scroll position, so
  // keyboard arrows and the counter read the right slide at all times.
  const currentRef = useRef(viewer.index);
  useEffect(() => {
    currentRef.current = current;
  }, [current]);

  // Lock page scroll while this overlay is in control of the screen, then
  // restore it when it closes.
  useEffect(() => {
    stopScroll();
    return () => startScroll();
  }, []);

  // Snap to the clicked slide the instant this mounts, before the user can
  // see the viewer on the wrong position.
  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollLeft = currentRef.current * el.clientWidth;
    closeRef.current?.focus();
    // Mount-only: re-running this on every index change would fight an
    // in-progress swipe by snapping `scrollLeft` out from under the finger.
  }, []);

  const slideTo = useCallback(
    (index: number, instant = false) => {
      const el = scrollRef.current;
      if (!el) return;
      const target = Math.max(0, Math.min(viewer.images.length - 1, index));
      el.scrollTo({
        left: target * el.clientWidth,
        behavior: instant || prefersReduced ? "auto" : "smooth",
      });
    },
    [viewer.images.length, prefersReduced],
  );

  // Track which slide is centered so the counter stays honest while the user
  // swipes or wheels past a slide.
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    if (index !== currentRef.current) {
      currentRef.current = index;
      setCurrent(index);
    }
  };

  // Translate vertical wheel movement into horizontal scroll — much nicer on
  // desktop than hunting for the horizontal scrollbar.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // Snap to a clean slide whenever the window size changes, so we never land
  // between two images.
  useEffect(() => {
    const onResize = () => slideTo(currentRef.current, true);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [slideTo]);

  // Keyboard: Escape to close, arrows to step through slides.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") slideTo(currentRef.current + 1);
      else if (e.key === "ArrowLeft") slideTo(currentRef.current - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, slideTo]);

  // A lightweight focus trap: while the viewer is open, Tab should stay inside
  // it instead of looping behind the page.
  const handleTrap = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab") return;
    const root = e.currentTarget;
    const focusables = Array.from(
      root.querySelectorAll<HTMLElement>("button:not([disabled])")
    );
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const rootClasses = "fixed inset-0 z-[200] flex flex-col bg-black/95";

  const slideClasses = cn(
    "flex h-full w-full snap-center flex-none items-center justify-center p-3 pt-16 pb-14 md:p-16"
  );

  return createPortal(
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${viewer.title} screenshots`}
      className={rootClasses}
      initial={prefersReduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: prefersReduced ? 0 : 0.25 }}
      onKeyDown={handleTrap}
    >
      {/* Top bar: slide counter on the left, close button on the right. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between p-4 md:p-6">
        {viewer.images.length > 1 && (
          <span className="font-mono text-xs text-white/80">
            {current + 1} / {viewer.images.length}
          </span>
        )}
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close image viewer"
          className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded border-2 border-border bg-background text-foreground shadow-[3px_3px_0_hsl(var(--border))] transition-colors hover:bg-primary hover:text-primary-foreground active:translate-y-0.5 active:shadow-none"
        >
          <X size={18} />
        </button>
      </div>

      {/* Horizontal filmstrip: one full-viewport slide per image. */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className={cn(
          "scrollbar-none flex h-full w-full flex-nowrap overflow-x-auto overscroll-contain snap-x snap-mandatory"
        )}
      >
        {viewer.images.map((image) => (
          <div
            key={image.src}
            onClick={(e) => {
              // Close when the background around the image is clicked, never
              // the image itself.
              if (e.target === e.currentTarget) onClose();
            }}
            className={slideClasses}
          >
            <motion.img
              src={assetUrl(image.src)}
              alt={image.alt}
              draggable={false}
              initial={prefersReduced ? false : { scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mx-auto h-auto max-h-full w-auto max-w-full object-contain shadow-2xl"
            />
          </div>
        ))}
      </div>

      {/* Bottom caption reads out what each slide is. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 pb-6 text-center">
        <p className="max-w-3xl mx-auto text-sm text-white/80 line-clamp-1">
          {viewer.images[current]?.alt}
        </p>
      </div>

      {/* Step buttons for users who prefer clicks to swipes. */}
      {viewer.images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => slideTo(currentRef.current - 1)}
            disabled={current === 0}
            className={cn(
              "pointer-events-auto hidden absolute left-4 top-1/2 -translate-y-1/2 z-10 md:inline-flex h-12 w-12 items-center justify-center rounded border-2 border-border bg-background text-foreground shadow-[3px_3px_0_hsl(var(--border))] transition-colors active:translate-y-0 active:shadow-none",
              current === 0 ? "opacity-50" : "hover:bg-primary hover:text-primary-foreground"
            )}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={() => slideTo(currentRef.current + 1)}
            disabled={current === viewer.images.length - 1}
            className={cn(
              "pointer-events-auto hidden absolute right-4 top-1/2 -translate-y-1/2 z-10 md:inline-flex h-12 w-12 items-center justify-center rounded border-2 border-border bg-background text-foreground shadow-[3px_3px_0_hsl(var(--border))] transition-colors active:translate-y-0 active:shadow-none",
              current === viewer.images.length - 1 ? "opacity-50" : "hover:bg-primary hover:text-primary-foreground"
            )}
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}
    </motion.div>,
    document.body
  );
};

export default ProjectImageViewer;