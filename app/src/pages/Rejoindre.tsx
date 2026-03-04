import { useState } from 'react'
import { Check, ArrowRight, ArrowLeft, Sprout, ShoppingCart, Loader } from 'lucide-react'
import { clsx } from 'clsx'
import { Link } from 'react-router-dom'

type UserType = 'producteur' | 'acheteur' | null
type Step = 1 | 2 | 3 | 4 | 5

const filieres = [
  { value: 'cereales',         icon: '🌾', label: 'Céréales' },
  { value: 'volaille',         icon: '🐔', label: 'Volaille' },
  { value: 'maraichage',       icon: '🥬', label: 'Maraîchage' },
  { value: 'oleagineux',       icon: '🌻', label: 'Oléagineux' },
  { value: 'fruits',           icon: '🥭', label: 'Fruits' },
  { value: 'elevage',          icon: '🐄', label: 'Élevage' },
  { value: 'apiculture',       icon: '🍯', label: 'Apiculture' },
  { value: 'produits-trans',   icon: '🫙', label: 'Transformés' },
  { value: 'autre',            icon: '➕', label: 'Autre' },
]

const regions = [
  '', 'Centre (Ouagadougou)', 'Hauts-Bassins (Bobo-Dioulasso)',
  'Plateau Central', 'Nord', 'Est', 'Sahel', 'Boucle du Mouhoun',
  'Centre-Sud', 'Centre-Ouest', 'Centre-Est', 'Centre-Nord', 'Cascades', 'Sud-Ouest',
]

const steps = [
  { n: 1 as Step, label: 'Type de compte',       desc: 'Producteur ou acheteur ?' },
  { n: 2 as Step, label: 'Informations',          desc: 'Nom, région, contact' },
  { n: 3 as Step, label: 'Filières & produits',   desc: 'Ce que vous offrez' },
  { n: 4 as Step, label: 'Confirmation',          desc: 'Vérification et envoi' },
]

export default function Rejoindre() {
  const [step, setStep] = useState<Step>(1)
  const [userType, setUserType] = useState<UserType>(null)
  const [form, setForm] = useState({ nom: '', responsable: '', tel: '', whatsapp: '', email: '', region: '', ville: '', volume: '', description: '' })
  const [selectedFilieres, setSelectedFilieres] = useState<string[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const toggleFiliere = (v: string) =>
    setSelectedFilieres((prev) => prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v])

  const validateStep2 = () => {
    const e: Record<string, string> = {}
    if (!form.nom.trim())        e.nom        = 'Requis'
    if (!form.responsable.trim()) e.responsable = 'Requis'
    if (form.tel.replace(/\D/g,'').length < 8) e.tel = 'Numéro invalide'
    if (!form.region)            e.region     = 'Requis'
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Format invalide'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = async () => {
    if (step === 1 && !userType) return
    if (step === 2 && !validateStep2()) return
    if (step === 3 && selectedFilieres.length === 0) return
    if (step === 4) {
      setLoading(true)
      await new Promise((r) => setTimeout(r, 1400))
      setLoading(false)
      setStep(5)
      return
    }
    setStep((s) => (s + 1) as Step)
  }

  const InputField = ({ name, label, type = 'text', placeholder, required }: { name: keyof typeof form; label: string; type?: string; placeholder?: string; required?: boolean }) => (
    <div>
      <label className="form-label">{label}{required && <span className="text-red-500 ml-0.5">*</span>}</label>
      <input type={type} value={form[name]} onChange={set(name)} className={clsx('form-input', errors[name] && 'border-red-400')} placeholder={placeholder} />
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
    </div>
  )

  const summaryRows = [
    ['Type', userType === 'producteur' ? '🌾 Producteur / Coopérative' : '🏪 Acheteur / Transformateur'],
    ['Structure', form.nom],
    ['Responsable', form.responsable],
    ['Téléphone', form.tel],
    ['WhatsApp', form.whatsapp || '—'],
    ['Région', form.region],
    ['Ville', form.ville || '—'],
    ['Email', form.email || '—'],
    ['Filières', selectedFilieres.join(', ') || '—'],
    ['Volume / Capacité', form.volume || '—'],
  ]

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="hidden lg:flex flex-col w-96 bg-gradient-to-b from-green-900 to-green-700 p-10 sticky top-0 h-screen">
        <Link to="/" className="flex items-center gap-2.5 font-bold text-lg text-white mb-10">
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center font-black">T</div>
          <span>Tond<span className="text-gold-400">link</span></span>
        </Link>
        <div className="mb-8">
          <p className="text-gold-400 text-xs font-bold uppercase tracking-widest mb-2">Inscription</p>
          <h2 className="text-white text-xl font-bold leading-tight">Créez votre profil en quelques minutes</h2>
        </div>
        <div className="flex flex-col gap-0 flex-1 justify-center">
          {steps.map((s, i) => (
            <div key={s.n} className="flex gap-4 items-start relative">
              {i < steps.length - 1 && <div className="absolute left-5 top-10 w-0.5 h-8 bg-white/20" />}
              <div className={clsx(
                'w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 border-2 transition-all',
                step > s.n ? 'bg-white/25 border-white/60 text-white' : step === s.n ? 'bg-white text-green-700 border-white' : 'bg-transparent border-white/30 text-white/40'
              )}>
                {step > s.n ? <Check size={16} /> : s.n}
              </div>
              <div className="pt-2 pb-8">
                <div className={clsx('font-semibold text-sm', step >= s.n ? 'text-white' : 'text-white/40')}>{s.label}</div>
                <div className="text-white/35 text-xs">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white/10 rounded-xl p-4 text-sm text-white/70 mt-auto">
          🔒 Vos données sont protégées et ne seront jamais revendues.
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
          <Link to="/" className="flex items-center gap-2 font-bold text-base text-gray-900">
            <div className="w-7 h-7 rounded-lg bg-green-700 flex items-center justify-center text-white text-xs font-black">T</div>
            Tondlink
          </Link>
          <span className="text-xs text-gray-500 font-medium">Étape {Math.min(step, 4)} / 4</span>
        </div>

        {/* Progress */}
        <div className="h-1.5 bg-gray-100">
          <div className="h-1.5 bg-green-600 transition-all duration-500" style={{ width: `${(Math.min(step, 4) / 4) * 100}%` }} />
        </div>

        <div className="flex-1 flex items-start justify-center p-8 lg:p-16">
          <div className="w-full max-w-lg">

            {/* STEP 1 */}
            {step === 1 && (
              <div>
                <p className="text-xs font-bold text-green-700 uppercase tracking-widest mb-2">Étape 1 / 4</p>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Vous êtes…</h2>
                <p className="text-gray-500 mb-8">Choisissez le type de compte correspondant à votre activité.</p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[
                    { type: 'producteur' as UserType, icon: <Sprout size={36} />, name: 'Producteur / Coopérative', desc: 'Vous produisez des denrées agricoles et souhaitez trouver des acheteurs.' },
                    { type: 'acheteur' as UserType, icon: <ShoppingCart size={36} />, name: 'Acheteur / Transformateur', desc: 'Vous cherchez à vous approvisionner en produits agricoles locaux.' },
                  ].map(({ type, icon, name, desc }) => (
                    <button
                      key={type}
                      onClick={() => setUserType(type)}
                      className={clsx(
                        'flex flex-col items-center text-center p-7 rounded-2xl border-2 transition-all duration-200 cursor-pointer bg-white',
                        userType === type ? 'border-green-600 bg-green-50' : 'border-gray-200 hover:border-green-300'
                      )}
                    >
                      <div className={clsx('mb-4', userType === type ? 'text-green-700' : 'text-gray-400')}>{icon}</div>
                      <div className={clsx('font-bold mb-1.5', userType === type ? 'text-green-700' : 'text-gray-800')}>{name}</div>
                      <div className="text-xs text-gray-500 leading-relaxed">{desc}</div>
                    </button>
                  ))}
                </div>
                {!userType && <p className="text-red-500 text-sm mb-4">Veuillez sélectionner un type.</p>}
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div>
                <p className="text-xs font-bold text-green-700 uppercase tracking-widest mb-2">Étape 2 / 4</p>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Vos informations</h2>
                <p className="text-gray-500 mb-8">Renseignez vos coordonnées de contact.</p>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <InputField name="nom" label="Nom de la structure" placeholder="Ex: Coop. Avicole…" required />
                    <InputField name="responsable" label="Responsable" placeholder="Prénom Nom" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <InputField name="tel" label="Téléphone" type="tel" placeholder="+226 70 00 00 00" required />
                    <InputField name="whatsapp" label="WhatsApp" type="tel" placeholder="Si différent" />
                  </div>
                  <div>
                    <label className="form-label">Région <span className="text-red-500">*</span></label>
                    <select value={form.region} onChange={set('region')} className={clsx('form-input', errors.region && 'border-red-400')}>
                      {regions.map((r) => <option key={r} value={r}>{r || '— Sélectionnez —'}</option>)}
                    </select>
                    {errors.region && <p className="text-red-500 text-xs mt-1">{errors.region}</p>}
                  </div>
                  <InputField name="ville" label="Ville / Commune" placeholder="Ex: Ouagadougou" />
                  <InputField name="email" label="Email (facultatif)" type="email" placeholder="vous@exemple.com" />
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div>
                <p className="text-xs font-bold text-green-700 uppercase tracking-widest mb-2">Étape 3 / 4</p>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  {userType === 'producteur' ? 'Vos filières de production' : 'Filières recherchées'}
                </h2>
                <p className="text-gray-500 mb-6">Sélectionnez tout ce qui s'applique.</p>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {filieres.map((f) => (
                    <button
                      key={f.value}
                      type="button"
                      onClick={() => toggleFiliere(f.value)}
                      className={clsx(
                        'flex flex-col items-center gap-1.5 py-4 px-2 rounded-xl border-2 text-xs font-semibold transition-all cursor-pointer',
                        selectedFilieres.includes(f.value)
                          ? 'border-green-600 bg-green-50 text-green-700'
                          : 'border-gray-200 bg-white text-gray-600 hover:border-green-300'
                      )}
                    >
                      <span className="text-2xl">{f.icon}</span>
                      {f.label}
                    </button>
                  ))}
                </div>
                {selectedFilieres.length === 0 && <p className="text-red-500 text-sm mb-4">Sélectionnez au moins une filière.</p>}
                <div className="space-y-4">
                  <div>
                    <label className="form-label">Volume ou capacité approximative</label>
                    <input value={form.volume} onChange={set('volume')} className="form-input" placeholder="Ex: 500 kg/semaine ou 5 t/mois" />
                  </div>
                  <div>
                    <label className="form-label">Description (facultatif)</label>
                    <textarea value={form.description} onChange={set('description')} rows={3} className="form-input resize-y" placeholder="Décrivez brièvement votre activité…" />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4 */}
            {step === 4 && (
              <div>
                <p className="text-xs font-bold text-green-700 uppercase tracking-widest mb-2">Étape 4 / 4</p>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Vérification</h2>
                <p className="text-gray-500 mb-6">Confirmez vos informations avant d'envoyer.</p>
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-6">
                  {summaryRows.map(([k, v], i) => (
                    <div key={k} className={clsx('flex justify-between items-start gap-3 px-5 py-3 text-sm', i % 2 === 0 ? 'bg-gray-50' : 'bg-white')}>
                      <span className="text-gray-400 font-semibold uppercase text-xs tracking-wide whitespace-nowrap">{k}</span>
                      <span className="font-semibold text-gray-800 text-right">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-100 text-sm text-gray-600 mb-6">
                  <span className="text-green-600 mt-0.5 flex-shrink-0">🔒</span>
                  En soumettant, vous acceptez d'être contacté par Tondlink pour finaliser votre inscription.
                </div>
              </div>
            )}

            {/* STEP 5 — Success */}
            {step === 5 && (
              <div className="text-center py-8">
                <div className="text-7xl mb-6">🎉</div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Demande envoyée !</h2>
                <p className="text-gray-500 max-w-sm mx-auto mb-8 leading-relaxed">
                  Notre équipe va examiner votre demande et vous contactera dans les <strong>24–48 heures</strong> pour finaliser votre inscription.
                </p>
                <div className="bg-green-50 rounded-2xl p-6 text-left mb-8 border border-green-100">
                  <p className="font-bold text-gray-900 mb-4">Prochaines étapes</p>
                  <div className="space-y-3">
                    {['Tondlink vérifie votre demande (24h)', 'Un agent vous appelle pour valider', 'Votre profil est publié sur la plateforme'].map((s, i) => (
                      <div key={s} className="flex gap-3 items-start text-sm text-gray-700">
                        <div className="w-6 h-6 rounded-full bg-green-700 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</div>
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Link to="/" className="btn-primary px-6 py-3">Retour à l'accueil</Link>
                  <a href="https://wa.me/22670000000" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] text-white font-semibold">
                    Suivi WhatsApp
                  </a>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            {step < 5 && (
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
                {step > 1 ? (
                  <button onClick={() => setStep((s) => (s - 1) as Step)} className="btn-ghost">
                    <ArrowLeft size={16} /> Retour
                  </button>
                ) : <div />}
                <button onClick={next} disabled={loading} className="btn-primary px-7 py-3">
                  {loading
                    ? <><Loader size={16} className="animate-spin" /> Envoi…</>
                    : step === 4
                      ? <><Check size={16} /> Envoyer ma demande</>
                      : <>Continuer <ArrowRight size={16} /></>
                  }
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}
