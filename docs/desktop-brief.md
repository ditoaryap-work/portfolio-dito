# Desktop experience contract

## Thesis

Enter Dito's personal Windows-inspired workspace, explore the timeline and projects, then follow each project as a documented journey from its starting point to the outcome.

## Visual world

The user chose an old Windows desktop direction and supplied pesselev-collective.com screenshots as a reference. Teal wallpaper, original pixel icons, gray beveled chrome, blue title bars, and bitmap interface labels keep the retro OS feel. Verdana gives project stories a clear, period-appropriate reading voice. Preserve this visual language instead of replacing it with a conventional marketing landing page.

## Story

Portrait sign-in with an optional local greeting, Guest entry, or direct project link → four-step startup introduction that waits for Next → desktop welcome → My Projects explorer → one of eight project stories. My Journey separates Education, Experience, and Milestones. Profile, Contact, Experiments, and a Quick Guide support the main project flow. Each project has Indonesian and English static routes; the language toggle keeps the same project open.

## First viewport

First visits show a dark teal sign-in screen with Dito's supplied portrait rendered as a dotted image. Hover reveals the original photo gradually and pointer exit returns to dots; tap and keyboard can reveal the full photo. Reduced motion shows the original portrait directly. After entry, desktop icons sit on the left, the welcome window in the center, a personal note at the right, and the taskbar below. A skip-to-projects link and shared project routes bypass sign-in.

## Project stories

Each story covers context, what was built, Dito's role and decisions, results and impact, trade-offs and what to measure, and lessons. The project explorer uses captured site previews where available and labeled process diagrams for projects without an accessible live preview. Case-study diagrams remain labeled as illustrations, not screenshots. Only outcomes supported by the supplied CVs or profile are stated as facts; missing project measurements remain explicit follow-up questions. Current implementation includes eight paired MDX entries.

## Implementation and access

Astro generates static HTML from MDX. TypeScript, CSS, GSAP, and 98.css power the desktop and motion. Modeless windows support pointer drag, maximize, minimize, close, keyboard access, and internal scrolling. Project pages work without the desktop JavaScript. There is no backend or webcam permission; a live camera effect remains optional and off by default.

## Verification

Inspect desktop and mobile together in one bounded browser pass, fix material issues in one batch, then confirm with one final capture round. The bitmap UI typeface is part of 98.css; narrative content uses Verdana.
