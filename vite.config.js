import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// URL pública del sitio. Prioridad:
// 1) VITE_SITE_URL (ej. https://cazamoda.com)  2) dominio de producción que Vercel inyecta al compilar
const raw =
  process.env.VITE_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '')
const SITE_URL = raw.replace(/\/+$/, '')

const RUTAS_PUBLICAS = ['/', '/privacidad', '/aviso-legal', '/cookies']

// Reemplaza %SITE_URL% en index.html y genera sitemap.xml + robots.txt en cada build
function seoPlugin() {
  return {
    name: 'cazamoda-seo',
    transformIndexHtml: html => html.replaceAll('%SITE_URL%', SITE_URL),
    generateBundle() {
      const hoy = new Date().toISOString().slice(0, 10)
      const urls = RUTAS_PUBLICAS.map(
        r => `  <url><loc>${SITE_URL}${r}</loc><lastmod>${hoy}</lastmod></url>`
      ).join('\n')
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      })
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\nDisallow: /admin\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), seoPlugin()],
})
