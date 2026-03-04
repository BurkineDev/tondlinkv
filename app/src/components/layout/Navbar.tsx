import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, Sprout } from 'lucide-react'
import { clsx } from 'clsx'

const links = [
  { to: '/',            label: 'Accueil',       end: true },
  { to: '/producteurs', label: 'Producteurs'              },
  { to: '/acheteurs',   label: 'Acheteurs'                },
  { to: '/marche',      label: 'Marché'                   },
  { to: '/contact',     label: 'Contact'                  },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile nav on route change
  useEffect(() => { setOpen(false) }, [navigate])

  return (
    <>
      <nav
        className={clsx(
          'fixed top-0 inset-x-0 z-50 bg-white transition-shadow duration-300',
          scrolled ? 'shadow-md' : 'shadow-sm border-b border-gray-100'
        )}
      >
        <div className="container flex items-center justify-between h-16">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2.5 font-bold text-lg text-gray-900">
            <div className="w-8 h-8 rounded-lg bg-green-700 flex items-center justify-center text-white text-sm font-black">
              T
            </div>
            <span>Tond<span className="text-green-700">link</span></span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.end}
                  className={({ isActive }) =>
                    clsx(
                      'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                      isActive
                        ? 'text-green-700 bg-green-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    )
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-2">
            <Link to="/acheteurs" className="btn-outline text-xs px-4 py-2">
              Je suis acheteur
            </Link>
            <Link to="/rejoindre" className="btn-primary text-xs px-4 py-2">
              <Sprout size={14} />
              Je suis producteur
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-40" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="absolute top-0 right-0 bottom-0 w-72 bg-white shadow-2xl flex flex-col pt-20 px-6 pb-8"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex flex-col gap-1 flex-1">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.end}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    clsx(
                      'px-4 py-3 rounded-xl text-sm font-semibold transition-colors',
                      isActive
                        ? 'bg-green-50 text-green-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    )
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>
            <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
              <Link to="/rejoindre" onClick={() => setOpen(false)} className="btn-primary justify-center">
                <Sprout size={15} /> M'inscrire
              </Link>
              <Link to="/contact" onClick={() => setOpen(false)} className="btn-outline justify-center">
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Spacer */}
      <div className="h-16" />
    </>
  )
}
