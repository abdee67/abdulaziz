import type Lenis from "lenis";

/**
 * Tiny indirection so UI components ask for "scroll to this section" without
 * knowing whether Lenis is active. The smooth-scroll library is an
 * implementation detail of the shell, not something a header button should
 * reach into.
 */

let activeLenis: Lenis | null = null;

export function registerLenis(instance: Lenis | null) {
  activeLenis = instance;
}

/** Fixed-header height plus breathing room. Matches `scroll-margin-top` in CSS. */
const HEADER_OFFSET = -88;

export function scrollToId(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  if (activeLenis) {
    activeLenis.scrollTo(target, { offset: HEADER_OFFSET, duration: 1.05 });
    return;
  }

  // No Lenis (reduced motion, or not mounted yet) — fall back to native.
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function scrollToTop() {
  if (activeLenis) {
    activeLenis.scrollTo(0, { duration: 1.05 });
    return;
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

/**
 * Ask the smooth-scroll engine to re-measure.
 *
 * Needed after the intro screen releases its scroll lock: Lenis sized the page
 * while `overflow: hidden` was still on `<html>`, so its scroll limit is stale
 * until it recalculates.
 */
export function refreshScroll() {
  activeLenis?.resize();
}

/**
 * Lock page scroll while an overlay (the image viewer) owns the screen.
 *
 * Lenis keeps driving scroll from wheel input even under `overflow: hidden`, so
 * both levers are pulled: stop the engine, and clamp the document with a class.
 */
export function stopScroll() {
  activeLenis?.stop();
  document.documentElement.classList.add("is-viewing-media");
}

export function startScroll() {
  activeLenis?.start();
  document.documentElement.classList.remove("is-viewing-media");
}
