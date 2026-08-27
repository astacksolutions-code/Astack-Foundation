
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Calendar, MapPin, Quote, ChevronLeft, ChevronRight, Sparkles, Heart, Users, Award, Globe, Clock, TrendingUp, Play } from 'lucide-react';
import ImageWithFallback from '../components/ImageWithFallback';
import StatCounter from '../components/StatCounter';
import { subscribeCollection } from '../firebase/dataLayer';
import { orgStats, seedTestimonials } from '../utils/seedData';
import { useReveal } from '../hooks/useReveal';

const SLIDES = [
  {
    eyebrow: 'Since 2011',
    title: 'Hope becomes\naction, together.',
    body: 'Astack Foundation delivers education, healthcare, and livelihood programs to underserved communities across Pakistan.',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1400',
  },
  {
    eyebrow: 'Sehat Mobile Clinics',
    title: 'Care that comes\nto your doorstep.',
    body: 'Our mobile clinics have treated over 22,500 patients in communities with no nearby hospital.',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=1400',
  },
  {
    eyebrow: 'Hunar Skills Academy',
    title: 'A trade is a future\nyou can hold.',
    body: 'Six-month vocational courses have already changed the trajectory of hundreds of young lives.',
    image: 'https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=1400',
  },
];

const STATS_FEATURES = [
  { icon: Heart, label: 'Compassion First' },
  { icon: Award, label: 'Measurable Impact' },
  { icon: Globe, label: 'Community-Led' },
  { icon: Users, label: 'Volunteer Driven' },
];

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
      staggerChildren: 0.12,
      delayChildren: 0.1,
    }
  }
};

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
    scale: 0.95
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  exit: (direction) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  })
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
    y: -8,
    scale: 1.02,
    boxShadow: "0 30px 60px -20px rgba(0,0,0,0.15), 0 0 0 1px rgba(var(--secondary-rgb),0.1)",
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export default function Home() {
  const [slide, setSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [events, setEvents] = useState([]);
  const revealRef = useReveal();
  const revealRef2 = useReveal();

  useEffect(() => {
    const t = setInterval(() => {
      setDirection(1);
      setSlide((s) => (s + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const unsub = subscribeCollection('events', (items) =>
      setEvents(items.filter((e) => e.status === 'upcoming').slice(0, 3))
    );
    return unsub;
  }, []);

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setSlide((s) => (s + newDirection + SLIDES.length) % SLIDES.length);
  };

  const s = SLIDES[slide];

  return (
    <div className="overflow-x-hidden">
      {/* --- HERO SECTION with Premium Slideshow --- */}
      <section className="relative h-[92vh] min-h-[600px] overflow-hidden bg-primary">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={slide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            <img src={s.image} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/30" />
            
            {/* Decorative overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,215,0,0.05),transparent_60%)] pointer-events-none" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 container-page h-full flex flex-col justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={slide}
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
              variants={slideVariants}
              className="max-w-2xl"
            >
              <span className="inline-block bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-secondary-300 text-sm font-medium tracking-wider uppercase">
                {s.eyebrow}
              </span>
              <h1 className="text-white text-4xl sm:text-6xl lg:text-7xl font-light mt-5 leading-[1.05] whitespace-pre-line tracking-tight">
                {s.title}
              </h1>
              <p className="text-accent/90 text-lg mt-6 leading-relaxed max-w-lg font-light">
                {s.body}
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link to="/programs" className="group relative px-8 py-3.5 bg-secondary text-white font-medium rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-secondary/30 hover:scale-105 overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2">
                    Donate Now
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-secondary to-secondary-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                </Link>
                <Link to="/events" className="inline-flex items-center gap-2 border border-white/30 text-white/90 font-medium px-8 py-3.5 rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm">
                  <Calendar size={16} />
                  See Upcoming Events
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-3 z-10">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > slide ? 1 : -1);
                setSlide(i);
              }}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === slide ? 'w-10 bg-secondary' : 'w-2 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => paginate(-1)}
          className="hidden sm:flex absolute left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white items-center justify-center backdrop-blur-sm transition-all duration-300 hover:scale-110"
          aria-label="Previous slide"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={() => paginate(1)}
          className="hidden sm:flex absolute right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white items-center justify-center backdrop-blur-sm transition-all duration-300 hover:scale-110"
          aria-label="Next slide"
        >
          <ChevronRight size={22} />
        </button>
      </section>

      {/* --- STATS SECTION with Premium Design --- */}
      <section className="bg-primary py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.03),transparent_60%)] pointer-events-none" />
        
        <div className="container-page relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <span className="inline-block bg-white/5 backdrop-blur-sm px-4 py-1.5 rounded-full text-secondary-300 text-sm font-medium tracking-wider uppercase">
              Our Impact
            </span>
            <h2 className="text-3xl md:text-4xl font-light text-white mt-4">
              Making a Difference Together
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            <StatCounter value={orgStats.livesImpacted} label="Lives Impacted" icon={Heart} />
            <StatCounter value={orgStats.volunteers} label="Active Volunteers" icon={Users} />
            <StatCounter value={orgStats.programsRun} label="Programs Run" icon={Award} />
            <StatCounter value={orgStats.citiesServed} label="Cities Served" icon={Globe} />
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 flex flex-wrap justify-center items-center gap-6 md:gap-10"
          >
            {STATS_FEATURES.map((feature, i) => (
              <div key={i} className="flex items-center gap-2 text-accent/50 text-xs font-light tracking-wider uppercase">
                <feature.icon size={14} className="text-secondary/40" />
                {feature.label}
              </div>
            ))}
          </motion.div>
        </div>
        
        <div className="wave-divider h-10 w-full absolute -bottom-1 left-0" />
      </section>

      {/* --- UPCOMING EVENTS with Premium Cards --- */}
      <section className="py-24 bg-accent/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(var(--secondary-rgb),0.02),transparent_50%)] pointer-events-none" />
        
        <div className="container-page relative z-10">
          <motion.div
            ref={revealRef}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <span className="inline-block text-secondary text-xs font-medium tracking-[0.2em] uppercase bg-secondary/10 px-4 py-1.5 rounded-full">
                What's Next
              </span>
              <h2 className="text-3xl md:text-4xl font-light text-primary mt-3 leading-tight">
                Upcoming Events
              </h2>
            </div>
            <Link to="/events" className="hidden sm:inline-flex items-center gap-2 text-secondary font-light hover:gap-3 transition-all duration-300 group">
              View all 
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {events.map((ev, i) => (
              <motion.div
                key={ev.id}
                variants={cardVariants}
                whileHover="hover"
                className="group bg-white border border-primary/5 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative h-52 overflow-hidden">
                  <ImageWithFallback 
                    src={ev.imageUrl} 
                    alt={ev.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-[0.16,1,0.3,1]" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Date Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-lg">
                    <div className="text-secondary text-xs font-bold">{ev.date}</div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-medium text-primary text-lg group-hover:text-secondary transition-colors duration-300">
                    {ev.title}
                  </h3>
                  <p className="text-sm text-primary/50 mt-2 flex items-center gap-1.5 font-light">
                    <MapPin size={14} className="text-secondary/40" />
                    {ev.location}
                  </p>
                  <div className="mt-4 pt-4 border-t border-primary/5 flex items-center justify-between">
                    <span className="text-xs text-primary/30 font-light flex items-center gap-1">
                      <Clock size={12} />
                      {ev.time || '9:00 AM'}
                    </span>
                    <Link 
                      to={`/events/${ev.id}`} 
                      className="text-secondary text-xs font-medium hover:underline flex items-center gap-1"
                    >
                      Learn More
                      <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- TESTIMONIALS with Premium Design --- */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/[0.02] to-transparent pointer-events-none" />
        
        <div className="container-page relative z-10">
          <motion.div
            ref={revealRef2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-xl mx-auto mb-16"
          >
            <span className="inline-block text-secondary text-xs font-medium tracking-[0.2em] uppercase bg-secondary/10 px-4 py-1.5 rounded-full">
              Voices
            </span>
            <h2 className="text-3xl md:text-4xl font-light text-primary mt-3 leading-tight">
              Stories from the Community
            </h2>
            <p className="text-primary/50 mt-3 text-sm font-light">
              Real stories from real people whose lives have been transformed.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {seedTestimonials.map((t, i) => (
              <motion.div
                key={t.id}
                variants={cardVariants}
                whileHover="hover"
                className="group bg-white border border-primary/5 rounded-2xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/[0.02] rounded-full blur-2xl group-hover:bg-secondary/[0.05] transition-all duration-500" />
                
                <Quote className="text-secondary/20 mb-4" size={32} />
                
                <p className="text-primary/70 leading-relaxed font-light text-sm relative z-10">
                  "{t.quote}"
                </p>
                
                <div className="flex items-center gap-4 mt-6 pt-4 border-t border-primary/5">
                  <div className="relative">
                    <img 
                      src={t.avatar} 
                      alt={t.name} 
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-secondary/20 group-hover:ring-secondary/40 transition-all duration-300" 
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-secondary rounded-full border-2 border-white" />
                  </div>
                  <div>
                    <div className="font-medium text-primary text-sm group-hover:text-secondary transition-colors duration-300">
                      {t.name}
                    </div>
                    <div className="text-xs text-primary/40 font-light">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link 
              to="/feedback" 
              className="inline-flex items-center gap-2 text-secondary/60 hover:text-secondary transition-colors duration-300 text-sm font-light group"
            >
              Share your story
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}