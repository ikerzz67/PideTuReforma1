import { Icon } from '../Icons'

interface Props {
  label: string
  hint?: string
  icon?: string
  selected: boolean
  onSelect: () => void
  variant?: 'tile' | 'row'
}

/** Opción seleccionable (botón con aria-pressed). */
export function ChoiceCard({ label, hint, icon, selected, onSelect, variant = 'row' }: Props) {
  return (
    <button type="button" className={`choice choice--${variant}${selected ? ' is-selected' : ''}`} aria-pressed={selected} onClick={onSelect}>
      {icon && (
        <span className="choice__icon">
          <Icon name={icon} size={variant === 'tile' ? 30 : 22} />
        </span>
      )}
      <span className="choice__text">
        <span className="choice__label">{label}</span>
        {hint && <span className="choice__hint">{hint}</span>}
      </span>
      <span className="choice__tick" aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m5 12.5 4.5 4.5L19 7.5" />
        </svg>
      </span>
    </button>
  )
}
