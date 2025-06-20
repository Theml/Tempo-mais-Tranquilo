import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAuXInb7blWuL5hv_vCcWtl02lDJm8mNcI",
  authDomain: "tempo-mais-tranquilo.firebaseapp.com",
  projectId: "tempo-mais-tranquilo",
  storageBucket: "tempo-mais-tranquilo.firebasestorage.app",
  messagingSenderId: "306806753121",
  appId: "1:306806753121:web:dba3348943d128b3b6e720",
  measurementId: "G-9NBJN2QN76"
};

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);