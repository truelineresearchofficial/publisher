import { ShieldCheck } from 'lucide-react'
import { TRUST_BADGES } from '../lib/content'

/**
 * Site-wide legitimacy strip. A scholarly publisher leads with its trust
 * signals — ISSN/DOI status, peer review, COPE alignment, indexing, open
 * access — not a sales pitch. Shown as a quiet, restrained band.
 */
export default function TrustBar({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const dark = tone === 'dark'
  return (
    <div className={dark ? 'bg-ink-2 text-white/80' : 'border-y border-line bg-canvas text-ink-soft'}>
      <div className="container-tl flex flex-wrap items-center justify-center gap-x-3 gap-y-2 py-3.5 text-[12.5px]">
        <span className={`inline-flex items-center gap-1.5 font-semibold ${dark ? 'text-brand-300' : 'text-brand-600'}`}>
          <ShieldCheck className="h-4 w-4" /> Trust signals
        </span>
        {TRUST_BADGES.map((b) => (
          <span
            key={b.label}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 ${
              dark ? 'border-white/15 bg-white/5' : 'border-line bg-white'
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${dark ? 'bg-brand-300' : 'bg-brand-500'}`} />
            <span className="font-medium">{b.label}</span>
            <span className={dark ? 'text-white/45' : 'text-ink-faint'}>· {b.note}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
