import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Scale, Eye, Users } from 'lucide-react'
import { Container, Reveal, SectionHead } from '../lib/ui'
import PageHero from '../components/PageHero'
import Flywheel from '../components/Flywheel'
import { PILLARS } from '../lib/content'

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About Trueline Publishers"
        title="A trust-led scholarly publisher for life sciences."
        intro="We exist to convert research output into credibility. We lead with editorial standards, indexing transparency, peer-review integrity and credible people — because that is what lets institutions and authors trust what we publish."
        cta={{ label: 'Read our editorial standards', to: '/editorial-standards' }}
      />

      {/* Who we are */}
      <section id="who" className="scroll-mt-28 bg-paper py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <SectionHead eyebrow="Who we are" title="The narrowed, focused publishing arm of the Trueline Group." />
            </Reveal>
            <div className="lg:col-span-7">
              <div className="prose-tl max-w-2xl">
                <p>
                  Trueline Publishers is the biomedical and life-sciences scholarly publishing house of the Trueline
                  Group. Our job in the group is singular: to credentialize research — turning credible work into
                  peer-reviewed, indexed, citable publications.
                </p>
                <p>
                  A publishing website lives or dies on trust. Authors, readers, indexing bodies and institutional
                  clients all scrutinise a publisher for legitimacy before they engage. So we built this house — and this
                  site — to behave like a serious, integrity-first scholarly publisher: standards first, services second.
                </p>
                <p>
                  That means a documented peer-review process, a COPE-aligned ethics framework, an honest indexing
                  roadmap, transparent charges, and a board listed with real names and affiliations. It also means a
                  firewall between paid author services and editorial decisions that we never cross.
                </p>
              </div>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {[
                  { icon: ShieldCheck, t: 'Integrity-first', b: 'Trust signals lead; sales follow.' },
                  { icon: Eye, t: 'Transparent', b: 'Honest indexing, open charges, clear policies.' },
                  { icon: Scale, t: 'Firewalled', b: 'Services never influence editorial decisions.' },
                  { icon: Users, t: 'Credible people', b: 'A real, named editorial board.' },
                ].map((x) => (
                  <div key={x.t} className="flex items-start gap-3 rounded-2xl border border-line bg-canvas p-4">
                    <x.icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" />
                    <div>
                      <div className="text-[14.5px] font-semibold text-ink">{x.t}</div>
                      <div className="text-[13px] text-ink-soft">{x.b}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Pillars recap */}
      <section className="bg-canvas py-20 sm:py-24">
        <Container>
          <SectionHead align="center" eyebrow="What we do" title="Three pillars hold up everything we publish." />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {PILLARS.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.06}>
                <Link to={p.to} className="group flex h-full flex-col rounded-3xl border border-line bg-white p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-lg">
                  <span className="font-display text-sm font-semibold tracking-widest text-brand-500">{p.n}</span>
                  <h3 className="mt-3 font-display text-lg font-semibold text-ink">{p.name}</h3>
                  <p className="mt-2 flex-1 text-[14px] leading-relaxed text-ink-soft">{p.body}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                    Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Governance */}
      <section id="governance" className="scroll-mt-28 bg-paper py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <SectionHead
                eyebrow="Leadership & editorial governance"
                title="How decisions get made — and who is accountable."
                intro="Editorial authority sits with named editors, not with commercial teams. Governance is documented, conflicts are declared, and the integrity of the published record is the Editor-in-Chief's responsibility."
              />
              <Link to="/journals/the-journal#board" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700">
                Meet the editorial board <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
            <div className="lg:col-span-7">
              <div className="space-y-4">
                {[
                  ['Editorial independence', 'Editors decide what is published, on scientific merit. Commercial and services teams have no vote.'],
                  ['Declared conflicts', 'Editors and reviewers declare competing interests and recuse where needed.'],
                  ['Accountable record', 'The Editor-in-Chief is accountable for corrections, retractions and the integrity of the published record.'],
                  ['Group-wide ethics', 'We align to COPE-style best practice across Trueline Research, Publishers and StartNet.'],
                ].map(([t, b], i) => (
                  <Reveal key={t} delay={i * 0.05}>
                    <div className="rounded-3xl border border-line bg-canvas p-6">
                      <h3 className="font-display text-[16px] font-semibold text-ink">{t}</h3>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-ink-soft">{b}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* The Trueline Group */}
      <section id="group" className="scroll-mt-28 bg-canvas py-20 sm:py-24">
        <Container>
          <SectionHead
            align="center"
            eyebrow="The Trueline Group"
            title="One engine, three entities, a single flywheel."
            intro="Trueline Research generates the output, Trueline Publishers credentializes it, and StartNet turns events and ventures into proceedings and partnerships — each one compounding the others."
          />
          <div className="mt-14">
            <Flywheel />
          </div>
        </Container>
      </section>

      {/* Contact CTA */}
      <section className="bg-paper py-16">
        <Container>
          <Reveal>
            <div className="flex flex-col items-center gap-5 rounded-4xl border border-line bg-ink px-8 py-14 text-center text-white">
              <h2 className="display text-[clamp(1.7rem,3.2vw,2.4rem)] text-white">Work with a publisher that values reputation.</h2>
              <p className="max-w-xl text-[15px] leading-relaxed text-white/65">
                Whether you're an author, a reviewer or an institution, we'd welcome the conversation.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link to="/submit" className="btn-brand h-12 px-7">Submit a manuscript</Link>
                <Link to="/contact#institution" className="inline-flex h-12 items-center gap-1.5 rounded-full border border-white/20 px-7 text-sm font-semibold text-white hover:bg-white/10">
                  Talk to us <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
