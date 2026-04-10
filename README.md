# kyleshepherd.co.uk

Personal portfolio site built with Astro, Tailwind CSS v4, and TypeScript. Deployed as a fully static site on Vercel.

## Stack

- **Astro 6** — static site generator
- **Tailwind CSS v4** — styling
- **TypeScript** — type safety
- **Sharp** — build-time image optimization
- **Vercel** — static hosting (free tier)

## Developing

```bash
pnpm install
pnpm dev
```

Runs at `http://localhost:3000`.

## Building

```bash
pnpm build
```

Output goes to `dist/` and `.vercel/output/static/`.

## Content

Projects are managed as markdown files with typed frontmatter in `src/content/projects/`. The schema is defined in `src/content.config.ts`.
