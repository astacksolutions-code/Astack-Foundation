import {
  signInWithEmailAndPassword, createUserWithEmailAndPassword,
  signInWithPopup, signOut, onAuthStateChanged, updateProfile
} from 'firebase/auth';
import { auth, googleProvider, isFirebaseConfigured } from './config';

const DEMO_USER_KEY = 'astack_demo_user';
const DEMO_ADMIN = { uid: 'demo-admin', email: 'admin@astack.org', displayName: 'Admin User', role: 'Admin' };

export function watchAuth(cb) {
  if (isFirebaseConfigured) {
    return onAuthStateChanged(auth, cb);
  }
  const raw = localStorage.getItem(DEMO_USER_KEY);
  cb(raw ? JSON.parse(raw) : null);
  const handler = () => {
    const r = localStorage.getItem(DEMO_USER_KEY);
    cb(r ? JSON.parse(r) : null);
  };
  window.addEventListener('astack:auth', handler);
  return () => window.removeEventListener('astack:auth', handler);
}

export async function loginWithEmail(email, password) {
  if (isFirebaseConfigured) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  // Demo mode: any credentials work, mirrors DEMO_ADMIN
  localStorage.setItem(DEMO_USER_KEY, JSON.stringify({ ...DEMO_ADMIN, email }));
  window.dispatchEvent(new CustomEvent('astack:auth'));
}

export async function registerWithEmail(email, password, displayName) {
  if (isFirebaseConfigured) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  localStorage.setItem(DEMO_USER_KEY, JSON.stringify({ ...DEMO_ADMIN, email, displayName }));
  window.dispatchEvent(new CustomEvent('astack:auth'));
}

export async function loginWithGoogle() {
  if (isFirebaseConfigured) {
    return signInWithPopup(auth, googleProvider);
  }
  localStorage.setItem(DEMO_USER_KEY, JSON.stringify(DEMO_ADMIN));
  window.dispatchEvent(new CustomEvent('astack:auth'));
}

export async function logout() {
  if (isFirebaseConfigured) {
    return signOut(auth);
  }
  localStorage.removeItem(DEMO_USER_KEY);
  window.dispatchEvent(new CustomEvent('astack:auth'));
}

export async function updateDisplayName(displayName) {
  if (isFirebaseConfigured) {
    if (!auth.currentUser) throw new Error('Not signed in');
    await updateProfile(auth.currentUser, { displayName });
    // updateProfile doesn't trigger onAuthStateChanged — notify the UI directly
    window.dispatchEvent(new CustomEvent('astack:profile-updated', { detail: { displayName } }));
    return;
  }
  const raw = localStorage.getItem(DEMO_USER_KEY);
  const current = raw ? JSON.parse(raw) : DEMO_ADMIN;
  localStorage.setItem(DEMO_USER_KEY, JSON.stringify({ ...current, displayName }));
  window.dispatchEvent(new CustomEvent('astack:auth'));
}
