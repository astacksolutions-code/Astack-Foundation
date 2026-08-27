
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Target, Eye, HeartHandshake, ShieldCheck, Sparkles, Users, Globe, Award, ArrowRight, Quote, ChevronRight } from 'lucide-react';
import { orgStats } from '../utils/seedData';

// --- Elegant Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.25, 0.1, 0.25, 1.0],
      staggerChildren: 0.1
    } 
  }
};

const fadeInScale = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      duration: 0.7, 
      ease: [0.34, 1.56, 0.64, 1] 
    } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    }
  }
};

const elegantCard = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: [0.34, 1.56, 0.64, 1] 
    } 
  },
  hover: {
    y: -8,
    scale: 1.02,
    boxShadow: "0 30px 60px -20px rgba(0,0,0,0.2)",
    transition: { 
      duration: 0.4, 
      ease: [0.34, 1.56, 0.64, 1] 
    }
  }
};

const floatingAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

// --- Data ---
const VALUES = [
  { icon: HeartHandshake, title: 'Compassion First', body: 'Every program starts with the real needs of the community we serve, not assumptions.' },
  { icon: ShieldCheck, title: 'Transparency', body: 'Every rupee and every outcome is tracked and shared openly with donors and the public.' },
  { icon: Target, title: 'Measurable Impact', body: 'We track real numbers — patients treated, children enrolled, wells built — not just activity.' },
  { icon: Eye, title: 'Community-Led', body: 'Programs are shaped with the people they serve, not designed for them from a distance.' },
];

const MILESTONES = [
  { year: '2026', title: 'First Classroom', description: 'Started with 15 students in Karachi' },
  { year: '2026', title: 'Expanded Reach', description: 'Launched health and water programs' },
  { year: '2026', title: 'National Impact', description: 'Reached 5 cities across Pakistan' },
  { year: '2026', title: 'Global Recognition', description: 'Awarded for community excellence' },
];

export default function About() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroScale = useTransform(smoothProgress, [0, 0.3], [1, 0.97]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0.9]);
  const heroY = useTransform(smoothProgress, [0, 0.3], [0, 30]);

  return (
    <div className="overflow-x-hidden bg-white">
      {/* --- Elegant Background Gradients --- */}
      <div className="fixed inset-0 bg-gradient-to-b from-white via-accent/5 to-white pointer-events-none -z-10" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(var(--secondary-rgb),0.03),transparent_50%)] pointer-events-none -z-10" />

      {/* --- HERO SECTION with Parallax --- */}
      <motion.section
        style={{ scale: heroScale, opacity: heroOpacity, y: heroY }}
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-primary"
      >
        {/* Abstract decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000" />
          
          {/* Subtle grid pattern */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" opacity="0.03">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="container-page text-center max-w-4xl mx-auto relative z-10 px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg px-6 py-2 rounded-full border border-white/20 text-secondary-300 text-sm font-medium tracking-wider uppercase">
              <Sparkles size={14} className="text-secondary-300" />
              Est. 2026 · Philanthropy in Action
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1.1] mb-6"
          >
            <span className="block text-white">Astack</span>
            <span className="block bg-gradient-to-r from-secondary-300 via-secondary to-secondary-300 bg-clip-text text-transparent">
              Foundation
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-accent/80 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-light tracking-wide"
          >
            Astack Foundation was founded to bring practical, measurable welfare
            programs — education, healthcare, clean water, and livelihood
            training — to communities that are too often overlooked.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <button className="group px-8 py-3 bg-secondary text-white font-medium rounded-full transition-all duration-300 hover:bg-secondary/90 hover:scale-105 hover:shadow-2xl hover:shadow-secondary/25 flex items-center gap-2">
              Get Involved
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-3 border border-white/20 text-white/80 font-medium rounded-full transition-all duration-300 hover:bg-white/5 hover:border-white/40 backdrop-blur-sm">
              Our Impact
            </button>
          </motion.div>

          <motion.div
            animate={floatingAnimation}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20"
          >
            <ChevronRight size={24} className="rotate-90" />
          </motion.div>
        </div>
      </motion.section>

      {/* --- STORY + STATS SECTION --- */}
      <section className="py-20 md:py-32 container-page">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto items-start"
        >
          {/* Story Content with Quote */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <div className="space-y-3">
              <span className="inline-block text-secondary text-sm font-medium tracking-[0.2em] uppercase bg-secondary/10 px-4 py-1.5 rounded-full">
                Our Story
              </span>
              <h2 className="text-3xl md:text-5xl font-light text-primary leading-tight">
                From one classroom
                <span className="block text-secondary font-medium">to a national movement</span>
              </h2>
            </div>
            
            <div className="relative">
              <Quote size={32} className="text-secondary/20 absolute -top-1 -left-2" />
              <p className="text-primary/70 text-base leading-relaxed pl-6 font-light">
                What began as a single literacy class in Karachi has grown into a
                foundation running programs across education, health, clean water,
                and vocational training. We work directly with families,
                volunteers, and local partners to make sure support reaches the
                people who need it most — and stays with them.
              </p>
            </div>

            {/* Milestones timeline */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {MILESTONES.map((milestone, idx) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="border-l-2 border-secondary/30 pl-3"
                >
                  <div className="text-secondary text-sm font-bold">{milestone.year}</div>
                  <div className="text-primary/50 text-xs font-light">{milestone.title}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stats Grid - Elegant */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { value: orgStats.livesImpacted.toLocaleString(), label: 'Lives Impacted', icon: Users },
              { value: orgStats.volunteers, label: 'Volunteers', icon: Users },
              { value: orgStats.programsRun, label: 'Programs Run', icon: Award },
              { value: orgStats.citiesServed, label: 'Cities Served', icon: Globe },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                variants={elegantCard}
                whileHover="hover"
                className="group relative bg-white border border-primary/5 rounded-2xl p-6 text-center overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <stat.icon className="text-secondary/50 mx-auto mb-3" size={20} strokeWidth={1.5} />
                  <div className="font-light text-3xl md:text-4xl text-primary tracking-tight">
                    {stat.value}+
                  </div>
                  <div className="text-primary/40 text-xs font-light tracking-widest uppercase mt-1">
                    {stat.label}
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-secondary/0 via-secondary/30 to-secondary/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* --- VALUES SECTION with Elegant Cards --- */}
      <section className="py-20 md:py-32 bg-accent/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/[0.02] to-transparent pointer-events-none" />
        
        <div className="container-page relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="inline-block text-secondary text-sm font-medium tracking-[0.2em] uppercase bg-secondary/10 px-4 py-1.5 rounded-full">
              What Drives Us
            </span>
            <h2 className="text-3xl md:text-5xl font-light text-primary mt-4 leading-tight">
              Our Core Values
            </h2>
            <p className="text-primary/50 mt-3 text-base font-light max-w-sm mx-auto">
              Principles that guide every decision, program, and partnership we make.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          >
            {VALUES.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  variants={elegantCard}
                  whileHover="hover"
                  className="group relative bg-white border border-primary/5 rounded-2xl p-8 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1, rotate: 3 }}
                    transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                    className="relative w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mb-5 group-hover:shadow-lg transition-shadow duration-300"
                  >
                    <Icon size={24} className="text-secondary" strokeWidth={1.5} />
                  </motion.div>
                  
                  <h3 className="relative font-medium text-primary text-lg mb-2 group-hover:text-secondary transition-colors duration-300">
                    {v.title}
                  </h3>
                  <p className="relative text-primary/50 text-sm leading-relaxed font-light">
                    {v.body}
                  </p>
                  
                  <div className="relative mt-4 w-8 h-0.5 bg-secondary/30 rounded-full group-hover:w-12 transition-all duration-300" />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* --- CTA / Trust Bar --- */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="border-t border-primary/5 bg-white"
      >
        <div className="container-page py-12">
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
            {[
              'Verified Impact',
              '100% Transparency',
              'Community First',
              'UN SDG Aligned'
            ].map((text, idx) => (
              <motion.div
                key={text}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-3 text-primary/40 text-sm font-light tracking-wider"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-secondary/40" />
                {text}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}