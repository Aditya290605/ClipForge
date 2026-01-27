import React from 'react';
import Icon from '../../../components/AppIcon';

const ExampleURLs = ({ onSelectExample }) => {
  const exampleUrls = [
  {
    id: 1,
    title: "Funny Cat Compilation",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    duration: "3:45",
    thumbnail: "https://images.unsplash.com/photo-1734750337876-ad50f0a761c8",
    thumbnailAlt: "Orange tabby cat with bright green eyes sitting on wooden floor looking directly at camera with curious expression"
  },
  {
    id: 2,
    title: "Epic Gaming Moments",
    url: "https://www.youtube.com/watch?v=J---aiyznGQ",
    duration: "5:20",
    thumbnail: "https://images.unsplash.com/photo-1631914730601-6295d106b459",
    thumbnailAlt: "Professional gaming setup with RGB mechanical keyboard and gaming mouse on dark desk with colorful LED lights in background"
  },
  {
    id: 3,
    title: "Dance Challenge Compilation",
    url: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
    duration: "4:15",
    thumbnail: "https://images.unsplash.com/photo-1540921035703-fbbdb12d8580",
    thumbnailAlt: "Young woman in casual streetwear performing energetic dance move with arms raised in modern urban studio with white walls"
  }];


  return (
    <div className="w-full max-w-3xl mx-auto px-4 md:px-6 lg:px-8 mt-8">
      <div className="bg-card rounded-xl shadow-lg p-6 md:p-8 border border-border">
        <div className="flex items-center gap-2 mb-6">
          <Icon name="Sparkles" size={20} color="var(--color-primary)" />
          <h2 className="text-lg md:text-xl font-semibold text-foreground">
            Try These Examples
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {exampleUrls?.map((example) =>
          <button
            key={example?.id}
            onClick={() => onSelectExample(example?.url)}
            className="group bg-muted/50 rounded-lg overflow-hidden hover:bg-muted transition-all duration-250 text-left">

              <div className="aspect-video relative overflow-hidden">
                <img
                src={example?.thumbnail}
                alt={example?.thumbnailAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-250" />

                <div className="absolute bottom-2 right-2 bg-background/90 px-2 py-1 rounded text-xs font-medium">
                  {example?.duration}
                </div>
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                  {example?.title}
                </p>
              </div>
            </button>
          )}
        </div>
      </div>
    </div>);

};

export default ExampleURLs;