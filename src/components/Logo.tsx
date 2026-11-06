import { Link } from '../lib/router'

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`logo ${className}`} aria-label="PideTuReforma – ir al inicio">
      <img src="/logo.png" alt="PideTuReforma" width="916" height="138" />
    </Link>
  )
}
