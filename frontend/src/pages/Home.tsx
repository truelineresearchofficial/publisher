import { Link } from 'react-router-dom'
import { ArrowRight, Quote, Sparkles } from 'lucide-react'
import { Container, Reveal, SectionHead, Eyebrow } from '../lib/ui'
import { JournalMark, HelixLines } from '../components/Marks'
import Flywheel from '../components/Flywheel'
import {
  PILLARS,
  AUTHOR_SERVICES,
  INSTITUTION_TRACKS,
} from '../lib/content'

export default function Home() {
  return (
    <>
      <Hero />
      <Pillars />
      <ServicesTeaser />
      <InstitutionsTeaser />
      <GroupFlywheel />
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
              Where quality research is <span className="text-spectrum">published, indexed, and discovered.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-7 max-w-2xl text-xl leading-relaxed text-ink-soft text-pretty">
              Trueline Publishers is an International Academic Publisher committed to advancing Research across
              Biomedical Sciences, Life Sciences, Engineering, Technology, Management, Humanities, Social Sciences, and
              many other Disciplines — through Rigorous Peer Review, Ethical Bublishing, and Global Visibility.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link to="/contact" className="btn-brand h-12 px-7 text-[15px]">
                Contact Us <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

function Pillars() {
  return (
    <section className="bg-paper pt-20 pb-8 sm:pt-24 sm:pb-8">
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

function ServicesTeaser() {
  return (
    <section className="bg-paper pt-8 pb-20 sm:pt-8 sm:pb-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-5">
            <SectionHead
              eyebrow="Publishing & author services"
              title="Help good research meet publication standards."
              intro="Transparent, optional support across the publishing journey — language editing, formatting, plagiarism and AI-integrity checks, figures and data visualisation, plus journal and book publication, conference proceedings, and DOI, ISBN and ISSN guidance. Clearly framed as support and firewalled from every editorial decision."
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
          title="Built for universities, institutions and libraries."
          intro="Institutional publishing, conference proceedings, editorial partnerships and open-access library services — for universities, colleges, research institutions, hospitals, libraries, government organisations, industry researchers and academic societies, run to indexing and integrity standards."
        />
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          {INSTITUTION_TRACKS.filter((t) => t.id !== 'gulf').map((t, i) => (
            <Reveal
              key={t.id}
              delay={i * 0.05}
              className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)]"
            >
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
          title="Five organisations, one connected research and publishing ecosystem."
          intro="Trueline Research, Trueline Publishers, Trueline Spectrum, Jaeid and StartNet work together as a single ecosystem: Trueline Research produces and supports scholarly work, Trueline Publishers and Jaeid bring it through peer review into publication, Trueline Spectrum shares it with wider audiences, and StartNet connects it to innovation, events and collaboration."
        />
        <div className="mt-14">
          <Flywheel />
        </div>
      </Container>
    </section>
  )
}
