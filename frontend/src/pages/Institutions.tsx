import { Link } from 'react-router-dom'
import { ArrowRight, Check, Globe2 } from 'lucide-react'
import { Container, Reveal, SectionHead } from '../lib/ui'
import PageHero from '../components/PageHero'
import { INSTITUTION_TRACKS } from '../lib/content'

export default function Institutions() {
  return (
    <>
      <PageHero
        audience="Libraries · colleges · Gulf clients"
        eyebrow="For institutions"
        title="Publish at indexing-ready, integrity-first standards."
        intro="Institutional publishing, proceedings, library access and editorial partnerships — for colleges and universities, libraries, and Gulf institutions building research-publishing capability."
        cta={{ label: 'Talk to us', to: '/contact#institution' }}
      />

      <section id="overview" className="scroll-mt-28 bg-paper py-20 sm:py-24">
        <Container>
          <SectionHead
            eyebrow="Four ways to work with us"
            title="From a single proceedings volume to a co-published journal."
            intro="Every engagement is built to the same standards we hold our own journal to — peer review, ethics, clean metadata and an honest indexing roadmap."
          />
          <div className="mt-12 space-y-6">
            {INSTITUTION_TRACKS.map((t, i) => (
              <Reveal key={t.id} delay={i * 0.05}>
                <div id={t.id} className="scroll-mt-28 grid gap-6 rounded-4xl border border-line bg-white p-8 shadow-card lg:grid-cols-12 lg:items-center">
                  <div className="lg:col-span-7">
                    <span className="font-display text-sm font-semibold text-brand-500">0{i + 1}</span>
                    <h3 className="mt-2 font-display text-2xl font-semibold text-ink">{t.name}</h3>
                    <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-soft">{t.body}</p>
                  </div>
                  <div className="lg:col-span-5">
                    <div className="rounded-3xl border border-line bg-canvas p-6">
                      {t.points.map((p) => (
                        <div key={p} className="flex items-center gap-2.5 border-b border-line py-2.5 text-[14px] text-ink-soft last:border-0">
                          <Check className="h-4 w-4 shrink-0 text-brand-500" /> {p}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Gulf / Vision 2030 spotlight */}
      <section id="gulf" className="scroll-mt-28 bg-canvas py-16">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-4xl border border-line bg-gradient-to-br from-ink to-ink-2 p-8 text-white sm:p-12">
              <div className="pointer-events-none absolute -right-12 -top-12 h-60 w-60 rounded-full bg-aqua/20 blur-3xl" />
              <div className="relative grid gap-8 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-8">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-brand-200">
                    <Globe2 className="h-3.5 w-3.5" /> Gulf institutions · Vision 2030
                  </span>
                  <h2 className="display mt-5 text-[clamp(1.7rem,3.2vw,2.4rem)] text-white">
                    An English-language, integrity-first research-publishing partner.
                  </h2>
                  <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/70">
                    For Gulf universities and research institutions advancing knowledge-economy and Vision 2030 goals, we
                    bring research-publishing capability, editorial and language support, and joint capability building —
                    delivered to international standards.
                  </p>
                </div>
                <div className="lg:col-span-4">
                  <Link to="/contact#institution" className="btn-brand h-12 w-full px-7">
                    Open a conversation <ArrowRight className="h-4 w-4" />
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
