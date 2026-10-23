import Navbar from './Navbar'
import Footer from './Footer'
import styles from './Privacidad.module.css'

const sections = [
  {
    title: 'Datos que podemos recibir',
    body: [
      'Cuando una persona se comunica con Cazamoda Confeccion por el sitio web, WhatsApp, telefono, redes sociales o formularios de pedido, podemos recibir datos como nombre, telefono, cedula, direccion, prenda solicitada, talla, color, servicio de interes y el contenido del mensaje.',
      'El sitio tambien puede mostrar productos administrados en Firebase. No usamos esta web para solicitar datos financieros ni claves bancarias.'
    ]
  },
  {
    title: 'Finalidades del tratamiento',
    body: [
      'Usamos los datos para responder solicitudes, cotizar prendas o arreglos, gestionar pedidos, coordinar entregas, prestar servicio posventa, atender garantias, mantener registros comerciales y mejorar la atencion al cliente.',
      'Tambien podemos usar datos de contacto para enviar informacion relacionada con el pedido o con servicios de Cazamoda, siempre que el titular lo autorice o exista una relacion comercial vigente.'
    ]
  },
  {
    title: 'Canales y terceros',
    body: [
      'Al hacer clic en botones de WhatsApp, Instagram o TikTok, la conversacion ocurre en plataformas externas sujetas a sus propias politicas de privacidad.',
      'Para operar el catalogo usamos servicios tecnologicos como Firebase/Google. Estos proveedores actuan como encargados o proveedores de infraestructura segun sus propias condiciones.'
    ]
  },
  {
    title: 'Cookies, Google y medicion',
    body: [
      'El sitio no usa Google Ads, Google AdSense, remarketing, Meta Pixel ni cookies publicitarias para perfilar visitantes. Si aceptas el aviso de cookies, usamos Vercel Web Analytics para medir visitas de forma agregada y anonima, sin cookies. Puedes cambiar tu decision en cualquier momento desde Preferencias de cookies, al final de la pagina. Mas detalles en la Politica de cookies (/cookies).',
      'El sitio puede cargar servicios tecnicos de terceros, como fuentes web de Google, Firebase y enlaces a redes sociales. Estos servicios pueden tratar datos tecnicos necesarios para entregar contenido, seguridad, rendimiento o disponibilidad del sitio.'
    ]
  },
  {
    title: 'Autorizacion al enviar formularios',
    body: [
      'Al enviar un mensaje, cotizacion o pedido desde la web, el titular declara que conoce esta politica y autoriza a Cazamoda Confeccion a tratar sus datos para responder la solicitud y gestionar la relacion comercial.',
      'La autorizacion no obliga al titular a aceptar publicidad personalizada ni comunicaciones masivas no relacionadas con su solicitud.'
    ]
  },
  {
    title: 'Derechos de los titulares',
    body: [
      'Conforme a la normativa colombiana de proteccion de datos personales, el titular puede conocer, actualizar, rectificar, solicitar prueba de autorizacion, revocar la autorizacion, solicitar la supresion cuando proceda y presentar consultas o reclamos sobre sus datos.',
      'Para ejercer estos derechos puede escribir por WhatsApp al +57 300 128 1861 o comunicarse con Cazamoda Confeccion indicando nombre, medio de respuesta y solicitud concreta.'
    ]
  },
  {
    title: 'Conservacion y seguridad',
    body: [
      'Conservamos la informacion durante el tiempo necesario para atender la solicitud, cumplir obligaciones comerciales, contables o legales, y mantener soporte de la relacion con el cliente.',
      'Aplicamos medidas razonables de seguridad para proteger la informacion contra acceso no autorizado, perdida, alteracion o uso indebido.'
    ]
  }
]

export default function Privacidad() {
  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <section className={styles.hero}>
          <span className={styles.kicker}>Politica de privacidad</span>
          <h1>Tratamiento de datos personales</h1>
          <p>
            Esta politica explica como Cazamoda Confeccion recoge, usa y protege
            la informacion personal de clientes, visitantes y personas interesadas
            en sus prendas, arreglos y servicios de confeccion.
          </p>
          <p className={styles.updated}>Ultima actualizacion: 23 de octubre de 2026</p>
        </section>

        <section className={styles.content} aria-label="Politica de privacidad de Cazamoda">
          <article className={styles.card}>
            <h2>Responsable del tratamiento</h2>
            <p>
              Cazamoda Confeccion, ubicada en Colombia, Calle 77 #67-60, es responsable
              del tratamiento de los datos personales recolectados por sus canales de
              atencion digital y presencial.
            </p>
            <p>
              Canal de contacto principal: WhatsApp <a href="https://wa.me/573001281861" target="_blank" rel="noopener noreferrer">+57 300 128 1861</a>.
            </p>
          </article>

          {sections.map(section => (
            <article key={section.title} className={styles.card}>
              <h2>{section.title}</h2>
              {section.body.map(text => <p key={text}>{text}</p>)}
            </article>
          ))}

          
        </section>
      </main>
      <Footer />
    </>
  )
}
