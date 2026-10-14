# Prototype verification

Verified locally on 14 October 2026.

## Build checks

- `npm run check`: zero errors, warnings, or hints.
- `npm run build`: static homepage, sample project page, and 404 generated.
- `npm run format:check`: formatted source and documentation.
- Static-output assertions: the project URL is linked, the story and metadata are present in generated HTML, and the article ships no desktop JavaScript.
- The desktop JavaScript bundle is approximately 29.9 KiB gzipped in this iteration. The supplied portrait is optimized from about 1.8 MB to a 17 KB WebP. These are build-size observations, not page-speed benchmarks.

## Browser checks

Desktop viewport: 1280 × 720. Mobile viewport: 390 × 844.

- Optional name entry opens the desktop welcome with a personal greeting. Entry logic is isolated in `session.ts`.
- Guest entry works without a name.
- Project window maximize, minimize, and taskbar restore work on mobile.
- A project opens at its own URL; Back to desktop returns directly to the explorer.
- Start menu opens and its Welcome action works.
- Restart initiates boot and returns to the sign-in screen. First visits show sign-in; session returns and direct app links can bypass it.
- Desktop title-bar dragging moves the window and can return it to its original position.
- About, Journey, Contact, and Recycle Bin open and close.
- Escape closes the active window and returns focus to the previous visible window.
- No horizontal document overflow was observed on the inspected desktop and mobile views.

The new portrait screen was inspected on desktop and mobile. A short desktop viewport initially clipped its footer, and hidden line breaks removed mobile word spacing; both were fixed before final captures. Dot rendering initialized, full-photo click reveal showed the supplied original, and focus moving to the name field reset the reveal. Guest entry revealed the workspace. Education filtering showed only the education group.

Screenshots are local review artifacts in `.impeccable/review/` and are excluded from version control. The finishing review disposition for this iteration was `ship` with no material fixes. The scoped mechanical detector returned no findings; the earlier Arial warnings remain narrowly suppressed as an intentional period typography choice.

Reduced-motion and blocked-storage fallbacks were reviewed in code. No Lighthouse score, full assistive-technology audit, or cross-browser certification is claimed.
