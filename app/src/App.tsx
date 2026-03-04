import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Producteurs from './pages/Producteurs'
import Acheteurs from './pages/Acheteurs'
import Marche from './pages/Marche'
import Contact from './pages/Contact'
import Rejoindre from './pages/Rejoindre'
import Connexion from './pages/Connexion'
import Inscription from './pages/Inscription'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true,         element: <Home /> },
      { path: 'producteurs', element: <Producteurs /> },
      { path: 'acheteurs',   element: <Acheteurs /> },
      { path: 'marche',      element: <Marche /> },
      { path: 'contact',     element: <Contact /> },
    ],
  },
  { path: '/rejoindre',  element: <Rejoindre /> },
  { path: '/connexion',  element: <Connexion /> },
  { path: '/inscription', element: <Inscription /> },
])

export default function App() {
  return <RouterProvider router={router} />
}
