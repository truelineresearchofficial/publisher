import { Link } from 'react-router-dom'
import { Facebook, Instagram, Linkedin } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Wordmark } from './Marks'
import {
  BRAND,
  FOOTER_USEFUL_LINKS,
  GROUP_LINKS,
} from '../lib/content'
import { AUTHOR_SERVICE_CATEGORIES } from '../lib/authorServices'

// Order per brief: LinkedIn, Instagram, Facebook.
const SOCIAL_LINKS: { name: string; url: string; icon: LucideIcon }[] = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/company/99148180/', icon: Linkedin },
  { name: 'Instagram', url: 'https://www.instagram.com/trueline_publisher_?igsh=OXRrbWNmY3czcjcw', icon: Instagram },
  { name: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61554873172249', icon: Facebook },
]

// Our Services column — mirrors the seven author-service category pages.
const SERVICE_LINKS = AUTHOR_SERVICE_CATEGORIES.map((c) => ({ label: c.title, to: c.route }))

const linkClass = 'text-sm text-white/85 transition-colors hover:text-[#00A99D]'
const headingClass = 'font-display text-sm font-semibold text-white'

// Strip everything but digits and a leading + so tel: links dial correctly.
const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`

export default function Footer() {
  return (
    <footer className="border-t border-line bg-[#002C71] text-white/85">
      <div className="container-tl py-9">
        <div className="grid gap-x-8 gap-y-8 lg:grid-cols-12">
          {/* Left: logo + description + centered social icons */}
          <div className="flex flex-col items-center text-center lg:col-span-3 lg:items-start lg:text-left">
            {/* Same asset and size as the header logo; white tone so it reads on the dark blue. */}
            <Wordmark tone="white" />
            <p className="mt-3 text-[15px] font-semibold leading-relaxed text-white">
              {BRAND.tagline}
            </p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/80">
              The multidisciplinary academic publishing house of the Trueline Group — peer review,
              ethics, and indexing transparency first.
            </p>

            <div className="mt-5 flex justify-center gap-3">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#00A99D]"
                >
                  <s.icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Right: link columns + address, evenly spaced */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:col-span-9 lg:grid-cols-4">
            {/* Column 1 — Useful Links */}
            <div>
              <h4 className={headingClass}>Quick Links</h4>
              <ul className="mt-4 space-y-2.5">
                {FOOTER_USEFUL_LINKS.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className={linkClass}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2 — Our Services */}
            <div>
              <h4 className={headingClass}>Our Services</h4>
              <ul className="mt-4 space-y-2.5">
                {SERVICE_LINKS.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className={linkClass}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 — Trueline Group (external sister sites) */}
            <div>
              <h4 className={headingClass}>Trueline Group</h4>
              <ul className="mt-4 space-y-2.5">
                {GROUP_LINKS.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right column — Address */}
            <div>
              <h4 className={headingClass}>Address</h4>
              <address className="mt-4 space-y-3 not-italic text-sm leading-relaxed text-white/80">
                <p>
                  Building No. 7/232-19, 
                  Devi Towers,
                  Kalipatti Privu Road, 
                  Vaikuntham, Sankari,
                  <br />
                  Salem, Tamil Nadu – 637103.
               </p>
                <div className="space-y-2">
                  <a href={`mailto:${BRAND.email}`} className="block break-words hover:text-[#00A99D]">
                    {BRAND.email}
                  </a>
                  <a href={telHref(BRAND.phone1)} className="block hover:text-[#00A99D]">
                    {BRAND.phone1}
                  </a>
                  <a href={telHref(BRAND.phone2)} className="block hover:text-[#00A99D]">
                    {BRAND.phone2}
                  </a>
                </div>
              </address>
            </div>
          </div>
        </div>

        {/* Bottom copyright bar — centered */}
        <div className="mt-7 border-t border-white/[0.12] pt-5 text-center text-[13px] text-white/80">
          © {new Date().getFullYear()} Trueline Publisher. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
