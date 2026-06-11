import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import EditorialStandards from './pages/EditorialStandards'
import Ethics from './pages/Ethics'
import Indexing from './pages/Indexing'
import Journals from './pages/Journals'
import Journal from './pages/Journal'
import Books from './pages/Books'
import Spectrum from './pages/Spectrum'
import AuthorServices from './pages/AuthorServices'
import Institutions from './pages/Institutions'
import Resources from './pages/Resources'
import Submit from './pages/Submit'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 96
        window.scrollTo({ top: y, behavior: 'smooth' })
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollManager />
      <Nav />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/editorial-standards" element={<EditorialStandards />} />
          <Route path="/ethics" element={<Ethics />} />
          <Route path="/indexing" element={<Indexing />} />
          <Route path="/journals" element={<Journals />} />
          <Route path="/journals/the-journal" element={<Journal />} />
          <Route path="/books" element={<Books />} />
          <Route path="/spectrum" element={<Spectrum />} />
          <Route path="/author-services" element={<AuthorServices />} />
          <Route path="/institutions" element={<Institutions />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
