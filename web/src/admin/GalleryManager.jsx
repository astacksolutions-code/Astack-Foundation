import { useEffect, useRef, useState } from 'react';
import { UploadCloud, Trash2, ZoomIn, X, CheckSquare, Square } from 'lucide-react';
import ImageWithFallback from '../components/ImageWithFallback';
import toast from 'react-hot-toast';
import { subscribeCollection, addItem, deleteItem, bulkDelete } from '../firebase/dataLayer';
import { uploadImage } from '../firebase/storageApi';

const CATEGORIES = ['Relief', 'Health', 'Education', 'Infrastructure', 'Livelihood'];

export default function GalleryManager() {
  const [items, setItems] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [selected, setSelected] = useState(new Set());
  const [zoomItem, setZoomItem] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const unsub = subscribeCollection('gallery', setItems);
    return unsub;
  }, []);

  const handleFiles = async (files) => {
    setUploading(true);
    try {
      for (const file of files) {
        if (!file.type.startsWith('image/')) continue;
        const imageUrl = await uploadImage(file);
        await addItem('gallery', { title: file.name.replace(/\.[^/.]+$/, ''), category, imageUrl });
      }
      toast.success(`${files.length} image(s) uploaded`);
    } catch (err) {
      console.error('Gallery upload failed:', err);
      toast.error(err.code === 'permission-denied'
        ? 'Permission denied — make sure you are signed in via /admin/login.'
        : err.code === 'storage/unauthorized'
        ? 'Storage permission denied — check storage.rules is published in Firebase console.'
        : `Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(Array.from(e.dataTransfer.files));
  };

  const toggleSelect = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const doBulkDelete = async () => {
    if (selected.size === 0) return;
    await bulkDelete('gallery', Array.from(selected));
    toast.success(`Deleted ${selected.size} image(s)`);
    setSelected(new Set());
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">Gallery Manager</h1>
          <p className="text-sm text-primary/50">Upload and organize photos shown on the public gallery.</p>
        </div>
        {selected.size > 0 && (
          <button onClick={doBulkDelete} className="flex items-center gap-2 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full">
            <Trash2 size={15} /> Delete {selected.size} selected
          </button>
        )}
      </div>

      <div className="flex items-center gap-3 mb-4">
        <label className="text-sm text-primary/70">Upload category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="border border-primary-100 rounded-lg px-3 py-1.5 text-sm">
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-colors mb-8 ${
          dragging ? 'border-secondary bg-secondary/5' : 'border-primary-200 hover:border-secondary/60'
        }`}
      >
        <UploadCloud className={`mx-auto mb-3 ${dragging ? 'text-secondary' : 'text-primary/40'}`} size={32} />
        <p className="text-sm text-primary/70">
          {uploading ? 'Uploading…' : 'Drag & drop images here, or click to browse'}
        </p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFiles(Array.from(e.target.files))}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.id} className="relative group rounded-xl overflow-hidden border border-primary-100">
            <button
              onClick={() => toggleSelect(item.id)}
              className="absolute top-2 left-2 z-10 bg-white/90 rounded p-0.5"
              aria-label="Select image"
            >
              {selected.has(item.id) ? <CheckSquare size={18} className="text-secondary" /> : <Square size={18} className="text-primary/50" />}
            </button>
            <ImageWithFallback src={item.imageUrl} alt={item.title} className="w-full h-36 object-cover" iconSize={20} />
            <div className="absolute inset-0 bg-primary/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <button onClick={() => setZoomItem(item)} className="text-white hover:text-secondary" aria-label="Zoom"><ZoomIn size={18} /></button>
              <button onClick={async () => { try { await deleteItem('gallery', item.id); toast.success('Image deleted'); } catch (err) { toast.error(`Delete failed: ${err.message}`); } }} className="text-white hover:text-red-400" aria-label="Delete"><Trash2 size={18} /></button>
            </div>
            <div className="p-2 bg-white">
              <div className="text-xs font-medium text-primary truncate">{item.title}</div>
              <div className="text-[10px] text-secondary">{item.category}</div>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="col-span-full text-center text-primary/40 py-10">No images yet — upload your first one above.</p>}
      </div>

      {zoomItem && (
        <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-6" onClick={() => setZoomItem(null)}>
          <button className="absolute top-6 right-6 text-white/80 hover:text-white" aria-label="Close"><X size={28} /></button>
          <img src={zoomItem.imageUrl} alt={zoomItem.title} className="max-h-[85vh] max-w-full rounded-lg object-contain" />
        </div>
      )}
    </div>
  );
}
