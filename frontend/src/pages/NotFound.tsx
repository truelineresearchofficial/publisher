import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Container } from '../lib/ui'
import { JournalMark } from '../components/Marks'

export default function NotFound() {
  return (
    <section className="grid min-h-[70vh] place-items-center bg-canvas pt-[120px]">
      <Container className="text-center">
        <div className="mx-auto w-28 opacity-70">
          <JournalMark className="h-full w-full" />
        </div>
        <p className="mt-6 font-display text-6xl font-semibold text-ink">404</p>
        <h1 className="mt-3 font-display text-2xl font-semibold text-ink">This page isn't in our catalogue.</h1>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-ink-soft">
          The page you're looking for may have moved. Head back to the homepage or explore the journal.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-brand h-11 px-6">Back to home</Link>
          <Link to="/journals/the-journal" className="btn-ghost h-11 px-6">
            Visit the journal <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  )
}
