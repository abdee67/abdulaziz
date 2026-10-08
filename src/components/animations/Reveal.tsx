import { PropsWithChildren } from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";

/**
 * Scroll-reveal viewport config.
 *
 * `amount: 0.2` — "at least 20% of this element must be on screen" — is a trap
 * for any element taller than the viewport, and it fails silently. The projects
 * grid is the proof: three columns on desktop make it ~1,600px tall, so 20% is
 * 320px and it reveals fine; one column on a phone makes the same grid ~4,200px
 * tall, so 20% is ~840px *simultaneously*, which no phone viewport can show
 * (and `margin` shrinks the observation box further). The threshold is never
 * met, `whileInView` never fires, and every child stays at its `hidden` variant
 * — opacity 0. Visible in devtools, invisible to the eye.
 *
 * `"some"` (any intersection at all) is height-independent, so it works for a
 * heading and for a 13-card grid alike. The -10% margin still keeps the trigger
 * slightly inside the fold so things animate at a natural point rather than the
 * instant a pixel appears.
 */
const viewport = (once: boolean) =>
  ({ once, amount: "some", margin: "-10% 0px" }) as const;

export type RevealProps = PropsWithChildren<{
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  once?: boolean;
  as?: keyof JSX.IntrinsicElements;
}>;

export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.5,
  y = 24,
  x = 0,
  once = true,
  as: Tag = "div",
}: RevealProps) {
  const prefersReduced = useReducedMotion();

  const variants: Variants = prefersReduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y, x },
        visible: {
          opacity: 1,
          y: 0,
          x: 0,
          transition: {
            duration,
            delay,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      };

  const Component = motion[Tag] || motion.div;

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport(once)}
      variants={variants}
    >
      {children}
    </Component>
  );
}

export type FadeInStaggerProps = PropsWithChildren<{
  className?: string;
  stagger?: number;
  gap?: string;
}>;

export function FadeInStagger({ children, className, stagger = 0.08 }: FadeInStaggerProps) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.ul
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport(true)}
      variants={{
        hidden: {},
        visible: prefersReduced
          ? { transition: { staggerChildren: 0 } }
          : { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.ul>
  );
}

export function FadeInItem({ children, className }: PropsWithChildren<{ className?: string }>) {
  const prefersReduced = useReducedMotion();
  return (
    <motion.li
      className={className}
      variants={prefersReduced ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
    >
      {children}
    </motion.li>
  );
}
