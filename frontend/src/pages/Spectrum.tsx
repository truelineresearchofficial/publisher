import { useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowRight, Mail, BookOpen } from 'lucide-react'
import { Container, Reveal, SectionHead } from '../lib/ui'
import { SPECTRUM_FEATURES } from '../lib/content'
import { submitForm, SubmitError } from '../lib/submit'

export default function Spectrum() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hp, setHp] = useState('')
  const lead = SPECTRUM_FEATURES[0]
  const rest = SPECTRUM_FEATURES.slice(1)

  async function handleSubscribe(e: FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      await submitForm({ form_type: 'newsletter', website: hp, email })
      setSent(true)
    } catch (err) {
      setError(err instanceof SubmitError ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      {/* Warmer, magazine-style hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-paper pt-[132px]">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
        <Container className="relative pb-16 pt-8">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-brand-700 shadow-card">
              <BookOpen className="h-3.5 w-3.5" /> The magazine
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="display mt-6 max-w-3xl text-[clamp(2.6rem,6vw,4.4rem)] text-balance">
              Trueline <span className="text-spectrum">Spectrum</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink-soft text-pretty">
              The reach-and-humanisation layer of Trueline Publishers — readable researcher profiles, science explainers
              and Centre-of-Excellence stories. The friendly front door that broadens our audience far beyond academics.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Lead feature */}
      <section className="bg-paper py-16">
        <Container>
          <Reveal>
            <article className="group grid overflow-hidden rounded-4xl border border-line bg-white shadow-card lg:grid-cols-2">
              <div className="relative min-h-[260px] bg-gradient-to-br from-brand-500 via-aqua to-sky p-10">
                <div className="pointer-events-none absolute inset-0 bg-grid-fine opacity-20" />
                <span className="relative inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur">
                  {lead.tag}
                </span>
              </div>
              <div className="flex flex-col justify-center p-8 lg:p-10">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-500">Featured</span>
                <h2 className="mt-3 font-display text-2xl font-semibold leading-tight text-ink">{lead.title}</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                  A human story behind the science — the kind of writing that brings new readers to credible research and
                  cross-promotes the Research Centres of Excellence and StartNet events.
                </p>
                <div className="mt-5 flex items-center gap-4 text-[13px] text-ink-faint">
                  <span>{lead.read}</span>
                  <span className="inline-flex items-center gap-1.5 font-semibold text-brand-600">
                    Read feature <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </article>
          </Reveal>
        </Container>
      </section>

      {/* Article grid */}
      <section className="bg-canvas py-16">
        <Container>
          <SectionHead eyebrow="Articles & features" title="Stories, explainers and profiles." />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {rest.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.06}>
                <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-card-lg">
                  <div className="h-32 bg-gradient-to-br from-mist to-brand-50" />
                  <div className="flex flex-1 flex-col p-6">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-500">{f.tag}</span>
                    <h3 className="mt-2 flex-1 font-display text-[17px] font-semibold leading-snug text-ink group-hover:text-brand-700">
                      {f.title}
                    </h3>
                    <span className="mt-4 text-[12.5px] text-ink-faint">{f.read}</span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Subscribe — newsletter capture */}
      <section className="bg-paper py-20">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-4xl border border-line bg-ink px-8 py-14 text-white sm:px-14">
              <div className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full bg-brand-500/25 blur-3xl" />
              <div className="relative mx-auto max-w-xl text-center">
                <span className="eyebrow justify-center text-brand-300">Subscribe</span>
                <h2 className="display mt-4 text-[clamp(1.8rem,3.4vw,2.6rem)] text-white">
                  Get Spectrum in your inbox.
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-white/65">
                  Researcher stories, science explainers and publishing guidance — no spam, unsubscribe anytime.
                </p>
                {sent ? (
                  <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-500/20 px-5 py-3 text-sm font-semibold text-brand-200">
                    Thanks — you're subscribed.
                  </p>
                ) : (
                  <>
                    <form onSubmit={handleSubscribe} className="mt-7 flex flex-col gap-3 sm:flex-row">
                      {/* honeypot — off-screen; bots fill it and are silently dropped */}
                      <input
                        type="text"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                        value={hp}
                        onChange={(e) => setHp(e.target.value)}
                        className="absolute left-[-9999px] h-0 w-0 opacity-0"
                      />
                      <div className="relative flex-1">
                        <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@institution.edu"
                          className="h-12 w-full rounded-full border border-white/15 bg-white/[0.06] pl-11 pr-4 text-[15px] text-white placeholder:text-white/40 focus:border-brand-300 focus:outline-none"
                        />
                      </div>
                      <button type="submit" disabled={submitting} className="btn-brand h-12 px-7 disabled:opacity-60">
                        {submitting ? 'Sending…' : 'Subscribe'}
                      </button>
                    </form>
                    {error && (
                      <p className="mt-3 text-sm font-medium text-red-300" role="alert">
                        {error}
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
