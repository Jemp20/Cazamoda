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

const isAdmin = window.location.pathname === '/admin'

export default function App() {
  if (isAdmin) return <Admin />

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
// test deploy after vite fix