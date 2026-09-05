import { createContext, useContext, useEffect, useState } from 'react';
import { watchAuth } from '../firebase/authApi';
import { isFirebaseConfigured } from '../firebase/config';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = watchAuth((u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  useEffect(() => {
    const handler = (e) => setUser((u) => (u ? { ...u, ...e.detail } : u));
    window.addEventListener('astack:profile-updated', handler);
    return () => window.removeEventListener('astack:profile-updated', handler);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, demoMode: !isFirebaseConfigured }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
