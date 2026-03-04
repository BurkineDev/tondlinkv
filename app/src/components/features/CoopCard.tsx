import { Link } from 'react-router-dom'
import { Phone, MapPin, Users, CheckCircle, Star } from 'lucide-react'
import type { Cooperative } from '../../types'
import Badge from '../ui/Badge'
import { filiereBadgeClass } from '../../utils/helpers'

interface Props { coop: Cooperative }

const typeLabels: Record<string, string> = {
  volaille:   '🐔 Volaille',
  cereales:   '🌾 Céréales',
  maraichage: '🥬 Maraîchage',
  oleagineux: '🌻 Oléagineux',
  fruits:     '🥭 Fruits',
  elevage:    '🐄 Élevage',
  apiculture: '🍯 Apiculture',
}

export default function CoopCard({ coop }: Props) {
  const badgeVariant = (filiereBadgeClass(coop.type).replace('badge-', '') as 'green' | 'orange' | 'blue' | 'teal')

  return (
    <div className="card card-hover flex flex-col">
      {/* Image */}
      <div className="relative h-44 overflow-hidden rounded-t-2xl">
        <img
          src={coop.imageUrl}
          alt={coop.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <Badge variant={badgeVariant}>{typeLabels[coop.type]}</Badge>
        </div>
        {coop.verified && (
          <div className="absolute top-3 right-3">
            <Badge variant="green">
              <CheckCircle size={10} /> Vérifiée
            </Badge>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <div>
          <h3 className="font-bold text-gray-900 text-base leading-tight mb-1">{coop.name}</h3>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <MapPin size={11} />
            <span>{coop.city}, {coop.region}</span>
            {coop.rating && (
              <>
                <span className="mx-1">·</span>
                <Star size={11} className="text-gold-500 fill-gold-500" />
                <span className="font-semibold text-gray-700">{coop.rating}</span>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-gray-600">
            <Users size={12} className="text-green-600" />
            <span>{coop.members} membres</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-600">
            <span className="w-3 h-3 text-green-600">📦</span>
            <span className="font-semibold text-green-700">{coop.volume}</span>
          </div>
        </div>

        {coop.description && (
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
            {coop.description}
          </p>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-2 mt-auto border-t border-gray-100">
          <Link
            to={`/producteurs/${coop.id}`}
            className="btn-outline text-xs px-3 py-1.5 flex-1 justify-center"
          >
            Voir la fiche
          </Link>
          <a
            href={`tel:${coop.phone}`}
            className="btn-primary text-xs px-3 py-1.5 flex-1 justify-center"
          >
            <Phone size={12} /> Appeler
          </a>
          <a
            href={`https://wa.me/${coop.whatsapp.replace(/\D/g,'')}`}
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
