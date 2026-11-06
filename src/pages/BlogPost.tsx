import { Icon } from '../components/Icons'
import { Illustration } from '../components/Illustration'
import { PostCard } from '../components/PostCard'
import { formatDate, getPost, posts, readingMinutes } from '../content/posts'
import { site } from '../config/site'
import { startQuiz } from '../lib/quizBridge'
import { Link } from '../lib/router'
import { useSeo } from '../lib/useSeo'
import NotFound from './NotFound'

export default function BlogPost({ slug }: { slug: string }) {
  const post = getPost(slug)
  useSeo(
    post
      ? {
          title: `${post.title} | PideTuReforma`,
          description: post.excerpt,
          path: `/blog/${post.slug}`,
          type: 'article',
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            publisher: { '@type': 'Organization', name: site.name },
          },
        }
      : { title: 'Artículo no encontrado | PideTuReforma', description: 'Este artículo no existe.', path: `/blog/${slug}`, noindex: true },
  )
  if (!post) return <NotFound />
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 2)

  return (
    <>
      <article className="article">
        <header className="article__head container container--narrow">
          <Link href="/blog" className="back-link"><Icon name="arrowLeft" size={16} /> Volver al blog</Link>
          <p className="eyebrow">{post.category}</p>
          <h1 className="article__title">{post.title}</h1>
          <p className="article__meta">{formatDate(post.date)} · {readingMinutes(post)} min de lectura</p>
        </header>
        <div className="container article__hero">
          {post.image ? <img src={post.image} alt="" /> : <Illustration scene={post.scene} />}
        </div>
        <div className="container container--narrow article__body">
          {post.body.map((b, i) => {
            switch (b.type) {
              case 'h2': return <h2 key={i}>{b.text}</h2>
              case 'ul': return <ul key={i}>{b.items.map((it) => <li key={it}>{it}</li>)}</ul>
              case 'note': return <aside key={i} className="note"><Icon name="info" size={20} /><p>{b.text}</p></aside>
              default: return <p key={i}>{b.text}</p>
            }
          })}
          <aside className="article__cta">
            <h2>¿Tienes una reforma en mente?</h2>
            <p>Cuéntanos tu proyecto y buscamos profesionales que puedan ayudarte. Es gratis y sin compromiso.</p>
            <Link href="/#presupuesto" className="btn btn--primary" onClick={() => startQuiz()}>Pedir presupuesto gratis <Icon name="arrow" size={18} /></Link>
          </aside>
        </div>
      </article>
      <section className="section section--alt">
        <div className="container">
          <h2 className="section__title section__title--sm">Sigue leyendo</h2>
          <div className="posts posts--two">
            {related.map((p) => <PostCard key={p.slug} post={p} />)}
          </div>
        </div>
      </section>
    </>
  )
}
