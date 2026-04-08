import { useProductos } from '../context/ProductosContext'

const KEY = 'cazamoda_productos'

const DEFAULT_PRODUCTS = [
  // HOMBRE
  { id: '1', name: 'Camisa Clásica',     category: 'Camisas',   genero: 'Hombre', tag: 'Nuevo',   desc: 'Confección a medida', precioMin: 40000, img: 'Camisa.jpg', disponible: true },
  { id: '2', name: 'Jean Urbano',         category: 'Jeans',     genero: 'Hombre', tag: '',        desc: 'Confort fit',         precioMin: 55000, img: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4d43?w=500&q=80', disponible: true },
  { id: '3', name: 'Chaqueta Premium',    category: 'Chaquetas', genero: 'Hombre', tag: 'Popular', desc: 'Edición limitada',    precioMin: 90000, img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&q=80', disponible: true },
  { id: '4', name: 'Conjunto Casual',     category: 'Conjuntos', genero: 'Hombre', tag: '',        desc: 'Tendencia',           precioMin: 70000, img: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&q=80', disponible: true },
  // MUJER
  { id: '5', name: 'Vestido Moderno',     category: 'Vestidos',  genero: 'Mujer',  tag: '',        desc: 'Diseño exclusivo',    precioMin: 65000, img: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=500&q=80', disponible: true },
  { id: '6', name: 'Blusa Contemporánea', category: 'Blusas',    genero: 'Mujer',  tag: 'Nuevo',   desc: 'Tallas disponibles',  precioMin: 35000, img: 'https://images.unsplash.com/photo-1613678606689-74e17f1d61e8?w=500&q=80', disponible: true },
  { id: '7', name: 'Short Casual',        category: 'Shorts',    genero: 'Mujer',  tag: '',        desc: 'Cómodo y moderno',    precioMin: 30000, img: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=500&q=80', disponible: true },
  { id: '8', name: 'Camisa Mujer',        category: 'Camisas',   genero: 'Mujer',  tag: '',        desc: 'Estilo femenino',     precioMin: 38000, img: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&q=80', disponible: true },
]

function cargarProductos() {
  try {
    const data = localStorage.getItem(KEY)
    if (data) return JSON.parse(data)
  } catch {}
  return DEFAULT_PRODUCTS
}

export function useProductos() {
  const [productos, setProductos] = useState(() => cargarProductos())

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(productos))
  }, [productos])

  const agregar = (prod) => {
    const nuevo = { ...prod, id: Date.now().toString(), disponible: true }
    setProductos(prev => [...prev, nuevo])
  }

  const eliminar = (id) => {
    setProductos(prev => prev.filter(p => p.id !== id))
  }

  const toggleDisponible = (id, actual) => {
    setProductos(prev =>
      prev.map(p => p.id === id ? { ...p, disponible: !actual } : p)
    )
  }

  const editar = (id, datos) => {
    setProductos(prev =>
      prev.map(p => p.id === id ? { ...p, ...datos } : p)
    )
  }

  return { productos, cargando: false, agregar, eliminar, toggleDisponible, editar }
}
