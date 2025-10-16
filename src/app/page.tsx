"use client";

import validateEmail from '@/utils/functions';
import {projects, skills, languages, hobbies, workExperience} from '@/utils/consts';
import Head from 'next/head'
import { useState } from 'react';
import Swal from 'sweetalert2';

export default function Home() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false);

  const handleValidateField = () => {
        if (name === "") { return "Nombre obligatorio!" }
        if (email === "") { return "Email obligatorio!" }
        if (message === "") { return "mensaje obligatorio!" }
        if (!validateEmail(email)) { return "Formato de correo invalido!" }
        return ""
    }

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault()
    setLoading(true);
    
    try {
      const validateError = handleValidateField()
      if (validateError !== "") {
        Swal.fire(validateError);
        throw new Error(validateError)
      }

      var msg = `
        🚨 **Mensaje Recibido** 🚨\n
👤 Nombre: **${name}**,
📧 Email: **${email},**
💬 Message: **${message}**
        `
      const payload = new URLSearchParams({
        'chat_id': process.env.NEXT_PUBLIC_CHAT_ID!,
        'text': msg,
        'parse_mode': 'Markdown' 
      });
      let token_telegram = process.env.NEXT_PUBLIC_TELEGRAM_TOKEN;
      const res = await fetch(`https://api.telegram.org/bot${token_telegram}/sendMessage`, {
        method: "POST",
        body: payload,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded' // Opcional, pero explícito ayuda
        },
        // Timeout de 5s como en tu Python original (usa AbortController)
        signal: AbortSignal.timeout(5000)
      })
      
      if (!res.ok) {
        // const errorText = await res.text(); // Loguea el error detallado de Telegram
        Swal.fire("Error al enviar el mensaje.");
        return;
      }

      setLoading(false);
      setName("");
      setEmail("");
      setMessage("");

      Swal.fire("Mensaje enviado con exito!");
    } catch (error) {
      console.log(error);
      // Swal.fire("Ocurrió un error intenta más tarde!");
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Portafolio — Estilo Noventero / 2000s</title>
        <meta name="description" content="Portafolio retro creado con Next.js y TailwindCSS - modo oscuro fijo" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Inter:wght@300;400;600;800&display=swap" rel="stylesheet" />
      </Head>

      <main className="min-h-screen bg-black text-slate-200 font-sans px-1">
        <div className="max-w-5xl mx-auto p-4 sm:p-6">
          <header>
            <div className="flex md:items-center justify-center  gap-4 flex-wrap mb-4">
              <img
                src="/profile.png"
                alt="Foto de perfil"
                className="w-32 h-32 rounded-full border-2 border-pink-500 shadow-lg object-cover"
              />
              <div className='w-64 md:w-auto'>
                <h1 className="text-xl text-center md:text-left sm:text-2xl font-bold tracking-widest leading-none" style={{ fontFamily: 'Inter, system-ui' }}>Ford-Ndji Joseph</h1>
                <p className="text-xs opacity-80 text-center md:text-left mt-1 tracking-widest leading-none">Desarrollador web & móvil • Portafolio retro</p>
                <ul className="space-y-1 text-sm ">
                  <li className="flex items-center text-center md:text-left">
                    <span className="mr-3">
                      📧
                    </span>
                    <a href="mailto:fordstelle@gmail.com" className="text-xs text-pink-400 hover:underline tracking-widest leading-none">fordstelle@gmail.com</a>
                  </li>
                  <li className="flex items-center text-center md:text-left">
                    <span className="mr-3">
                      📱
                    </span>
                    <span className="text-slate-300 font-mono">+58 414 973-2424</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3">
                      📍
                    </span>
                    <span className="text-slate-300 font-mono tracking-widest leading-none">Acarigua, Venezuela</span>
                  </li>
                </ul>
                <div className="mt-2">
                  <div className="flex space-x-4 tracking-widest leading-none" style={{ fontFamily: 'Inter, system-ui' }}>
                    <a href="https://github.com/ford2221" target="_blank" className=" text-green-500 hover:brightness-110 text-xs transition hover:underline">• GitHub</a>
                    <a href="https://www.linkedin.com/in/ford-ndji-joseph-7a62531a8/" target="_blank" className="text-blue-500 text-xs hover:brightness-110 transition hover:underline">•  LinkedIn</a>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {skills.map(skill => (
                    <span key={skill} className="text-[11px] px-2 py-1 rounded bg-black/50 border border-slate-500/30 hover:cursor-pointer hover:scale-105 transition delay-150 duration-300 ease-in-out">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
            {/* <a href="#contact" className="px-4 py-2 hover:cursor-pointer border-1 border-pink-700 text-white rounded-md text-sm font-semibold hover:brightness-110 self-start sm:self-auto hover:scale-105 transition delay-150 duration-300 ease-in-out">Contactar</a> */}
          </header>

          <section className="mb-8">
            <h3 className="text-lg sm:text-xl font-bold mb-2">🎓 Formación</h3>
            <p className="text-sm opacity-90 ml-4">UPTP JJ Montilla, Portuguesa</p>
          </section>

          <section className="mb-8">
            <h3 className="text-lg sm:text-xl font-bold mb-4">💼 Experiencia</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ml-4">
              {workExperience.map((job, i) => (
                <div key={i} className="p-4 rounded-lg border border-slate-700/40 bg-gradient-to-br from-slate-900/50 to-slate-800/30 hover:scale-[1.01] transition-transform">
                  <h4 className="font-semibold text-pink-500">{job.company}</h4>
                  <p className="text-xs opacity-70">{job.period}</p>
                  <p className="text-sm mt-1">{job.role}</p>
                </div>
              ))}
            </div>
            
          </section>

          <section className="mb-8">
            <h3 className="text-lg sm:text-xl font-bold mb-4">☕ Pasatiempos</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 ml-4">
              {hobbies.map((hobby, i) => (
                <div key={i} className="p-4 rounded-lg border border-slate-700/40 bg-slate-900/40 text-center hover:scale-[1.02] transition-transform">
                  <span className="text-lg block mb-1">{hobby.split(' ')[0]}</span>
                  <p className="text-xs opacity-80">{hobby.split(' ').slice(1).join(' ')}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-lg sm:text-xl font-bold mb-4">🌎 Idiomas</h3>
            <div className="space-y-3">
              {languages.map((lang, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1">
                    <span>{lang.name}</span>
                    <span>{lang.level}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-pink-500" style={{ width: `${lang.level}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="projects" className="mb-12">
            <h3 className="text-lg sm:text-xl font-bold mb-4">🖥️ Proyectos</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projects.map(p => (
                <a target='_blank' href={p.link}  key={p.id} className="p-4 rounded-lg border border-slate-700/40 bg-gradient-to-br from-slate-900/50 to-slate-800/30 hover:scale-[1.01] transition-transform">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold" style={{ fontFamily: 'Press Start 2P, monospace' }}>{p.title}</h4>
                      <p className="text-xs opacity-80 mt-1">{p.desc}</p>
                    </div>
                    <div className="text-xs opacity-80">
                      🔗
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tags.map(t => (
                      <span key={t} className="text-[10px] px-2 py-1 rounded bg-black/50 border border-slate-600/20">{t}</span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </section>

          <section id="contact" className="mb-24 grid grid-cols-1 md:grid-cols-2 gap-6">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
              <input required value={name} onChange={(e) => setName(e.target.value)} type='text' placeholder="Nombre" className="p-3 rounded border border-slate-600/50 bg-transparent" />
              <input required value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder="Correo" className="p-3 rounded border border-slate-600/50 bg-transparent" />
              <textarea required value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Mensaje" className="p-3 rounded border border-slate-600/50 bg-transparent" rows={4} />
              <button onClick={handleSubmit} type="submit" className="px-4 py-3 rounded border border-pink-600 text-white font-semibold hover:cursor-pointer hover:scale-105 transition delay-150 duration-300 ease-in-out" >Enviar</button>
              {loading && (
                <div className="flex justify-center items-center mt-4">
                    {/* <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div> */}
                    <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-violet-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <p className='ml-4 text-white'>Procesando, Por favor Espere...</p>
                </div>
              )}
            </form>
            <div></div>
          </section>

          <footer className="py-6 text-center text-xs opacity-70">© {new Date().getFullYear()} Ford-Ndji Joseph — Portfolio retro</footer>
        </div>

        <style jsx global>{`
          :root { --neon: 255 85 145; }
          body {
            background: radial-gradient(1000px 600px at 10% 10%, rgba(255,0,150,0.03), transparent 5%), radial-gradient(800px 500px at 90% 90%, rgba(0,200,255,0.02), transparent 5%);
          }
          main {
            background-image: linear-gradient(transparent 92%, rgba(255,255,255,0.02) 93%);
            background-size: 100% 8px;
          }
        `}</style>
      </main>
    </>
  )
}
