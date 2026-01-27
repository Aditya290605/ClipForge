import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleStartCreating = () => {
    navigate('/video-input');
  };

  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="text-center lg:text-left space-y-6 md:space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm md:text-base font-medium">
              <Icon name="Sparkles" size={18} />
              <span>Transform Videos into Viral Memes</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Create Epic Memes from
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mt-2">
                YouTube Videos
              </span>
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              Download, edit, and customize YouTube videos with powerful tools. Add text, adjust speed, crop perfectly, and download in HD quality - all in your browser.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                variant="default"
                size="lg"
                iconName="Zap"
                iconPosition="left"
                onClick={handleStartCreating}
                className="text-base md:text-lg px-6 md:px-8 py-3 md:py-4">

                Start Creating Memes
              </Button>

              <Button
                variant="outline"
                size="lg"
                iconName="Play"
                iconPosition="left"
                className="text-base md:text-lg px-6 md:px-8 py-3 md:py-4">

                Watch Demo
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 md:gap-8 pt-4 md:pt-6">
              <div className="text-center lg:text-left">
                <div className="text-2xl md:text-3xl font-bold text-foreground">500K+</div>
                <div className="text-sm md:text-base text-muted-foreground">Memes Created</div>
              </div>
              <div className="h-12 w-px bg-border hidden sm:block"></div>
              <div className="text-center lg:text-left">
                <div className="text-2xl md:text-3xl font-bold text-foreground">50K+</div>
                <div className="text-sm md:text-base text-muted-foreground">Active Users</div>
              </div>
              <div className="h-12 w-px bg-border hidden sm:block"></div>
              <div className="text-center lg:text-left">
                <div className="text-2xl md:text-3xl font-bold text-foreground">4.9/5</div>
                <div className="text-sm md:text-base text-muted-foreground">User Rating</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border bg-card">
              <div className="aspect-video relative">
                <Image
                  src="https://images.unsplash.com/photo-1695218716405-5b813000e994"
                  alt="Modern video editing interface showing timeline with multiple video clips, text overlays, and color adjustment controls on desktop computer screen"
                  className="w-full h-full object-cover" />

                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                
                <div className="absolute bottom-4 left-4 right-4 space-y-3">
                  <div className="flex items-center gap-3 bg-card/95 backdrop-blur-sm rounded-lg p-3 border border-border">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="Scissors" size={20} color="var(--color-primary)" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs md:text-sm font-medium text-foreground">Crop & Trim</div>
                      <div className="text-xs text-muted-foreground">Precision editing tools</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-card/95 backdrop-blur-sm rounded-lg p-3 border border-border">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="Type" size={20} color="var(--color-secondary)" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs md:text-sm font-medium text-foreground">Add Text</div>
                      <div className="text-xs text-muted-foreground">Custom captions & memes</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-primary to-secondary rounded-full blur-2xl opacity-50"></div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-secondary to-accent rounded-full blur-2xl opacity-50"></div>
          </div>
        </div>
      </div>
    </section>);

};

export default HeroSection;