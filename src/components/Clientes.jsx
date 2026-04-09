import styles from './Clientes.module.css'

const clientes = [
  { src: '/Movescol.jpeg',      alt: 'Movescol',                  nombre: 'Movescol'                  },
  { src: '/Arquitectura.jpeg',  alt: 'Arquitectura de Proyectos',  nombre: 'Arquitectura de Proyectos' },
  { src: '/Rosdel.jpeg',        alt: 'Rosdel',                    nombre: 'Rosdel'                    },
  { src: '/CF aero.jpeg',       alt: 'CF Aero',                   nombre: 'CF Aero'                   },
  { src: '/Satena.jpeg',        alt: 'Satena',                    nombre: 'Satena'                    },
  { src: '/Automunich.jpeg',    alt: 'Automunich',                nombre: 'Automunich'                },
  { src: '/Ford.jpg',           alt: 'Ford',                      nombre: 'Ford'                      },
  { src: '/Habib.jpg',          alt: 'Habib Droguería',           nombre: 'Habib Droguería'           },
]
export default function Clientes() {
  return (
    <section id="clientes" className={styles.section}>

      <div className={styles.eyebrow}>
        <span className={styles.line} />
        <span className={styles.eyebrowText}>Nuestros aliados</span>
        <span className={styles.line} />
      </div>

      <h2 className={styles.title}>
        Empresas que <em>confían</em><br />en Cazamoda
      </h2>

      <p className={styles.subtitle}>
        Vistiendo a las organizaciones más importantes de la región con
        prendas que comunican identidad y profesionalismo.
      </p>

      <div className={styles.stats}>
        {[
          { num: '50+',   label: 'Clientes activos'      },
          { num: '10',   label: 'Años de experiencia'   },
          { num: '100%', label: 'Satisfacción'          },
        ].map(s => (
          <div key={s.label} className={styles.stat}>
            <span className={styles.statNum}>{s.num}</span>
            <span className={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </div>

      <div className={styles.grid}>
        {clientes.map(c => (
          <div key={c.alt} className={styles.cell}>
            <img src={c.src} alt={c.alt} className={styles.logo} />
            <span className={styles.nombre}>{c.nombre}</span>
          </div>
        ))}
      </div>

      <div className={styles.cta}>
        <p className={styles.ctaText}>
          ¿Tu empresa quiere vestir con <em>distinción</em>?
        </p>
        <a href="#contacto" className={styles.ctaBtn}>
          Hablemos de tu proyecto
        </a>
      </div>

    </section>
  )
}
