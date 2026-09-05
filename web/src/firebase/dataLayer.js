import {
  collection, doc, addDoc, updateDoc, deleteDoc, onSnapshot,
  query, orderBy, serverTimestamp, writeBatch
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './config';
import * as seed from '../utils/seedData';

// ---------------------------------------------------------------------------
// Unified data layer. When Firebase credentials are present (web/.env), every
// function below reads/writes real Firestore in real time. Without them, the
// exact same function signatures operate on localStorage-backed seed data, so
// the whole app (public site + admin CRUD) is explorable out of the box.
// ---------------------------------------------------------------------------

const SEED_MAP = {
  gallery: seed.seedGallery,
  events: seed.seedEvents,
  programs: seed.seedPrograms,
  testimonials: seed.seedTestimonials,
  team: seed.seedTeam,
  contacts: seed.seedContacts,
  feedback: seed.seedFeedback,
  users: seed.seedUsers,
  activityLog: seed.seedActivityLog,
};

function localKey(col) {
  return `astack_demo_${col}`;
}

function readLocal(col) {
  const raw = localStorage.getItem(localKey(col));
  if (raw) return JSON.parse(raw);
  const initial = SEED_MAP[col] || [];
  localStorage.setItem(localKey(col), JSON.stringify(initial));
  return initial;
}

function writeLocal(col, items) {
  localStorage.setItem(localKey(col), JSON.stringify(items));
  window.dispatchEvent(new CustomEvent(`astack:${col}`, { detail: items }));
}

/** Subscribe to a collection in real time. Returns an unsubscribe function. */
export function subscribeCollection(col, cb, sortField = 'createdAt', sortDir = 'desc') {
  if (isFirebaseConfigured) {
    const q = query(collection(db, col), orderBy(sortField, sortDir));
    return onSnapshot(q, (snap) => {
      cb(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
  }
  // Demo mode: emit immediately, then on every local write
  const emit = () => cb(readLocal(col));
  emit();
  const handler = () => emit();
  window.addEventListener(`astack:${col}`, handler);
  return () => window.removeEventListener(`astack:${col}`, handler);
}

export async function addItem(col, data) {
  if (isFirebaseConfigured) {
    return addDoc(collection(db, col), { ...data, createdAt: serverTimestamp() });
  }
  const items = readLocal(col);
  const newItem = { id: `${col}_${Date.now()}`, createdAt: new Date().toISOString(), ...data };
  writeLocal(col, [newItem, ...items]);
  return newItem;
}

export async function updateItem(col, id, data) {
  if (isFirebaseConfigured) {
    return updateDoc(doc(db, col, id), data);
  }
  const items = readLocal(col).map((it) => (it.id === id ? { ...it, ...data } : it));
  writeLocal(col, items);
}

export async function deleteItem(col, id) {
  if (isFirebaseConfigured) {
    return deleteDoc(doc(db, col, id));
  }
  writeLocal(col, readLocal(col).filter((it) => it.id !== id));
}

export async function bulkDelete(col, ids) {
  if (isFirebaseConfigured) {
    const batch = writeBatch(db);
    ids.forEach((id) => batch.delete(doc(db, col, id)));
    return batch.commit();
  }
  writeLocal(col, readLocal(col).filter((it) => !ids.includes(it.id)));
}
