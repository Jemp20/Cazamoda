import { useEffect, useState } from 'react'
import { getConsent, setConsent, cargarAnalitica } from '../analytics'
import styles from './CookieBanner.module.css'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const c = getConsent()
    if (c === 'all') cargarAnalitica()
    if (!c) setVisible(true)
    const reabrir = () => setVisible(true)
    window.addEventListener('cazamoda:cookies', reabrir)
    return () => window.removeEventListener('cazamoda:cookies', reabrir)
  }, [])

  const elegir = valor => {
    setConsent(valor)
    if (valor === 'all') cargarAnalitica()
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className={styles.banner} role="dialog" aria-label="Aviso de cookies">
      <p>
        Usamos almacenamiento técnico necesario para que el sitio funcione. Si aceptas, también medimos las
        visitas de forma anónima para mejorar la página. Más información en nuestra{' '}
        <a href="/cookies">Política de cookies</a>.
      </p>
      <div className={styles.actions}>
        <button className={styles.secondary} onClick={() => elegir('necessary')}>Solo necesarias</button>
        <button className={styles.primary} onClick={() => elegir('all')}>Aceptar</button>
      </div>
    </div>
  )
}
