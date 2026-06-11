import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Lock, Scale, Eye, GitBranch } from 'lucide-react'
import { Container, Reveal, SectionHead } from '../lib/ui'
import PageHero from '../components/PageHero'
import TrustBar from '../components/TrustBar'
import { REVIEW_STEPS, REVIEW_FACTS } from '../lib/content'

export default function EditorialStandards() {
  return (
    <>
      <PageHero
        audience="The trust layer"
        eyebrow="Editorial standards & peer review"
        title="The page that does the heaviest trust work."
        intro="How we review, who decides, and the firewall between paid services and editorial decisions. This is the single most important page on the site — and the clearest line between us and predatory publishing."
        cta={{ label: 'See the editorial firewall', to: '#firewall' }}
      />
      <TrustBar />

      {/* The model */}
      <section className="bg-paper py-20 sm:py-24">
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

      {/* The firewall — the single most important statement */}
      <section id="firewall" className="scroll-mt-28 bg-ink py-20 text-white sm:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-500/20">
                <Lock className="h-7 w-7 text-brand-300" />
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <span className="eyebrow mt-6 justify-center text-brand-300">The services–editorial firewall</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display mt-4 text-[clamp(1.9rem,4vw,3rem)] text-white">
                Purchasing an author service does <span className="text-brand-300">not</span> influence acceptance.
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 text-lg leading-relaxed text-white/70">
                Editorial decisions are made by editors and reviewers, on scientific merit alone. Our author-services
                team is operated separately from the editorial office, and the two never share decision-making. This is
                the single statement that separates a legitimate publisher from a paper mill — and we mean it.
              </p>
            </Reveal>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
            {[
              'Submitting a manuscript is free and routes straight to peer review.',
              'You can publish with us without buying any service.',
              'Author services are priced openly — never negotiated against acceptance.',
              'No "fast-track for a fee", no acceptance guarantees, ever.',
            ].map((t, i) => (
              <Reveal key={t} delay={i * 0.05}>
                <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-300" />
                  <span className="text-[14.5px] leading-relaxed text-white/85">{t}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link to="/ethics" className="btn-brand h-11 px-6">
                Read our publication ethics
              </Link>
              <Link to="/author-services#firewall" className="inline-flex h-11 items-center gap-1.5 rounded-full border border-white/20 px-6 text-sm font-semibold text-white hover:bg-white/10">
                How author services stay separate <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
