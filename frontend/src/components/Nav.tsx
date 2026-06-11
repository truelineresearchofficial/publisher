import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Globe, Menu, X, ArrowRight, FileText } from 'lucide-react'
import { NAV, UTILITY_LINKS, GROUP_LINKS, type NavItem } from '../lib/content'
import { Wordmark } from './Marks'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState<string | null>(null) // desktop mega-menu
  const [mobile, setMobile] = useState(false)
  const [groupOpen, setGroupOpen] = useState(false)
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobile(false)
    setOpen(null)
    setGroupOpen(false)
  }, [pathname, hash])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Utility bar */}
      <div className="hidden border-b border-white/10 bg-ink text-white/80 lg:block">
        <div className="container-tl flex h-9 items-center justify-between text-[12.5px]">
          <div className="flex items-center gap-5">
            {UTILITY_LINKS.map((u) => (
              <Link key={u.label} to={u.to} className="transition-colors hover:text-white">
                {u.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-5">
            <div
              className="relative"
              onMouseEnter={() => setGroupOpen(true)}
              onMouseLeave={() => setGroupOpen(false)}
            >
              <button className="flex items-center gap-1 transition-colors hover:text-white">
                Trueline Group <ChevronDown className="h-3.5 w-3.5" />
              </button>
              <AnimatePresence>
                {groupOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 top-full w-72 overflow-hidden rounded-2xl border border-line bg-white p-2 text-ink shadow-card-lg"
                  >
                    {GROUP_LINKS.map((g) => (
                      <Link
                        key={g.label}
                        to={g.to}
                        className="flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors hover:bg-canvas"
                      >
                        <span>
                          <span className="block text-sm font-semibold">{g.label}</span>
                          <span className="block text-xs text-ink-faint">{g.note}</span>
                        </span>
                        <ArrowRight className="h-3.5 w-3.5 text-brand-500" />
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button className="flex items-center gap-1 transition-colors hover:text-white">
              <Globe className="h-3.5 w-3.5" /> EN
            </button>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={`border-b backdrop-blur-xl transition-all duration-300 ${
          scrolled || open
            ? 'border-line bg-white/90 shadow-[0_1px_0_rgba(10,26,38,0.04)]'
            : 'border-line/60 bg-white/80'
        }`}
        onMouseLeave={() => setOpen(null)}
      >
        <div className="container-tl flex h-[68px] items-center justify-between gap-4">
          <Link to="/" aria-label="Trueline Publishers home">
            <Wordmark />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-0.5 xl:flex">
            {NAV.map((item) => (
              <div key={item.label} onMouseEnter={() => setOpen(item.columns ? item.label : null)}>
                <Link
                  to={item.to}
                  className={`flex items-center gap-1 rounded-full px-3 py-2 text-[14.5px] font-medium transition-colors ${
                    pathname === item.to ? 'text-brand-600' : 'text-ink hover:text-brand-600'
                  }`}
                >
                  {item.label}
                  {item.columns && <ChevronDown className="h-3.5 w-3.5 opacity-50" />}
                </Link>
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <Link to="/submit" className="btn-brand hidden h-10 px-5 text-[13.5px] sm:inline-flex">
              <FileText className="h-4 w-4" /> Submit Manuscript
            </Link>
            <button
              className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink xl:hidden"
              onClick={() => setMobile((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Desktop mega-menu */}
        <AnimatePresence>
          {open && <MegaMenu item={NAV.find((n) => n.label === open)!} />}
        </AnimatePresence>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>{mobile && <MobileMenu />}</AnimatePresence>
    </header>
  )
}

function MegaMenu({ item }: { item: NavItem }) {
  if (!item.columns) return null
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-x-0 top-full hidden border-b border-line bg-white/95 backdrop-blur-xl xl:block"
    >
      <div className="container-tl grid grid-cols-12 gap-8 py-9">
        <div className="col-span-8 grid grid-cols-2 gap-x-10 gap-y-1">
          {item.columns.map((col) => (
            <div key={col.heading} className="mb-2">
              <div className="mb-3 flex items-baseline gap-2 border-b border-line pb-2">
                <h3 className="font-display text-sm font-semibold text-ink">{col.heading}</h3>
                {col.audience && (
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-500">
                    {col.audience}
                  </span>
                )}
              </div>
              <ul>
                {col.items.map((leaf) => (
                  <li key={leaf.label}>
                    <Link
                      to={leaf.to}
                      className="group flex flex-col rounded-xl px-3 py-2 transition-colors hover:bg-canvas"
                    >
                      <span className="flex items-center gap-1.5 text-[14.5px] font-medium text-ink group-hover:text-brand-600">
                        {leaf.label}
                        <ArrowRight className="h-3 w-3 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                      </span>
                      {leaf.note && <span className="text-xs text-ink-faint">{leaf.note}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {item.feature && (
          <Link
            to={item.feature.to}
            className="col-span-4 group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-ink p-7 text-white"
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-brand-500/30 blur-3xl" />
            <div className="relative">
              <span className="eyebrow text-brand-300">Trust first</span>
              <h4 className="mt-3 font-display text-xl font-medium">{item.feature.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{item.feature.body}</p>
            </div>
            <span className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-300">
              {item.feature.cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        )}
      </div>
    </motion.div>
  )
}

function MobileMenu() {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="max-h-[calc(100vh-68px)] overflow-y-auto border-b border-line bg-white xl:hidden"
    >
      <div className="container-tl space-y-1 py-5">
        {NAV.map((item) => (
          <div key={item.label} className="border-b border-line/70 py-1">
            <Link to={item.to} className="block py-2.5 text-lg font-medium text-ink">
              {item.label}
            </Link>
            {item.columns && (
              <ul className="pb-2">
                {item.columns.flatMap((c) => c.items).map((leaf) => (
                  <li key={leaf.label}>
                    <Link to={leaf.to} className="block py-1.5 pl-3 text-[15px] text-ink-soft">
                      {leaf.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
        <div className="grid grid-cols-2 gap-2 pt-3">
          <Link to="/submit" className="btn-brand">
            Submit Manuscript
          </Link>
          <Link to="/contact#quote" className="btn-ghost">
            Request a Quote
          </Link>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-1 pt-4 text-sm text-ink-faint">
          {GROUP_LINKS.map((g) => (
            <Link key={g.label} to={g.to} className="hover:text-brand-600">
              {g.label}
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
