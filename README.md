# Abdulaziz Muhammed — Portfolio

Personal engineering portfolio for **Abdulaziz Muhammed**, a software engineer working primarily in
Flutter and Dart, with Supabase and PostgreSQL on the backend.

Live: **https://abdulaziz.dev.vercel.app**

This is built and maintained as a real product rather than a template: dark-first, typography-led,
accessible, and held to a performance budget.

---

## Stack

| Layer | Choice |
|---|---|
| Build | Vite 5 |
| UI | React 18 + TypeScript 5 |
| Styling | Tailwind CSS 3 with HSL design tokens |
| Routing | React Router 6 |
| Motion | Framer Motion — one library, deliberately |
| Icons | Lucide + React Icons (Simple Icons) |
| Contact | mailto first, optional EmailJS form |
| Hosting | Vercel |

---

## Content source

All personal content lives in **`src/data/portfolio-data.ts`** and is mirrored from the CV project
at `C:\WebApps\cv\src\data\resume-data.ts`. **Update the CV first, then mirror it here** — the two
must not drift apart. Components never hardcode a name, email, phone number or project.

Icons (`public/favicon.svg`, `favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`,
`apple-icon.png`, `android-chrome-*.png`) are byte-identical to `cv/src/app/` — verified by hash, so
the two apps ship the same mark.

---

## Design system

Tokens live in `src/index.css` as HSL custom properties. Dark is the default (`:root`); light
(`.light`) is a warm-neutral counterpart on `#F8F8F8`.

| Token | Dark | Light | Role |
|---|---|---|---|
| `--background` | `210 25% 15%` | `0 0% 97.25%` | page (`#F8F8F8` in light) |
| `--card` | `210 25% 20%` | `0 0% 100%` | cards, panels |
| `--foreground` | `0 0% 96%` | `210 25% 20%` | primary text |
| `--muted-foreground` | `210 15% 65%` | `210 25% 40%` | secondary text |
| `--primary` | `338 85% 70%` | `338 75% 48%` | the pink accent |
| `--secondary` | `262 60% 74%` | `262 50% 55%` | violet accent |
| `--border` | `210 25% 32%` | `210 15% 85%` | decorative hairline |
| `--input` | `210 20% 52%` | `210 12% 55%` | form control outline |
| `--shadow-brutal` | `4px 4px 0 hsl(210 25% 10%)` | `3px 3px 0 hsl(210 15% 80%)` | hard offset shadow |

Component classes (`neobrutalist-card`, `neobrutalist-button`, `stat-badge`, `skills-shell`,
`icon-dark-bg`, `portfolio-glow`, `text-hero`, `section-title`, `dot-grid`) sit in
`@layer components`, so any Tailwind utility can still override them per instance.

### Contrast is verified, not assumed

```bash
npm run check:contrast
```

Reads the tokens straight out of `index.css` — with proper brace matching, since they are nested
inside `@layer base` — and checks every pairing the UI renders against the WCAG 2.1 AA thresholds:
4.5:1 for text, 3:1 for non-text UI boundaries such as a form control's outline. Exits non-zero on
failure, so it can gate a build. Currently **28 pairings across both themes, all passing.**

The accent lightnesses exist because of this check, not by taste: the pink needed to move from 62%
to 70% (dark) and 52% to 48% (light) to clear 4.5:1 against the card surfaces. Hue and saturation
are untouched.

### Type

Self-hosted variable fonts imported in `src/styles/fonts.ts` — no third-party request on first
paint:

- **Fraunces Variable** — display serif: headings, hero name, section titles
- **Inter Variable** — body copy and UI
- **JetBrains Mono Variable** — technical labels, code, status

---

## Project structure

```text
src/
├── components/
│   ├── animations/       Reveal, FadeInStagger — motion primitives
│   ├── footer/           Footer decoration
│   ├── portfolio/        Page sections (Hero, About, Skills, Experience, Projects, Contact)
│   └── ui/               Small token-based primitives
├── contexts/             Theme provider
├── data/
│   └── portfolio-data.ts   Single source of truth for personal data
├── hooks/                Shared React hooks
├── lib/                  Environment access, class-name helpers
├── pages/                Route components
└── index.css             Design tokens, component classes, global behaviour
```

Content lives in data modules rather than inside components, so adding a project or updating a role
is a single-file change.

---

## Routes

| Path | Purpose |
|---|---|
| `/` | Main single-page portfolio |
| `/resume` | Inline PDF resume viewer |
| `*` | Not found |

---

## Getting started

Requires Node 18 or newer.

```bash
npm install
npm run dev
```

The dev server runs on http://localhost:3000.

### Environment variables

The contact section is **mailto-first** and works with no configuration at all. Copy `.env.example`
to `.env` only if you also want the in-page form:

```env
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

If any of the three are missing, the form is hidden rather than rendered in a broken state. Only
publishable, client-safe EmailJS values are used; no secrets are committed.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Production build |
| `npm run build:dev` | Development-mode build, unminified |
| `npm run preview` | Preview the production build locally |
| `npm run typecheck` | TypeScript check, no emit |
| `npm run lint` | ESLint |

---

## Accessibility

- Pinch-zoom is not blocked; the viewport permits user scaling.
- A single consistent `:focus-visible` outline applies to every interactive element.
- `prefers-reduced-motion: reduce` disables the intro screen animations, reveals, pulses,
  and smooth scrolling — and tears down the smooth-scroll engine entirely.
- Touch scrolling is left native. Only wheel input is smoothed, so a page never feels
  "sticky" under a thumb.
- The section rail uses 44x44 hit targets and exposes `aria-current`.
- Anchor targets are offset so the fixed header never covers a heading.

## Performance

- The intro screen reports real readiness (fonts + document load) with a hard ceiling, rather
  than blocking on a fixed timer.
- No blocking loading screen, no duplicate animation libraries, no unused component library.
- Motion, fonts, and images are budgeted deliberately rather than added per-section.



---

© Abdulaziz Muhammed
