/**
 * Self-hosted typefaces.
 *
 * Loaded through the bundler rather than a CDN so there is no third-party
 * request on first paint and no flash of unstyled text waiting on a remote
 * stylesheet.
 *
 *   Fraunces Variable       — display serif: headings, hero name, section titles
 *   Inter Variable          — body copy and UI
 *   JetBrains Mono Variable — technical labels, code, status
 *
 * ── A note on Gavency ────────────────────────────────────────────────────────
 * Gavency is the font asked for here. It is **free for personal use only** — the
 * publisher (Craft Supply Co) sells a separate commercial licence, and the free
 * demo ships just 52 glyphs, which would not cover the copy on this site.
 * Shipping it unlicensed on a portfolio that markets paid engineering work is a
 * legal risk, so Fraunces is wired up as the closest licence-clean stand-in: a
 * variable display serif with the same modern, high-contrast, sharp-cut feel.
 *
 * To switch to Gavency once you hold a commercial licence: drop the .woff2 files
 * in `src/assets/fonts/`, replace the import below with matching @font-face
 * rules, and change the `serif` stack in tailwind.config.ts. Nothing else moves.
 */
import "@fontsource-variable/fraunces";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";

