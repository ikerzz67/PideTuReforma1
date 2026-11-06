import type { InputHTMLAttributes, ReactNode } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  optional?: boolean
  help?: ReactNode
}

export function Field({ label, error, optional, help, id, ...input }: Props) {
  const errId = `${id}-err`
  const helpId = `${id}-help`
  return (
    <div className={`field${error ? ' has-error' : ''}`}>
      <label htmlFor={id} className="field__label">
        {label}
        {optional && <span className="field__opt"> · opcional</span>}
      </label>
      <input
        id={id}
        className="field__input"
        aria-invalid={error ? true : undefined}
        aria-describedby={[error ? errId : '', help ? helpId : ''].filter(Boolean).join(' ') || undefined}
        {...input}
      />
      {help && (
        <p id={helpId} className="field__help">
          {help}
        </p>
      )}
      {error && (
        <p id={errId} className="field__error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
