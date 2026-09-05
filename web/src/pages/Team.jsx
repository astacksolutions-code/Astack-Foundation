
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Mail, Users, Sparkles, User, Briefcase, MapPin } from 'lucide-react';
import { subscribeCollection } from '../firebase/dataLayer';
import ImageWithFallback from '../components/ImageWithFallback';

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
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  hover: {
    y: -10,
    scale: 1.02,
    boxShadow: "0 30px 60px -20px rgba(0,0,0,0.15), 0 0 0 1px rgba(var(--secondary-rgb),0.08)",
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const avatarVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.1
    }
  },
  hover: {
    scale: 1.08,
    rotate: -3,
    transition: {
      duration: 0.3,
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
      delay: i * 0.1,
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1]
    }
  })
};

export default function Team() {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const unsub = subscribeCollection('team', setTeam, 'name', 'asc');
    return unsub;
  }, []);

  // Group by role for statistics
  const roles = team.reduce((acc, member) => {
    acc[member.role] = (acc[member.role] || 0) + 1;
    return acc;
  }, {});

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
            Our People
          </span>
          <h1 className="text-4xl md:text-5xl font-light text-primary mt-4 leading-tight">
            Meet the Team
          </h1>
          <p className="text-primary/50 mt-3 text-base font-light max-w-md mx-auto">
            The people behind Astack Foundation's mission and day-to-day work.
          </p>
          
          {/* Decorative line */}
          <div className="w-16 h-0.5 bg-secondary/30 mx-auto mt-6 rounded-full" />
        </motion.div>

        {/* Team Stats */}
        {team.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-6 mb-12"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full border border-primary/5">
              <Users size={16} className="text-secondary" />
              <span className="text-sm text-primary/60 font-light">
                <span className="font-medium text-primary">{team.length}</span> Team Members
              </span>
            </div>
            {Object.entries(roles).slice(0, 3).map(([role, count]) => (
              <div key={role} className="flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full border border-primary/5">
                <Briefcase size={16} className="text-secondary/60" />
                <span className="text-sm text-primary/60 font-light">
                  <span className="font-medium text-primary">{count}</span> {role}s
                </span>
              </div>
            ))}
          </motion.div>
        )}

        {/* Team Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {team.map((member, i) => (
            <motion.div
              key={member.id}
              variants={cardVariants}
              whileHover="hover"
              className="group bg-white border border-primary/5 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 relative"
            >
              {/* Decorative gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              {/* Top accent line */}
              <div className="h-1 bg-gradient-to-r from-secondary to-secondary-300 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              <div className="p-8 text-center relative">
                {/* Avatar with glow effect */}
                <motion.div
                  variants={avatarVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  className="relative inline-block"
                >
                  <div className="absolute inset-0 rounded-full bg-secondary/10 blur-xl scale-75 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <ImageWithFallback
                    src={member.avatar}
                    alt={member.name}
                    className="w-28 h-28 rounded-full object-cover mx-auto ring-4 ring-secondary/10 group-hover:ring-secondary/30 transition-all duration-500 relative z-10"
                    iconSize={30}
                  />
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute inset-0 rounded-full bg-secondary/5 blur-xl -z-10"
                  />
                </motion.div>

                <h3 className="font-medium text-xl text-primary mt-4 group-hover:text-secondary transition-colors duration-300">
                  {member.name}
                </h3>
                
                <div className="flex items-center justify-center gap-2 mt-1.5">
                  <Briefcase size={14} className="text-secondary/60" />
                  <p className="text-secondary text-sm font-medium">
                    {member.role}
                  </p>
                </div>

                {member.location && (
                  <div className="flex items-center justify-center gap-1.5 mt-1">
                    <MapPin size={12} className="text-primary/30" />
                    <p className="text-primary/30 text-xs font-light">
                      {member.location}
                    </p>
                  </div>
                )}

                <p className="text-primary/50 text-sm mt-4 leading-relaxed font-light">
                  {member.bio}
                </p>

                {/* Social Links */}
                <div className="flex justify-center gap-3 mt-6">
                  {member.linkedin && (
                    <motion.a
                      custom={0}
                      variants={socialVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover={{ y: -3, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on LinkedIn`}
                      className="w-10 h-10 rounded-full bg-accent/50 flex items-center justify-center text-primary/60 hover:bg-secondary hover:text-white transition-all duration-300"
                    >
                      <Linkedin size={16} />
                    </motion.a>
                  )}
                  {member.email && (
                    <motion.a
                      custom={1}
                      variants={socialVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover={{ y: -3, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      href={`mailto:${member.email}`}
                      aria-label={`Email ${member.name}`}
                      className="w-10 h-10 rounded-full bg-accent/50 flex items-center justify-center text-primary/60 hover:bg-secondary hover:text-white transition-all duration-300"
                    >
                      <Mail size={16} />
                    </motion.a>
                  )}
                </div>

                {/* Member number badge */}
                <div className="absolute top-3 right-3 text-[32px] font-light text-primary/[0.03] group-hover:text-secondary/[0.04] transition-colors duration-300 leading-none">
                  {String(i + 1).padStart(2, '0')}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {team.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="inline-block p-6 bg-primary/5 rounded-full mb-4">
              <Users size={32} className="text-primary/20" />
            </div>
            <p className="text-primary/40 font-light">
              Team members will appear here once added from the admin panel.
            </p>
            <p className="text-primary/30 text-sm font-light mt-1">
              We're building our team to better serve the community.
            </p>
          </motion.div>
        )}

        {/* Join Us CTA */}
        {team.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center mt-16 pt-8 border-t border-primary/5"
          >
            <p className="text-primary/40 text-sm font-light flex items-center justify-center gap-2">
              <Sparkles size={14} className="text-secondary/40" />
              Want to join our team?
              <a 
                href="/contact" 
                className="text-secondary hover:text-secondary-300 transition-colors font-medium ml-1"
              >
                Get in touch
              </a>
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}