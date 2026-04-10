# Astro Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild kyleshepherd.co.uk from SvelteKit to a fully static Astro site, preserving the same editorial design identity and single-page structure.

**Architecture:** Replace SvelteKit with Astro's static-first architecture. Project data moves from a TypeScript array to Astro content collections (markdown files with typed frontmatter). The static PNG noise overlay is replaced with an animated SVG feTurbulence film grain. Lenis smooth scrolling is removed in favour of native browser scroll.

**Tech Stack:** Astro 5, Tailwind CSS v4, TypeScript, pnpm, Vercel static adapter

---

## File Structure

```
src/
  components/
    Header.astro          # Sticky header with site name
    Hero.astro            # Editorial headline + photo
    About.astro           # Bio/experience text
    Projects.astro        # Renders project list from content collection
    Contact.astro         # CTA + email link
    Footer.astro          # Social links + location
    HandIcon.astro        # Waving hand SVG
    PinIcon.astro         # Location pin SVG
    FilmGrain.astro       # Animated noise overlay (SVG feTurbulence)
  content/
    projects/             # Content collection (9 markdown files)
      checkpnt.md
      noir96.md
      tom-dixon.md
      soon.md
      white-cube.md
      belstaff.md
      pagesmith.md
      beddows-design.md
      appare.md
  content.config.ts       # Collection schema (Zod)
  layouts/
    Base.astro            # HTML shell, meta, fonts, grain, header/footer
  pages/
    index.astro           # Composes Hero + About + Projects + Contact
  styles/
    app.css               # Tailwind v4 imports, @font-face, @theme, utilities
public/
  fonts/                  # Copied from static/fonts/
  imgs/                   # Copied from static/imgs/ + Kyle.jpeg
  projects/               # Copied from src/lib/assets/projects/
astro.config.mjs
tsconfig.json
.nvmrc
package.json
```

---

### Task 1: Scaffold Astro Project

**Files:**
- Create: `package.json` (overwrite existing)
- Create: `astro.config.mjs`
- Create: `tsconfig.json` (overwrite existing)
- Create: `.nvmrc`
- Create: `src/pages/index.astro` (temporary minimal page)
- Delete: `svelte.config.js`
- Delete: `vite.config.ts`
- Delete: `eslint.config.js`
- Delete: `Tiltfile`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "kyleshepherd-co-uk",
  "type": "module",
  "private": true,
  "scripts": {
    "dev": "astro dev --port 3000",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "astro": "^5.7.0",
    "@astrojs/vercel": "^8.1.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.1.0",
    "tailwindcss": "^4.1.0",
    "typescript": "^5.8.0"
  }
}
```

- [ ] **Step 2: Create astro.config.mjs**

```mjs
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

export default defineConfig({
  output: 'static',
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
  },
});
```

- [ ] **Step 3: Create tsconfig.json**

```json
{
  "extends": "astro/tsconfigs/strict"
}
```

- [ ] **Step 4: Create .nvmrc**

```
24
```

- [ ] **Step 5: Remove old config files**

```bash
rm svelte.config.js vite.config.ts eslint.config.js Tiltfile
```

- [ ] **Step 6: Install dependencies**

```bash
pnpm install
```

- [ ] **Step 7: Create minimal index page to verify build**

Create `src/pages/index.astro`:

```astro
---
---
<html lang="en">
  <head><title>Test</title></head>
  <body><h1>Astro works</h1></body>
</html>
```

- [ ] **Step 8: Verify build**

Run: `pnpm build`
Expected: Build completes with `dist/` output, zero errors.

- [ ] **Step 9: Commit**

```bash
git add package.json pnpm-lock.yaml astro.config.mjs tsconfig.json .nvmrc src/pages/index.astro
git commit -m "chore: scaffold Astro project, remove SvelteKit config"
```

---

### Task 2: Static Assets

**Files:**
- Create: `public/fonts/` (8 .otf files, copied from `static/fonts/`)
- Create: `public/imgs/` (favicons, meta image, webmanifest, Kyle.jpeg — copied from `static/imgs/` minus `noise.png`)
- Create: `public/projects/` (9 .png files, copied from `src/lib/assets/projects/`)
- Create: `public/manifest.json` (copied from `static/manifest.json`)

- [ ] **Step 1: Copy static assets to public/**

```bash
mkdir -p public/fonts public/imgs public/projects
cp static/fonts/*.otf public/fonts/
cp static/imgs/apple-touch-icon.png static/imgs/favicon-96x96.png static/imgs/favicon.ico static/imgs/favicon.svg static/imgs/meta.png static/imgs/site.webmanifest static/imgs/web-app-manifest-192x192.png static/imgs/web-app-manifest-512x512.png public/imgs/
cp static/manifest.json public/manifest.json
cp src/lib/assets/Kyle.jpeg public/imgs/Kyle.jpeg
cp src/lib/assets/projects/*.png public/projects/
```

Note: `noise.png` is intentionally NOT copied — it's replaced by the animated film grain component.

- [ ] **Step 2: Verify files are in place**

```bash
ls public/fonts/ && ls public/imgs/ && ls public/projects/
```

Expected: 8 font files, 9 image files + Kyle.jpeg in imgs, 9 project screenshots in projects.

- [ ] **Step 3: Commit**

```bash
git add public/
git commit -m "chore: copy static assets to public/ for Astro"
```

---

### Task 3: Styles

**Files:**
- Create: `src/styles/app.css`

- [ ] **Step 1: Create src/styles/app.css**

```css
@import 'tailwindcss';

@font-face {
  font-family: "PPEditorialOld";
  src: url("/fonts/PPEditorialOld-Regular.otf") format("opentype");
  font-weight: 400;
  font-display: swap;
  font-style: normal;
}

@font-face {
  font-family: "PPEditorialOld";
  src: url("/fonts/PPEditorialOld-Italic.otf") format("opentype");
  font-weight: 400;
  font-display: swap;
  font-style: italic;
}

@font-face {
  font-family: "PPEditorialOld";
  src: url("/fonts/PPEditorialOld-Ultralight.otf") format("opentype");
  font-weight: 300;
  font-display: swap;
  font-style: normal;
}

@font-face {
  font-family: "PPEditorialOld";
  src: url("/fonts/PPEditorialOld-UltralightItalic.otf") format("opentype");
  font-weight: 300;
  font-display: swap;
  font-style: italic;
}

@font-face {
  font-family: "PPNeueMontreal";
  src: url("/fonts/PPNeueMontreal-Book.otf") format("opentype");
  font-weight: 400;
  font-display: swap;
  font-style: normal;
}

@font-face {
  font-family: "PPNeueMontreal";
  src: url("/fonts/PPNeueMontreal-Italic.otf") format("opentype");
  font-weight: 400;
  font-display: swap;
  font-style: italic;
}

@font-face {
  font-family: "PPNeueMontreal";
  src: url("/fonts/PPNeueMontreal-Bold.otf") format("opentype");
  font-weight: 700;
  font-display: swap;
  font-style: normal;
}

@font-face {
  font-family: "PPMondwest";
  src: url("/fonts/PPMondwest-Regular.otf") format("opentype");
  font-weight: 700;
  font-display: swap;
  font-style: normal;
}

@theme {
  --breakpoint-xxs: 24rem;
  --breakpoint-xs: 30rem;
  --color-black: oklch(0.2002 0 0);
  --color-white: oklch(0.899 0.0133 82.4);
  --font-serif: "PPEditorialOld", "serif";
  --font-sans: "PPNeueMontreal", "sans-serif";
  --font-mono: "PPMondwest", "monospace";
  --leading-chill: 1.1;
}

::selection {
  @apply bg-white text-black;
}

.link {
  @apply underline decoration-white/0 transition-colors hover:decoration-white/100;
}

.component-padding {
  @apply xxs:px-3 px-2 sm:px-5;
}

p > a {
  @apply underline;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/app.css
git commit -m "feat: add Tailwind v4 styles with custom fonts and theme"
```

---

### Task 4: Base Layout + Film Grain

**Files:**
- Create: `src/components/FilmGrain.astro`
- Create: `src/layouts/Base.astro`

- [ ] **Step 1: Create src/components/FilmGrain.astro**

```astro
<div class="pointer-events-none fixed inset-0 z-30" aria-hidden="true">
  <svg class="absolute" width="0" height="0">
    <filter id="grain">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.65"
        numOctaves="3"
        stitchTiles="stitch"
      />
    </filter>
  </svg>
  <div class="grain"></div>
</div>

<style>
  .grain {
    position: absolute;
    inset: -200%;
    width: 400%;
    height: 400%;
    filter: url(#grain);
    opacity: 0.05;
    mix-blend-mode: soft-light;
    animation: shift 0.6s steps(4) infinite;
  }

  @keyframes shift {
    0% {
      transform: translate(0, 0);
    }
    25% {
      transform: translate(-5%, -5%);
    }
    50% {
      transform: translate(5%, -10%);
    }
    75% {
      transform: translate(-10%, 5%);
    }
  }
</style>
```

- [ ] **Step 2: Create src/layouts/Base.astro**

```astro
---
import '../styles/app.css';
import FilmGrain from '../components/FilmGrain.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" type="image/png" href="/imgs/favicon-96x96.png" sizes="96x96" />
    <link rel="icon" type="image/svg+xml" href="/imgs/favicon.svg" />
    <link rel="shortcut icon" href="/imgs/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/imgs/apple-touch-icon.png" />
    <meta name="apple-mobile-web-app-title" content="Kyle Shepherd" />
    <link rel="manifest" href="/imgs/site.webmanifest" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title>Kyle Shepherd | Senior Fullstack Engineer</title>
    <meta name="title" content="Kyle Shepherd | Senior Fullstack Engineer" />
    <meta
      name="description"
      content="I'm a Software Engineer specialising in JS and Go, currently building at Kitt."
    />

    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://kyleshepherd.co.uk" />
    <meta property="og:title" content="Kyle Shepherd | Senior Fullstack Engineer" />
    <meta
      property="og:description"
      content="I'm a Software Engineer specialising in JS and Go, currently building at Kitt."
    />
    <meta property="og:image" content="https://kyleshepherd.co.uk/imgs/meta.png" />

    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://kyleshepherd.co.uk" />
    <meta property="twitter:title" content="Kyle Shepherd | Senior Fullstack Engineer" />
    <meta
      property="twitter:description"
      content="I'm a Software Engineer specialising in JS and Go, currently building at Kitt."
    />
    <meta property="twitter:image" content="https://kyleshepherd.co.uk/imgs/meta.png" />
  </head>
  <body class="bg-black font-sans text-white">
    <FilmGrain />
    <div class="mx-auto max-w-[2560px]">
      <Header />
      <slot />
      <Footer />
    </div>
  </body>
</html>
```

Note: This imports Header and Footer which don't exist yet — they'll be created in Task 5. The build will fail until then, which is expected.

- [ ] **Step 3: Commit**

```bash
git add src/components/FilmGrain.astro src/layouts/Base.astro
git commit -m "feat: add Base layout with meta tags and animated film grain"
```

---

### Task 5: Header, Footer, and Icon Components

**Files:**
- Create: `src/components/Header.astro`
- Create: `src/components/Footer.astro`
- Create: `src/components/HandIcon.astro`
- Create: `src/components/PinIcon.astro`

- [ ] **Step 1: Create src/components/Header.astro**

```astro
<header class="xxs:p-3 sticky top-0 z-20 bg-black p-2 !pb-0 sm:px-5">
  <div class="border-b border-white/50 pb-3">
    <a href="/" class="font-serif text-4xl">Kyle Shepherd</a>
  </div>
</header>
```

- [ ] **Step 2: Create src/components/HandIcon.astro**

```astro
---
interface Props {
  classes?: string;
}

const { classes } = Astro.props;
---

<svg
  xmlns="http://www.w3.org/2000/svg"
  width="200"
  height="200"
  viewBox="0 0 20 20"
  class={classes}
>
  <path
    fill="currentColor"
    d="M15.848 1.143a.492.492 0 0 0-.702.001a.508.508 0 0 0 .008.712a6.571 6.571 0 0 1 1.855 5.567a.508.508 0 0 0 .42.574a.492.492 0 0 0 .563-.42a7.594 7.594 0 0 0-2.144-6.434ZM4.626 3.033a1.6 1.6 0 0 1 3.042-.626a1.6 1.6 0 0 1 2.588.699l.088.27a1.6 1.6 0 0 1 2.546.734l1.066 3.23l.584 1.704a8.5 8.5 0 0 1 .38 3.9l-.27 1.988a2.5 2.5 0 0 1-1.513 1.97l-2.158.901c-.972.406-2.068.148-2.804-.557c-3.11-2.982-5.879-3.97-6.64-4.199c-.358-.108-.664-.52-.474-.972c.15-.356.51-.98 1.281-1.321c.593-.263 1.361-.33 2.35-.068L2.765 5.101a1.613 1.613 0 0 1 1.027-2.028c.28-.091.566-.1.833-.04Zm2.151 3.645l.555 1.679a.5.5 0 1 1-.95.314l-.568-1.72l-.952-2.519l-.004-.01a.607.607 0 0 0-.756-.398a.613.613 0 0 0-.386.764l2.257 6.548a.5.5 0 0 1-.67.622c-1.332-.57-2.113-.486-2.556-.29c-.294.13-.49.333-.616.52c1.134.388 3.8 1.522 6.736 4.336c.474.454 1.153.596 1.727.357l2.157-.902a1.5 1.5 0 0 0 .908-1.181l.27-1.988a7.5 7.5 0 0 0-.335-3.442l-.585-1.707l-.002-.005l-1.067-3.234V4.42a.6.6 0 0 0-1.162.29l.855 2.633a.5.5 0 0 1-.95.312l-.005.001L9.847 5.1a1.626 1.626 0 0 1-.036-.13l-.506-1.554a.6.6 0 0 0-1.141.37l.603 1.856c.012.037.02.075.023.112l.527 1.592a.5.5 0 1 1-.95.314L6.794 2.91a.6.6 0 0 0-1.139.378l1.102 3.33l.023.06l-.003.001Zm7.467-3.608a.5.5 0 0 1 .686.173l.296.495c.498.834.766 1.785.775 2.757a.5.5 0 1 1-1 .009a4.471 4.471 0 0 0-.633-2.253l-.296-.495a.5.5 0 0 1 .172-.686Z"
  />
</svg>
```

- [ ] **Step 3: Create src/components/PinIcon.astro**

```astro
---
interface Props {
  classes?: string;
}

const { classes } = Astro.props;
---

<svg
  xmlns="http://www.w3.org/2000/svg"
  width="200"
  height="200"
  viewBox="0 0 24 24"
  class={classes}
>
  <g
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="1.5"
    color="currentColor"
  >
    <circle cx="12" cy="7" r="4" />
    <path d="M12 11v7m5 1c0 1.105-2.239 2-5 2s-5-.895-5-2" />
  </g>
</svg>
```

- [ ] **Step 4: Create src/components/Footer.astro**

```astro
---
import PinIcon from './PinIcon.astro';

const links = [
  { href: 'https://github.com/kyleshepherd', label: 'Github' },
  { href: 'https://www.linkedin.com/in/kyleshepherddev/', label: 'LinkedIn' },
];
---

<footer class="xxs:p-3 p-2 sm:px-5">
  <div class="flex items-center justify-between gap-4 border-t border-white/50 pt-3">
    <div class="flex items-center gap-4">
      {links.map((link) => (
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          class="link font-mono text-xl sm:text-2xl"
        >
          {link.label}
        </a>
      ))}
    </div>
    <p class="font-mono text-xl sm:text-2xl">
      <PinIcon classes="inline size-[20px] sm:size-[24px] align-text-top" />
      London, UK
    </p>
  </div>
</footer>
```

- [ ] **Step 5: Commit**

```bash
git add src/components/Header.astro src/components/Footer.astro src/components/HandIcon.astro src/components/PinIcon.astro
git commit -m "feat: add Header, Footer, and icon components"
```

---

### Task 6: Hero Section

**Files:**
- Create: `src/components/Hero.astro`

- [ ] **Step 1: Create src/components/Hero.astro**

```astro
---
import HandIcon from './HandIcon.astro';
---

<div class="component-padding xxs:pt-3 relative pt-2 sm:pt-5">
  <h1
    class="xs:text-4xl leading-chill relative z-10 max-w-6xl font-serif text-3xl tracking-wide text-balance uppercase sm:text-5xl md:text-6xl lg:text-7xl 2xl:max-w-[1800px] 2xl:text-8xl"
  >
    <HandIcon
      classes="inline size-[30px] xs:size-[36px] sm:size-[48px] md:size-[60px] lg:size-[72px] 2xl:size-[96px] align-bottom mr-1 sm:mr-2"
    />I'm a Software Engineer specialising in JS and Go, currently building at
    <a
      href="https://www.kittoffices.com/"
      class="link decoration-from-font underline-offset-[1rem]"
      target="_blank"
      rel="noopener noreferrer"
    >
      Kitt</a
    >.
  </h1>
  <img
    alt="A picture of me, Kyle Shepherd"
    src="/imgs/Kyle.jpeg"
    class="-z-10 -mt-8 opacity-35 grayscale sm:mr-0 sm:ml-auto md:-mt-24 md:max-w-[65%] xl:-mt-32 xl:max-w-[min(1000px,_45vw)]"
  />
</div>
```

Note: Uses a plain `<img>` tag instead of SvelteKit's `enhanced:img`. The image in `public/imgs/Kyle.jpeg` is served as-is. Build-time image optimisation can be added later via Astro's `<Image>` component if desired.

- [ ] **Step 2: Commit**

```bash
git add src/components/Hero.astro
git commit -m "feat: add Hero section"
```

---

### Task 7: About Section

**Files:**
- Create: `src/components/About.astro`

- [ ] **Step 1: Create src/components/About.astro**

```astro
<div class="component-padding mt-12 xl:mb-4">
  <p class="max-w-prose text-lg xl:text-xl 2xl:text-2xl">
    I'm <span class="font-mono">Kyle</span>, a Software Engineer based in London with over six years
    of experience working in agencies on projects for global clients, such as Tom Dixon, White Cube
    and Belstaff. I specialise in modern JavaScript frameworks (Svelte/Next.js), Go and Node.js.<br
    /><br />
    Currently, I work at
    <a
      href="https://www.kittoffices.com/"
      class="link font-mono decoration-from-font underline-offset-[0.25rem]"
      target="_blank"
      rel="noopener noreferrer"
    >
      Kitt</a
    >, a London-based managed workspace partner, as a software engineer. Here, I help to build and
    maintain the tech used by Kitt employees themselves in their day-to-day work, as well as the
    clients in-office use themselves to manage their office space.<br /><br />
    Alongside development, I'm involved in shaping features and functionality through planning and technical
    design. I also support team growth through code reviews and mentoring junior developers.
  </p>
</div>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/About.astro
git commit -m "feat: add About section"
```

---

### Task 8: Content Collections

**Files:**
- Create: `src/content.config.ts`
- Create: `src/content/projects/checkpnt.md`
- Create: `src/content/projects/noir96.md`
- Create: `src/content/projects/tom-dixon.md`
- Create: `src/content/projects/soon.md`
- Create: `src/content/projects/white-cube.md`
- Create: `src/content/projects/belstaff.md`
- Create: `src/content/projects/pagesmith.md`
- Create: `src/content/projects/beddows-design.md`
- Create: `src/content/projects/appare.md`

- [ ] **Step 1: Create src/content.config.ts**

```ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    projectUrl: z.string().url().optional(),
    image: z.string(),
    techTags: z.array(z.string()),
    order: z.number(),
  }),
});

export const collections = { projects };
```

- [ ] **Step 2: Create src/content/projects/checkpnt.md**

```markdown
---
name: "Checkpnt"
slug: checkpnt
projectUrl: "https://checkpnt.app/"
image: "/projects/checkpnt.png"
techTags: ["SvelteKit", "TailwindCSS", "oRPC", "Postgres", "Meilisearch"]
order: 1
---

A social game review platform, allowing users to track and share the games they play. This is a passion project of mine primarily built to learn and experiment with new technologies and ideas.

The frontend is built with SvelteKit and TailwindCSS, using oRPC to communicate with a Postgres database. Meilisearch is used to provide fast and relevant search results for games and users.

The project is still in active development, with new features and improvements being added regularly.
```

- [ ] **Step 3: Create src/content/projects/noir96.md**

```markdown
---
name: "Noir96"
slug: noir96
projectUrl: "https://noir96.com/"
image: "/projects/noir96.png"
techTags: ["SvelteKit", "TailwindCSS", "Sanity CMS", "Vercel"]
order: 2
---

A freelance project for design studio Noir96. This was a really fun project to work on, Luke brought along some designs and ideas for animation and interaction which I was able to implement using SvelteKit and TailwindCSS.

The collaboration worked great, with us iterating and tweaking the Work page panning and page transitions.
```

- [ ] **Step 4: Create src/content/projects/tom-dixon.md**

```markdown
---
name: "Tom Dixon"
slug: tom-dixon
projectUrl: "http://tomdixon.net/"
image: "/projects/tomdixon.png"
techTags: ["SvelteKit", "Go", "React", "E-commerce", "Shopify", "GCP", "Terraform", "TailwindCSS"]
order: 3
---

This project was a large-scale e-commerce transformation at SOON_, built on Shopify and powered by our custom in-house platform, SOON_CMS.

I was responsible for building pages and functionality for the site using SvelteKit, whilst also working on our in-house Shopify GraphQL library in Go. Along with this, I built functionality for CMS users to add Promo Blocks to any PDP, which allowed the client to have better control on content curation.

One of the more interesting challenges came with the PDP, where a significant amount of product data needed to be displayed in the Details Tray. To handle this efficiently, I used our Go-based GraphQL API to structure and streamline the data from Shopify before consuming it within the SvelteKit frontend.

The site went on to win a <a href="https://www.w3award.com/winners/gallery/?event=1092&search=tom%20dixon&id=352007" target="_blank" rel="noopener noreferrer">handful of w3 Awards</a>, including a Gold Award for General Website (Consumer Goods).
```

- [ ] **Step 5: Create src/content/projects/soon.md**

```markdown
---
name: "SOON_ E-commerce"
slug: soon
projectUrl: "https://thisissoon.com/"
image: "/projects/soon.png"
techTags: ["Go", "React", "E-commerce", "Shopify", "gRPC", "Protobuf", "MUI", "Terraform", "GCP", "GraphQL"]
order: 4
---

I've worked on internal projects as part of SOON_'s e-commerce accelerator products - including frontend libraries, custom CMS and e-commerce tools and asset services.

I have led full-stack development on projects such as adding an Asset Manager and Image Focal Points to our CMS, both from feature design to deployment. This involved me creating components and functionality using React and MUI, and then implementing the backend using Protocol Buffers, Go and gRPC.

I also led the development of adding a new resource, Campaign Blocks, to our CMS. This involved me adding new object and function definitions in Protocol Buffers, and then implementing these functions as gRPC calls in our Go-based backend, whilst ensuring backwards compatibility. This allowed our CMS users to add a variety of content blocks to product list pages and product detail pages across their site, in order to enable the client to wholly curate their frontend experience to the end-users.
```

- [ ] **Step 6: Create src/content/projects/white-cube.md**

```markdown
---
name: "White Cube"
slug: white-cube
image: "/projects/whitecube.png"
techTags: ["React", "Node.js", "AWS", "Terraform", "Sequelize", "TailwindCSS", "GraphQL"]
order: 5
---

SOON_ were brought in to help White Cube prepare their bespoke inventory web-app for release to their internal team, after they were let down by another agency. The application was created to take their inventory system away from a Microsoft Access database that required a VPN to access and port it into a web-app.

The majority of my work on the inventory project involved adding functionality and fixing bugs in their React.js frontend and Node.js-powered GraphQL backend. This was an interesting challenge, as it required picking up a sizeable codebase that had been written by various outsourcers, so it was imperative that we quickly gained knowledge and refactored part of the project in order to improve the developer experience for the rest of the project.

I also recently led the development of a suite of image tools; an AWS Lambda function that handled resizing and converting images uploaded via the frontend, and authenticated endpoint deployed via ECS that would allow the client to access/embed images from their private S3 bucket into other platforms. This allowed me to learn more about the AWS ecosystem, and work with Terraform and Docker to deploy these applications.
```

- [ ] **Step 7: Create src/content/projects/belstaff.md**

```markdown
---
name: "Belstaff"
slug: belstaff
projectUrl: "https://www.belstaff.com/"
image: "/projects/belstaff.png"
techTags: ["Svelte", "Sapper", "Go", "E-commerce", "Shopify", "GCP", "Terraform", "React", "GraphQL"]
order: 6
---

A full replatforming of luxury British fashion brand Belstaff's e-commerce website. I was responsible for building responsive components and pages, as well as integrating Shopify and our custom CMS into the Sapper/Svelte frontend.

Later, I contributed to the migration of the project to SvelteKit and updates to the site's original design. The website is now maintained by Belstaff's internal tech team, who have since taken over ongoing development.
```

- [ ] **Step 8: Create src/content/projects/pagesmith.md**

```markdown
---
name: "Pagesmith"
slug: pagesmith
image: "/projects/pagesmith.png"
techTags: ["Svelte", "Sapper", "E-commerce", "Shopify", "Firebase", "REST"]
order: 7
---

A collaborative project between SOON_, Wonderbly and Faber & Faber. The goal was to create a web app to allow users to create customised poetry gift books for their loved ones.

I was the lead frontend developer on the project, my responsibilities were building the customisation experience using Svelte + Sapper, and integrating the frontend with Shopify to place orders, our Firebase backend and Wonderbly's REST API to fetch book details.

The project has since been shut down by the client.
```

- [ ] **Step 9: Create src/content/projects/beddows-design.md**

```markdown
---
name: "Beddows Design"
slug: beddows-design
projectUrl: "https://beddowsdesign.com/"
image: "/projects/beddowsdesign.png"
techTags: ["SvelteKit", "Sanity CMS", "Vercel"]
order: 8
---

A freelance project for Alex Beddows, a multi-disciplinary artist working across 3D game art and photography. He needed a portfolio site that could showcase both disciplines in a cohesive and flexible way.

The site is built with SvelteKit and Sanity, giving Alex full control over his content and allowing him to customise each project to suit his creative vision.
```

- [ ] **Step 10: Create src/content/projects/appare.md**

```markdown
---
name: "Appare Yosakoi Vancouver"
slug: appare
projectUrl: "https://yosakoivancouver.com/"
image: "/projects/appare.png"
techTags: ["SvelteKit", "Sanity CMS", "Netlify"]
order: 9
---

A freelance project for Appare Yosakoi, a Vancouver-based dance group. They needed a website to showcase their performances and provide a way for events and organizations to enquire about bookings.

The site is built with SvelteKit and uses Sanity as a CMS, allowing the team to easily manage content, adding new performances, updating gallery images, and editing text across the site without needing developer input.
```

- [ ] **Step 11: Commit**

```bash
git add src/content.config.ts src/content/projects/
git commit -m "feat: add content collection schema and project markdown files"
```

---

### Task 9: Projects Section

**Files:**
- Create: `src/components/Projects.astro`

- [ ] **Step 1: Create src/components/Projects.astro**

```astro
---
import type { CollectionEntry } from 'astro:content';
import { render } from 'astro:content';

interface Props {
  projects: CollectionEntry<'projects'>[];
}

const { projects } = Astro.props;

const rendered = await Promise.all(
  projects.map(async (project) => {
    const { Content } = await render(project);
    return { data: project.data, Content };
  })
);
---

<div class="component-padding mt-8 sm:mt-12">
  <h2 class="xs:text-3xl font-serif text-2xl sm:text-4xl">Projects</h2>
  <div class="mt-2 flex flex-col gap-8 sm:mt-6 md:gap-12">
    {rendered.map(({ data, Content }) => (
      <div class="group flex flex-wrap justify-between gap-4 border-b border-white/50 pb-8 lg:flex-nowrap lg:gap-6 lg:pb-12">
        <div class="basis-full lg:basis-1/2">
          <h3 class="mb-2 font-mono text-2xl sm:text-3xl 2xl:text-4xl">{data.name}</h3>
          {data.projectUrl ? (
            <a
              href={data.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Link to ${data.name} website`}
            >
              <img
                alt={`Screenshot of the ${data.name} website`}
                src={data.image}
                class="mx-auto opacity-60 grayscale-100 transition-all group-hover:opacity-100 group-hover:grayscale-0"
              />
            </a>
          ) : (
            <img
              alt={`Screenshot of the ${data.name} website`}
              src={data.image}
              class="mx-auto opacity-60 grayscale-100 transition-all group-hover:opacity-100 group-hover:grayscale-0"
            />
          )}
        </div>
        <div class="flex basis-full flex-col items-start justify-between lg:basis-1/2">
          <div class="md:mt-9 2xl:mt-10">
            {data.techTags.length > 0 && (
              <div class="mb-2 flex flex-wrap gap-2 md:mb-4">
                {data.techTags.map((tag) => (
                  <span class="rounded-xl border border-white/20 px-4 py-1 text-sm">{tag}</span>
                ))}
              </div>
            )}
            <div class="text-lg [&>p+p]:mt-4 2xl:text-xl">
              <Content />
            </div>
          </div>
          {data.projectUrl && (
            <a
              href={data.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="link mt-4 font-serif text-xl"
            >
              View Site
            </a>
          )}
        </div>
      </div>
    ))}
  </div>
</div>
```

Note: The `[&>p+p]:mt-4` class adds spacing between consecutive paragraphs rendered from markdown. The current SvelteKit version uses `<br/><br/>` inside a single `<p>` — this achieves similar visual spacing with proper semantic HTML.

- [ ] **Step 2: Commit**

```bash
git add src/components/Projects.astro
git commit -m "feat: add Projects section with content collection rendering"
```

---

### Task 10: Contact Section

**Files:**
- Create: `src/components/Contact.astro`

- [ ] **Step 1: Create src/components/Contact.astro**

```astro
---
import HandIcon from './HandIcon.astro';
---

<div class="component-padding py-8 md:py-12">
  <p class="text-lg 2xl:text-xl">
    If you'd like to get in touch, feel free to drop me an email at <a
      href="mailto:kyleshepherddev@gmail.com"
      class="link font-mono"
    >
      kyleshepherddev@gmail.com</a
    >—I'll get back to you as soon as I can.
    <HandIcon classes="inline size-[32px] xl:size-[36px] align-bottom ml-1 sm:ml-2" />
  </p>
</div>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Contact.astro
git commit -m "feat: add Contact section"
```

---

### Task 11: Index Page

**Files:**
- Modify: `src/pages/index.astro` (replace temporary content from Task 1)

- [ ] **Step 1: Replace src/pages/index.astro**

```astro
---
import { getCollection } from 'astro:content';
import Base from '../layouts/Base.astro';
import Hero from '../components/Hero.astro';
import About from '../components/About.astro';
import Projects from '../components/Projects.astro';
import Contact from '../components/Contact.astro';

const projects = (await getCollection('projects')).sort(
  (a, b) => a.data.order - b.data.order
);
---

<Base>
  <Hero />
  <About />
  <Projects projects={projects} />
  <Contact />
</Base>
```

- [ ] **Step 2: Verify build**

Run: `pnpm build`
Expected: Build completes successfully. `dist/index.html` is generated.

- [ ] **Step 3: Verify dev server**

Run: `pnpm dev`
Expected: Page renders at `http://localhost:3000` with all sections visible — Header, Hero (headline + photo), About, Projects (9 projects with images, tags, descriptions), Contact, Footer. Film grain overlay animates. Fonts render correctly.

- [ ] **Step 4: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: add index page composing all sections"
```

---

### Task 12: Cleanup Old SvelteKit Files

**Files:**
- Delete: `src/app.html`
- Delete: `src/app.css`
- Delete: `src/app.d.ts`
- Delete: `src/lib/` (entire directory)
- Delete: `src/routes/` (entire directory)
- Delete: `static/` (entire directory — assets now in `public/`)

- [ ] **Step 1: Remove old SvelteKit source files**

```bash
rm src/app.html src/app.css src/app.d.ts
rm -rf src/lib/ src/routes/ static/
```

- [ ] **Step 2: Verify build still passes**

Run: `pnpm build`
Expected: Clean build. No references to deleted files.

- [ ] **Step 3: Verify dev server**

Run: `pnpm dev`
Expected: Site renders identically to before cleanup. All sections, images, fonts, and film grain working correctly.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove old SvelteKit source files and static directory"
```
