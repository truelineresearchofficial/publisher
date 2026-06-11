import { Link } from 'react-router-dom'
import { CheckCircle2, Clock, Map, Database } from 'lucide-react'
import { Container, Reveal, SectionHead } from '../lib/ui'
import PageHero from '../components/PageHero'
import { INDEXING_STATUS } from '../lib/content'

const STATE_STYLE: Record<string, { cls: string; icon: typeof CheckCircle2 }> = {
  'Built-in': { cls: 'bg-brand-50 text-brand-700 border-brand-200', icon: CheckCircle2 },
  'In progress': { cls: 'bg-sky/10 text-sky border-sky/30', icon: Clock },
  Planned: { cls: 'bg-gold/10 text-gold border-gold/30', icon: Map },
  Roadmap: { cls: 'bg-mist text-ink-soft border-line-2', icon: Map },
}

export default function Indexing() {
  return (
    <>
      <PageHero
        audience="The trust layer"
        eyebrow="Indexing & abstracting"
        title="Transparent and honest — never overclaimed."
        intro="For a publisher, the highest-value discoverability is real indexing with clean DOIs and metadata. We list exactly where we are and clearly label the roadmap. Honesty here is a competitive advantage, because so many competitors overstate it."
      />

      <section className="bg-paper py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <SectionHead
                eyebrow="Where we stand today"
                title="Current status and the labelled roadmap."
                intro="We never imply indexing that does not yet exist. Each entry shows its true state."
              />
              <div className="mt-7 rounded-3xl border border-line bg-canvas p-6">
                <Database className="h-6 w-6 text-brand-500" />
                <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">
                  Discoverability is built in: structured article metadata, Crossref DOIs, ORCID, and Google Scholar
                  inclusion guidelines — the foundation indexing bodies require before they evaluate a journal.
                </p>
              </div>
            </Reveal>

            <div className="lg:col-span-8">
              <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-card">
                {INDEXING_STATUS.map((row, i) => {
                  const s = STATE_STYLE[row.state] ?? STATE_STYLE.Roadmap
                  return (
                    <Reveal key={row.name} delay={i * 0.04}>
                      <div className={`flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between ${i ? 'border-t border-line' : ''}`}>
                        <div className="sm:w-1/3">
                          <div className="font-display text-[16px] font-semibold text-ink">{row.name}</div>
                        </div>
                        <div className="sm:w-1/3">
                          <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[12px] font-semibold ${s.cls}`}>
                            <s.icon className="h-3.5 w-3.5" /> {row.state}
                          </span>
                        </div>
                        <p className="text-[13.5px] leading-snug text-ink-soft sm:w-1/3">{row.note}</p>
                      </div>
                    </Reveal>
                  )
                })}
              </div>
              <Reveal>
                <p className="mt-5 text-[13px] leading-relaxed text-ink-faint">
                  Statuses are updated as applications progress. We will never list a database under "indexed in" until
                  the journal is genuinely accepted there — overclaiming is the fastest way to be flagged as predatory,
                  and it would put the entire indexing roadmap at risk.
                </p>
              </Reveal>
            </div>
          </div>

          <Reveal>
            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-line bg-canvas px-7 py-6">
              <p className="max-w-2xl text-[15px] leading-relaxed text-ink-soft">
                Authors who care about citations care about indexing. We are happy to talk through exactly where your
                work will be discoverable.
              </p>
              <Link to="/contact" className="btn-primary h-11 px-6">
                Ask the editorial office
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
