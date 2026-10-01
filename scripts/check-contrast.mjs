/**
 * Design-token contrast audit.
 *
 * Reads the HSL tokens straight out of src/index.css and checks every text /
 * surface pairing the UI actually uses against the WCAG 2.1 contrast minimums.
 *
 * This exists so "accessible" is a measured property of the design system rather
 * than an opinion about it. Run it after touching any colour token:
 *
 *   npm run check:contrast
 *
 * Exits non-zero on any failure, so it can gate a build.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const css = readFileSync(resolve(here, "../src/index.css"), "utf8");

function readBlock(marker) {
  const start = css.indexOf(marker);
  if (start === -1) throw new Error(`Could not find "${marker}" in index.css`);
  const open = css.indexOf("{", start);
  if (open === -1) throw new Error(`Could not find the opening brace for "${marker}"`);

  // Brace matching, not "find the next newline + }". The token blocks are nested
  // inside `@layer base { ... }`, so the naive version ran past the end of the
  // block and every theme ended up parsing the last one.
  let depth = 0;
  for (let i = open; i < css.length; i += 1) {
    if (css[i] === "{") depth += 1;
    else if (css[i] === "}") {
      depth -= 1;
      if (depth === 0) return css.slice(open + 1, i);
    }
  }

  throw new Error(`Unterminated block for "${marker}"`);
}

function parseTokens(block) {
  const tokens = {};
  const re = /--([a-z0-9-]+):\s*([\d.]+)\s+([\d.]+)%\s+([\d.]+)%\s*;/g;
  let match;
  while ((match = re.exec(block)) !== null) {
    tokens[match[1]] = [Number(match[2]), Number(match[3]) / 100, Number(match[4]) / 100];
  }
  return tokens;
}

function hslToRgb([h, s, l]) {
  const hue = ((h % 360) + 360) % 360;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
  const m = l - c / 2;

  let rgb;
  if (hue < 60) rgb = [c, x, 0];
  else if (hue < 120) rgb = [x, c, 0];
  else if (hue < 180) rgb = [0, c, x];
  else if (hue < 240) rgb = [0, x, c];
  else if (hue < 300) rgb = [x, 0, c];
  else rgb = [c, 0, x];

  return rgb.map((v) => v + m);
}

function relativeLuminance(rgb) {
  const channel = (v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
  const [r, g, b] = rgb.map(channel);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(a, b) {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

/**
 * Every pairing the interface actually renders, using the token names the
 * stylesheet actually defines.
 * `min` is the WCAG 2.1 AA threshold: 4.5 for body text, 3.0 for non-text UI
 * boundaries such as a form control's outline.
 */
const PAIRS = [
  ["foreground", "background", 4.5, "body text on page"],
  ["foreground", "card", 4.5, "body text on card"],
  ["muted-foreground", "background", 4.5, "secondary text on page"],
  ["muted-foreground", "card", 4.5, "secondary text on card"],
  ["primary", "background", 4.5, "accent text on page"],
  ["primary", "card", 4.5, "accent text on card"],
  ["primary-foreground", "primary", 4.5, "label on primary button"],
  ["secondary", "background", 4.5, "steel accent text on page"],
  ["secondary", "card", 4.5, "steel accent text on card"],
  ["secondary-foreground", "secondary", 4.5, "label on secondary surface"],
  ["destructive", "background", 4.5, "error text on page"],
  ["input", "background", 3.0, "form control outline on page"],
  ["input", "card", 3.0, "form control outline on card"],
  ["border", "background", 1.2, "decorative hairline (informational)"],
];

const themes = [
  ["dark  (:root)", parseTokens(readBlock(":root {"))],
  ["light (.light)", parseTokens(readBlock(".light {"))],
];

let failures = 0;
let checks = 0;

for (const [label, tokens] of themes) {
  console.log(`\n${label}\n${"─".repeat(74)}`);
  console.log(
    `${"fg".padEnd(18)}${"bg".padEnd(18)}${"ratio".padStart(8)}  ${"min".padStart(5)}  result`,
  );

  for (const [fg, bg, min, description] of PAIRS) {
    const fgValue = tokens[fg];
    const bgValue = tokens[bg];

    if (!fgValue || !bgValue) {
      console.log(`${fg.padEnd(18)}${bg.padEnd(18)}${"—".padStart(8)}  ${min.toFixed(1).padStart(5)}  MISSING TOKEN`);
      failures += 1;
      checks += 1;
      continue;
    }

    const ratio = contrastRatio(hslToRgb(fgValue), hslToRgb(bgValue));
    const pass = ratio >= min;
    if (!pass) failures += 1;
    checks += 1;

    console.log(
      `${fg.padEnd(18)}${bg.padEnd(18)}${ratio.toFixed(2).padStart(8)}  ${min.toFixed(1).padStart(5)}  ${pass ? "pass" : "FAIL"}  ${description}`,
    );
  }
}

console.log(`\n${"─".repeat(74)}`);
if (failures > 0) {
  console.log(`${failures} of ${checks} checks FAILED.\n`);
  process.exit(1);
}
console.log(`All ${checks} contrast checks passed.\n`);
