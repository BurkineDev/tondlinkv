import { Link } from 'react-router-dom'
import { Phone, MapPin, Star, CheckCircle } from 'lucide-react'
import type { Buyer } from '../../types'
import Badge from '../ui/Badge'

interface Props { buyer: Buyer }

const typeLabel: Record<string, string> = {
  grossiste:      '🏪 Grossiste',
  transformateur: '🏭 Transformateur',
  restauration:   '🍽️ Restauration',
  'grande-surface': '🛒 Grande surface',
  industrie:      '🏗️ Industrie',
}

export default function BuyerCard({ buyer }: Props) {
  return (
    <div className="card card-hover flex flex-col">
      <div className="relative h-44 overflow-hidden rounded-t-2xl">
        <img src={buyer.imageUrl} alt={buyer.name} className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute top-3 left-3">
          <Badge variant="blue">{typeLabel[buyer.type] ?? buyer.type}</Badge>
        </div>
        {buyer.verified && (
          <div className="absolute top-3 right-3">
            <Badge variant="green"><CheckCircle size={10} /> Vérifié</Badge>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1 gap-3">
        <div>
          <h3 className="font-bold text-gray-900 text-base leading-tight mb-1">{buyer.name}</h3>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <MapPin size={11} />
            <span>{buyer.city}, {buyer.region}</span>
            {buyer.rating && (
              <>
                <span className="mx-1">·</span>
                <Star size={11} className="text-gold-500 fill-gold-500" />
                <span className="font-semibold text-gray-700">{buyer.rating}</span>
              </>
            )}
          </div>
        </div>

        <div className="text-sm">
          <span className="text-xs text-gray-500">Budget mensuel : </span>
          <span className="font-bold text-blue-700">{buyer.budget}</span>
        </div>

        <div className="flex flex-wrap gap-1">
          {buyer.filieres.slice(0, 4).map((f) => (
            <span key={f} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium capitalize">{f}</span>
          ))}
        </div>

        {buyer.description && (
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{buyer.description}</p>
        )}

        <div className="flex gap-2 pt-2 mt-auto border-t border-gray-100">
          <Link to={`/acheteurs/${buyer.id}`} className="btn-outline text-xs px-3 py-1.5 flex-1 justify-center">
            Voir la fiche
          </Link>
          <a href={`tel:${buyer.phone}`} className="btn-primary text-xs px-3 py-1.5 flex-1 justify-center">
            <Phone size={12} /> Appeler
          </a>
          <a
            href={`https://wa.me/${buyer.whatsapp.replace(/\D/g,'')}`}
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
