import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, FileText, Users, ShieldCheck, Unlock, Archive, AlertTriangle, Bot, HelpCircle } from 'lucide-react'
import { Container, Reveal, SectionHead } from '../lib/ui'
import PageHero from '../components/PageHero'
import { POLICIES } from '../lib/content'
import { submitForm, SubmitError } from '../lib/submit'

const ICONS: Record<string, typeof FileText> = {
  authors: FileText,
  reviewers: Users,
  ethics: ShieldCheck,
  access: Unlock,
  archiving: Archive,
  corrections: AlertTriangle,
  ai: Bot,
  faq: HelpCircle,
}

export default function Resources() {
  return (
    <>
      <PageHero
        eyebrow="Resources & ethics"
        title="The policy library authors, reviewers and indexers expect."
        intro="Everything a credible publisher should make public — templates, guidelines, ethics, licensing, archiving and the processes behind corrections and complaints."
      />

      <section className="bg-paper py-20 sm:py-24">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {POLICIES.map((p, i) => {
              const Icon = ICONS[p.id] ?? FileText
              const card = (
                <div className="flex h-full flex-col rounded-3xl border border-line bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-lg">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-50">
                    <Icon className="h-5 w-5 text-brand-600" />
                  </div>
                  <h3 className="mt-5 font-display text-[17px] font-semibold text-ink">{p.title}</h3>
                  <p className="mt-2 flex-1 text-[14px] leading-relaxed text-ink-soft">{p.body}</p>
                  {p.to && (
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                      Open <ArrowRight className="h-4 w-4" />
                    </span>
                  )}
                </div>
              )
              return (
                <Reveal key={p.id} delay={i * 0.04}>
                  <div id={p.id} className="scroll-mt-28 h-full">
                    {p.to ? <Link to={p.to} className="block h-full">{card}</Link> : card}
                  </div>
                </Reveal>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Join the reviewer pool — grows the board */}
      <ReviewerPool />
    </>
  )
}

const REVIEWER_FIELDS: [string, string][] = [
  ['Full name', 'full_name'],
  ['Email', 'email'],
  ['Affiliation & ORCID', 'affiliation_orcid'],
  ['Area of expertise', 'area_of_expertise'],
]

function ReviewerPool() {
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [values, setValues] = useState<Record<string, string>>({})
  const [hp, setHp] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      await submitForm({ form_type: 'reviewer', website: hp, ...values })
      setSent(true)
    } catch (err) {
      setError(err instanceof SubmitError ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="bg-canvas py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <SectionHead
              eyebrow="Join the reviewer & editorial pool"
              title="Help uphold the standard."
              intro="We are constituting a credible editorial board and reviewer pool. Every member is listed with their real name, affiliation and ORCID. Tell us your expertise and we'll be in touch."
            />
            <div className="mt-6 space-y-2.5">
              {['Recognised reviewer credit', 'Clear conflict-of-interest rules', 'A documented, double-blind process'].map((t) => (
                <div key={t} className="flex items-center gap-2.5 text-[14px] text-ink-soft">
                  <ShieldCheck className="h-4 w-4 text-brand-500" /> {t}
                </div>
              ))}
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal delay={0.08}>
              <div className="rounded-4xl border border-line bg-white p-7 shadow-card sm:p-9">
                {sent ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="grid h-14 w-14 place-items-center rounded-full bg-brand-50">
                      <Users className="h-7 w-7 text-brand-600" />
                    </div>
                    <h3 className="mt-5 font-display text-xl font-semibold text-ink">Thank you.</h3>
                    <p className="mt-2 max-w-sm text-[14.5px] text-ink-soft">
                      Our editorial office will review your details and reach out about reviewing or board membership.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
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
                    {REVIEWER_FIELDS.map(([label, key]) => (
                      <label key={key} className="block">
                        <span className="text-[13px] font-medium text-ink-soft">{label}</span>
                        <input
                          required
                          type={key === 'email' ? 'email' : 'text'}
                          value={values[key] ?? ''}
                          onChange={(e) => setValues((v) => ({ ...v, [key]: e.target.value }))}
                          className="mt-1.5 h-11 w-full rounded-xl border border-line-2 bg-canvas px-4 text-[14.5px] text-ink focus:border-brand-400 focus:bg-white focus:outline-none"
                        />
                      </label>
                    ))}
                    <label className="block sm:col-span-2">
                      <span className="text-[13px] font-medium text-ink-soft">Recent publications or review experience</span>
                      <textarea
                        rows={3}
                        value={values.experience ?? ''}
                        onChange={(e) => setValues((v) => ({ ...v, experience: e.target.value }))}
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
                      {submitting ? 'Sending…' : 'Join the reviewer pool'} <ArrowRight className="h-4 w-4" />
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
