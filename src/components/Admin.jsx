import { useState, useRef } from 'react'
import { useProductos } from '../context/ProductosContext'
import styles from './Admin.module.css'

const CATEGORIAS_HOMBRE      = ['Camisas', 'Jeans', 'Chaquetas', 'Conjuntos', 'Camisa', 'Pantalón', 'Bermuda', 'Camisetas', 'Polo', 'Saco', 'Otro']
const CATEGORIAS_MUJER       = ['Blusas', 'Shorts', 'Vestidos', 'Camisas', 'Pantalón', 'Camisa', 'Falda', 'Short', 'Vestido', 'Enterizo', 'Otro']
const CATEGORIAS_CORPORATIVO = ['Administrativo', 'Operativo e Industrial', 'Hospitalarios', 'Hostelería', 'Servicio General', 'Promo Colegiales']

const PASS = 'cazamoda2026'

const EMPTY = { name: '', genero: 'Hombre', category: 'Camisas', tag: '', desc: '', precioMin: '', img: '' }

export default function Admin() {
  const [auth, setAuth]             = useState(false)
  const [passInput, setPassInput]   = useState('')
  const [passError, setPassError]   = useState(false)
  const [form, setForm]             = useState(EMPTY)
  const [preview, setPreview]       = useState(null)
  const [guardado, setGuardado]     = useState(false)
  const [editandoId, setEditandoId] = useState(null)
  const fileRef  = useRef()
  const asideRef = useRef()

  const { productos, agregar, eliminar, toggleDisponible, editar } = useProductos()

  const login = () => {
    if (passInput === PASS) { setAuth(true); setPassError(false) }
    else setPassError(true)
  }

  const categorias =
    form.genero === 'Mujer'       ? CATEGORIAS_MUJER       :
    form.genero === 'Corporativo' ? CATEGORIAS_CORPORATIVO :
    CATEGORIAS_HOMBRE

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const img = new Image()
      img.onload = () => {
        const MAX = 800
        let w = img.width, h = img.height
        if (w > MAX) { h = Math.round((h * MAX) / w); w = MAX }
        const canvas = document.createElement('canvas')
        canvas.width = w; canvas.height = h
        canvas.getContext('2d').drawImage(img, 0, 0, w, h)
        const compressed = canvas.toDataURL('image/jpeg', 0.75)
        setPreview(compressed)
        setForm(f => ({ ...f, img: compressed }))
      }
      img.src = ev.target.result
    }
    reader.readAsDataURL(file)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(f => {
      const updated = { ...f, [name]: value }
      if (name === 'genero') {
        updated.category =
          value === 'Mujer'       ? CATEGORIAS_MUJER[0]       :
          value === 'Corporativo' ? CATEGORIAS_CORPORATIVO[0] :
          CATEGORIAS_HOMBRE[0]
      }
      return updated
    })
  }

  const handleEditar = (p) => {
    setForm({
      name: p.name,
      genero: p.genero || 'Hombre',
      category: p.category,
      tag: p.tag || '',
      desc: p.desc || '',
      precioMin: p.precioMin || '',
      img: p.img
    })
    setPreview(p.img)
    setEditandoId(p.id)
    asideRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleCancelarEdicion = () => {
    setForm(EMPTY)
    setPreview(null)
    setEditandoId(null)
    if (fileRef.current) fileRef.current.value = ''
  }

  const handleGuardar = () => {
    if (!form.name.trim()) return
    if (editandoId !== null) {
      editar(editandoId, form)
    } else {
      if (!form.img) return
      agregar(form)
    }
    setForm(EMPTY)
    setPreview(null)
    setEditandoId(null)
    if (fileRef.current) fileRef.current.value = ''
    setGuardado(true)
    setTimeout(() => setGuardado(false), 2500)
  }

  if (!auth) return (
    <div className={styles.loginWrap}>
      <div className={styles.loginBox}>
        <div className={styles.loginLogo}>Cazamoda</div>
        <p className={styles.loginSub}>Panel de administración</p>
        <input
          className={styles.loginInput}
          type="password"
          placeholder="Contraseña"
          value={passInput}
          onChange={e => setPassInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && login()}
        />
        {passError && <p className={styles.loginError}>Contraseña incorrecta</p>}
        <button className={styles.loginBtn} onClick={login}>Entrar</button>
      </div>
    </div>
  )

  const disponibles   = productos.filter(p => p.disponible).length
  const noDisponibles = productos.length - disponibles

  return (
    <div className={styles.wrap}>
      <header className={styles.header}>
        <div className={styles.headerBrand}>Cazamoda <span>Admin</span></div>
        <div className={styles.stats}>
          <div className={styles.stat}><span>{disponibles}</span>Disponibles</div>
          <div className={styles.stat}><span>{noDisponibles}</span>No disponibles</div>
          <div className={styles.stat}><span>{productos.length}</span>Total</div>
        </div>
        <a href="/" className={styles.verSitio}>← Ver sitio</a>
      </header>

      <div className={styles.body}>
        <aside ref={asideRef} className={styles.aside}>
          <h2 className={styles.asideTitle}>
            {editandoId ? '✏️ Editando prenda' : 'Agregar prenda'}
          </h2>

          <div className={styles.photoZone} onClick={() => fileRef.current.click()}>
            {preview
              ? <img src={preview} alt="preview" className={styles.photoPreview} />
              : <div className={styles.photoPlaceholder}>
                  <span className={styles.photoIcon}>📷</span>
                  <span>Toca para subir foto</span>
                </div>
            }
          </div>
          <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />

          <div className={styles.field}>
            <label>Nombre de la prenda</label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Ej: Camisa lino blanco" />
          </div>

          <div className={styles.field}>
            <label>Opción</label>
            <select name="genero" value={form.genero} onChange={handleChange}>
              <option value="Hombre">Hombre</option>
              <option value="Mujer">Mujer</option>
              <option value="Corporativo">Línea Corporativa</option>
            </select>
          </div>

          <div className={styles.field}>
            <label>Categoría</label>
            <select name="category" value={form.category} onChange={handleChange}>
              {categorias.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div className={styles.field}>
            <label>Descripción</label>
            <input name="desc" value={form.desc} onChange={handleChange} placeholder="Ej: Talla M · Unisex" />
          </div>

          <div className={styles.field}>
            <label>Precio</label>
            <input name="precioMin" type="number" value={form.precioMin} onChange={handleChange} placeholder="Ej: 70000" />
          </div>

          <div className={styles.field}>
            <label>Etiqueta <small>(opcional)</small></label>
            <input name="tag" value={form.tag} onChange={handleChange} placeholder="Ej: Nuevo / Popular" />
          </div>

          <button
            className={styles.addBtn}
            onClick={handleGuardar}
            disabled={!form.name.trim() || (!editandoId && !form.img)}
          >
            {guardado ? '✓ Guardado!' : editandoId ? 'Guardar cambios' : '+ Agregar al catálogo'}
          </button>

          {editandoId && (
            <button className={styles.cancelBtn} onClick={handleCancelarEdicion}>
              Cancelar edición
            </button>
          )}
        </aside>

        <main className={styles.main}>
          <h2 className={styles.mainTitle}>Prendas en el catálogo</h2>
          <div className={styles.grid}>
            {productos.map(p => (
              <div
                key={p.id}
                className={`${styles.card} ${!p.disponible ? styles.cardOff : ''} ${editandoId === p.id ? styles.cardEditing : ''}`}
              >
                <div className={styles.cardImg}>
                  <img src={p.img} alt={p.name} />
                  {!p.disponible && <div className={styles.cardBadgeOff}>No disponible</div>}
                  {p.tag && p.disponible && <div className={styles.cardBadge}>{p.tag}</div>}
                </div>
                <div className={styles.cardInfo}>
                  <div className={styles.cardMeta}>
                    <span className={styles.cardCat}>{p.genero} · {p.category}</span>
                    <span className={styles.cardName}>{p.name}</span>
                    {p.desc && <span className={styles.cardDesc}>{p.desc}</span>}
                    {p.precioMin && (
                      <span className={styles.cardPrice}>
                        ${Number(p.precioMin).toLocaleString('es-CO')}
                      </span>
                    )}
                  </div>
                  <div className={styles.cardActions}>
                    <button
                      className={`${styles.toggleBtn} ${p.disponible ? styles.toggleOn : styles.toggleOff}`}
                      onClick={() => toggleDisponible(p.id, p.disponible)}
                    >
                      {p.disponible ? 'Disponible ✓' : 'Activar'}
                    </button>
                    <button className={styles.editBtn} onClick={() => handleEditar(p)}>✏️</button>
                    <button className={styles.deleteBtn} onClick={() => eliminar(p.id)}>🗑</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}