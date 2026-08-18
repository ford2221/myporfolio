import { skills, languages, hobbies } from '@/utils/consts';
import { Code2, Globe2, Gamepad2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Skills() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
      <motion.section
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <Code2 className="text-green-400" size={24} />
          <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-press-start)' }}>Skills</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <motion.span
              whileHover={{ scale: 1.05, y: -2 }}
              key={skill}
              className="text-xs px-3 py-1.5 rounded-md bg-slate-800/80 border border-slate-700 hover:border-green-400/50 hover:text-green-300 transition-colors cursor-default shadow-sm"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.section>

      <div className="space-y-8">
        <motion.section
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Globe2 className="text-blue-400" size={20} />
            <h3 className="text-lg font-bold" style={{ fontFamily: 'var(--font-press-start)', fontSize: '0.9rem' }}>Languages</h3>
          </div>
          <div className="glass-panel p-5 space-y-4">
            {languages.map((lang, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-2 text-slate-300">
                  <span className="font-medium">{lang.name}</span>
                  <span className="font-mono">{lang.level}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${lang.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-full bg-gradient-to-r from-blue-500 to-pink-500 rounded-full"
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Gamepad2 className="text-pink-400" size={20} />
            <h3 className="text-lg font-bold" style={{ fontFamily: 'var(--font-press-start)', fontSize: '0.9rem' }}>Hobbies</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {hobbies.map((hobby, i) => {
              const icon = hobby.split(' ')[0];
              const text = hobby.split(' ').slice(1).join(' ');
              return (
                <div key={i} className="glass-panel p-3 text-center flex items-center gap-2 justify-center hover:bg-slate-800/60 transition-colors">
                  <span className="text-lg">{icon}</span>
                  <span className="text-xs text-slate-300">{text}</span>
                </div>
              );
            })}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
