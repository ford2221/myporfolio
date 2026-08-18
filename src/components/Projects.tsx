import { projects } from '@/utils/consts';
import { MonitorPlay, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Projects() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      id="projects" 
      className="mb-16"
    >
      <div className="flex items-center gap-3 mb-6">
        <MonitorPlay className="text-blue-400" size={24} />
        <h3 className="text-xl sm:text-2xl font-bold" style={{ fontFamily: 'var(--font-press-start)' }}>Proyectos</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((p, i) => (
          <motion.a 
            whileHover={{ y: -5, scale: 1.02 }}
            target='_blank' 
            key={i} 
            href={p.link}   
            className="glass-panel p-6 flex flex-col h-full relative group"
          >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none"></div>
            
            <div className="flex items-start justify-between mb-4 z-10">
              <h4 className="font-semibold text-lg text-blue-100" style={{ fontFamily: 'var(--font-press-start)', fontSize: '0.9rem' }}>
                {p.title}
              </h4>
              <ExternalLink size={18} className="text-slate-400 group-hover:text-pink-400 transition-colors" />
            </div>
            
            <p className="text-sm text-slate-300 mb-6 flex-grow z-10">{p.desc}</p>
            
            <div className="flex flex-wrap gap-2 mt-auto z-10">
              {p.tags.map(t => (
                <span key={t} className="text-[10px] px-2 py-1 rounded-md bg-slate-800/80 border border-slate-700 text-slate-300">
                  {t}
                </span>
              ))}
            </div>
          </motion.a>
        ))}
      </div>
    </motion.section>
  );
}
