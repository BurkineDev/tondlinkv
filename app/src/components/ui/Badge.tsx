import { clsx } from 'clsx'

interface BadgeProps {
  variant?: 'green' | 'orange' | 'blue' | 'teal' | 'gray'
  children: React.ReactNode
  className?: string
}

const variants = {
  green:  'bg-green-50 text-green-700',
  orange: 'bg-orange-50 text-orange-600',
  blue:   'bg-blue-50 text-blue-700',
  teal:   'bg-teal-50 text-teal-700',
  gray:   'bg-gray-100 text-gray-600',
}

export default function Badge({ variant = 'green', children, className }: BadgeProps) {
  return (
    <span className={clsx('badge', variants[variant], className)}>
      {children}
    </span>
  )
}
