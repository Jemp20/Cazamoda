import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css'
import { ProductosProvider } from './context/ProductosContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ProductosProvider>
    <App />
  </ProductosProvider>
)

// test deploy after vite fix //