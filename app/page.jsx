import { Navbar } from '@/components/Navbar';
import { Header } from '@/components/Header';
import { About } from '@/components/About';
import { TechCloud } from '@/components/TechCloud';
import { Skills } from '@/components/Skills';
import { Work } from '@/components/Work';
import { Testimonials } from '@/components/Testimonials';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <Header />
      <About />
      <TechCloud />
      <Skills />
      <Work />
      <Testimonials />
      <Footer />
    </main>
  );
}
