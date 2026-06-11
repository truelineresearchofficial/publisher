import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, CalendarDays, Library, Barcode } from 'lucide-react'
import { Container, Reveal, SectionHead } from '../lib/ui'
import PageHero from '../components/PageHero'
import { BOOKS } from '../lib/content'

const ICONS = [BookOpen, CalendarDays, Library, Barcode]

export default function Books() {
  return (
    <>
      <PageHero
        eyebrow="Books & proceedings"
        title="Scholarly books and conference proceedings."
        intro="Peer-reviewed edited volumes, monographs and proceedings in the life sciences — with ISBNs, chapter-level DOIs and distribution to academic channels."
        cta={{ label: 'Propose a book or proceedings', to: '/contact#institution' }}
      />

      <section className="bg-paper py-20 sm:py-24">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {BOOKS.map((b, i) => {
              const Icon = ICONS[i % ICONS.length]
              return (
                <Reveal key={b.title} delay={i * 0.05}>
                  <div className="flex h-full gap-5 rounded-3xl border border-line bg-white p-7 shadow-card">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-50">
                      <Icon className="h-6 w-6 text-brand-600" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display text-[18px] font-semibold text-ink">{b.title}</h3>
                        {b.tag && (
                          <span className="rounded-full bg-aqua/10 px-2.5 py-0.5 text-[10.5px] font-semibold text-aqua">{b.tag}</span>
                        )}
                      </div>
                      <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">{b.body}</p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </Container>
      </section>

      {/* StartNet tie-in */}
      <section className="bg-canvas py-16">
        <Container>
          <Reveal>
            <div className="grid gap-8 rounded-4xl border border-line bg-white p-8 shadow-card sm:p-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8">
                <span className="eyebrow">Powered by the flywheel</span>
                <h2 className="display mt-4 text-[clamp(1.6rem,3vw,2.2rem)]">
                  Every StartNet Bio Summit becomes a published, citable record.
                </h2>
                <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
                  Conference proceedings tie directly to StartNet's events — giving each summit lasting scholarly value
                  and feeding the Trueline Group flywheel. Research generates the work, we credentialize it, and StartNet
                  turns events into indexed proceedings.
                </p>
                <Link to="/about#group" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700">
                  See how the group works <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="lg:col-span-4">
                <div className="rounded-3xl border border-line bg-canvas p-6">
                  {['Edited volumes & monographs', 'Conference proceedings', 'ISBN & chapter DOIs', 'Library distribution'].map((t) => (
                    <div key={t} className="flex items-center gap-2.5 border-b border-line py-2.5 text-[14px] text-ink-soft last:border-0">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-500" /> {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
