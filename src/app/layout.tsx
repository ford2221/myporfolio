import type { Metadata } from "next";
import { Inter, Press_Start_2P } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const pressStart = Press_Start_2P({
  weight: "400",
  variable: "--font-press-start",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portafolio — Cyberpunk / Retro",
  description: "Portafolio retro creado con Next.js y TailwindCSS - modo oscuro fijo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${inter.variable} ${pressStart.variable} antialiased font-sans`}
      >
        {/* CRT Scanline effect overlay */}
        <div className="fixed inset-0 pointer-events-none z-50 bg-[linear-gradient(transparent_92%,rgba(255,255,255,0.02)_93%)] bg-[length:100%_8px] opacity-50" />
        {children}
      </body>
    </html>
  );
}
