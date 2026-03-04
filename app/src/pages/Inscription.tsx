import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Check, ArrowRight, ArrowLeft, Sprout, ShoppingCart,
  Eye, EyeOff, Loader, Phone, Mail, Lock, User, Building2,
} from 'lucide-react'
import { clsx } from 'clsx'

type UserType = 'producteur' | 'acheteur' | null
type Step = 1 | 2 | 3

const steps = [
  { n: 1 as Step, label: 'Type de compte',   desc: 'Producteur ou acheteur ?' },
  { n: 2 as Step, label: 'Vos informations', desc: 'Identité et accès sécurisé' },
  { n: 3 as Step, label: 'Confirmation',     desc: 'Votre compte est prêt' },
]

const regions = [
  '', 'Centre (Ouagadougou)', 'Hauts-Bassins (Bobo-Dioulasso)',
  'Plateau Central', 'Nord', 'Est', 'Sahel', 'Boucle du Mouhoun',
  'Centre-Sud', 'Centre-Ouest', 'Centre-Est', 'Centre-Nord', 'Cascades', 'Sud-Ouest',
]

export default function Inscription() {
  const [step, setStep]         = useState<Step>(1)
  const [userType, setUserType] = useState<UserType>(null)
  const [showPwd, setShowPwd]   = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [errors, setErrors]     = useState<Record<string, string>>({})

  const [form, setForm] = useState({
    prenom:    '',
    nom:       '',
    structure: '',
    tel:       '',
    email:     '',
    region:    '',
    password:  '',
    confirm:   '',
    cgu:       false,
  })

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value }))

  const validateStep2 = () => {
    const e: Record<string, string> = {}
    if (!form.prenom.trim())  e.prenom  = 'Requis'
    if (!form.nom.trim())     e.nom     = 'Requis'
    if (!form.structure.trim()) e.structure = 'Requis'
    if (form.tel.replace(/\D/g, '').length < 8) e.tel = 'Numéro invalide'
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Format invalide'
    if (!form.region)         e.region  = 'Requis'
    if (form.password.length < 8) e.password = 'Minimum 8 caractères'
    if (!/[A-Z]/.test(form.password)) e.password = 'Au moins une majuscule'
    if (!/\d/.test(form.password))    e.password = 'Au moins un chiffre'
    if (form.confirm !== form.password) e.confirm = 'Les mots de passe ne correspondent pas'
    if (!form.cgu) e.cgu = 'Vous devez accepter les conditions'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = async () => {
    if (step === 1 && !userType) { setErrors({ type: 'Veuillez sélectionner un type' }); return }
    if (step === 2) {
      if (!validateStep2()) return
      setLoading(true)
      await new Promise((r) => setTimeout(r, 1400))
      setLoading(false)
    }
    setErrors({})
    setStep((s) => (s + 1) as Step)
  }

  const back = () => {
    setErrors({})
    setStep((s) => (s - 1) as Step)
  }

  /* Password strength */
  const pwdStrength = (() => {
    const p = form.password
    let score = 0
    if (p.length >= 8) score++
    if (/[A-Z]/.test(p)) score++
    if (/\d/.test(p)) score++
    if (/[^A-Za-z0-9]/.test(p)) score++
    return score
  })()

  const strengthLabel = ['', 'Faible', 'Moyen', 'Bon', 'Excellent'][pwdStrength]
  const strengthColor = ['', 'bg-red-400', 'bg-orange-400', 'bg-blue-400', 'bg-green-500'][pwdStrength]

  const InputField = ({
    name, label, type = 'text', placeholder, required, icon: Icon,
  }: {
    name: keyof typeof form
    label: string
    type?: string
    placeholder?: string
    required?: boolean
    icon?: React.ElementType
  }) => (
    <div>
      <label className="form-label">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <Icon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        )}
        <input
          type={type}
          value={String(form[name])}
          onChange={set(name)}
          className={clsx('form-input', Icon && 'pl-10', errors[name] && 'border-red-400')}
          placeholder={placeholder}
        />
      </div>
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
    </div>
  )

  return (
    <div className="min-h-screen flex">

      {/* ─── Sidebar ─── */}
      <aside className="hidden lg:flex flex-col w-96 bg-gradient-to-b from-green-900 to-green-700 p-10 sticky top-0 h-screen">

        <Link to="/" className="flex items-center gap-2.5 font-bold text-lg text-white mb-10">
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center font-black text-sm">T</div>
          <span>Tond<span className="text-gold-400">link</span></span>
        </Link>

        <div className="mb-8">
          <p className="text-gold-400 text-xs font-bold uppercase tracking-widest mb-2">Inscription</p>
          <h2 className="text-white text-xl font-bold leading-tight">
            Rejoignez la plateforme agricole du Burkina Faso
          </h2>
        </div>

        {/* Steps tracker */}
        <div className="flex flex-col gap-0 flex-1 justify-center">
          {steps.map((s, i) => (
            <div key={s.n} className="flex gap-4 items-start relative">
              {i < steps.length - 1 && (
                <div className="absolute left-5 top-10 w-0.5 h-10 bg-white/20" />
              )}
              <div
                className={clsx(
                  'w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 border-2 transition-all duration-300',
                  step > s.n  ? 'bg-white/25 border-white/60 text-white'
                  : step === s.n ? 'bg-white text-green-700 border-white shadow-lg'
                  : 'bg-transparent border-white/30 text-white/40'
                )}
              >
                {step > s.n ? <Check size={16} /> : s.n}
              </div>
              <div className="pt-2 pb-10">
                <div className={clsx('font-semibold text-sm', step >= s.n ? 'text-white' : 'text-white/40')}>
                  {s.label}
                </div>
                <div className="text-white/35 text-xs">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white/10 rounded-xl p-4 text-sm text-white/70 mt-auto">
          🔒 Vos données sont protégées et ne seront jamais partagées sans votre accord.
        </div>
      </aside>

      {/* ─── Main ─── */}
      <div className="flex-1 flex flex-col bg-sand">

        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
          <Link to="/" className="flex items-center gap-2 font-bold text-base text-gray-900">
            <div className="w-7 h-7 rounded-lg bg-green-700 flex items-center justify-center text-white text-xs font-black">T</div>
            Tondlink
          </Link>
          <span className="text-xs text-gray-500 font-medium">Étape {Math.min(step, 2)} / 2</span>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 bg-gray-100">
          <div
            className="h-1.5 bg-green-600 transition-all duration-500"
            style={{ width: `${(Math.min(step, 2) / 2) * 100}%` }}
          />
        </div>

        <div className="flex-1 flex items-start justify-center p-8 lg:p-16">
          <div className="w-full max-w-lg">

            {/* ── STEP 1 – Type de compte ── */}
            {step === 1 && (
              <div>
                <p className="text-xs font-bold text-green-700 uppercase tracking-widest mb-2">Étape 1 / 2</p>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Vous êtes…</h2>
                <p className="text-gray-500 mb-8 text-sm">
                  Choisissez le type de compte correspondant à votre activité.
                  Vous avez déjà un compte ?{' '}
                  <Link to="/connexion" className="text-green-700 font-semibold hover:underline">Se connecter</Link>
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[
                    {
                      type: 'producteur' as UserType,
                      icon: <Sprout size={38} />,
                      name: 'Producteur / Coopérative',
                      desc: 'Vous produisez des denrées agricoles et souhaitez trouver des acheteurs.',
                      color: 'text-green-700',
                      bg: 'bg-green-50',
                    },
                    {
                      type: 'acheteur' as UserType,
                      icon: <ShoppingCart size={38} />,
                      name: 'Acheteur / Transformateur',
                      desc: 'Vous cherchez à vous approvisionner en produits agricoles locaux.',
                      color: 'text-blue-700',
                      bg: 'bg-blue-50',
                    },
                  ].map(({ type, icon, name, desc, color, bg }) => (
                    <button
                      key={type!}
                      onClick={() => { setUserType(type); setErrors({}) }}
                      className={clsx(
                        'flex flex-col items-center text-center p-7 rounded-2xl border-2 transition-all duration-200 cursor-pointer',
                        userType === type
                          ? `border-current ${bg} ${color}`
                          : 'border-gray-200 bg-white hover:border-gray-300 text-gray-400'
                      )}
                    >
                      <div className={clsx('mb-4 transition-colors', userType === type ? color : 'text-gray-300')}>
                        {icon}
                      </div>
                      <div className={clsx('font-bold text-sm mb-1.5', userType === type ? color : 'text-gray-800')}>
                        {name}
                      </div>
                      <div className="text-xs text-gray-500 leading-relaxed">{desc}</div>
                    </button>
                  ))}
                </div>

                {errors.type && (
                  <p className="text-red-500 text-sm mb-4">{errors.type}</p>
                )}
              </div>
            )}

            {/* ── STEP 2 – Informations ── */}
            {step === 2 && (
              <div>
                <p className="text-xs font-bold text-green-700 uppercase tracking-widest mb-2">Étape 2 / 2</p>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Vos informations</h2>
                <p className="text-gray-500 mb-8 text-sm">
                  Renseignez vos coordonnées et créez votre mot de passe.
                </p>

                <div className="space-y-4">

                  {/* Name row */}
                  <div className="grid grid-cols-2 gap-4">
                    <InputField name="prenom" label="Prénom" placeholder="Ex: Aminata" required icon={User} />
                    <InputField name="nom" label="Nom" placeholder="Ex: Kabré" required />
                  </div>

                  {/* Structure */}
                  <InputField
                    name="structure"
                    label={userType === 'producteur' ? 'Nom de la structure / coopérative' : 'Nom de l\'entreprise'}
                    placeholder={userType === 'producteur' ? 'Ex: Coop. Avicole du Centre' : 'Ex: SOPROFA SARL'}
                    required
                    icon={Building2}
                  />

                  {/* Phone + email */}
                  <div className="grid grid-cols-2 gap-4">
                    <InputField name="tel" label="Téléphone" type="tel" placeholder="+226 70 00 00 00" required icon={Phone} />
                    <InputField name="email" label="Email (facultatif)" type="email" placeholder="vous@exemple.com" icon={Mail} />
                  </div>

                  {/* Region */}
                  <div>
                    <label className="form-label">Région <span className="text-red-500">*</span></label>
                    <select
                      value={form.region}
                      onChange={set('region')}
                      className={clsx('form-input', errors.region && 'border-red-400')}
                    >
                      {regions.map((r) => (
                        <option key={r} value={r}>{r || '— Sélectionnez votre région —'}</option>
                      ))}
                    </select>
                    {errors.region && <p className="text-red-500 text-xs mt-1">{errors.region}</p>}
                  </div>

                  {/* Password */}
                  <div>
                    <label className="form-label">
                      Mot de passe <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      <input
                        type={showPwd ? 'text' : 'password'}
                        value={form.password}
                        onChange={set('password')}
                        className={clsx('form-input pl-10 pr-11', errors.password && 'border-red-400')}
                        placeholder="Min. 8 caractères"
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPwd((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>

                    {/* Strength bar */}
                    {form.password.length > 0 && (
                      <div className="mt-2">
                        <div className="flex gap-1 mb-1">
                          {[1, 2, 3, 4].map((i) => (
                            <div
                              key={i}
                              className={clsx(
                                'h-1 flex-1 rounded-full transition-all duration-300',
                                i <= pwdStrength ? strengthColor : 'bg-gray-200'
                              )}
                            />
                          ))}
                        </div>
                        <p className={clsx('text-xs font-medium', {
                          'text-red-400':    pwdStrength === 1,
                          'text-orange-400': pwdStrength === 2,
                          'text-blue-500':   pwdStrength === 3,
                          'text-green-600':  pwdStrength === 4,
                        })}>
                          Force : {strengthLabel}
                        </p>
                      </div>
                    )}
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                  </div>

                  {/* Confirm password */}
                  <div>
                    <label className="form-label">
                      Confirmer le mot de passe <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      <input
                        type={showConfirm ? 'text' : 'password'}
                        value={form.confirm}
                        onChange={set('confirm')}
                        className={clsx('form-input pl-10 pr-11', errors.confirm && 'border-red-400')}
                        placeholder="Répétez le mot de passe"
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errors.confirm && <p className="text-red-500 text-xs mt-1">{errors.confirm}</p>}
                  </div>

                  {/* CGU */}
                  <label className="flex items-start gap-3 cursor-pointer group select-none pt-1">
                    <div className="relative flex-shrink-0 mt-0.5">
                      <input
                        type="checkbox"
                        checked={form.cgu}
                        onChange={set('cgu')}
                        className="sr-only"
                      />
                      <div
                        className={clsx(
                          'w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200',
                          form.cgu
                            ? 'bg-green-700 border-green-700'
                            : errors.cgu
                              ? 'border-red-400 bg-white'
                              : 'bg-white border-gray-300 group-hover:border-green-400'
                        )}
                      >
                        {form.cgu && (
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className="text-sm text-gray-600 leading-relaxed">
                      J'accepte les{' '}
                      <a href="#" className="text-green-700 font-semibold hover:underline">conditions d'utilisation</a>
                      {' '}et la{' '}
                      <a href="#" className="text-green-700 font-semibold hover:underline">politique de confidentialité</a>
                      {' '}de Tondlink.
                    </span>
                  </label>
                  {errors.cgu && <p className="text-red-500 text-xs -mt-2">{errors.cgu}</p>}

                </div>
              </div>
            )}

            {/* ── STEP 3 – Success ── */}
            {step === 3 && (
              <div className="text-center py-6">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <Check size={40} className="text-green-700" strokeWidth={2.5} />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Compte créé !</h2>
                <p className="text-gray-500 max-w-sm mx-auto mb-8 leading-relaxed">
                  Bienvenue sur Tondlink. Votre espace{' '}
                  <strong>{userType === 'producteur' ? 'producteur' : 'acheteur'}</strong> est prêt.
                  Notre équipe vous contactera sous{' '}
                  <strong>24 heures</strong> pour valider votre profil.
                </p>

                <div className="bg-green-50 rounded-2xl p-6 text-left mb-8 border border-green-100 max-w-sm mx-auto">
                  <p className="font-bold text-gray-900 mb-4 text-sm">Prochaines étapes</p>
                  <div className="space-y-3">
                    {[
                      'Vérification de votre demande (24h)',
                      'Un agent Tondlink vous contacte',
                      'Votre profil est publié et visible',
                    ].map((s, i) => (
                      <div key={s} className="flex gap-3 items-start text-sm text-gray-700">
                        <div className="w-6 h-6 rounded-full bg-green-700 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {i + 1}
                        </div>
                        {s}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 justify-center">
                  <Link to="/connexion" className="btn-primary px-6 py-3">
                    Se connecter maintenant
                  </Link>
                  <Link to="/" className="btn-outline px-6 py-3">
                    Retour à l'accueil
                  </Link>
                </div>

                <p className="mt-6 text-sm text-gray-500">
                  Vous souhaitez compléter votre profil maintenant ?{' '}
                  <Link to="/rejoindre" className="text-green-700 font-semibold hover:underline">
                    Remplir le formulaire détaillé →
                  </Link>
                </p>
              </div>
            )}

            {/* ── Navigation ── */}
            {step < 3 && (
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
                {step > 1 ? (
                  <button onClick={back} className="btn-ghost">
                    <ArrowLeft size={16} /> Retour
                  </button>
                ) : (
                  <div />
                )}
                <button onClick={next} disabled={loading} className="btn-primary px-7 py-3 disabled:opacity-70">
                  {loading ? (
                    <><Loader size={16} className="animate-spin" /> Création en cours…</>
                  ) : step === 2 ? (
                    <><Check size={16} /> Créer mon compte</>
                  ) : (
                    <>Continuer <ArrowRight size={16} /></>
                  )}
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}
