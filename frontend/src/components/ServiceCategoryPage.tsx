import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowLeft, Check } from 'lucide-react'
import { Container, Reveal, Eyebrow, Pill } from '../lib/ui'
import PageHero from './PageHero'
import type { ServiceCategory } from '../lib/authorServices'

/**
 * Shared layout for every dedicated Author Services category page.
 * Documentation-style: a left sidebar of the category's items and a right
 * content area that updates in place (no reload) when an item is selected.
 */
export default function ServiceCategoryPage({ category }: { category: ServiceCategory }) {
  const [activeSlug, setActiveSlug] = useState<string>(category.items[0].slug)
  const reduce = useReducedMotion()
  const { hash } = useLocation()

  // A #item-slug (e.g. from the navbar dropdown) selects that item; otherwise
  // the first item is active. Re-runs when the route/category changes.
  useEffect(() => {
    const id = hash.replace('#', '')
    setActiveSlug(category.items.some((i) => i.slug === id) ? id : category.items[0].slug)
  }, [hash, category])

  const current = category.items.find((i) => i.slug === activeSlug) ?? category.items[0]
  const Icon = current.icon

  return (
    <>
      <PageHero
        audience="Author Services"
        eyebrow={category.title}
        title={category.title}
        intro={category.blurb}
        cta={{ label: 'All author services', to: '/author-services' }}
      />

      <section className="scroll-mt-28 bg-paper py-16 sm:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12">
            {/* ---------------- LEFT: documentation sidebar ---------------- */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <Reveal>
                  <div className="overflow-hidden rounded-2xl border border-line bg-white">
                    <div className="flex items-center gap-2.5 border-b border-line px-4 py-3.5">
                      <category.icon className="h-5 w-5 shrink-0 text-brand-500" />
                      <span className="font-display text-[13px] font-semibold uppercase tracking-wide text-ink">
                        {category.title}
                      </span>
                    </div>
                    <ul className="space-y-1 p-2">
                      {category.items.map((item) => {
                        const isActive = activeSlug === item.slug
                        return (
                          <li key={item.slug}>
                            <button
                              type="button"
                              onClick={() => setActiveSlug(item.slug)}
                              aria-current={isActive ? 'true' : undefined}
                              className={`flex w-full items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left text-[13.5px] leading-snug transition-all duration-300 ${
                                isActive
                                  ? 'border-brand-500 bg-brand-500 font-semibold text-white shadow-card'
                                  : 'border-transparent text-ink-soft hover:border-line hover:bg-canvas hover:text-ink'
                              }`}
                            >
                              <item.icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-white' : 'text-brand-500'}`} />
                              {item.name}
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                  <Link
                    to="/author-services"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back to all services
                  </Link>
                </Reveal>
              </div>
            </aside>

            {/* ---------------- RIGHT: selected item content ---------------- */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.article
                  key={current.slug}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-3xl border border-line bg-white p-7 shadow-card sm:p-9"
                >
                  <div className="flex items-start justify-between gap-4">
                    <Eyebrow>{category.title}</Eyebrow>
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-line bg-canvas text-brand-500">
                      <Icon className="h-6 w-6" />
                    </span>
                  </div>
                  <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">{current.heading}</h2>
                  <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink-soft text-pretty">{current.intro}</p>
                  <div className="prose-tl mt-5 max-w-3xl">
                    {current.body.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>

                  {/* Benefits */}
                  <div className="mt-8">
                    <h3 className="font-display text-lg font-semibold text-ink">Benefits</h3>
                    <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                      {current.benefits.map((b) => (
                        <li key={b} className="flex items-start gap-2.5 rounded-2xl border border-line bg-canvas p-4">
                          <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white">
                            <Check className="h-3 w-3" />
                          </span>
                          <span className="text-[14px] leading-relaxed text-ink-soft">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Industries supported */}
                  <div className="mt-8">
                    <h3 className="font-display text-lg font-semibold text-ink">Industries supported</h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {category.industries.map((ind) => (
                        <Pill key={ind}>{ind}</Pill>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-9">
                    <Link to="/contact" className="btn-brand h-12 px-8 text-[15px]">
                      More Details <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
