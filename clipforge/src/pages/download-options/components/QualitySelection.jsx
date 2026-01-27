import React from 'react';
import Icon from '../../../components/AppIcon';

const QualitySelector = ({ selectedQuality, onQualityChange, qualities }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base md:text-lg font-semibold text-foreground">
          Video Quality
        </h3>
        <Icon name="Sparkles" size={20} color="var(--color-primary)" />
      </div>
      <div className="space-y-3">
        {qualities?.map((quality) => (
          <label
            key={quality?.value}
            className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all duration-250 ${
              selectedQuality === quality?.value
                ? 'border-primary bg-primary/5' :'border-border bg-card hover:border-primary/50'
            }`}
          >
            <div className="flex items-center gap-4">
              <input
                type="radio"
                name="quality"
                value={quality?.value}
                checked={selectedQuality === quality?.value}
                onChange={(e) => onQualityChange(e?.target?.value)}
                className="w-5 h-5 accent-primary cursor-pointer"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm md:text-base font-semibold text-foreground">
                    {quality?.label}
                  </span>
                  {quality?.recommended && (
                    <span className="px-2 py-0.5 text-xs font-medium bg-success/10 text-success rounded-full">
                      Recommended
                    </span>
                  )}
                </div>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {quality?.description}
                </p>
              </div>
            </div>

            <div className="text-right space-y-1">
              <p className="text-sm md:text-base font-semibold text-foreground">
                {quality?.fileSize}
              </p>
              <p className="text-xs text-muted-foreground">
                Est. size
              </p>
            </div>
          </label>
        ))}
      </div>
      <div className="p-4 bg-muted/50 rounded-xl border border-border">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={18} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-xs md:text-sm font-medium text-foreground">
              Quality Selection Tips
            </p>
            <p className="text-xs text-muted-foreground">
              Higher quality means larger file size. Choose 720p for best balance between quality and file size for social media sharing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QualitySelector;