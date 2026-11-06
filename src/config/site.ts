/**
 * Configuración central del sitio. Los datos de contacto y legales NO están inventados:
 * se leen de variables de entorno (.env) y, si no existen, simplemente no se muestran.
 */
export const site = {
  name: 'PideTuReforma',
  tagline: 'Encuentra profesionales para tu reforma',
  area: "L'Hospitalet de Llobregat y alrededores",
  url: (import.meta.env.VITE_SITE_URL ?? '').replace(/\/$/, ''),
  contact: {
    email: import.meta.env.VITE_CONTACT_EMAIL ?? '',
    phone: import.meta.env.VITE_CONTACT_PHONE ?? '',
  },
  /** Endpoint de TU backend. Vacío = el formulario no envía nada (y lo dice). */
  leadsEndpoint: import.meta.env.VITE_LEADS_ENDPOINT ?? '',
  /** Opiniones/contenido de ejemplo: solo visibles en desarrollo, o si VITE_SHOW_DEMO_CONTENT=true */
  showDemoContent: import.meta.env.DEV || import.meta.env.VITE_SHOW_DEMO_CONTENT === 'true',
  /** Cambia a true cuando un abogado haya revisado los textos legales de src/content/legal.ts */
  legalReviewed: false,
}

export const nav = [
  { label: 'Cómo funciona', href: '/#como-funciona' },
  { label: 'Ventajas', href: '/#ventajas' },
  { label: 'Opiniones', href: '/#opiniones' },
  { label: 'Quiénes somos', href: '/#quienes-somos' },
  { label: 'Preguntas', href: '/#preguntas' },
  { label: 'Blog', href: '/blog' },
]

export const legalLinks = [
  { label: 'Aviso legal', href: '/aviso-legal' },
  { label: 'Política de privacidad', href: '/privacidad' },
  { label: 'Política de cookies', href: '/cookies' },
]
