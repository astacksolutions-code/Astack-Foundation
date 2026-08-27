import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Chrome } from 'lucide-react';
import toast from 'react-hot-toast';
import { loginWithEmail, loginWithGoogle } from '../firebase/authApi';
import { useAuth } from '../context/AuthContext';

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@astack.org');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, demoMode } = useAuth();
  const navigate = useNavigate();

  if (user) return <Navigate to="/admin" replace />;

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginWithEmail(email, password);
      toast.success('Welcome back!');
      navigate('/admin');
    } catch (err) {
      toast.error(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const google = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate('/admin');
    } catch (err) {
      toast.error(err.message || 'Google sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl max-w-sm w-full p-8"
      >
        <div className="flex items-center gap-2 justify-center mb-6">
          <img src="/logo.png" alt="Astack Foundation" className="w-10 h-10 object-contain" />
          <span className="font-display font-bold text-lg text-primary">Astack Admin</span>
        </div>

        {demoMode && (
          <div className="bg-secondary/10 text-secondary-700 text-xs rounded-lg p-3 mb-5 leading-relaxed">
            Demo mode: no Firebase project connected. Any email/password will sign you in as Admin.
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder="Email"
            className="w-full border border-primary-100 rounded-lg px-4 py-2.5 focus:border-secondary outline-none" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required placeholder="Password"
            className="w-full border border-primary-100 rounded-lg px-4 py-2.5 focus:border-secondary outline-none" />
          <button disabled={loading} type="submit" className="btn-primary w-full justify-center">
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <div className="flex items-center gap-3 my-5">
          <div className="h-px bg-primary-100 flex-1" />
          <span className="text-xs text-primary/40">or</span>
          <div className="h-px bg-primary-100 flex-1" />
        </div>

        <button onClick={google} disabled={loading} className="btn-outline w-full justify-center">
          <Chrome size={16} /> Continue with Google
        </button>
      </motion.div>
    </div>
  );
}
