import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VideoPreview = ({ videoData, onContinue, onCancel }) => {
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const formatFileSize = (bytes) => {
    const mb = (bytes / (1024 * 1024))?.toFixed(2);
    return `${mb} MB`;
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 md:px-6 lg:px-8 mt-8">
      <div className="bg-card rounded-xl shadow-lg overflow-hidden border border-border">
        <div className="aspect-video relative overflow-hidden bg-muted">
          <img
            src={videoData?.thumbnail}
            alt={videoData?.thumbnailAlt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-white line-clamp-2">
              {videoData?.title}
            </h3>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Clock" size={16} color="var(--color-primary)" />
                <span className="text-xs text-muted-foreground">Duration</span>
              </div>
              <p className="text-base md:text-lg font-semibold text-foreground">
                {formatDuration(videoData?.duration)}
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="HardDrive" size={16} color="var(--color-primary)" />
                <span className="text-xs text-muted-foreground">Size</span>
              </div>
              <p className="text-base md:text-lg font-semibold text-foreground">
                {formatFileSize(videoData?.fileSize)}
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Monitor" size={16} color="var(--color-primary)" />
                <span className="text-xs text-muted-foreground">Quality</span>
              </div>
              <p className="text-base md:text-lg font-semibold text-foreground">
                {videoData?.quality}
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Film" size={16} color="var(--color-primary)" />
                <span className="text-xs text-muted-foreground">Format</span>
              </div>
              <p className="text-base md:text-lg font-semibold text-foreground">
                {videoData?.format}
              </p>
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <Icon name="User" size={20} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground mb-1">Channel</p>
                <p className="text-sm text-muted-foreground">{videoData?.channel}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              size="lg"
              fullWidth
              onClick={onCancel}
              iconName="X"
              iconPosition="left"
            >
              Cancel
            </Button>
            <Button
              variant="default"
              size="lg"
              fullWidth
              onClick={onContinue}
              iconName="ArrowRight"
              iconPosition="right"
            >
              Continue to Editor
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPreview;