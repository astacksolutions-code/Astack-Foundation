import { useEffect, useState } from 'react';
import { Image, Calendar, TrendingUp, Inbox, Star, Activity } from 'lucide-react';
import { subscribeCollection } from '../firebase/dataLayer';

function StatCard({ icon: Icon, label, value, tint }) {
  return (
    <div className="card p-5 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${tint}`}>
        <Icon size={20} />
      </div>
      <div>
        <div className="text-2xl font-bold text-primary font-mono">{value}</div>
        <div className="text-xs text-primary/50">{label}</div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [counts, setCounts] = useState({ gallery: 0, events: 0, programs: 0, unread: 0, feedback: 0 });
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    const unsubs = [
      subscribeCollection('gallery', (items) => setCounts((c) => ({ ...c, gallery: items.length }))),
      subscribeCollection('events', (items) => setCounts((c) => ({ ...c, events: items.length }))),
      subscribeCollection('programs', (items) => setCounts((c) => ({ ...c, programs: items.length }))),
      subscribeCollection('contacts', (items) => setCounts((c) => ({ ...c, unread: items.filter((i) => i.status === 'unread').length }))),
      subscribeCollection('feedback', (items) => setCounts((c) => ({ ...c, feedback: items.length }))),
      subscribeCollection('activityLog', setActivity),
    ];
    return () => unsubs.forEach((u) => u());
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-1">Dashboard</h1>
      <p className="text-sm text-primary/50 mb-6">Overview of everything happening across Astack Foundation.</p>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <StatCard icon={Image} label="Gallery Items" value={counts.gallery} tint="bg-secondary/10 text-secondary" />
        <StatCard icon={Calendar} label="Events" value={counts.events} tint="bg-primary/10 text-primary" />
        <StatCard icon={TrendingUp} label="Programs" value={counts.programs} tint="bg-success/10 text-success" />
        <StatCard icon={Inbox} label="Unread Messages" value={counts.unread} tint="bg-secondary/10 text-secondary" />
        <StatCard icon={Star} label="Feedback Entries" value={counts.feedback} tint="bg-primary/10 text-primary" />
      </div>

      <div className="card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Activity size={16} className="text-secondary" />
          <h2 className="font-semibold text-primary">Recent Activity</h2>
        </div>
        <ul className="divide-y divide-primary-100/60">
          {activity.map((a) => (
            <li key={a.id} className="py-3 flex items-center justify-between text-sm">
              <span className="text-primary/80"><strong className="text-primary">{a.user}</strong> — {a.action}</span>
              <span className="text-xs text-primary/40">{new Date(a.timestamp).toLocaleString()}</span>
            </li>
          ))}
          {activity.length === 0 && <li className="py-6 text-center text-primary/40 text-sm">No activity yet.</li>}
        </ul>
      </div>
    </div>
  );
}
