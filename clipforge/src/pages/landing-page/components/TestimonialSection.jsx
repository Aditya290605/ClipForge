import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const TestimonialsSection = () => {
  const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Content Creator",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_103b528db-1763293982935.png",
    avatarAlt: "Professional headshot of young woman with long brown hair wearing casual white shirt smiling at camera",
    content: "This tool has completely transformed my meme creation workflow. I can now create viral content in minutes instead of hours. The editing features are incredibly intuitive!",
    rating: 5,
    platform: "Instagram"
  },
  {
    id: 2,
    name: "Marcus Chen",
    role: "Social Media Manager",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_105162ea9-1763296537161.png",
    avatarAlt: "Professional portrait of Asian man with short black hair in navy blue business suit with confident smile",
    content: "As someone who manages multiple social media accounts, this is a game-changer. The speed controls and text overlay features are exactly what I needed for creating engaging content.",
    rating: 5,
    platform: "Twitter"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Digital Marketer",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1993c0ddc-1763301484246.png",
    avatarAlt: "Casual portrait of Hispanic woman with curly dark hair wearing red sweater in bright indoor setting",
    content: "The quality of downloads is outstanding! I've tried many tools, but this one gives me the best results. My engagement rates have increased by 40% since I started using it.",
    rating: 5,
    platform: "TikTok"
  },
  {
    id: 4,
    name: "David Kim",
    role: "YouTuber",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1219eacec-1763294869102.png",
    avatarAlt: "Professional headshot of young man with short brown hair wearing light blue button-up shirt with friendly expression",
    content: "Perfect for creating reaction videos and compilations. The cropping tool is so precise, and I love that I can adjust the speed for comedic effect. Highly recommend!",
    rating: 5,
    platform: "YouTube"
  },
  {
    id: 5,
    name: "Jessica Taylor",
    role: "Influencer",
    avatar: "https://images.unsplash.com/photo-1552334588-6c2511e9f2cf",
    avatarAlt: "Outdoor portrait of blonde woman with wavy hair wearing casual denim jacket with natural lighting",
    content: "I\'ve been using this daily for my Instagram stories. The text overlay feature with custom fonts makes my content stand out. It\'s become an essential part of my toolkit.",
    rating: 5,
    platform: "Instagram"
  },
  {
    id: 6,
    name: "Alex Thompson",
    role: "Meme Page Admin",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_18f3021db-1763299854851.png",
    avatarAlt: "Casual portrait of young man with short dark hair wearing black t-shirt with relaxed smile",
    content: "Running a meme page with 500K followers, I need tools that are fast and reliable. This delivers on both fronts. The color filters help me maintain a consistent aesthetic.",
    rating: 5,
    platform: "Facebook"
  }];


  return (
    <section className="bg-muted/30 py-12 md:py-16 lg:py-24">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 rounded-full text-success text-sm md:text-base font-medium mb-4 md:mb-6">
            <Icon name="Star" size={18} />
            <span>Loved by Creators</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6">
            What Our Users Say
          </h2>

          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of content creators who trust MemeDownloader for their video editing needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {testimonials?.map((testimonial) =>
          <div
            key={testimonial?.id}
            className="bg-card border border-border rounded-2xl p-6 md:p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">

              <div className="flex items-center gap-4 mb-4 md:mb-6">
                <div className="relative">
                  <Image
                  src={testimonial?.avatar}
                  alt={testimonial?.avatarAlt}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover" />

                  <div className="absolute -bottom-1 -right-1 w-5 h-5 md:w-6 md:h-6 bg-success rounded-full border-2 border-card flex items-center justify-center">
                    <Icon name="Check" size={12} color="#FFFFFF" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-sm md:text-base font-semibold text-foreground">
                    {testimonial?.name}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground">
                    {testimonial?.role}
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {[...Array(testimonial?.rating)]?.map((_, index) =>
                <Icon key={index} name="Star" size={14} color="var(--color-warning)" className="fill-current" />
                )}
                </div>
              </div>

              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
                "{testimonial?.content}"
              </p>

              <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                <Icon name="MessageCircle" size={14} />
                <span>Posted on {testimonial?.platform}</span>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
          <div className="text-center">
            <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2">
              500K+
            </div>
            <div className="text-sm md:text-base text-muted-foreground">
              Memes Created
            </div>
          </div>

          <div className="text-center">
            <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2">
              50K+
            </div>
            <div className="text-sm md:text-base text-muted-foreground">
              Active Users
            </div>
          </div>

          <div className="text-center">
            <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2">
              4.9/5
            </div>
            <div className="text-sm md:text-base text-muted-foreground">
              Average Rating
            </div>
          </div>

          <div className="text-center">
            <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2">
              99%
            </div>
            <div className="text-sm md:text-base text-muted-foreground">
              Satisfaction Rate
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default TestimonialsSection;