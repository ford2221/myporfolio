import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true, // Evita la transformación de imágenes en los servidores de Vercel
  },
  // Desactiva el encabezado 'x-powered-by: Next.js' por privacidad/seguridad básica
  poweredByHeader: false,
};

export default nextConfig;
