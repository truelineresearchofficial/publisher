import { Link } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import {
  Check,
  ArrowRight,
  Globe,
  BookOpen,
  GraduationCap,
  Presentation,
  Award,
  Lightbulb,
  Building2,
  TrendingUp,
  Handshake,
} from 'lucide-react'
import { Container, Reveal, SectionHead } from '../lib/ui'
import PageHero from '../components/PageHero'
import { INSTITUTION_TRACKS, INSTITUTION_HIGHLIGHTS } from '../lib/content'
import { INSTITUTION_HIGHLIGHT_BY_ID } from '../lib/institutionHighlights'

// Card icon per highlight, keyed by id (matches INSTITUTION_HIGHLIGHTS).
const HIGHLIGHT_ICONS: Record<string, LucideIcon> = {
  conferences: Globe,
  publications: BookOpen,
  guidance: GraduationCap,
  faculty: Presentation,
  accreditation: Award,
  innovation: Lightbulb,
  excellence: Building2,
  impact: TrendingUp,
  industry: Handshake,
}

export default function Institutions() {
  return (
    <>
      <PageHero
        audience="Universities · Colleges · Institutions"
        eyebrow="For institutions"
        title="Publish at indexing-ready, integrity-first standards."
        intro="Institutional publishing, proceedings and editorial partnerships — for colleges, universities and academic institutions building research-publishing capability."
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

      <section id="highlights" className="scroll-mt-28 bg-canvas py-20 sm:py-24">
        <Container>
          <SectionHead
            eyebrow="Institutional highlights"
            title="Institutional Highlights"
            intro="Comprehensive solutions that empower universities, colleges, and academic institutions to strengthen research, innovation, and academic excellence."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {INSTITUTION_HIGHLIGHTS.map((h, i) => {
              const Icon = HIGHLIGHT_ICONS[h.id]
              return (
                <Reveal key={h.id} delay={(i % 3) * 0.05} className="h-full">
                  <Link
                    to={INSTITUTION_HIGHLIGHT_BY_ID[h.id].route}
                    className="group flex h-full flex-col rounded-3xl border border-line bg-white p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-line bg-canvas text-brand-500">
                        <Icon className="h-6 w-6" />
                      </span>
                      <h3 className="font-display text-lg font-bold text-ink">{h.name}</h3>
                    </div>
                    <p className="mt-4 flex-1 text-[14px] leading-relaxed text-ink-soft">{h.body}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                      Explore Solutions <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </Container>
      </section>
    </>
  )
}
