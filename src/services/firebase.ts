import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAuXInb7blWuL5hv_vCcWtl02lDJm8mNcI",
  authDomain: "tempo-mais-tranquilo.firebaseapp.com",
  projectId: "tempo-mais-tranquilo",
  storageBucket: "tempo-mais-tranquilo.appspot.com",
  messagingSenderId: "306806753121",
  appId: "1:306806753121:web:dba3348943d128b3b6e720",
  measurementId: "G-9NBJN2QN76"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };