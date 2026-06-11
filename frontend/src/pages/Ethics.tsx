import { Link } from 'react-router-dom'
import { ArrowRight, BadgeCheck } from 'lucide-react'
import { Container, Reveal, SectionHead } from '../lib/ui'
import PageHero from '../components/PageHero'
import { ETHICS_AREAS } from '../lib/content'

export default function Ethics() {
  return (
    <>
      <PageHero
        audience="The trust layer"
        eyebrow="Publication ethics & integrity"
        title="A COPE-aligned ethics framework, written to standard."
        intro="Indexing bodies read this page directly during evaluation, and so do institutions and authors who value their reputation. For a scholarly publisher, ethics is not legal boilerplate — it is the core product."
        cta={{ label: 'Editorial standards & peer review', to: '/editorial-standards' }}
      />

      <section className="bg-paper py-20 sm:py-24">
        <Container>
          <SectionHead
            eyebrow="Our malpractice statement, in full"
            title="The standards we hold authors, reviewers and editors to."
            intro="We align our policies to COPE-style best practice across the Trueline Group. Every author agrees to these standards at submission."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {ETHICS_AREAS.map((e, i) => (
              <Reveal key={e.title} delay={i * 0.05}>
                <div className="flex h-full gap-4 rounded-3xl border border-line bg-white p-6 shadow-card">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-50">
                    <BadgeCheck className="h-5 w-5 text-brand-600" />
                  </div>
                  <div>
                    <h3 className="font-display text-[17px] font-semibold text-ink">{e.title}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">{e.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-canvas py-16">
        <Container>
          <Reveal>
            <div className="rounded-4xl border border-line bg-white p-8 shadow-card sm:p-10">
              <span className="eyebrow">Corrections, retractions & complaints</span>
              <h2 className="display mt-4 text-[clamp(1.6rem,3vw,2.2rem)]">
                When something goes wrong, we say so — transparently.
              </h2>
              <p className="mt-4 max-w-3xl text-[15.5px] leading-relaxed text-ink-soft">
                We follow documented, COPE-style procedures for corrections, expressions of concern and retractions, and
                we publish a clear route for readers to raise concerns. Honesty about errors is part of being a credible
                publisher — not an exception to it.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/resources#corrections" className="btn-primary h-11 px-6">
                  Corrections & retractions policy
                </Link>
                <Link to="/resources#ai" className="btn-ghost h-11 px-6">
                  AI-use & data-integrity policy <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
