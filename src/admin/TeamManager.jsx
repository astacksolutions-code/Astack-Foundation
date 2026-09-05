import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { subscribeCollection, addItem, updateItem, deleteItem } from '../firebase/dataLayer';
import { uploadImage } from '../firebase/storageApi';
import ImageWithFallback from '../components/ImageWithFallback';

const BLANK = { name: '', role: '', bio: '', avatar: '' };

function TeamForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial || BLANK);
  const [uploading, setUploading] = useState(false);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const onImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      set('avatar', await uploadImage(file));
    } catch (err) {
      toast.error(`Image failed: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-primary-900/60 z-[100] flex items-center justify-center p-4" onClick={onCancel}>
      <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto relative">
        <button onClick={onCancel} className="absolute top-4 right-4 text-primary/50 hover:text-primary" aria-label="Close"><X size={20} /></button>
        <h3 className="font-display font-bold text-xl text-primary mb-5">{initial ? 'Edit Team Member' : 'Add Team Member'}</h3>
        <div className="space-y-4">
          <input value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Full name" className="w-full border border-primary-100 rounded-lg px-4 py-2.5" />
          <input value={form.role} onChange={(e) => set('role', e.target.value)} placeholder="Role / title (e.g. Founder / Chairman)" className="w-full border border-primary-100 rounded-lg px-4 py-2.5" />
          <textarea value={form.bio} onChange={(e) => set('bio', e.target.value)} rows={3} placeholder="Short bio" className="w-full border border-primary-100 rounded-lg px-4 py-2.5 resize-none" />
          <div>
            <label className="text-xs text-primary/60 block mb-1">Photo</label>
            <input type="file" accept="image/*" onChange={onImage} className="text-sm" />
            {form.avatar && <ImageWithFallback src={form.avatar} alt="preview" className="w-20 h-20 rounded-full object-cover mt-2" />}
          </div>
          <button disabled={uploading || !form.name || !form.role} onClick={() => onSave(form)} className="btn-primary w-full justify-center">
            {uploading ? 'Uploading photo…' : 'Save Team Member'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TeamManager() {
  const [team, setTeam] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    const unsub = subscribeCollection('team', setTeam, 'name', 'asc');
    return unsub;
  }, []);

  const save = async (form) => {
    try {
      if (form.id) {
        await updateItem('team', form.id, form);
        toast.success('Team member updated');
      } else {
        await addItem('team', form);
        toast.success('Team member added');
      }
      setEditing(null);
    } catch (err) {
      toast.error(err.code === 'permission-denied'
        ? 'Permission denied — make sure you are signed in via /admin/login.'
        : `Failed to save: ${err.message}`);
    }
  };

  const remove = async (id) => {
    try {
      await deleteItem('team', id);
      toast.success('Team member removed');
    } catch (err) {
      toast.error(`Failed to remove: ${err.message}`);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">Team Manager</h1>
          <p className="text-sm text-primary/50">Manage who shows up on the public Team page.</p>
        </div>
        <button onClick={() => setEditing(BLANK)} className="btn-primary text-sm py-2 px-4">
          <Plus size={15} /> Add Team Member
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {team.map((m) => (
          <div key={m.id} className="card p-5 text-center">
            <ImageWithFallback src={m.avatar} alt={m.name} className="w-20 h-20 rounded-full object-cover mx-auto mb-3" />
            <h3 className="font-semibold text-primary">{m.name}</h3>
            <p className="text-xs text-secondary font-semibold">{m.role}</p>
            <p className="text-xs text-primary/50 mt-2 line-clamp-2">{m.bio}</p>
            <div className="flex gap-2 mt-4">
              <button onClick={() => setEditing(m)} className="flex-1 btn-outline text-xs py-2"><Pencil size={13} /> Edit</button>
              <button onClick={() => remove(m.id)} className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-red-500 border-2 border-red-200 rounded-full py-2 hover:bg-red-50"><Trash2 size={13} /> Delete</button>
            </div>
          </div>
        ))}
        {team.length === 0 && <p className="col-span-full text-center text-primary/40 py-10">No team members yet.</p>}
      </div>

      {editing && <TeamForm initial={editing.id ? editing : null} onSave={save} onCancel={() => setEditing(null)} />}
    </div>
  );
}
