# DitoOS

A bilingual portfolio built as a Windows-inspired desktop. The desktop uses Astro, TypeScript, CSS, GSAP and 98.css. Project stories are authored in MDX and rendered as static, shareable pages. Project cards use site previews when available and labeled process diagrams when a live preview is unavailable.

## Run locally

Node.js 24.18.0 (also pinned for Cloudflare Pages by `.node-version`).

```sh
npm install
npm run dev
```

Open the URL printed by Astro, normally `http://127.0.0.1:4321`.

```sh
npm run check    # Astro and TypeScript diagnostics
npm run build    # Generate static files in dist/
npm run preview  # Serve the production build
```

## Deploy to Cloudflare Pages

Connect this repository to a Cloudflare Pages project and use these settings:

| Setting                | Value           |
| ---------------------- | --------------- |
| Production branch      | `main`          |
| Build command          | `npm run build` |
| Build output directory | `dist`          |
| Root directory         | Repository root |

Astro generates the portfolio as static HTML, including each Indonesian and English project URL. No Cloudflare adapter, Pages Function, backend, or database is needed. Pages can rebuild on pushed commits and create preview deployments for pull requests. The `.node-version` file keeps the local and Pages build runtimes aligned.

## Folder structure

```text
public/                         Static files copied directly to the output
  project-previews/             Optimized site previews and pixelated variants
src/
  assets/                       Portrait and locally imported media
  components/
    desktop/                    Sign-in, boot, desktop shell and taskbar
    panels/                     Content inside each desktop window
    projects/                   Project previews and process illustrations
    ui/                         Window frame, portrait and pixel icons
  content/projects/
    id/                          Bahasa Indonesia project stories
    en/                          English project stories
  data/
    copy.ts                     Interface translations and route helpers
    desktop.ts                  Typed desktop app registry
    journey.ts                  Education, work and milestones from CV/LinkedIn
    site.ts                     Profile, contact links and skills
  layouts/
    BaseLayout.astro            HTML document, metadata and page language
    CaseStudyLayout.astro       Shared project reading frame
  pages/
    index.astro                 Indonesian desktop entry route
    en/index.astro              English desktop entry route
    projects/[...slug].astro    Static Indonesian project pages
    en/projects/[...slug].astro Static English project pages
    404.astro                   File-not-found screen
  scripts/                      Session, portrait, motion and window behavior
  styles/                       Design tokens and separated UI styles
  content.config.ts             Validated project content schema
docs/
  desktop-brief.md              Interaction and visual contract
PRODUCT.md                      Product facts and remaining content needs
DESIGN.md                       Visual system and component guidance
```

## Where to edit things

- **Project stories:** edit the paired files in `src/content/projects/id/` and `src/content/projects/en/`. Keep each pair on the same `projectSlug` and `order`.
- **Education and work timeline:** edit `src/data/journey.ts`. A journey item can link to a project with `projectSlug`.
- **Profile, contact and skills:** edit `src/data/site.ts`.
- **Interface language:** edit the `id` and `en` dictionaries in `src/data/copy.ts`.
- **Desktop apps:** add the app to `src/data/desktop.ts`, create a panel, then mount its window in `src/components/desktop/Desktop.astro`.
- **Window behavior and animation:** edit `src/scripts/window-manager.ts` and `src/scripts/motion.ts`.
- **Colors, fonts and spacing:** edit `src/styles/tokens.css`; document durable visual changes in `DESIGN.md`.

## Add a project

No backend or database is needed to add a project. Add one `.mdx` file for each language, using the same `projectSlug`, `order`, and `artwork`. Both entries are validated by `src/content.config.ts` and become static pages at `/projects/<slug>/` and `/en/projects/<slug>/`. If a live site image is unavailable, the card uses a localized three-step diagram automatically; add a project-specific flow to `src/components/projects/ProjectPreview.astro` when it would clarify the work.

Use this frontmatter as a starting point. Quote long descriptions, especially when they contain a colon.

```yaml
---
projectSlug: new-project
locale: id
order: 9
title: Nama proyek
summary: Ringkasan pendek untuk daftar proyek.
description: "Deskripsi untuk mesin pencari dan tautan yang dibagikan."
kind: Sistem internal
role: Peran yang benar-benar saya kerjakan
year: '2026'
status: Dirilis
tools: [Astro, TypeScript]
artwork: company-site
highlight: Angka atau bukti hasil, jika ada
---

## Konteks dan tujuan

Masalah awal, siapa yang mengalami, dan tujuan pekerjaan.

## Yang dibangun

Produk, alur, atau perubahan yang dibuat.

## Peran dan keputusan

Kontribusi pribadi, pilihan penting, dan alasan di baliknya.

## Hasil dan dampak

Hasil yang bisa dibuktikan. Bedakan metrik terukur dari pengamatan kualitatif.

## Trade-off dan hal yang perlu diukur

Keterbatasan yang diketahui serta pertanyaan yang belum punya data.

## Pelajaran dari proyek ini

Apa yang berubah dalam cara bekerja setelah proyek selesai.
```

For English, create a matching file under `en/` and translate the story rather than machine-copying interface labels. Put screenshots or other approved assets in `src/assets/projects/<projectSlug>/`; the current flow illustration is a clearly labeled diagram, not a screenshot. Keep private client information out of the repository. After adding a story, run `npm run check` and `npm run build`.

When Dito supplies a new project brief and its public evidence or assets, the story and illustration can be prepared directly in these files. A CMS or backend is useful only if Dito wants to add and edit projects independently through an admin interface.

## Interaction notes

- After sign-in, the startup introduction waits for the visitor to press Next at each step; visitors can skip it or use Escape. `/?intro=1` previews sign-in; `/?app=projects` opens the project explorer immediately.
- Shortcuts open with a click, tap, Enter or Space. Desktop windows can be dragged and maximized; their content scrolls inside the frame.
- Each project has a direct static URL and a language switch that stays on that project.
- The visitor name only changes a greeting in this browser. It is never sent to a server.
- Reduced-motion settings skip entrance and restart animation. The portrait reveal supports pointer, touch and keyboard and does not use a webcam.
- Set Astro's `site` option to the production domain before publishing so canonical URLs and sitemap metadata can be added.

## Assets and dependencies

Project card previews in `public/project-previews/` are optimized captures or Open Graph artwork from ecesa.id, salesone.id, serocoffee.id, and coffeespace.kmekaze.id. Other cards use labeled process diagrams because no public preview was available when these assets were prepared. Refresh a preview when the relevant site changes; keep its low-resolution `-pixel.jpg` variant paired with the full image. Pixel SVGs in `PixelIcon.astro` and the favicon are original artwork for this prototype. No Windows icon files or assets from the reference website were copied. Window chrome and the bitmap interface font come from the MIT-licensed `98.css` package. Its license is in `node_modules/98.css/LICENSE`.

The Vite compatibility plugin in `astro.config.mjs` normalizes one invalid legacy hover media query from `98.css` 0.1.21 before Astro's CSS optimizer runs. This avoids editing installed dependencies. Remove the shim when that upstream query is fixed.

## Optional playful features

The Aceternity Webcam Pixel Grid was inspiration for the portrait. The current implementation uses the supplied static photo with original Canvas code and never asks for camera access. A live webcam experiment should only start when a visitor deliberately chooses it.
