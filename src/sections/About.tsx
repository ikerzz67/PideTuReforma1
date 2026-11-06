import { about } from '../content/home'
import { Reveal } from '../lib/useReveal'

export function About() {
  return (
    <section id="quienes-somos" className="section section--dark">
      <div className="container about">
        <Reveal className="about__main">
          <p className="eyebrow eyebrow--light">{about.eyebrow}</p>
          <h2 className="section__title">{about.title}</h2>
          {about.paragraphs.map((p) => (
            <p key={p} className="about__p">{p}</p>
          ))}
          <p className="about__closing">{about.closing}</p>
        </Reveal>
        <div className="about__values">
          {about.values.map((v, i) => (
            <Reveal key={v.title} className="value" delay={i * 80}>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </Reveal>
          ))}
        </div>
        <p className="about__disclosure">{about.disclosure}</p>
      </div>
    </section>
  )
}
