import { Link } from 'react-router-dom'
import { ArrowRight, FileText, MessageSquare } from 'lucide-react'
import { Container, Reveal } from '../lib/ui'

/**
 * The two distinct asks, kept visually and functionally separate — the
 * predatory-publisher trap is blurring "submit" (editorial) with "buy a
 * service" (paid). We never blur them.
 */
export default function CTABand() {
  return (
    <section className="bg-paper py-20">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-4xl border border-line bg-ink px-8 py-14 text-white sm:px-14">
            <div className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full bg-brand-500/25 blur-3xl" />
            <div className="pointer-events-none absolute inset-0 bg-grid-fine opacity-[0.12]" />
            <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="eyebrow text-brand-300">Two doors, never blurred</span>
                <h2 className="display mt-4 text-[clamp(1.9rem,3.6vw,2.8rem)] text-white">
                  Publish your research. Or get it publication-ready.
                </h2>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/65">
                  Whether your work is in medicine, engineering, technology, management, humanities, education or social
                  sciences, Trueline Publishers provides professional publishing solutions to help your research reach a
                  global audience.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Link
                  to="/submit"
                  className="group flex flex-col justify-between rounded-3xl bg-brand-500 p-6 transition-transform hover:-translate-y-1"
                >
                  <FileText className="h-7 w-7 text-white" />
                  <div className="mt-8">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-white/70">Editorial</span>
                    <p className="mt-1 flex items-center gap-1.5 font-display text-xl font-semibold text-white">
                      Submit Manuscript
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </p>
                  </div>
                </Link>
                <Link
                  to="/contact#quote"
                  className="group flex flex-col justify-between rounded-3xl border border-white/15 bg-white/[0.04] p-6 transition-transform hover:-translate-y-1"
                >
                  <MessageSquare className="h-7 w-7 text-brand-300" />
                  <div className="mt-8">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-white/50">Services</span>
                    <p className="mt-1 flex items-center gap-1.5 font-display text-xl font-semibold text-white">
                      Request a Quote
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
