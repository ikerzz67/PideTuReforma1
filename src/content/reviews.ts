/**
 * OPINIONES
 * -----------------------------------------------------------------------------
 * Las entradas con `demo: true` son TEXTOS DE EJEMPLO para visualizar el diseño.
 * No son clientes reales. Solo se muestran en desarrollo (npm run dev) o si
 * VITE_SHOW_DEMO_CONTENT=true, y siempre con la etiqueta "Ejemplo".
 *
 * Para publicar opiniones auténticas: añade entradas SIN `demo` (o con demo: false),
 * con autorización del cliente para publicarlas, y borra las de ejemplo.
 */
export interface Review {
  id: string
  /** Nombre de pila o iniciales */
  author: string
  /** Barrio o zona */
  area: string
  reformType: string
  /** 1-5. Omitir si no hay valoración */
  rating?: number
  text: string
  /** Fecha ISO de la opinión (obligatoria en reseñas reales) */
  date?: string
  demo?: boolean
}

export const reviews: Review[] = [
  {
    id: 'demo-1',
    author: 'M. G.',
    area: 'Bellvitge',
    reformType: 'Baño',
    rating: 5,
    text: 'Texto de ejemplo: lo que más agradecí fue no tener que ir llamando a empresas una por una.',
    demo: true,
  },
  {
    id: 'demo-2',
    author: 'Laura',
    area: 'Centre',
    reformType: 'Cocina',
    rating: 4,
    text: 'Texto de ejemplo: me contactaron varios profesionales y pude comparar con calma antes de decidir.',
    demo: true,
  },
  {
    id: 'demo-3',
    author: 'J. R.',
    area: 'Santa Eulàlia',
    reformType: 'Piso completo',
    text: 'Texto de ejemplo: el cuestionario fue rápido y no me pidieron nada más de lo necesario.',
    demo: true,
  },
  {
    id: 'demo-4',
    author: 'Carmen',
    area: 'Collblanc',
    reformType: 'Reforma parcial',
    rating: 5,
    text: 'Texto de ejemplo: me explicaron desde el principio que ellos solo ponen en contacto, y eso me dio confianza.',
    demo: true,
  },
]
