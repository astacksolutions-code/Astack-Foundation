
// import { Link } from 'react-router-dom';
// import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, Heart, ArrowUp, Sparkles } from 'lucide-react';
// import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
// import { useState, useEffect } from 'react';

// const SOCIAL_LINKS = [
//   { icon: Facebook, label: 'Facebook', color: '#1877f2' },
//   { icon: Instagram, label: 'Instagram', color: '#e4405f' },
//   { icon: Twitter, label: 'Twitter', color: '#1da1f2' },
//   { icon: Youtube, label: 'YouTube', color: '#ff0000' },
// ];

// const FOOTER_LINKS = [
//   { to: '/about', label: 'About' },
//   { to: '/programs', label: 'Programs' },
//   { to: '/events', label: 'Events' },
//   { to: '/gallery', label: 'Gallery' },
//   { to: '/team', label: 'Team' },
//   { to: '/feedback', label: 'Feedback' },
// ];

// // --- Animation Variants ---
// const footerVariants = {
//   hidden: { opacity: 0, y: 30 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.8,
//       ease: [0.16, 1, 0.3, 1],
//       staggerChildren: 0.1
//     }
//   }
// };

// const columnVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.6,
//       ease: [0.16, 1, 0.3, 1]
//     }
//   }
// };

// const itemVariants = {
//   hidden: { opacity: 0, x: -10 },
//   visible: (i) => ({
//     opacity: 1,
//     x: 0,
//     transition: {
//       delay: i * 0.05,
//       duration: 0.4,
//       ease: [0.16, 1, 0.3, 1]
//     }
//   })
// };

// const socialVariants = {
//   hidden: { opacity: 0, scale: 0.8 },
//   visible: (i) => ({
//     opacity: 1,
//     scale: 1,
//     transition: {
//       delay: i * 0.08,
//       duration: 0.4,
//       ease: [0.16, 1, 0.3, 1]
//     }
//   })
// };

// export default function Footer() {
//   const [showScrollTop, setShowScrollTop] = useState(false);
//   const { scrollYProgress } = useScroll();
//   const opacity = useTransform(scrollYProgress, [0.8, 0.95], [0, 1]);
//   const scale = useTransform(scrollYProgress, [0.8, 0.95], [0.8, 1]);

//   useEffect(() => {
//     const handleScroll = () => {
//       setShowScrollTop(window.scrollY > 500);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   return (
//     <>
//       <motion.footer
//         variants={footerVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, margin: "-50px" }}
//         className="bg-primary text-accent relative overflow-hidden"
//       >
//         {/* Premium background effects */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           <div className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl" />
//           <div className="absolute -bottom-1/2 -left-1/4 w-[400px] h-[400px] bg-secondary/3 rounded-full blur-3xl" />
          
//           {/* Subtle pattern */}
//           <svg className="absolute inset-0 w-full h-full pointer-events-none" opacity="0.02">
//             <defs>
//               <pattern id="footerGrid" width="40" height="40" patternUnits="userSpaceOnUse">
//                 <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
//               </pattern>
//             </defs>
//             <rect width="100%" height="100%" fill="url(#footerGrid)" />
//           </svg>
//         </div>

//         <div className="container-page relative z-10 py-16 md:py-20">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            
//             {/* Column 1 - Brand */}
//             <motion.div variants={columnVariants} className="space-y-4">
//               <Link 
//                 to="/" 
//                 className="flex items-center gap-3 group"
//               >
//                 <motion.div
//                   whileHover={{ scale: 1.05, rotate: -3 }}
//                   transition={{ duration: 0.3 }}
//                   className="relative"
//                 >
//                   <img 
//                     src="/logo.png" 
//                     alt="Astack Foundation" 
//                     className="w-10 h-10 object-contain"
//                   />
//                   <motion.div
//                     animate={{ 
//                       scale: [1, 1.2, 1],
//                       opacity: [0.2, 0.4, 0.2]
//                     }}
//                     transition={{ duration: 2, repeat: Infinity }}
//                     className="absolute inset-0 bg-secondary/10 rounded-full blur-xl -z-10"
//                   />
//                 </motion.div>
//                 <div>
//                   <span className="font-display font-bold text-lg text-white tracking-tight">
//                     Astack
//                   </span>
//                   <span className="font-display font-light text-lg text-secondary ml-0.5">
//                     Foundation
//                   </span>
//                 </div>
//               </Link>
              
//               <p className="text-accent/60 text-sm leading-relaxed font-light max-w-xs">
//                 Building sustainable welfare programs in education, health, and livelihood
//                 since 2011.
//               </p>
              
//               <motion.div 
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.5 }}
//                 className="flex items-center gap-2 text-accent/40 text-xs"
//               >
//                 {/* <Heart size={14} className="text-secondary/60" fill="#secondary/20" /> */}
//                 <span>Making a difference together</span>
//               </motion.div>
//             </motion.div>

//             {/* Column 2 - Explore Links */}
//             <motion.div variants={columnVariants} className="space-y-4">
//               <h4 className="text-white font-medium text-sm tracking-[0.15em] uppercase">
//                 Explore
//                 <div className="w-8 h-0.5 bg-secondary/40 mt-2 rounded-full" />
//               </h4>
//               <ul className="space-y-2.5">
//                 {FOOTER_LINKS.map((link, i) => (
//                   <motion.li
//                     key={link.to}
//                     custom={i}
//                     variants={itemVariants}
//                     initial="hidden"
//                     animate="visible"
//                   >
//                     <Link 
//                       to={link.to} 
//                       className="text-accent/60 hover:text-white transition-all duration-300 text-sm font-light flex items-center gap-2 group"
//                     >
//                       <span className="w-1 h-1 rounded-full bg-secondary/30 group-hover:bg-secondary transition-all duration-300" />
//                       {link.label}
//                     </Link>
//                   </motion.li>
//                 ))}
//               </ul>
//             </motion.div>

//             {/* Column 3 - Contact */}
//             <motion.div variants={columnVariants} className="space-y-4">
//               <h4 className="text-white font-medium text-sm tracking-[0.15em] uppercase">
//                 Contact
//                 <div className="w-8 h-0.5 bg-secondary/40 mt-2 rounded-full" />
//               </h4>
//               <ul className="space-y-3.5">
//                 <motion.li 
//                   variants={itemVariants}
//                   custom={0}
//                   className="flex items-start gap-3 text-accent/60 text-sm font-light group"
//                 >
//                   <MapPin size={16} className="text-secondary/60 group-hover:text-secondary transition-colors flex-shrink-0 mt-0.5" />
//                   <span> Karachi</span>
//                 </motion.li>
//                 <motion.li 
//                   variants={itemVariants}
//                   custom={1}
//                   className="flex items-center gap-3 text-accent/60 text-sm font-light group"
//                 >
//                   <Phone size={16} className="text-secondary/60 group-hover:text-secondary transition-colors flex-shrink-0" />
//                   <a href="tel:+922134567890" className="hover:text-white transition-colors">
//                     +92 3161103616
//                   </a>
//                 </motion.li>
//                 <motion.li 
//                   variants={itemVariants}
//                   custom={2}
//                   className="flex items-center gap-3 text-accent/60 text-sm font-light group"
//                 >
//                   <Mail size={16} className="text-secondary/60 group-hover:text-secondary transition-colors flex-shrink-0" />
//                   <a href="mailto:hello@astackfoundation.org" className="hover:text-white transition-colors">
//                     astacksolutions@gmail.com
//                   </a>
//                 </motion.li>
//               </ul>
//               <motion.p 
//                 variants={itemVariants}
//                 custom={3}
//                 className="text-accent/40 text-xs font-light flex items-center gap-2 pt-1"
//               >
//                 <span className="w-1.5 h-1.5 rounded-full bg-secondary/40" />
//                 Mon–Sat, 9:00 AM – 6:00 PM
//               </motion.p>
//             </motion.div>

//             {/* Column 4 - Social */}
//             <motion.div variants={columnVariants} className="space-y-4">
//               <h4 className="text-white font-medium text-sm tracking-[0.15em] uppercase">
//                 Follow
//                 <div className="w-8 h-0.5 bg-secondary/40 mt-2 rounded-full" />
//               </h4>
//               <div className="flex gap-3">
//                 {SOCIAL_LINKS.map((social, i) => (
//                   <motion.a
//                     key={social.label}
//                     href="#"
//                     aria-label={social.label}
//                     custom={i}
//                     variants={socialVariants}
//                     initial="hidden"
//                     animate="visible"
//                     whileHover={{ 
//                       y: -4,
//                       scale: 1.1,
//                       boxShadow: `0 8px 25px ${social.color}30`
//                     }}
//                     whileTap={{ scale: 0.9 }}
//                     className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all duration-300 border border-white/5 group relative overflow-hidden"
//                   >
//                     <motion.div 
//                       className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                     />
//                     <social.icon 
//                       size={18} 
//                       className="text-accent/60 group-hover:text-white transition-colors duration-300 relative z-10" 
//                     />
//                   </motion.a>
//                 ))}
//               </div>
              
//               <motion.div 
//                 variants={itemVariants}
//                 custom={4}
//                 className="mt-6 p-4 bg-white/5 rounded-xl border border-white/5"
//               >
//                 <div className="flex items-center gap-3">
//                   <Sparkles size={16} className="text-secondary/60" />
//                   <div>
//                     <p className="text-white/80 text-xs font-medium">Join our community</p>
//                     <p className="text-accent/40 text-[10px] font-light">5,000+ supporters</p>
//                   </div>
//                 </div>
//               </motion.div>
//             </motion.div>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <motion.div 
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ delay: 0.5 }}
//           className="border-t border-white/5"
//         >
//           <div className="container-page py-5 flex flex-col md:flex-row justify-between items-center gap-3">
//             <p className="text-accent/40 text-xs font-light tracking-wide">
//               © {new Date().getFullYear()} Astack Foundation. All rights reserved.
//             </p>
//             <div className="flex items-center gap-6 text-accent/30 text-[10px] font-light tracking-wider uppercase">
//               <Link to="/privacy" className="hover:text-accent/60 transition-colors">Privacy Policy</Link>
//               <span className="w-px h-3 bg-white/5" />
//               <Link to="/terms" className="hover:text-accent/60 transition-colors">Terms of Service</Link>
//             </div>
//           </div>
//         </motion.div>
//       </motion.footer>

//       {/* Scroll to Top Button */}
//       <AnimatePresence>
//         {showScrollTop && (
//           <motion.button
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.8 }}
//             transition={{ duration: 0.3 }}
//             onClick={scrollToTop}
//             className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-secondary text-white shadow-2xl shadow-secondary/30 flex items-center justify-center hover:scale-110 transition-all duration-300 group"
//           >
//             <ArrowUp size={20} className="group-hover:-translate-y-0.5 transition-transform" />
//           </motion.button>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, Heart, ArrowUp, Sparkles, Shield } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const SOCIAL_LINKS = [
  { icon: Facebook, label: 'Facebook', color: '#1877f2' },
  { icon: Instagram, label: 'Instagram', color: '#e4405f' },
  { icon: Twitter, label: 'Twitter', color: '#1da1f2' },
  { icon: Youtube, label: 'YouTube', color: '#ff0000' },
];

const FOOTER_LINKS = [
  { to: '/about', label: 'About' },
  { to: '/programs', label: 'Programs' },
  { to: '/events', label: 'Events' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/team', label: 'Team' },
  { to: '/feedback', label: 'Feedback' },
];

// --- Animation Variants ---
const footerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.1
    }
  }
};

const columnVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1]
    }
  })
};

const socialVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1]
    }
  })
};

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.8, 0.95], [0, 1]);
  const scale = useTransform(scrollYProgress, [0.8, 0.95], [0.8, 1]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <motion.footer
        variants={footerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="bg-primary text-accent relative overflow-hidden"
      >
        {/* Premium background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-1/2 -left-1/4 w-[400px] h-[400px] bg-secondary/3 rounded-full blur-3xl" />
          
          {/* Subtle pattern */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" opacity="0.02">
            <defs>
              <pattern id="footerGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#footerGrid)" />
          </svg>
        </div>

        <div className="container-page relative z-10 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            
            {/* Column 1 - Brand */}
            <motion.div variants={columnVariants} className="space-y-4">
              <Link 
                to="/" 
                className="flex items-center gap-3 group"
              >
                <motion.div
                  whileHover={{ scale: 1.05, rotate: -3 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <img 
                    src="/logo.png" 
                    alt="Astack Foundation" 
                    className="w-10 h-10 object-contain"
                  />
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-secondary/10 rounded-full blur-xl -z-10"
                  />
                </motion.div>
                <div>
                  <span className="font-display font-bold text-lg text-white tracking-tight">
                    Astack
                  </span>
                  <span className="font-display font-light text-lg text-secondary ml-0.5">
                    Foundation
                  </span>
                </div>
              </Link>
              
              <p className="text-accent/60 text-sm leading-relaxed font-light max-w-xs">
                Building sustainable welfare programs in education, health, and livelihood
                since 2011.
              </p>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-2 text-accent/40 text-xs"
              >
                <span>Making a difference together</span>
              </motion.div>
            </motion.div>

            {/* Column 2 - Explore Links */}
            <motion.div variants={columnVariants} className="space-y-4">
              <h4 className="text-white font-medium text-sm tracking-[0.15em] uppercase">
                Explore
                <div className="w-8 h-0.5 bg-secondary/40 mt-2 rounded-full" />
              </h4>
              <ul className="space-y-2.5">
                {FOOTER_LINKS.map((link, i) => (
                  <motion.li
                    key={link.to}
                    custom={i}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Link 
                      to={link.to} 
                      className="text-accent/60 hover:text-white transition-all duration-300 text-sm font-light flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-secondary/30 group-hover:bg-secondary transition-all duration-300" />
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Column 3 - Contact */}
            <motion.div variants={columnVariants} className="space-y-4">
              <h4 className="text-white font-medium text-sm tracking-[0.15em] uppercase">
                Contact
                <div className="w-8 h-0.5 bg-secondary/40 mt-2 rounded-full" />
              </h4>
              <ul className="space-y-3.5">
                <motion.li 
                  variants={itemVariants}
                  custom={0}
                  className="flex items-start gap-3 text-accent/60 text-sm font-light group"
                >
                  <MapPin size={16} className="text-secondary/60 group-hover:text-secondary transition-colors flex-shrink-0 mt-0.5" />
                  <span> Karachi</span>
                </motion.li>
                <motion.li 
                  variants={itemVariants}
                  custom={1}
                  className="flex items-center gap-3 text-accent/60 text-sm font-light group"
                >
                  <Phone size={16} className="text-secondary/60 group-hover:text-secondary transition-colors flex-shrink-0" />
                  <a href="tel:+922134567890" className="hover:text-white transition-colors">
                    +92 3161103616
                  </a>
                </motion.li>
                <motion.li 
                  variants={itemVariants}
                  custom={2}
                  className="flex items-center gap-3 text-accent/60 text-sm font-light group"
                >
                  <Mail size={16} className="text-secondary/60 group-hover:text-secondary transition-colors flex-shrink-0" />
                  <a href="mailto:hello@astackfoundation.org" className="hover:text-white transition-colors">
                    astacksolutions@gmail.com
                  </a>
                </motion.li>
              </ul>
              <motion.p 
                variants={itemVariants}
                custom={3}
                className="text-accent/40 text-xs font-light flex items-center gap-2 pt-1"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-secondary/40" />
                Mon–Sat, 9:00 AM – 6:00 PM
              </motion.p>
            </motion.div>

            {/* Column 4 - Social */}
            <motion.div variants={columnVariants} className="space-y-4">
              <h4 className="text-white font-medium text-sm tracking-[0.15em] uppercase">
                Follow
                <div className="w-8 h-0.5 bg-secondary/40 mt-2 rounded-full" />
              </h4>
              <div className="flex gap-3">
                {SOCIAL_LINKS.map((social, i) => (
                  <motion.a
                    key={social.label}
                    href="#"
                    aria-label={social.label}
                    custom={i}
                    variants={socialVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ 
                      y: -4,
                      scale: 1.1,
                      boxShadow: `0 8px 25px ${social.color}30`
                    }}
                    whileTap={{ scale: 0.9 }}
                    className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all duration-300 border border-white/5 group relative overflow-hidden"
                  >
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    <social.icon 
                      size={18} 
                      className="text-accent/60 group-hover:text-white transition-colors duration-300 relative z-10" 
                    />
                  </motion.a>
                ))}
              </div>
              
              <motion.div 
                variants={itemVariants}
                custom={4}
                className="mt-6 p-4 bg-white/5 rounded-xl border border-white/5"
              >
                <div className="flex items-center gap-3">
                  <Sparkles size={16} className="text-secondary/60" />
                  <div>
                    <p className="text-white/80 text-xs font-medium">Join our community</p>
                    <p className="text-accent/40 text-[10px] font-light">5,000+ supporters</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar with Admin Login Icon */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="border-t border-white/5"
        >
          <div className="container-page py-5 flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-accent/40 text-xs font-light tracking-wide">
              © {new Date().getFullYear()} Astack Foundation. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-6 text-accent/30 text-[10px] font-light tracking-wider uppercase">
                <Link to="/privacy" className="hover:text-accent/60 transition-colors">Privacy Policy</Link>
                <span className="w-px h-3 bg-white/5" />
                <Link to="/terms" className="hover:text-accent/60 transition-colors">Terms of Service</Link>
              </div>
              
              {/* Admin Login Icon */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="relative group"
              >
                <Link 
                  to="/admin/login" 
                  className="flex items-center gap-1.5 text-accent/30 hover:text-secondary transition-all duration-300"
                  title="Admin Login"
                >
                  <Shield size={14} className="group-hover:text-secondary transition-colors" />
                  <span className="text-[9px] font-light tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Admin
                  </span>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.footer>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-secondary text-white shadow-2xl shadow-secondary/30 flex items-center justify-center hover:scale-110 transition-all duration-300 group"
          >
            <ArrowUp size={20} className="group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}