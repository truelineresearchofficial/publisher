import { Link } from 'react-router-dom'
import { ArrowRight, Lock, ShieldCheck, Clock } from 'lucide-react'
import { Container, Reveal, SectionHead } from '../lib/ui'
import PageHero from '../components/PageHero'
import { AUTHOR_SERVICES, SERVICES_PRICING, FIREWALL_POINTS } from '../lib/content'

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

      {/* Firewall banner — stated up front on this page */}
      <section id="firewall" className="scroll-mt-28 border-b border-line bg-brand-50 py-7">
        <Container>
          <Reveal>
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <Lock className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                <p className="text-[14.5px] leading-relaxed text-brand-800">
                  <strong className="font-semibold">These services are independent of any journal's editorial decision.</strong>{' '}
                  Buying them never changes whether a manuscript is reviewed or accepted.
                </p>
              </div>
              <Link to="/editorial-standards#firewall" className="shrink-0 text-sm font-semibold text-brand-700 hover:text-brand-800">
                Read the full firewall →
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

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

      {/* Transparent pricing */}
      <section id="pricing" className="scroll-mt-28 bg-canvas py-20 sm:py-24">
        <Container>
          <SectionHead
            eyebrow="Pricing & turnaround"
            title="Published openly — never on request."
            intro="Opacity reads as predatory. Indicative rates and turnaround are listed here; you get an exact quote before any work begins."
          />
          <div className="mt-10 overflow-hidden rounded-3xl border border-line bg-white shadow-card">
            <div className="grid grid-cols-12 border-b border-line bg-mist px-6 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-ink-faint">
              <div className="col-span-6 sm:col-span-5">Service</div>
              <div className="col-span-3 sm:col-span-4">Basis</div>
              <div className="col-span-3">Turnaround</div>
            </div>
            {SERVICES_PRICING.map((p, i) => (
              <div key={p.tier} className={`grid grid-cols-12 items-center px-6 py-4 text-[14px] ${i ? 'border-t border-line' : ''}`}>
                <div className="col-span-6 font-medium text-ink sm:col-span-5">{p.tier}</div>
                <div className="col-span-3 text-ink-soft sm:col-span-4">{p.detail}</div>
                <div className="col-span-3 inline-flex items-center gap-1.5 text-ink-soft">
                  <Clock className="h-3.5 w-3.5 text-brand-500" /> {p.turnaround}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/contact#quote" className="btn-brand h-11 px-6">Request a transparent quote</Link>
            <Link to="/submit" className="btn-ghost h-11 px-6">Or submit a manuscript free <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </Container>
      </section>

      {/* The firewall, fully explained */}
      <section className="bg-ink py-20 text-white sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <Reveal className="lg:col-span-5">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-500/20">
                <ShieldCheck className="h-7 w-7 text-brand-300" />
              </div>
              <span className="eyebrow mt-6 text-brand-300">The firewall, in plain terms</span>
              <h2 className="display mt-4 text-[clamp(1.8rem,3.4vw,2.6rem)] text-white">
                What keeps these services legitimate.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-white/65">
                The line between a legitimate editing service and a paper mill is whether money can buy acceptance. With
                us, it cannot — and here is exactly how we keep it that way.
              </p>
            </Reveal>
            <div className="lg:col-span-7">
              <div className="space-y-3">
                {FIREWALL_POINTS.map((t, i) => (
                  <Reveal key={t} delay={i * 0.05}>
                    <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-500/20 text-[12px] font-bold text-brand-300">
                        {i + 1}
                      </span>
                      <span className="text-[14.5px] leading-relaxed text-white/85">{t}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
