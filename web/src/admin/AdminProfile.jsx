import { useState } from 'react';
import { User, Mail, Shield, LogOut, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logout, updateDisplayName } from '../firebase/authApi';

export default function AdminProfile() {
  const { user, demoMode } = useAuth();
  const [name, setName] = useState(user?.displayName || '');
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateDisplayName(name);
      toast.success('Profile updated');
    } catch (err) {
      toast.error(`Failed to update: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const doLogout = async () => {
    await logout();
    toast.success('Signed out');
    navigate('/admin/login');
  };

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold text-primary mb-1">My Profile</h1>
      <p className="text-sm text-primary/50 mb-6">Your admin account details.</p>

      <div className="card p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center text-secondary text-xl font-display font-bold">
            {(name || user?.email || 'A').charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="font-semibold text-primary">{name || 'Admin'}</div>
            <div className="text-xs text-primary/50 flex items-center gap-1"><Mail size={12} /> {user?.email}</div>
          </div>
        </div>

        {demoMode && (
          <div className="bg-secondary/10 text-secondary-700 text-xs rounded-lg p-3 mb-5">
            Demo mode: profile changes are stored locally in this browser only.
          </div>
        )}

        <form onSubmit={save} className="space-y-4">
          <div>
            <label className="text-xs text-primary/60 flex items-center gap-1 mb-1"><User size={13} /> Display name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="w-full border border-primary-100 rounded-lg px-4 py-2.5 focus:border-secondary outline-none" />
          </div>
          <div>
            <label className="text-xs text-primary/60 flex items-center gap-1 mb-1"><Mail size={13} /> Email</label>
            <input value={user?.email || ''} disabled className="w-full border border-primary-100 rounded-lg px-4 py-2.5 bg-accent/40 text-primary/50" />
            <p className="text-[11px] text-primary/40 mt-1">Email is tied to your sign-in method and can't be changed here.</p>
          </div>
          <div>
            <label className="text-xs text-primary/60 flex items-center gap-1 mb-1"><Shield size={13} /> Access level</label>
            <input value="Admin — full access" disabled className="w-full border border-primary-100 rounded-lg px-4 py-2.5 bg-accent/40 text-primary/50" />
          </div>
          <button disabled={saving} type="submit" className="btn-primary text-sm py-2.5 px-5">
            <Save size={15} /> {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </form>
      </div>

      <button onClick={doLogout} className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 mt-5 px-2 py-2">
        <LogOut size={16} /> Sign Out
      </button>
    </div>
  );
}
