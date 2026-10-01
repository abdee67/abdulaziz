import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import Container from "./Container";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

/**
 * Vertical rhythm for every band of the page.
 *
 * Replaces the old mix of `min-h-screen` and hand-picked `py-*` values, which is
 * what produced the "hero, huge empty space, section, huge empty space" pattern.
 */
const Section = ({ id, children, className, containerClassName }: SectionProps) => (
  <section id={id} className={cn("py-20 sm:py-24 lg:py-28", className)}>
    <Container className={containerClassName}>{children}</Container>
  </section>
);

export default Section;
