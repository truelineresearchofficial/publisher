import { Container, Reveal, SectionHead } from '../lib/ui'
import PageHero from '../components/PageHero'
import { AUTHOR_SERVICES } from '../lib/content'

export default function AuthorServices() {
  return (
    <>
      <PageHero
        audience="Support — not shortcuts"
        eyebrow="Author services"
        title="Publication-readiness support, transparently priced."
        intro="Optional editorial support that helps good science meet publication standards — language, formatting, integrity checks and figures. This is the Editage model, narrowed to life sciences, with one rule that never bends: it is firewalled from every editorial decision."
        cta={{ label: 'Request a quote', to: '/contact#quote' }}
      />

      {/* Services */}
      <section id="overview" className="scroll-mt-28 bg-paper py-20 sm:py-24">
        <Container>
          <SectionHead
            eyebrow="What we help with"
            title="Four ways to get your manuscript publication-ready."
            intro="Each service is about clarity and compliance — so reviewers judge your science, not your formatting. None of them touches an editorial decision."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {AUTHOR_SERVICES.map((s, i) => (
              <Reveal key={s.id} delay={i * 0.05}>
                <div id={s.id} className="scroll-mt-28 flex h-full flex-col rounded-3xl border border-line bg-white p-7 shadow-card">
                  <h3 className="font-display text-xl font-semibold text-ink">{s.name}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

    </>
  )
}
