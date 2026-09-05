import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// True once real Firebase credentials are supplied via .env
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId
);

let app, auth, db, storage, googleProvider;

if (isFirebaseConfigured) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
  googleProvider = new GoogleAuthProvider();
} else {
  // No credentials yet — the app runs in demo mode against local mock data
  // (see src/firebase/dataLayer.js) so the UI is fully explorable before
  // you connect a real Firebase project. Add your keys to web/.env to go live.
  console.warn(
    '[Astack Foundation] Firebase is not configured — running in DEMO MODE with local mock data. ' +
    'Copy .env.example to .env and fill in your Firebase project keys to enable real auth/storage/Firestore.'
  );
}

export { app, auth, db, storage, googleProvider };
