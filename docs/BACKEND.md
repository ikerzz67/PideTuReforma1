# Preparación del backend (solicitudes, emails, Klaviyo, panel)

El frontend **no contiene credenciales** y **no simula** ningún envío. Cuando `VITE_LEADS_ENDPOINT` está vacío
el cuestionario avisa de que la solicitud no se ha enviado. Esta guía describe lo que debe implementar el backend.

## 1. Contrato del endpoint

`POST {VITE_LEADS_ENDPOINT}` · `Content-Type: application/json` · respuesta `2xx` = guardado correctamente.

El cuerpo es un `LeadPayload` (ver `src/types/lead.ts`):

```json
{
  "reformType": "cocina",
  "location": { "postalCode": "08901", "municipality": "L'Hospitalet de Llobregat", "address": "opcional" },
  "size": "cocina:8-12",
  "sizeLabel": "Mediana (Entre 8 y 12 m²)",
  "notes": "opcional (solo en «Otro tipo de reforma»)",
  "timing": "1-3m",
  "budget": "unknown",
  "contact": { "name": "…", "phone": "…", "email": "…" },
  "consents": {
    "privacy":   { "accepted": true,  "textVersion": "…", "text": "…", "acceptedAt": "ISO-8601" },
    "marketing": { "accepted": false, "textVersion": "…", "text": "…", "acceptedAt": null }
  },
  "meta": { "source": "web-quiz", "pageUrl": "…", "submittedAt": "ISO-8601", "clientRequestId": "uuid" },
  "website": ""
}
```

### Qué debe hacer el servidor
1. **Validar de nuevo todo** (nunca fiarse del navegador) y rechazar si `consents.privacy.accepted !== true`.
2. **Anti-spam**: descartar (respondiendo 200 sin guardar) si `website` no está vacío; añadir *rate limiting* por IP y, si hace falta, un captcha.
3. **Idempotencia**: usar `meta.clientRequestId` para no duplicar reintentos.
4. **CORS**: permitir solo el dominio de la web.
5. Guardar `consents` tal cual (texto, versión y fecha) como prueba del consentimiento.
6. Tras guardar: notificar por email al equipo y, si `consents.marketing.accepted`, sincronizar con Klaviyo.

## 2. Almacenamiento sugerido (SQL)

```sql
CREATE TYPE lead_status AS ENUM ('nuevo','pendiente','contactado','en_negociacion','cerrado','perdido');

CREATE TABLE leads (
  id                 uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_request_id  uuid UNIQUE NOT NULL,
  status             lead_status NOT NULL DEFAULT 'nuevo',
  reform_type        text NOT NULL,
  postal_code        text NOT NULL,
  municipality       text NOT NULL,
  address            text,
  size_code          text NOT NULL,
  size_label         text NOT NULL,
  notes              text,
  timing             text NOT NULL,
  budget             text NOT NULL,
  name               text NOT NULL,
  phone              text NOT NULL,
  email              text NOT NULL,
  consent_privacy    jsonb NOT NULL,
  consent_marketing  jsonb NOT NULL,
  page_url           text,
  created_at         timestamptz NOT NULL DEFAULT now(),
  updated_at         timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX leads_status_created_idx ON leads (status, created_at DESC);
```

Estados: **Nuevo → Pendiente → Contactado → En negociación → Cerrado / Perdido**
(etiquetas en `leadStatusLabels`, `src/types/lead.ts`).

## 3. Panel de administración (fase siguiente)

Pantalla protegida con autenticación **en el servidor** con columnas: fecha de entrada, nombre, teléfono, tipo de
reforma, localidad, presupuesto y estado (editable). Puede construirse como app aparte o como rutas `/admin`
con login real; nunca con una contraseña en el frontend.

## 4. Klaviyo y emails

- Las claves (Klaviyo, SMTP, Resend…) viven solo como **variables de entorno del servidor**.
- Enviar a Klaviyo únicamente a quien marcó `consents.marketing`. Los datos de la solicitud (gestión del
  servicio) y el marketing son bases jurídicas distintas.
- Email de aviso al equipo: asunto con tipo de reforma y municipio; cuerpo con los datos del lead y enlace al panel.

## 5. Opciones rápidas para empezar

Una función serverless (Vercel/Netlify/Cloudflare) que reciba el POST, guarde en Supabase/Postgres y envíe
el email con Resend/Postmark. Basta con poner su URL en `VITE_LEADS_ENDPOINT`.
