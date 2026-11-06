import { Footer } from './components/Footer'
import { Header } from './components/Header'
import BlogIndex from './pages/BlogIndex'
import BlogPost from './pages/BlogPost'
import Home from './pages/Home'
import Legal from './pages/Legal'
import NotFound from './pages/NotFound'
import { useLocation, useScrollOnNavigate } from './lib/router'

function Routes() {
  const { path } = useLocation()
  const p = path.length > 1 ? path.replace(/\/+$/, '') : path
  if (p === '/') return <Home />
  if (p === '/blog') return <BlogIndex />
  if (p.startsWith('/blog/')) return <BlogPost slug={decodeURIComponent(p.slice(6))} />
  if (p === '/aviso-legal') return <Legal doc="aviso-legal" />
  if (p === '/privacidad') return <Legal doc="privacidad" />
  if (p === '/cookies') return <Legal doc="cookies" />
  return <NotFound />
}

export default function App() {
  useScrollOnNavigate()
  return (
    <>
      <a href="#main" className="skip-link">Saltar al contenido</a>
      <Header />
      <main id="main">
        <Routes />
      </main>
      <Footer />
    </>
  )
}
