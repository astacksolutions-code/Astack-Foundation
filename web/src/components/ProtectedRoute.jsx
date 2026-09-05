import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/** Single-tier admin access: any signed-in user is a full Admin. */
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-primary">Loading…</div>;
  }
  if (!user) return <Navigate to="/admin/login" replace />;
  return children;
}
