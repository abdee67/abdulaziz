/**
 * Resolve a file that lives in `public/` to a URL.
 *
 * Vite rewrites same-origin asset URLs, but a hand-written `/images/foo.webp`
 * string breaks the moment the site is served from a sub-path. Funnelling every
 * public asset through here means `BASE_URL` is handled in exactly one place —
 * previously this logic was duplicated in `Resume.tsx` and `Monogram.tsx`.
 */
export function assetUrl(path: string) {
  const clean = path.startsWith("/") ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${clean}`;
}
