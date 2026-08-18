"use client";

import { useState } from 'react';
import validateEmail from '@/utils/functions';
import Swal from 'sweetalert2';
import { Send, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleValidateField = () => {
    if (name === "") return "Name is required!";
    if (email === "") return "Email is required!";
    if (message === "") return "Message is required!";
    if (!validateEmail(email)) return "Invalid email format!";
    return "";
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    
    try {
      const validateError = handleValidateField();
      if (validateError !== "") {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: validateError,
          background: '#0f172a',
          color: '#f1f5f9',
          confirmButtonColor: '#ec4899'
        });
        throw new Error(validateError);
      }

      const msg = `
        🚨 **Mensaje Recibido (Portafolio)** 🚨\n
👤 Nombre: **${name}**
📧 Email: **${email}**
💬 Mensaje: **${message}**
        `;
      const payload = new URLSearchParams({
        'chat_id': process.env.NEXT_PUBLIC_CHAT_ID!,
        'text': msg,
        'parse_mode': 'Markdown' 
      });
      const token_telegram = process.env.NEXT_PUBLIC_TELEGRAM_TOKEN;
      const res = await fetch(`https://api.telegram.org/bot${token_telegram}/sendMessage`, {
        method: "POST",
        body: payload,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        signal: AbortSignal.timeout(5000)
      });
      
      if (!res.ok) {
        throw new Error("Error sending message to Telegram");
      }

      setLoading(false);
      setName("");
      setEmail("");
      setMessage("");

      Swal.fire({
        icon: 'success',
        title: '¡Mensaje Enviado!',
        text: 'Te contactaré pronto.',
        background: '#0f172a',
        color: '#f1f5f9',
        confirmButtonColor: '#ec4899'
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      id="contact" 
      className="mb-24 max-w-2xl mx-auto"
    >
      <div className="flex flex-col items-center gap-3 mb-8 text-center">
        <Mail className="text-pink-400" size={32} />
        <h3 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-press-start)' }}>Contacto</h3>
        <p className="text-sm text-slate-400">¿Tienes un proyecto en mente? ¡Hablemos!</p>
      </div>

      <div className="glass-panel p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-xs font-semibold text-slate-300 ml-1">Nombre</label>
              <input 
                id="name"
                required 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                type='text' 
                placeholder="John Doe" 
                className="p-3 rounded-lg border border-slate-700 bg-slate-900/50 text-slate-200 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all placeholder:text-slate-600" 
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs font-semibold text-slate-300 ml-1">Email</label>
              <input 
                id="email"
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                type='email' 
                placeholder="john@example.com" 
                className="p-3 rounded-lg border border-slate-700 bg-slate-900/50 text-slate-200 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all placeholder:text-slate-600" 
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="text-xs font-semibold text-slate-300 ml-1">Mensaje</label>
            <textarea 
              id="message"
              required 
              value={message} 
              onChange={(e) => setMessage(e.target.value)} 
              placeholder="Hola, me gustaría trabajar contigo en..." 
              className="p-3 rounded-lg border border-slate-700 bg-slate-900/50 text-slate-200 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all placeholder:text-slate-600 resize-none" 
              rows={5} 
            />
          </div>

          <button 
            disabled={loading}
            type="submit" 
            className="mt-2 flex items-center justify-center gap-2 w-full sm:w-auto sm:ml-auto px-8 py-3 rounded-lg bg-gradient-to-r from-pink-600 to-pink-500 text-white font-semibold hover:from-pink-500 hover:to-pink-400 transition-all focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-70"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enviando...
              </>
            ) : (
              <>
                <Send size={18} /> Enviar Mensaje
              </>
            )}
          </button>
        </form>
      </div>
    </motion.section>
  );
}
