import { legalLinks, nav, site } from '../config/site'
import { Link } from '../lib/router'
import { Icon } from './Icons'
import { Logo } from './Logo'

export function Footer() {
  const { email, phone } = site.contact
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Logo />
          <p>Conectamos particulares con profesionales de reformas para que encontrar la opción adecuada sea más sencillo.</p>
        </div>
        <div>
          <h3 className="footer__title">Navegación</h3>
          <ul>
            <li><Link href="/">Inicio</Link></li>
            {nav.map((n) => (
              <li key={n.href}><Link href={n.href}>{n.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="footer__title">Contacto</h3>
          <ul>
            {email && (
              <li><a href={`mailto:${email}`}><Icon name="mail" size={16} /> {email}</a></li>
            )}
            {phone && (
              <li><a href={`tel:${phone.replace(/\s/g, '')}`}><Icon name="phone" size={16} /> {phone}</a></li>
            )}
            <li><span className="footer__area"><Icon name="pin" size={16} /> {site.area}</span></li>
          </ul>
        </div>
        <div>
          <h3 className="footer__title">Legal</h3>
          <ul>
            {legalLinks.map((l) => (
              <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container footer__bottom">
        <p>© {new Date().getFullYear()} PideTuReforma. Plataforma de intermediación: no ejecutamos las obras ni dirigimos técnicamente las reformas.</p>
      </div>
    </footer>
  )
}
