import { budgetOptions, consentTexts, sizeQuestion, timingOptions } from '../../content/quiz'
import type { Budget, LeadPayload, ReformType, Timing } from '../../types/lead'

export interface Answers {
  reformType: ReformType | null
  postalCode: string
  municipality: string
  address: string
  size: string | null
  notes: string
  timing: Timing | null
  budget: Budget | null
  name: string
  phone: string
  email: string
  privacy: boolean
  marketing: boolean
}

export const emptyAnswers: Answers = {
  reformType: null,
  postalCode: '',
  municipality: '',
  address: '',
  size: null,
  notes: '',
  timing: null,
  budget: null,
  name: '',
  phone: '',
  email: '',
  privacy: false, // NUNCA premarcado
  marketing: false, // NUNCA premarcado
}

export const TOTAL_STEPS = 6

const KEY = 'ptr:quiz:v1'

/** Solo se guarda en sessionStorage lo NO personal (el progreso). Nombre, teléfono, email y
 *  consentimientos nunca se guardan en el navegador. */
export function loadSaved(): { step: number; answers: Answers } | null {
  try {
    const raw = sessionStorage.getItem(KEY)
    if (!raw) return null
    const s = JSON.parse(raw) as { step: number; answers: Partial<Answers> }
    return { step: Math.min(Math.max(s.step || 1, 1), TOTAL_STEPS), answers: { ...emptyAnswers, ...s.answers } }
  } catch {
    return null
  }
}

export function save(step: number, a: Answers) {
  try {
    const { name: _n, phone: _p, email: _e, privacy: _pr, marketing: _m, ...safe } = a
    void _n; void _p; void _e; void _pr; void _m
    sessionStorage.setItem(KEY, JSON.stringify({ step, answers: safe }))
  } catch {
    /* almacenamiento no disponible: se ignora */
  }
}

export function clearSaved() {
  try {
    sessionStorage.removeItem(KEY)
  } catch {
    /* noop */
  }
}

export function sizeLabelFor(a: Answers): string {
  if (!a.reformType || !a.size) return ''
  const o = sizeQuestion[a.reformType].options.find((x) => x.value === a.size)
  if (!o) return ''
  return o.hint ? `${o.label} (${o.hint})` : o.label
}

export const timingLabel = (t: Timing | null) => timingOptions.find((o) => o.value === t)?.label ?? ''
export const budgetLabel = (b: Budget | null) => budgetOptions.find((o) => o.value === b)?.label ?? ''

const uuid = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`

export function buildPayload(a: Answers, honeypot: string): LeadPayload {
  const now = new Date().toISOString()
  return {
    reformType: a.reformType as ReformType,
    location: {
      postalCode: a.postalCode.trim(),
      municipality: a.municipality.trim(),
      ...(a.address.trim() ? { address: a.address.trim() } : {}),
    },
    size: a.size as string,
    sizeLabel: sizeLabelFor(a),
    ...(a.notes.trim() ? { notes: a.notes.trim() } : {}),
    timing: a.timing as Timing,
    budget: a.budget as Budget,
    contact: { name: a.name.trim(), phone: a.phone.trim(), email: a.email.trim() },
    consents: {
      privacy: { accepted: a.privacy, textVersion: consentTexts.version, text: consentTexts.privacy, acceptedAt: a.privacy ? now : null },
      marketing: { accepted: a.marketing, textVersion: consentTexts.version, text: consentTexts.marketing, acceptedAt: a.marketing ? now : null },
    },
    meta: { source: 'web-quiz', pageUrl: window.location.href, submittedAt: now, clientRequestId: uuid() },
    website: honeypot,
  }
}
