import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DownloadButton = ({ 
  isProcessing, 
  progress, 
  estimatedTime, 
  onDownload, 
  disabled 
}) => {
  return (
    <div className="space-y-4">
      {isProcessing ? (
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-foreground font-medium">
                Processing your video...
              </span>
              <span className="text-primary font-semibold">
                {progress}%
              </span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Estimated time remaining</span>
              <span className="font-medium">{estimatedTime}</span>
            </div>
          </div>

          <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 animate-pulse">
                <Icon name="Loader2" size={16} color="var(--color-primary)" className="animate-spin" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">
                  Please wait while we process your video
                </p>
                <p className="text-xs text-muted-foreground">
                  This may take a few moments depending on video length and selected quality
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Button
          variant="default"
          size="lg"
          fullWidth
          iconName="Download"
          iconPosition="left"
          onClick={onDownload}
          disabled={disabled}
          className="shadow-primary-lg"
        >
          Download Video
        </Button>
      )}

      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          size="default"
          iconName="RotateCcw"
          iconPosition="left"
          disabled={isProcessing}
        >
          Start Over
        </Button>
        <Button
          variant="outline"
          size="default"
          iconName="Edit"
          iconPosition="left"
          disabled={isProcessing}
        >
          Edit Again
        </Button>
      </div>
    </div>
  );
};

export default DownloadButton;