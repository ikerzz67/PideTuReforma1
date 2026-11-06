/**
 * BLOG. Cada artículo tiene su propia URL: /blog/<slug>
 * Para añadir un artículo, copia una entrada, cambia `slug` y edita los bloques.
 * `image` es opcional: si no se indica, se usa una ilustración (`scene`).
 *
 * IMPORTANTE: estos textos son orientativos y NO contienen cifras de precios ni normativa
 * oficial. Antes de añadir importes, plazos, ayudas o requisitos legales, compruébalos en
 * fuentes oficiales (p. ej. el Ayuntamiento de L'Hospitalet) y apunta la fecha de revisión.
 */
export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'note'; text: string }

export type PostCategory = 'Precios y presupuestos' | 'Consejos prácticos' | 'Diseño y tendencias' | 'Permisos y legalidad'

export interface Post {
  slug: string
  title: string
  excerpt: string
  category: PostCategory
  date: string // ISO
  scene: 'plan' | 'kitchen' | 'living' | 'house' | 'bath'
  image?: string
  body: Block[]
}

export const postCategories: PostCategory[] = [
  'Precios y presupuestos',
  'Consejos prácticos',
  'Diseño y tendencias',
  'Permisos y legalidad',
]

export const posts: Post[] = [
  {
    slug: 'guia-precios-2026-reformar-piso-80-m2',
    title: 'Guía de precios 2026: ¿cuánto cuesta reformar un piso de 80 m²?',
    excerpt: 'Qué factores mueven el precio de una reforma y cómo preparar una comparación de presupuestos justa.',
    category: 'Precios y presupuestos',
    date: '2026-11-05',
    scene: 'plan',
    body: [
      { type: 'p', text: 'La pregunta de cuánto cuesta reformar un piso no tiene una respuesta única: dos viviendas del mismo tamaño pueden diferir mucho según lo que se quiera cambiar y con qué calidades.' },
      { type: 'note', text: 'Esta guía no incluye cifras a propósito. Los precios cambian con el mercado y la zona; cuando los publiquemos, los habremos contrastado y llevarán fecha de revisión.' },
      { type: 'h2', text: 'Qué hace que el presupuesto suba o baje' },
      { type: 'ul', items: [
        'El alcance: reforma integral o solo algunas estancias.',
        'El estado de las instalaciones (electricidad, fontanería) y si hay que renovarlas.',
        'Las calidades elegidas en suelos, carpintería, cocina y baños.',
        'Los cambios de distribución, que implican más obra.',
        'El acceso al edificio y la existencia de ascensor.',
      ] },
      { type: 'h2', text: 'Cómo comparar presupuestos con criterio' },
      { type: 'p', text: 'Para que dos presupuestos sean comparables, conviene pedirlos sobre la misma descripción del trabajo. Un precio más bajo puede significar que falta alguna partida, no que sea mejor oferta.' },
      { type: 'ul', items: [
        'Pide que detallen partidas, materiales y marcas.',
        'Comprueba qué está incluido (retirada de escombros, licencias, limpieza).',
        'Pregunta por plazos, forma de pago y qué ocurre si hay cambios durante la obra.',
        'Guarda todo por escrito.',
      ] },
      { type: 'h2', text: 'Un consejo final' },
      { type: 'p', text: 'Define antes qué quieres y qué no, y reserva un margen para imprevistos. Así los profesionales podrán ajustar mejor su propuesta.' },
    ],
  },
  {
    slug: '5-errores-que-encarecen-una-reforma',
    title: '5 errores que pueden encarecer una reforma',
    excerpt: 'Fallos habituales al planificar una obra y cómo evitarlos antes de empezar.',
    category: 'Consejos prácticos',
    date: '2026-11-05',
    scene: 'living',
    body: [
      { type: 'p', text: 'Muchos sobrecostes no vienen de la obra en sí, sino de decisiones tomadas tarde o sin información. Estos son cinco errores frecuentes.' },
      { type: 'h2', text: '1. Empezar sin tener claro qué quieres' },
      { type: 'p', text: 'Cambiar de idea con la obra en marcha suele ser lo más caro. Dedica tiempo a decidir distribución, materiales y acabados antes de empezar.' },
      { type: 'h2', text: '2. Comparar presupuestos que no son comparables' },
      { type: 'p', text: 'Si cada profesional presupuesta cosas distintas, es imposible saber cuál conviene. Pide siempre el mismo alcance.' },
      { type: 'h2', text: '3. No prever imprevistos' },
      { type: 'p', text: 'En viviendas antiguas pueden aparecer problemas ocultos al abrir paredes o suelos. Conviene tener un margen reservado.' },
      { type: 'h2', text: '4. Dejar los acuerdos sin documentar' },
      { type: 'p', text: 'Alcance, plazos, pagos y cambios deberían quedar por escrito para evitar malentendidos.' },
      { type: 'h2', text: '5. Elegir solo por el precio más bajo' },
      { type: 'p', text: 'El precio importa, pero también la claridad del presupuesto, la comunicación y las referencias del profesional.' },
    ],
  },
  {
    slug: 'cocinas-abiertas-al-salon',
    title: 'Cocinas abiertas al salón: ventajas, distribución y presupuesto',
    excerpt: 'Qué ganas y qué debes tener en cuenta al unir la cocina con el salón.',
    category: 'Diseño y tendencias',
    date: '2026-11-05',
    scene: 'kitchen',
    body: [
      { type: 'p', text: 'Abrir la cocina al salón es una de las reformas más buscadas: da sensación de amplitud, más luz y una vivienda más social.' },
      { type: 'h2', text: 'Ventajas' },
      { type: 'ul', items: [
        'Más luz natural y espacio visual.',
        'Convivencia mientras se cocina.',
        'Posibilidad de añadir una península o una isla.',
      ] },
      { type: 'h2', text: 'Cosas que conviene valorar' },
      { type: 'ul', items: [
        'Olores y ruido: la campana y la ventilación cobran protagonismo.',
        'Si el muro que se quiere tirar es estructural o lleva instalaciones.',
        'Los acabados de la cocina quedan a la vista: forman parte de la decoración del salón.',
        'La distribución de enchufes, agua y desagües.',
      ] },
      { type: 'note', text: 'Antes de tocar una pared, consulta con un técnico competente si afecta a la estructura. Esta decisión no se debe tomar sin asesoramiento profesional.' },
      { type: 'h2', text: 'Presupuesto' },
      { type: 'p', text: 'El coste depende de lo que implique abrir el espacio (obra, instalaciones) y de las calidades de mobiliario y electrodomésticos. Pide propuestas con el mismo alcance para poder comparar.' },
    ],
  },
  {
    slug: 'permisos-de-obra-que-tramites-exige-tu-ayuntamiento',
    title: 'Permisos de obra: ¿qué trámites exige tu ayuntamiento?',
    excerpt: 'Una orientación general sobre licencias y comunicaciones previas, y por qué conviene confirmarlo con tu ayuntamiento.',
    category: 'Permisos y legalidad',
    date: '2026-11-05',
    scene: 'house',
    body: [
      { type: 'p', text: 'No todas las reformas requieren el mismo trámite. Depende del tipo de obra, de si afecta a la estructura o a elementos comunes y de la normativa de cada municipio.' },
      { type: 'note', text: 'Información general y orientativa. Los requisitos concretos los marca tu ayuntamiento y pueden cambiar: confírmalos siempre con el Ayuntamiento de L\'Hospitalet (o el de tu municipio) y con tu profesional antes de empezar.' },
      { type: 'h2', text: 'Dónde informarte' },
      { type: 'ul', items: [
        'En la web o la oficina de urbanismo de tu ayuntamiento.',
        'Con la comunidad de propietarios, si la obra afecta a elementos comunes.',
        'Con el profesional que presupueste la obra: puede indicarte qué trámites son necesarios.',
      ] },
      { type: 'h2', text: 'Preguntas útiles para tu profesional' },
      { type: 'ul', items: [
        '¿Mi obra necesita algún trámite previo?',
        '¿Quién lo gestiona y está incluido en el presupuesto?',
        '¿Hay horarios o normas de la comunidad que cumplir?',
      ] },
    ],
  },
]

export const getPost = (slug: string) => posts.find((p) => p.slug === slug)

export const readingMinutes = (post: Post) => {
  const words = post.body
    .map((b) => (b.type === 'ul' ? b.items.join(' ') : b.text))
    .join(' ')
    .split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
