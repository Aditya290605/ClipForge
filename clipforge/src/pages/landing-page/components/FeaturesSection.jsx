import React from 'react';
import Icon from '../../../components/AppIcon';

const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      icon: "Link",
      title: "Easy URL Input",
      description: "Simply paste any YouTube video URL and start creating. Supports all video formats and lengths.",
      gradient: "from-primary to-primary/80"
    },
    {
      id: 2,
      icon: "Scissors",
      title: "Precision Cropping",
      description: "Select exact moments with our intuitive timeline. Crop videos down to the millisecond for perfect memes.",
      gradient: "from-secondary to-secondary/80"
    },
    {
      id: 3,
      icon: "Gauge",
      title: "Speed Control",
      description: "Adjust playback speed from 0.25x to 4x. Create slow-motion effects or speed up boring parts.",
      gradient: "from-accent to-accent/80"
    },
    {
      id: 4,
      icon: "Type",
      title: "Text Overlay",
      description: "Add custom text with multiple fonts, colors, and positioning. Create impact text for viral memes.",
      gradient: "from-success to-success/80"
    },
    {
      id: 5,
      icon: "Palette",
      title: "Color Filters",
      description: "Apply professional color adjustments and filters. Enhance brightness, contrast, and saturation.",
      gradient: "from-warning to-warning/80"
    },
    {
      id: 6,
      icon: "Download",
      title: "HD Downloads",
      description: "Export in multiple quality options from 360p to 1080p. Choose the perfect size for your platform.",
      gradient: "from-error to-error/80"
    }
  ];

  return (
    <section className="bg-background py-12 md:py-16 lg:py-24">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm md:text-base font-medium mb-4 md:mb-6">
            <Icon name="Sparkles" size={18} />
            <span>Powerful Features</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6">
            Everything You Need to Create
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mt-2">
              Amazing Memes
            </span>
          </h2>

          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional video editing tools designed specifically for meme creators. No experience required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features?.map((feature) => (
            <div
              key={feature?.id}
              className="group relative bg-card border border-border rounded-2xl p-6 md:p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative">
                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br ${feature?.gradient} flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon name={feature?.icon} size={28} color="#FFFFFF" />
                </div>

                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3 md:mb-4">
                  {feature?.title}
                </h3>

                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {feature?.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 md:mt-16 lg:mt-20 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 md:gap-6 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl p-6 md:p-8 border border-border">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                <Icon name="Shield" size={24} color="var(--color-success)" />
              </div>
              <div className="text-left">
                <div className="text-base md:text-lg font-semibold text-foreground">100% Free</div>
                <div className="text-xs md:text-sm text-muted-foreground">No hidden charges</div>
              </div>
            </div>

            <div className="hidden sm:block h-12 w-px bg-border"></div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon name="Zap" size={24} color="var(--color-primary)" />
              </div>
              <div className="text-left">
                <div className="text-base md:text-lg font-semibold text-foreground">Lightning Fast</div>
                <div className="text-xs md:text-sm text-muted-foreground">Process in seconds</div>
              </div>
            </div>

            <div className="hidden sm:block h-12 w-px bg-border"></div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <Icon name="Lock" size={24} color="var(--color-secondary)" />
              </div>
              <div className="text-left">
                <div className="text-base md:text-lg font-semibold text-foreground">Secure</div>
                <div className="text-xs md:text-sm text-muted-foreground">Your privacy matters</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;