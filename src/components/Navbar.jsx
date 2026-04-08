import styles from './Navbar.module.css'

const links = [
  { href: '#nosotros', label: 'Nosotros'  },
  { href: '#catalogo', label: 'Catálogo'  },
  { href: '#arreglos', label: 'Arreglos'  },
  { href: '#galeria',  label: 'Galería'   },
  { href: '#clientes', label: 'Clientes'  },
  { href: '#contacto', label: 'Contacto'  },
]

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <a href="#inicio" className={styles.logo}>
        <img src="/Logo.png.jpeg" alt="Cazamoda logo" className={styles.logoImg} />
      </a>
      <ul className={styles.links}>
        {links.map(l => (
          <li key={l.href}>
            <a href={l.href}>{l.label}</a>
          </li>
        ))}
      </ul>

      <a
        href="https://wa.me/573001281861?text=Hola%20Cazamoda!%20Estoy%20interesado%20en%20sus%20prendas%20y%20arreglos.%20¿Podrían%20darme%20más%20información?"
        target="_blank"
        rel="noreferrer"
        className={styles.cta}
      >
        WhatsApp
      </a>
    </nav>
  )
}
