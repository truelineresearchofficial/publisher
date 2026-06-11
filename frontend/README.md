# Trueline Research — Website

A white-based, enterprise-grade marketing site for **Trueline Research**, the
life-sciences / biomedical **research-enablement engine** of the Trueline Group.

Built from the strategy blueprint (`tr website.pdf`, `Trueline Plan.pdf`,
`Trueline Strategy.pdf`) and benchmarked against best-in-class life-sciences /
AI-drug-discovery sites (Schrödinger, Isomorphic Labs, insitro, Insilico,
Aragen, Syngene, Editage, Cactus, Agilisium) — but white, editorial, and
distinctly Trueline.

## Strategy encoded in the design

The site's one job is to move Trueline out of the commoditized "PhD-help"
category and reposition it as a credible research engine. It sells **three
audiences** through **three doors**, mapped to **three message pillars**:

| Pillar  | Audience            | Section                | Primary CTA            |
| ------- | ------------------- | ---------------------- | ---------------------- |
| Enable  | Scholars & faculty  | Research Enablement    | Book a consultation    |
| Build   | Colleges & depts    | Centers of Excellence  | Request a CoE proposal |
| Partner | Institutions / GCC  | Partnerships & GCC      | Start a partnership    |

The **Trueline Group flywheel** (Research · Publishers · StartNet) and the
**Ethics & Integrity Charter** are surfaced prominently — integrity-safe
language only ("enablement", "mentoring", "methodology support"); never
"ghostwriting" or "guaranteed publication".

## Stack

- Vite + React 18 + TypeScript
- Tailwind CSS (custom white-based design system)
- React Router (Home, About, Research Enablement, Centers of Excellence,
  Partnerships, Insights, Contact)
- Framer Motion (scroll reveals, the interactive flywheel, hero data-viz)
- lucide-react icons
- Type system: **Fraunces** (editorial serif display) + **Inter Tight** (UI/body)

## Run

```bash
npm install
npm run dev      # http://localhost:5175
npm run build    # tsc + vite production build → dist/
```

## Structure

```
src/
  lib/content.ts   — single source of truth for all copy & data
  lib/ui.tsx       — Container, Reveal, SectionHead, Eyebrow, ArrowLink
  components/      — Nav (mega-menu), Footer, Flywheel, CTABand, PageHero, Marks
  pages/           — Home, About, Enablement, CoE, Partnerships, Insights, Contact, NotFound
```

> **Note:** Network track-record figures (100+ / etc.) reflect the Trueline
> Group footprint and ambition. Verify any historical metrics before publishing
> them as hard claims, per the strategy blueprint.
