import { useState } from 'react'

/**
 * Full-width, continuously-scrolling publisher logo marquee.
 *
 * Logo image files are NOT bundled — drop the official files into
 * `frontend/public/logos/` using the exact filenames listed below
 * (see `public/logos/README.md`).
 *
 * Graceful fallback: if a logo file is missing (404) or fails to decode,
 * the slot renders nothing (no text, no broken-image icon) so the marquee
 * never shows placeholders. Each slot fills in automatically once the
 * matching file exists in `public/logos/`.
 *
 * Seamless loop: the list is duplicated and the track animates
 * translateX(0 → -50%) (`animate-marquee`, 38s linear — see tailwind.config.js).
 * Each item carries a uniform trailing margin (mr-20 = 80px) rather than a
 * flex `gap`, so the -50% shift lands exactly on the repeat with no jump.
 */

type Logo = { name: string; src: string }

// Order fixed per brief. `src` points at the ACTUAL files in `public/logos/`
// (real names differ in case/spacing/extension — spaces are %20-encoded).
const LOGOS: Logo[] = [
  { name: 'Nature Portfolio', src: '/logos/nature%28springer%29.png' },
  { name: 'Elsevier', src: '/logos/elsevier%20logo.png' },
  { name: 'Springer Nature', src: '/logos/Springer.png' },
  { name: 'IEEE', src: '/logos/IEEE.png' },
  { name: 'Wiley', src: '/logos/Wiley.png' },
  { name: 'Taylor & Francis', src: '/logos/taylor-francis-.png' },
  { name: 'ACM', src: '/logos/ACM.png' },
  { name: 'Oxford University Press', src: '/logos/Oxford-University-Press-Logo.png' },
  { name: 'Cambridge University Press', src: '/logos/Cambridge%20univ%20press.png' },
  { name: 'SAGE Publications', src: '/logos/Sage-journals.png' },
  { name: 'IOP Publishing', src: '/logos/iop-science-logo.png' },
  { name: 'Royal Society of Chemistry', src: '/logos/royal-society-of-chemistry.png' },
  { name: 'AIP Publishing', src: '/logos/aip-publishing.png' }, // MISSING — no file in public/logos/
  { name: 'IET Journals', src: '/logos/IET%20jounal.png' },
  { name: 'BMJ Publishing Group', src: '/logos/bmj-logo.png' },
  { name: 'Emerald Publishing', src: '/logos/Emerald.png' },
  { name: 'De Gruyter', src: '/logos/de-gruyter.png' },
  { name: 'World Scientific', src: '/logos/World%20scientific.png' },
  { name: 'KeAi Publishing', src: '/logos/KEAI.jpg' }, // file was extensionless; renamed to KEAI.jpg
  { name: 'Frontiers Media', src: '/logos/frontiers-media.png' }, // MISSING — no file in public/logos/
  { name: 'Inderscience Publishers', src: '/logos/Inderscience.png' },
  { name: 'Bentham Science', src: '/logos/P-BenthamScience.png' },
  { name: 'Tech Science Press', src: '/logos/Tech%20science%20press.png' },
  { name: 'IGI Global', src: '/logos/igi-global.png' },
  { name: 'Scopus', src: '/logos/Scopus.png' },
  { name: 'Web of Science', src: '/logos/Web%20of%20science.png' },
]

// Per-logo size overrides for marks that carry excessive transparent padding
// (or are naturally small) so they don't read smaller than the rest. Keyed by
// `logo.name`; anything not listed uses the default size. Full Tailwind class
// strings are used so the JIT compiler picks them up.
const LARGE_LOGO_SIZES: Record<string, string> = {
  'Nature Portfolio': 'max-w-[190px] max-h-[85px]',
  Elsevier: 'max-w-[190px] max-h-[85px]',
  'Springer Nature': 'max-w-[190px] max-h-[85px]',
  IEEE: 'max-w-[180px] max-h-[80px]',
  'Taylor & Francis': 'max-w-[190px] max-h-[85px]',
  ACM: 'max-w-[180px] max-h-[80px]',
  'IET Journals': 'max-w-[185px] max-h-[82px]',
  'Inderscience Publishers': 'max-w-[190px] max-h-[85px]',
  Scopus: 'max-w-[200px] max-h-[90px]',
}

const DEFAULT_LOGO_SIZE = 'max-w-[140px] max-h-[55px]'

function LogoItem({ logo, hidden }: { logo: Logo; hidden: boolean }) {
  const [failed, setFailed] = useState(false)

  // Missing/failed file: render nothing (no text, no broken-image icon).
  if (failed) return null

  const sizeClass = LARGE_LOGO_SIZES[logo.name] ?? DEFAULT_LOGO_SIZE

  return (
    <li className="mr-8 shrink-0" aria-hidden={hidden}>
      {/* Equal 160×70 slot so every logo has the same visual presence, */}
      {/* regardless of its native aspect ratio or transparent padding. */}
      <div className="group/logo flex h-[70px] w-[160px] items-center justify-center">
        <img
          src={logo.src}
          alt={logo.name}
          className={`h-auto w-auto ${sizeClass} object-contain object-center transition-transform duration-[250ms] ease-out group-hover/logo:scale-[1.08]`}
          loading="lazy"
          draggable={false}
          onError={() => setFailed(true)}
        />
      </div>
    </li>
  )
}

export default function LogoMarquee() {
  // Duplicate the list for a seamless, gap-free loop.
  const track = [...LOGOS, ...LOGOS]

  return (
    <section
      aria-label="Publishers and academic databases"
      className="group border-y border-black/[0.06] bg-white py-3"
    >
      <div className="mask-fade-x overflow-hidden">
        <ul className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused] motion-reduce:[animation-play-state:paused]">
          {track.map((logo, i) => (
            <LogoItem key={`${logo.name}-${i}`} logo={logo} hidden={i >= LOGOS.length} />
          ))}
        </ul>
      </div>
    </section>
  )
}
