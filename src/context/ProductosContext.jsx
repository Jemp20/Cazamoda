import { createContext, useContext, useState, useEffect } from 'react'

const KEY = 'cazamoda_productos'

const DEFAULT_PRODUCTS = [
  { id: '1', name: 'Camisa Clásica',     category: 'Camisas',   genero: 'Hombre', tag: 'Nuevo',   desc: 'Confección a medida', precioMin: 40000, img: '/Camisa.jpg', disponible: true },
  { id: '2', name: 'Jean Urbano',         category: 'Jeans',     genero: 'Hombre', tag: '',        desc: 'Confort fit',         precioMin: 55000, img: '/Jean-Urbano.jpg', disponible: true },
  { id: '3', name: 'Chaqueta Premium',    category: 'Chaquetas', genero: 'Hombre', tag: 'Popular', desc: 'Edición limitada',    precioMin: 90000, img: '/Chaqueta-Premium.jpg', disponible: true },
  { id: '4', name: 'Conjunto Casual',     category: 'Conjuntos', genero: 'Hombre', tag: '',        desc: 'Tendencia',           precioMin: 70000, img: '/Conjunto-Casual.jpg', disponible: true },
  { id: '5', name: 'Vestido Moderno',     category: 'Vestidos',  genero: 'Mujer',  tag: '',        desc: 'Diseño exclusivo',    precioMin: 65000, img: '/Vestido-Moderno.jpg', disponible: true },
  { id: '6', name: 'Blusa Contemporánea', category: 'Blusas',    genero: 'Mujer',  tag: 'Nuevo',   desc: 'Tallas disponibles',  precioMin: 35000, img: '/Blusa-Contemporánea.jpg', disponible: true },
  { id: '7', name: 'Short Casual',        category: 'Shorts',    genero: 'Mujer',  tag: '',        desc: 'Cómodo y moderno',    precioMin: 30000, img: '/Short-Casual.jpg', disponible: true },
  { id: '8', name: 'Camisa Mujer',        category: 'Camisas',   genero: 'Mujer',  tag: '',        desc: 'Estilo femenino',     precioMin: 38000, img: '/Camisa-Mujer.jpg', disponible: true },
]

const ProductosContext = createContext(null)

export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState(() => {
    try {
      const data = localStorage.getItem(KEY)
      if (data) {
        const parsed = JSON.parse(data)
        // Asignar 'Hombre' automáticamente a productos sin género
        return parsed.map(p => ({ ...p, genero: p.genero || 'Hombre' }))
      }
    } catch {}
    return DEFAULT_PRODUCTS
  })

  // Guardar en localStorage cuando cambian los productos
  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(productos))
  }, [productos])

  // Escuchar cambios desde otras pestañas (Admin → Catálogo)
  useEffect(() => {
    const handler = (e) => {
      if (e.key === KEY && e.newValue) {
        try {
          setProductos(JSON.parse(e.newValue))
        } catch {}
      }
    }
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }, [])

  const agregar = (prod) =>
    setProductos(prev => [...prev, { ...prod, id: Date.now().toString(), disponible: true }])

  const eliminar = (id) =>
    setProductos(prev => prev.filter(p => p.id !== id))

  const toggleDisponible = (id, actual) =>
    setProductos(prev => prev.map(p => p.id === id ? { ...p, disponible: !actual } : p))

  const editar = (id, datos) =>
    setProductos(prev => prev.map(p => p.id === id ? { ...p, ...datos } : p))

  return (
    <ProductosContext.Provider value={{ productos, agregar, eliminar, toggleDisponible, editar }}>
      {children}
    </ProductosContext.Provider>
  )
}

export function useProductos() {
  return useContext(ProductosContext)
}
