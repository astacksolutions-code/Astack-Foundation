import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import ImageWithFallback from '../components/ImageWithFallback';
import toast from 'react-hot-toast';
import { subscribeCollection, addItem, updateItem, deleteItem } from '../firebase/dataLayer';
import { uploadImage } from '../firebase/storageApi';

const CATEGORIES = ['Education', 'Health', 'Infrastructure', 'Livelihood'];
const BLANK = { title: '', category: CATEGORIES[0], description: '', imageUrl: '', target: 100, achieved: 0, unit: 'people helped', status: 'active' };

function ProgramForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial || BLANK);
  const [uploading, setUploading] = useState(false);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const onImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    set('imageUrl', await uploadImage(file));
    setUploading(false);
  };

  const progress = form.target > 0 ? Math.min(100, Math.round((form.achieved / form.target) * 100)) : 0;

  return (
    <div className="fixed inset-0 bg-primary-900/60 z-[100] flex items-center justify-center p-4" onClick={onCancel}>
      <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto relative">
        <button onClick={onCancel} className="absolute top-4 right-4 text-primary/50 hover:text-primary" aria-label="Close"><X size={20} /></button>
        <h3 className="font-display font-bold text-xl text-primary mb-5">{initial ? 'Edit Program' : 'Add Program'}</h3>
        <div className="space-y-4">
          <input value={form.title} onChange={(e) => set('title', e.target.value)} placeholder="Program title" className="w-full border border-primary-100 rounded-lg px-4 py-2.5" />
          <select value={form.category} onChange={(e) => set('category', e.target.value)} className="w-full border border-primary-100 rounded-lg px-4 py-2.5">
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <textarea value={form.description} onChange={(e) => set('description', e.target.value)} rows={3} placeholder="Description" className="w-full border border-primary-100 rounded-lg px-4 py-2.5 resize-none" />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-primary/60">Target</label>
              <input type="number" value={form.target} onChange={(e) => set('target', Number(e.target.value))} className="w-full border border-primary-100 rounded-lg px-4 py-2.5 mt-1" />
            </div>
            <div>
              <label className="text-xs text-primary/60">Achieved</label>
              <input type="number" value={form.achieved} onChange={(e) => set('achieved', Number(e.target.value))} className="w-full border border-primary-100 rounded-lg px-4 py-2.5 mt-1" />
            </div>
          </div>
          <input value={form.unit} onChange={(e) => set('unit', e.target.value)} placeholder="Unit (e.g. children enrolled)" className="w-full border border-primary-100 rounded-lg px-4 py-2.5" />

          <div>
            <div className="flex justify-between text-xs text-primary/60 mb-1">
              <span>Progress preview</span><span className="font-semibold text-primary">{progress}%</span>
            </div>
            <div className="h-2 bg-accent rounded-full overflow-hidden">
              <div className="h-full bg-secondary rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div>
            <label className="text-xs text-primary/60 block mb-1">Status</label>
            <div className="flex gap-2">
              {['upcoming', 'active', 'completed'].map((s) => (
                <button key={s} type="button" onClick={() => set('status', s)}
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold capitalize border ${form.status === s ? 'bg-primary text-white border-primary' : 'border-primary-100 text-primary'}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-primary/60 block mb-1">Cover image</label>
            <input type="file" accept="image/*" onChange={onImage} className="text-sm" />
            {form.imageUrl && <img src={form.imageUrl} alt="preview" className="w-24 h-24 object-cover rounded-lg mt-2" />}
          </div>

          <button disabled={uploading || !form.title} onClick={() => onSave({ ...form, progress })} className="btn-primary w-full justify-center">
            {uploading ? 'Uploading image…' : 'Save Program'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProgramsManager() {
  const [programs, setPrograms] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    const unsub = subscribeCollection('programs', setPrograms);
    return unsub;
  }, []);

  const save = async (form) => {
    try {
      if (form.id) {
        await updateItem('programs', form.id, form);
        toast.success('Program updated');
      } else {
        await addItem('programs', form);
        toast.success('Program added');
      }
      setEditing(null);
    } catch (err) {
      console.error('Failed to save program:', err);
      toast.error(err.code === 'permission-denied'
        ? 'Permission denied — make sure you are signed in via /admin/login.'
        : `Failed to save program: ${err.message}`);
    }
  };

  const remove = async (id) => {
    try {
      await deleteItem('programs', id);
      toast.success('Program deleted');
    } catch (err) {
      console.error('Failed to delete program:', err);
      toast.error(`Failed to delete: ${err.message}`);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">Programs Manager</h1>
          <p className="text-sm text-primary/50">Track progress and impact metrics for each program.</p>
        </div>
        <button onClick={() => setEditing(BLANK)} className="btn-primary text-sm py-2 px-4">
          <Plus size={15} /> Add Program
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {programs.map((p) => (
          <div key={p.id} className="card overflow-hidden">
            <ImageWithFallback src={p.imageUrl} alt={p.title} className="w-full h-32 object-cover" iconSize={22} />
            <div className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono uppercase text-secondary">{p.category}</span>
                <h3 className="font-semibold text-primary">{p.title}</h3>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full capitalize ${
                p.status === 'active' ? 'bg-success/10 text-success' : p.status === 'completed' ? 'bg-primary-100 text-primary-600' : 'bg-secondary/10 text-secondary-700'
              }`}>{p.status}</span>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs text-primary/60 mb-1">
                <span>{p.achieved?.toLocaleString()} / {p.target?.toLocaleString()} {p.unit}</span>
                <span className="font-semibold text-primary">{p.progress}%</span>
              </div>
              <div className="h-2 bg-accent rounded-full overflow-hidden">
                <div className="h-full bg-secondary rounded-full" style={{ width: `${p.progress}%` }} />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={() => setEditing(p)} className="flex-1 btn-outline text-xs py-2"><Pencil size={13} /> Edit</button>
              <button onClick={() => remove(p.id)} className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-red-500 border-2 border-red-200 rounded-full py-2 hover:bg-red-50"><Trash2 size={13} /> Delete</button>
            </div>
            </div>
          </div>
        ))}
        {programs.length === 0 && <p className="col-span-full text-center text-primary/40 py-10">No programs yet.</p>}
      </div>

      {editing && <ProgramForm initial={editing.id ? editing : null} onSave={save} onCancel={() => setEditing(null)} />}
    </div>
  );
}
