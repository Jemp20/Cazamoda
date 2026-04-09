import { createContext, useContext, useState, useEffect } from 'react'
import { db } from '../firebase'
import {
  collection, onSnapshot, addDoc, deleteDoc,
  doc, updateDoc
} from 'firebase/firestore'

const DEFAULT_PRODUCTS = [
  { name: 'Camisa Clásica',     category: 'Camisas',   genero: 'Hombre', tag: 'Nuevo',   desc: 'Confección a medida', precioMin: 40000, img: '/Camisa.jpg', disponible: true },
  { name: 'Jean Urbano',         category: 'Jeans',     genero: 'Hombre', tag: '',        desc: 'Confort fit',         precioMin: 55000, img: '/Jean-Urbano.jpg', disponible: true },
  { name: 'Chaqueta Premium',    category: 'Chaquetas', genero: 'Hombre', tag: 'Popular', desc: 'Edición limitada',    precioMin: 90000, img: '/Chaqueta-Premium.jpg', disponible: true },
  { name: 'Conjunto Casual',     category: 'Conjuntos', genero: 'Hombre', tag: '',        desc: 'Tendencia',           precioMin: 70000, img: '/Conjunto-Casual.jpg', disponible: true },
  { name: 'Vestido Moderno',     category: 'Vestidos',  genero: 'Mujer',  tag: '',        desc: 'Diseño exclusivo',    precioMin: 65000, img: '/Vestido-Moderno.jpg', disponible: true },
  { name: 'Blusa Contemporánea', category: 'Blusas',    genero: 'Mujer',  tag: 'Nuevo',   desc: 'Tallas disponibles',  precioMin: 35000, img: '/Blusa-Contemporánea.jpg', disponible: true },
  { name: 'Short Casual',        category: 'Shorts',    genero: 'Mujer',  tag: '',        desc: 'Cómodo y moderno',    precioMin: 30000, img: '/Short-Casual.jpg', disponible: true },
  { name: 'Camisa Mujer',        category: 'Camisas',   genero: 'Mujer',  tag: '',        desc: 'Estilo femenino',     precioMin: 38000, img: '/Camisa-Mujer.jpg', disponible: true },
]

const ProductosContext = createContext(null)
const COL = 'productos'

export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando]   = useState(true)

  useEffect(() => {
    const unsub = onSnapshot(collection(db, COL), async (snap) => {
      if (snap.empty) {
        // Primera vez: subir productos por defecto a Firestore
        for (const p of DEFAULT_PRODUCTS) {
          await addDoc(collection(db, COL), p)
        }
      } else {
        const data = snap.docs.map(d => ({ id: d.id, ...d.data() }))
        setProductos(data)
        setCargando(false)
      }
    })
    return () => unsub()
  }, [])

  const agregar = (prod) =>
    addDoc(collection(db, COL), { ...prod, disponible: true })

  const eliminar = (id) =>
    deleteDoc(doc(db, COL, id))

  const toggleDisponible = (id, actual) =>
    updateDoc(doc(db, COL, id), { disponible: !actual })

  const editar = (id, datos) =>
    updateDoc(doc(db, COL, id), datos)

  return (
    <ProductosContext.Provider value={{ productos, agregar, eliminar, toggleDisponible, editar, cargando }}>
      {children}
    </ProductosContext.Provider>
  )
}

export function useProductos() {
  return useContext(ProductosContext)
}