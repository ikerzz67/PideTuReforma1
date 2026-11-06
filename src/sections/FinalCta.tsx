import { finalCta } from '../content/home'
import { Icon } from '../components/Icons'
import { startQuiz } from '../lib/quizBridge'
import { Link } from '../lib/router'
import { Reveal } from '../lib/useReveal'

export function FinalCta() {
  return (
    <section className="section cta-section">
      <div className="container">
        <Reveal className="cta">
          <h2>{finalCta.title}</h2>
          <p>{finalCta.text}</p>
          <Link href="/#presupuesto" className="btn btn--white btn--lg" onClick={() => startQuiz()}>
            {finalCta.button} <Icon name="arrow" size={18} />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
