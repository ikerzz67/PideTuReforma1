import type { ReactNode } from 'react'

/** Iconos de línea (24x24). Trazo uniforme, sobrios. */
const paths: Record<string, ReactNode> = {
  bath: (<><path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3Z" /><path d="M6 12V6a2 2 0 0 1 2-2h1" /><path d="M7 19l-1 2M17 19l1 2" /></>),
  kitchen: (<><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M4 9h16" /><circle cx="9" cy="6" r=".6" /><circle cx="12" cy="6" r=".6" /><rect x="8" y="12" width="8" height="6" rx="1" /></>),
  building: (<><path d="M5 21V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16" /><path d="M15 10h3a1 1 0 0 1 1 1v10" /><path d="M3 21h18" /><path d="M9 8h2M9 12h2M9 16h2" /></>),
  house: (<><path d="M3 11.5 12 4l9 7.5" /><path d="M5.5 10v10h13V10" /><path d="M10 20v-5h4v5" /></>),
  rooms: (<><rect x="3.5" y="4" width="17" height="16" rx="1.5" /><path d="M3.5 12H11V4M11 12v8M15 12h5.5" /></>),
  wrench: (<><path d="M14.5 6.5a4 4 0 0 0-5.2 5.2L4 17l3 3 5.3-5.3a4 4 0 0 0 5.2-5.2l-2.6 2.6-2.3-.5-.5-2.3 2.6-2.6Z" /></>),
  clock: (<><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>),
  layers: (<><path d="m12 4 8.5 4.5L12 13 3.5 8.5 12 4Z" /><path d="m3.5 12.5 8.5 4.5 8.5-4.5" /><path d="m3.5 16.5 8.5 4 8.5-4" /></>),
  pin: (<><path d="M12 21s6.5-5.6 6.5-11a6.5 6.5 0 0 0-13 0C5.5 15.4 12 21 12 21Z" /><circle cx="12" cy="10" r="2.3" /></>),
  check: (<><circle cx="12" cy="12" r="8.5" /><path d="m8.5 12.3 2.4 2.4 4.6-4.9" /></>),
  arrow: (<><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>),
  arrowLeft: (<><path d="M19 12H5" /><path d="m11 6-6 6 6 6" /></>),
  menu: (<><path d="M4 7h16M4 12h16M4 17h16" /></>),
  close: (<><path d="M6 6l12 12M18 6 6 18" /></>),
  plus: (<><path d="M12 5v14M5 12h14" /></>),
  lock: (<><rect x="5" y="10.5" width="14" height="9.5" rx="2" /><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" /></>),
  mail: (<><rect x="3.5" y="5.5" width="17" height="13" rx="2" /><path d="m4 7.5 8 6 8-6" /></>),
  phone: (<><path d="M6.5 4h3l1.5 4-2 1.3a10 10 0 0 0 5.7 5.7L16 13l4 1.5v3a2 2 0 0 1-2 2A14 14 0 0 1 4.5 6a2 2 0 0 1 2-2Z" /></>),
  info: (<><circle cx="12" cy="12" r="8.5" /><path d="M12 11v5M12 8v.01" /></>),
}

export type IconName = keyof typeof paths

export function Icon({ name, size = 24, className = '' }: { name: string; size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {paths[name] ?? null}
    </svg>
  )
}

export function Star({ filled }: { filled: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" className={filled ? 'star star--on' : 'star'}>
      <path
        d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.9 6.8 19.7l1-5.9L3.5 9.7l5.9-.8L12 3.5Z"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  )
}
