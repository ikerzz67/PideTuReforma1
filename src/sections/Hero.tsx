import { Quiz } from '../components/quiz/Quiz'
import { Icon } from '../components/Icons'
import { hero } from '../content/home'

/** Primera pantalla: el cuestionario es el protagonista. */
export function Hero() {
  return (
    <section id="presupuesto" className="hero" aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__head">
          <h1 id="hero-title" className="hero__title">
            {hero.title}
          </h1>
          <p className="hero__subtitle">{hero.subtitle}</p>
        </div>
        <div className="hero__card">
          <Quiz />
        </div>
        <ul className="hero__assurances">
          {hero.assurances.map((a) => (
            <li key={a}>
              <Icon name="check" size={18} /> {a}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
