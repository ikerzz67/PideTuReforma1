/** Contrato de datos entre el formulario y el backend. Ver docs/BACKEND.md */

export type ReformType = 'bano' | 'cocina' | 'piso' | 'casa' | 'parcial' | 'otro'

export type Timing = 'asap' | '1-3m' | '3-6m' | 'info'

export type Budget = 'lt3k' | '3-6k' | '6-12k' | '12-25k' | '25-50k' | 'gt50k' | 'unknown'

export interface LeadConsent {
  accepted: boolean
  /** Versión del texto mostrado (para poder demostrar qué aceptó el usuario) */
  textVersion: string
  /** Texto literal que se mostró junto a la casilla */
  text: string
  acceptedAt: string | null
}

export interface LeadPayload {
  reformType: ReformType
  location: { postalCode: string; municipality: string; address?: string }
  /** Código de tamaño dependiente del tipo de reforma, p. ej. "piso:50-80" */
  size: string
  sizeLabel: string
  notes?: string
  timing: Timing
  budget: Budget
  contact: { name: string; phone: string; email: string }
  consents: { privacy: LeadConsent; marketing: LeadConsent }
  meta: { source: 'web-quiz'; pageUrl: string; submittedAt: string; clientRequestId: string }
  /** Campo trampa anti-spam: debe llegar siempre vacío */
  website: string
}

/** Estados de seguimiento (panel de administración futuro) */
export type LeadStatus = 'nuevo' | 'pendiente' | 'contactado' | 'en_negociacion' | 'cerrado' | 'perdido'

export const leadStatusLabels: Record<LeadStatus, string> = {
  nuevo: 'Nuevo',
  pendiente: 'Pendiente',
  contactado: 'Contactado',
  en_negociacion: 'En negociación',
  cerrado: 'Cerrado',
  perdido: 'Perdido',
}

/** Forma de un registro guardado por el backend (referencia para el futuro panel) */
export interface StoredLead extends LeadPayload {
  id: string
  status: LeadStatus
  createdAt: string
}

export type SubmitResult =
  | { status: 'sent' }
  | { status: 'not_configured' }
  | { status: 'error'; message: string }
