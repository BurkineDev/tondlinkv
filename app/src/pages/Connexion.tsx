import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, ArrowRight, Shield, TrendingUp, Star, Loader } from 'lucide-react'
import { clsx } from 'clsx'

const stats = [
  { value: '1 200+', label: 'Producteurs actifs' },
  { value: '450+',   label: 'Acheteurs vérifiés' },
  { value: '13',     label: 'Régions couvertes' },
]

const testimonial = {
  text: 'Grâce à Tondlink, j\'ai trouvé un acheteur régulier pour mon maïs à un prix équitable. Mes revenus ont augmenté de 40 %.',
  name: 'Aminata K.',
  role: 'Productrice de céréales – Bobo-Dioulasso',
}

export default function Connexion() {
  const [form, setForm]       = useState({ identifier: '', password: '', remember: false })
  const [showPwd, setShowPwd] = useState(false)
  const [errors, setErrors]   = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const setField = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [k]: e.type === 'checkbox' ? e.target.checked : e.target.value }))

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.identifier.trim()) e.identifier = 'Ce champ est requis'
    if (form.password.length < 6) e.password = 'Minimum 6 caractères'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault()
    if (!validate()) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    // TODO: integrate backend auth
  }

  return (
    <div className="min-h-screen flex">

      {/* ─── Sidebar ─── */}
      <aside className="hidden lg:flex flex-col w-[420px] bg-gradient-to-b from-green-900 to-green-700 p-10 sticky top-0 h-screen overflow-y-auto">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 font-bold text-lg text-white mb-12">
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center font-black text-sm">T</div>
          <span>Tond<span className="text-gold-400">link</span></span>
        </Link>

        {/* Headline */}
        <div className="mb-10">
          <p className="text-gold-400 text-xs font-bold uppercase tracking-widest mb-3">Bienvenue</p>
          <h2 className="text-white text-2xl font-bold leading-tight mb-3">
            La plateforme qui connecte<br />l'agriculture burkinabè
          </h2>
          <p className="text-white/60 text-sm leading-relaxed">
            Accédez à votre espace pour gérer vos échanges, suivre les offres du marché et contacter vos partenaires.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-10">
          {stats.map((s) => (
            <div key={s.label} className="bg-white/10 rounded-xl p-3 text-center">
              <div className="text-white font-bold text-lg leading-none mb-1">{s.value}</div>
              <div className="text-white/50 text-xs leading-tight">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="bg-white/10 rounded-2xl p-5 mb-auto">
          <div className="flex gap-0.5 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className="text-gold-400 fill-gold-400" />
            ))}
          </div>
          <p className="text-white/80 text-sm leading-relaxed mb-4 italic">
            "{testimonial.text}"
          </p>
          <div>
            <div className="text-white font-semibold text-sm">{testimonial.name}</div>
            <div className="text-white/50 text-xs">{testimonial.role}</div>
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-8 space-y-3">
          {[
            { Icon: Shield,      text: 'Membres vérifiés par notre équipe' },
            { Icon: TrendingUp,  text: 'Prix du marché actualisés chaque jour' },
          ].map(({ Icon, text }) => (
            <div key={text} className="flex items-center gap-3 text-white/60 text-sm">
              <Icon size={15} className="text-gold-400 flex-shrink-0" />
              {text}
            </div>
          ))}
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
          <Link to="/inscription" className="text-sm font-semibold text-green-700 hover:underline">
            S'inscrire →
          </Link>
        </div>

        {/* Form area */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-16">
          <div className="w-full max-w-md">

            {/* Heading */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Connexion à votre espace</h1>
              <p className="text-gray-500 text-sm">
                Pas encore de compte ?{' '}
                <Link to="/inscription" className="text-green-700 font-semibold hover:underline">
                  S'inscrire gratuitement
                </Link>
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">

              {/* Identifier */}
              <div>
                <label className="form-label">
                  Téléphone ou email <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.identifier}
                  onChange={setField('identifier')}
                  className={clsx('form-input', errors.identifier && 'border-red-400 focus:border-red-400')}
                  placeholder="+226 70 00 00 00 ou vous@exemple.com"
                  autoComplete="username"
                />
                {errors.identifier && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <span className="inline-block w-1 h-1 rounded-full bg-red-500 flex-shrink-0" />
                    {errors.identifier}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="form-label mb-0">
                    Mot de passe <span className="text-red-500">*</span>
                  </label>
                  <Link
                    to="/mot-de-passe-oublie"
                    className="text-xs text-green-700 font-semibold hover:underline"
                  >
                    Oublié ?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPwd ? 'text' : 'password'}
                    value={form.password}
                    onChange={setField('password')}
                    className={clsx('form-input pr-11', errors.password && 'border-red-400 focus:border-red-400')}
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-0.5"
                    aria-label={showPwd ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  >
                    {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <span className="inline-block w-1 h-1 rounded-full bg-red-500 flex-shrink-0" />
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Remember me */}
              <label className="flex items-center gap-3 cursor-pointer group select-none">
                <div className="relative flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={form.remember}
                    onChange={setField('remember')}
                    className="sr-only"
                  />
                  <div
                    className={clsx(
                      'w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200',
                      form.remember
                        ? 'bg-green-700 border-green-700'
                        : 'bg-white border-gray-300 group-hover:border-green-400'
                    )}
                  >
                    {form.remember && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm text-gray-600">Se souvenir de moi</span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center py-3 text-base disabled:opacity-70"
              >
                {loading ? (
                  <><Loader size={16} className="animate-spin" /> Connexion en cours…</>
                ) : (
                  <>Se connecter <ArrowRight size={16} /></>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">ou</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/22670000000?text=Bonjour%2C+je+voudrais+acc%C3%A9der+%C3%A0+mon+espace+Tondlink"
              target="_blank"
              rel="noreferrer"
              className={clsx(
                'flex items-center justify-center gap-2.5 w-full py-3 rounded-xl',
                'border-2 border-gray-200 hover:border-[#25D366] hover:bg-[#25D366]/5',
                'text-gray-700 font-semibold text-sm transition-all duration-200'
              )}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#25D366]" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Continuer via WhatsApp
            </a>

            <p className="text-center text-xs text-gray-400 mt-8 leading-relaxed">
              En vous connectant, vous acceptez nos{' '}
              <a href="#" className="text-green-700 hover:underline">conditions d'utilisation</a>
              {' '}et notre{' '}
              <a href="#" className="text-green-700 hover:underline">politique de confidentialité</a>.
            </p>

          </div>
        </div>
      </div>
    </div>
  )
}
