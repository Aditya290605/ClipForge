import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CTASection = () => {
  const navigate = useNavigate();

  const handleStartCreating = () => {
    navigate('/video-input');
  };

  return (
    <section className="bg-gradient-to-br from-primary via-secondary to-accent py-12 md:py-16 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div className="relative max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm md:text-base font-medium">
            <Icon name="Zap" size={18} />
            <span>Start Creating Today</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Ready to Create Viral Memes?
          </h2>

          <p className="text-base md:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto">
            Join thousands of content creators who use MemeDownloader to create engaging content. No credit card required, start for free today!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              variant="secondary"
              size="lg"
              iconName="Sparkles"
              iconPosition="left"
              onClick={handleStartCreating}
              className="text-base md:text-lg px-6 md:px-8 py-3 md:py-4 bg-white text-primary hover:bg-white/90"
            >
              Start Creating Memes
            </Button>

            <Button
              variant="outline"
              size="lg"
              iconName="Play"
              iconPosition="left"
              className="text-base md:text-lg px-6 md:px-8 py-3 md:py-4 border-white text-white hover:bg-white/10"
            >
              Watch Tutorial
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 pt-6 md:pt-8">
            <div className="flex items-center gap-2 text-white/90">
              <Icon name="Check" size={20} />
              <span className="text-sm md:text-base">100% Free</span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <Icon name="Check" size={20} />
              <span className="text-sm md:text-base">No Sign-up Required</span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <Icon name="Check" size={20} />
              <span className="text-sm md:text-base">Instant Access</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
    </section>
  );
};

export default CTASection;