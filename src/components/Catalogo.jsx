import { useState, useEffect, useCallback } from 'react'
import { useReveal } from '../hooks/useReveal'
import { useProductos } from '../context/ProductosContext'
import styles from './Catalogo.module.css'

const WHATSAPP_NUMBER = '573001281861'

const filtersHombre = ['Todo', 'Camisas', 'Jeans', 'Chaquetas', 'Conjuntos']
const filtersMujer  = ['Todo', 'Blusas', 'Shorts', 'Vestidos', 'Camisas']

export default function Catalogo() {
  const { productos } = useProductos()
  const [genero, setGenero]         = useState('Hombre')
  const [active, setActive]         = useState('Todo')
  const [modalOpen, setModalOpen]   = useState(false)
  const [modalIndex, setModalIndex] = useState(0)
  const [modalItems, setModalItems] = useState([])
  const [formOpen, setFormOpen]     = useState(false)
  const [formError, setFormError]   = useState(false)
  const [loading, setLoading]       = useState(false)

  const [datos, setDatos] = useState({
    nombre: '', telefono: '', cedula: '', prenda: '', precio: '', direccion: ''
  })

  const headerRef = useReveal()
  const gridRef   = useReveal()

  const filters = genero === 'Hombre' ? filtersHombre : filtersMujer

  const cambiarGenero = (g) => {
    setGenero(g)
    setActive('Todo')
  }

  const disponibles = productos.filter(p => p.disponible && (p.genero === genero || !p.genero))

  const visible = active === 'Todo'
    ? disponibles
    : disponibles.filter(p => p.category === active)

  const openModal = (product) => {
    const siblings = disponibles.filter(p => p.category === product.category)
    const idx = siblings.findIndex(p => p.id === product.id)
    setModalItems(siblings)
    setModalIndex(idx)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setFormOpen(false)
    setFormError(false)
    setLoading(false)
  }

  const prev = useCallback(() => {
    setModalIndex(i => (i - 1 + modalItems.length) % modalItems.length)
  }, [modalItems.length])

  const next = useCallback(() => {
    setModalIndex(i => (i + 1) % modalItems.length)
  }, [modalItems.length])

  useEffect(() => {
    if (!modalOpen) return
    const handler = (e) => {
      if (e.key === 'Escape')     closeModal()
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [modalOpen, prev, next])

  useEffect(() => {
    document.body.style.overflow = modalOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [modalOpen])

  const current = modalItems[modalIndex]

  const abrirFormulario = () => {
    setDatos(prev => ({
      ...prev,
      prenda: current?.name || '',
      precio: current?.precioMin
        ? `$${Number(current.precioMin).toLocaleString('es-CO')}`
        : ''
    }))
    setFormOpen(true)
    setFormError(false)
  }

  const handleChange = (e) =>
    setDatos(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const enviarWhatsApp = () => {
    if (Object.values(datos).some(v => !v.trim())) {
      setFormError(true)
      return
    }
    setLoading(true)
    const msg =
      `*Nuevo pedido*\n` +
      `Nombre: ${datos.nombre}\n` +
      `Teléfono: ${datos.telefono}\n` +
      `Cédula: ${datos.cedula}\n` +
      `Prenda: ${datos.prenda}\n` +
      `Precio: ${datos.precio}\n` +
      `Dirección: ${datos.direccion}`

    setTimeout(() => {
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
        '_blank'
      )
      setLoading(false)
      closeModal()
      setDatos({ nombre: '', telefono: '', cedula: '', prenda: '', precio: '', direccion: '' })
    }, 2000)
  }

  return (
    <>
      <section id="catalogo" className={styles.section}>
        <div ref={headerRef} className={`${styles.header} reveal`}>
          <span className={styles.tag}>Nuestras prendas</span>
          <h2 className={styles.title}>Catálogo</h2>
          <span className={styles.line} />
        </div>

        {/* Selector Hombre / Mujer */}
        <div className={styles.generoSelector}>
          <button
            className={`${styles.generoBtn} ${genero === 'Hombre' ? styles.generoActive : ''}`}
            onClick={() => cambiarGenero('Hombre')}
          >
            Hombre
          </button>
          <button
            className={`${styles.generoBtn} ${genero === 'Mujer' ? styles.generoActive : ''}`}
            onClick={() => cambiarGenero('Mujer')}
          >
            Mujer
          </button>
        </div>

        {/* Filtros por categoría */}
        <div className={styles.filters}>
          {filters.map(f => (
            <button
              key={f}
              className={`${styles.filterBtn} ${active === f ? styles.filterActive : ''}`}
              onClick={() => setActive(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div ref={gridRef} className={`${styles.grid} reveal`}>
          {visible.length === 0 ? (
            <p style={{ color: '#888', gridColumn: '1/-1', textAlign: 'center', padding: '2rem' }}>
              No hay productos disponibles en esta categoría.
            </p>
          ) : (
            visible.map(p => (
              <div key={p.id} className={styles.card} onClick={() => openModal(p)}>
                {p.tag && <span className={styles.cardTag}>{p.tag}</span>}
                <img src={p.img} alt={p.name} loading="lazy" />
                <div className={styles.overlay}>
                  <div>
                    <h3>{p.name}</h3>
                    <p>{p.desc}</p>
                    {p.precioMin && (
                      <span className={styles.cardPrice}>
                        ${Number(p.precioMin).toLocaleString('es-CO')}
                      </span>
                    )}
                  </div>
                  <span className={styles.viewIcon}>⊕</span>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {modalOpen && current && (
        <div className={styles.modalBackdrop} onClick={closeModal}>
          <div className={styles.modalBox} onClick={e => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={closeModal}>✕</button>
            <div className={styles.modalMain}>
              <img src={current.img} alt={current.name} className={styles.modalImg} />
            </div>
            <div className={styles.modalInfo}>
              <h3 className={styles.modalName}>{current.name}</h3>
              {!formOpen ? (
                <button className={styles.boldBtn} onClick={abrirFormulario}>
                  Pedir por WhatsApp
                </button>
              ) : (
                <div className={styles.waForm}>
                  <p className={styles.waTitle}>Confirmación de pedido</p>
                  {Object.keys(datos).map(key => (
                    <div key={key} className={styles.waField}>
                      <label>{key}</label>
                      <input name={key} value={datos[key]} onChange={handleChange} />
                    </div>
                  ))}
                  {formError && (
                    <p className={styles.waError}>Por favor completa todos los campos.</p>
                  )}
                  <div className={styles.waActions}>
                    <button className={styles.boldBtn} onClick={() => setFormOpen(false)}>
                      Cancelar
                    </button>
                    <button className={styles.boldBtn} onClick={enviarWhatsApp} disabled={loading}>
                      {loading ? 'Enviando...' : 'Confirmar pedido'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
