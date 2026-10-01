import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * The single source of horizontal alignment for the entire site.
 *
 * Every section, the header, and the footer render inside this, which is what
 * makes their left and right edges line up exactly — on mobile and on a wide
 * screen alike. Previously each section invented its own `container max-w-*` and
 * padding, then got nested inside another padded wrapper, so cards in different
 * sections started at three different x-positions.
 *
 * The gutter is deliberately fixed rather than scaling per breakpoint: mobile
 * and desktop share the same alignment line, which is the whole point.
 */
const Container = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn("mx-auto w-full max-w-6xl px-6", className)}>{children}</div>
);

export default Container;
