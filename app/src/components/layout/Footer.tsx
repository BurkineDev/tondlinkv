import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 font-bold text-lg text-white mb-4">
              <div className="w-8 h-8 rounded-lg bg-green-700 flex items-center justify-content text-white text-sm font-black flex items-center justify-center">T</div>
              <span>Tond<span className="text-green-400">link</span></span>
            </div>
            <p className="text-sm leading-relaxed mb-5">
              Tondlink connecte producteurs agricoles, coopératives et acheteurs professionnels
              au Burkina Faso pour des transactions simples et directes.
            </p>
            <div className="flex gap-2">
              {['f', 'w', 't'].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-green-700 flex items-center justify-center transition-colors text-xs font-bold uppercase"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                ['/', 'Accueil'],
                ['/producteurs', 'Producteurs'],
                ['/acheteurs', 'Acheteurs'],
                ['/marche', 'Marché agricole'],
                ['/rejoindre', 'Rejoindre'],
                ['/contact', 'Contact'],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="hover:text-green-400 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Filières */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Filières</h4>
            <ul className="space-y-2.5 text-sm">
              {['🐔 Volaille','🌾 Céréales','🥬 Maraîchage','🌻 Oléagineux','🥭 Fruits','🐄 Élevage','🍯 Apiculture'].map((f) => (
                <li key={f}>
                  <a href="#" className="hover:text-green-400 transition-colors">{f}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin size={14} className="text-green-400 mt-0.5 flex-shrink-0" />
                <span>Ouagadougou, Burkina Faso</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={14} className="text-green-400 flex-shrink-0" />
                <a href="tel:+22670000000" className="hover:text-green-400 transition-colors">+226 70 00 00 00</a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-400 text-xs font-bold w-3.5 text-center">W</span>
                <a href="https://wa.me/22670000000" className="hover:text-green-400 transition-colors">+226 70 00 00 00</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={14} className="text-green-400 flex-shrink-0" />
                <a href="mailto:contact@tondlink.bf" className="hover:text-green-400 transition-colors">contact@tondlink.bf</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <span>© 2025 Tondlink — Tous droits réservés</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-300 transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
