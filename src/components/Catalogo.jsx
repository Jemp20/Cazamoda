import { useState, useEffect, useCallback } from 'react'
import { useReveal } from '../hooks/useReveal'
import { useProductos } from '../context/ProductosContext'
import styles from './Catalogo.module.css'

const WHATSAPP_NUMBER = '573001281861'

const filtersHombre      = ['Todo', 'Camisas', 'Jeans', 'Chaquetas', 'Conjuntos', 'Camisa', 'Pantalón', 'Bermuda', 'Camisetas', 'Polo', 'Saco']
const filtersMujer       = ['Todo', 'Blusas', 'Shorts', 'Vestidos', 'Camisas', 'Pantalón', 'Camisa', 'Falda', 'Short', 'Vestido', 'Enterizo']
const filtersCorporativo = ['Todo', 'Administrativo', 'Operativo e Industrial', 'Hospitalarios', 'Hostelería', 'Servicio General', 'Promo Colegiales']

function ProductCard({ p, onClick }) {
  const hasColors = p.colores && p.colores.length > 0
  const [colorIdx, setColorIdx] = useState(0)
  const imgActual = hasColors ? p.colores[colorIdx].img : p.img
  const colorActual = hasColors ? p.colores[colorIdx] : null

  const handleSwatchClick = (e, i) => {
    e.stopPropagation()
    setColorIdx(i)
  }

  return (
    <div className={styles.card} onClick={() => onClick(p, colorIdx)}>
      <div className={styles.imgWrap}>
        {p.tag && <span className={styles.cardTag}>{p.tag}</span>}
        <img src={imgActual} alt={p.name} loading="lazy" />
        {hasColors && (
          <div className={styles.cardSwatches}>
            {p.colores.map((c, i) => (
              <button
                key={i}
                title={c.nombre}
                className={`${styles.cardSwatch} ${colorIdx === i ? styles.cardSwatchActive : ''}`}
                style={{ background: c.hex, border: c.hex === '#FFFFFF' ? '1px solid rgba(0,0,0,0.2)' : 'none' }}
                onClick={(e) => handleSwatchClick(e, i)}
              />
            ))}
          </div>
        )}
        <div className={styles.overlay}>
          <span className={styles.viewIcon}>⊕</span>
        </div>
      </div>
      <div className={styles.cardInfo}>
        <span className={styles.cardName}>{p.name}</span>
        {colorActual && <span className={styles.cardColorName}>{colorActual.nombre}</span>}
        {p.precioMin && (
          <span className={styles.cardInfoPrice}>
            ${Number(p.precioMin).toLocaleString('es-CO')}
          </span>
        )}
      </div>
    </div>
  )
}

export default function Catalogo() {
  const { productos } = useProductos()
  const [genero, setGenero]               = useState('Hombre')
  const [active, setActive]               = useState('Todo')
  const [modalOpen, setModalOpen]         = useState(false)
  const [modalIndex, setModalIndex]       = useState(0)
  const [modalItems, setModalItems]       = useState([])
  const [modalColorIdx, setModalColorIdx] = useState(0)
  const [tallaSeleccionada, setTallaSeleccionada] = useState(null)
  const [formOpen, setFormOpen]           = useState(false)
  const [formError, setFormError]         = useState(false)
  const [tallaError, setTallaError]       = useState(false)
  const [loading, setLoading]             = useState(false)

  const [datos, setDatos] = useState({
    nombre: '', telefono: '', cedula: '', prenda: '', precio: '', direccion: ''
  })

  const headerRef = useReveal()
  const gridRef   = useReveal()

  const isCorporativo = genero === 'Corporativo'

  const filters = genero === 'Hombre'
    ? filtersHombre
    : genero === 'Mujer'
    ? filtersMujer
    : filtersCorporativo

  const cambiarGenero = (g) => { setGenero(g); setActive('Todo') }

  const disponibles = productos.filter(p => p.disponible && (p.genero === genero || !p.genero))
  const visible = active === 'Todo'
    ? disponibles
    : disponibles.filter(p => p.category === active)

  const openModal = (product, colorIdx = 0) => {
    const siblings = disponibles.filter(p => p.category === product.category)
    const idx = siblings.findIndex(p => p.id === product.id)
    setModalItems(siblings)
    setModalIndex(idx)
    setModalColorIdx(colorIdx)
    setTallaSeleccionada(null)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setFormOpen(false)
    setFormError(false)
    setTallaError(false)
    setLoading(false)
    setTallaSeleccionada(null)
  }

  const prev = useCallback(() => {
    setModalIndex(i => (i - 1 + modalItems.length) % modalItems.length)
    setModalColorIdx(0)
    setTallaSeleccionada(null)
  }, [modalItems.length])

  const next = useCallback(() => {
    setModalIndex(i => (i + 1) % modalItems.length)
    setModalColorIdx(0)
    setTallaSeleccionada(null)
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

  const current          = modalItems[modalIndex]
  const hasColors        = current?.colores?.length > 0
  const colorModalActual = hasColors ? current.colores[modalColorIdx] : null
  const imgModal         = hasColors ? colorModalActual.img : current?.img

  // Tallas: si tiene colores, usa las del color seleccionado; si no, las generales
  const tallasActuales = hasColors
    ? (colorModalActual?.tallas || [])
    : (current?.tallas || [])

  const hasTallas = tallasActuales.length > 0

  // Resetear talla cuando cambia el color
  const handleColorChange = (i) => {
    setModalColorIdx(i)
    setTallaSeleccionada(null)
    setTallaError(false)
  }

  const abrirFormulario = () => {
    if (hasTallas && !tallaSeleccionada) {
      setTallaError(true)
      return
    }
    setTallaError(false)
    const colorInfo = colorModalActual ? ` — ${colorModalActual.nombre}` : ''
    const tallaInfo = tallaSeleccionada ? ` — Talla ${tallaSeleccionada}` : ''
    setDatos(prev => ({
      ...prev,
      prenda: (current?.name || '') + colorInfo + tallaInfo,
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
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank')
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

        <div className={styles.generoSelector}>
          <button className={`${styles.generoBtn} ${genero === 'Hombre' ? styles.generoActive : ''}`} onClick={() => cambiarGenero('Hombre')}>Hombre</button>
          <button className={`${styles.generoBtn} ${genero === 'Mujer' ? styles.generoActive : ''}`} onClick={() => cambiarGenero('Mujer')}>Mujer</button>
          <button className={`${styles.generoBtn} ${styles.generoBtnCorp} ${genero === 'Corporativo' ? styles.generoActive : ''}`} onClick={() => cambiarGenero('Corporativo')}>Línea Corporativa</button>
        </div>

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
              {isCorporativo
                ? 'Próximamente productos de línea corporativa. Contáctanos por WhatsApp para cotizar.'
                : 'No hay productos disponibles en esta categoría.'}
            </p>
          ) : (
            visible.map(p => <ProductCard key={p.id} p={p} onClick={openModal} />)
          )}
        </div>
      </section>

      {modalOpen && current && (
        <div className={styles.modalBackdrop} onClick={closeModal}>
          <div className={styles.modalBox} onClick={e => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={closeModal}>✕</button>
            <div className={styles.modalMain}>
              <img src={imgModal} alt={current.name} className={styles.modalImg} />
            </div>
            <div className={styles.modalInfo}>
              <h3 className={styles.modalName}>{current.name}</h3>

              {current.precioMin && (
                <p className={styles.modalPrice}>
                  ${Number(current.precioMin).toLocaleString('es-CO')}
                </p>
              )}

              {/* Selector de color */}
              {hasColors && (
                <div className={styles.modalColors}>
                  <p className={styles.modalColorsLabel}>
                    Color: <strong>{colorModalActual?.nombre}</strong>
                  </p>
                  <div className={styles.modalSwatches}>
                    {current.colores.map((c, i) => (
                      <button
                        key={i}
                        title={c.nombre}
                        className={`${styles.modalSwatch} ${modalColorIdx === i ? styles.modalSwatchActive : ''}`}
                        style={{ background: c.hex, border: c.hex === '#FFFFFF' ? '1px solid rgba(255,255,255,0.3)' : 'none' }}
                        onClick={() => handleColorChange(i)}
                      />
                    ))}
                  </div>
                  <div className={styles.modalColorThumbs}>
                    {current.colores.map((c, i) => (
                      <button
                        key={i}
                        className={`${styles.modalColorThumb} ${modalColorIdx === i ? styles.modalColorThumbActive : ''}`}
                        onClick={() => handleColorChange(i)}
                      >
                        <img src={c.img} alt={c.nombre} />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Selector de talla — cambia según el color seleccionado */}
              {hasTallas && (
                <div className={styles.modalTallas}>
                  <p className={styles.modalTallasLabel}>
                    Talla: <strong>{tallaSeleccionada || 'Selecciona una'}</strong>
                  </p>
                  <div className={styles.modalTallasGrid}>
                    {tallasActuales.map(t => (
                      <button
                        key={t}
                        className={`${styles.modalTallaBtn} ${tallaSeleccionada === t ? styles.modalTallaActive : ''}`}
                        onClick={() => { setTallaSeleccionada(t); setTallaError(false) }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                  {tallaError && <p className={styles.tallaError}>Por favor selecciona una talla</p>}
                </div>
              )}

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
                  {formError && <p className={styles.waError}>Por favor completa todos los campos.</p>}
                  <div className={styles.waActions}>
                    <button className={styles.boldBtn} onClick={() => setFormOpen(false)}>Cancelar</button>
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
