import { useEffect, useState } from 'react';
import { Plus, Trash2, Shield, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { subscribeCollection, addItem, deleteItem } from '../firebase/dataLayer';
import { useAuth } from '../context/AuthContext';

function InviteModal({ onSave, onCancel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div className="fixed inset-0 bg-primary-900/60 z-[100] flex items-center justify-center p-4" onClick={onCancel}>
      <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl max-w-sm w-full p-6 relative">
        <button onClick={onCancel} className="absolute top-4 right-4 text-primary/50 hover:text-primary" aria-label="Close"><X size={20} /></button>
        <h3 className="font-semibold text-primary text-lg mb-4">Invite Admin</h3>
        <div className="space-y-3">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="w-full border border-primary-100 rounded-lg px-4 py-2.5" />
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email address" className="w-full border border-primary-100 rounded-lg px-4 py-2.5" />
          <p className="text-xs text-primary/50">Everyone with admin access has full permissions — there's only one role.</p>
          <button disabled={!name || !email} onClick={() => onSave({ name, email })} className="btn-primary w-full justify-center">
            Send Invite
          </button>
        </div>
      </div>
    </div>
  );
}

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [activity, setActivity] = useState([]);
  const [inviting, setInviting] = useState(false);
  const { user: currentUser } = useAuth();

  useEffect(() => {
    const u1 = subscribeCollection('users', setUsers);
    const u2 = subscribeCollection('activityLog', setActivity);
    return () => { u1(); u2(); };
  }, []);

  const invite = async ({ name, email }) => {
    try {
      await addItem('users', { name, email, role: 'Admin', lastActive: new Date().toISOString() });
      await addItem('activityLog', { user: currentUser?.email || 'Admin', action: `Invited ${email} as Admin`, timestamp: new Date().toISOString() });
      toast.success(`Invite sent to ${email}`);
      setInviting(false);
    } catch (err) {
      toast.error(`Failed to invite: ${err.message}`);
    }
  };

  const removeUser = async (id, email) => {
    try {
      await deleteItem('users', id);
      await addItem('activityLog', { user: currentUser?.email || 'Admin', action: `Removed admin ${email}`, timestamp: new Date().toISOString() });
      toast.success('Admin removed');
    } catch (err) {
      toast.error(`Failed to remove: ${err.message}`);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">Admins</h1>
          <p className="text-sm text-primary/50">Everyone here has full access to the admin panel.</p>
        </div>
        <button onClick={() => setInviting(true)} className="btn-primary text-sm py-2 px-4"><Plus size={15} /> Invite Admin</button>
      </div>

      <div className="card overflow-x-auto mb-8">
        <table className="w-full text-sm">
          <thead className="bg-accent/60 text-primary/70 text-xs uppercase">
            <tr>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">Email</th>
              <th className="text-left px-4 py-3">Last Active</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-primary-100/60">
            {users.map((u) => (
              <tr key={u.id}>
                <td className="px-4 py-3 font-medium text-primary flex items-center gap-2">
                  <Shield size={14} className="text-secondary" /> {u.name}
                </td>
                <td className="px-4 py-3 text-primary/70">{u.email}</td>
                <td className="px-4 py-3 text-primary/50 text-xs">{new Date(u.lastActive).toLocaleString()}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => removeUser(u.id, u.email)} className="text-primary/40 hover:text-red-500" aria-label="Remove admin"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
            {users.length === 0 && <tr><td colSpan={4} className="text-center py-10 text-primary/40">No admins yet.</td></tr>}
          </tbody>
        </table>
      </div>

      <div className="card p-6">
        <h2 className="font-semibold text-primary mb-4">Activity Log</h2>
        <ul className="divide-y divide-primary-100/60">
          {activity.map((a) => (
            <li key={a.id} className="py-3 flex items-center justify-between text-sm">
              <span className="text-primary/80"><strong className="text-primary">{a.user}</strong> — {a.action}</span>
              <span className="text-xs text-primary/40">{new Date(a.timestamp).toLocaleString()}</span>
            </li>
          ))}
          {activity.length === 0 && <li className="py-6 text-center text-primary/40 text-sm">No activity recorded.</li>}
        </ul>
      </div>

      {inviting && <InviteModal onSave={invite} onCancel={() => setInviting(false)} />}
    </div>
  );
}
