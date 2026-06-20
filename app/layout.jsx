import { Inter, JetBrains_Mono, Playfair_Display } from 'next/font/google';
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

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-data',
  display: 'swap',
});

export const metadata = {
  title: 'Noman Majeed | Senior Software Engineer',
  description:
    'Senior Software Engineer specializing in Python, FastAPI, Django, AI/LLM integration, and full-stack web development.',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${playfair.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-black font-[family-name:var(--font-inter)] text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
