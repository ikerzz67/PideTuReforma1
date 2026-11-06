# PideTuReforma

Web de captación de solicitudes de reforma (React + TypeScript + Vite). **La primera pantalla es el cuestionario**
de 6 pasos; debajo, el resto de la página (cómo funciona, ventajas, tipos de reforma, opiniones, quiénes somos,
preguntas frecuentes, blog y llamada final).

## Instalar y ejecutar

Requiere Node.js ≥ 20.19.

```bash
npm install
cp .env.example .env     # y rellénalo (ver más abajo)
npm run dev              # desarrollo en http://localhost:5173
npm run build            # comprueba tipos, compila y genera dist/ (+ sitemap si hay VITE_SITE_URL)
npm run preview          # sirve dist/ en local
```

### Despliegue
Es una SPA con URLs limpias (`/blog/mi-articulo`): el hosting debe devolver `index.html` en cualquier ruta.
Ya incluido para **Vercel** (`vercel.json`) y **Netlify/Cloudflare Pages** (`public/_redirects`).

## Variables de entorno (`.env`)

| Variable | Uso |
|---|---|
| `VITE_SITE_URL` | Dominio público (canonical, sitemap, datos estructurados) |
| `VITE_LEADS_ENDPOINT` | URL de TU backend que recibe las solicitudes. **Vacío = no se envía nada** y el formulario lo dice |
| `VITE_CONTACT_EMAIL` / `VITE_CONTACT_PHONE` | Aparecen en el pie solo si los rellenas |
| `VITE_SHOW_DEMO_CONTENT` | `true` muestra las opiniones de ejemplo también en producción (mantener `false`) |

Las variables `VITE_*` son públicas. **Nunca pongas claves, tokens ni contraseñas en el frontend.**

## Dónde editar cada cosa

| Qué | Archivo |
|---|---|
| Textos de la home, pasos, ventajas, FAQ, «Quiénes somos» | `src/content/home.ts` |
| Preguntas y opciones del cuestionario, textos de consentimiento | `src/content/quiz.ts` |
| Opiniones | `src/content/reviews.ts` |
| Artículos del blog (cada uno con su URL) | `src/content/posts.ts` |
| Textos legales (borrador) | `src/content/legal.ts` |
| Datos del sitio, menú, enlaces legales | `src/config/site.ts` |
| Colores y tipografía | `:root` en `src/styles/global.css` |
| Lógica del cuestionario | `src/components/quiz/` |
| Envío al backend | `src/lib/api.ts` · contrato en `docs/BACKEND.md` |

Identidad: azul `#0158FD`, azul oscuro `#101828`, gris `#F5F7FA`/`#667085`, tipografía Montserrat (Google Fonts).

## Lo que está funcionando y lo que NO

**Funciona:** cuestionario por pasos con validación, progreso animado, volver atrás sin perder respuestas
(el progreso, sin datos personales, se guarda solo en `sessionStorage`), tamaños adaptados al tipo de reforma,
consentimiento de privacidad obligatorio y comunicaciones comerciales opcionales (ambas sin premarcar),
campo anti-spam, preselección desde «Tipos de reforma», router con URLs limpias, SEO por página
(title, description, canonical, Open Graph, JSON-LD), menú móvil, `prefers-reduced-motion`.

**Pendiente de conectar (requiere servicios externos, nada está simulado):**
- Backend que guarde las solicitudes (`VITE_LEADS_ENDPOINT`) → ver `docs/BACKEND.md`.
- Notificaciones por email, Klaviyo, panel de administración y seguimiento de estados (tipos y esquema ya preparados).

**Pendiente de tu parte:**
- **Textos legales**: `src/content/legal.ts` es un borrador con campos `[ENTRE CORCHETES]`; deben completarse y
  revisarse por un profesional (RGPD/LOPDGDD/LSSI) antes de publicar. Mientras `legalReviewed` sea `false`
  (`src/config/site.ts`) las páginas legales muestran un aviso y llevan `noindex`. El texto de consentimiento
  del formulario (`consentTexts`) también debe revisarse.
- **Opiniones**: las 4 incluidas son de ejemplo (`demo: true`); solo se ven en desarrollo y con etiqueta
  «Ejemplo». En producción aparece un aviso de «Estamos empezando» hasta que añadas opiniones reales y autorizadas.
- **Blog**: los artículos son orientativos y no incluyen cifras de precios ni normativa. Verifica cualquier dato antes de añadirlo.
- **Imágenes**: no hay fotografías (no disponía de ninguna licenciada). Las imágenes de tarjetas son ilustraciones
  de línea (`src/components/Illustration.tsx`). Para usar fotos propias: ponlas en `public/images/` e indica
  `image: '/images/archivo.webp'` en el contenido del artículo.
- **Cookies**: la web no usa analítica ni publicidad, solo almacenamiento técnico. Si añades Analytics/píxeles necesitarás banner de consentimiento.

## Notas técnicas
- No se usa Framer Motion ni React Router: animaciones con CSS e `IntersectionObserver`, y un router mínimo
  con la History API (`src/lib/router.tsx`), para no añadir dependencias. Si lo prefieres, se pueden sustituir.
- Montserrat se carga desde Google Fonts (`index.html`). Para autoalojarla, descarga los `.woff2` a `public/fonts/` y define `@font-face`.

## Estado de verificación
Revisado en navegador (móvil 390 px y escritorio 1440 px): recorrido completo del cuestionario, validaciones, volver atrás sin perder datos,
envío contra un endpoint simulado (solo en pruebas), rutas del blog/legales/404, anclas del menú y ausencia de scroll horizontal.
Pendiente de tu lado: ejecutar `npm install && npm run build` en tu máquina (el entorno donde se preparó no tenía acceso a npm,
por lo que se comprobó con un bundle de esbuild; `tsc` y `vite build` no se han podido ejecutar allí).
