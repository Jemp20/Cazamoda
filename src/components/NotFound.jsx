import Navbar from './Navbar'
import Footer from './Footer'

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '70vh', display: 'grid', placeItems: 'center', textAlign: 'center', padding: '6rem 1.5rem 3rem' }}>
        <div>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(5rem,20vw,9rem)', color: 'var(--gold)', lineHeight: 1 }}>404</div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, margin: '1rem 0 .6rem' }}>Esta página no existe</h1>
          <p style={{ color: 'var(--mid)', marginBottom: '1.8rem' }}>Puede que el enlace esté roto o que la página haya cambiado de lugar.</p>
          <a href="/" style={{ display: 'inline-block', background: 'var(--charcoal)', color: '#fff', padding: '.85rem 1.8rem', textDecoration: 'none' }}>Volver al inicio</a>
        </div>
      </main>
      <Footer />
    </>
  )
}
