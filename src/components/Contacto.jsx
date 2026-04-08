import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import styles from './Contacto.module.css'

const contactItems = [
  { icon: '📍', text: 'Colombia — Calle 77 #67-60', href: null },
  { icon: '📱', text: '+57 300 1281861', href: 'https://wa.me/573001281861' },
  { icon: '📞', text: '605-3964398', href: 'tel:6053964398' },
  { icon: '📸', text: '@cazamoda_confeccion', href: 'https://www.instagram.com/cazamoda_confeccion' },
  { icon: '🕐', text: 'Lunes – Sábado: 8:00am – 5:30pm', href: null },
]

const WHATSAPP_NUMBER = '573001281861' 

export default function Contacto() {
  const infoRef = useReveal()
  const formRef = useReveal()

  const [form, setForm] = useState({ nombre: '', telefono: '', servicio: '', mensaje: '' })
  const [error, setError] = useState('')

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = () => {
    if (!form.nombre.trim() || !form.telefono.trim()) {
      setError('Por favor completa los campos.')
      return
    }
    setError('')

    const texto =
      `Hola, me contacto desde el sitio web de Cazamoda \n\n` +
      `*Nombre:* ${form.nombre}\n` +
      `*Teléfono:* ${form.telefono}\n` +
      `*Servicio de interés:* ${form.servicio || 'No especificado'}\n` +
      `*Mensaje:* ${form.mensaje || 'Sin mensaje adicional'}`

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`
    window.open(url, '_blank')
  }

  return (
    <section id="contacto" className={styles.section}>
      <div ref={infoRef} className={`${styles.info} reveal`}>
        <span className={styles.tag}>Escríbenos</span>
        <h2 className={styles.title}>Hablemos de tu <em>proyecto</em></h2>
        <span className={styles.line} />
        <p className={styles.desc}>
          ¿Necesitas una prenda nueva o quieres arreglar una existente? Contáctanos y
          con gusto te asesoramos. Respondemos rápidamente por WhatsApp.
        </p>
        <div className={styles.items}>
          {contactItems.map(item => (
            <div key={item.text} className={styles.item}>
              <div className={styles.icon}>{item.icon}</div>
              {item.href
                ? <a href={item.href} target="_blank" rel="noreferrer">{item.text}</a>
                : <span>{item.text}</span>
              }
            </div>
          ))}
        </div>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola%2C%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20sus%20servicios`}
          target="_blank"
          rel="noreferrer"
          className={styles.whatsapp}
        >
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Contactar por WhatsApp
        </a>
      </div>

      <div ref={formRef} className={`${styles.form} reveal`}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Nombre</label>
            <input
              type="text"
              name="nombre"
              placeholder="Tu nombre"
              value={form.nombre}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Teléfono</label>
            <input
              type="tel"
              name="telefono"
              placeholder="+57 300 000 0000"
              value={form.telefono}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.formGroup}>
          <label>Servicio de interés</label>
          <select name="servicio" value={form.servicio} onChange={handleChange}>
            <option value="">Selecciona un servicio</option>
            <option>Confección de prenda</option>
            <option>Arreglo de prenda</option>
            <option>Otro</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Mensaje</label>
          <textarea
            name="mensaje"
            rows="5"
            placeholder="Cuéntanos lo que necesitas..."
            value={form.mensaje}
            onChange={handleChange}
          />
        </div>

        {error && <p className={styles.errorMsg}>{error}</p>}

        <button className={styles.submit} onClick={handleSubmit}>
          Enviar mensaje
        </button>
      </div>
    </section>
  )
}
