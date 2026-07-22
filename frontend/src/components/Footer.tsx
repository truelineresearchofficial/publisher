import { Link } from 'react-router-dom'
import { ArrowUpRight, Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Wordmark } from './Marks'
import { BRAND, FOOTER_COLS, JOURNAL } from '../lib/content'

const SOCIAL_LINKS: { name: string; url: string; icon: LucideIcon }[] = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/company/99148180/', icon: Linkedin },
  { name: 'Instagram', url: 'https://www.instagram.com/trueline_publisher_?igsh=OXRrbWNmY3czcjcw', icon: Instagram },
  { name: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61554873172249', icon: Facebook },
]

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

            <div className="mt-8">
              <h4 className="font-display text-sm font-semibold text-white">Follow Us</h4>
              <div className="mt-4 flex flex-wrap gap-3">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="grid h-12 w-12 place-items-center rounded-full bg-brand-500 text-white shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-brand-600 hover:shadow-xl"
                  >
                    <s.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
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
