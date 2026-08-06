import { Link } from 'react-router-dom'
import { ArrowRight, ArrowLeft, Check } from 'lucide-react'
import { Container, Reveal, SectionHead } from '../lib/ui'
import PageHero from '../components/PageHero'
import type { InstitutionHighlight } from '../lib/institutionHighlights'

/**
 * Shared layout for every dedicated Institutional Highlight page.
 * Mirrors the branding, spacing and animations of the Author Services detail
 * pages: PageHero banner, alternating content sections, feature cards, a
 * process timeline and a closing contact CTA band.
 */
export default function InstitutionHighlightPage({ highlight }: { highlight: InstitutionHighlight }) {
  const Icon = highlight.icon

  return (
    <>
      {/* ── Hero banner + large title + short introduction ── */}
      <PageHero
        audience={highlight.audience}
        eyebrow="Institutional highlights"
        title={highlight.title}
        intro={highlight.intro}
        cta={{ label: 'Talk to us', to: '/contact#institution' }}
      />

      {/* ── Overview ── */}
      <section className="scroll-mt-28 bg-paper py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              <SectionHead eyebrow="Overview" title="Overview" />
              <div className="prose-tl mt-6 max-w-2xl">
                {highlight.overview.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5">
              <Reveal delay={0.05}>
                <div className="rounded-3xl border border-line bg-white p-7 shadow-card">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-canvas text-brand-500">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-ink">Services included</h3>
                  <div className="mt-4">
                    {highlight.services.map((s) => (
                      <div
                        key={s}
                        className="flex items-center gap-2.5 border-b border-line py-2.5 text-[14px] text-ink-soft last:border-0"
                      >
                        <Check className="h-4 w-4 shrink-0 text-brand-500" /> {s}
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Key features ── */}
      <section className="scroll-mt-28 bg-canvas py-20 sm:py-24">
        <Container>
          <SectionHead
            eyebrow="Key features"
            title="Key Features"
            intro="What this engagement delivers — the core capabilities we bring to your institution."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {highlight.keyFeatures.map((f, i) => {
              const FIcon = f.icon
              return (
                <Reveal key={f.title} delay={i * 0.06}>
                  <div className="flex h-full flex-col rounded-3xl border border-line bg-white p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-lg">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-line bg-canvas text-brand-500">
                      <FIcon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-semibold text-ink">{f.title}</h3>
                    <p className="mt-2 flex-1 text-[14px] leading-relaxed text-ink-soft">{f.body}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </Container>
      </section>

      {/* ── Benefits ── */}
      <section className="scroll-mt-28 bg-paper py-20 sm:py-24">
        <Container>
          <SectionHead
            eyebrow="Benefits"
            title="Benefits"
            intro="The outcomes your institution can expect from working with us."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2">
            {highlight.benefits.map((b, i) => (
              <Reveal key={b} delay={i * 0.05} as="li">
                <div className="flex items-start gap-3 rounded-2xl border border-line bg-white p-5 shadow-card">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-[15px] leading-relaxed text-ink-soft">{b}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── Our process (step-by-step timeline) ── */}
      <section className="scroll-mt-28 bg-canvas py-20 sm:py-24">
        <Container>
          <SectionHead
            eyebrow="How we work"
            title="Our Process"
            intro="A clear, step-by-step engagement — transparent at every stage."
          />
          <div className="mt-12 space-y-4">
            {highlight.process.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.05}>
                <div className="flex gap-5 rounded-3xl border border-line bg-white p-6 shadow-card sm:p-7">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-500 font-display text-lg font-semibold text-white shadow-card">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-ink">{step.title}</h3>
                    <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-soft">{step.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Why choose Trueline Publisher ── */}
      <section className="scroll-mt-28 bg-paper py-20 sm:py-24">
        <Container>
          <SectionHead
            eyebrow="Why Trueline"
            title="Why Choose Trueline Publisher"
            intro="An integrity-first partner that holds every engagement to the standards we hold our own journal to."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2">
            {highlight.whyChoose.map((w, i) => (
              <Reveal key={w} delay={i * 0.05} as="li">
                <div className="flex items-start gap-3 rounded-2xl border border-line bg-canvas p-5">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-[15px] leading-relaxed text-ink-soft">{w}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── Contact CTA band + Contact Us button ── */}
      <section className="bg-canvas py-20">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-4xl border border-line bg-ink px-8 py-14 text-white sm:px-14">
              <div className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full bg-brand-500/25 blur-3xl" />
              <div className="pointer-events-none absolute inset-0 bg-grid-fine opacity-[0.12]" />
              <div className="relative max-w-2xl">
                <span className="eyebrow text-brand-300">Let's talk</span>
                <h2 className="display mt-4 text-[clamp(1.9rem,3.6vw,2.8rem)] text-white">
                  Ready to strengthen {highlight.title.toLowerCase()} at your institution?
                </h2>
                <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/65">
                  Tell us about your goals and we'll shape a partnership built to the same standards we hold our own
                  journal to — honest scope, transparent timelines and integrity first.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link to="/contact#institution" className="btn-brand h-12 px-8 text-[15px]">
                    Contact Us <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/institutions#highlights"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 transition-colors hover:text-white"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back to institutional highlights
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
