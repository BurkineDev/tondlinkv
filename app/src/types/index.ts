// ─── Shared types — reusable in React Native ───────────────────────────────

export type UserType = 'producteur' | 'acheteur'

export interface Cooperative {
  id: string
  name: string
  type: 'cereales' | 'volaille' | 'maraichage' | 'oleagineux' | 'fruits' | 'elevage' | 'apiculture'
  icon: string
  region: string
  city: string
  members: number
  volume: string         // ex: "500 kg/sem."
  phone: string
  whatsapp: string
  verified: boolean
  partnerSince: number
  rating?: number
  deliveryZone?: string
  description?: string
  imageUrl?: string
}

export interface Buyer {
  id: string
  name: string
  type: 'grossiste' | 'transformateur' | 'restauration' | 'grande-surface' | 'industrie'
  icon: string
  region: string
  city: string
  budget: string         // ex: "5–10 M FCFA/mois"
  phone: string
  whatsapp: string
  verified: boolean
  partnerSince: number
  rating?: number
  filieres: string[]
  description?: string
  imageUrl?: string
}

export interface MarketOffer {
  id: string
  product: string
  category: 'Volaille' | 'Maraîchage' | 'Céréales' | 'Oléagineux' | 'Fruits' | 'Élevage'
  icon: string
  price: number
  unit: string
  volume: string
  region: string
  city: string
  cooperative: string
  phone: string
  whatsapp: string
  publishedAt: string
  available: boolean
  trend?: 'up' | 'down' | 'stable'
  trendPct?: number
  imageUrl: string
}

export interface PriceTick {
  name: string
  price: string
  icon: string
  trend: 'up' | 'down' | 'stable'
  pct?: number
}

export interface Testimonial {
  id: string
  author: string
  role: string
  initials: string
  avatarColor: string
  rating: number
  text: string
}

export interface FilterState {
  search: string
  category: string
  region: string
  sortBy: 'default' | 'price-asc' | 'price-desc' | 'recent'
}
