import Navbar from './Navbar'
import Footer from './Footer'
import styles from './Privacidad.module.css'

// Plantilla reutilizable para páginas legales (mismo diseño que Privacidad)
export default function PaginaLegal({ kicker, titulo, intro, actualizado, secciones }) {
  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <section className={styles.hero}>
          <span className={styles.kicker}>{kicker}</span>
          <h1>{titulo}</h1>
          <p>{intro}</p>
          <p className={styles.updated}>Última actualización: {actualizado}</p>
        </section>
        <section className={styles.content} aria-label={kicker}>
          {secciones.map(s => (
            <article key={s.title} className={styles.card}>
              <h2>{s.title}</h2>
              {s.body.map(t => <p key={t}>{t}</p>)}
            </article>
          ))}
        </section>
      </main>
      <Footer />
    </>
  )
}
