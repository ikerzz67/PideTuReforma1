import { howItWorks } from '../content/home'
import { Reveal } from '../lib/useReveal'

export function HowItWorks() {
  const h = howItWorks
  return (
    <section id="como-funciona" className="section section--alt">
      <div className="container">
        <Reveal className="section__head">
          <p className="eyebrow">{h.eyebrow}</p>
          <h2 className="section__title">{h.title}</h2>
          <p className="section__lead">{h.subtitle}</p>
        </Reveal>
        <ol className="timeline">
          {h.steps.map((s, i) => (
            <Reveal as="li" key={s.title} className="timeline__item" delay={i * 90}>
              <span className="timeline__num" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="timeline__dot" aria-hidden="true" />
              <h3 className="timeline__title">
                <span className="sr-only">Paso {i + 1}: </span>
                {s.title}
              </h3>
              <p className="timeline__text">{s.text}</p>
            </Reveal>
          ))}
        </ol>
        <Reveal>
          <p className="section__note">{h.note}</p>
        </Reveal>
      </div>
    </section>
  )
}
