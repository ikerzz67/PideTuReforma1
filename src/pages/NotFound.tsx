import { Link } from '../lib/router'
import { useSeo } from '../lib/useSeo'

export default function NotFound() {
  useSeo({ title: 'Página no encontrada | PideTuReforma', description: 'La página que buscas no existe.', path: window.location.pathname, noindex: true })
  return (
    <section className="page-head">
      <div className="container container--narrow notfound">
        <p className="eyebrow">Error 404</p>
        <h1 className="page-head__title">No encontramos esta página</h1>
        <p className="section__lead">Puede que el enlace haya cambiado. Vuelve al inicio y cuéntanos tu reforma.</p>
        <Link href="/" className="btn btn--primary">Ir al inicio</Link>
      </div>
    </section>
  )
}
