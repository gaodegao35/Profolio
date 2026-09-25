# Gaode Gao — Interactive Portfolio

A responsive portfolio landing page built with React, TypeScript, Three.js, and a Next.js App Router structure. The default runtime is Vinext (Vite-based Next.js compatibility) for Sites hosting; standard Next.js commands are also available.

## Run locally

Requires Node.js 22.13 or newer.

```sh
npm ci
npm run dev
```

Open the local URL printed in the terminal (normally http://localhost:5173).

```sh
npm run typecheck
npm run build
```

For the standard Next.js runtime, use `npm run dev:next` or `npm run build:next` followed by `npm run start:next`.

## Experience

- Click a portrait label to scroll to the horizontal project gallery and reveal its thumbnail. No project dialogs or long homepage case studies.
- Hands → ASL Master; ears → Tone-aware Translator; heart → Calculus Teachable Agent; brain → Accounting, Reimagined.
- Swipe, drag, use the gallery arrows, or use left/right keyboard keys to browse thumbnails. Each card shows only its title and role and opens an internal project page.
- Work Experience and Education are separate pages linked from the Experience dropdown. No résumé navigation or promotional footer copy.
- LinkedIn and email links.
- Photo-inspired portrait illustration with restrained pointer tilt. The original Three.js prototype is preserved separately for future model integration.

## Edit the content

- `lib/projects.ts`: project descriptions, contribution summaries, and links.
- `app/page.tsx`: introduction and horizontal project gallery.
- `app/projects/[slug]/page.tsx`: internal, screenshot-led project pages.
- `app/experience/page.tsx`, `app/education/page.tsx`: separate professional background pages.
- `lib/project-pages.ts`: route slugs and ordered long-image case-study panels.
- `SCREENSHOT-CHECKLIST.md`: requested Figma exports and screen-by-screen capture guidance.
- `app/globals.css`: colors, typography, and responsive layout.
- `components/portrait.tsx`: illustrated portrait, pointer tilt, and project hotspots.
- `components/portrait-prototype.tsx`: original procedural Three.js prototype (not rendered).
- `lib/portfolio-content.ts`: feature summaries, screenshot metadata, and experience.
- `public/projects/`: real interface captures from local project previews.
- `public/Gaode-Gao-Resume.pdf`: preserved earlier asset, not linked in the interface.

The current portrait is an AI-generated raster illustration based on the supplied photograph, not a 3D mesh, scan, or exact likeness. A personalized GLB/GLTF asset is still needed for genuine rotation and 3D body-part interaction. Its four hotspot IDs already connect to project sections. The original photos are not included in this repository. See `ASSET-NOTES.md` for asset provenance and generation prompts.

Content is grounded in the supplied résumé and linked project documentation. Team projects describe Gaode's role rather than claiming sole authorship. No unverified impact metrics are included.

## Hosting

The default build outputs a Cloudflare-compatible Worker and browser assets under `dist/`. Sites configuration is in `.openai/hosting.json`; it contains a project identifier, not credentials. For another Next.js host, choose the `build:next` command. Do not commit `.env` files, dependency directories, or generated builds.
