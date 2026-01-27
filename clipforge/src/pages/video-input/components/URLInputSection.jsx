import React from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const URLInputSection = ({ 
  url, 
  onUrlChange, 
  onSubmit, 
  validationState, 
  isProcessing 
}) => {
  const getValidationMessage = () => {
    if (!validationState) return null;
    
    const messages = {
      invalid: "Please enter a valid YouTube URL",
      unsupported: "This video format is not supported",
      restricted: "This video is region-restricted and cannot be downloaded",
      network: "Network error. Please check your connection and try again",
      duration: "Video duration exceeds maximum limit of 10 minutes"
    };
    
    return messages?.[validationState] || null;
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
      <div className="bg-card rounded-xl shadow-lg p-6 md:p-8 lg:p-10 border border-border">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Icon name="Link" size={24} color="#FFFFFF" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground">
              Download YouTube Video
            </h1>
            <p className="text-sm md:text-base text-muted-foreground mt-1">
              Paste your YouTube URL to get started
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <Input
            type="url"
            placeholder="https://www.youtube.com/watch?v=..."
            value={url}
            onChange={(e) => onUrlChange(e?.target?.value)}
            error={validationState && validationState !== 'valid' ? getValidationMessage() : ''}
            disabled={isProcessing}
            className="text-base md:text-lg"
          />

          <Button
            variant="default"
            size="lg"
            fullWidth
            onClick={onSubmit}
            disabled={!url || isProcessing}
            loading={isProcessing}
            iconName="Download"
            iconPosition="left"
          >
            {isProcessing ? 'Processing...' : 'Download Video'}
          </Button>
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-start gap-3">
            <Icon name="Info" size={20} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground space-y-2">
              <p className="font-medium text-foreground">Supported videos:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Maximum duration: 10 minutes</li>
                <li>Public and unlisted videos only</li>
                <li>Standard YouTube video formats</li>
                <li>No age-restricted content</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default URLInputSection;