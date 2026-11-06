import { Icon } from '../components/Icons'
import { benefits } from '../content/home'
import { Reveal } from '../lib/useReveal'

export function Benefits() {
  return (
    <section id="ventajas" className="section">
      <div className="container">
        <Reveal className="section__head">
          <p className="eyebrow">{benefits.eyebrow}</p>
          <h2 className="section__title">{benefits.title}</h2>
        </Reveal>
        <div className="benefits">
          {benefits.items.map((b, i) => (
            <Reveal key={b.title} className="benefit" delay={i * 80}>
              <span className="benefit__icon">
                <Icon name={b.icon} size={26} />
              </span>
              <h3>{b.title}</h3>
              <p>{b.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
