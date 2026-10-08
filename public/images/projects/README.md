# Project screenshots

Drop one image per project here, then reference it in `src/data/portfolio-data.ts`:

```ts
images: [
  {
    src: "/images/projects/breaker7.png",
    alt: "URS Breaker app screen showing a goal split into ordered steps",
    kind: "phone", // "phone" | "wide"
  },
  {
    src: "/images/projects/breaker9.png",
    alt: "URS Breaker app screen while Gemini generates an action plan",
    kind: "phone",
  },
],
```

One image is fine too — `images: [{ ... }]`.

Only the first entry renders on the card — both tabs pass `imageLimit` in
`ProjectsSection.tsx` so each card shows a single hero capture. Clicking it
opens the full-screen viewer, which shows **every** image in the array as a
horizontally scrollable gallery.

## Naming

`<kebab-case-project-slug>.<ext>` — same slug already used in the data file.
Example: `/images/projects/savvy-lite.webp`.

## Sizing

The card reserves space with an `aspect-*` box *before* the file downloads, so
stick to these ratios or you will get cropped:

| `kind`   | Box                      | Use for                              | Aim for        |
| -------- | ------------------------ | ------------------------------------ | -------------- |
| `phone`  | 9 / 19.5, max 14rem wide | Flutter / Android / iOS screenshots  | 750 × 1628     |
| `wide`   | 11 / 5                   | Browser and desktop screenshots      | 1920 × 864     |

The `wide` box is 2.2, matched to real captures (1875–1920 × 814–886). Anything
much wider than that gets trimmed from the sides.

Both are rendered `object-cover object-top`: if your source is **shorter** than
the box, the bottom is trimmed. Compose accordingly — put nav bars and primary
content at the top, don't rely on anything at the very bottom of the screen.
`object-top` only governs the vertical trim: a source **wider** than the box is
cut equally left and right, so keep navigation and sidebars inside the middle
~90% of the width.

A portrait capture fits neither box — `liha_vault_2.png` (476 × 735) is excluded
for that reason. Re-export those landscape before wiring them.

`phone` also carries `max-h-[24rem]`. A 14rem-wide 9:19.5 frame would be ~485px
tall, so the clamp trims it to 384px and crops ~20% off the bottom of an exact-fit
screenshot. If a particular screen has critical content low down, export it at
9:16 yourself — the visible ratio after clamping is close to that, so it will land
almost uncropped.

## Format

WebP, q≈80, under ~150 kB each. Convert with `npx @squoosh/cli` or squoosh.app.
AVIF is fine too. Strip EXIF — screenshots of personal devices often carry
locations.

The current PNGs are well over budget: `dir2.png` is 2.1 MB on its own and the
folder is 6.7 MB total. Nothing renders wider than ~1152 CSS px, so they can be
scaled to ~1600px and converted with no visible loss.

Every image is `loading="lazy"` except the first card, so a long grid does not
cost you anything up front.
