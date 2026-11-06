import { formatDate, readingMinutes } from '../content/posts'
import type { Post } from '../content/posts'
import { Link } from '../lib/router'
import { Icon } from './Icons'
import { Illustration } from './Illustration'

export function PostCard({ post }: { post: Post }) {
  const href = `/blog/${post.slug}`
  return (
    <article className="post-card">
      <Link href={href} className="post-card__media" tabIndex={-1} aria-hidden="true">
        {post.image ? <img src={post.image} alt="" loading="lazy" /> : <Illustration scene={post.scene} />}
      </Link>
      <div className="post-card__body">
        <p className="post-card__cat">{post.category}</p>
        <h3 className="post-card__title">
          <Link href={href}>{post.title}</Link>
        </h3>
        <p className="post-card__excerpt">{post.excerpt}</p>
        <p className="post-card__meta">
          {formatDate(post.date)} · {readingMinutes(post)} min de lectura
        </p>
        <Link href={href} className="post-card__link">
          Leer artículo <Icon name="arrow" size={16} />
        </Link>
      </div>
    </article>
  )
}
