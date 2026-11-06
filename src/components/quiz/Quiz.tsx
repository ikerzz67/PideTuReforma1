import { useCallback, useEffect, useRef, useState } from 'react'
import type { FormEvent, RefObject } from 'react'
import { budgetOptions, consentTexts, municipalitySuggestions, reformOptions, sizeQuestion, timingOptions } from '../../content/quiz'
import { submitLead } from '../../lib/api'
import { PRESELECT_EVENT, takePending } from '../../lib/quizBridge'
import { Link } from '../../lib/router'
import {
  validateEmail,
  validateMunicipality,
  validateName,
  validatePhone,
  validatePostalCode,
} from '../../lib/validation'
import type { SubmitResult } from '../../types/lead'
import { Icon } from '../Icons'
import { ChoiceCard } from './ChoiceCard'
import { Field } from './Field'
import {
  TOTAL_STEPS,
  buildPayload,
  budgetLabel,
  clearSaved,
  emptyAnswers,
  loadSaved,
  save,
  sizeLabelFor,
  timingLabel,
} from './quizState'
import type { Answers } from './quizState'

const titles = [
  '¿Qué quieres reformar?',
  '¿Dónde se encuentra la vivienda?',
  '',
  '¿Cuándo quieres empezar?',
  '¿Qué presupuesto tienes pensado?',
  'Tus datos de contacto',
]

const ADVANCE_DELAY = 340

type Phase = 'quiz' | 'done'

export function Quiz() {
  const saved = useRef(loadSaved()).current
  const [step, setStep] = useState(saved?.step ?? 1)
  const [answers, setAnswers] = useState<Answers>(saved?.answers ?? emptyAnswers)
  const [dir, setDir] = useState<'forward' | 'back'>('forward')
  const [showErrors, setShowErrors] = useState(false)
  const [phase, setPhase] = useState<Phase>('quiz')
  const [result, setResult] = useState<SubmitResult | null>(null)
  const [sending, setSending] = useState(false)
  const [honeypot, setHoneypot] = useState('')
  const headingRef = useRef<HTMLHeadingElement>(null)
  const userMoved = useRef(false)
  const timer = useRef<number | undefined>(undefined)

  const set = useCallback(<K extends keyof Answers>(k: K, v: Answers[K]) => setAnswers((a) => ({ ...a, [k]: v })), [])

  // Persistir progreso (sin datos personales)
  useEffect(() => {
    if (phase === 'quiz') save(step, answers)
  }, [step, answers, phase])

  // Mover el foco al título del paso cuando el usuario avanza/retrocede
  useEffect(() => {
    if (userMoved.current) headingRef.current?.focus({ preventScroll: true })
  }, [step, phase])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  // Preselección desde otras secciones (p. ej. "Tipos de reforma")
  useEffect(() => {
    const apply = () => {
      const p = takePending()
      if (p) {
        window.clearTimeout(timer.current)
        setPhase('quiz')
        setAnswers((a) => ({ ...a, reformType: p, size: a.reformType === p ? a.size : null }))
        setDir('forward')
        userMoved.current = false
        setStep(2)
      }
    }
    apply()
    window.addEventListener(PRESELECT_EVENT, apply)
    return () => window.removeEventListener(PRESELECT_EVENT, apply)
  }, [])

  const errors = {
    postalCode: validatePostalCode(answers.postalCode),
    municipality: validateMunicipality(answers.municipality),
    name: validateName(answers.name),
    phone: validatePhone(answers.phone),
    email: validateEmail(answers.email),
    privacy: answers.privacy ? '' : 'Para enviar tu solicitud necesitamos que aceptes esta casilla.',
  }

  const stepValid = (s: number): boolean => {
    switch (s) {
      case 1: return !!answers.reformType
      case 2: return !errors.postalCode && !errors.municipality
      case 3: return !!answers.size
      case 4: return !!answers.timing
      case 5: return !!answers.budget
      case 6: return !errors.name && !errors.phone && !errors.email && !errors.privacy
      default: return false
    }
  }

  const goTo = (n: number, d: 'forward' | 'back') => {
    window.clearTimeout(timer.current)
    userMoved.current = true
    setDir(d)
    setShowErrors(false)
    setStep(n)
  }

  const next = () => {
    if (!stepValid(step)) {
      setShowErrors(true)
      return
    }
    if (step < TOTAL_STEPS) goTo(step + 1, 'forward')
  }
  const back = () => step > 1 && goTo(step - 1, 'back')

  /** Selección en pasos de una sola opción: marca y avanza solo tras una breve pausa. */
  const choose = (apply: () => void, autoAdvance = true) => {
    apply()
    window.clearTimeout(timer.current)
    if (autoAdvance) timer.current = window.setTimeout(() => goTo(step + 1, 'forward'), ADVANCE_DELAY)
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (!stepValid(6)) {
      setShowErrors(true)
      return
    }
    setSending(true)
    setResult(null)
    const res = await submitLead(buildPayload(answers, honeypot))
    setSending(false)
    if (res.status === 'error') {
      setResult(res)
      return
    }
    setResult(res)
    userMoved.current = true
    setPhase('done')
    if (res.status === 'sent') clearSaved()
  }

  const restart = () => {
    clearSaved()
    setAnswers(emptyAnswers)
    setResult(null)
    setShowErrors(false)
    setDir('back')
    setStep(1)
    setPhase('quiz')
  }

  const editFromDone = () => {
    setPhase('quiz')
    setResult(null)
    setDir('back')
    setStep(6)
  }

  if (phase === 'done' && result) {
    return <Done result={result} answers={answers} onRestart={restart} onEdit={editFromDone} headingRef={headingRef} />
  }

  const type = answers.reformType
  const pct = Math.round(((step - 1) / TOTAL_STEPS) * 100 + (stepValid(step) ? 100 / TOTAL_STEPS / 2 : 0))
  const sizeQ = type ? sizeQuestion[type] : null
  const heading = step === 3 ? (sizeQ ? sizeQ.title : '¿Qué tamaño tiene la reforma?') : titles[step - 1]

  return (
    <div className="quiz" role="group" aria-labelledby="quiz-title">
      <div className="quiz__top">
        <div className="quiz__meta">
          <span className="quiz__count" id="quiz-title">
            Paso {step} de {TOTAL_STEPS}
          </span>
          <span className="quiz__free">
            <Icon name="lock" size={14} /> Tus datos están protegidos
          </span>
        </div>
        <div className="progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label="Progreso del cuestionario">
          <div className="progress__bar" style={{ width: `${Math.max(pct, 6)}%` }} />
        </div>
      </div>

      <form className={`quiz__body step step--${dir}`} key={step} onSubmit={step === TOTAL_STEPS ? submit : (e) => { e.preventDefault(); next() }} noValidate>
        <h2 className="quiz__question" tabIndex={-1} ref={headingRef}>
          {heading}
        </h2>

        {step === 1 && (
          <div className="choices choices--tiles">
            {reformOptions.map((o) => (
              <ChoiceCard
                key={o.value}
                variant="tile"
                icon={o.icon}
                label={o.label}
                hint={o.hint}
                selected={answers.reformType === o.value}
                onSelect={() => choose(() => setAnswers((a) => ({ ...a, reformType: o.value, size: a.reformType === o.value ? a.size : null })))}
              />
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="fields">
            <p className="quiz__hint">Solo para buscar profesionales cerca de tu vivienda.</p>
            <div className="fields__row">
              <Field
                id="q-cp"
                label="Código postal"
                inputMode="numeric"
                autoComplete="postal-code"
                maxLength={5}
                placeholder="08901"
                value={answers.postalCode}
                onChange={(e) => set('postalCode', e.target.value.replace(/\D/g, ''))}
                error={showErrors ? errors.postalCode : ''}
              />
              <Field
                id="q-muni"
                label="Municipio"
                autoComplete="address-level2"
                list="q-muni-list"
                placeholder="L'Hospitalet de Llobregat"
                value={answers.municipality}
                onChange={(e) => set('municipality', e.target.value)}
                error={showErrors ? errors.municipality : ''}
              />
              <datalist id="q-muni-list">
                {municipalitySuggestions.map((m) => (
                  <option key={m} value={m} />
                ))}
              </datalist>
            </div>
            <Field
              id="q-addr"
              label="Dirección"
              optional
              autoComplete="street-address"
              placeholder="Calle y número"
              value={answers.address}
              onChange={(e) => set('address', e.target.value)}
              help="No es obligatoria. Puedes darla más adelante al profesional."
            />
          </div>
        )}

        {step === 3 && sizeQ && (
          <>
            <p className="quiz__hint">{sizeQ.subtitle}</p>
            <div className="choices choices--rows">
              {sizeQ.options.map((o) => (
                <ChoiceCard
                  key={o.value}
                  label={o.label}
                  hint={o.hint}
                  selected={answers.size === o.value}
                  onSelect={() => choose(() => set('size', o.value), type !== 'otro')}
                />
              ))}
            </div>
            {type === 'otro' && (
              <div className="field field--area">
                <label htmlFor="q-notes" className="field__label">
                  Cuéntanos brevemente qué necesitas <span className="field__opt">· opcional</span>
                </label>
                <textarea
                  id="q-notes"
                  className="field__input"
                  rows={3}
                  maxLength={500}
                  value={answers.notes}
                  onChange={(e) => set('notes', e.target.value)}
                  placeholder="Ejemplo: cambiar el suelo y pintar el pasillo"
                />
              </div>
            )}
          </>
        )}
        {step === 3 && !sizeQ && (
          <p className="quiz__hint">Primero elige qué quieres reformar para mostrarte las opciones adecuadas.</p>
        )}

        {step === 4 && (
          <div className="choices choices--rows">
            {timingOptions.map((o) => (
              <ChoiceCard key={o.value} label={o.label} hint={o.hint} selected={answers.timing === o.value} onSelect={() => choose(() => set('timing', o.value))} />
            ))}
          </div>
        )}

        {step === 5 && (
          <>
            <p className="quiz__hint">Es solo una orientación para buscar profesionales adecuados. No te compromete a nada.</p>
            <div className="choices choices--rows choices--cols">
              {budgetOptions.map((o) => (
                <ChoiceCard key={o.value} label={o.label} hint={o.hint} selected={answers.budget === o.value} onSelect={() => choose(() => set('budget', o.value))} />
              ))}
            </div>
          </>
        )}

        {step === 6 && (
          <div className="fields">
            <Field id="q-name" label="Nombre" autoComplete="name" placeholder="Tu nombre" value={answers.name} onChange={(e) => set('name', e.target.value)} error={showErrors ? errors.name : ''} />
            <div className="fields__row">
              <Field id="q-phone" label="Teléfono" type="tel" inputMode="tel" autoComplete="tel" placeholder="612 345 678" value={answers.phone} onChange={(e) => set('phone', e.target.value)} error={showErrors ? errors.phone : ''} />
              <Field id="q-email" label="Correo electrónico" type="email" autoComplete="email" placeholder="tu@correo.com" value={answers.email} onChange={(e) => set('email', e.target.value)} error={showErrors ? errors.email : ''} />
            </div>

            {/* Campo trampa anti-spam: invisible para personas */}
            <div className="hp" aria-hidden="true">
              <label>
                No rellenar
                <input type="text" tabIndex={-1} autoComplete="off" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
              </label>
            </div>

            <div className="consents">
              <label className={`check${showErrors && errors.privacy ? ' has-error' : ''}`}>
                <input type="checkbox" checked={answers.privacy} onChange={(e) => set('privacy', e.target.checked)} aria-describedby={showErrors && errors.privacy ? 'q-priv-err' : undefined} aria-invalid={showErrors && errors.privacy ? true : undefined} />
                <span className="check__box" aria-hidden="true" />
                <span className="check__text">
                  {consentTexts.privacy.split('política de privacidad')[0]}
                  <Link href="/privacidad" target="_blank" rel="noopener">política de privacidad</Link>
                  {consentTexts.privacy.split('política de privacidad')[1]} <span className="req">(necesario)</span>
                </span>
              </label>
              {showErrors && errors.privacy && (
                <p id="q-priv-err" className="field__error" role="alert">
                  {errors.privacy}
                </p>
              )}
              <label className="check">
                <input type="checkbox" checked={answers.marketing} onChange={(e) => set('marketing', e.target.checked)} />
                <span className="check__box" aria-hidden="true" />
                <span className="check__text">{consentTexts.marketing}</span>
              </label>
            </div>

            {result?.status === 'error' && (
              <p className="alert alert--error" role="alert">
                {result.message}
              </p>
            )}
          </div>
        )}

        <div className="quiz__nav">
          {step > 1 ? (
            <button type="button" className="btn btn--ghost" onClick={back}>
              <Icon name="arrowLeft" size={18} /> Atrás
            </button>
          ) : (
            <span />
          )}
          {step === TOTAL_STEPS ? (
            <button type="submit" className="btn btn--primary btn--lg" disabled={sending}>
              {sending ? 'Enviando…' : 'Enviar mi solicitud gratis'}
              {!sending && <Icon name="arrow" size={18} />}
            </button>
          ) : (
            <button type="submit" className="btn btn--primary btn--lg" disabled={step === 3 && !type}>
              Continuar <Icon name="arrow" size={18} />
            </button>
          )}
        </div>
        {showErrors && step !== 2 && step !== 6 && !stepValid(step) && (
          <p className="field__error" role="alert">
            Elige una opción para continuar.
          </p>
        )}
      </form>
    </div>
  )
}

function Done({
  result,
  answers,
  onRestart,
  onEdit,
  headingRef,
}: {
  result: SubmitResult
  answers: Answers
  onRestart: () => void
  onEdit: () => void
  headingRef: RefObject<HTMLHeadingElement | null>
}) {
  const sent = result.status === 'sent'
  const typeLabel = reformOptions.find((o) => o.value === answers.reformType)?.label
  return (
    <div className="quiz quiz--done step step--forward" role="status">
      <div className={`done__badge${sent ? '' : ' done__badge--warn'}`} aria-hidden="true">
        <Icon name={sent ? 'check' : 'info'} size={34} />
      </div>
      <h2 className="quiz__question" tabIndex={-1} ref={headingRef}>
        {sent ? '¡Solicitud recibida!' : 'Solicitud preparada, pero no enviada'}
      </h2>

      {sent ? (
        <>
          <p className="quiz__hint">Gracias por contarnos tu proyecto. Esto es lo que ocurrirá ahora:</p>
          <ol className="done__list">
            <li>Revisaremos la información de tu solicitud.</li>
            <li>Buscaremos profesionales de nuestra red que puedan estar interesados en tu reforma.</li>
            <li>Los profesionales interesados podrán contactarte por teléfono o correo para conocer mejor el proyecto.</li>
          </ol>
          <p className="done__note">
            No podemos asegurar plazos de respuesta ni que todas las solicitudes reciban contacto: depende de la disponibilidad de los profesionales en tu zona. Decidir con quién seguir (o con nadie) es siempre cosa tuya.
          </p>
        </>
      ) : (
        <>
          <p className="alert alert--warn">
            Este sitio todavía no está conectado a un servidor para recibir solicitudes, así que <strong>tus datos no se han enviado ni guardado</strong>. (Modo desarrollo: configura <code>VITE_LEADS_ENDPOINT</code>, ver README.)
          </p>
        </>
      )}

      <ul className="done__summary" aria-label="Resumen de tu solicitud">
        {typeLabel && <li>{typeLabel}</li>}
        {answers.municipality && <li>{answers.municipality}</li>}
        {sizeLabelFor(answers) && <li>{sizeLabelFor(answers)}</li>}
        {timingLabel(answers.timing) && <li>{timingLabel(answers.timing)}</li>}
        {budgetLabel(answers.budget) && <li>{budgetLabel(answers.budget)}</li>}
      </ul>

      <div className="quiz__nav quiz__nav--center">
        {!sent && (
          <button type="button" className="btn btn--ghost" onClick={onEdit}>
            <Icon name="arrowLeft" size={18} /> Volver a mis datos
          </button>
        )}
        <button type="button" className="btn btn--primary" onClick={onRestart}>
          {sent ? 'Enviar otra solicitud' : 'Empezar de nuevo'}
        </button>
      </div>
    </div>
  )
}
