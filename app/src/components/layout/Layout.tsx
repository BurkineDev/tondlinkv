import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import WaFloat from '../ui/WaFloat'
import Toast from '../ui/Toast'

export default function Layout() {
  const { pathname } = useLocation()

  // Scroll to top on route change
  useEffect(() => { window.scrollTo({ top: 0 }) }, [pathname])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WaFloat />
      <Toast />
    </div>
  )
}
