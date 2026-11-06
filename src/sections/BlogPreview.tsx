import { PostCard } from '../components/PostCard'
import { posts } from '../content/posts'
import { Link } from '../lib/router'
import { Reveal } from '../lib/useReveal'

export function BlogPreview() {
  return (
    <section id="blog" className="section section--alt">
      <div className="container">
        <Reveal className="section__head section__head--row">
          <div>
            <p className="eyebrow">Blog</p>
            <h2 className="section__title">Todo lo que necesitas saber antes de reformar</h2>
            <p className="section__lead">Consejos, ideas y guías para tomar mejores decisiones antes de empezar tu reforma.</p>
          </div>
          <Link href="/blog" className="btn btn--ghost">Ver todos los artículos</Link>
        </Reveal>
        <div className="posts">
          {posts.slice(0, 4).map((p, i) => (
            <Reveal key={p.slug} delay={i * 70}>
              <PostCard post={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
