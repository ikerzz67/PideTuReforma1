import { useEffect, useState, useSyncExternalStore } from 'react'
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react'

/**
 * Router mínimo basado en la History API (URLs limpias, sin #/).
 * Para producción el servidor debe devolver index.html en cualquier ruta
 * (ya incluido en vercel.json y public/_redirects). Ver README.
 */
const EVENT = 'ptr:navigate'

function subscribe(cb: () => void) {
  window.addEventListener('popstate', cb)
  window.addEventListener(EVENT, cb)
  return () => {
    window.removeEventListener('popstate', cb)
    window.removeEventListener(EVENT, cb)
  }
}
const snapshot = () => window.location.pathname + window.location.hash

export function useLocation() {
  const s = useSyncExternalStore(subscribe, snapshot, () => '/')
  const i = s.indexOf('#')
  return { path: i === -1 ? s : s.slice(0, i), hash: i === -1 ? '' : s.slice(i) }
}

export function navigate(to: string) {
  if (to === snapshot()) {
    window.dispatchEvent(new Event(EVENT))
    return
  }
  window.history.pushState({}, '', to)
  window.dispatchEvent(new Event(EVENT))
}

interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string
  children?: ReactNode
}

export function Link({ href, onClick, children, ...rest }: LinkProps) {
  const internal = href.startsWith('/')
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    if (!internal || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    navigate(href)
  }
  return (
    <a href={href} onClick={handle} {...rest}>
      {children}
    </a>
  )
}

/** Gestiona el scroll tras cada navegación: ancla (#id) o arriba del todo. */
export function useScrollOnNavigate() {
  const { path, hash } = useLocation()
  const [tick, setTick] = useState(0)
  // Re-ejecuta el scroll incluso si se navega a la misma ruta/ancla (p. ej. pulsar "Presupuesto gratis" estando ya en la home)
  useEffect(() => {
    const bump = () => setTick((t) => t + 1)
    window.addEventListener(EVENT, bump)
    return () => window.removeEventListener(EVENT, bump)
  }, [])
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      const t = window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
      }, 60)
      return () => window.clearTimeout(t)
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [path, hash, tick])
}
