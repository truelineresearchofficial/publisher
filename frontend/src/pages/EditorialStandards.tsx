import { ShieldCheck, Scale, Eye, GitBranch } from 'lucide-react'
import { Container, Reveal, SectionHead } from '../lib/ui'
import { REVIEW_STEPS, REVIEW_FACTS } from '../lib/content'

export default function EditorialStandards() {
  return (
    <>
      {/* The model */}
      <section className="bg-paper pt-[112px] pb-20 sm:pb-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <SectionHead
                eyebrow="The review model"
                title="Double-blind, independent, and decided on science alone."
                intro="Author and reviewer identities are mutually masked. At least two independent experts assess every manuscript, and the handling editor decides on scientific merit — never on who the author is, or what they have paid for."
              />
            </Reveal>
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {REVIEW_FACTS.map((f, i) => (
                  <Reveal key={f.label} delay={i * 0.05}>
                    <div className="flex h-full flex-col rounded-3xl border border-line bg-canvas p-5">
                      <div className="font-display text-lg font-semibold text-ink">{f.value}</div>
                      <div className="mt-2 text-[12.5px] leading-snug text-ink-faint">{f.label}</div>
                    </div>
                  </Reveal>
                ))}
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  { icon: Eye, t: 'Identities masked', b: 'Both author and reviewer identities are concealed throughout review.' },
                  { icon: Scale, t: 'Conflicts declared', b: 'Editors recuse from any manuscript where a competing interest exists.' },
                  { icon: GitBranch, t: 'Revisions re-reviewed', b: 'Revisions are checked against the original reviewer reports.' },
                  { icon: ShieldCheck, t: 'Integrity-screened', b: 'Similarity and AI-use checks run before an editor is assigned.' },
                ].map((x, i) => (
                  <Reveal key={x.t} delay={0.1 + i * 0.05}>
                    <div className="flex items-start gap-3 rounded-2xl border border-line bg-white p-4">
                      <x.icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" />
                      <div>
                        <div className="text-[14.5px] font-semibold text-ink">{x.t}</div>
                        <div className="mt-0.5 text-[13px] leading-snug text-ink-soft">{x.b}</div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* The process timeline */}
      <section className="bg-canvas py-20 sm:py-24">
        <Container>
          <SectionHead
            eyebrow="The process, end to end"
            title="From submission to DOI — every step documented."
            intro="A transparent, repeatable workflow. Authors can see exactly what happens to a manuscript and on what basis a decision is made."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {REVIEW_STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.05}>
                <div className="flex h-full flex-col rounded-3xl border border-line bg-white p-6 shadow-card">
                  <span className="font-display text-2xl font-semibold text-brand-400">{s.n}</span>
                  <h3 className="mt-3 font-display text-[17px] font-semibold text-ink">{s.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

    </>
  )
}
