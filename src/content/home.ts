/** Contenidos de la home. Edita aquí los textos sin tocar los componentes. */

export const hero = {
  title: 'Cuéntanos qué reforma tienes en mente',
  subtitle: "Te ayudamos a encontrar profesionales para tu reforma en L'Hospitalet y alrededores",
  assurances: ['Gratis para ti', 'Sin compromiso', 'No hace falta registrarse'],
}

export const howItWorks = {
  eyebrow: 'Cómo funciona',
  title: 'Tu reforma, con menos complicaciones',
  subtitle: 'Un proceso sencillo para ayudarte a encontrar profesionales adecuados para tu proyecto.',
  steps: [
    {
      title: 'Cuéntanos tu proyecto',
      text: 'Rellena el cuestionario: qué quieres reformar, dónde está la vivienda y qué estás buscando. Son un par de minutos.',
    },
    {
      title: 'Revisamos tu solicitud',
      text: 'Analizamos la información para entender el proyecto y localizar profesionales que puedan estar interesados.',
    },
    {
      title: 'Buscamos profesionales',
      text: 'Identificamos empresas y autónomos de nuestra red que puedan realizar el trabajo que necesitas.',
    },
    {
      title: 'Conectamos contigo',
      text: 'Los profesionales interesados pueden ponerse en contacto contigo para conocer mejor el proyecto y preparar sus propuestas.',
    },
    {
      title: 'Compara y decide',
      text: 'Valora las opciones que recibas y decide libremente con qué profesional quieres continuar, o con ninguno.',
    },
  ],
  note: 'PideTuReforma es una plataforma de intermediación: no ejecuta las obras. El trabajo y el presupuesto los acuerdas directamente con el profesional que elijas.',
}

export const benefits = {
  eyebrow: 'Ventajas',
  title: 'Una forma más sencilla de encontrar profesionales',
  items: [
    {
      icon: 'clock',
      title: 'Ahorra tiempo',
      text: 'Una sola solicitud en lugar de llamar y buscar empresa por empresa.',
    },
    {
      icon: 'layers',
      title: 'Compara propuestas',
      text: 'Puedes recibir contacto de distintos profesionales y comparar sus opciones.',
    },
    {
      icon: 'pin',
      title: 'Profesionales de tu zona',
      text: "Buscamos en L'Hospitalet y alrededores, para que estén cerca de tu vivienda.",
    },
    {
      icon: 'check',
      title: 'Gratis y sin compromiso',
      text: 'Enviar tu solicitud no te cuesta nada y decides tú, con total libertad.',
    },
  ],
}

export const reformTypes = {
  eyebrow: 'Tipos de reforma',
  title: 'Te ayudamos a encontrar profesionales para…',
  subtitle: 'Elige uno y empezamos: el cuestionario se rellena con tu elección.',
  items: [
    { type: 'bano', icon: 'bath', title: 'Baños', text: 'Reformas de baño completas o parciales.', scene: 'bath' },
    { type: 'cocina', icon: 'kitchen', title: 'Cocinas', text: 'Cocinas nuevas, abiertas o actualizadas.', scene: 'kitchen' },
    { type: 'piso', icon: 'building', title: 'Pisos completos', text: 'Reformas integrales de toda la vivienda.', scene: 'plan' },
    { type: 'casa', icon: 'house', title: 'Casas', text: 'Viviendas unifamiliares y casas.', scene: 'house' },
    { type: 'parcial', icon: 'rooms', title: 'Reformas parciales', text: 'Salones, dormitorios y otras estancias.', scene: 'living' },
  ] as const,
}

export const about = {
  eyebrow: 'Quiénes somos',
  title: 'Una forma diferente de encontrar profesionales para tu reforma',
  paragraphs: [
    'PideTuReforma nace con una idea clara: hacer que encontrar profesionales para reformar una vivienda sea más sencillo.',
    'Sabemos que empezar una reforma puede generar muchas dudas. Encontrar empresas, pedir presupuestos, comparar opciones y decidir con quién trabajar no siempre es fácil.',
    'Por eso hemos creado una plataforma que conecta a particulares con profesionales del sector.',
    'Nuestro objetivo es ayudarte a ahorrar tiempo, conocer diferentes opciones y tomar una decisión con mayor tranquilidad.',
  ],
  closing: 'Creemos en la transparencia, la cercanía y en hacer las cosas sencillas.',
  values: [
    { title: 'Transparencia', text: 'Te explicamos cómo funcionamos: somos intermediarios y no ejecutamos las obras.' },
    { title: 'Cercanía', text: 'Empezamos en L\'Hospitalet y alrededores, pensando en la gente de la zona.' },
    { title: 'Facilidad', text: 'Un cuestionario claro, sin registros ni papeleo.' },
    { title: 'Confianza', text: 'Tu solicitud es gratis y decides tú con qué profesional seguir.' },
  ],
  disclosure:
    'Los profesionales colaboradores son empresas y autónomos independientes. PideTuReforma no dirige técnicamente ni garantiza las obras.',
}

export const faq = {
  eyebrow: 'Preguntas frecuentes',
  title: 'Lo que suele preguntarse antes de empezar',
  items: [
    {
      q: '¿Cuánto cuesta enviar mi solicitud?',
      a: 'Nada. Para ti, enviar la solicitud es gratuito y no te compromete a contratar a nadie.',
    },
    {
      q: '¿PideTuReforma hace las obras?',
      a: 'No. Somos una plataforma que conecta a particulares con empresas y profesionales de reformas. Las obras las realiza el profesional que tú elijas, con quien acuerdas directamente el trabajo y el presupuesto.',
    },
    {
      q: '¿Qué pasa después de enviar el cuestionario?',
      a: 'Revisamos tu solicitud y buscamos profesionales de nuestra red que puedan estar interesados. Los que lo estén podrán ponerse en contacto contigo para conocer mejor el proyecto.',
    },
    {
      q: '¿Cuándo me contactarán?',
      a: 'No podemos asegurar plazos ni que todas las solicitudes reciban respuesta, porque depende de cada profesional y de la disponibilidad en tu zona.',
    },
    {
      q: '¿Estoy obligado a contratar a alguien?',
      a: 'En absoluto. Puedes comparar lo que recibas y decidir libremente, incluso no seguir adelante.',
    },
    {
      q: '¿Qué hacéis con mis datos?',
      a: 'Los usamos para gestionar tu solicitud y comunicarlos a profesionales colaboradores que puedan contactarte. Puedes consultar todos los detalles en nuestra política de privacidad.',
    },
    {
      q: '¿Atendéis fuera de L\'Hospitalet?',
      a: 'Empezamos en L\'Hospitalet de Llobregat y alrededores de Barcelona. Si tu vivienda está cerca, cuéntanos tu proyecto igualmente.',
    },
  ],
}

export const finalCta = {
  title: '¿Tienes una reforma en mente?',
  text: 'Empieza hoy. Cuéntanos tu proyecto y buscamos profesionales que puedan ayudarte.',
  button: 'Pedir presupuesto gratis',
}
