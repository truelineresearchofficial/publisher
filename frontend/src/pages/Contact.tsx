import { useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowRight, CheckCircle2, ChevronDown, Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import PhoneInput from 'react-phone-input-2'
import type { CountryData } from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Container, Reveal } from '../lib/ui'
import { OFFICES } from '../lib/content'
import { submitForm, SubmitError } from '../lib/submit'
import { postToContactSheet } from '../lib/googleSheet'

const [hq, ...branches] = OFFICES

const CONTACT_CARDS: {
  icon: LucideIcon
  title: string
  subtitle: string
  note?: string
  href: string | null
  external?: boolean
}[] = [
  {
    icon: MessageCircle,
    title: 'WhatsApp us directly',
    subtitle: 'Chat with our publishing team',
    href: 'https://wa.me/message/7NHZKTMAKDIWJ1',
    external: true,
  },
  { icon: Mail, title: 'info@truelinepublisher.in', subtitle: 'Email our publishing team', href: 'mailto:info@truelinepublisher.in' },
  { icon: Phone, title: 'Tamil Nadu Office', subtitle: '+91 95788 73584', href: 'tel:+919578873584' },
  { icon: Phone, title: 'Kerala Office', subtitle: '+91 80564 17009', href: 'tel:+918056417009' },
  { icon: Clock, title: 'Business Hours', subtitle: 'Monday – Saturday', note: '9:00 AM – 6:00 PM', href: null },
]

const SUBJECTS = [
  'Book Publication',
  'Research Article Write-up',
  'Research Publication',
  'Synopsis & Thesis Preparation',
  'PhD Guidance',
  'Others',
]

const FIELD_BASE =
  'h-11 w-full rounded-xl border border-line-2 bg-canvas px-4 text-[14.5px] text-ink focus:border-brand-400 focus:bg-white focus:outline-none'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [values, setValues] = useState<Record<string, string>>({})
  const [hp, setHp] = useState('')

  const set = (key: string, val: string) => setValues((v) => ({ ...v, [key]: val }))

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      // Backend contact schema has no phone/subject columns, so fold them into the
      // free-text message and map the rest onto the `institution` variant.
      const message = `Subject: ${values.subject ?? ''}\nPhone: ${values.phone ?? ''}\n\n${values.message ?? ''}`
      await submitForm({
        form_type: 'contact',
        variant: 'institution',
        website: hp,
        name_role: values.full_name ?? '',
        email: values.email ?? '',
        institution: values.organization?.trim() || '—',
        country: '—',
        message,
      })
      // Also mirror the raw submission into the team's Google Sheet (best-effort;
      // never blocks or breaks the success UI). Skip when the honeypot is filled
      // so bots don't reach the Sheet — matching the backend's honeypot handling.
      if (!hp) {
        void postToContactSheet({
          name: values.full_name ?? '',
          email: values.email ?? '',
          phone: values.phone ?? '',
          subject: values.subject ?? '',
          organization: values.organization ?? '',
          message: values.message ?? '',
          form_type: 'contact',
          variant: 'institution',
          website: hp,
        })
      }
      setSent(true)
    } catch (err) {
      setError(err instanceof SubmitError ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <section className="bg-paper pt-[118px] pb-16 sm:pb-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            {/* Left — direct contact channels (lg:pt-10 aligns this heading's top edge
                with "Get In Touch" inside the form card, which is offset by its sm:p-10 padding) */}
            <div className="lg:col-span-5 lg:pt-10">
              <Reveal>
                <h2 className="font-display text-3xl font-semibold text-ink">Connect With Our Team</h2>
              </Reveal>
              <Reveal delay={0.05}>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-soft">
                  Professional publishing solutions begin with a simple conversation
                </p>
              </Reveal>

              <div className="mt-7 space-y-3.5">
                {CONTACT_CARDS.map((c, i) => {
                  const inner = (
                    <>
                      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-500 text-white">
                        <c.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-display text-[15px] font-semibold text-ink">{c.title}</p>
                        <p className="mt-0.5 text-[13.5px] leading-relaxed text-ink-soft">{c.subtitle}</p>
                        {c.note && <p className="text-[13.5px] leading-relaxed text-ink-soft">{c.note}</p>}
                      </div>
                    </>
                  )
                  const base =
                    'flex items-center gap-4 rounded-3xl border border-line bg-white p-5 shadow-card transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-brand-300'
                  return (
                    <Reveal key={c.title} delay={0.05 * (i + 1)}>
                      {c.href ? (
                        <a
                          href={c.href}
                          {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          className={`${base} cursor-pointer hover:shadow-xl`}
                        >
                          {inner}
                        </a>
                      ) : (
                        <div className={`${base} hover:shadow-lg`}>{inner}</div>
                      )}
                    </Reveal>
                  )
                })}
              </div>
            </div>

            {/* Right — contact form */}
            <div className="lg:col-span-7">
              <div className="rounded-4xl border border-line bg-white p-7 shadow-card sm:p-10">
                <h1 className="font-display text-4xl font-bold text-ink">Get In Touch</h1>
                <p className="mt-2 text-[14.5px] text-ink-soft">
                  Let's discuss how we can help you achieve your publishing goals
                </p>

                {sent ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="grid h-14 w-14 place-items-center rounded-full bg-brand-50">
                      <CheckCircle2 className="h-7 w-7 text-brand-600" />
                    </div>
                    <h3 className="mt-5 font-display text-xl font-semibold text-ink">Message sent.</h3>
                    <p className="mt-2 max-w-sm text-[14.5px] text-ink-soft">
                      Our publishing team will get back to you shortly.
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

                    <label className="block">
                      <span className="text-[13px] font-medium text-ink-soft">Full Name *</span>
                      <input
                        required
                        type="text"
                        placeholder="Enter your full name"
                        value={values.full_name ?? ''}
                        onChange={(e) => set('full_name', e.target.value)}
                        className={`mt-1.5 ${FIELD_BASE}`}
                      />
                    </label>

                    <label className="block">
                      <span className="text-[13px] font-medium text-ink-soft">Email Address *</span>
                      <input
                        required
                        type="email"
                        placeholder="your.email@example.com"
                        value={values.email ?? ''}
                        onChange={(e) => set('email', e.target.value)}
                        className={`mt-1.5 ${FIELD_BASE}`}
                      />
                    </label>

                    <label className="block">
                      <span className="text-[13px] font-medium text-ink-soft">Phone Number *</span>
                      <div className="tl-phone mt-1.5">
                        <PhoneInput
                          country="in"
                          value={values.phone ?? ''}
                          onChange={(value, data: CountryData | {}) => {
                            // Combine country code + number into one value for the existing phone field.
                            const dial = 'dialCode' in data ? data.dialCode : ''
                            const national = value.slice(dial.length)
                            set('phone', national ? `+${dial} ${national}` : value ? `+${value}` : '')
                          }}
                          enableSearch
                          disableSearchIcon
                          countryCodeEditable={false}
                          specialLabel=""
                          searchPlaceholder="Search country"
                          placeholder="Enter your mobile number"
                          inputProps={{ name: 'phone', required: true }}
                        />
                      </div>
                    </label>

                    <label className="block">
                      <span className="text-[13px] font-medium text-ink-soft">Subject *</span>
                      <div className="relative mt-1.5">
                        <select
                          required
                          value={values.subject ?? ''}
                          onChange={(e) => set('subject', e.target.value)}
                          className={`${FIELD_BASE} appearance-none pr-10 ${values.subject ? '' : 'text-ink-soft'}`}
                        >
                          <option value="" disabled>
                            Select a subject
                          </option>
                          {SUBJECTS.map((s) => (
                            <option key={s} value={s} className="text-ink">
                              {s}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
                      </div>
                    </label>

                    <label className="block sm:col-span-2">
                      <span className="text-[13px] font-medium text-ink-soft">Organization</span>
                      <input
                        type="text"
                        placeholder="Your company or institution"
                        value={values.organization ?? ''}
                        onChange={(e) => set('organization', e.target.value)}
                        className={`mt-1.5 ${FIELD_BASE}`}
                      />
                    </label>

                    <label className="block sm:col-span-2">
                      <span className="text-[13px] font-medium text-ink-soft">Message *</span>
                      <textarea
                        required
                        rows={5}
                        placeholder="Tell us how we can help you......"
                        value={values.message ?? ''}
                        onChange={(e) => set('message', e.target.value)}
                        className="mt-1.5 w-full rounded-xl border border-line-2 bg-canvas px-4 py-3 text-[14.5px] text-ink focus:border-brand-400 focus:bg-white focus:outline-none"
                      />
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
                      {submitting ? 'Sending…' : 'Send Message'} <ArrowRight className="h-4 w-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Our Offices — HQ centered, branches side-by-side below */}
      <section className="bg-canvas py-16 sm:py-20">
        <Container>
          <div className="text-center">
            <p className="text-lg font-semibold uppercase tracking-[0.25em] text-brand-600">
              - Reach us
            </p>
            <h2 className="mt-5 font-display text-5xl font-bold text-ink">
              Our Offices
            </h2>
          </div>

          {/* Headquarters */}
          <Reveal>
            <h3 className="mt-12 text-center font-display text-3xl font-semibold text-ink">
              Headquarters
            </h3>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mx-auto mt-5 max-w-2xl rounded-4xl border border-line bg-white p-7 text-center shadow-card transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-2xl hover:border-brand-300 cursor-pointer sm:p-9">

              <div className="mt-2 flex items-center justify-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-500 text-white">
                  <MapPin className="h-5 w-5" />
                </div>

                <p className="font-display text-2xl font-bold text-ink">
                  {hq.city}
                </p>
              </div>

              <p className="mx-auto mt-4 max-w-lg text-lg leading-8 text-ink-soft">
                {hq.detail}
              </p>

              <a
                href={hq.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-500 px-6 py-3 text-[15px] font-semibold text-white transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-lg"
              >
                <MapPin className="h-5 w-5" />
                View on Google Maps
              </a>
            </div>
          </Reveal>

          {/* Branch offices */}
          {branches.length > 0 && (
            <>
              <Reveal>
                <h3 className="mt-14 text-center font-display text-3xl font-semibold text-ink">Branch Offices</h3>
              </Reveal>
              <div className="mx-auto mt-6 grid max-w-6xl grid-cols-1 justify-center gap-8 sm:grid-cols-2">
                {branches.map((o, i) => (
                  <Reveal key={o.city} delay={0.05 * (i + 1)} className="h-full">
                    <div className="flex h-full flex-col rounded-3xl border border-line bg-white p-6 shadow-card transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-2xl hover:border-brand-300 cursor-pointer">

                      {/* Icon + Branch Name */}
                      <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                          <MapPin className="h-5 w-5" />
                        </div>

                        <p className="font-display text-2xl font-semibold text-ink">
                          {o.city}
                        </p>
                      </div>

                      {/* Subtitle */}
                      <p className="mt-4 text-xl font-semibold text-brand-600">
                        {o.subtitle}
                      </p>

                      {/* Address */}
                      <p className="mt-2 text-base leading-relaxed text-ink-soft">
                        {o.detail}
                      </p>

                      {/* Google Maps */}
<div className="mt-6 flex justify-center">
  <a
    href={o.mapUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex w-auto items-center justify-center gap-2 rounded-2xl bg-brand-500 px-5 py-3 text-[15px] font-semibold text-white transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-lg"
  >
    <MapPin className="h-4 w-4" />
    View on Google Maps
  </a>
</div>

                    </div>
                  </Reveal>
                ))}
              </div>
            </>
          )}
        </Container>
      </section>
    </>
  )
}
