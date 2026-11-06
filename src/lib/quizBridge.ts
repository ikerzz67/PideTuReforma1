import type { ReformType } from '../types/lead'
import { navigate } from './router'

/** Permite a otras secciones preseleccionar el tipo de reforma y llevar al usuario al cuestionario. */
export const PRESELECT_EVENT = 'ptr:preselect'
let pending: ReformType | null = null

export function startQuiz(type?: ReformType) {
  pending = type ?? null
  if (window.location.pathname !== '/') navigate('/#presupuesto')
  else {
    window.dispatchEvent(new Event(PRESELECT_EVENT))
    navigate('/#presupuesto')
  }
}

export function takePending(): ReformType | null {
  const p = pending
  pending = null
  return p
}
