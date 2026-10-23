const KEY = 'cazamoda_cookies' // 'all' | 'necessary'

export function getConsent() {
  try { return localStorage.getItem(KEY) } catch { return null }
}

export function setConsent(value) {
  try { localStorage.setItem(KEY, value) } catch { /* modo privado: se ignora */ }
}

let cargado = false
// Analítica de Vercel (sin cookies, datos agregados). Solo se carga si la persona aceptó.
export async function cargarAnalitica() {
  if (cargado || import.meta.env.DEV) return
  cargado = true
  try {
    const { inject } = await import('@vercel/analytics')
    inject()
  } catch { /* si falla, el sitio sigue funcionando */ }
}
