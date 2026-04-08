import { useReveal } from '../hooks/useReveal'
import styles from './Galeria.module.css'

const photos = [
  'Foto3.jpg',
  'Foto20.jpg',
  'Foto1.jpeg',
  'Foto4.jpeg',
  'Foto9.jpeg',
  'Foto6.jpeg',
  'Foto8.jpeg',
  'Foto10.jpeg',
]

export default function Galeria() {
  const gridRef = useReveal()

  return (
    <section id="galeria" className={styles.section}>
      <div className={styles.header}>
        <span className={styles.tag}>Nuestro trabajo</span>
        <h2 className={styles.title}>Galería de <em>Inspiración</em></h2>
        <span className={styles.line} />
      </div>

      <div ref={gridRef} className={`${styles.masonry} reveal`}>
        {photos.map((src, i) => (
          <div key={i} className={styles.item}>
            <img src={src} alt={`Galería ${i + 1}`} />
            <div className={styles.hover}><span>+</span></div>
          </div>
        ))}
      </div>
    </section>
  )
}
