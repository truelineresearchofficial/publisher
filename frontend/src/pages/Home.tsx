import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  CheckCircle2,
  FileText,
  Quote,
  ScrollText,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { Container, Reveal, SectionHead, Eyebrow, ArrowLink } from '../lib/ui'
import { JournalMark, HelixLines } from '../components/Marks'
import TrustBar from '../components/TrustBar'
import Flywheel from '../components/Flywheel'
import CTABand from '../components/CTABand'
import {
  BRAND,
  JOURNAL,
  PILLARS,
  VISITORS,
  LATEST_ARTICLES,
  EDITORIAL_STRIP,
  SPECTRUM_FEATURES,
  AUTHOR_SERVICES,
  INSTITUTION_TRACKS,
} from '../lib/content'

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Pillars />
      <FeaturedJournal />
      <LatestArticles />
      <StandardsStrip />
      <SpectrumTeaser />
      <ServicesTeaser />
      <InstitutionsTeaser />
      <GroupFlywheel />
      <CTABand />
    </>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-canvas pt-[132px]">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-70" />
      <div className="pointer-events-none absolute -right-24 -top-10 hidden w-[520px] opacity-60 lg:block">
        <JournalMark className="h-full w-full animate-float" />
      </div>
      <div className="pointer-events-none absolute right-[12%] top-24 hidden h-[440px] w-[180px] opacity-40 xl:block">
        <HelixLines className="h-full w-full" />
      </div>

      <Container className="relative pb-20 pt-10">
        <div className="max-w-3xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-xs font-semibold text-brand-700">
              <Sparkles className="h-3.5 w-3.5" /> The publishing arm of the Trueline Group
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <Eyebrow className="mt-6">Integrity-first scholarly publishing</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="display mt-5 text-[clamp(2.6rem,6vw,4.6rem)] text-balance">
              Where biomedical research is <span className="text-spectrum">published, indexed, and read.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-7 max-w-2xl text-xl leading-relaxed text-ink-soft text-pretty">
              Trueline Publishers is the biomedical and life-sciences scholarly publishing house of the Trueline Group.
              We lead with peer review, editorial standards, indexing transparency and a credible board — and only then
              with services and submission.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link to="/submit" className="btn-brand h-12 px-7 text-[15px]">
                <FileText className="h-4 w-4" /> Submit a Manuscript
              </Link>
              <Link to="/editorial-standards" className="btn-ghost h-12 px-7 text-[15px]">
                How peer review works <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-ink-faint">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-brand-500" /> {JOURNAL.review}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <BadgeCheck className="h-4 w-4 text-brand-500" /> COPE-aligned ethics
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ScrollText className="h-4 w-4 text-brand-500" /> {JOURNAL.access}
              </span>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

function Pillars() {
  return (
    <section className="bg-paper py-20 sm:py-24">
      <Container>
        <SectionHead
          eyebrow="What we stand for"
          title="Three pillars — every page maps to one."
          intro="A scholarly publisher's website is a trust instrument first. Everything we do leads with standards, then reach, then support."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06}>
              <Link
                to={p.to}
                className="group flex h-full flex-col rounded-3xl border border-line bg-white p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-lg"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm font-semibold tracking-widest text-brand-500">{p.n}</span>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-faint">{p.name}</span>
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold leading-snug text-ink">{p.title}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-soft">{p.body}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                  Learn more
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

function FeaturedJournal() {
  return (
    <section className="bg-canvas py-20 sm:py-24">
      <Container>
        <div className="grid items-stretch gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-4xl bg-ink p-9 text-white">
              <div className="pointer-events-none absolute -right-12 -top-12 w-56 opacity-40">
                <JournalMark className="h-full w-full" />
              </div>
              <div className="relative">
                <span className="eyebrow text-brand-300">Featured journal</span>
                <h3 className="mt-4 font-display text-2xl font-semibold leading-tight">{JOURNAL.name}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/65">{JOURNAL.scope}</p>
              </div>
              <div className="relative mt-8 grid grid-cols-2 gap-3 text-[13px]">
                {[
                  ['Review', JOURNAL.review],
                  ['Access', JOURNAL.access],
                  ['Frequency', JOURNAL.frequency],
                  ['Identifier', JOURNAL.issn],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-white/45">{k}</div>
                    <div className="mt-1 font-medium text-white/85">{v}</div>
                  </div>
                ))}
              </div>
              <Link to="/journals/the-journal" className="relative mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-300">
                Visit the journal <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-7">
            <div className="flex h-full flex-col justify-center">
              <SectionHead
                eyebrow="A real journal, run to standard"
                title="An indexed-track journal you can submit to with confidence."
                intro="A transparent peer-review process, an honest indexing roadmap, and an editorial board listed with real names, affiliations and ORCIDs. The working launch title carries a re-branded biomedical identity with its own ISSN and DOIs."
              />
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {[
                  { to: '/journals/the-journal#scope', label: 'Aims & scope' },
                  { to: '/journals/the-journal#board', label: 'Editorial board' },
                  { to: '/journals/the-journal#process', label: 'Submission & review' },
                  { to: '/journals/the-journal#apc', label: 'APC & waivers' },
                ].map((l) => (
                  <Link
                    key={l.label}
                    to={l.to}
                    className="group flex items-center justify-between rounded-2xl border border-line bg-white px-5 py-4 transition-colors hover:border-brand-300"
                  >
                    <span className="text-[15px] font-medium text-ink">{l.label}</span>
                    <ArrowRight className="h-4 w-4 text-brand-500 transition-transform group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

function LatestArticles() {
  return (
    <section className="bg-paper py-20 sm:py-24">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHead
            eyebrow="Latest from the journal"
            title="Published articles, openly accessible."
            intro="Live content is the signal of a real, active publisher. Each article carries a DOI, structured metadata and citation export."
          />
          <ArrowLink to="/journals/the-journal#archives" className="pb-2">
            Browse all issues
          </ArrowLink>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {LATEST_ARTICLES.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.06}>
              <article className="group flex h-full flex-col rounded-3xl border border-line bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-lg">
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-[11px] font-semibold text-brand-700">
                  {a.type}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-ink group-hover:text-brand-700">
                  {a.title}
                </h3>
                <div className="mt-4 flex-1" />
                <div className="flex items-center justify-between border-t border-line pt-4 text-[12.5px] text-ink-faint">
                  <span>{a.journal} · {a.date}</span>
                  <span>{a.doi}</span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-6 text-center text-[12.5px] text-ink-faint">
            Sample content shown ahead of launch · Volume 1 in production
          </p>
        </Reveal>
      </Container>
    </section>
  )
}

function StandardsStrip() {
  return (
    <section className="bg-ink py-16 text-white">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-5">
            <span className="eyebrow text-brand-300">The standards behind every article</span>
            <h2 className="display mt-4 text-[clamp(1.8rem,3.4vw,2.6rem)] text-white">
              Peer-reviewed. Indexed-track. Transparent.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-white/65">
              The single statement that separates us from predatory publishing: purchasing an author service never
              influences an editorial decision.
            </p>
            <Link to="/editorial-standards#firewall" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-300">
              Read the editorial firewall <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
          <div className="lg:col-span-7">
            <div className="grid gap-3 sm:grid-cols-2">
              {EDITORIAL_STRIP.map((s, i) => (
                <Reveal key={s} delay={i * 0.04}>
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-300" />
                    <span className="text-[15px] font-medium text-white/90">{s}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function SpectrumTeaser() {
  return (
    <section className="bg-canvas py-20 sm:py-24">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHead
            eyebrow="Trueline Spectrum"
            title="The science, told so people read it."
            intro="Our magazine layer — researcher profiles, science explainers and Centre-of-Excellence stories — broadens reach far beyond academics. The friendly front door."
          />
          <ArrowLink to="/spectrum" className="pb-2">
            Read Trueline Spectrum
          </ArrowLink>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SPECTRUM_FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05}>
              <Link
                to="/spectrum"
                className="group flex h-full flex-col rounded-3xl border border-line bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-card"
              >
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-50">
                  <BookOpen className="h-5 w-5 text-brand-600" />
                </div>
                <span className="mt-5 text-[11px] font-semibold uppercase tracking-wider text-brand-500">{f.tag}</span>
                <h3 className="mt-2 flex-1 font-display text-[17px] font-semibold leading-snug text-ink group-hover:text-brand-700">
                  {f.title}
                </h3>
                <span className="mt-4 text-[12.5px] text-ink-faint">{f.read}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

function ServicesTeaser() {
  return (
    <section className="bg-paper py-20 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-5">
            <SectionHead
              eyebrow="Author Services — support, not shortcuts"
              title="Help good science meet publication standards."
              intro="Optional, transparently priced editorial support — language, formatting, integrity checks and figures. Clearly framed as support and firewalled from every editorial decision."
            />
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/author-services" className="btn-primary h-11 px-6">
                Explore services
              </Link>
              <Link to="/contact#quote" className="btn-ghost h-11 px-6">
                Request a quote
              </Link>
            </div>
            <div className="mt-6 flex items-start gap-2.5 rounded-2xl border border-line bg-canvas px-5 py-4">
              <Quote className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
              <p className="text-[13.5px] leading-relaxed text-ink-soft">
                Buying a service never changes whether a manuscript is reviewed or accepted. You can publish with us
                without buying anything at all.
              </p>
            </div>
          </Reveal>
          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2">
              {AUTHOR_SERVICES.map((s, i) => (
                <Reveal key={s.id} delay={i * 0.05}>
                  <div className="flex h-full flex-col rounded-3xl border border-line bg-white p-6 shadow-card">
                    <h3 className="font-display text-[17px] font-semibold text-ink">{s.name}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">{s.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function InstitutionsTeaser() {
  return (
    <section className="bg-canvas py-20 sm:py-24">
      <Container>
        <SectionHead
          align="center"
          eyebrow="For institutions"
          title="Built for libraries, colleges and Gulf institutions."
          intro="Institutional publishing, proceedings, editorial partnerships and library access — run to indexing and integrity standards."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {INSTITUTION_TRACKS.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.05}>
              <Link
                to={`/institutions#${t.id}`}
                className="group flex h-full flex-col rounded-3xl border border-line bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-card"
              >
                <h3 className="font-display text-[17px] font-semibold text-ink group-hover:text-brand-700">{t.name}</h3>
                <p className="mt-2 flex-1 text-[14px] leading-relaxed text-ink-soft">{t.body}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                  Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

function GroupFlywheel() {
  return (
    <section className="relative overflow-hidden bg-paper py-20 sm:py-24">
      <Container>
        <SectionHead
          align="center"
          eyebrow="The Trueline Group flywheel"
          title="Research generates it. We credentialize it. StartNet scales it."
          intro="A flywheel competitors can't easily match: Trueline Research produces credible output, Trueline Publishers turns it into indexed credibility, and StartNet turns events into published proceedings."
        />
        <div className="mt-14">
          <Flywheel />
        </div>
        <Reveal>
          <div className="mx-auto mt-12 flex max-w-2xl flex-wrap items-center justify-center gap-3">
            <Link to="/about#group" className="btn-ghost h-11 px-6">
              How the group works
            </Link>
            <span className="text-sm text-ink-faint">·</span>
            <span className="text-sm text-ink-faint">{BRAND.group}</span>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
