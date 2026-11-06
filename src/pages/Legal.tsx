import { site } from '../config/site'
import { legalDocs } from '../content/legal'
import { useSeo } from '../lib/useSeo'

export default function Legal({ doc }: { doc: keyof typeof legalDocs }) {
  const d = legalDocs[doc]
  useSeo({ title: `${d.title} | PideTuReforma`, description: d.intro, path: `/${doc}`, noindex: !site.legalReviewed })
  return (
    <section className="page-head page-head--legal">
      <div className="container container--narrow legal">
        <h1 className="page-head__title">{d.title}</h1>
        {!site.legalReviewed && (
          <p className="alert alert--warn" role="note">
            Borrador pendiente de revisión legal. Los campos entre [CORCHETES] deben completarse con los datos reales antes de publicar la web.
          </p>
        )}
        <p className="section__lead">{d.intro}</p>
        {d.sections.map((s) => (
          <div key={s.h}>
            <h2>{s.h}</h2>
            {s.p.map((p) => <p key={p}>{p}</p>)}
          </div>
        ))}
      </div>
    </section>
  )
}
