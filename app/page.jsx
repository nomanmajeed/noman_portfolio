import { Navbar } from '@/components/Navbar';
import { Header } from '@/components/Header';
import { About } from '@/components/About';
import { Skills } from '@/components/Skills';
import { Work } from '@/components/Work';
import { Testimonials } from '@/components/Testimonials';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Header />
      <About />
      <Skills />
      <Work />
      <Testimonials />
      <Footer />
    </main>
  );
}
