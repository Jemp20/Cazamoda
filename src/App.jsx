import Navbar    from './components/Navbar'
import Hero      from './components/Hero'
import Nosotros  from './components/Nosotros'
import Catalogo  from './components/Catalogo'
import Arreglos  from './components/Arreglos'
import Galeria   from './components/Galeria'
import Clientes  from './components/Clientes'
import Contacto  from './components/Contacto'
import Footer    from './components/Footer'
import Admin     from './components/Admin'
import Privacidad from './components/Privacidad'
import AvisoLegal from './components/AvisoLegal'
import Cookies    from './components/Cookies'
import NotFound   from './components/NotFound'
import CookieBanner  from './components/CookieBanner'
import WhatsAppFloat from './components/WhatsAppFloat'

const path = window.location.pathname.replace(/\/+$/, '') || '/'

const RUTAS = {
  '/admin': Admin,
  '/privacidad': Privacidad,
  '/politica-de-privacidad': Privacidad,
  '/politicas-de-privacidad': Privacidad,
  '/aviso-legal': AvisoLegal,
  '/cookies': Cookies,
  '/politica-de-cookies': Cookies,
}

function Inicio() {
  return (
    <>
      <Navbar />
      <Hero />
      <Nosotros />
      <Catalogo />
      <Arreglos />
      <Galeria />
      <Clientes />
      <Contacto />
      <Footer />
    </>
  )
}

export default function App() {
  const Pagina = path === '/' ? Inicio : RUTAS[path] || NotFound

  // El panel de administración no lleva banner de cookies ni botón de WhatsApp
  if (Pagina === Admin) return <Admin />

  return (
    <>
      <Pagina />
      <WhatsAppFloat />
      <CookieBanner />
    </>
  )
}
