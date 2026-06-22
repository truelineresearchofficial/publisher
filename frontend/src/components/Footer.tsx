import { Link } from 'react-router-dom'
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { Wordmark } from './Marks'
import { BRAND, FOOTER_COLS, JOURNAL } from '../lib/content'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-white/70">
      <div className="container-tl py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Wordmark tone="white" />
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-white/55">
              {BRAND.tagline} The biomedical and life-sciences scholarly publishing house of the Trueline Group —
              peer review, ethics and indexing transparency first.
            </p>
            <div className="mt-6 space-y-2.5 text-sm text-white/55">
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-brand-300" /> 
                <span className="max-w-[260px] leading-relaxed">{BRAND.hq}</span>
              </div>
              <a href={`mailto:${BRAND.email}`} className="flex items-center gap-2.5 hover:text-white">
                <Mail className="h-4 w-4 shrink-0 text-brand-300" /> {BRAND.email}
              </a>
              {BRAND.phone1 && (
                <a href={`tel:${BRAND.phone1.replace(/\D/g,'')}`} className="flex items-center gap-2.5 hover:text-white">
                  <Phone className="h-4 w-4 shrink-0 text-brand-300" /> {BRAND.phone1}
                </a>
              )}
              {BRAND.phone2 && (
                <a href={`tel:${BRAND.phone2.replace(/\D/g,'')}`} className="flex items-center gap-2.5 hover:text-white">
                  <Phone className="h-4 w-4 shrink-0 text-brand-300" /> {BRAND.phone2}
                </a>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {FOOTER_COLS.map((col) => (
              <div key={col.heading}>
                <h4 className="font-display text-sm font-semibold text-white">{col.heading}</h4>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link to={l.to} className="text-sm text-white/55 transition-colors hover:text-white">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Scholarly identifiers row */}
        <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-[12.5px] text-white/55">
          <span className="font-semibold text-white/80">{JOURNAL.short}</span>
          <span>{JOURNAL.issn}</span>
          <span>{JOURNAL.doi}</span>
          <span>{JOURNAL.access}</span>
          <span className="text-white/40">Working launch title — re-branded biomedical identity</span>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-7 text-[13px] text-white/45 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Trueline Publishers · {BRAND.group}. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-5">
            <Link to="/resources#access" className="hover:text-white">Licensing</Link>
            <Link to="/ethics" className="hover:text-white">Publication Ethics</Link>
            <Link to="/resources#faq" className="hover:text-white">Privacy &amp; Terms</Link>
            <a href="https://orcid.org" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-white">
              ORCID <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <a href="https://www.crossref.org" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-white">
              Crossref <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
