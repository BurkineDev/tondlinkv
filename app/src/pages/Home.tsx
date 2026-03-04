import { Link } from 'react-router-dom'
import { Sprout, ShoppingCart, ArrowRight, CheckCircle, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { useEffect } from 'react'
import { cooperatives, testimonials, priceTicks } from '../data/mockData'
import { useCounter, useScrollReveal } from '../hooks/useScrollReveal'
import CoopCard from '../components/features/CoopCard'

function StatCounter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useCounter(to)
  return <span ref={ref}>{to.toLocaleString('fr-FR')}{suffix}</span>
}

function TrendIcon({ trend, pct }: { trend: string; pct?: number }) {
  if (trend === 'up')     return <span className="text-red-400 text-xs flex items-center gap-0.5"><TrendingUp size={9} />+{pct}%</span>
  if (trend === 'down')   return <span className="text-blue-400 text-xs flex items-center gap-0.5"><TrendingDown size={9} />-{pct}%</span>
  return <span className="text-gray-500 text-xs flex items-center gap-0.5"><Minus size={9} />stable</span>
}

export default function Home() {
  useScrollReveal()

  // Reveal hero cards immediately (they start visible)
  useEffect(() => {
    const timer = setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'))
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* ── PRICE TICKER ─────────────────────────────────────── */}
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

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative py-24 md:py-32 bg-gradient-to-br from-green-900 via-green-700 to-green-600 overflow-hidden"
      >
        {/* BG pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, white 1px, transparent 1px)', backgroundSize: '30px 30px' }}
        />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-white/15 text-white/90 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 border border-white/20">
              🌾 Plateforme agricole du Burkina Faso
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
              Connectez producteurs<br />
              <span className="text-gold-400">& acheteurs</span> directement
            </h1>
            <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl">
              Tondlink met en relation coopératives agricoles et acheteurs professionnels
              au Burkina Faso. Pas d'intermédiaire, prix justes, contact WhatsApp direct.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/producteurs" className="btn-gold px-6 py-3 text-base">
                <Sprout size={18} /> Voir les producteurs
              </Link>
              <Link to="/marche" className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white border-2 border-white/40 rounded-xl hover:bg-white/10 transition-colors">
                <ShoppingCart size={18} /> Explorer le marché
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            {[
              { label: 'Coopératives', value: 120, suffix: '+' },
              { label: 'Acheteurs',    value: 300, suffix: '+' },
              { label: 'Filières',     value: 18 },
              { label: 'Provinces',   value: 45 },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 border border-white/15 rounded-2xl p-5 text-center backdrop-blur-sm">
                <div className="text-3xl font-black text-white mb-1">
                  <StatCounter to={s.value} suffix={s.suffix} />
                </div>
                <div className="text-white/70 text-sm font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <span className="badge badge-green mb-3">Comment ça marche</span>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Simple comme un coup de téléphone</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Pas de compte obligatoire, pas de commission cachée.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { n: 1, icon: '🔍', title: 'Cherchez', desc: 'Parcourez les coopératives ou les offres du marché selon votre filière et région.' },
              { n: 2, icon: '📞', title: 'Contactez', desc: 'Appelez ou envoyez un WhatsApp directement au producteur ou à l\'acheteur.' },
              { n: 3, icon: '🤝', title: 'Concluez', desc: 'Négociez le prix, le volume et les conditions de livraison directement.' },
            ].map((step) => (
              <div key={step.n} className="reveal flex flex-col items-center text-center p-8 rounded-2xl bg-green-50 border border-green-100">
                <div className="w-12 h-12 rounded-full bg-green-700 text-white font-black text-lg flex items-center justify-center mb-4">
                  {step.n}
                </div>
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="font-bold text-xl text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED COOPS ───────────────────────────────────── */}
      <section className="section bg-sand">
        <div className="container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="badge badge-green mb-2">Producteurs en vedette</span>
              <h2 className="text-3xl font-bold text-gray-900">Coopératives partenaires</h2>
            </div>
            <Link to="/producteurs" className="btn-outline hidden md:inline-flex">
              Voir toutes <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cooperatives.slice(0, 3).map((c) => (
              <div key={c.id} className="reveal">
                <CoopCard coop={c} />
              </div>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link to="/producteurs" className="btn-outline">
              Voir toutes les coopératives <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── PARTNERS ─────────────────────────────────────────── */}
      <div className="bg-white border-y border-gray-100 py-8">
        <div className="container">
          <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
            Ils nous font confiance
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {['🌾 FAARF', '🏛️ DRAP Centre', '🤝 SOS Faim', '🌍 FAO Burkina', '📦 APME²A', '💰 PNUD'].map((p) => (
              <div key={p} className="text-gray-400 font-bold text-sm hover:text-gray-600 transition-colors cursor-default">
                {p}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="section bg-sand">
        <div className="container">
          <div className="text-center mb-10">
            <span className="badge badge-green mb-3">Témoignages</span>
            <h2 className="text-3xl font-bold text-gray-900">Ce qu'ils disent de Tondlink</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={t.id}
                className="reveal bg-white rounded-2xl p-7 border border-gray-100 shadow-card"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }, (_, j) => (
                    <span key={j} className={j < t.rating ? 'text-gold-500' : 'text-gray-200'}>★</span>
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{ background: t.avatarColor }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-gray-900">{t.author}</div>
                    <div className="text-xs text-gray-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-green-800 to-green-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, white 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />
        <div className="container relative z-10 text-center">
          <span className="badge bg-white/20 text-white mb-4">Rejoignez la communauté</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Prêt à développer votre activité ?
          </h2>
          <p className="text-white/75 max-w-xl mx-auto mb-10">
            Inscrivez votre coopérative gratuitement ou trouvez vos débouchés dès aujourd'hui.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/rejoindre" className="btn-gold px-7 py-3 text-base">
              <Sprout size={18} /> Inscrire ma coopérative
            </Link>
            <Link to="/marche" className="inline-flex items-center gap-2 px-7 py-3 text-base font-semibold text-white border-2 border-white/40 rounded-xl hover:bg-white/10 transition-colors">
              <ShoppingCart size={18} /> Trouver des produits
            </Link>
          </div>
          <p className="text-white/50 text-xs mt-6">
            <CheckCircle size={12} className="inline mr-1" />
            Gratuit · Pas d'intermédiaire · Contact direct
          </p>
        </div>
      </section>
    </>
  )
}
