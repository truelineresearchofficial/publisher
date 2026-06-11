import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, FileText, CheckCircle2, Lock } from 'lucide-react'
import { Container, Reveal, SectionHead } from '../lib/ui'
import { JOURNAL, CONTACT_FORMS } from '../lib/content'
import { submitForm, SubmitError } from '../lib/submit'

export default function Submit() {
  const form = CONTACT_FORMS.find((f) => f.id === 'submit')!
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [values, setValues] = useState<Record<string, string>>({})
  const [confirmed, setConfirmed] = useState(false)
  const [hp, setHp] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      await submitForm({
        form_type: 'submit',
        website: hp,
        ...values,
        originality_confirmed: confirmed,
      })
      setSent(true)
    } catch (err) {
      setError(err instanceof SubmitError ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink pt-[120px] text-white">
        <div className="pointer-events-none absolute inset-0 bg-grid-fine opacity-[0.12]" />
        <Container className="relative pb-14 pt-8">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-500/20 px-3.5 py-1.5 text-xs font-semibold text-brand-200">
              <FileText className="h-3.5 w-3.5" /> Editorial · routes to peer review
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="display mt-6 max-w-3xl text-[clamp(2.3rem,5vw,3.8rem)] text-white text-balance">
              Submit a manuscript.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
              Submission is free and goes straight to the editorial office of {JOURNAL.name}, entering our double-blind
              peer-review workflow. This is not a paid service — and buying one would not change the outcome.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="mt-6 inline-flex items-start gap-2.5 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3.5">
              <Lock className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" />
              <p className="text-[13.5px] leading-relaxed text-white/70">
                Manuscripts are managed in a scholarly editorial system (OJS). Decisions are made by editors and
                reviewers on scientific merit alone.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* What happens next + form */}
      <section className="bg-paper py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <SectionHead eyebrow="What happens next" title="From submission to decision." />
              <ol className="mt-7 space-y-5">
                {[
                  ['Editorial screening', 'Scope, completeness, reporting standards and ethics declarations are checked.'],
                  ['Integrity check', 'Similarity and AI-use screening before an editor is assigned.'],
                  ['Double-blind review', 'At least two independent experts assess the science.'],
                  ['Decision', 'Accept, revise or reject — on merit alone, typically within 6–8 weeks.'],
                ].map(([t, b], i) => (
                  <li key={t} className="flex gap-4">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-50 text-[13px] font-bold text-brand-700">
                      {i + 1}
                    </span>
                    <div>
                      <div className="font-display text-[16px] font-semibold text-ink">{t}</div>
                      <div className="mt-0.5 text-[14px] leading-relaxed text-ink-soft">{b}</div>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-8 rounded-2xl border border-line bg-canvas p-5 text-[13.5px] leading-relaxed text-ink-soft">
                Want help getting your manuscript ready first? Author services are{' '}
                <Link to="/author-services" className="font-semibold text-brand-600 hover:text-brand-700">optional and firewalled</Link>{' '}
                — they never affect this decision.
              </div>
            </Reveal>

            <div className="lg:col-span-7">
              <Reveal delay={0.08}>
                <div className="rounded-4xl border border-line bg-white p-7 shadow-card sm:p-9">
                  <h2 className="font-display text-xl font-semibold text-ink">{form.title}</h2>
                  <p className="mt-1.5 text-[14px] text-ink-soft">{form.body}</p>
                  {sent ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <div className="grid h-14 w-14 place-items-center rounded-full bg-brand-50">
                        <CheckCircle2 className="h-7 w-7 text-brand-600" />
                      </div>
                      <h3 className="mt-5 font-display text-xl font-semibold text-ink">Submission received.</h3>
                      <p className="mt-2 max-w-sm text-[14.5px] text-ink-soft">
                        You'll get an acknowledgement with a manuscript ID, and the editorial office will be in touch.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
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
                      {form.fields.map((f, i) => {
                        const key = form.keys[i]
                        const wide = key === 'manuscript_title' || key === 'abstract'
                        const set = (val: string) => setValues((v) => ({ ...v, [key]: val }))
                        return (
                          <label key={key} className={`block ${wide ? 'sm:col-span-2' : ''}`}>
                            <span className="text-[13px] font-medium text-ink-soft">{f}</span>
                            {key === 'abstract' ? (
                              <textarea
                                required
                                rows={4}
                                value={values[key] ?? ''}
                                onChange={(e) => set(e.target.value)}
                                className="mt-1.5 w-full rounded-xl border border-line-2 bg-canvas px-4 py-3 text-[14.5px] text-ink focus:border-brand-400 focus:bg-white focus:outline-none"
                              />
                            ) : key === 'article_type' ? (
                              <select
                                required
                                value={values[key] ?? ''}
                                onChange={(e) => set(e.target.value)}
                                className="mt-1.5 h-11 w-full rounded-xl border border-line-2 bg-canvas px-4 text-[14.5px] text-ink focus:border-brand-400 focus:bg-white focus:outline-none"
                              >
                                <option value="">Select…</option>
                                <option>Original research</option>
                                <option>Systematic review</option>
                                <option>Methods</option>
                                <option>Short communication</option>
                                <option>Case report</option>
                              </select>
                            ) : (
                              <input
                                required
                                type={key === 'email' ? 'email' : 'text'}
                                value={values[key] ?? ''}
                                onChange={(e) => set(e.target.value)}
                                className="mt-1.5 h-11 w-full rounded-xl border border-line-2 bg-canvas px-4 text-[14.5px] text-ink focus:border-brand-400 focus:bg-white focus:outline-none"
                              />
                            )}
                          </label>
                        )
                      })}
                      <label className="flex items-start gap-2.5 sm:col-span-2">
                        <input
                          type="checkbox"
                          required
                          checked={confirmed}
                          onChange={(e) => setConfirmed(e.target.checked)}
                          className="mt-1 h-4 w-4 accent-brand-500"
                        />
                        <span className="text-[13px] leading-relaxed text-ink-soft">
                          I confirm this work is original, not under consideration elsewhere, and that all authors agree to the{' '}
                          <Link to="/ethics" className="font-semibold text-brand-600 hover:text-brand-700">publication ethics</Link>.
                        </span>
                      </label>
                      {error && (
                        <p className="sm:col-span-2 text-sm font-medium text-red-600" role="alert">
                          {error}
                        </p>
                      )}
                      <button
                        type="submit"
                        disabled={submitting}
                        className="btn-brand h-12 px-7 sm:col-span-2 disabled:opacity-60"
                      >
                        {submitting ? 'Sending…' : form.cta} <ArrowRight className="h-4 w-4" />
                      </button>
                    </form>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
