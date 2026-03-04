import { useAppStore } from '../store/useAppStore'
import { cooperatives, categories, regions } from '../data/mockData'
import CoopCard from '../components/features/CoopCard'
import SearchBar from '../components/ui/SearchBar'
import { SlidersHorizontal, X } from 'lucide-react'

export default function Producteurs() {
  const { coopFilter, setCoopFilter, resetCoopFilter } = useAppStore()

  const filtered = cooperatives.filter((c) => {
    const q = coopFilter.search.toLowerCase()
    const matchSearch = !q || c.name.toLowerCase().includes(q) || c.city.toLowerCase().includes(q) || c.type.includes(q)
    const matchCat = !coopFilter.category || coopFilter.category === 'Toutes filières' || c.type === coopFilter.category.toLowerCase().replace('é', 'e').replace('î', 'i')
    const matchRegion = !coopFilter.region || coopFilter.region === 'Toutes les régions' || c.region === coopFilter.region
    return matchSearch && matchCat && matchRegion
  })

  const hasFilter = coopFilter.search || (coopFilter.category && coopFilter.category !== 'Toutes filières') || (coopFilter.region && coopFilter.region !== 'Toutes les régions')

  return (
    <>
      {/* Hero */}
      <div className="bg-gradient-to-br from-green-900 to-green-700 py-14">
        <div className="container">
          <span className="badge bg-white/20 text-white mb-3">Producteurs & Coopératives</span>
          <h1 className="text-4xl font-bold text-white mb-3">Trouvez vos fournisseurs</h1>
          <p className="text-white/75 max-w-xl">
            {cooperatives.length} coopératives partenaires dans toutes les régions du Burkina Faso.
            Contact direct, pas d'intermédiaire.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-30">
        <div className="container py-4">
          <div className="flex flex-wrap gap-3 items-end">
            <SearchBar
              value={coopFilter.search}
              onChange={(v) => setCoopFilter({ search: v })}
              placeholder="Chercher une coopérative, produit, ville…"
            />
            <div className="flex flex-wrap gap-2">
              <select
                className="form-input w-auto"
                value={coopFilter.category}
                onChange={(e) => setCoopFilter({ category: e.target.value })}
              >
                {categories.coop.map((c) => <option key={c}>{c}</option>)}
              </select>
              <select
                className="form-input w-auto"
                value={coopFilter.region}
                onChange={(e) => setCoopFilter({ region: e.target.value })}
              >
                {regions.map((r) => <option key={r}>{r}</option>)}
              </select>
              {hasFilter && (
                <button onClick={resetCoopFilter} className="btn-ghost text-red-500 hover:bg-red-50 gap-1.5">
                  <X size={14} /> Effacer
                </button>
              )}
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500 flex items-center gap-2">
            <SlidersHorizontal size={12} />
            {filtered.length} coopérative{filtered.length !== 1 ? 's' : ''} affichée{filtered.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="section">
        <div className="container">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((c) => <CoopCard key={c.id} coop={c} />)}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="font-bold text-gray-800 mb-2">Aucun résultat</h3>
              <p className="text-gray-500 mb-5">Aucune coopérative ne correspond à vos critères.</p>
              <button onClick={resetCoopFilter} className="btn-primary">Réinitialiser les filtres</button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
