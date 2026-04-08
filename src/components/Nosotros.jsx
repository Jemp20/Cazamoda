import { useReveal } from '../hooks/useReveal'
import styles from './Nosotros.module.css'

const features = [
  { icon: '🏆', title: 'Misión', desc: 'Crear experiencias que logren cumplir las expectativas de nuestros clientes, con ello lograr posicionar a Cazamoda en el mercado del sistema moda con la implementación de sistemas de mejora continua en nuestros procesos y con el uso de tecnologías que nos mantienen a la vanguardia para asi generar beneficios a sus empleados y accionistas.' },
  { icon: '⭐', title: 'Visión de calidad', desc: 'Accionistas y colaboradores de Cazamoda se unen en un mismo sentimiento y deseo de impulsar la empresa a aumentar presencia en el mercado en el que compite actualmente, logrando después la expansión a mercados nacionales y como objetivo central lograr el impulso a nuevos mercados internacionales.' }, 
]

export default function Nosotros() {
  const imgRef   = useReveal()
  const textRef  = useReveal()

  return (
    <section id="nosotros" className={styles.section}>
      <div ref={imgRef} className={`${styles.imgWrap} reveal`}>
        <img
          src="Cazamoda1.jpeg"
          alt="Taller Cazamoda"
        />
        <div className={styles.badge}>
          <div className={styles.badgeNum}>+10</div>
          <div className={styles.badgeText}>Años de pasión</div>
        </div>
      </div>

      <div ref={textRef} className={`${styles.text} reveal`}>
        <div className={styles.header}>
          <span className={styles.tag}>Quiénes somos</span>
          <h2 className={styles.title}><em>CONFECCIONES CAZAMODA SAS</em></h2>
          <span className={styles.line} />
        </div>
        <p className={styles.desc}>
Es una empresa del sistema moda encargada de diseñar, confeccionar y comercializar dotaciones
corporativas y prendas de vestir casuales. Contamos
con personal especializado y capacitado para afrontar
los diferentes retos que nos presenta el mundo
cambiante de la moda, contamos también con equipos
de alta tecnología y materiales de calidad que nos
permiten ser lideres y referentes en el mercado.
El objetivo de fabricar nuestros productos y prestar
nuestros servicios es garantizar resolver las necesidades
y retos que presentan nuestros clientes.
        </p>
        <p className={styles.desc}>
          No solo confeccionamos ropa nueva — también damos nueva vida a tus prendas favoritas
          con nuestro servicio especializado de arreglos y ajustes.
        </p>
        <div className={styles.features}>
          {features.map(f => (
            <div key={f.title} className={styles.featureItem}>
              <div className={styles.featureIcon}>{f.icon}</div>
              <div>
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
