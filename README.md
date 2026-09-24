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

- Hover the model or its labels to reveal a project summary; click or tap to open details.
- Hands → ASL Master; ears → Tone-aware Translator; heart → Calculus Teachable Agent; brain → Accounting, Reimagined.
- Keyboard-accessible project buttons and dialogs, Escape-to-close, reduced-motion support, and a project navigation fallback when WebGL is unavailable.
- Résumé, GitHub, LinkedIn, and email links.
- Lazy-loaded Three.js, capped pixel density, and rendering suspended when the portrait is offscreen or the document is hidden.

## Edit the content

- `lib/projects.ts`: project descriptions, contribution summaries, and links.
- `app/page.tsx`: introduction, navigation, and project details.
- `app/globals.css`: colors, typography, and responsive layout.
- `components/portrait.tsx`: model, camera, lighting, raycasting, and anchored labels.
- `public/Gaode-Gao-Resume.pdf`: résumé download.

The 3D character is a procedural stylized stand-in, not a scan or an exact likeness. It can be replaced with a personalized GLB/GLTF model while retaining the hotspot IDs and project content. No reference photograph was provided.

Content is grounded in the supplied résumé and linked project documentation. Team projects describe Gaode's role rather than claiming sole authorship. No unverified impact metrics are included.

## Hosting

The default build outputs a Cloudflare-compatible Worker and browser assets under `dist/`. Sites configuration is in `.openai/hosting.json`; it contains a project identifier, not credentials. For another Next.js host, choose the `build:next` command. Do not commit `.env` files, dependency directories, or generated builds.
