# AGENTS.md

## Project purpose

This repository contains the static Persian-first website for `https://mahsai.ir`.
It is the developer's personal brand, portfolio, application catalog, and official
support surface.

## Non-negotiable rules

- Keep the site fully static. Do not add SSR, API routes, a backend, database,
  authentication, or a CMS.
- Keep `site: 'https://mahsai.ir'` in `astro.config.mjs` and do not add a repository
  `base` path.
- Use strict TypeScript and preserve the strictest Astro configuration.
- Persian is the source language. Preserve `lang="fa-IR"` and `dir="rtl"`.
- Structure new user-facing copy so a future English locale can be added without
  embedding personal facts inside reusable UI components.
- Never invent biography, work history, apps, projects, clients, numbers, awards,
  testimonials, links, or contact details.
- Keep personal information in `src/config/site.ts`, applications in
  `src/content/apps/`, specialties in `src/data/specialties.ts`, and projects in
  `src/data/projects.ts`.
- Do not add secrets, analytics, trackers, external fonts, or large UI libraries
  without explicit approval.

## Architecture

- `src/config/`: global typed site settings and SEO defaults.
- `src/content/apps/`: typed Astro content collection for application records.
- `src/content/articles/`: typed Markdown articles and SEO metadata.
- `src/data/`: editable portfolio and specialty data.
- `src/components/`: reusable presentational components with no invented content.
- `src/layouts/`: shared document shell, metadata, structured data, header, footer.
- `src/pages/`: file-based static routes.
- `src/styles/global.css`: tokens, responsive layout, light/dark styles, and focus
  states.
- `public/`: files copied unchanged into the final build.

## Required checks

Use the committed package manager and run all of the following before handing off:

```sh
pnpm run format:check
pnpm run check
pnpm run build
```

If formatting fails, run `pnpm run format`, then repeat every check. Inspect `dist/`
and confirm all required routes, `robots.txt`, and generated sitemap files exist.

## Quality requirements

- Semantic HTML and one meaningful `h1` per page.
- Keyboard-operable navigation, visible focus states, and descriptive link labels.
- Mobile-first layouts that remain usable at 320 CSS pixels and large desktop sizes.
- Accessible light/dark contrast and respect for `prefers-reduced-motion`.
- Unique page titles/descriptions, canonical URLs, Open Graph metadata, and valid
  sitemap output.
- No broken local links or image references.
- Keep client-side JavaScript at zero unless an interaction cannot be implemented
  accessibly with HTML and CSS.
- Do not publish placeholder personal or legal content as if it were final.

## Deployment rules

- Deploy only through `.github/workflows/deploy.yml` using the official Astro action.
- GitHub Pages must use GitHub Actions as its source.
- Configure `mahsai.ir` in repository Pages settings; DNS changes are performed at
  the domain provider.
- Never push or deploy until checks and a production build succeed.
