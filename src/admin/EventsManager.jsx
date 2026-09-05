import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Users } from 'lucide-react';
import ImageWithFallback from '../components/ImageWithFallback';
import toast from 'react-hot-toast';
import { subscribeCollection, addItem, updateItem, deleteItem } from '../firebase/dataLayer';
import { uploadImage } from '../firebase/storageApi';

const BLANK = { title: '', description: '', date: '', time: '', location: '', imageUrl: '', capacity: 100, status: 'upcoming', registrationCount: 0 };

function EventForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial || BLANK);
  const [uploading, setUploading] = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const onImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const url = await uploadImage(file);
    set('imageUrl', url);
    setUploading(false);
  };

  return (
    <div className="fixed inset-0 bg-primary-900/60 z-[100] flex items-center justify-center p-4" onClick={onCancel}>
      <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto relative">
        <button onClick={onCancel} className="absolute top-4 right-4 text-primary/50 hover:text-primary" aria-label="Close"><X size={20} /></button>
        <h3 className="font-display font-bold text-xl text-primary mb-5">{initial ? 'Edit Event' : 'Add Event'}</h3>
        <div className="space-y-4">
          <input value={form.title} onChange={(e) => set('title', e.target.value)} placeholder="Event title" className="w-full border border-primary-100 rounded-lg px-4 py-2.5" />
          <textarea value={form.description} onChange={(e) => set('description', e.target.value)} placeholder="Description" rows={3} className="w-full border border-primary-100 rounded-lg px-4 py-2.5 resize-none" />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-primary/60">Date</label>
              <input type="date" value={form.date} onChange={(e) => set('date', e.target.value)} className="w-full border border-primary-100 rounded-lg px-4 py-2.5 mt-1" />
            </div>
            <div>
              <label className="text-xs text-primary/60">Time</label>
              <input type="time" value={form.time} onChange={(e) => set('time', e.target.value)} className="w-full border border-primary-100 rounded-lg px-4 py-2.5 mt-1" />
            </div>
          </div>
          <input value={form.location} onChange={(e) => set('location', e.target.value)} placeholder="Location" className="w-full border border-primary-100 rounded-lg px-4 py-2.5" />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-primary/60">Capacity</label>
              <input type="number" value={form.capacity} onChange={(e) => set('capacity', Number(e.target.value))} className="w-full border border-primary-100 rounded-lg px-4 py-2.5 mt-1" />
            </div>
            <div>
              <label className="text-xs text-primary/60">Status</label>
              <select value={form.status} onChange={(e) => set('status', e.target.value)} className="w-full border border-primary-100 rounded-lg px-4 py-2.5 mt-1">
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs text-primary/60 block mb-1">Featured image</label>
            <input type="file" accept="image/*" onChange={onImage} className="text-sm" />
            {form.imageUrl && <img src={form.imageUrl} alt="preview" className="w-24 h-24 object-cover rounded-lg mt-2" />}
          </div>
          <button
            disabled={uploading || !form.title || !form.date}
            onClick={() => onSave(form)}
            className="btn-primary w-full justify-center"
          >
            {uploading ? 'Uploading image…' : 'Save Event'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function EventsManager() {
  const [events, setEvents] = useState([]);
  const [editing, setEditing] = useState(null); // event obj, BLANK, or null

  useEffect(() => {
    const unsub = subscribeCollection('events', setEvents, 'date', 'asc');
    return unsub;
  }, []);

  const save = async (form) => {
    try {
      if (form.id) {
        await updateItem('events', form.id, form);
        toast.success('Event updated');
      } else {
        await addItem('events', form);
        toast.success('Event added');
      }
      setEditing(null);
    } catch (err) {
      console.error('Failed to save event:', err);
      toast.error(err.code === 'permission-denied'
        ? 'Permission denied — make sure you are signed in via /admin/login.'
        : `Failed to save event: ${err.message}`);
    }
  };

  const remove = async (id) => {
    try {
      await deleteItem('events', id);
      toast.success('Event deleted');
    } catch (err) {
      console.error('Failed to delete event:', err);
      toast.error(`Failed to delete: ${err.message}`);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">Events Manager</h1>
          <p className="text-sm text-primary/50">Create and manage events shown to the public.</p>
        </div>
        <button onClick={() => setEditing(BLANK)} className="btn-primary text-sm py-2 px-4">
          <Plus size={15} /> Add Event
        </button>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-accent/60 text-primary/70 text-xs uppercase">
            <tr>
              <th className="text-left px-4 py-3">Event</th>
              <th className="text-left px-4 py-3">Date</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Registrations</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-primary-100/60">
            {events.map((ev) => (
              <tr key={ev.id}>
                <td className="px-4 py-3 flex items-center gap-3">
                  <ImageWithFallback src={ev.imageUrl} alt="" className="w-10 h-10 rounded-lg object-cover" iconSize={14} />
                  <span className="font-medium text-primary">{ev.title}</span>
                </td>
                <td className="px-4 py-3 text-primary/70">{ev.date}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full capitalize ${ev.status === 'upcoming' ? 'bg-secondary/10 text-secondary-700' : 'bg-primary-100 text-primary-600'}`}>
                    {ev.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-primary/70">
                  <span className="flex items-center gap-1"><Users size={13} /> {ev.registrationCount}/{ev.capacity}</span>
                </td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button onClick={() => setEditing(ev)} className="text-primary/60 hover:text-secondary" aria-label="Edit"><Pencil size={16} className="inline" /></button>
                  <button onClick={() => remove(ev.id)} className="text-primary/60 hover:text-red-500" aria-label="Delete"><Trash2 size={16} className="inline" /></button>
                </td>
              </tr>
            ))}
            {events.length === 0 && (
              <tr><td colSpan={5} className="text-center py-10 text-primary/40">No events yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {editing && <EventForm initial={editing.id ? editing : null} onSave={save} onCancel={() => setEditing(null)} />}
    </div>
  );
}
