import React, { useState } from 'react';
import PrimaryNavigation from '../../components/navigation/PrimaryNavigation';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import TestimonialsSection from './components/TestimonialsSection';
import FAQSection from './components/FAQSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

const LandingPage = () => {
  const [user] = useState(null);

  const handleLogout = () => {
    console.log('User logged out');
  };

  return (
    <div className="min-h-screen bg-background">
      <PrimaryNavigation user={user} onLogout={handleLogout} />
      
      <main className="pt-16">
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;