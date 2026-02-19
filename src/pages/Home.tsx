import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import HeroSection from '@/components/landing/HeroSection';
import SolutionsSection from '@/components/landing/SolutionsSection';
import CaseShowcase from '@/components/landing/CaseShowcase';
import ProcessSection from '@/components/landing/ProcessSection';
import FinalCTA from '@/components/landing/FinalCTA';
import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <HeroSection />
        <SolutionsSection />
        <CaseShowcase />
        <ProcessSection />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Home;
