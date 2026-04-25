import { useState, useRef } from 'react'
import { useProductos } from '../context/ProductosContext'
import styles from './Admin.module.css'

const CATEGORIAS_HOMBRE = ['Camisas', 'Jeans', 'Chaquetas', 'Conjuntos', 'Otro']
const CATEGORIAS_MUJER  = ['Blusas', 'Shorts', 'Vestidos', 'Camisas', 'Otro']
const PASS = 'cazamoda2026'

const COLORES_PRESET = [
  { nombre: 'Blanco',    hex: '#FFFFFF' },
  { nombre: 'Negro',     hex: '#111111' },
  { nombre: 'Gris',      hex: '#9E9E9E' },
  { nombre: 'Rojo',      hex: '#D32F2F' },
  { nombre: 'Azul',      hex: '#1565C0' },
  { nombre: 'Azul cielo',hex: '#42A5F5' },
  { nombre: 'Verde',     hex: '#2E7D32' },
  { nombre: 'Verde menta',hex:'#A5D6A7' },
  { nombre: 'Amarillo',  hex: '#F9A825' },
  { nombre: 'Naranja',   hex: '#E64A19' },
  { nombre: 'Rosado',    hex: '#F06292' },
  { nombre: 'Morado',    hex: '#6A1B9A' },
  { nombre: 'Beige',     hex: '#D7CCC8' },
  { nombre: 'Café',      hex: '#5D4037' },
  { nombre: 'Vino',      hex: '#880E4F' },
  { nombre: 'Otro',      hex: '#C9A96E' },
]

const EMPTY = { name: '', genero: 'Hombre', category: 'Camisas', tag: '', desc: '', precioMin: '', img: '', colores: [] }

function comprimirImagen(file) {
  return new Promise((resolve) => {
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
        resolve(canvas.toDataURL('image/jpeg', 0.75))
      }
      img.src = ev.target.result
    }
    reader.readAsDataURL(file)
  })
}

export default function Admin() {
  const [auth, setAuth]             = useState(false)
  const [passInput, setPassInput]   = useState('')
  const [passError, setPassError]   = useState(false)
  const [form, setForm]             = useState(EMPTY)
  const [guardado, setGuardado]     = useState(false)
  const [editandoId, setEditandoId] = useState(null)

  // Panel de color nuevo
  const [colorPanel, setColorPanel]       = useState(false)
  const [colorNombre, setColorNombre]     = useState('')
  const [colorHex, setColorHex]           = useState('#C9A96E')
  const [colorImgPreview, setColorImgPreview] = useState(null)
  const [colorImgData, setColorImgData]   = useState(null)
  const [colorPresetSel, setColorPresetSel] = useState(null)

  const fileRef      = useRef()
  const colorFileRef = useRef()
  const asideRef     = useRef()

  const { productos, agregar, eliminar, toggleDisponible, editar } = useProductos()

  const login = () => {
    if (passInput === PASS) { setAuth(true); setPassError(false) }
    else setPassError(true)
  }

  const categorias = form.genero === 'Mujer' ? CATEGORIAS_MUJER : CATEGORIAS_HOMBRE

  const handleFile = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    const compressed = await comprimirImagen(file)
    setForm(f => ({ ...f, img: compressed }))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(f => {
      const updated = { ...f, [name]: value }
      if (name === 'genero') {
        updated.category = value === 'Mujer' ? CATEGORIAS_MUJER[0] : CATEGORIAS_HOMBRE[0]
      }
      return updated
    })
  }

  // ── Color handlers ──
  const handleColorFile = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    const compressed = await comprimirImagen(file)
    setColorImgData(compressed)
    setColorImgPreview(compressed)
  }

  const seleccionarPreset = (p) => {
    setColorNombre(p.nombre)
    setColorHex(p.hex)
    setColorPresetSel(p.nombre)
  }

  const agregarColor = () => {
    if (!colorNombre.trim() || !colorImgData) return
    const nuevo = { nombre: colorNombre.trim(), hex: colorHex, img: colorImgData }
    setForm(f => {
      const colores = [...(f.colores || []), nuevo]
      return { ...f, colores, img: f.img || colorImgData }
    })
    // reset panel
    setColorNombre('')
    setColorHex('#C9A96E')
    setColorImgPreview(null)
    setColorImgData(null)
    setColorPresetSel(null)
    setColorPanel(false)
    if (colorFileRef.current) colorFileRef.current.value = ''
  }

  const quitarColor = (idx) => {
    setForm(f => {
      const colores = f.colores.filter((_, i) => i !== idx)
      // si era la imagen principal, usar la del primer color restante
      const img = colores.length > 0 ? colores[0].img : f.img
      return { ...f, colores, img }
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
      img: p.img,
      colores: p.colores || []
    })
    setEditandoId(p.id)
    asideRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleCancelarEdicion = () => {
    setForm(EMPTY)
    setEditandoId(null)
    if (fileRef.current) fileRef.current.value = ''
  }

  const handleGuardar = () => {
    if (!form.name.trim()) return
    const imgFinal = form.img || (form.colores?.[0]?.img ?? '')
    if (!editandoId && !imgFinal) return
    const payload = { ...form, img: imgFinal }
    if (editandoId !== null) editar(editandoId, payload)
    else agregar(payload)
    setForm(EMPTY)
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
  const imgPrincipal  = form.img || form.colores?.[0]?.img || null

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

          {/* Foto principal */}
          <div className={styles.photoZone} onClick={() => fileRef.current.click()}>
            {imgPrincipal
              ? <img src={imgPrincipal} alt="preview" className={styles.photoPreview} />
              : <div className={styles.photoPlaceholder}>
                  <span className={styles.photoIcon}>📷</span>
                  <span>Foto principal (o agrega un color abajo)</span>
                </div>
            }
          </div>
          <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />

          {/* Campos básicos */}
          <div className={styles.field}>
            <label>Nombre de la prenda *</label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Ej: Camisa lino" />
          </div>
          <div className={styles.field}>
            <label>Género</label>
            <select name="genero" value={form.genero} onChange={handleChange}>
              <option value="Hombre">Hombre</option>
              <option value="Mujer">Mujer</option>
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

          {/* ── SECCIÓN DE COLORES ── */}
          <div className={styles.colorSection}>
            <div className={styles.colorSectionHeader}>
              <span className={styles.colorSectionTitle}>🎨 Variantes por color</span>
              <span className={styles.colorSectionSub}>
                {form.colores?.length > 0 ? `${form.colores.length} color(es)` : 'Sin colores'}
              </span>
            </div>

            {/* Lista de colores agregados */}
            {form.colores?.length > 0 && (
              <div className={styles.colorList}>
                {form.colores.map((c, i) => (
                  <div key={i} className={styles.colorItem}>
                    <img src={c.img} alt={c.nombre} className={styles.colorThumb} />
                    <div className={styles.colorItemInfo}>
                      <div className={styles.colorSwatch} style={{ background: c.hex }} />
                      <span className={styles.colorItemName}>{c.nombre}</span>
                    </div>
                    <button className={styles.colorRemove} onClick={() => quitarColor(i)}>✕</button>
                  </div>
                ))}
              </div>
            )}

            {/* Botón para abrir panel */}
            {!colorPanel && (
              <button className={styles.addColorBtn} onClick={() => setColorPanel(true)}>
                + Agregar color
              </button>
            )}

            {/* Panel nuevo color */}
            {colorPanel && (
              <div className={styles.colorPanel}>
                <p className={styles.colorPanelTitle}>Nuevo color</p>

                {/* Presets */}
                <div className={styles.colorPresets}>
                  {COLORES_PRESET.map(p => (
                    <button
                      key={p.nombre}
                      title={p.nombre}
                      className={`${styles.presetDot} ${colorPresetSel === p.nombre ? styles.presetActive : ''}`}
                      style={{ background: p.hex, border: p.hex === '#FFFFFF' ? '1px solid #ccc' : 'none' }}
                      onClick={() => seleccionarPreset(p)}
                    />
                  ))}
                </div>

                <div className={styles.colorRow}>
                  <div className={styles.field} style={{ flex: 1 }}>
                    <label>Nombre del color</label>
                    <input
                      value={colorNombre}
                      onChange={e => setColorNombre(e.target.value)}
                      placeholder="Ej: Rojo"
                    />
                  </div>
                  <div className={styles.field} style={{ flex: '0 0 56px' }}>
                    <label>Color</label>
                    <input
                      type="color"
                      value={colorHex}
                      onChange={e => { setColorHex(e.target.value); setColorPresetSel(null) }}
                      className={styles.colorPicker}
                    />
                  </div>
                </div>

                <div
                  className={styles.colorPhotoZone}
                  onClick={() => colorFileRef.current.click()}
                >
                  {colorImgPreview
                    ? <img src={colorImgPreview} alt="color preview" className={styles.colorPhotoPreview} />
                    : <div className={styles.colorPhotoPlaceholder}>
                        <span>📷</span>
                        <span>Foto para este color</span>
                      </div>
                  }
                </div>
                <input ref={colorFileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleColorFile} />

                <div className={styles.colorPanelActions}>
                  <button className={styles.cancelBtn} onClick={() => { setColorPanel(false); setColorImgPreview(null); setColorImgData(null); setColorNombre(''); setColorPresetSel(null) }}>
                    Cancelar
                  </button>
                  <button
                    className={styles.addBtn}
                    onClick={agregarColor}
                    disabled={!colorNombre.trim() || !colorImgData}
                    style={{ flex: 1, marginTop: 0 }}
                  >
                    Confirmar color
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            className={styles.addBtn}
            onClick={handleGuardar}
            disabled={!form.name.trim() || (!editandoId && !imgPrincipal && !(form.colores?.length > 0))}
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
                  {/* Swatches de colores en la tarjeta admin */}
                  {p.colores?.length > 0 && (
                    <div className={styles.cardColorDots}>
                      {p.colores.map((c, i) => (
                        <span
                          key={i}
                          title={c.nombre}
                          className={styles.cardColorDot}
                          style={{ background: c.hex, border: c.hex === '#FFFFFF' ? '1px solid #ccc' : 'none' }}
                        />
                      ))}
                    </div>
                  )}
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
                    {p.colores?.length > 0 && (
                      <span className={styles.cardColoresInfo}>
                        {p.colores.length} color{p.colores.length > 1 ? 'es' : ''}
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
