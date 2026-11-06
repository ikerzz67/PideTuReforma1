import { useEffect, useRef } from 'react'
import type { ElementType, ReactNode } from 'react'

/** Aparición suave al hacer scroll. Sin JS o con "reducir movimiento" el contenido se ve directamente. */
export function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className = '',
}: {
  children: ReactNode
  delay?: number
  as?: ElementType
  className?: string
}) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-visible')
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  )
}
