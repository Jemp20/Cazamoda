import styles from './Hero.module.css'

const stats = [
  { num: '+500', label: 'Clientes' },
  { num: '+10',  label: 'Años de experiencia' },
  { num: '100%', label: 'Satisfacción' },
]

const heroImages = [
  { src: '/Imagen3.jpeg', alt: 'Moda Cazamoda', span: true },
  { src: '/Imagen4.jpeg', alt: 'Colección' },
]

export default function Hero() {
  return (
    <section id="inicio" className={styles.hero}>
      <div className={styles.left}>
        <div className={styles.tag}>Confección &amp; Estilo Unisex</div>
        <h1 className={styles.title}>
          Cazamoda<br />Realza <em>tu</em><br />estilo
        </h1>
        <p className={styles.desc}>
          Prendas de confección con calidad artesanal y diseño contemporáneo.
          Creamos ropa que expresa tu identidad, y reparamos las piezas que ya amas.
        </p>
        <div className={styles.actions}>
          <a href="#catalogo" className={styles.btnPrimary}>Ver Catálogo</a>
          <a href="#arreglos" className={styles.btnOutline}>Arreglos</a>
        </div>
        <div className={styles.stats}>
          {stats.map(s => (
            <div key={s.label}>
              <div className={styles.statNum}>{s.num}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.overlay} />
        <div className={styles.imgGrid}>
          {heroImages.map((img, i) => (
            <div key={i} className={`${styles.imgCard} ${img.span ? styles.span : ''}`}>
              <img src={img.src} alt={img.alt} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
