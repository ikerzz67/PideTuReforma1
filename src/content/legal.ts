/**
 * TEXTOS LEGALES – BORRADOR ESTRUCTURAL, NO ASESORAMIENTO JURÍDICO.
 * Los campos entre [CORCHETES] deben completarse con los datos reales del titular
 * (denominación, NIF, domicilio, email…) y todo el texto debe ser revisado por un
 * profesional antes de publicar la web (RGPD, LOPDGDD, LSSI-CE).
 * Mientras `site.legalReviewed` sea false, se muestra un aviso de borrador en estas páginas.
 */
export interface LegalDoc {
  title: string
  intro: string
  sections: { h: string; p: string[] }[]
}

export const legalDocs: Record<'aviso-legal' | 'privacidad' | 'cookies', LegalDoc> = {
  'aviso-legal': {
    title: 'Aviso legal',
    intro: 'Información general del titular de este sitio web.',
    sections: [
      { h: 'Titular', p: ['Titular: [DENOMINACIÓN O NOMBRE COMPLETO]', 'NIF/CIF: [NIF]', 'Domicilio: [DOMICILIO]', 'Correo electrónico: [EMAIL]'] },
      { h: 'Objeto', p: ['PideTuReforma es una plataforma de intermediación que pone en contacto a particulares que necesitan una reforma con empresas y profesionales del sector. PideTuReforma no ejecuta obras, no dirige técnicamente las reformas ni garantiza su resultado.'] },
      { h: 'Responsabilidad', p: ['Los trabajos, presupuestos y condiciones se acuerdan directamente entre el particular y el profesional elegido. [COMPLETAR limitaciones de responsabilidad con asesoramiento legal.]'] },
    ],
  },
  privacidad: {
    title: 'Política de privacidad',
    intro: 'Cómo tratamos los datos que nos facilitas al solicitar una reforma.',
    sections: [
      { h: 'Responsable del tratamiento', p: ['[DENOMINACIÓN], NIF [NIF], domicilio [DOMICILIO], correo [EMAIL].'] },
      { h: 'Datos que tratamos', p: ['Los que indicas en el cuestionario: tipo de reforma, ubicación, tamaño, plazos, presupuesto orientativo, nombre, teléfono y correo electrónico.'] },
      { h: 'Finalidades y base jurídica', p: ['1) Gestionar tu solicitud y comunicarla a profesionales colaboradores que puedan contactar contigo (base: tu consentimiento y la ejecución de tu petición).', '2) Enviarte comunicaciones comerciales, solo si marcas la casilla opcional (base: tu consentimiento, que puedes retirar en cualquier momento).'] },
      { h: 'Destinatarios', p: ['Profesionales y empresas colaboradoras interesados en tu solicitud y proveedores de servicios necesarios para el funcionamiento de la plataforma. [LISTAR encargados del tratamiento: hosting, email, etc.]'] },
      { h: 'Conservación', p: ['[INDICAR plazos de conservación].'] },
      { h: 'Tus derechos', p: ['Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a [EMAIL]. También puedes reclamar ante la Agencia Española de Protección de Datos (www.aepd.es).'] },
    ],
  },
  cookies: {
    title: 'Política de cookies',
    intro: 'Información sobre el almacenamiento en tu navegador.',
    sections: [
      { h: 'Qué usamos', p: ['Esta web solo utiliza almacenamiento técnico necesario para que el cuestionario funcione (por ejemplo, recordar tus respuestas mientras la pestaña está abierta). No usamos cookies de analítica ni de publicidad.'] },
      { h: 'Cambios', p: ['Si en el futuro se añaden herramientas de analítica o marketing, se actualizará esta política y se solicitará tu consentimiento previo. [REVISAR con asesoramiento legal.]'] },
    ],
  },
}
