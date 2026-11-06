import { Icon } from '../components/Icons'
import { Illustration } from '../components/Illustration'
import { reformTypes } from '../content/home'
import { startQuiz } from '../lib/quizBridge'
import { Reveal } from '../lib/useReveal'

export function ReformTypes() {
  const t = reformTypes
  return (
    <section id="tipos" className="section section--alt">
      <div className="container">
        <Reveal className="section__head">
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 className="section__title">{t.title}</h2>
          <p className="section__lead">{t.subtitle}</p>
        </Reveal>
        <div className="types">
          {t.items.map((it, i) => (
            <Reveal key={it.type} delay={i * 70}>
              <button type="button" className="type-card" onClick={() => startQuiz(it.type)} aria-label={`${it.title}: empezar el cuestionario`}>
                <Illustration scene={it.scene} className="type-card__img" />
                <span className="type-card__body">
                  <span className="type-card__title">{it.title}</span>
                  <span className="type-card__text">{it.text}</span>
                  <span className="type-card__go">
                    Empezar <Icon name="arrow" size={16} />
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
