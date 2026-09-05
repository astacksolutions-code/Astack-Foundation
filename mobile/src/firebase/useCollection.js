import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db, isFirebaseConfigured } from './config';
import { seedEvents, seedPrograms, seedGallery } from './seedData';

const SEED = { events: seedEvents, programs: seedPrograms, gallery: seedGallery };

/** Mirrors the web app's dataLayer.subscribeCollection for React Native. */
export function useCollection(name) {
  const [items, setItems] = useState(SEED[name] || []);

  useEffect(() => {
    if (!isFirebaseConfigured) return; // demo mode: static seed data above
    const unsub = onSnapshot(collection(db, name), (snap) => {
      setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, [name]);

  return items;
}
