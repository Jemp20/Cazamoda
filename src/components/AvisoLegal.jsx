import PaginaLegal from './PaginaLegal'

// Completa estos datos para que el aviso quede al 100% (si los dejas vacíos, no se muestran).
const DATOS = {
  razonSocial: '',   // ej. 'Cazamoda Confección S.A.S.' o nombre del titular
  nit: '',           // ej. '900.123.456-7'
  correo: '',        // ej. 'contacto@cazamoda.com'
}

const identificacion = [
  'Este sitio web pertenece a Cazamoda Confección, ubicada en Colombia, Calle 77 #67-60.',
  DATOS.razonSocial && `Razón social: ${DATOS.razonSocial}.`,
  DATOS.nit && `NIT: ${DATOS.nit}.`,
  `Contacto: WhatsApp +57 300 128 1861${DATOS.correo ? ` y correo ${DATOS.correo}` : ''}.`,
].filter(Boolean)

const secciones = [
  { title: 'Titular del sitio web', body: identificacion },
  {
    title: 'Objeto y condiciones de uso',
    body: [
      'Este sitio presenta los servicios de confección de prendas, arreglos y dotación corporativa de Cazamoda, y permite contactarnos para solicitar información o cotizaciones.',
      'El acceso y uso del sitio implica la aceptación de este aviso. El usuario se compromete a usarlo de forma lícita y a no realizar acciones que dañen, inutilicen o sobrecarguen el sitio o sus servicios.',
    ],
  },
  {
    title: 'Propiedad intelectual',
    body: [
      'Los textos, fotografías, logotipos, diseños y demás contenidos del sitio son de Cazamoda o se usan con autorización de sus titulares. No se permite su reproducción, distribución o modificación sin autorización previa y por escrito.',
      'Los logotipos de empresas clientes pertenecen a sus respectivos propietarios y se muestran únicamente como referencia comercial.',
    ],
  },
  {
    title: 'Precios, disponibilidad e información',
    body: [
      'Los precios del catálogo son de referencia ("desde") y pueden variar según la prenda, tallas, materiales y cantidades. La cotización final se confirma por WhatsApp. La disponibilidad puede cambiar sin previo aviso.',
      'Procuramos que la información sea exacta y esté actualizada, pero no garantizamos que esté libre de errores u omisiones.',
    ],
  },
  {
    title: 'Enlaces a terceros',
    body: [
      'El sitio contiene enlaces a WhatsApp, Instagram y TikTok. Cazamoda no controla ni se responsabiliza por el contenido ni las políticas de esas plataformas.',
    ],
  },
  {
    title: 'Responsabilidad',
    body: [
      'Cazamoda no será responsable por interrupciones del servicio, fallas técnicas o daños derivados del uso del sitio, salvo en los casos previstos por la ley.',
    ],
  },
  {
    title: 'Protección de datos y legislación aplicable',
    body: [
      'El tratamiento de datos personales se rige por nuestra Política de privacidad, conforme a la Ley 1581 de 2012 y demás normas colombianas aplicables.',
      'Este aviso se rige por la legislación de la República de Colombia. Cualquier controversia se someterá a los jueces y tribunales colombianos competentes.',
    ],
  },
]

export default function AvisoLegal() {
  return (
    <PaginaLegal
      kicker="Aviso legal"
      titulo="Aviso legal y condiciones de uso"
      intro="Información sobre el titular de este sitio web y las condiciones para su uso."
      actualizado="23 de octubre de 2026"
      secciones={secciones}
    />
  )
}
