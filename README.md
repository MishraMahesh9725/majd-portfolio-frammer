# Majd portfolio

A responsive clone of the Majd / Templyo Framer portfolio. Layout, type, and color values were measured from the live site and recorded in `reference/design-spec.md`.

## Setup

```bash
npm install
npm run dev
```

The app runs at [http://localhost:5173](http://localhost:5173).

## Scripts

- `npm run dev` — Vite dev server
- `npm run build` — typecheck and production build
- `npm run preview` — preview the production build

## Routes

- `/` home (`#hero-section`, `#bio-section`, `#services`, `#contact`)
- `/work` all projects
- `/work/:slug` project pages (`damas`, `najm`, `kavi`, `sham`, `aiwings`, `abjad`, `fasselh`)
- `/blog` all articles
- `/blog/:slug` article pages
