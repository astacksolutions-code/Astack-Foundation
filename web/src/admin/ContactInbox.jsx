import { useEffect, useState } from 'react';
import { Mail, MailOpen, Reply, Download, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { subscribeCollection, updateItem, deleteItem } from '../firebase/dataLayer';

function toCSV(rows) {
  const headers = ['Name', 'Email', 'Subject', 'Message', 'Status', 'Date'];
  const lines = [headers.join(',')];
  rows.forEach((r) => {
    const vals = [r.name, r.email, r.subject, r.message, r.status, r.createdAt]
      .map((v) => `"${String(v ?? '').replace(/"/g, '""')}"`);
    lines.push(vals.join(','));
  });
  return lines.join('\n');
}

export default function ContactInbox() {
  const [contacts, setContacts] = useState([]);
  const [active, setActive] = useState(null);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    const unsub = subscribeCollection('contacts', setContacts);
    return unsub;
  }, []);

  const openMessage = async (c) => {
    setActive(c);
    setReplyText(c.reply || '');
    if (c.status === 'unread') await updateItem('contacts', c.id, { status: 'read' });
  };

  const sendReply = async () => {
    if (!replyText.trim()) return;
    await updateItem('contacts', active.id, { reply: replyText, status: 'read' });
    toast.success('Reply sent');
    setActive(null);
  };

  const exportCSV = () => {
    const blob = new Blob([toCSV(contacts)], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contact-inbox.csv';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Exported to CSV');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">Contact Inbox</h1>
          <p className="text-sm text-primary/50">{contacts.filter((c) => c.status === 'unread').length} unread messages</p>
        </div>
        <button onClick={exportCSV} className="btn-outline text-sm py-2 px-4"><Download size={15} /> Export CSV</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-1 card divide-y divide-primary-100/60 max-h-[70vh] overflow-y-auto">
          {contacts.map((c) => (
            <button
              key={c.id}
              onClick={() => openMessage(c)}
              className={`w-full text-left px-4 py-3 hover:bg-accent/50 transition-colors ${active?.id === c.id ? 'bg-accent/60' : ''}`}
            >
              <div className="flex items-center gap-2">
                {c.status === 'unread' ? <Mail size={14} className="text-secondary" /> : <MailOpen size={14} className="text-primary/30" />}
                <span className={`text-sm truncate ${c.status === 'unread' ? 'font-semibold text-primary' : 'text-primary/70'}`}>{c.name}</span>
              </div>
              <div className="text-xs text-primary/50 truncate mt-0.5">{c.subject}</div>
            </button>
          ))}
          {contacts.length === 0 && <p className="text-center text-primary/40 py-10 text-sm">No messages yet.</p>}
        </div>

        <div className="lg:col-span-2 card p-6">
          {active ? (
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-primary">{active.subject}</h3>
                  <p className="text-xs text-primary/50 mt-1">{active.name} · {active.email}</p>
                </div>
                <button
                  onClick={async () => { await deleteItem('contacts', active.id); setActive(null); toast.success('Message deleted'); }}
                  className="text-red-400 hover:text-red-600" aria-label="Delete message"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <p className="text-sm text-primary/80 leading-relaxed bg-accent/40 rounded-lg p-4">{active.message}</p>

              {active.reply && (
                <div className="mt-4 border-l-2 border-secondary pl-4">
                  <p className="text-xs text-secondary font-semibold mb-1">Your reply</p>
                  <p className="text-sm text-primary/70">{active.reply}</p>
                </div>
              )}

              <div className="mt-5">
                <label className="text-xs text-primary/60 flex items-center gap-1 mb-1"><Reply size={13} /> Reply</label>
                <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} rows={4} className="w-full border border-primary-100 rounded-lg px-4 py-2.5 resize-none" placeholder="Type your reply…" />
                <button onClick={sendReply} className="btn-primary mt-3 text-sm py-2 px-4">Send Reply</button>
              </div>
            </div>
          ) : (
            <p className="text-center text-primary/40 py-16">Select a message to view it.</p>
          )}
        </div>
      </div>
    </div>
  );
}
