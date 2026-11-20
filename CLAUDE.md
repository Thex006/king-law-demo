# The King Law Office (agency demo #5)

Concept site for a real Savannah, GA criminal defense practice that has no website: The King Law Office, LLC (attorney Taylor Anne King, 100 Bull St, Suite 200). Next.js 15 App Router, React 19, TypeScript, Tailwind v4, Framer Motion, Lenis, React Three Fiber, Phosphor icons, Geist. Localhost only, no paid services, no database.

## Graph first
Before reading code broadly, read `graphify-out/GRAPH_REPORT.md` (build it with `pip install graphifyy` then `graphify update .`). Never commit `graphify-out/`.

## Where things live
- `lib/site.ts`: every fact, review, case stage and FAQ. Change content here, not in components. Facts are verified against the firm's Google Maps listing and Avvo profile (checked 2026-11-19); add nothing that is not on those.
- `lib/consult.ts`: consultation form validation, shared by the form and `app/api/consult/route.ts` (requests append to `data/consults.jsonl`, gitignored). Unit tested in `tests/`.
- `components/`: one file per section (hero, tagline-reveal, record-bento, case-ring, reviews, savannah-rail, faq, consult, site-footer, site-nav, mobile-bar, loader).
- `components/three/depth-photo.tsx`: the hero's real 3D. The night photo is displaced by `public/images/hero-depth.png`, a depth map made offline with Depth Anything V2 small (ONNX). Build the ShaderMaterial imperatively: passing `uniforms` as a JSX prop copies the object and textures set later never reach the GPU (the hero rendered black).
- `public/images/`: Unsplash (free licence) and Wikimedia Commons photos, graded and exported at 3840px.

## Rules
- Skills in `.claude/skills/` apply: landing-page-design and figma-designer (elayadesign/ai-design-skills, mandatory), design-taste-frontend, impeccable, typeui-minimal, writing-guidelines, playwright-cli and the addyosmani agent skills.
- Design: black grounds, bone type, one brass accent (#d6ad62). Light mode (Thierry asked 2026-11-20): toggle in the nav (`components/theme-toggle.tsx`, saved as `king-theme`, dark default, applied before paint in layout). Light tokens live under `:root[data-theme="light"]` in globals.css; `.theme-dark` pins the hero and every caption over a photo to the night palette. Text on brass uses `text-onbrass`, never `text-ink`. Geist only (Geist Mono for small labels). Flat backgrounds; scrims only over photos.
- Legal: attorney advertising notice, "not legal advice", "no attorney client relationship" and "past results" lines must stay. Never promise outcomes. Reviews are real Google reviews quoted word for word; cuts are marked with an ellipsis.
- Never show photos with readable details from another state (a "Laws of Massachusetts" book shot was rejected for this).
- Motion: ease `cubic-bezier(0.22,1,0.36,1)`, transform and opacity, reveal once. Motion is NOT gated on prefers-reduced-motion (Thierry's Windows has animation effects off and he wants the motion).
- Case ring (`case-ring.tsx`): cards on a 34 degree arc; `.ring-pull` pushes the ring back by its radius so the front card is true size.

## Checks
`npm run typecheck`, `npm test` (vitest), then `npm run build && npm start` (serves on 0.0.0.0:3003) and `npm run test:e2e` (Playwright smoke: CTAs, images, overflow at 390px, form, menu, legal pages, 404, API). `node e2e/shoot.mjs` writes desktop and phone screenshots of every section to `e2e/shots/`. Headless WebGL needs the swiftshader flags already in those scripts.
