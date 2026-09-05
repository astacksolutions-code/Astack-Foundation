
import { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Grid, Image as ImageIcon, Sparkles, ZoomIn } from 'lucide-react';
import ImageWithFallback from '../components/ImageWithFallback';
import { subscribeCollection } from '../firebase/dataLayer';

const PAGE_SIZE = 6;

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
      staggerChildren: 0.06,
      delayChildren: 0.1,
    }
  }
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  hover: {
    scale: 1.03,
    boxShadow: "0 20px 40px -12px rgba(0,0,0,0.2)",
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const lightboxVariants = {
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

const imageTransition = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const sentinelRef = useRef(null);

  useEffect(() => {
    const unsub = subscribeCollection('gallery', setItems);
    return unsub;
  }, []);

  const categories = useMemo(
    () => ['All', ...new Set(items.map((i) => i.category))],
    [items]
  );

  const filtered = useMemo(
    () => (category === 'All' ? items : items.filter((i) => i.category === category)),
    [items, category]
  );

  const visible = filtered.slice(0, visibleCount);

  useEffect(() => setVisibleCount(PAGE_SIZE), [category]);

  const loadMore = useCallback(() => {
    setVisibleCount((c) => Math.min(c + PAGE_SIZE, filtered.length));
  }, [filtered.length]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) loadMore();
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [loadMore]);

  const openLightbox = (idx) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const next = useCallback(() => setLightboxIndex((i) => (i + 1) % visible.length), [visible.length]);
  const prev = useCallback(() => setLightboxIndex((i) => (i - 1 + visible.length) % visible.length), [visible.length]);

  const touchStartX = useRef(0);
  const onTouchStart = (e) => (touchStartX.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx > 50) prev();
    else if (dx < -50) next();
  };

  useEffect(() => {
    const onKey = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex, next, prev]);

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
            In Pictures
          </span>
          <h1 className="text-4xl md:text-5xl font-light text-primary mt-4 leading-tight">
            Gallery
          </h1>
          <p className="text-primary/50 mt-3 text-base font-light max-w-md mx-auto">
            Moments from our programs and community events.
          </p>
          
          {/* Decorative line */}
          <div className="w-16 h-0.5 bg-secondary/30 mx-auto mt-6 rounded-full" />
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((c) => {
            const isActive = category === c;
            return (
              <motion.button
                key={c}
                onClick={() => setCategory(c)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive 
                    ? 'bg-secondary text-white shadow-lg shadow-secondary/30' 
                    : 'bg-accent/30 text-primary/60 hover:text-primary hover:bg-accent/50'
                }`}
              >
                {c === 'All' ? <Grid size={15} /> : <ImageIcon size={15} />}
                {c}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
        >
          {visible.map((item, idx) => (
            <motion.button
              key={item.id}
              variants={imageVariants}
              whileHover="hover"
              onClick={() => openLightbox(idx)}
              className="block w-full break-inside-avoid rounded-2xl overflow-hidden relative group bg-primary/5"
            >
              <ImageWithFallback 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-[0.16,1,0.3,1]" 
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 via-30% to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-5">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-2">
                    <ZoomIn size={14} className="text-secondary-300" />
                    <div className="text-white font-medium text-sm">{item.title}</div>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-1 h-1 rounded-full bg-secondary-300" />
                    <div className="text-secondary-200 text-xs font-light">{item.category}</div>
                  </div>
                </div>
              </div>
              
              {/* Subtle indicator */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
                  <ZoomIn size={14} className="text-white" />
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Load More Sentinel */}
        {visibleCount < filtered.length && (
          <div ref={sentinelRef} className="h-10 flex items-center justify-center mt-4">
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex items-center gap-2 text-primary/30 text-xs font-light"
            >
              <span className="w-2 h-2 rounded-full bg-secondary/40 animate-pulse" />
              Loading more...
              <span className="w-2 h-2 rounded-full bg-secondary/40 animate-pulse delay-150" />
              <span className="w-2 h-2 rounded-full bg-secondary/40 animate-pulse delay-300" />
            </motion.div>
          </div>
        )}

        {/* Empty State */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="inline-block p-6 bg-primary/5 rounded-full mb-4">
              <ImageIcon size={32} className="text-primary/20" />
            </div>
            <p className="text-primary/40 font-light">
              No images in this category yet.
            </p>
            <p className="text-primary/30 text-sm font-light mt-1">
              Check back soon for new updates.
            </p>
          </motion.div>
        )}

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxIndex !== null && visible[lightboxIndex] && (
            <motion.div
              variants={lightboxVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4"
              onClick={closeLightbox}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              {/* Close Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                onClick={closeLightbox}
                aria-label="Close"
              >
                <X size={28} />
              </motion.button>

              {/* Image Counter */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute top-6 left-1/2 -translate-x-1/2 text-white/30 text-xs font-light tracking-wider"
              >
                {lightboxIndex + 1} / {visible.length}
              </motion.div>

              {/* Navigation Buttons */}
              {visible.length > 1 && (
                <>
                  <button
                    className="hidden sm:flex absolute left-6 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                    onClick={(e) => { e.stopPropagation(); prev(); }}
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={40} strokeWidth={1.5} />
                  </button>
                  <button
                    className="hidden sm:flex absolute right-6 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                    onClick={(e) => { e.stopPropagation(); next(); }}
                    aria-label="Next image"
                  >
                    <ChevronRight size={40} strokeWidth={1.5} />
                  </button>
                </>
              )}

              {/* Image */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={visible[lightboxIndex]?.id}
                  variants={imageTransition}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onClick={(e) => e.stopPropagation()}
                  src={visible[lightboxIndex]?.imageUrl}
                  alt={visible[lightboxIndex]?.title}
                  className="max-h-[85vh] max-w-full rounded-lg object-contain shadow-2xl"
                />
              </AnimatePresence>

              {/* Image Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
              >
                <div className="text-white font-light text-sm">
                  {visible[lightboxIndex]?.title}
                </div>
                <div className="text-white/40 text-xs font-light mt-1">
                  {visible[lightboxIndex]?.category}
                </div>
              </motion.div>

              {/* Swipe indicator on mobile */}
              <div className="sm:hidden absolute bottom-24 left-1/2 -translate-x-1/2 text-white/10 text-xs font-light flex items-center gap-4">
                <ChevronLeft size={16} />
                <span>Swipe to navigate</span>
                <ChevronRight size={16} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Total count */}
        {filtered.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mt-8 text-primary/30 text-xs font-light tracking-wider"
          >
            {visible.length} of {filtered.length} images
          </motion.div>
        )}
      </div>
    </div>
  );
}