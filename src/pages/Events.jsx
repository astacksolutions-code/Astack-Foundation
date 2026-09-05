
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Users, X, Clock, ChevronRight, Sparkles, CheckCircle, Circle } from 'lucide-react';
import ImageWithFallback from '../components/ImageWithFallback';
import toast from 'react-hot-toast';
import { format, parseISO } from 'date-fns';
import { subscribeCollection, addItem, updateItem } from '../firebase/dataLayer';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Enter a valid email'),
  phone: z.string().min(7, 'Enter a valid phone number'),
  guests: z.coerce.number().min(1).max(10),
});

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
      staggerChildren: 0.08,
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
    y: -6,
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

function RegisterModal({ event, onClose }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { guests: 1 },
  });

  const onSubmit = async (data) => {
    await addItem('registrations', { eventId: event.id, eventTitle: event.title, ...data });
    await updateItem('events', event.id, { registrationCount: (event.registrationCount || 0) + Number(data.guests) });
    toast.success(`You're registered! A confirmation email was sent to ${data.email}.`);
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
        onSubmit={handleSubmit(onSubmit)}
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
          <Calendar size={24} className="text-secondary" />
          <h3 className="font-display font-medium text-xl text-primary">
            Register
          </h3>
        </div>
        <p className="text-sm text-primary/60 mb-6 font-light">{event.title}</p>

        <div className="space-y-5">
          <div>
            <label className="text-xs text-primary/40 font-medium tracking-wider uppercase block mb-1.5">
              Full Name
            </label>
            <input 
              {...register('name')} 
              placeholder="Enter your full name" 
              className="w-full border border-primary-100 rounded-xl px-4 py-3 focus:border-secondary outline-none transition-colors bg-accent/5" 
            />
            {errors.name && (
              <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-rose-500" />
                {errors.name.message}
              </p>
            )}
          </div>
          
          <div>
            <label className="text-xs text-primary/40 font-medium tracking-wider uppercase block mb-1.5">
              Email Address
            </label>
            <input 
              {...register('email')} 
              placeholder="Enter your email" 
              className="w-full border border-primary-100 rounded-xl px-4 py-3 focus:border-secondary outline-none transition-colors bg-accent/5" 
            />
            {errors.email && (
              <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-rose-500" />
                {errors.email.message}
              </p>
            )}
          </div>
          
          <div>
            <label className="text-xs text-primary/40 font-medium tracking-wider uppercase block mb-1.5">
              Phone Number
            </label>
            <input 
              {...register('phone')} 
              placeholder="Enter your phone number" 
              className="w-full border border-primary-100 rounded-xl px-4 py-3 focus:border-secondary outline-none transition-colors bg-accent/5" 
            />
            {errors.phone && (
              <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-rose-500" />
                {errors.phone.message}
              </p>
            )}
          </div>
          
          <div>
            <label className="text-xs text-primary/40 font-medium tracking-wider uppercase block mb-1.5">
              Number of Attendees
            </label>
            <input 
              type="number" 
              min={1} 
              max={10} 
              {...register('guests')} 
              className="w-full border border-primary-100 rounded-xl px-4 py-3 focus:border-secondary outline-none transition-colors bg-accent/5" 
            />
            {errors.guests && (
              <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-rose-500" />
                {errors.guests.message}
              </p>
            )}
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting} 
            type="submit" 
            className={`w-full py-3.5 rounded-xl font-medium text-white transition-all duration-300 ${
              isSubmitting 
                ? 'bg-primary/40 cursor-not-allowed' 
                : 'bg-secondary hover:shadow-2xl hover:shadow-secondary/30'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Registering…
              </span>
            ) : (
              'Confirm Registration'
            )}
          </motion.button>
        </div>
      </motion.form>
    </motion.div>
  );
}

export default function Events() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('upcoming');
  const [modalEvent, setModalEvent] = useState(null);

  useEffect(() => {
    const unsub = subscribeCollection('events', setEvents, 'date', 'asc');
    return unsub;
  }, []);

  const filtered = events.filter((e) => e.status === filter);

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
            Get Involved
          </span>
          <h1 className="text-4xl md:text-5xl font-light text-primary mt-4 leading-tight">
            Events
          </h1>
          <p className="text-primary/50 mt-3 text-base font-light max-w-md mx-auto">
            Join us on the ground — every registration helps us plan better.
          </p>
          
          {/* Decorative line */}
          <div className="w-16 h-0.5 bg-secondary/30 mx-auto mt-6 rounded-full" />
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center gap-2 mb-12"
        >
          {[
            { value: 'upcoming', label: 'Upcoming', icon: Sparkles },
            { value: 'completed', label: 'Completed', icon: CheckCircle },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = filter === tab.value;
            return (
              <motion.button
                key={tab.value}
                onClick={() => setFilter(tab.value)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive 
                    ? 'bg-secondary text-white shadow-lg shadow-secondary/30' 
                    : 'bg-accent/30 text-primary/60 hover:text-primary hover:bg-accent/50'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-white' : 'text-current'} />
                {tab.label}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Events List */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 gap-6 max-w-4xl mx-auto"
        >
          {filtered.map((ev, i) => {
            const isUpcoming = ev.status === 'upcoming';
            const progress = ev.capacity > 0 ? Math.round((ev.registrationCount / ev.capacity) * 100) : 0;
            const isFull = ev.registrationCount >= ev.capacity;

            return (
              <motion.div
                key={ev.id}
                variants={cardVariants}
                whileHover="hover"
                className="group bg-white border border-primary/5 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="md:w-64 h-52 md:h-auto relative overflow-hidden flex-shrink-0">
                    <ImageWithFallback 
                      src={ev.imageUrl} 
                      alt={ev.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-[0.16,1,0.3,1]" 
                    />
                    
                    {/* Status Badge */}
                    <div className={`absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm ${
                      isUpcoming 
                        ? 'bg-emerald-500/90 text-white' 
                        : 'bg-primary/80 text-white/80'
                    }`}>
                      {isUpcoming ? (
                        <Circle size={8} className="fill-white animate-pulse" />
                      ) : (
                        <CheckCircle size={12} />
                      )}
                      {isUpcoming ? 'Upcoming' : 'Completed'}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 text-xs text-primary/50 font-light mb-2">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={13} className="text-secondary/60" />
                          {format(parseISO(ev.date), 'MMM d, yyyy')}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock size={13} className="text-secondary/60" />
                          {ev.time}
                        </span>
                      </div>
                      
                      <h3 className="font-medium text-lg text-primary group-hover:text-secondary transition-colors duration-300">
                        {ev.title}
                      </h3>
                      <p className="text-primary/50 text-sm mt-1.5 leading-relaxed font-light">
                        {ev.description}
                      </p>
                      <p className="text-primary/40 text-sm mt-2 flex items-center gap-1.5 font-light">
                        <MapPin size={14} className="text-secondary/40" />
                        {ev.location}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-primary/5">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 text-xs text-primary/50">
                          <Users size={13} className="text-secondary/40" />
                          <span>
                            {ev.registrationCount || 0} / {ev.capacity || 0} registered
                          </span>
                        </div>
                        {isUpcoming && (
                          <div className="w-20 h-1.5 bg-accent/30 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-500 ${
                                isFull ? 'bg-rose-400' : 'bg-secondary'
                              }`}
                              style={{ width: `${Math.min(progress, 100)}%` }}
                            />
                          </div>
                        )}
                      </div>
                      
                      {isUpcoming && !isFull && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setModalEvent(ev)} 
                          className="flex items-center gap-1.5 px-5 py-2 bg-secondary text-white text-sm font-medium rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-secondary/30"
                        >
                          Register
                          <ChevronRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                        </motion.button>
                      )}
                      
                      {isUpcoming && isFull && (
                        <span className="text-xs text-rose-500 font-medium bg-rose-50 px-3 py-1.5 rounded-full">
                          Fully Booked
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="inline-block p-6 bg-primary/5 rounded-full mb-4">
              <Calendar size={32} className="text-primary/20" />
            </div>
            <p className="text-primary/40 font-light">
              No {filter} events right now.
            </p>
            <p className="text-primary/30 text-sm font-light mt-1">
              Check back soon for new opportunities.
            </p>
          </motion.div>
        )}
      </div>

      {/* Register Modal */}
      <AnimatePresence>
        {modalEvent && (
          <RegisterModal 
            event={modalEvent} 
            onClose={() => setModalEvent(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}