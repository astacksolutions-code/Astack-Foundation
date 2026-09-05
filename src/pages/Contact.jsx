
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Youtube, Send, User, MessageSquare, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { addItem } from '../firebase/dataLayer';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Enter a valid email'),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
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

const infoVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
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

const SOCIAL_LINKS = [
  { icon: Facebook, label: 'Facebook', color: '#1877f2' },
  { icon: Instagram, label: 'Instagram', color: '#e4405f' },
  { icon: Twitter, label: 'Twitter', color: '#1da1f2' },
  { icon: Youtube, label: 'YouTube', color: '#ff0000' },
];

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ 
    resolver: zodResolver(schema) 
  });

  const onSubmit = async (data) => {
    await addItem('contacts', { ...data, status: 'unread', reply: null });
    toast.success('Message sent — we typically reply within 1–2 business days.');
    reset();
  };

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
            Reach Out
          </span>
          <h1 className="text-4xl md:text-5xl font-light text-primary mt-4 leading-tight">
            Contact Us
          </h1>
          <p className="text-primary/50 mt-3 text-base font-light max-w-md mx-auto">
            Questions, partnerships, or press enquiries — we'd love to hear from you.
          </p>
          
          {/* Decorative line */}
          <div className="w-16 h-0.5 bg-secondary/30 mx-auto mt-6 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <motion.form
            variants={formVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            onSubmit={handleSubmit(onSubmit)} 
            className="bg-white border border-primary/5 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-500 relative overflow-hidden"
          >
            {/* Decorative top bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary to-secondary-300" />
            
            {/* Decorative background element */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-secondary/[0.02] rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-secondary/[0.02] rounded-full blur-2xl pointer-events-none" />

            <motion.div variants={fieldVariants} className="relative z-10">
              <label className="flex items-center gap-2 text-sm text-primary/70 font-medium tracking-wide mb-1.5">
                <User size={15} />
                Full Name
              </label>
              <input 
                {...register('name')} 
                placeholder="Enter your full name" 
                className={`w-full border rounded-xl px-4 py-3 focus:outline-none transition-all bg-accent/5 ${
                  errors.name ? 'border-rose-300 focus:border-rose-400' : 'border-primary-100 focus:border-secondary'
                }`}
              />
              {errors.name && (
                <motion.p 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-rose-500 mt-1 flex items-center gap-1"
                >
                  <span className="w-1 h-1 rounded-full bg-rose-500" />
                  {errors.name.message}
                </motion.p>
              )}
            </motion.div>

            <motion.div variants={fieldVariants} className="relative z-10">
              <label className="flex items-center gap-2 text-sm text-primary/70 font-medium tracking-wide mb-1.5">
                <Mail size={15} />
                Email Address
              </label>
              <input 
                {...register('email')} 
                placeholder="Enter your email" 
                className={`w-full border rounded-xl px-4 py-3 focus:outline-none transition-all bg-accent/5 ${
                  errors.email ? 'border-rose-300 focus:border-rose-400' : 'border-primary-100 focus:border-secondary'
                }`}
              />
              {errors.email && (
                <motion.p 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-rose-500 mt-1 flex items-center gap-1"
                >
                  <span className="w-1 h-1 rounded-full bg-rose-500" />
                  {errors.email.message}
                </motion.p>
              )}
            </motion.div>

            <motion.div variants={fieldVariants} className="relative z-10">
              <label className="flex items-center gap-2 text-sm text-primary/70 font-medium tracking-wide mb-1.5">
                <MessageSquare size={15} />
                Subject
              </label>
              <input 
                {...register('subject')} 
                placeholder="What's this about?" 
                className={`w-full border rounded-xl px-4 py-3 focus:outline-none transition-all bg-accent/5 ${
                  errors.subject ? 'border-rose-300 focus:border-rose-400' : 'border-primary-100 focus:border-secondary'
                }`}
              />
              {errors.subject && (
                <motion.p 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-rose-500 mt-1 flex items-center gap-1"
                >
                  <span className="w-1 h-1 rounded-full bg-rose-500" />
                  {errors.subject.message}
                </motion.p>
              )}
            </motion.div>

            <motion.div variants={fieldVariants} className="relative z-10">
              <label className="flex items-center gap-2 text-sm text-primary/70 font-medium tracking-wide mb-1.5">
                <MessageSquare size={15} />
                Your Message
              </label>
              <textarea 
                {...register('message')} 
                rows={5} 
                placeholder="Tell us how we can help..." 
                className={`w-full border rounded-xl px-4 py-3 focus:outline-none transition-all bg-accent/5 resize-none ${
                  errors.message ? 'border-rose-300 focus:border-rose-400' : 'border-primary-100 focus:border-secondary'
                }`}
              />
              {errors.message && (
                <motion.p 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-rose-500 mt-1 flex items-center gap-1"
                >
                  <span className="w-1 h-1 rounded-full bg-rose-500" />
                  {errors.message.message}
                </motion.p>
              )}
            </motion.div>

            <motion.div variants={fieldVariants} className="relative z-10 pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting} 
                type="submit" 
                className={`w-full py-3.5 rounded-xl font-medium text-white transition-all duration-300 flex items-center justify-center gap-2 ${
                  isSubmitting 
                    ? 'bg-primary/40 cursor-not-allowed' 
                    : 'bg-secondary hover:shadow-2xl hover:shadow-secondary/30'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </motion.button>
            </motion.div>

            {/* Trust indicator */}
            <motion.div 
              variants={fieldVariants}
              className="text-center mt-4 relative z-10"
            >
              <p className="text-[10px] text-primary/20 font-light flex items-center justify-center gap-1.5">
                <CheckCircle size={12} className="text-secondary/20" />
                We typically reply within 1-2 business days
              </p>
            </motion.div>
          </motion.form>

          {/* Contact Information */}
          <motion.div
            variants={formVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Map */}
            <motion.div 
              variants={infoVariants}
              className="rounded-2xl overflow-hidden h-56 border border-primary/5 shadow-sm hover:shadow-xl transition-shadow duration-500"
            >
              <iframe
                title="Astack Foundation location"
                src="https://www.google.com/maps?q=Karachi,Pakistan&output=embed"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                loading="lazy"
                className="hover:scale-105 transition-transform duration-700 ease-[0.16,1,0.3,1]"
              />
            </motion.div>

            {/* Contact Details */}
            <motion.div 
              variants={infoVariants}
              className="bg-white border border-primary/5 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-secondary/30 to-secondary" />
              
              <div className="space-y-4">
                <motion.div 
                  variants={fieldVariants}
                  className="flex items-start gap-3 group p-2 -m-2 rounded-lg hover:bg-accent/5 transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/20 transition-colors">
                    <MapPin size={16} className="text-secondary" />
                  </div>
                  <div>
                    <p className="text-[10px] text-primary/30 font-light tracking-wider uppercase">Location</p>
                    <span className="text-primary/70 text-sm font-light"> Karachi, Pakistan</span>
                  </div>
                </motion.div>

                <motion.div 
                  variants={fieldVariants}
                  className="flex items-start gap-3 group p-2 -m-2 rounded-lg hover:bg-accent/5 transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/20 transition-colors">
                    <Phone size={16} className="text-secondary" />
                  </div>
                  <div>
                    <p className="text-[10px] text-primary/30 font-light tracking-wider uppercase">Phone</p>
                    <a href="tel:+922134567890" className="text-primary/70 text-sm font-light hover:text-secondary transition-colors">
                      +92 3161103616
                    </a>
                  </div>
                </motion.div>

                <motion.div 
                  variants={fieldVariants}
                  className="flex items-start gap-3 group p-2 -m-2 rounded-lg hover:bg-accent/5 transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/20 transition-colors">
                    <Mail size={16} className="text-secondary" />
                  </div>
                  <div>
                    <p className="text-[10px] text-primary/30 font-light tracking-wider uppercase">Email</p>
                    <a href="mailto:hello@astackfoundation.org" className="text-primary/70 text-sm font-light hover:text-secondary transition-colors">
                     astacksolutions@gmail.com
                    </a>
                  </div>
                </motion.div>

                <motion.div 
                  variants={fieldVariants}
                  className="flex items-start gap-3 group p-2 -m-2 rounded-lg hover:bg-accent/5 transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/20 transition-colors">
                    <Clock size={16} className="text-secondary" />
                  </div>
                  <div>
                    <p className="text-[10px] text-primary/30 font-light tracking-wider uppercase">Hours</p>
                    <span className="text-primary/70 text-sm font-light">Mon – Sat, 9:00 AM – 6:00 PM</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              variants={infoVariants}
              className="bg-white border border-primary/5 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-shadow duration-500"
            >
              <p className="text-xs text-primary/40 font-light tracking-wider uppercase mb-4 text-center">
                Connect With Us
              </p>
              <div className="flex justify-center gap-3">
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
                    className="w-11 h-11 rounded-full bg-accent/30 flex items-center justify-center hover:bg-secondary hover:text-white transition-all duration-300 group relative overflow-hidden"
                  >
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    <social.icon 
                      size={18} 
                      className="text-primary/60 group-hover:text-white transition-colors duration-300 relative z-10" 
                    />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}