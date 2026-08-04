# Publisher logos — home page marquee

Drop the official logo files here using the **exact filenames** below. The marquee
(`src/components/LogoMarquee.tsx`) references each via `/logos/<slug>.svg`.

- Preferred format: **SVG** (crisp at any size). If you only have PNG, use a
  high-resolution transparent PNG and either rename it to `<slug>.svg`'s base with
  a `.png` extension **and** update the matching `src` in `LogoMarquee.tsx`, or
  export the PNG to SVG first.
- Keep the logo's **original brand colors** and **transparent background**.
- Do not pre-scale, crop, or pad — the component sizes by height
  (42px desktop / 36px tablet / 28px mobile) and preserves aspect ratio.
- Only use marks you are authorized to display.

| # | Publisher | Expected file |
|---|-----------|---------------|
| 1 | Nature Portfolio | `nature-portfolio.svg` |
| 2 | Elsevier | `elsevier.svg` |
| 3 | Springer Nature | `springer-nature.svg` |
| 4 | IEEE | `ieee.svg` |
| 5 | Wiley | `wiley.svg` |
| 6 | Taylor & Francis | `taylor-francis.svg` |
| 7 | ACM | `acm.svg` |
| 8 | Oxford University Press | `oxford-university-press.svg` |
| 9 | Cambridge University Press | `cambridge-university-press.svg` |
| 10 | SAGE Publications | `sage-publications.svg` |
| 11 | IOP Publishing | `iop-publishing.svg` |
| 12 | Royal Society of Chemistry | `royal-society-of-chemistry.svg` |
| 13 | AIP Publishing | `aip-publishing.svg` |
| 14 | IET Journals | `iet-journals.svg` |
| 15 | BMJ Publishing Group | `bmj-publishing-group.svg` |
| 16 | Emerald Publishing | `emerald-publishing.svg` |
| 17 | De Gruyter | `de-gruyter.svg` |
| 18 | World Scientific | `world-scientific.svg` |
| 19 | KeAi Publishing | `keai-publishing.svg` |
| 20 | Frontiers Media | `frontiers-media.svg` |
| 21 | Inderscience Publishers | `inderscience-publishers.svg` |
| 22 | Bentham Science | `bentham-science.svg` |
| 23 | Tech Science Press | `tech-science-press.svg` |
| 24 | IGI Global | `igi-global.svg` |

To add, remove, or reorder logos, edit the `LOGOS` array in
`src/components/LogoMarquee.tsx`.
