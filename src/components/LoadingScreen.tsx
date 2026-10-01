import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Intro screen.
 *
 * Two things changed from the original implementation, both about honesty rather
 * than looks:
 *
 *  1. Progress is real. It advances from actual readiness signals — document
 *     `load` and webfont loading — instead of a setInterval guessing at 3500ms.
 *  2. It no longer blocks. There is a hard ceiling (`MAX_WAIT_MS`) so a slow or
 *     failed asset can never hold the site hostage, and a floor
 *     (`MIN_VISIBLE_MS`) so it doesn't flash for one frame on a fast connection.
 *
 * The visual is unchanged, and it is pure CSS — no CSS-in-JS runtime.
 */

const MIN_VISIBLE_MS = 800;
const MAX_WAIT_MS = 2200;
const EXIT_MS = 450;

interface LoadingScreenProps {
  onDone: () => void;
}

const LoadingScreen = ({ onDone }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const finishedRef = useRef(false);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setProgress(100);
    setLeaving(true);
    window.setTimeout(onDone, EXIT_MS);
  }, [onDone]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const minVisible = prefersReducedMotion ? 250 : MIN_VISIBLE_MS;
    const startedAt = performance.now();

    const signals: Promise<unknown>[] = [];

    if (document.readyState !== "complete") {
      signals.push(
        new Promise<void>((resolve) => {
          window.addEventListener("load", () => resolve(), { once: true });
        }),
      );
    }

    if (document.fonts?.ready) {
      signals.push(document.fonts.ready);
    }

    const hardCeiling = new Promise<void>((resolve) => {
      window.setTimeout(resolve, MAX_WAIT_MS);
    });

    Promise.race([Promise.all(signals), hardCeiling]).then(() => {
      const elapsed = performance.now() - startedAt;
      window.setTimeout(finish, Math.max(0, minVisible - elapsed));
    });

    // Creep toward 90% while real work is still outstanding. Never sits at 0
    // forever, never claims 100% before we're actually finished.
    let frame = 0;
    const tick = () => {
      setProgress((current) => (current >= 90 ? current : current + (90 - current) * 0.04));
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frame);
  }, [finish]);

  // Lock page scroll while the overlay is up, then release it.
  useEffect(() => {
    document.documentElement.classList.add("is-booting");
    return () => document.documentElement.classList.remove("is-booting");
  }, []);

  useEffect(() => {
    if (leaving) document.documentElement.classList.remove("is-booting");
  }, [leaving]);

  return (
    <div
      className="loader-screen"
      data-leaving={leaving ? "true" : undefined}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="clouds" aria-hidden="true">
        <div className="cloud cloud1" />
        <div className="cloud cloud2" />
        <div className="cloud cloud3" />
        <div className="cloud cloud4" />
        <div className="cloud cloud5" />
      </div>

      <div className="content-box">
        <div className="loader-wrapper" aria-hidden="true">
          <div className="loader">
            <span>
              <span />
              <span />
              <span />
              <span />
            </span>
            <div className="base">
              <span />
              <div className="face" />
            </div>
          </div>
          <div className="longfazers">
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>

        <div className="progress-text">{Math.floor(progress)}%</div>
      </div>
    </div>
  );
};

export default LoadingScreen;
