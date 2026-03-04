import { useAppStore } from '../store/useAppStore'
import { marketOffers, priceTicks, categories, regions } from '../data/mockData'
import OfferCard from '../components/features/OfferCard'
import SearchBar from '../components/ui/SearchBar'
import { TrendingUp, TrendingDown, Minus, SlidersHorizontal, X } from 'lucide-react'

function TrendIcon({ trend, pct }: { trend: string; pct?: number }) {
  if (trend === 'up')   return <div className="text-red-500 font-bold text-sm flex items-center gap-1"><TrendingUp size={13} />+{pct}%</div>
  if (trend === 'down') return <div className="text-blue-500 font-bold text-sm flex items-center gap-1"><TrendingDown size={13} />-{pct}%</div>
  return <div className="text-gray-400 text-sm flex items-center gap-1"><Minus size={13} />stable</div>
}

export default function Marche() {
  const { marketFilter, setMarketFilter, resetMarketFilter } = useAppStore()

  const filtered = marketOffers.filter((o) => {
    const q = marketFilter.search.toLowerCase()
    const matchSearch = !q || o.product.toLowerCase().includes(q) || o.city.toLowerCase().includes(q) || o.cooperative.toLowerCase().includes(q)
    const matchCat = !marketFilter.category || marketFilter.category === 'Toutes catégories' || o.category === marketFilter.category
    const matchRegion = !marketFilter.region || marketFilter.region === 'Toutes les régions' || o.region === marketFilter.region
    return matchSearch && matchCat && matchRegion
  })

  const hasFilter = marketFilter.search || (marketFilter.category && marketFilter.category !== 'Toutes catégories') || (marketFilter.region && marketFilter.region !== 'Toutes les régions')

  return (
    <>
      {/* Ticker */}
      <div className="bg-gray-900 overflow-hidden py-2.5">
        <div className="flex ticker-track gap-0">
          {[...priceTicks, ...priceTicks].map((t, i) => (
            <div key={i} className="flex items-center gap-2 px-6 border-r border-gray-700 whitespace-nowrap text-sm flex-shrink-0">
              <span>{t.icon}</span>
              <span className="font-semibold text-white">{t.name}</span>
              <span className="text-gray-300">{t.price}</span>
              <TrendIcon trend={t.trend} pct={t.pct} />
            </div>
          ))}
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-green-900 to-green-700 py-14">
        <div className="container">
          <span className="badge bg-white/20 text-white mb-3">🏪 Offres en temps réel</span>
          <h1 className="text-4xl font-bold text-white mb-3">Marché Agricole Tondlink</h1>
          <p className="text-white/75 max-w-xl">
            Toutes les offres disponibles. Prix, volumes et contact direct avec les producteurs.
          </p>
        </div>
      </div>

      {/* Price snapshot */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="container">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-gray-700">Prix indicatifs du marché</p>
            <p className="text-xs text-gray-400">Source : Tondlink / SONAGESS — 4 mars 2025</p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {priceTicks.slice(0, 6).map((t) => (
              <div key={t.name} className="bg-sand rounded-xl p-3 text-center border border-gray-100 hover:border-green-200 transition-colors">
                <div className="text-2xl mb-1">{t.icon}</div>
                <div className="text-xs font-semibold text-gray-500 mb-0.5">{t.name}</div>
                <div className="font-black text-sm text-gray-900">{t.price}</div>
                <TrendIcon trend={t.trend} pct={t.pct} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-30">
        <div className="container py-4">
          <div className="flex flex-wrap gap-3 items-end">
            <SearchBar
              value={marketFilter.search}
              onChange={(v) => setMarketFilter({ search: v })}
              placeholder="Maïs, poulet, tomate, sésame…"
            />
            <div className="flex flex-wrap gap-2">
              <select className="form-input w-auto" value={marketFilter.category} onChange={(e) => setMarketFilter({ category: e.target.value })}>
                {categories.market.map((c) => <option key={c}>{c}</option>)}
              </select>
              <select className="form-input w-auto" value={marketFilter.region} onChange={(e) => setMarketFilter({ region: e.target.value })}>
                {regions.map((r) => <option key={r}>{r}</option>)}
              </select>
              {hasFilter && (
                <button onClick={resetMarketFilter} className="btn-ghost text-red-500 hover:bg-red-50 gap-1.5">
                  <X size={14} /> Effacer
                </button>
              )}
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500 flex items-center gap-2">
            <SlidersHorizontal size={12} />
            {filtered.length} offre{filtered.length !== 1 ? 's' : ''} affichée{filtered.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Offers grid */}
      <section className="section">
        <div className="container">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((o) => <OfferCard key={o.id} offer={o} />)}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="font-bold text-gray-800 mb-2">Aucune offre trouvée</h3>
              <p className="text-gray-500 mb-5">Essayez d'autres critères de recherche.</p>
              <button onClick={resetMarketFilter} className="btn-primary">Réinitialiser</button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
