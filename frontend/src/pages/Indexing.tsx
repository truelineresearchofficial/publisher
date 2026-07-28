import { Database } from 'lucide-react'
import { Container, Reveal, SectionHead } from '../lib/ui'

export default function Indexing() {
  return (
    <>
      <section className="bg-paper pt-[140px] pb-20 sm:pb-24">
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
                <div className="grid grid-cols-2 border-b border-line bg-mist px-6 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-ink-faint">
                  <div>Category</div>
                  <div>Description</div>
                </div>
                {[
                  [
                    'Web of Science Indexed',
                    'Published in journals indexed in the Web of Science database, ensuring global visibility, citation impact, and international recognition.',
                  ],
                  [
                    'Scopus Indexed',
                    'Published in Scopus-indexed journals that meet internationally recognized editorial, ethical, and quality standards.',
                  ],
                  [
                    'Peer-Reviewed Journal',
                    'Every manuscript undergoes a rigorous double-blind peer review process to ensure academic quality, originality, and research integrity.',
                  ],
                ].map(([category, description], i) => (
                  <Reveal key={i} delay={i * 0.04}>
                    <div className={`grid grid-cols-2 items-center px-6 py-4 text-[14px] ${i ? 'border-t border-line' : ''}`}>
                      <div className="font-display text-[16px] font-semibold text-ink">{category}</div>
                      <div className="text-ink-soft">{description}</div>
                    </div>
                  </Reveal>
                ))}
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
        </Container>
      </section>
    </>
  )
}
