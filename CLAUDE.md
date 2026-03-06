# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Wedding website for **Cherly Michelle Barahona Aguilar** and **Carlos Enrique Ávila Flores**.

- Event date: April 18, 2026
- Venue: INJUPEMP Center, Tegucigalda F.M., Honduras
- Expected guests: 90
- Language: Spanish (`lang="es"`)

Full event details (itinerary, dress code, RSVP deadline, parents' names) are in `src/assets/data/wedding.txt`.

## Commands

```bash
pnpm dev       # Dev server at localhost:4321
pnpm build     # Production build to ./dist/
pnpm preview   # Preview production build locally
```

## Tech Stack

- **Framework:** Astro 5 (static site generation)
- **Package manager:** pnpm
- **TypeScript:** strict mode (via `astro/tsconfigs/strict`)
- **Styling:** none yet — add as needed (Tailwind, plain CSS, etc.)

## Project Structure

```
src/
├── pages/
│   └── index.astro        # Main (and only) page — currently a placeholder
└── assets/
    ├── data/
    │   └── wedding.txt    # All wedding event data
    ├── photos/            # 13 couple/event JPEGs (WhatsApp timestamps)
    ├── inspiration/       # 4 design inspiration WebPs
    └── references/        # 6 reference JPEGs
public/                    # favicon.svg, favicon.ico
```

## Architecture Notes

- Single-page Astro app. All routes live under `src/pages/`.
- No integrations configured yet in `astro.config.mjs` — add them there as needed (e.g., Tailwind, MDX, image optimization).
- `pnpm-workspace.yaml` is set up with `onlyBuiltDependencies: [esbuild, sharp]`; sharp is available for image processing if needed.
- No tests configured. No environment variables in use.
- VS Code: use the Astro extension (`astro-build.astro-vscode`).
