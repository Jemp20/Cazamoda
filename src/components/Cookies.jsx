import PaginaLegal from './PaginaLegal'

const secciones = [
  {
    title: '¿Qué son las cookies?',
    body: [
      'Son pequeños archivos o datos que un sitio guarda en tu dispositivo para recordar información. También existen tecnologías similares, como el almacenamiento local del navegador.',
    ],
  },
  {
    title: 'Qué usamos en este sitio',
    body: [
      'Necesarias: guardamos en tu navegador tu elección sobre este aviso de cookies y, en el panel de administración, la sesión de la persona autorizada. Sin ellas el sitio no funciona correctamente y no requieren consentimiento.',
      'Medición de visitas (opcional): si aceptas, usamos Vercel Web Analytics para contar visitas y páginas más vistas de forma agregada y anónima. No usamos cookies publicitarias, ni Meta Pixel, ni Google Ads, ni perfilamos visitantes.',
    ],
  },
  {
    title: 'Servicios técnicos de terceros',
    body: [
      'El sitio carga tipografías de Google Fonts y datos del catálogo desde Firebase/Google. Estos proveedores pueden tratar datos técnicos (como la dirección IP) para entregar el contenido.',
    ],
  },
  {
    title: 'Cómo cambiar tu decisión',
    body: [
      'Puedes cambiar tu elección en cualquier momento con el enlace "Preferencias de cookies" al final de la página, o borrando los datos del sitio en la configuración de tu navegador.',
    ],
  },
  {
    title: 'Más información',
    body: [
      'Consulta nuestra Política de privacidad para conocer cómo tratamos tus datos personales y cómo ejercer tus derechos.',
    ],
  },
]

export default function Cookies() {
  return (
    <PaginaLegal
      kicker="Política de cookies"
      titulo="Uso de cookies y tecnologías similares"
      intro="Explicamos qué almacenamos en tu navegador cuando visitas Cazamoda Confección y cómo puedes controlarlo."
      actualizado="23 de octubre de 2026"
      secciones={secciones}
    />
  )
}
