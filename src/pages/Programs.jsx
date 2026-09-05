
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, HeartHandshake, HelpingHand, Target, TrendingUp, Clock, Users, Award, Sparkles, ArrowRight } from 'lucide-react';
import ImageWithFallback from '../components/ImageWithFallback';
import toast from 'react-hot-toast';
import { subscribeCollection, addItem } from '../firebase/dataLayer';

const STATUS_STYLE = {
  active: 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20',
  completed: 'bg-blue-500/10 text-blue-600 border border-blue-500/20',
  upcoming: 'bg-amber-500/10 text-amber-600 border border-amber-500/20',
};

const STATUS_LABELS = {
  active: 'Active',
  completed: 'Completed',
  upcoming: 'Upcoming',
};

const CATEGORY_ICONS = {
  education: Award,
  health: HeartHandshake,
  water: Target,
  livelihood: TrendingUp,
  default: Sparkles,
};

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

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  hover: {
    y: -10,
    scale: 1.01,
    boxShadow: "0 30px 60px -20px rgba(0,0,0,0.15), 0 0 0 1px rgba(var(--secondary-rgb),0.08)",
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const modalVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const modalContentVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 20,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

function ActionModal({ program, mode, onClose }) {
  const [amount, setAmount] = useState(2000);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await addItem(mode === 'donate' ? 'donations' : 'volunteers', {
      programId: program.id, 
      programTitle: program.title, 
      name, 
      email,
      ...(mode === 'donate' ? { amount } : {}),
    });
    setSubmitting(false);
    toast.success(mode === 'donate' 
      ? `Thank you! PKR ${amount.toLocaleString()} pledged to ${program.title}.` 
      : `Thanks for volunteering for ${program.title}!`
    );
    onClose();
  };

  return (
    <motion.div
      variants={modalVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 bg-primary-900/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.form
        onSubmit={submit}
        variants={modalContentVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl max-w-md w-full p-8 relative shadow-2xl"
      >
        {/* Decorative top bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary to-secondary-300 rounded-t-2xl" />
        
        <button 
          type="button" 
          onClick={onClose} 
          className="absolute top-4 right-4 text-primary/30 hover:text-primary transition-colors p-1 hover:bg-primary/5 rounded-full"
          aria-label="Close"
        >
          <X size={20} />
        </button>
        
        <div className="flex items-center gap-3 mb-2">
          {mode === 'donate' ? (
            <HeartHandshake size={24} className="text-secondary" />
          ) : (
            <HelpingHand size={24} className="text-secondary" />
          )}
          <h3 className="font-display font-medium text-xl text-primary">
            {mode === 'donate' ? 'Donate to' : 'Volunteer for'}
          </h3>
        </div>
        <p className="text-sm text-primary/60 mb-6 font-light">{program.title}</p>

        <div className="space-y-5">
          <div>
            <label className="text-xs text-primary/40 font-medium tracking-wider uppercase block mb-1.5">
              Full Name
            </label>
            <input 
              required 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Enter your full name" 
              className="w-full border border-primary-100 rounded-xl px-4 py-3 focus:border-secondary outline-none transition-colors bg-accent/5" 
            />
          </div>
          
          <div>
            <label className="text-xs text-primary/40 font-medium tracking-wider uppercase block mb-1.5">
              Email Address
            </label>
            <input 
              required 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Enter your email" 
              className="w-full border border-primary-100 rounded-xl px-4 py-3 focus:border-secondary outline-none transition-colors bg-accent/5" 
            />
          </div>
          
          {mode === 'donate' && (
            <div>
              <label className="text-xs text-primary/40 font-medium tracking-wider uppercase block mb-1.5">
                Amount (PKR)
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[1000, 2000, 5000, 10000].map((v) => (
                  <button
                    type="button"
                    key={v}
                    onClick={() => setAmount(v)}
                    className={`py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                      amount === v 
                        ? 'bg-secondary text-white shadow-lg shadow-secondary/30 scale-105' 
                        : 'bg-accent/10 text-primary hover:bg-accent/20'
                    }`}
                  >
                    {v.toLocaleString()}
                  </button>
                ))}
              </div>
              <div className="mt-2 text-xs text-primary/30 text-center font-light">
                Custom amount available after clicking
              </div>
            </div>
          )}
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={submitting} 
            type="submit" 
            className={`w-full py-3.5 rounded-xl font-medium text-white transition-all duration-300 ${
              submitting 
                ? 'bg-primary/40 cursor-not-allowed' 
                : 'bg-secondary hover:shadow-2xl hover:shadow-secondary/30'
            }`}
          >
            {submitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing…
              </span>
            ) : mode === 'donate' ? (
              `Confirm Donation · PKR ${amount.toLocaleString()}`
            ) : (
              'Confirm Volunteering'
            )}
          </motion.button>
        </div>
      </motion.form>
    </motion.div>
  );
}

export default function Programs() {
  const [programs, setPrograms] = useState([]);
  const [action, setAction] = useState(null);

  useEffect(() => {
    const unsub = subscribeCollection('programs', setPrograms);
    return unsub;
  }, []);

  return (
    <div className="py-20 bg-gradient-to-b from-white to-accent/5">
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
            Our Work
          </span>
          <h1 className="text-4xl md:text-5xl font-light text-primary mt-4 leading-tight">
            Programs
          </h1>
          <p className="text-primary/50 mt-3 text-base font-light max-w-md mx-auto">
            Four focus areas, measured by real outcomes — not promises.
          </p>
          
          {/* Decorative line */}
          <div className="w-16 h-0.5 bg-secondary/30 mx-auto mt-6 rounded-full" />
        </motion.div>

        {/* Program Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
        >
          {programs.map((p, i) => {
            const CategoryIcon = CATEGORY_ICONS[p.category?.toLowerCase()] || CATEGORY_ICONS.default;
            return (
              <motion.div
                key={p.id}
                variants={cardVariants}
                whileHover="hover"
                className="group bg-white border border-primary/5 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative h-56 overflow-hidden">
                  <ImageWithFallback 
                    src={p.imageUrl} 
                    alt={p.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-[0.16,1,0.3,1]" 
                  />
                  
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Status Badge */}
                  <span className={`absolute top-4 left-4 text-xs font-medium px-4 py-1.5 rounded-full capitalize backdrop-blur-sm ${STATUS_STYLE[p.status]}`}>
                    {STATUS_LABELS[p.status] || p.status}
                  </span>
                  
                  {/* Category Badge */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-lg">
                    <CategoryIcon size={14} className="text-secondary" />
                    <span className="text-xs font-medium text-primary capitalize">{p.category}</span>
                  </div>
                </div>
                
                <div className="p-7 flex-1 flex flex-col">
                  <h3 className="font-medium text-xl text-primary group-hover:text-secondary transition-colors duration-300">
                    {p.title}
                  </h3>
                  <p className="text-primary/50 text-sm mt-2 flex-1 leading-relaxed font-light">
                    {p.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="mt-5">
                    <div className="flex justify-between text-xs text-primary/50 font-light mb-1.5">
                      <span>{p.achieved.toLocaleString()} / {p.target.toLocaleString()} {p.unit}</span>
                      <span className="font-medium text-secondary">{p.progress}%</span>
                    </div>
                    <div className="h-2 bg-accent/30 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${p.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full bg-gradient-to-r from-secondary to-secondary-300 rounded-full"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setAction({ program: p, mode: 'donate' })} 
                      className="flex-1 bg-secondary text-white font-medium text-sm py-3 rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-secondary/30 flex items-center justify-center gap-2"
                    >
                      <HeartHandshake size={16} />
                      Donate
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setAction({ program: p, mode: 'volunteer' })} 
                      className="flex-1 border-2 border-primary/10 text-primary font-medium text-sm py-3 rounded-xl transition-all duration-300 hover:border-secondary hover:text-secondary hover:bg-secondary/5 flex items-center justify-center gap-2"
                    >
                      <HelpingHand size={16} />
                      Volunteer
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        {programs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center mt-16"
          >
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-2 text-secondary/60 hover:text-secondary transition-colors duration-300 text-sm font-light group"
            >
              Want to partner with us?
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        )}
      </div>

      {/* Action Modal */}
      <AnimatePresence>
        {action && (
          <ActionModal 
            program={action.program} 
            mode={action.mode} 
            onClose={() => setAction(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}