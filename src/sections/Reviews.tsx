import { Star } from '../components/Icons'
import { site } from '../config/site'
import { reviews } from '../content/reviews'
import { Reveal } from '../lib/useReveal'

/**
 * Solo se muestran reseñas reales. Las de ejemplo (demo) aparecen únicamente en desarrollo
 * o con VITE_SHOW_DEMO_CONTENT=true y siempre con la etiqueta "Ejemplo".
 */
export function Reviews() {
  const visible = reviews.filter((r) => !r.demo || site.showDemoContent)
  const hasDemo = visible.some((r) => r.demo)

  return (
    <section id="opiniones" className="section">
      <div className="container">
        <Reveal className="section__head">
          <p className="eyebrow">Opiniones</p>
          <h2 className="section__title">Opiniones de L'Hospitalet y alrededores</h2>
          <p className="section__lead">Lo importante es encontrar a los profesionales adecuados.</p>
        </Reveal>

        {visible.length === 0 ? (
          <Reveal className="empty-reviews">
            <p className="empty-reviews__title">Estamos empezando</p>
            <p>
              Todavía no hemos publicado opiniones. Cuando los primeros clientes de la zona nos cuenten su experiencia (y nos autoricen a compartirla), aparecerán aquí.
            </p>
          </Reveal>
        ) : (
          <>
            {hasDemo && (
              <p className="demo-banner" role="note">
                Contenido de ejemplo para visualizar el diseño. No son opiniones reales y no se muestran en la web publicada.
              </p>
            )}
            <div className="reviews">
              {visible.map((r, i) => (
                <Reveal as="figure" key={r.id} className="review" delay={i * 80}>
                  {r.demo && <span className="review__demo">Ejemplo</span>}
                  {r.rating ? (
                    <div className="review__stars" role="img" aria-label={`${r.rating} de 5 estrellas`}>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <Star key={n} filled={n <= (r.rating ?? 0)} />
                      ))}
                    </div>
                  ) : null}
                  <blockquote className="review__text">{r.text}</blockquote>
                  <figcaption className="review__meta">
                    <span className="review__avatar" aria-hidden="true">
                      {r.author.charAt(0)}
                    </span>
                    <span>
                      <strong>{r.author}</strong>
                      <span className="review__sub">
                        {r.area} · {r.reformType}
                        {r.date ? ` · ${new Date(r.date).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}` : ''}
                      </span>
                    </span>
                  </figcaption>
                </Reveal>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
