import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata = {
  title: 'Noman Majeed | Frontend Developer',
  description: 'Frontend Developer specializing in React, Next.js, and modern web applications.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className="min-h-screen bg-zinc-50 font-[family-name:var(--font-inter)] text-zinc-950 antialiased">
        {children}
      </body>
    </html>
  );
}
