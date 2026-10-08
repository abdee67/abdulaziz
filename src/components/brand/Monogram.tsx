import { assetUrl } from "@/lib/asset";

interface MonogramProps {
  className?: string;
  /** Set to "" when the mark sits next to the name and would be redundant. */
  label?: string;
}

/**
 * The AM monogram.
 *
 * Rendered from `public/logo.png` — the real asset, not an inline redraw. It is a
 * knockout mark (a thin dark ring and dark letterforms cut out of light fills),
 * so one file reads on both themes: on the near-black dark surface the light
 * fills carry the shape, on the warm paper light surface the dark strokes do.
 * That is why it is used as-is in both, with no ring, plate, or inversion.
 *
 * `BASE_URL` rather than a bare `/logo.png` because the site is served from a
 * sub-path — the same reason `Resume.tsx` builds its PDF URL that way.
 *
 * The tab icon is a separate asset (`public/favicon.svg`, the square-cut tile).
 */
const Monogram = ({ className, label = "Abdulaziz Muhammed" }: MonogramProps) => (
  <img
    src={assetUrl("logo.png")}
    alt={label}
    aria-hidden={label ? undefined : true}
    draggable={false}
    className={className}
  />
);

export default Monogram;

