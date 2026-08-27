import { useEffect, useMemo, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend } from 'recharts';
import { Star, Reply, Smile, Meh, Frown } from 'lucide-react';
import toast from 'react-hot-toast';
import StarRating from '../components/StarRating';
import { subscribeCollection, updateItem } from '../firebase/dataLayer';

const POSITIVE_WORDS = ['great', 'good', 'excellent', 'kind', 'helpful', 'amazing', 'thankful', 'wonderful', 'love', 'best', 'professional', 'changed'];
const NEGATIVE_WORDS = ['bad', 'poor', 'late', 'delay', 'delayed', 'rude', 'worst', 'disappoint', 'slow', 'never', 'terrible', 'problem'];

function scoreSentiment(text = '') {
  const words = text.toLowerCase().split(/\W+/);
  let score = 0;
  words.forEach((w) => {
    if (POSITIVE_WORDS.includes(w)) score += 1;
    if (NEGATIVE_WORDS.includes(w)) score -= 1;
  });
  if (score > 0) return 'positive';
  if (score < 0) return 'negative';
  return 'neutral';
}

const SENTIMENT_COLOR = { positive: '#27AE60', neutral: '#788DA2', negative: '#E67E22' };
const SENTIMENT_ICON = { positive: Smile, neutral: Meh, negative: Frown };

export default function FeedbackAnalytics() {
  const [feedback, setFeedback] = useState([]);
  const [active, setActive] = useState(null);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    const unsub = subscribeCollection('feedback', setFeedback);
    return unsub;
  }, []);

  const ratingData = useMemo(() => {
    const buckets = [1, 2, 3, 4, 5].map((n) => ({ rating: `${n}★`, count: feedback.filter((f) => f.rating === n).length }));
    return buckets;
  }, [feedback]);

  const sentimentData = useMemo(() => {
    const counts = { positive: 0, neutral: 0, negative: 0 };
    feedback.forEach((f) => { counts[scoreSentiment(f.comment)]++; });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [feedback]);

  const avgRating = feedback.length ? (feedback.reduce((s, f) => s + f.rating, 0) / feedback.length).toFixed(1) : '—';

  const openReply = (f) => { setActive(f); setReplyText(f.reply || ''); };
  const sendReply = async () => {
    await updateItem('feedback', active.id, { reply: replyText });
    toast.success('Reply saved');
    setActive(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-1">Feedback Analytics</h1>
      <p className="text-sm text-primary/50 mb-6">{feedback.length} responses · average rating {avgRating} <Star size={12} className="inline fill-secondary text-secondary -mt-1" /></p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
        <div className="card p-5">
          <h2 className="text-sm font-semibold text-primary mb-3">Rating Distribution</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={ratingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ECF0F1" />
              <XAxis dataKey="rating" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#E67E22" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-5">
          <h2 className="text-sm font-semibold text-primary mb-3">Sentiment Breakdown</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={sentimentData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={3}>
                {sentimentData.map((entry) => (
                  <Cell key={entry.name} fill={SENTIMENT_COLOR[entry.name]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <p className="text-[11px] text-primary/40 mt-2">Keyword-based sentiment estimate from feedback comments.</p>
        </div>
      </div>

      <div className="card divide-y divide-primary-100/60">
        {feedback.map((f) => {
          const sentiment = scoreSentiment(f.comment);
          const SentIcon = SENTIMENT_ICON[sentiment];
          return (
            <div key={f.id} className="p-4 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <StarRating value={f.rating} readOnly size={14} />
                  <span className="text-xs text-primary/50">{f.category}</span>
                  <span className="flex items-center gap-1 text-xs" style={{ color: SENTIMENT_COLOR[sentiment] }}>
                    <SentIcon size={13} /> {sentiment}
                  </span>
                </div>
                <p className="text-sm text-primary/80">{f.comment}</p>
                <p className="text-xs text-primary/40 mt-1">— {f.name}</p>
                {f.reply && <p className="text-xs text-secondary mt-2 border-l-2 border-secondary pl-2">Replied: {f.reply}</p>}
              </div>
              <button onClick={() => openReply(f)} className="btn-outline text-xs py-1.5 px-3 flex-shrink-0"><Reply size={13} /> Reply</button>
            </div>
          );
        })}
        {feedback.length === 0 && <p className="text-center text-primary/40 py-10">No feedback yet.</p>}
      </div>

      {active && (
        <div className="fixed inset-0 bg-primary-900/60 z-[100] flex items-center justify-center p-4" onClick={() => setActive(null)}>
          <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="font-semibold text-primary mb-3">Reply to {active.name}</h3>
            <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} rows={4} className="w-full border border-primary-100 rounded-lg px-4 py-2.5 resize-none" />
            <button onClick={sendReply} className="btn-primary w-full justify-center mt-4">Save Reply</button>
          </div>
        </div>
      )}
    </div>
  );
}
