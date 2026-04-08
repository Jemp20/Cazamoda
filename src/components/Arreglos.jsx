import { useReveal } from '../hooks/useReveal'
import styles from './Arreglos.module.css'

const servicios = [
  { 
  num: '01', 
  title: 'LÍNEA MODA CASUAL', 
  desc: [
    { sub: '• Diseño y confección de prendas de vestir de moda casual:', txt: 'Confeccionamos prendas de vestir de moda casual para damas y caballeros con el único objetivo de generar exclusividad y elegancia al momento de vestir.' },
    { sub: '• Modificación de prendas:', txt: 'Personalizamos y modificamos prendas de vestir no confeccionadas por nosotros. Que resaltes tu estilo y personalidad, para nosotros es muy importante hacerlo realidad.' },
    { sub: '• Asesorías técnicas en moda casual:', txt: 'Brindamos asesoría a nuestros clientes en el uso de diseños y prendas apropiadas conforme a la ocasión. Que te sientas seguro y a la moda es nuestro principal propósito.' },
  ]
},
  { 
  num: '02', 
  title: 'LÍNEA MODA CORPORATIVA', 
  desc: [
    { sub: '• Diseño y confección de prendas de dotación corporativa: ', txt: 'Diseño y confección de prendas de dotación (pantalones, camisas, faldas, bufandas y corbatas) para los trabajadores de las áreas de apoyo y misionales de micro, pequeñas y medianas empresas.' },
    { sub: '• Asesorías técnicas en moda corporativa: ', txt: 'Asesorar a nuestros clientes en la selección adecuada de telas y diseños acordes al objeto social de la empresa.' },
  ]
}
]

export default function Arreglos() {
  const listRef   = useReveal()
  const visualRef = useReveal()

  return (
    <section id="arreglos" className={styles.section}>
      <div className={styles.header}>
        <span className={styles.tag}>Servicio especializado</span>
        <h2 className={styles.title}>Arreglos de <em>Prendas</em></h2>
        <span className={styles.line} />
      </div>

      <div className={styles.grid}>
        <div ref={listRef} className={`${styles.list} reveal`}>
          {servicios.map(s => (
            <div key={s.num} className={styles.item}>
              <div className={styles.num}>{s.num}</div>
              <div>
                <h3>{s.title}</h3>
{Array.isArray(s.desc)
  ? s.desc.map((d, i) => (
      <p key={i} style={{ marginBottom: '0.6rem' }}>
        <strong>{d.sub}</strong>{d.txt ? ' ' + d.txt : ''}
      </p>
    ))
  : <p>{s.desc}</p>
}
              </div>
            </div>
          ))}
        </div>

        <div ref={visualRef} className={`${styles.visual} reveal`}>
         <video
  src="/videos/Video.mp4.mp4"
  style={{ width: "100%", height: "100%", maxHeight: "500px", objectFit: "cover", borderRadius: "8px" }}
  controls
  playsInline
  loop
  autoPlay
  muted
/>
          <div>
          </div>
        </div>
      </div>
    </section>
  )
}
