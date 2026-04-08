# Cazamoda Confección — Sitio Web

Página web profesional construida con **React + Vite**.

## 🚀 Cómo iniciar

```bash
# 1. Instalar dependencias
npm install

# 2. Correr en modo desarrollo
npm run dev

# 3. Abrir en el navegador
# http://localhost:5173
```

## 📦 Estructura del proyecto

```
cazamoda/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx          ← Punto de entrada
    ├── App.jsx           ← Ensambla todos los componentes
    ├── hooks/
    │   └── useReveal.js  ← Hook para animaciones al hacer scroll
    ├── styles/
    │   └── global.css    ← Variables CSS y estilos base
    └── components/
        ├── Navbar.jsx / .module.css
        ├── Hero.jsx / .module.css
        ├── Nosotros.jsx / .module.css
        ├── Catalogo.jsx / .module.css
        ├── Arreglos.jsx / .module.css
        ├── Galeria.jsx / .module.css
        ├── Contacto.jsx / .module.css
        └── Footer.jsx / .module.css
```

## ✏️ Cómo personalizar

| Qué cambiar | Dónde hacerlo |
|---|---|
| Número de WhatsApp | `Navbar.jsx`, `Contacto.jsx`, `Footer.jsx` |
| Fotos del catálogo | `Catalogo.jsx` → array `products` |
| Fotos de galería | `Galeria.jsx` → array `photos` |
| Servicios de arreglos | `Arreglos.jsx` → array `servicios` |
| Colores | `src/styles/global.css` → variables `:root` |
| Dirección / horario | `Contacto.jsx` → array `contactItems` |

## 🌐 Publicar en Netlify (gratis)

```bash
# Generar archivos de producción
npm run build

# La carpeta "dist/" es la que subes a Netlify
```

1. Entra a [netlify.com](https://netlify.com)
2. Arrastra la carpeta `dist/` al panel
3. ¡Listo! Tienes URL pública en segundos
