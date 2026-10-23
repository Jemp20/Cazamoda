# Cazamoda – Lista de 20 puntos + seguridad

## ⚠️ Haz esto PRIMERO (orden importa, o te quedas sin acceso al admin)
1. **Firebase Console → Authentication → Sign-in method → habilita "Correo/contraseña".**
2. **Authentication → Users → "Agregar usuario"**: crea tu correo y una contraseña larga (la anterior `cazamoda2026` estaba escrita en el código: considérala comprometida).
3. Sube el código a GitHub (Vercel despliega solo) y comprueba que entras a `/admin` con ese correo.
4. **Firestore Database → Reglas**: pega el contenido de `firestore.rules`, cambia `CAMBIA_ESTE_CORREO@gmail.com` por tu correo de admin (2 veces) y **Publica**.
   Antes de esto, cualquiera con la config de Firebase (visible en el navegador) podía editar o borrar tu catálogo.
5. Vercel → proyecto → **Analytics → Enable** (gratis en plan Hobby).
6. Opcional: en Vercel → Settings → Environment Variables, define `VITE_SITE_URL=https://tu-dominio.com` (si no, usa el dominio de Vercel).

## Estado de los 20 puntos
| # | Punto | Estado |
|---|---|---|
| 1 | Aviso legal | ✅ `/aviso-legal` (completa razón social/NIT/correo en `AvisoLegal.jsx`) |
| 2 | Política de privacidad | ✅ ya existía, actualizada |
| 3 | Aviso de cookies | ✅ banner + `/cookies` + "Preferencias de cookies" en el footer |
| 4 | Forzar HTTPS | ✅ Vercel redirige + cabecera HSTS |
| 5 | Meta títulos y descripciones | ✅ `index.html` (+ Open Graph) |
| 6 | Datos estructurados | ✅ JSON-LD `ClothingStore` |
| 7 | Sitemap y robots.txt | ✅ se generan en cada build (`/admin` bloqueado) |
| 8 | Ficha de Google | 🖐 Manual: crea/reclama tu perfil en business.google.com y enlaza la web |
| 9 | Favicon | ✅ monograma "C" dorado (reemplázalo por tu logo en cuadrado si prefieres) |
| 10 | Alt en imágenes | ✅ descriptivos |
| 11 | Imágenes comprimidas | ✅ fotos 2.9 MB → 2.2 MB; video 4.9 MB → 0.9 MB (ahora H.264, compatible con todos los navegadores) |
| 12 | Velocidad | ✅ lazy-loading, caché larga, `preload` en videos |
| 13 | Contraste | ✅ revisado en elementos nuevos; verifica textos dorados claros sobre fondo crema con https://pagespeed.web.dev |
| 14 | Móvil | ✅ elementos nuevos responsive |
| 15 | Página 404 | ✅ real (código 404 para Google) |
| 16 | Enlaces rotos | ✅ corregido `localhost` en VideoSection e imagen de Nosotros |
| 17 | Formularios antispam | ✅ honeypot, tiempo mínimo, límite de envíos, validación (el formulario envía a WhatsApp, así que el riesgo es bajo) |
| 18 | Botón WhatsApp visible | ✅ flotante |
| 19 | Analítica | ✅ Vercel Analytics, solo si aceptan cookies |
| 20 | Una sola llamada a la acción | 🖐 Decisión de diseño: hoy el hero tiene "Ver catálogo" y "Arreglos" + WhatsApp; deja WhatsApp como único CTA principal |

## Seguridad extra incluida
- Admin con **Firebase Authentication** (antes: contraseña en el JS público).
- Cabeceras: CSP, HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy.
- `.gitignore` estaba en UTF-16, por eso `node_modules` y `dist` (13.000 archivos) estaban en Git. Ya corregido; para sacarlos del repo:
  ```powershell
  git rm -r --cached node_modules dist
  git commit -m "Limpiar node_modules y dist"
  ```

## Después de desplegar
- Abre la web y la consola (F12): no debe haber errores rojos de "Content Security Policy". Si alguno bloquea algo, avísame.
- Prueba: ver catálogo, entrar a `/admin`, agregar/editar un producto, enviar el formulario.
- Revisa `https://tudominio/robots.txt` y `/sitemap.xml`, y envía el sitemap en Google Search Console.
