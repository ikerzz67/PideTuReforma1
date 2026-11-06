import type { Budget, ReformType, Timing } from '../types/lead'

export interface Option<T extends string = string> {
  value: T
  label: string
  hint?: string
}

export const reformOptions: (Option<ReformType> & { icon: string })[] = [
  { value: 'bano', label: 'Baño', hint: 'Renovar o cambiar el baño', icon: 'bath' },
  { value: 'cocina', label: 'Cocina', hint: 'Cocina nueva o actualizada', icon: 'kitchen' },
  { value: 'piso', label: 'Piso completo', hint: 'Reforma de todo el piso', icon: 'building' },
  { value: 'casa', label: 'Casa completa', hint: 'Vivienda unifamiliar o casa', icon: 'house' },
  { value: 'parcial', label: 'Reforma parcial', hint: 'Una o varias estancias', icon: 'rooms' },
  { value: 'otro', label: 'Otro tipo de reforma', hint: 'Cuéntanos qué necesitas', icon: 'wrench' },
]

/** Opciones de tamaño adaptadas al tipo de reforma (paso 3) */
export const sizeQuestion: Record<ReformType, { title: string; subtitle: string; options: Option[] }> = {
  bano: {
    title: '¿Qué tamaño tiene el baño?',
    subtitle: 'Con un dato aproximado nos basta.',
    options: [
      { value: 'bano:lt4', label: 'Pequeño', hint: 'Menos de 4 m²' },
      { value: 'bano:4-6', label: 'Mediano', hint: 'Entre 4 y 6 m²' },
      { value: 'bano:gt6', label: 'Grande', hint: 'Más de 6 m²' },
      { value: 'bano:varios', label: 'Más de un baño', hint: 'Dos o más baños' },
      { value: 'unknown', label: 'No lo sé', hint: 'Lo concretaremos después' },
    ],
  },
  cocina: {
    title: '¿Qué tamaño tiene la cocina?',
    subtitle: 'Con un dato aproximado nos basta.',
    options: [
      { value: 'cocina:lt8', label: 'Pequeña', hint: 'Menos de 8 m²' },
      { value: 'cocina:8-12', label: 'Mediana', hint: 'Entre 8 y 12 m²' },
      { value: 'cocina:gt12', label: 'Grande', hint: 'Más de 12 m²' },
      { value: 'cocina:abierta', label: 'Cocina abierta al salón', hint: 'Integrada con otra estancia' },
      { value: 'unknown', label: 'No lo sé', hint: 'Lo concretaremos después' },
    ],
  },
  piso: {
    title: '¿Cuántos metros tiene el piso?',
    subtitle: 'Un tamaño aproximado es suficiente.',
    options: [
      { value: 'piso:lt50', label: 'Menos de 50 m²' },
      { value: 'piso:50-80', label: 'Entre 50 y 80 m²' },
      { value: 'piso:80-120', label: 'Entre 80 y 120 m²' },
      { value: 'piso:gt120', label: 'Más de 120 m²' },
      { value: 'unknown', label: 'No lo sé', hint: 'Lo concretaremos después' },
    ],
  },
  casa: {
    title: '¿Cuántos metros tiene la casa?',
    subtitle: 'Un tamaño aproximado es suficiente.',
    options: [
      { value: 'casa:lt120', label: 'Menos de 120 m²' },
      { value: 'casa:120-200', label: 'Entre 120 y 200 m²' },
      { value: 'casa:200-300', label: 'Entre 200 y 300 m²' },
      { value: 'casa:gt300', label: 'Más de 300 m²' },
      { value: 'unknown', label: 'No lo sé', hint: 'Lo concretaremos después' },
    ],
  },
  parcial: {
    title: '¿Cuántas estancias quieres reformar?',
    subtitle: 'Cuenta baños, cocina, salón, dormitorios…',
    options: [
      { value: 'parcial:1', label: 'Una estancia' },
      { value: 'parcial:2', label: 'Dos estancias' },
      { value: 'parcial:3', label: 'Tres estancias' },
      { value: 'parcial:4+', label: 'Cuatro o más' },
      { value: 'unknown', label: 'No lo sé', hint: 'Lo concretaremos después' },
    ],
  },
  otro: {
    title: '¿De qué tamaño es el trabajo?',
    subtitle: 'Elige lo que más se acerque y, si quieres, cuéntanos más.',
    options: [
      { value: 'otro:pequeno', label: 'Pequeño', hint: 'Un arreglo puntual' },
      { value: 'otro:mediano', label: 'Mediano', hint: 'Una zona de la vivienda' },
      { value: 'otro:grande', label: 'Grande', hint: 'Afecta a buena parte de la vivienda' },
      { value: 'unknown', label: 'No lo sé', hint: 'Lo concretaremos después' },
    ],
  },
}

export const timingOptions: Option<Timing>[] = [
  { value: 'asap', label: 'Lo antes posible' },
  { value: '1-3m', label: 'En 1-3 meses' },
  { value: '3-6m', label: 'En 3-6 meses' },
  { value: 'info', label: 'Estoy buscando información', hint: 'Sin prisa, solo mirando opciones' },
]

export const budgetOptions: Option<Budget>[] = [
  { value: 'lt3k', label: 'Menos de 3.000 €' },
  { value: '3-6k', label: '3.000 – 6.000 €' },
  { value: '6-12k', label: '6.000 – 12.000 €' },
  { value: '12-25k', label: '12.000 – 25.000 €' },
  { value: '25-50k', label: '25.000 – 50.000 €' },
  { value: 'gt50k', label: 'Más de 50.000 €' },
  { value: 'unknown', label: 'Todavía no lo sé', hint: 'Sin problema, se puede definir después' },
]

/** Municipios sugeridos (el campo admite cualquier texto) */
export const municipalitySuggestions = [
  "L'Hospitalet de Llobregat",
  'Barcelona',
  'Cornellà de Llobregat',
  'Esplugues de Llobregat',
  'El Prat de Llobregat',
  'Sant Feliu de Llobregat',
  'Sant Joan Despí',
  'Sant Just Desvern',
  'Molins de Rei',
  'Santa Coloma de Gramenet',
  'Badalona',
]

/** Textos legales del formulario. Súbele la versión cuando cambien. */
export const consentTexts = {
  version: '2026-11-draft-1',
  privacy:
    'He leído la política de privacidad y acepto que PideTuReforma trate mis datos para gestionar mi solicitud y los comunique a profesionales de reformas colaboradores para que puedan contactar conmigo.',
  marketing:
    'Quiero recibir novedades, consejos y ofertas de PideTuReforma por correo electrónico o teléfono (opcional; puedes darte de baja cuando quieras).',
}
