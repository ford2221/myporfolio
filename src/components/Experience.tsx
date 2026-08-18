import { workExperience } from '@/utils/consts';
import { Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Experience() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-16"
      id="experience"
    >
      <div className="flex items-center gap-3 mb-6">
        <Briefcase className="text-pink-400" size={24} />
        <h3 className="text-xl sm:text-2xl font-bold" style={{ fontFamily: 'var(--font-press-start)' }}>Experiences</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {workExperience.map((job, i) => (
          <motion.div
            whileHover={{ y: -5 }}
            key={i}
            className="glass-panel p-6 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-pink-500 to-blue-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <h4 className="text-lg font-semibold text-slate-100 mb-1">{job.company}</h4>
            <p className="text-xs text-blue-300 mb-3 font-mono">{job.period}</p>
            <p className="text-sm text-slate-300 leading-relaxed">{job.role}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
