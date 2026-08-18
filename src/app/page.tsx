"use client";

import Hero from '@/components/Hero';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main className="min-h-screen px-4 sm:px-6 relative z-10 pt-10">
      <div className="max-w-4xl mx-auto pb-12">
        <Hero />
        
        <div className="space-y-24">
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </div>
        
        <footer className="py-8 mt-24 border-t border-slate-800/50 text-center flex flex-col items-center justify-center">
          <p className="text-xs text-slate-500 mb-2">© {new Date().getFullYear()} Ford-Ndji Joseph</p>
          <p className="text-[10px] text-slate-600 font-mono tracking-widest uppercase">Built with Next.js & Tailwind</p>
        </footer>
      </div>
    </main>
  );
}
