import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { registerLenis } from "@/lib/scroll";

gsap.registerPlugin(ScrollTrigger);

/**
 * Smooth scrolling.
 *
 * The original implementation had three problems that made it feel expensive
 * rather than premium, all fixed here:
 *
 *  1. It leaked. The cleanup passed a *new* arrow function to
 *     `gsap.ticker.remove()`, so the real ticker callback was never removed and
 *     Lenis kept driving the RAF loop after unmount.
 *  2. It double-drove the RAF loop. Lenis defaults to `autoRaf: true` *and* GSAP
 *     was ticking it manually — two loops fighting over the same scroll.
 *  3. It ignored `prefers-reduced-motion`, and it smoothed touch scrolling.
 *
 * Touch scrolling is deliberately left native now (`syncTouch: false`).
 * Smoothing touch input makes pages feel sticky and is exactly the "physically
 * difficult scrolling" that a premium site should never ship.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    let lenis: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;

    const handleScroll = () => ScrollTrigger.update();

    const start = () => {
      if (lenis) return;

      lenis = new Lenis({
        duration: 0.9,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        syncTouch: false,
        touchMultiplier: 1.5,
        // We drive the loop from GSAP's ticker, so Lenis must not run its own.
        autoRaf: false,
      });

      registerLenis(lenis);
      lenis.on("scroll", handleScroll);

      const instance = lenis;
      tick = (time: number) => instance.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    const stop = () => {
      if (tick) {
        gsap.ticker.remove(tick);
        tick = null;
      }

      if (lenis) {
        lenis.off("scroll", handleScroll);
        lenis.destroy();
        lenis = null;
      }

      registerLenis(null);
    };

    if (!motionQuery.matches) start();

    const onPreferenceChange = (event: MediaQueryListEvent) => {
      if (event.matches) stop();
      else start();
    };

    motionQuery.addEventListener("change", onPreferenceChange);

    return () => {
      motionQuery.removeEventListener("change", onPreferenceChange);
      stop();
    };
  }, []);

  return <>{children}</>;
}
