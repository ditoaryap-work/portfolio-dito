---
name: DitoOS
description: A personal creative workspace in the visual language of Windows 95/98.
colors:
  desktop: '#087f80'
  desktop-deep: '#05686a'
  desktop-ink: '#064f51'
  surface: '#c6c6c6'
  paper: '#fffef6'
  ink: '#222723'
  muted: '#5b5f5b'
  title: '#000080'
  title-end: '#087bb3'
  highlight: '#fff'
  shadow: '#808080'
  note: '#fff1a6'
  entry-ground: '#073d42'
  portrait-ground: '#092f35'
  entry-ink: '#f2f3df'
  entry-accent: '#b4cd85'
typography:
  display:
    fontFamily: 'Verdana, Geneva, sans-serif'
    fontSize: 'clamp(40px, 6vw, 76px)'
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: '-0.045em'
  entry-headline:
    fontFamily: 'Verdana, Geneva, sans-serif'
    fontSize: 'clamp(46px, 5.3vw, 76px)'
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: '-0.04em'
  headline:
    fontFamily: 'Verdana, Geneva, sans-serif'
    fontSize: 'clamp(32px, 3.5vw, 48px)'
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: '-0.045em'
  title:
    fontFamily: 'Verdana, Geneva, sans-serif'
    fontSize: '29px'
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: '-0.035em'
  body:
    fontFamily: 'Verdana, Geneva, sans-serif'
    fontSize: '16px'
    fontWeight: 400
    lineHeight: 1.72
  label:
    fontFamily: 'Pixelated MS Sans Serif, Arial, sans-serif'
    fontSize: '11px'
    fontWeight: 400
rounded:
  square: '0'
spacing:
  chrome: '4px'
  action-gap: '8px'
  desktop-gap: '24px'
  document: '32px'
  article-gutter: '68px'
components:
  button-primary:
    backgroundColor: '#c0c0c0'
    textColor: '{colors.ink}'
    rounded: '{rounded.square}'
    padding: '8px'
    height: '36px'
  button-secondary:
    backgroundColor: '#c0c0c0'
    textColor: '{colors.ink}'
    rounded: '{rounded.square}'
    padding: '8px'
    height: '36px'
  button-link:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.ink}'
    rounded: '{rounded.square}'
    padding: '10px 18px'
  visitor-input:
    backgroundColor: '{colors.highlight}'
    textColor: '{colors.ink}'
    rounded: '{rounded.square}'
    padding: '9px'
    height: '34px'
  window:
    backgroundColor: '#c0c0c0'
    textColor: '{colors.ink}'
    rounded: '{rounded.square}'
    padding: '{spacing.chrome}'
    width: '760px'
  taskbar:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.ink}'
    padding: '5px'
    height: '42px'
  sign-in-card:
    backgroundColor: '#c0c0c0'
    textColor: '{colors.ink}'
    padding: '{spacing.chrome}'
    rounded: '{rounded.square}'
  portrait-surface:
    backgroundColor: '{colors.portrait-ground}'
    rounded: '{rounded.square}'
    width: '100%'
  journey-filter:
    backgroundColor: '#c0c0c0'
    textColor: '{colors.ink}'
    padding: '6px 11px'
    height: '34px'
    rounded: '{rounded.square}'
  journey-filter-selected:
    backgroundColor: '#e4e9de'
    textColor: '{colors.ink}'
  reading-surface:
    backgroundColor: '{colors.paper}'
    textColor: '{colors.ink}'
    typography: '{typography.body}'
---

# Design System: DitoOS

## Overview

**Creative North Star: "The Personal Desktop"**

DitoOS treats the portfolio as a personal Windows 95/98 inspired workspace. Teal wallpaper, colored pixel icons, gray beveled software controls and navy-to-blue title bars establish the period identity. Bitmap labels make the interface feel familiar; Verdana gives project narratives a clear reading voice that fits the era. A darker teal entry ground frames the supplied portrait as a reversible dot field, adding a personal signature within the same software world.

Depth expresses software state: a raised button can be pressed, a title bar identifies the active window, and a sunken field accepts input. Motion guides entry and reveals desktop icons, with a skip path so visitors stay in control. Bitmap labels and readable Verdana stories shape the period-inspired voice.

**Key Characteristics:**

- Teal desktop surrounding warm off-white content.
- Square beveled controls and active blue title bars.
- Original colored pixel artwork on a 48 × 48 grid.
- Bitmap interface labels paired with readable Verdana stories.
- Short motion with reduced-motion support.
- Reversible static-photo dot reveal with keyboard and touch alternatives.

## Colors

The palette pairs an inhabited teal workspace with warm reading surfaces and familiar blue software chrome. Frontmatter values are normative; CSS custom properties in `src/styles/tokens.css` and the observed literals in `login.css` and `portrait.css` remain the implementation sources.

### Primary

- **Desktop Teal** (`desktop`): wallpaper and small identity accents; its deep variant supports the restart overlay, and its ink variant supports label shadows.
- **Entry Ground** (`entry-ground`) and **Portrait Ground** (`portrait-ground`): darker teal surrounds for sign-in and the dotted portrait, preserving the desktop teal after entry.
- **Active Navy** (`title`) and **Title Blue** (`title-end`): endpoints of the active title gradient, links, text selection, input focus and caret.

### Secondary

- **Entry Accent** (`entry-accent`): the small punctuation accent in the sign-in headline.
- **Note Yellow** (`note`): the personal desktop note, separate from the reading surface.

### Neutral

- **Entry Light Ink** (`entry-ink`): sign-in wordmark and large introduction copy on dark teal.
- **Software Gray** (`surface`): taskbar and link buttons. Native 98.css buttons and windows retain their inherited silver (`#c0c0c0`), distinct from this token.
- **Warm Paper** (`paper`): welcome, documents and case-study content.
- **Reading Ink** (`ink`) and **Muted Ink** (`muted`): primary and secondary text.
- **Highlight** (`highlight`) and **Bevel Shadow** (`shadow`): crisp control edges; bevels also use inherited near-black and light-gray edge values.

**The Active Window Rule.** Use the navy-to-blue gradient for the active title bar; inactive windows use the observed gray gradient.

## Typography

**Interface Font:** Pixelated MS Sans Serif, Arial, sans-serif, supplied by 98.css.
**Reading Font:** Verdana, Geneva, sans-serif.

The pairing keeps period software chrome while making project stories easier to scan. Verdana's large x-height helps body copy stay readable; interface labels remain small and functional.

### Hierarchy

- **Display:** case-study heading, using the display role in frontmatter; small-screen override is (43px) at widths up to (480px).
- **Entry Headline:** the entry-headline role; reduced to (53px) at widths up to (900px), then (38px) with (1.06) line height up to (700px).
- **Headline:** welcome heading, using the headline role; mobile uses `clamp(28px, 7.8vw, 42px)`.
- **Title:** article section heading, using the title role; mobile size is (26px).
- **Body:** article text, using the body role, maximum width (65ch); mobile size is (15px). Document windows use (15px), and welcome copy uses (15px) with (1.7) line height.
- **Label:** toolbar, form and taskbar labels use the label role; title-bar text is (12px), with bold weight inherited from 98.css. Global desktop text defaults to (13px).

**The Reading Rule.** Use the bitmap face for interface labels and Verdana for narrative content; article copy stays at a maximum of 65ch.

## Layout

The entry screen is a scrollable fixed viewport surface with (28px 5vw 24px) outer padding. Its (1060px) maximum layout pairs introduction copy with a (420px) sign-in card and a `clamp(45px, 7vw, 110px)` gap. At (900px) the card becomes (360px); at (700px) the entry stacks into one column capped at (420px), with (18px) side padding. The desktop remains inert while sign-in is visible. Guest entry, direct project links and returning sessions avoid unnecessary ceremony.

The desktop fills the dynamic viewport above a fixed taskbar. The taskbar is (42px) high, growing to (46px) at widths up to (700px). Desktop icons form a vertical left rail with (24px) gaps; mobile uses two columns. Modeless windows float above the desktop, with scrollable bodies and persistent title/status bars. The standard window is (760px) wide, the project explorer (830px), and document windows (570px).

At widths up to (1100px), windows move to the right of the icon rail and content gutters tighten. At widths up to (700px), windows use (8px) side offsets and (12px) top offsets, title controls grow, forms stack, and the project explorer becomes one column. Low desktop viewports up to (730px) high reduce spacing; large viewports from (1550px) adjust window centering.

Static case studies retain the same chrome in a document flow capped at (1060px). Desktop article gutters are (68px); the reading grid uses a (190px) sidebar and (52px) gap. At (800px) the sidebar disappears and gutters become (30px); at (480px) gutters become (20px). These are separate desktop and article responsive boundaries, not one shared breakpoint scale.

Spacing tokens record recurring observed dimensions rather than imposing an invented global grid.

## Elevation & Depth

Depth combines sharp inset software bevels with a restrained floating-window shadow. Soft shadows belong to floating windows, the sign-in card and the personal desktop note. Pressed buttons reverse their bevel; active task buttons remain sunken. Window title gradients communicate activity rather than lighting a physical material.

### Shadow Vocabulary

- **Floating Window:** `8px 12px 25px rgb(0 45 46 / 22%)`, layered beneath the window bevel.
- **Raised Control:** `inset -1px -1px #0a0a0a, inset 1px 1px white, inset -2px -2px #808080, inset 2px 2px #dfdfdf`.
- **Pressed Control:** `inset -1px -1px white, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px #808080`.
- **Sign-in Card:** `14px 20px 45px rgb(0 20 25 / 28%)`, behind the same sharp window bevel.
- **Desktop Note:** `3px 8px 14px rgb(0 48 49 / 18%)`.

**The Software Depth Rule.** Bevels communicate raised or sunken controls; do not replace them with rounded ambient cards.

## Shapes

Controls, windows and reading containers use square corners. Original icons use hard rectangular paths on a (48 × 48) coordinate grid, `shape-rendering="crispEdges"` and pixelated image rendering. The case-study diagrams use square nodes and thin grid lines, not rounded cards. The note's slight rotation is specific to its desktop-paper role.

## Components

### Buttons

Tactile software controls with an immediate pressed state. Standard actions inherit silver from 98.css; the primary sign-in action is distinguished by bold text. Sign-in actions use (8px) padding and a (36px) minimum height, increasing to (40px) on mobile. Link buttons use the surface token and the same bevel. Focus-visible buttons and links receive a (2px) dotted outline with (4px) offset; compact window controls use an inset dotted focus treatment.

### Inputs / Fields

White, square, sunken fields use bitmap text. The sign-in visitor field is full-width with (9px) padding and (34px) height. Focus-visible fields use a (2px) navy outline with (2px) offset; the caret is navy. Do not invent validation styling before a real validated form exists.

### Navigation

The taskbar carries Start, open-window buttons and a sunken clock tray. Active task buttons reverse the bevel, use light-gray fill and bold text. Start-menu rows select navy with white text on hover or keyboard focus. Desktop icons have white bitmap labels, crisp pixel artwork and a subtle dark-blue hover field. Case-study chapter links stay sticky beside the story and highlight the current chapter while scrolling or when selected. Icons lift by (4px) on hover or focus over (0.18s) with `ease-out`. Quick Guide uses the established reading surface, bold step labels and (14px) copy; its instructions describe the step-by-step introduction, Next and skip actions, keyboard activation, and window controls.

### Windows / Containers

A (4px) frame encloses a gradient title bar, scrollable body and status bar. Inactive chrome turns gray. Desktop title bars can drag; mobile title bars retain readable controls without drag. The body remains scrollable under constrained height. Window reveal animates opacity and scale from (0.96) over (0.28s), with `power3.out`; reduced motion bypasses the reveal.

### Sign-in

The sign-in card retains silver bevels and the active blue title bar. An optional name and equally visible Guest action lead into the workspace; a real skip link bypasses the intro for projects. This is a personal greeting, not account authentication. Leaving sign-in fades opacity and translates upward by (12px) over (0.35s) with `power3.inOut`. A four-step startup introduction waits for the visitor to advance each step, then enter the desktop; Escape and a visible skip button remain available. Reduced motion removes transitions without skipping the steps. The entry portrait height is `clamp(185px, calc(100dvh - 480px), 320px)`; mobile uses a (1.7) aspect ratio.

### Reversible Portrait

A square-edged portrait surface uses a thin `#4b7275` border and small light-green corner marks. It renders the supplied original photo as a local Canvas dot field on the portrait ground. Dots are sampled on a (5px) grid, their luminance controls shade and radius, and a pointer-centered reveal uses a radius of `max(65px, width × 0.27)`. Reveal approaches its target with a (110ms) time constant and fades back with (240ms); these are exponential smoothing constants rather than fixed animation durations.

Click, tap, Enter or Space toggle the full photo via a native button with `aria-pressed` and an updating label. Pointer exit restores the dots unless full reveal is toggled; blur or an outside press clears full reveal. Under reduced motion the original color photo is shown, the decorative Canvas and hint are hidden, and the inactive reveal control is disabled. Without successful effect setup the image remains the fallback, with image-decode failure selecting the static state. The underlying photo is an Astro-optimized WebP (640 × 640, quality 82); the entry uses eager/high-priority loading and the compact profile uses lazy loading.

**The Reversible Portrait Rule.** Use the supplied static portrait; preserve tap and keyboard full reveal and the reduced-motion original-photo fallback. No webcam stream or camera permission is implemented.

The Canvas pixel ratio is capped at (2). Request animation frames only while the effect is unsettled; pause outside the viewport, reset reveal on invisibility, resize through ResizeObserver, and dispose observers, listeners and pending frames on cleanup. Do not introduce a perpetual render loop for an idle portrait. The compact profile variant is (180px) square, decreasing to (125px) at (480px).

### Journey Filters

Overview, Education, Experience and Milestones use wrapping square button filters with an (8px) gap, (6px 11px) padding and (34px) minimum height. The selected button uses `#e4e9de` and a sunken two-edge shadow, with `aria-pressed="true"`; the other buttons report false. Selecting a category hides unmatched groups without fabricating records. Groups have a thin top separator, Verdana headings and bitmap date labels.

### Project Files

Clickable project previews use a 16:10 site capture or labeled process diagram, with a pale green panel, thin border, title, short description, outcome note and open link. Site captures begin as a low-resolution pixel image and reveal the full image on hover or keyboard focus; touch devices show the full image directly. The project grid becomes a single column on mobile.

### Reading Surfaces

Warm paper supports long-form Verdana text. Section headings, project metadata, a process diagram, and chapter links organize each story around its context, build, role, impact, trade-offs, and lessons. Diagram captions distinguish illustrations from screenshots. The software frame stays consistent while each project's internal composition may follow its own narrative.

## Do's and Don'ts

### Do:

- **Do** keep controls and window chrome square and beveled.
- **Do** use bitmap UI text for labels and Verdana for extended reading.
- **Do** preserve readable content and usable controls at mobile widths.
- **Do** use the original crisp-edged pixel icon family consistently.
- **Do** keep visible focus and reduced-motion behavior.
- **Do** preserve touch and keyboard alternatives for the portrait.
- **Do** keep Canvas work event-driven and pause it when out of view.

### Don't:

- **Don't** replace the approved desktop world with a modern marketing template.
- **Don't** apply pixel typography to long project narratives.
- **Don't** use blur or smooth interpolation on pixel artwork.
- **Don't** make motion necessary to access content.
- **Don't** represent the static portrait effect as a live webcam.
- **Don't** hide Guest entry or the direct path to projects behind the name field.
