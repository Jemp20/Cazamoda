import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// Estas claves son públicas por diseño en Firebase (identifican el proyecto, no dan acceso).
// La seguridad real está en las reglas de Firestore (ver firestore.rules) y en Firebase Authentication.
const firebaseConfig = {
  apiKey: "AIzaSyBl1w_G83lA_FfXSEb8qbMGdD-jgNauXGQ",
  authDomain: "cazamoda-1a29d.firebaseapp.com",
  projectId: "cazamoda-1a29d",
  storageBucket: "cazamoda-1a29d.firebasestorage.app",
  messagingSenderId: "11069015829",
  appId: "1:11069015829:web:005e39eb4799b33c340b1c"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
