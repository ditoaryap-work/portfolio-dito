# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro static output, TypeScript, CSS, GSAP, MDX, and 98.css, deployed to Cloudflare Pages. The site has no custom backend or database.

## Users

Potential clients, collaborators, recruiters, and visitors exploring Dito's work and professional journey.

## Product purpose

A personal portfolio experienced as a Windows-inspired desktop, with bilingual project stories that explain the starting point, work, decisions, outcomes, trade-offs, and lessons.

## Capabilities and constraints

The entry screen presents Dito's supplied portrait as a reversible dotted reveal, with a local optional greeting and a direct project link. Sign-in leads into a manually advanced animated introduction and an interactive desktop. Desktop panels cover projects, profile, education and work history, contact, experiments, and a quick guide. Every project has a static Indonesian and English story URL. Project cards show captured site previews when available and labeled process diagrams otherwise. The site remains readable on small screens, supports reduced-motion preferences, and never requests webcam access.

Project content is authored in paired MDX files. New projects need no backend: an editor can add the Indonesian and English stories and, when available, approved evidence or images. A CMS would only be needed for owner-managed content editing.

## Brand commitments

Windows 95/98-inspired personal workspace, working name DitoOS. The user supplied pesselev-collective.com as a reference for entering and exploring a retro desktop, and asked for a Windows-like welcome with a reversible dotted portrait reveal.

## Evidence on hand

The user supplied a portrait, a DOCX CV, an English PDF CV, and a LinkedIn profile. Profile, education, experience, skills, and project stories are based on those sources. Where the sources disagree on exact dates or metrics, the implementation uses the more recent/repeated source or reduces precision; see the project README for editing guidance. The CV contains few project screenshots and limited measured outcomes, so process illustrations are explicitly diagrams and the stories identify results that still need measurement. Public links on the profile are drawn from the CV/LinkedIn.

## Product principles

- Let visitors explore freely and reach project stories quickly.
- Give each project its own narrative, with evidence and limitations visible.
- Keep stories accessible as direct URLs and static HTML.
- Keep interface, behavior, content, and design tokens separated.
- Add motion to guide attention while keeping skips and reduced-motion behavior available.

## Open decisions

Production domain, additional first-hand project detail, and measured impact Dito wants included in each story.
