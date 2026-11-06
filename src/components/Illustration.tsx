import type { ReactElement } from 'react'
/**
 * Ilustraciones de línea (SVG) que sirven de imagen provisional.
 * Son conceptos gráficos, NO fotografías de proyectos reales.
 * Para usar fotografías propias, pasa `image` en el contenido (ver src/content/posts.ts)
 * y colócalas en /public/images/.
 */
export type Scene = 'kitchen' | 'bath' | 'living' | 'plan' | 'house'

const B = '#0158FD'
const D = '#101828'
const G = '#D0D5DD'

function Kitchen() {
  return (
    <g fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="40" y="40" width="320" height="70" rx="4" stroke={D} />
      <path d="M120 40v70M200 40v70M280 40v70" stroke={G} />
      <rect x="40" y="170" width="320" height="26" rx="3" stroke={D} />
      <path d="M40 196v64M360 196v64M120 196v64" stroke={G} />
      <rect x="110" y="146" width="180" height="24" rx="3" stroke={B} />
      <path d="M170 146v-12h60v12" stroke={B} />
      <path d="M150 120v-26M250 120v-26" stroke={B} />
      <circle cx="150" cy="128" r="6" stroke={B} />
      <circle cx="250" cy="128" r="6" stroke={B} />
    </g>
  )
}
function Bath() {
  return (
    <g fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="40" y="40" width="130" height="220" rx="3" stroke={D} />
      <path d="M40 100h130M40 160h130M40 220h130M105 40v220" stroke={G} />
      <path d="M215 150h150v28a28 28 0 0 1-28 28h-94a28 28 0 0 1-28-28v-28Z" stroke={B} />
      <path d="M232 150v-70a14 14 0 0 1 14-14h8" stroke={B} />
      <path d="M215 255h150" stroke={D} />
      <circle cx="300" cy="105" r="22" stroke={D} />
      <path d="M278 105h44" stroke={G} />
    </g>
  )
}
function Living() {
  return (
    <g fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M40 240h320" stroke={D} />
      <rect x="60" y="170" width="190" height="54" rx="8" stroke={B} />
      <rect x="52" y="190" width="24" height="46" rx="8" stroke={B} />
      <rect x="234" y="190" width="24" height="46" rx="8" stroke={B} />
      <path d="M90 240v10M220 240v10" stroke={B} />
      <rect x="290" y="60" width="70" height="150" rx="2" stroke={D} />
      <path d="M290 110h70M290 160h70" stroke={G} />
      <path d="M130 40v90" stroke={D} />
      <path d="M100 130a30 18 0 0 1 60 0Z" stroke={B} />
    </g>
  )
}
function Plan() {
  return (
    <g fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="40" y="40" width="320" height="220" stroke={D} />
      <path d="M40 150h150M190 40v110M190 150v110M190 190h170" stroke={D} />
      <path d="M300 40v0" stroke={D} />
      <path d="M120 150a22 22 0 0 0 22-22" stroke={B} />
      <path d="M190 215a20 20 0 0 1 20-20" stroke={B} />
      <path d="M270 40h40" stroke={B} strokeWidth="6" />
      <path d="M70 260h40" stroke={B} strokeWidth="6" />
      <rect x="64" y="64" width="46" height="26" rx="2" stroke={G} />
      <rect x="220" y="70" width="90" height="50" rx="2" stroke={G} />
    </g>
  )
}
function House() {
  return (
    <g fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M50 140 200 52l150 88" stroke={B} />
      <path d="M80 126v134h240V126" stroke={D} />
      <rect x="175" y="180" width="50" height="80" rx="2" stroke={B} />
      <rect x="105" y="160" width="46" height="46" rx="2" stroke={G} />
      <rect x="250" y="160" width="46" height="46" rx="2" stroke={G} />
      <path d="M40 260h320" stroke={D} />
    </g>
  )
}

const scenes: Record<Scene, () => ReactElement> = { kitchen: Kitchen, bath: Bath, living: Living, plan: Plan, house: House }

export function Illustration({ scene, className = '', label }: { scene: Scene; className?: string; label?: string }) {
  const S = scenes[scene]
  return (
    <svg
      viewBox="0 0 400 300"
      className={`illustration ${className}`}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="400" height="300" fill="#F5F7FA" />
      <path d="M0 0h400v300H0z" fill="none" />
      <S />
    </svg>
  )
}
