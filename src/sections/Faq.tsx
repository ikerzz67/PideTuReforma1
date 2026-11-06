import { faq } from '../content/home'
import { Icon } from '../components/Icons'
import { Reveal } from '../lib/useReveal'

export function Faq() {
  return (
    <section id="preguntas" className="section">
      <div className="container container--narrow">
        <Reveal className="section__head">
          <p className="eyebrow">{faq.eyebrow}</p>
          <h2 className="section__title">{faq.title}</h2>
        </Reveal>
        <div className="faq">
          {faq.items.map((f) => (
            <details key={f.q} className="faq__item">
              <summary>
                <span>{f.q}</span>
                <Icon name="plus" size={20} className="faq__plus" />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
