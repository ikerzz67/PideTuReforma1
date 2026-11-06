import { useEffect, useState } from 'react'
import { nav } from '../config/site'
import { Link, useLocation } from '../lib/router'
import { startQuiz } from '../lib/quizBridge'
import { Icon } from './Icons'
import { Logo } from './Logo'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { path } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [path])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header className={`header${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <div className="container header__inner">
        <Logo />
        <nav className="header__nav" aria-label="Navegación principal">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="header__link">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="header__actions">
          <Link href="/#presupuesto" className="btn btn--primary btn--sm header__cta" onClick={() => startQuiz()}>
            Presupuesto gratis
          </Link>
          <button type="button" className="header__burger" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setOpen((o) => !o)}>
            <Icon name={open ? 'close' : 'menu'} size={26} />
          </button>
        </div>
      </div>
      <div id="mobile-menu" className="mobile-menu" hidden={!open}>
        <nav aria-label="Navegación móvil" className="container">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="mobile-menu__link" onClick={() => setOpen(false)}>
              {n.label}
            </Link>
          ))}
          <Link href="/#presupuesto" className="btn btn--primary btn--lg mobile-menu__cta" onClick={() => { setOpen(false); startQuiz() }}>
            Pedir presupuesto gratis
          </Link>
        </nav>
      </div>
    </header>
  )
}
