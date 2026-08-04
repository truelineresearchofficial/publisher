import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight, ShieldCheck, Scale, Eye, Users, Linkedin, Instagram, Facebook, MessageCircle, Phone, BookOpen, Presentation, FileText, Building2, GraduationCap } from 'lucide-react'
import { Container, Reveal, SectionHead } from '../lib/ui'
import PageHero from '../components/PageHero'
import { PILLARS } from '../lib/content'

/** Count from 0 to `value` once the number scrolls into view; honors reduced-motion. */
function CountUp({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setDisplay(value)
      return
    }
    const duration = 1600
    let raf = 0
    let start: number | null = null
    const step = (now: number) => {
      if (start === null) start = now
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(Math.round(eased * value))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, reduce])

  return (
    <span ref={ref}>
      {display.toLocaleString('en-US')}
      {suffix}
    </span>
  )
}

const IMPACT_STATS = [
  { icon: BookOpen, value: 200, suffix: '+', title: 'Books Published' },
  { icon: Presentation, value: 50, suffix: '+', title: 'International Conferences Organized' },
  { icon: FileText, value: 1500, suffix: '+', title: 'Scopus, Web of Science, Conference & Peer-Reviewed Publications' },
  { icon: Building2, value: 150, suffix: '+', title: 'Institutions & Universities Partnered' },
  { icon: GraduationCap, value: 15000, suffix: '+', title: 'Students Trained Through Workshops' },
  { icon: Users, value: 5000, suffix: '+', title: 'Faculty Trained Through FDPs & Workshops' },
]

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About Trueline Publisher"
        title="A trust-led, multidisciplinary academic publisher."
        intro="We exist to convert research output into credibility. We lead with editorial standards, indexing transparency, peer-review integrity and credible people — because that is what lets institutions and authors trust what we publish."
        cta={{ label: 'Read our editorial standards', to: '/editorial-standards' }}
      />

      {/* CEO Message */}
      <section id="ceo-message" className="scroll-mt-28 bg-canvas py-20 sm:py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <img
                src="https://drive.google.com/thumbnail?id=1SDQpMWYEwvXVfH9nH9vG8bNafOrTKUc7&sz=w1000"
                alt="Dr. V. Nagaraj, Chief Executive Officer of Trueline Publisher"
                className="w-full h-[450px] object-cover object-[center_20%] rounded-3xl shadow-lg"
              />
            </Reveal>
            <div className="lg:col-span-7">
              <SectionHead eyebrow="Leadership" title="Founder Message" />
              <p className="mt-6 font-display text-2xl font-semibold text-ink">
                Dr. V. NAGARAJ
              </p>

              <div className="prose-tl mt-4 max-w-2xl">
                <p>
                  <strong>M.E., M.B.A., Ph.D. from Anna University and Post Doctorate Fellowship from University of South Florida (USA).</strong> With over <strong>13 years of experience</strong> in academic publishing, research, and innovation, I founded <strong>
                    
                    Trueline Publisher in 2019</strong> with a vision to deliver ethical, high-quality, and globally recognized publishing solutions. <strong>We specialize in book publishing, Scopus and Web of Science-indexed research publications, and multidisciplinary journals across Engineering, Technology, Medical, Science, Management, Arts, and other disciplines.</strong>
                </p>
                <p>
                  Our commitment is to provide rigorous peer review, transparent editorial practices, and international publishing standards, while supporting researchers through academic profiling, research visibility, and global dissemination. <strong>We also collaborate with universities and academic institutions through international conferences, research partnerships, and institutional publishing programs to strengthen the global research ecosystem.</strong>
                </p>
                <p>
                  Thank you for approaching Trueline Publisher.<strong>We are proud to be your trusted publishing partner in advancing research, innovation, and academic excellence worldwide.</strong>
                </p>
              </div>
              <div className="mt-6 flex items-center gap-3">
                {[
                  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/nagaraj-varatharaj' },
                  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/nagaraj_varatharaj?igsh=NXR2N2JybDlicDR2' },
                  { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/nagaraj.varatharaj.3' },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink-soft transition-colors hover:border-brand-500 hover:text-brand-600"
                  >
                    <s.icon className="h-5 w-5" />
                  </a>
                ))}
                <a
                  href="https://wa.me/message/7NHZKTMAKDIWJ1"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink-soft transition-colors hover:border-brand-500 hover:text-brand-600"
                >
                  <MessageCircle className="h-5 w-5" />
                </a>
                <a
                  href="tel:+919578873584"
                  aria-label="95788 73584"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink-soft transition-colors hover:border-brand-500 hover:text-brand-600"
                >
                  <Phone className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Our Impact in Numbers */}
      <section id="impact" className="scroll-mt-28 bg-paper py-20 sm:py-24">
        <Container>
          <SectionHead
            align="center"
            eyebrow="Our Impact"
            title="We Are Proud Of..."
            intro="Delivering measurable excellence in academic publishing, research, conferences, institutional collaborations, and professional development."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {IMPACT_STATS.map((s, i) => (
              <Reveal key={s.title} delay={(i % 3) * 0.06}>
                <div className="flex h-full min-h-[240px] flex-col items-center justify-center rounded-3xl border border-line bg-white p-8 text-center shadow-card transition-all hover:-translate-y-1 hover:shadow-card-lg">
                  <div className="bg-gradient-to-r from-[#00A99D] via-[#26BBB0] to-[#45B8FF] bg-clip-text font-display text-6xl font-extrabold text-transparent">
                    <CountUp value={s.value} suffix={s.suffix} />
                  </div>
                  <p className="mt-4 text-[15px] font-semibold leading-normal text-ink">{s.title}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

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
                  Trueline Publisher is the multidisciplinary academic publishing house of the Trueline Group,
                  supporting authors across engineering, technology, science, management, commerce, arts, education,
                  pharmacy, nursing, agriculture, humanities and the social sciences. Our job in the group is singular:
                  to credentialize research — turning credible work into peer-reviewed, indexed, citable publications
                  through books, journals, book chapters and conference proceedings.
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
                  { icon: ShieldCheck, t: 'Ethical Publishing', b: 'Publishing with integrity, transparency, and internationally accepted editorial standards.' },
                  { icon: Eye, t: 'Global Visibility', b: 'Supporting DOI, indexing guidance, and worldwide research dissemination.' },
                  { icon: Scale, t: 'Research Excellence', b: 'Empowering authors and institutions through quality publishing and scholarly communication.' },
                  { icon: Users, t: 'Academic Partnerships', b: 'Collaborating with universities, conferences, and research institutions to advance innovation and knowledge.' },
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

    </>
  )
}
