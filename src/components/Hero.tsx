import Image from 'next/image';
import { cvs } from '@/utils/consts';
import { Mail, MapPin } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <motion.header 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col md:flex-row items-center md:items-start justify-center gap-8 mb-16 pt-12"
    >
      <motion.div 
        whileHover={{ scale: 1.05 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-pink-500 blur-xl opacity-20 rounded-full"></div>
        <Image
          src="/profile.png"
          alt="Foto de perfil"
          className="relative w-36 h-36 rounded-full border-2 border-pink-500/50 shadow-[0_0_15px_rgba(255,85,145,0.5)] object-cover z-10"
          width={144} height={144}
        />
      </motion.div>
      
      <div className='w-full md:w-2/3 text-center md:text-left'>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-400" style={{ fontFamily: 'var(--font-press-start)' }}>
          Ford-Ndji Joseph
        </h1>
        <p className="text-sm opacity-80 mb-6 tracking-widest uppercase text-blue-300">Web & Móvil Developer</p>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center md:justify-start">
          <a href="mailto:fordstelle@gmail.com" className="flex items-center justify-center md:justify-start gap-2 text-sm text-slate-300 hover:text-pink-400 transition-colors">
            <Mail size={16} /> fordstelle@gmail.com
          </a>
          {/* <span className="hidden md:inline text-slate-600">|</span>
          <span className="flex items-center justify-center md:justify-start gap-2 text-sm text-slate-300">
            <MapPin size={16} /> Acarigua, Venezuela
          </span> */}
        </div>

        <div className="flex justify-center md:justify-start gap-4 mb-8">
          <a href="https://github.com/ford2221" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 hover:border-green-400/50 hover:text-green-400 transition-all">
            <FaGithub size={20} />
          </a>
          <a href="https://www.linkedin.com/in/ford-ndji-joseph-7a62531a8/" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 hover:border-blue-400/50 hover:text-blue-400 transition-all">
            <FaLinkedin size={20} />
          </a>
        </div>
        
        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
          {cvs.map((cv, i) => (
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={i}
              target='_blank' 
              href={cv.pdf} 
              className="text-xs font-medium px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 hover:bg-pink-500/20 hover:shadow-[0_0_10px_rgba(255,85,145,0.2)] transition-all flex items-center gap-2"
            >
              📄 {cv.name}
            </motion.a>
          ))}
        </div>
      </div>
    </motion.header>
  );
}
