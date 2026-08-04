import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import EditorialStandards from './pages/EditorialStandards'
import Indexing from './pages/Indexing'
import Books from './pages/Books'
import AuthorServices from './pages/AuthorServices'
import ServiceCategoryPage from './components/ServiceCategoryPage'
import { AUTHOR_SERVICE_CATEGORIES } from './lib/authorServices'
import Institutions from './pages/Institutions'
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
          <Route path="/indexing" element={<Indexing />} />
          <Route path="/books" element={<Books />} />
          <Route path="/author-services" element={<AuthorServices />} />
          {AUTHOR_SERVICE_CATEGORIES.map((c) => (
            <Route key={c.slug} path={c.route} element={<ServiceCategoryPage category={c} />} />
          ))}
          <Route path="/institutions" element={<Institutions />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
