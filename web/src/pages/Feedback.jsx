
import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Send, Star, MessageSquare, User, Tag, Sparkles, CheckCircle, Heart } from 'lucide-react';
import StarRating from '../components/StarRating';
import { addItem } from '../firebase/dataLayer';

const CATEGORIES = ['Education', 'Health', 'Relief', 'Livelihood', 'Infrastructure', 'General'];

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const formVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const fieldVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const ratingVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.1
    }
  }
};

export default function Feedback() {
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error('Please select a star rating.');
      return;
    }
    setSubmitting(true);
    await addItem('feedback', {
      name: anonymous ? 'Anonymous' : name || 'Anonymous',
      rating, category, comment, anonymous, reply: null,
    });
    setSubmitting(false);
    toast.success('Thank you for your feedback!');
    setRating(0); setName(''); setComment(''); setAnonymous(false); setCategory(CATEGORIES[0]);
  };

  const ratingLabels = ['Terrible', 'Poor', 'Average', 'Good', 'Excellent'];

  return (
    <div className="py-20 bg-gradient-to-b from-white to-accent/5 min-h-screen">
      <div className="container-page">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block text-secondary text-xs font-medium tracking-[0.2em] uppercase bg-secondary/10 px-4 py-1.5 rounded-full">
            Tell Us
          </span>
          <h1 className="text-4xl md:text-5xl font-light text-primary mt-4 leading-tight">
            Share Your Feedback
          </h1>
          <p className="text-primary/50 mt-3 text-base font-light max-w-md mx-auto">
            Your experience helps us improve every program we run.
          </p>
          
          {/* Decorative line */}
          <div className="w-16 h-0.5 bg-secondary/30 mx-auto mt-6 rounded-full" />
        </motion.div>

        {/* Form */}
        <motion.form
          variants={formVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          onSubmit={submit} 
          className="bg-white border border-primary/5 rounded-2xl p-8 max-w-lg mx-auto shadow-sm hover:shadow-xl transition-shadow duration-500 relative overflow-hidden"
        >
          {/* Decorative top bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary to-secondary-300" />
          
          {/* Decorative background element */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-secondary/[0.02] rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-secondary/[0.02] rounded-full blur-2xl pointer-events-none" />

          {/* Rating Section */}
          <motion.div variants={fieldVariants} className="text-center relative z-10">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Star size={18} className="text-secondary" fill="var(--secondary)" />
              <label className="text-sm text-primary/70 font-medium tracking-wide">
                Your Rating
              </label>
            </div>
            <motion.div
              variants={ratingVariants}
              initial="hidden"
              animate="visible"
              className="flex justify-center"
            >
              <StarRating value={rating} onChange={setRating} size={36} />
            </motion.div>
            {rating > 0 && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-primary/40 mt-2 font-light"
              >
                {ratingLabels[rating - 1]}
              </motion.p>
            )}
          </motion.div>

          {/* Category */}
          <motion.div variants={fieldVariants} className="relative z-10">
            <label className="flex items-center gap-2 text-sm text-primary/70 font-medium tracking-wide mb-1.5">
              <Tag size={15} />
              Program Category
            </label>
            <div className="relative">
              <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)} 
                className="w-full border border-primary-100 rounded-xl px-4 py-3 focus:border-secondary outline-none transition-colors bg-accent/5 appearance-none cursor-pointer"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/30 pointer-events-none">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Name */}
          {!anonymous && (
            <motion.div 
              variants={fieldVariants} 
              initial="hidden"
              animate="visible"
              className="relative z-10"
            >
              <label className="flex items-center gap-2 text-sm text-primary/70 font-medium tracking-wide mb-1.5">
                <User size={15} />
                Your Name
              </label>
              <input 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Enter your full name" 
                className="w-full border border-primary-100 rounded-xl px-4 py-3 focus:border-secondary outline-none transition-colors bg-accent/5" 
              />
            </motion.div>
          )}

          {/* Comment */}
          <motion.div variants={fieldVariants} className="relative z-10">
            <label className="flex items-center gap-2 text-sm text-primary/70 font-medium tracking-wide mb-1.5">
              <MessageSquare size={15} />
              Comments
            </label>
            <textarea 
              value={comment} 
              onChange={(e) => setComment(e.target.value)} 
              rows={4} 
              placeholder="What went well? What could be better?" 
              className="w-full border border-primary-100 rounded-xl px-4 py-3 focus:border-secondary outline-none transition-colors bg-accent/5 resize-none" 
            />
            <div className="text-right text-xs text-primary/20 font-light mt-1">
              {comment.length} characters
            </div>
          </motion.div>

          {/* Anonymous Checkbox */}
          <motion.div variants={fieldVariants} className="relative z-10">
            <label className="flex items-center gap-3 text-sm text-primary/60 font-light cursor-pointer group">
              <div className="relative">
                <input 
                  type="checkbox" 
                  checked={anonymous} 
                  onChange={(e) => setAnonymous(e.target.checked)} 
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded-md border-2 transition-all duration-300 flex items-center justify-center ${
                  anonymous 
                    ? 'bg-secondary border-secondary' 
                    : 'border-primary/20 group-hover:border-primary/40'
                }`}>
                  {anonymous && (
                    <motion.svg
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-3.5 h-3.5 text-white"
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </motion.svg>
                  )}
                </div>
              </div>
              <span className="group-hover:text-primary transition-colors">
                Submit anonymously
              </span>
            </label>
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={fieldVariants} className="relative z-10 pt-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={submitting} 
              type="submit" 
              className={`w-full py-3.5 rounded-xl font-medium text-white transition-all duration-300 flex items-center justify-center gap-2 ${
                submitting 
                  ? 'bg-primary/40 cursor-not-allowed' 
                  : 'bg-secondary hover:shadow-2xl hover:shadow-secondary/30'
              }`}
            >
              {submitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting…
                </>
              ) : (
                <>
                  <Send size={16} />
                  Submit Feedback
                </>
              )}
            </motion.button>
          </motion.div>

          {/* Footer note */}
          <motion.div 
            variants={fieldVariants}
            className="text-center mt-4 relative z-10"
          >
            <p className="text-[10px] text-primary/20 font-light flex items-center justify-center gap-1.5">
              <Heart size={12} className="text-secondary/20" />
              Your feedback helps us serve better
              <Heart size={12} className="text-secondary/20" />
            </p>
          </motion.div>
        </motion.form>
      </div>
    </div>
  );
}