import type { ComponentType } from "react";
import { Github, Linkedin, Twitter } from "lucide-react";
import { FaTelegram } from "react-icons/fa6";

import { PORTFOLIO_DATA } from "@/data/portfolio-data";

type SocialIcon = ComponentType<{ className?: string; size?: number | string }>;

/**
 * Icons are mapped by *name*, so adding or reordering a network is a data-file
 * change plus one line here — rather than shifting array indices and silently
 * giving Twitter the LinkedIn icon.
 */
const SOCIAL_ICONS: Record<string, SocialIcon> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  X: Twitter,
  Telegram: FaTelegram,
};

export const SOCIAL_LINKS = PORTFOLIO_DATA.socialLinks
  .filter((link) => link.name in SOCIAL_ICONS)
  .map((link) => ({
    name: link.name,
    label: link.label,
    href: link.url,
    icon: SOCIAL_ICONS[link.name],
  }));

/** The subset that fits comfortably in the mobile action bar. */
const MOBILE_ACTION_BAR_ORDER = ["GitHub", "LinkedIn", "Telegram"] as const;

export const MOBILE_SOCIAL_LINKS = MOBILE_ACTION_BAR_ORDER.map((name) =>
  SOCIAL_LINKS.find((link) => link.name === name),
).filter((link): link is (typeof SOCIAL_LINKS)[number] => Boolean(link));

export const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;

export const SECTIONS = ["hero", "about", "skills", "experience", "projects", "contact"] as const;

export const EMAIL = PORTFOLIO_DATA.email;

export const MOBILE_BREAKPOINT = 768;

/**
 * Horizontal room reserved for the two fixed side rails.
 *
 * The rails are always rendered, so the page needs a gutter for them at every
 * breakpoint. This is applied as padding on each section (inside the section, so
 * full-bleed backgrounds still span the full width) rather than on `<main>`,
 * which would have left unpainted strips down the edges.
 *
 * Verified against the rail offsets in SocialSidebar/EmailSidebar (rail offset +
 * icon width vs. reserved gutter — no overlap at any width):
 *   viewport  rail ends by  gutter
 *   360px     30px          32px
 *   640px     36px          48px
 *   768px     48px          64px
 *   1024px+   48px          80px+
 */
export const RAIL_GUTTER =
  "px-8 sm:px-12 md:px-16 lg:px-20 2xl:px-24";
