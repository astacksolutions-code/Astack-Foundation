
import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/programs', label: 'Programs' },
  { to: '/events', label: 'Events' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/team', label: 'Team' },
  { to: '/feedback', label: 'Feedback' },
];

// --- Animation Variants ---
const navVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { 
      duration: 0.6, 
      ease: [0.16, 1, 0.3, 1] 
    } 
  }
};

const mobileMenuVariants = {
  hidden: { 
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.2 }
    }
  },
  visible: { 
    height: 'auto',
    opacity: 1,
    transition: {
      height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.3, delay: 0.1 }
    }
  }
};

const mobileItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1]
    }
  })
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.header
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-[0_1px_30px_rgba(0,0,0,0.06)] border-b border-primary/5' 
          : 'bg-white/80 backdrop-blur-md'
      }`}
    >
      <nav className="container-page flex items-center justify-between h-20 py-2">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-3 group flex-shrink-0"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <img 
              src="/logo.png" 
              alt="Astack Foundation" 
              className="w-10 h-10 object-contain"
            />
          </motion.div>
          <div className="flex items-center">
            <span className="font-display font-bold text-xl text-primary tracking-tight">
              Astack
            </span>
            <span className="font-display font-light text-xl text-secondary ml-0.5">
              Foundation
            </span>
          </div>
        </Link>

        {/* Desktop Navigation - Horizontal Links */}
        <div className="hidden md:flex items-center gap-1">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => `
                relative px-4 py-2.5 text-sm font-medium transition-all duration-300 rounded-full whitespace-nowrap
                ${isActive 
                  ? 'text-secondary bg-secondary/5' 
                  : 'text-primary/60 hover:text-primary hover:bg-primary/5'
                }
              `}
            >
              {({ isActive }) => (
                <>
                  <span className="relative z-10">{l.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-secondary/5 rounded-full"
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Contact Button */}
        <div className="hidden md:flex items-center gap-4 flex-shrink-0">
          <Link 
            to="/contact" 
            className="group relative px-6 py-2.5 bg-secondary text-white text-sm font-medium rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-secondary/25 hover:scale-105 overflow-hidden whitespace-nowrap"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Phone size={15} strokeWidth={1.5} />
              Contact Us
            </span>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-secondary to-secondary-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          className="md:hidden p-2.5 text-primary rounded-full hover:bg-primary/5 transition-colors"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={open ? 'close' : 'menu'}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="md:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-t border-primary/5"
          >
            <div className="flex flex-col p-6 gap-2">
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.to}
                  custom={i}
                  variants={mobileItemVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, x: -20 }}
                >
                  <NavLink
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) => `
                      flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300
                      ${isActive 
                        ? 'bg-secondary/5 text-secondary' 
                        : 'text-primary/70 hover:text-primary hover:bg-primary/5'
                      }
                    `}
                  >
                    <span className="font-medium">{l.label}</span>
                    {({ isActive }) => isActive && (
                      <motion.div
                        layoutId="activeMobile"
                        className="ml-auto w-1.5 h-1.5 rounded-full bg-secondary"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </NavLink>
                </motion.div>
              ))}
              
              <motion.div
                custom={LINKS.length}
                variants={mobileItemVariants}
                initial="hidden"
                animate="visible"
                className="mt-4 pt-4 border-t border-primary/5"
              >
                <Link 
                  to="/contact" 
                  onClick={() => setOpen(false)} 
                  className="flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-secondary text-white font-medium rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-secondary/20"
                >
                  <Phone size={18} strokeWidth={1.5} />
                  Contact Us
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

