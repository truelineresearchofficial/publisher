import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Container, Reveal } from '../lib/ui'
import { AUTHOR_SERVICE_CATEGORIES, type ServiceCategory } from '../lib/authorServices'

function CategoryCard({ category, index }: { category: ServiceCategory; index: number }) {
  return (
    <Reveal delay={(index % 4) * 0.05} className="h-full">
      <Link
        to={category.route}
        className="group flex h-full flex-col rounded-3xl border border-line bg-white p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-lg"
      >
        <div className="flex items-center gap-3">
          <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-line bg-canvas text-brand-500">
            <category.icon className="h-6 w-6" />
          </span>
          <h3 className="font-display text-lg font-bold text-ink">{category.title}</h3>
        </div>
        <p className="mt-4 flex-1 text-[14px] leading-relaxed text-ink-soft">{category.blurb}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
          View Services <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </Link>
    </Reveal>
  )
}

export default function AuthorServices() {
  const firstRow = AUTHOR_SERVICE_CATEGORIES.slice(0, 4)
  const secondRow = AUTHOR_SERVICE_CATEGORIES.slice(4)

  return (
    <>
      <section className="scroll-mt-28 bg-paper pb-16 pt-[112px] sm:pb-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl lg:text-5xl">Explore our services</h2>
            </Reveal>
          </div>
        </Container>

        {/* Cards use a slightly wider container so each card reads wider while
            keeping the 4 + 3 grid and equal widths across both rows. */}
        <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-10">
          {/* Row 1 — four categories */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {firstRow.map((c, i) => (
              <CategoryCard key={c.slug} category={c} index={i} />
            ))}
          </div>

          {/* Row 2 — three categories, horizontally centered */}
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:mx-auto lg:grid-cols-3 lg:max-w-[75%]">
            {secondRow.map((c, i) => (
              <CategoryCard key={c.slug} category={c} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
