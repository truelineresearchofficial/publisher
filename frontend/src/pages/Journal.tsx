import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, FileText, Users, BadgeCheck, CheckCircle2 } from 'lucide-react'
import { Container, Reveal } from '../lib/ui'
import { JournalMark } from '../components/Marks'
import {
  JOURNAL,
  LATEST_ARTICLES,
  BOARD_NOTE,
  BOARD_STRUCTURE,
  BOARD_DISCIPLINES,
  GUIDELINES,
  REVIEW_STEPS,
  APC,
  INDEXING_STATUS,
} from '../lib/content'

const SUBNAV = [
  { id: 'scope', label: 'Aims & Scope' },
  { id: 'board', label: 'Editorial Board' },
  { id: 'current', label: 'Current Issue' },
  { id: 'guidelines', label: 'Author Guidelines' },
  { id: 'process', label: 'Submission & Review' },
  { id: 'apc', label: 'APC & Waivers' },
  { id: 'indexing', label: 'Indexing' },
]

export default function Journal() {
  const [active, setActive] = useState('scope')

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    SUBNAV.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <>
      {/* Journal masthead */}
      <section className="relative overflow-hidden border-b border-line bg-ink pt-[120px] text-white">
        <div className="pointer-events-none absolute inset-0 bg-grid-fine opacity-[0.12]" />
        <div className="pointer-events-none absolute -right-16 top-16 hidden w-80 opacity-40 sm:block">
          <JournalMark className="h-full w-full" />
        </div>
        <Container className="relative pb-12 pt-6">
          <Link to="/journals" className="text-[13px] font-semibold text-brand-300 hover:text-brand-200">
            ← All journals
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-brand-500/20 px-3 py-1 text-[11px] font-semibold text-brand-200">Flagship journal</span>
            <span className="rounded-full border border-white/15 px-3 py-1 text-[11px] font-medium text-white/70">{JOURNAL.access}</span>
            <span className="rounded-full border border-white/15 px-3 py-1 text-[11px] font-medium text-white/70">{JOURNAL.review}</span>
          </div>
          <h1 className="display mt-5 max-w-3xl text-[clamp(2.1rem,4.6vw,3.4rem)] text-white text-balance">{JOURNAL.name}</h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/65">{JOURNAL.scope}</p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-1.5 text-[13px] text-white/60">
            <span>{JOURNAL.issn}</span>
            <span>{JOURNAL.doi}</span>
            <span>{JOURNAL.frequency}</span>
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/submit" className="btn-brand h-11 px-6">
              <FileText className="h-4 w-4" /> Submit a Manuscript
            </Link>
            <Link to="#guidelines" className="inline-flex h-11 items-center gap-1.5 rounded-full border border-white/20 px-6 text-sm font-semibold text-white hover:bg-white/10">
              Author guidelines
            </Link>
          </div>
          <p className="mt-5 text-[12px] text-white/40">
            Working launch title — the legacy acronym is retired and this re-branded biomedical identity carries its own ISSN/DOI.
          </p>
        </Container>
      </section>

      {/* Sticky sub-nav */}
      <div className="sticky top-0 z-30 border-b border-line bg-white/90 backdrop-blur-xl">
        <Container>
          <nav className="flex gap-1 overflow-x-auto py-3 mask-fade-x sm:mask-fade-r">
            {SUBNAV.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`whitespace-nowrap rounded-full px-4 py-1.5 text-[13.5px] font-medium transition-colors ${
                  active === s.id ? 'bg-ink text-white' : 'text-ink-soft hover:bg-canvas'
                }`}
              >
                {s.label}
              </a>
            ))}
          </nav>
        </Container>
      </div>

      {/* Aims & Scope */}
      <Section id="scope" eyebrow="Aims & scope" title="What the journal publishes.">
        <div className="grid gap-6 lg:grid-cols-3">
          <p className="prose-tl lg:col-span-2">
            {JOURNAL.name} publishes original research, reviews, methods and short communications across biomedical and
            life sciences — clinical and translational medicine, molecular and cell biology, genomics and bioinformatics,
            pharmacology, public health and biostatistics. We prioritise methodological rigour, reproducibility and
            transparent reporting over novelty alone, and we welcome rigorous negative and replication studies.
          </p>
          <div className="rounded-3xl border border-line bg-canvas p-6">
            {[
              ['Review', JOURNAL.review],
              ['Access', JOURNAL.access],
              ['Frequency', JOURNAL.frequency],
              ['Identifier', JOURNAL.issn],
            ].map(([k, v]) => (
              <div key={k} className="border-b border-line py-2.5 last:border-0">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-faint">{k}</div>
                <div className="mt-0.5 text-[14.5px] font-medium text-ink">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Editorial Board */}
      <Section id="board" eyebrow="Editorial board" title="A board built on real names and affiliations." tone="canvas">
        <div className="rounded-3xl border border-brand-200 bg-brand-50 p-6">
          <div className="flex items-start gap-3">
            <Users className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
            <p className="text-[14.5px] leading-relaxed text-brand-800">{BOARD_NOTE}</p>
          </div>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {BOARD_STRUCTURE.map((b, i) => (
            <Reveal key={b.role} delay={i * 0.05}>
              <div className="flex h-full flex-col rounded-3xl border border-line bg-white p-6 shadow-card">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-[16px] font-semibold text-ink">{b.role}</h3>
                  <span className="font-display text-lg font-semibold text-brand-400">{b.count}</span>
                </div>
                <p className="mt-3 text-[13.5px] leading-relaxed text-ink-soft">{b.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-8">
          <h3 className="text-[13px] font-semibold uppercase tracking-wider text-ink-faint">Disciplines covered</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {BOARD_DISCIPLINES.map((d) => (
              <span key={d} className="badge">{d}</span>
            ))}
          </div>
        </div>
        <Link to="/resources#reviewers" className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700">
          Join the editorial & reviewer pool <ArrowRight className="h-4 w-4" />
        </Link>
      </Section>

      {/* Current Issue */}
      <Section id="current" eyebrow="Current issue · Volume 1" title="Articles in production.">
        <div className="space-y-4">
          {LATEST_ARTICLES.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.05}>
              <div className="flex flex-col gap-3 rounded-3xl border border-line bg-white p-6 shadow-card sm:flex-row sm:items-center sm:justify-between">
                <div className="max-w-2xl">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-500">{a.type}</span>
                  <h3 className="mt-1.5 font-display text-[17px] font-semibold leading-snug text-ink">{a.title}</h3>
                  <p className="mt-1.5 text-[13px] text-ink-faint">{a.authors} · {a.journal}</p>
                </div>
                <div className="shrink-0 text-[12.5px] text-ink-faint sm:text-right">
                  <div>{a.date}</div>
                  <div>{a.doi}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-5 text-[12.5px] text-ink-faint">
          Sample content shown ahead of launch. Archives by volume and year will appear here as issues publish.
        </p>
      </Section>

      {/* Author Guidelines */}
      <Section id="guidelines" eyebrow="Author guidelines" title="What we need from your manuscript." tone="canvas">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {GUIDELINES.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.04}>
              <div className="flex h-full flex-col rounded-3xl border border-line bg-white p-6">
                <BadgeCheck className="h-5 w-5 text-brand-500" />
                <h3 className="mt-3 font-display text-[16px] font-semibold text-ink">{g.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-ink-soft">{g.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/resources#authors" className="btn-primary h-11 px-6">Templates & checklists</Link>
          <Link to="/author-services" className="btn-ghost h-11 px-6">Need help getting ready? <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </Section>

      {/* Submission & Review process */}
      <Section id="process" eyebrow="Submission & peer-review process" title="A transparent workflow with clear timelines.">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {REVIEW_STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.04}>
              <div className="flex h-full flex-col rounded-3xl border border-line bg-white p-6 shadow-card">
                <span className="font-display text-2xl font-semibold text-brand-400">{s.n}</span>
                <h3 className="mt-2 font-display text-[16px] font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-ink-soft">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Link to="/editorial-standards" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700">
          Read our full editorial standards <ArrowRight className="h-4 w-4" />
        </Link>
      </Section>

      {/* APC & Waivers */}
      <Section id="apc" eyebrow="Article processing charges & waivers" title={APC.headline} tone="canvas">
        <p className="prose-tl max-w-3xl">{APC.body}</p>
        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          {APC.points.map((p, i) => (
            <Reveal key={p.k} delay={i * 0.05}>
              <div className="flex items-start gap-3 rounded-3xl border border-line bg-white p-5">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" />
                <div>
                  <div className="text-[14.5px] font-semibold text-ink">{p.k}</div>
                  <div className="mt-0.5 text-[13.5px] leading-relaxed text-ink-soft">{p.v}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-6 rounded-2xl border border-line bg-white px-5 py-4 text-[13.5px] leading-relaxed text-ink-soft">
          <strong className="font-semibold text-ink">No charge for acceptance.</strong> An APC covers production for an
          already-accepted article. It is never a fee to be accepted, and waivers are available — ask the editorial office.
        </div>
      </Section>

      {/* Indexing */}
      <Section id="indexing" eyebrow="Indexing & metrics" title="Where this journal is — and is heading.">
        <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-card">
          {INDEXING_STATUS.map((row, i) => (
            <div key={row.name} className={`flex items-center justify-between gap-3 p-4 ${i ? 'border-t border-line' : ''}`}>
              <span className="text-[14.5px] font-medium text-ink">{row.name}</span>
              <span className="rounded-full border border-line px-3 py-1 text-[12px] font-semibold text-ink-soft">{row.state}</span>
            </div>
          ))}
        </div>
        <Link to="/indexing" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700">
          Full indexing & abstracting status <ArrowRight className="h-4 w-4" />
        </Link>
      </Section>

      {/* Submit CTA */}
      <section className="bg-paper py-16">
        <Container>
          <Reveal>
            <div className="flex flex-col items-center gap-5 rounded-4xl border border-line bg-canvas px-8 py-12 text-center">
              <h2 className="display text-[clamp(1.7rem,3.2vw,2.4rem)]">Ready to submit?</h2>
              <p className="max-w-xl text-[15px] leading-relaxed text-ink-soft">
                Submission is free and routes straight to the editorial office and peer review. Author services, if you
                want them, are entirely separate.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link to="/submit" className="btn-brand h-12 px-7">
                  <FileText className="h-4 w-4" /> Submit a Manuscript
                </Link>
                <Link to="/contact#quote" className="btn-ghost h-12 px-7">Request a services quote</Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  )
}

function Section({
  id,
  eyebrow,
  title,
  tone = 'paper',
  children,
}: {
  id: string
  eyebrow: string
  title: string
  tone?: 'paper' | 'canvas'
  children: React.ReactNode
}) {
  return (
    <section id={id} className={`scroll-mt-20 py-16 sm:py-20 ${tone === 'canvas' ? 'bg-canvas' : 'bg-paper'}`}>
      <Container>
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="display mt-3 max-w-3xl text-[clamp(1.7rem,3.4vw,2.5rem)] text-balance">{title}</h2>
        </Reveal>
        <div className="mt-9">{children}</div>
      </Container>
    </section>
  )
}
