/** Validadores del formulario. Devuelven un mensaje de error comprensible o '' si es válido. */

export const validatePostalCode = (v: string) => {
  const s = v.trim()
  if (!s) return 'Escribe tu código postal.'
  if (!/^\d{5}$/.test(s)) return 'El código postal tiene 5 números, por ejemplo 08901.'
  const prov = Number(s.slice(0, 2))
  if (prov < 1 || prov > 52) return 'Revisa el código postal: no parece válido.'
  return ''
}

export const validateMunicipality = (v: string) =>
  v.trim().length < 2 ? 'Indica el municipio de la vivienda.' : ''

export const validateName = (v: string) => {
  const s = v.trim()
  if (!s) return 'Escribe tu nombre.'
  if (s.length < 2) return 'El nombre es demasiado corto.'
  return ''
}

export const normalizePhone = (v: string) => v.replace(/[\s.\-()]/g, '').replace(/^(\+34|0034)/, '')

export const validatePhone = (v: string) => {
  const s = normalizePhone(v)
  if (!s) return 'Escribe tu teléfono para que puedan contactarte.'
  if (!/^[6-9]\d{8}$/.test(s)) return 'Revisa el teléfono: debe tener 9 números, por ejemplo 612 345 678.'
  return ''
}

export const validateEmail = (v: string) => {
  const s = v.trim()
  if (!s) return 'Escribe tu correo electrónico.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s)) return 'Revisa el correo: parece que falta algo (ejemplo: nombre@correo.com).'
  return ''
}
