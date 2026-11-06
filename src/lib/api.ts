import { site } from '../config/site'
import type { LeadPayload, SubmitResult } from '../types/lead'

/**
 * Envía la solicitud al backend. IMPORTANTE:
 *  - Si VITE_LEADS_ENDPOINT no está configurado NO se envía nada y se devuelve 'not_configured'
 *    (la interfaz lo comunica; jamás se simula un envío correcto).
 *  - No hay claves ni tokens aquí: la autenticación con servicios externos (email, Klaviyo,
 *    base de datos) debe vivir en el backend. Ver docs/BACKEND.md
 */
export async function submitLead(payload: LeadPayload): Promise<SubmitResult> {
  if (!site.leadsEndpoint) return { status: 'not_configured' }

  const ctrl = new AbortController()
  const timer = window.setTimeout(() => ctrl.abort(), 15000)
  try {
    const res = await fetch(site.leadsEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: ctrl.signal,
    })
    if (!res.ok) return { status: 'error', message: 'El servidor no pudo guardar tu solicitud. Inténtalo de nuevo en unos minutos.' }
    return { status: 'sent' }
  } catch {
    return { status: 'error', message: 'No hemos podido conectar. Revisa tu conexión e inténtalo de nuevo.' }
  } finally {
    window.clearTimeout(timer)
  }
}
