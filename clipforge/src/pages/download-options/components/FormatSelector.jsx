import React from 'react';
import Icon from '../../../components/AppIcon';

const FormatSelector = ({ selectedFormat, onFormatChange, formats }) => {
  const getFormatIcon = (format) => {
    switch (format) {
      case 'mp4':
        return 'Video';
      case 'webm':
        return 'Film';
      case 'gif':
        return 'Image';
      default:
        return 'FileVideo';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base md:text-lg font-semibold text-foreground">
          Output Format
        </h3>
        <Icon name="FileType" size={20} color="var(--color-primary)" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {formats?.map((format) => (
          <button
            key={format?.value}
            onClick={() => onFormatChange(format?.value)}
            className={`p-4 rounded-xl border-2 transition-all duration-250 text-left ${
              selectedFormat === format?.value
                ? 'border-primary bg-primary/5' :'border-border bg-card hover:border-primary/50'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  selectedFormat === format?.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground'
                }`}>
                  <Icon 
                    name={getFormatIcon(format?.value)} 
                    size={24} 
                  />
                </div>
                {selectedFormat === format?.value && (
                  <Icon name="CheckCircle2" size={20} color="var(--color-primary)" />
                )}
              </div>

              <div className="space-y-1">
                <p className="text-sm md:text-base font-semibold text-foreground uppercase">
                  {format?.label}
                </p>
                <p className="text-xs text-muted-foreground">
                  {format?.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1">
                {format?.compatibility?.map((platform, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 text-xs bg-muted text-muted-foreground rounded-full"
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>
      <div className="p-4 bg-accent/10 rounded-xl border border-accent/20">
        <div className="flex items-start gap-3">
          <Icon name="Lightbulb" size={18} color="var(--color-accent)" className="flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-xs md:text-sm font-medium text-foreground">
              Format Recommendation
            </p>
            <p className="text-xs text-muted-foreground">
              MP4 offers the best compatibility across all platforms. Use WebM for web-only content or GIF for short, looping animations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormatSelector;