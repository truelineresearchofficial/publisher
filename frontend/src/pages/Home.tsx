import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Container, Reveal, SectionHead } from '../lib/ui'
import { JournalMark, HelixLines } from '../components/Marks'
import Flywheel from '../components/Flywheel'
import LogoMarquee from '../components/LogoMarquee'
import {
  PILLARS,
  AUTHOR_SERVICES,
} from '../lib/content'

export default function Home() {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <Pillars />
      <ServicesTeaser />
      <GroupFlywheel />
    </>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-canvas pt-[80px]">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-70" />
      <div className="pointer-events-none absolute -right-16 top-12 hidden w-[396px] opacity-[0.55] sm:block">
        <JournalMark className="h-full w-full animate-float" />
      </div>
      <div className="pointer-events-none absolute right-[12%] top-24 hidden h-[440px] w-[180px] opacity-40 xl:block">
        <HelixLines className="h-full w-full" />
      </div>

      <Container className="relative pb-6 pt-2">
        <div className="max-w-3xl">
          <Reveal delay={0.08}>
            <h1 className="display text-[clamp(2.1rem,5vw,3.7rem)] font-semibold leading-[1.05] text-balance">
              Where quality research is{" "}
              <span className="text-spectrum">
                published, indexed, and discovered.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-5 max-w-2xl text-base sm:text-lg leading-7 text-ink-soft text-pretty">
              Trueline Publisher is an International Academic Publisher committed to advancing Research across Biomedical Sciences, Life Sciences, Engineering, Technology, Management, Humanities, Social Sciences, and Multidisciplinary fields through Rigorous Peer Review, Ethical Publishing, Scopus-Indexed and Web of Science Journals (SCI, SCIE, ESCI, AHCI, PubMed, T&R), Books, Conference Proceedings, and Global Research Visibility.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-6 flex flex-wrap items-center gap-3">
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

function GroupFlywheel() {
  return (
    <section className="relative overflow-hidden bg-paper py-20 sm:py-24">
      <Container>
        <SectionHead
          align="center"
          eyebrow="The Trueline Group flywheel"
          title="Five organisations, one connected research and publishing ecosystem."
          intro="Trueline Research, Trueline Publisher, Trueline Spectrum, Jaeid and StartNet work together as a single ecosystem: Trueline Research produces and supports scholarly work, Trueline Publisher and Jaeid bring it through peer review into publication, Trueline Spectrum shares it with wider audiences, and StartNet connects it to innovation, events and collaboration."
        />
        <div className="mt-14">
          <Flywheel />
        </div>
      </Container>
    </section>
  )
}
