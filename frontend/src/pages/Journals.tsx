import { Link } from 'react-router-dom'
import { ArrowRight, BookMarked } from 'lucide-react'
import { Container, Reveal, SectionHead } from '../lib/ui'
import PageHero from '../components/PageHero'
import { JournalMark } from '../components/Marks'
import { JOURNAL } from '../lib/content'

export default function Journals() {
  return (
    <>
      <PageHero
        eyebrow="Journal portfolio"
        title="Our journals."
        intro="Each journal runs as its own scholarly mini-site — with aims and scope, a named editorial board, author guidelines, a documented submission and review process, and transparent charges."
      />

      <section className="bg-paper py-20 sm:py-24">
        <Container>
          <SectionHead
            eyebrow="Flagship"
            title="The biomedical & life-sciences journal."
            intro="Our founding title, carrying a re-branded biomedical identity with its own ISSN and DOIs."
          />

          <Reveal>
            <Link
              to="/journals/the-journal"
              className="group mt-10 grid overflow-hidden rounded-4xl border border-line bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-card-lg lg:grid-cols-12"
            >
              <div className="relative flex items-center justify-center bg-ink p-10 lg:col-span-4">
                <div className="pointer-events-none absolute inset-0 bg-grid-fine opacity-20" />
                <JournalMark className="relative h-44 w-44" />
              </div>
              <div className="p-8 lg:col-span-8 lg:p-10">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-brand-50 px-3 py-1 text-[11px] font-semibold text-brand-700">Open access</span>
                  <span className="rounded-full border border-line px-3 py-1 text-[11px] font-medium text-ink-soft">{JOURNAL.review}</span>
                  <span className="rounded-full border border-line px-3 py-1 text-[11px] font-medium text-ink-soft">{JOURNAL.issn}</span>
                </div>
                <h3 className="mt-5 font-display text-2xl font-semibold text-ink group-hover:text-brand-700">{JOURNAL.name}</h3>
                <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-soft">{JOURNAL.scope}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                  Visit the journal mini-site
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>

          {/* Honest "more coming" — no fabricated portfolio */}
          <Reveal>
            <div className="mt-8 flex items-start gap-4 rounded-3xl border border-dashed border-line-2 bg-canvas p-7">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white">
                <BookMarked className="h-5 w-5 text-ink-faint" />
              </div>
              <div>
                <h3 className="font-display text-[17px] font-semibold text-ink">More titles, added deliberately.</h3>
                <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-ink-soft">
                  We grow the portfolio only as fast as we can staff credible editorial boards and meet indexing
                  standards. Institutions interested in a co-published or white-label journal can{' '}
                  <Link to="/institutions#partnerships" className="font-semibold text-brand-600 hover:text-brand-700">
                    start an editorial partnership
                  </Link>
                  .
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
