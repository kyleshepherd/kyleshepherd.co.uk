# Portfolio Rebuild: SvelteKit to Astro

## Overview

Rebuild kyleshepherd.co.uk as a fully static Astro site. The current site is a SvelteKit single-page portfolio with Tailwind CSS v4, custom typography, a noise grain overlay, and smooth scrolling. The rebuild preserves the same editorial/crunchy design identity and single-page structure while moving to Astro's static-first architecture.

## Goals

- **Static output** — zero client-side JS by default, fast loads, simple hosting
- **Content collections** — project data as individual files with typed frontmatter instead of a TS array with HTML strings
- **Animated film grain** — replace the static PNG noise overlay with CSS/SVG turbulence animation for a living, tactile texture
- **Bump tooling** — Node 24, latest Astro, Tailwind CSS v4, pnpm
- **Collaborative copy rewrite** — revisit section copy during implementation, working together on wording
- **Free/cheap deployment** — Vercel static (free tier)

## Non-goals

- No multi-page routing (stays single-page)
- No JS framework (no React/Svelte islands needed)
- No blog or case study pages (can be added later via content collections)
- No design overhaul — same editorial DNA, same fonts, same dark palette

## Stack

| Tool | Version | Purpose |
|------|---------|---------|
| Astro | latest | Static site generator |
| Tailwind CSS | v4 | Styling |
| Node.js | 24 (LTS) | Runtime |
| pnpm | latest | Package manager |
| Vercel | static adapter | Hosting (free tier) |
| TypeScript | latest | Type safety |

## Design Identity

### Typography (unchanged)
- **PP Editorial Old** — serif, used for headings (Hero, section titles)
- **PP Neue Montreal** — sans-serif, used for body text
- **PP Mondwest** — monospace, used for project names and tags

### Colour palette (unchanged)
- Near-black background
- White/off-white text
- Accent colours via OKLCH values in Tailwind config

### Noise overlay (changed)
- **Current:** static `noise.png` tiled as a CSS background
- **New:** animated film grain using CSS/SVG `feTurbulence` filter with a subtle frame-stepping animation. Shifts every few frames to create a living grain effect without being distracting. Small amount of client-side CSS animation (no JS required).

### Smooth scrolling
- **Current:** Lenis library
- **New:** native browser scroll. Can revisit later if needed.

## File Structure

```
src/
  components/
    Header.astro
    Hero.astro
    About.astro
    Projects.astro
    Contact.astro
    Footer.astro
    HandIcon.astro
    PinIcon.astro
    FilmGrain.astro      # Animated noise overlay component
  content/
    projects/            # Content collection
      checkpnt.md
      noir96.md
      tom-dixon.md
      soon.md
      white-cube.md
      belstaff.md
      pagesmith.md
      beddows-design.md
      appare.md
  content.config.ts      # Collection schema definition
  layouts/
    Base.astro           # HTML shell, meta tags, fonts, film grain
  pages/
    index.astro          # Composes Hero + About + Projects + Contact
  styles/
    app.css              # Tailwind imports, @font-face, custom utilities
public/
  fonts/                 # PP Editorial Old, PP Neue Montreal, PP Mondwest (.otf)
  imgs/                  # Favicons, meta image, web app manifest icons
  projects/              # Project screenshots (.png)
astro.config.mjs
tsconfig.json
.nvmrc                   # 24
package.json
```

## Content Collections

Each project is a markdown file with typed frontmatter:

```markdown
---
name: "Tom Dixon"
slug: tom-dixon
projectUrl: "https://tomdixon.net"
image: "/projects/tom-dixon.png"   # absolute path served from public/
techTags: ["SvelteKit", "Go", "React", "Shopify", "GCP", "Terraform"]
order: 3
---

This project was a large scale e-commerce transformation at SOON_...
```

Schema defined in `content.config.ts` using Astro's `defineCollection` and `z` (Zod):

```ts
const projects = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    projectUrl: z.string().url().optional(),
    image: z.string(),
    techTags: z.array(z.string()),
    order: z.number(),
  }),
});
```

Projects queried and sorted by `order` in `index.astro`, passed to `Projects.astro`.

## Sections

### Header
- Sticky positioned, top of viewport
- "Kyle Shepherd" in PP Editorial Old (serif)
- Border-bottom separator
- Same as current

### Hero
- Large editorial headline in PP Editorial Old
- Waving hand SVG icon
- Tagline text about role and current company
- Grayscale photo of Kyle, low opacity, positioned right
- Same layout as current; copy to be revisited collaboratively

### About
- Body text in PP Neue Montreal
- Experience summary, current role, skills
- Copy to be revisited collaboratively

### Projects
- Section heading in serif
- Each project rendered from content collection, ordered by `order` field
- Layout per project:
  - Project name in PP Mondwest (monospace)
  - Screenshot image (left side on desktop, full width on mobile)
  - Tech tags as bordered pills
  - Description body text (rendered from markdown)
  - "View Site" link (if `projectUrl` exists)
- Hover effects on images (opacity/grayscale shifts)
- Responsive: stacks vertically on mobile

### Contact
- CTA text with hand icon
- Email link: kyleshepherddev@gmail.com
- Copy to be revisited collaboratively

### Footer
- GitHub and LinkedIn links
- "London, UK" with pin icon
- Border-top separator

## Animated Film Grain

Implemented as a `FilmGrain.astro` component rendered in `Base.astro`, covering the full viewport with `pointer-events: none`.

Technique: inline SVG `feTurbulence` filter with CSS animation that steps through `baseFrequency` values or applies `transform` shifts at discrete intervals (using `steps()` timing). This creates a film grain that subtly shifts without smooth interpolation — more analogue, less digital.

The component is self-contained: SVG filter definition + a full-screen div that references the filter + scoped CSS animation.

## Deployment

- Vercel static adapter (`@astrojs/vercel` with `output: 'static'`)
- Free tier is sufficient for a personal portfolio
- Build command: `astro build`
- Output directory: `dist/`

## Migration Notes

- Project images move from `src/lib/assets/projects/` to `public/projects/`
- Kyle.jpeg moves to `public/imgs/`
- Font files stay in `public/fonts/`
- Favicon/meta images stay in `public/imgs/`
- `noise.png` no longer needed (replaced by animated grain)
- Lenis dependency removed
- Vercel Analytics can be added via Astro integration or script tag
- Static assets in `public/` are served as-is (no processing), which is fine for fonts and pre-optimised images. For project screenshots, we can use Astro's `<Image>` component with `src/assets/` if we want build-time optimisation — but `public/` is simpler and these images are already sized appropriately.
