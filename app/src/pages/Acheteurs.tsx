import { useAppStore } from '../store/useAppStore'
import { buyers, categories, regions } from '../data/mockData'
import BuyerCard from '../components/features/BuyerCard'
import SearchBar from '../components/ui/SearchBar'
import { SlidersHorizontal, X } from 'lucide-react'

export default function Acheteurs() {
  const { buyerFilter, setBuyerFilter, resetBuyerFilter } = useAppStore()

  const filtered = buyers.filter((b) => {
    const q = buyerFilter.search.toLowerCase()
    const matchSearch = !q || b.name.toLowerCase().includes(q) || b.city.toLowerCase().includes(q)
    const matchCat = !buyerFilter.category || buyerFilter.category === 'Tous types' || b.type === buyerFilter.category.toLowerCase().replace(' ', '-')
    const matchRegion = !buyerFilter.region || buyerFilter.region === 'Toutes les régions' || b.region === buyerFilter.region
    return matchSearch && matchCat && matchRegion
  })

  const hasFilter = buyerFilter.search || (buyerFilter.category && buyerFilter.category !== 'Tous types') || (buyerFilter.region && buyerFilter.region !== 'Toutes les régions')

  return (
    <>
      <div className="bg-gradient-to-br from-blue-900 to-blue-700 py-14">
        <div className="container">
          <span className="badge bg-white/20 text-white mb-3">Acheteurs & Transformateurs</span>
          <h1 className="text-4xl font-bold text-white mb-3">Trouvez vos débouchés</h1>
          <p className="text-white/75 max-w-xl">
            {buyers.length} acheteurs professionnels cherchent à s'approvisionner directement auprès des producteurs.
          </p>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200 sticky top-16 z-30">
        <div className="container py-4">
          <div className="flex flex-wrap gap-3 items-end">
            <SearchBar
              value={buyerFilter.search}
              onChange={(v) => setBuyerFilter({ search: v })}
              placeholder="Chercher un acheteur, ville…"
            />
            <div className="flex flex-wrap gap-2">
              <select
                className="form-input w-auto"
                value={buyerFilter.category}
                onChange={(e) => setBuyerFilter({ category: e.target.value })}
              >
                {categories.buyer.map((c) => <option key={c}>{c}</option>)}
              </select>
              <select
                className="form-input w-auto"
                value={buyerFilter.region}
                onChange={(e) => setBuyerFilter({ region: e.target.value })}
              >
                {regions.map((r) => <option key={r}>{r}</option>)}
              </select>
              {hasFilter && (
                <button onClick={resetBuyerFilter} className="btn-ghost text-red-500 hover:bg-red-50 gap-1.5">
                  <X size={14} /> Effacer
                </button>
              )}
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500 flex items-center gap-2">
            <SlidersHorizontal size={12} />
            {filtered.length} acheteur{filtered.length !== 1 ? 's' : ''} affiché{filtered.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((b) => <BuyerCard key={b.id} buyer={b} />)}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="font-bold text-gray-800 mb-2">Aucun résultat</h3>
              <p className="text-gray-500 mb-5">Aucun acheteur ne correspond à vos critères.</p>
              <button onClick={resetBuyerFilter} className="btn-primary">Réinitialiser les filtres</button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
