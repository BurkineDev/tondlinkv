import { Phone, MapPin, Box, Calendar, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { MarketOffer } from '../../types'
import Badge from '../ui/Badge'
import { formatPrice } from '../../utils/helpers'

interface Props { offer: MarketOffer }

const catVariant: Record<string, 'orange' | 'green' | 'teal' | 'blue'> = {
  Volaille:   'orange',
  Maraîchage: 'green',
  Céréales:   'teal',
  Oléagineux: 'blue',
  Fruits:     'orange',
  Élevage:    'teal',
}

function TrendIcon({ trend, pct }: { trend?: string; pct?: number }) {
  if (!trend || trend === 'stable') return <span className="text-gray-400 text-xs flex items-center gap-1"><Minus size={10} /> stable</span>
  if (trend === 'up') return <span className="text-red-500 text-xs flex items-center gap-1"><TrendingUp size={10} /> +{pct}%</span>
  return <span className="text-blue-500 text-xs flex items-center gap-1"><TrendingDown size={10} /> -{pct}%</span>
}

export default function OfferCard({ offer }: Props) {
  return (
    <div className="card card-hover flex flex-col">
      <div className="relative h-44 overflow-hidden rounded-t-2xl">
        <img src={offer.imageUrl} alt={offer.product} className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute top-3 left-3">
          <Badge variant={catVariant[offer.category] ?? 'green'}>
            {offer.icon} {offer.category}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant="green">Disponible</Badge>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1 gap-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-gray-900">{offer.product}</h3>
          <div className="text-right flex-shrink-0">
            <div className="text-green-700 font-black text-lg leading-none">
              {offer.price.toLocaleString('fr-FR')} F
            </div>
            <div className="text-gray-400 text-xs">/ {offer.unit}</div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 text-xs text-gray-600">
          <div className="flex items-center gap-1.5"><Box size={11} className="text-green-600" /> Volume : <strong>{offer.volume}</strong></div>
          <div className="flex items-center gap-1.5"><MapPin size={11} className="text-green-600" /> {offer.city}, {offer.region}</div>
          <div className="flex items-center gap-1.5 text-gray-500">🏢 {offer.cooperative}</div>
          <div className="flex items-center gap-1.5"><Calendar size={11} className="text-gray-400" /> Publié {offer.publishedAt}</div>
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-gray-100">
          <TrendIcon trend={offer.trend} pct={offer.trendPct} />
          <span className="text-xs text-gray-400">{formatPrice(offer.price, offer.unit)}</span>
        </div>

        <div className="flex gap-2 mt-auto">
          <Link to="/producteurs/cac-001" className="btn-outline text-xs px-3 py-1.5">Fiche</Link>
          <a href={`tel:${offer.phone}`} className="btn-primary text-xs px-3 py-1.5 flex-1 justify-center">
            <Phone size={12} /> Contacter
          </a>
          <a
            href={`https://wa.me/${offer.whatsapp.replace(/\D/g,'')}`}
            target="_blank"
            rel="noreferrer"
            className="w-9 h-9 flex items-center justify-center rounded-xl border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors text-xs font-bold flex-shrink-0"
          >
            W
          </a>
        </div>
      </div>
    </div>
  )
}
