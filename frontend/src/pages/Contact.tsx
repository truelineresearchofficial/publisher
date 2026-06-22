import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { useLocation } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Mail, MapPin, FileText, MessageSquare, Building2, Phone } from 'lucide-react'
import { Container, Reveal } from '../lib/ui'
import { CONTACT_FORMS, OFFICES, BRAND } from '../lib/content'
import { submitForm, SubmitError } from '../lib/submit'

const KIND_META: Record<string, { icon: typeof FileText; tag: string }> = {
  editorial: { icon: FileText, tag: 'Editorial' },
  services: { icon: MessageSquare, tag: 'Services' },
  institution: { icon: Building2, tag: 'Partnership' },
}

export default function Contact() {
  const { hash } = useLocation()
  const [active, setActive] = useState(CONTACT_FORMS[0].id)
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [values, setValues] = useState<Record<string, string>>({})
  const [hp, setHp] = useState('')

  useEffect(() => {
    const id = hash.slice(1)
    if (CONTACT_FORMS.some((f) => f.id === id)) setActive(id)
  }, [hash])

  const form = CONTACT_FORMS.find((f) => f.id === active)!

  function reset() {
    setSent(false)
    setSubmitting(false)
    setError(null)
    setValues({})
    setHp('')
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      await submitForm({ form_type: 'contact', variant: form.kind, website: hp, ...values })
      setSent(true)
    } catch (err) {
      setError(err instanceof SubmitError ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <section className="relative overflow-hidden bg-canvas pt-[120px]">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
        <Container className="relative pb-14 pt-8">
          <Reveal>
            <span className="eyebrow">Contact</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="display mt-4 max-w-3xl text-[clamp(2.3rem,5vw,3.8rem)] text-balance">
              Talk to the right desk.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
              We keep our channels separate on purpose: submitting a manuscript, requesting a paid service, and opening
              an institutional partnership are three different conversations.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-paper py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            {/* Selector */}
            <div className="lg:col-span-4">
              <div className="space-y-3">
                {CONTACT_FORMS.map((f) => {
                  const meta = KIND_META[f.kind]
                  const on = active === f.id
                  return (
                    <button
                      key={f.id}
                      id={f.id}
                      onClick={() => {
                        setActive(f.id)
                        reset()
                      }}
                      className={`scroll-mt-28 flex w-full items-start gap-3.5 rounded-3xl border p-5 text-left transition-all ${
                        on ? 'border-brand-300 bg-white shadow-card' : 'border-line bg-canvas hover:border-line-2'
                      }`}
                    >
                      <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${on ? 'bg-brand-500 text-white' : 'bg-white text-brand-600'}`}>
                        <meta.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-display text-[16px] font-semibold text-ink">{f.title}</span>
                        </div>
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-500">{meta.tag} · {f.audience}</span>
                        <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">{f.body}</p>
                      </div>
                    </button>
                  )
                })}
              </div>

              <div className="mt-8 rounded-3xl border border-line bg-canvas p-6">
                <h3 className="font-display text-sm font-semibold text-ink">Editorial office</h3>
                <div className="mt-4 space-y-3 text-[13.5px] text-ink-soft">
                  {OFFICES.map((o) => (
                    <p key={o.city} className="flex items-start gap-2.5">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                      <span><strong className="font-semibold text-ink">{o.city}</strong><br/><span className="inline-block mt-0.5 leading-relaxed">{o.detail}</span></span>
                    </p>
                  ))}
                  <a href={`mailto:${BRAND.email}`} className="flex items-center gap-2.5 hover:text-brand-600">
                    <Mail className="h-4 w-4 shrink-0 text-brand-500" /> {BRAND.email}
                  </a>
                  {BRAND.phone1 && (
                    <a href={`tel:${BRAND.phone1.replace(/\D/g,'')}`} className="flex items-center gap-2.5 hover:text-brand-600">
                      <Phone className="h-4 w-4 shrink-0 text-brand-500" /> {BRAND.phone1}
                    </a>
                  )}
                  {BRAND.phone2 && (
                    <a href={`tel:${BRAND.phone2.replace(/\D/g,'')}`} className="flex items-center gap-2.5 hover:text-brand-600">
                      <Phone className="h-4 w-4 shrink-0 text-brand-500" /> {BRAND.phone2}
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-8">
              <div className="rounded-4xl border border-line bg-white p-7 shadow-card sm:p-10">
                <h2 className="font-display text-2xl font-semibold text-ink">{form.title}</h2>
                <p className="mt-2 text-[14.5px] text-ink-soft">{form.body}</p>

                {sent ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="grid h-14 w-14 place-items-center rounded-full bg-brand-50">
                      <CheckCircle2 className="h-7 w-7 text-brand-600" />
                    </div>
                    <h3 className="mt-5 font-display text-xl font-semibold text-ink">Message sent.</h3>
                    <p className="mt-2 max-w-sm text-[14.5px] text-ink-soft">
                      The {KIND_META[form.kind].tag.toLowerCase()} team will get back to you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-7 grid gap-4 sm:grid-cols-2">
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
                      const wide = key === 'abstract' || key === 'message'
                      return (
                        <label key={key} className={`block ${wide ? 'sm:col-span-2' : ''}`}>
                          <span className="text-[13px] font-medium text-ink-soft">{f}</span>
                          {wide ? (
                            <textarea
                              required
                              rows={4}
                              value={values[key] ?? ''}
                              onChange={(e) => setValues((v) => ({ ...v, [key]: e.target.value }))}
                              className="mt-1.5 w-full rounded-xl border border-line-2 bg-canvas px-4 py-3 text-[14.5px] text-ink focus:border-brand-400 focus:bg-white focus:outline-none"
                            />
                          ) : (
                            <input
                              required
                              type={key === 'email' ? 'email' : 'text'}
                              value={values[key] ?? ''}
                              onChange={(e) => setValues((v) => ({ ...v, [key]: e.target.value }))}
                              className="mt-1.5 h-11 w-full rounded-xl border border-line-2 bg-canvas px-4 text-[14.5px] text-ink focus:border-brand-400 focus:bg-white focus:outline-none"
                            />
                          )}
                        </label>
                      )
                    })}
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
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
