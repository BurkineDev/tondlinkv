/** Format price: 1500 → "1 500 F" */
export function formatPrice(n: number, unit = ''): string {
  return n.toLocaleString('fr-FR') + ' F' + (unit ? ` / ${unit}` : '')
}

/** Truncate text */
export function truncate(str: string, max: number): string {
  return str.length > max ? str.slice(0, max) + '…' : str
}

/** WhatsApp URL */
export function waUrl(phone: string, msg = ''): string {
  const clean = phone.replace(/\D/g, '')
  const enc = encodeURIComponent(msg || 'Bonjour, je vous contacte via Tondlink.')
  return `https://wa.me/${clean}?text=${enc}`
}

/** Tel URL */
export function telUrl(phone: string): string {
  return `tel:${phone}`
}

/** Stars array */
export function stars(rating: number): ('full' | 'empty')[] {
  return Array.from({ length: 5 }, (_, i) => (i < Math.round(rating) ? 'full' : 'empty'))
}

/** Badge color per filière */
export function filiereBadgeClass(type: string): string {
  const map: Record<string, string> = {
    volaille:   'badge-orange',
    cereales:   'badge-teal',
    maraichage: 'badge-green',
    oleagineux: 'badge-blue',
    fruits:     'badge-orange',
    elevage:    'badge-teal',
    apiculture: 'badge-blue',
  }
  return map[type] ?? 'badge-green'
}
