import { useState } from 'react'
import { PostCard } from '../components/PostCard'
import { postCategories, posts } from '../content/posts'
import type { PostCategory } from '../content/posts'
import { useSeo } from '../lib/useSeo'
import { Reveal } from '../lib/useReveal'
import { FinalCta } from '../sections/FinalCta'

export default function BlogIndex() {
  const [cat, setCat] = useState<PostCategory | 'all'>('all')
  useSeo({
    title: 'Blog de reformas | PideTuReforma',
    description: 'Consejos, ideas y guías para tomar mejores decisiones antes de empezar tu reforma.',
    path: '/blog',
  })
  const list = cat === 'all' ? posts : posts.filter((p) => p.category === cat)
  return (
    <>
      <section className="page-head">
        <div className="container">
          <p className="eyebrow">Blog</p>
          <h1 className="page-head__title">Todo lo que necesitas saber antes de reformar</h1>
          <p className="section__lead">Consejos, ideas y guías para tomar mejores decisiones antes de empezar tu reforma.</p>
          <div className="chips" role="group" aria-label="Filtrar por categoría">
            {(['all', ...postCategories] as const).map((c) => (
              <button key={c} type="button" className={`chip${cat === c ? ' is-on' : ''}`} aria-pressed={cat === c} onClick={() => setCat(c)}>
                {c === 'all' ? 'Todos' : c}
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--tight">
        <div className="container">
          {list.length ? (
            <div className="posts">
              {list.map((p, i) => (
                <Reveal key={p.slug} delay={i * 60}>
                  <PostCard post={p} />
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="section__lead">Aún no hay artículos en esta categoría.</p>
          )}
        </div>
      </section>
      <FinalCta />
    </>
  )
}
