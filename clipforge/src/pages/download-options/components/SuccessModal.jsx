import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SuccessModal = ({ isOpen, onClose, downloadUrl, videoDetails }) => {
  if (!isOpen) return null;

  const handleShare = (platform) => {
    console.log(`Sharing to ${platform}`);
  };

  const socialPlatforms = [
    { name: 'Twitter', icon: 'Twitter', color: '#1DA1F2' },
    { name: 'Facebook', icon: 'Facebook', color: '#1877F2' },
    { name: 'Instagram', icon: 'Instagram', color: '#E4405F' },
    { name: 'WhatsApp', icon: 'MessageCircle', color: '#25D366' }
  ];

  return (
    <div className="fixed inset-0 z-[1200] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="w-full max-w-md bg-card rounded-2xl shadow-2xl border border-border overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-6 md:p-8 space-y-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center">
              <Icon name="CheckCircle2" size={40} color="var(--color-success)" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Video Ready!
              </h2>
              <p className="text-sm md:text-base text-muted-foreground">
                Your meme has been processed successfully and is ready to download
              </p>
            </div>
          </div>

          <div className="p-4 bg-muted/50 rounded-xl space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">File Name</span>
              <span className="font-medium text-foreground">{videoDetails?.filename}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Quality</span>
              <span className="font-medium text-foreground">{videoDetails?.quality}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Format</span>
              <span className="font-medium text-foreground">{videoDetails?.format?.toUpperCase()}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">File Size</span>
              <span className="font-medium text-foreground">{videoDetails?.fileSize}</span>
            </div>
          </div>

          <div className="space-y-3">
            <a
              href={downloadUrl}
              download
              className="block"
            >
              <Button
                variant="default"
                size="lg"
                fullWidth
                iconName="Download"
                iconPosition="left"
                className="shadow-primary-lg"
              >
                Download Now
              </Button>
            </a>

            <div className="space-y-3">
              <p className="text-sm font-medium text-center text-foreground">
                Share your meme
              </p>
              <div className="grid grid-cols-4 gap-3">
                {socialPlatforms?.map((platform) => (
                  <button
                    key={platform?.name}
                    onClick={() => handleShare(platform?.name)}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl bg-muted hover:bg-muted/80 transition-colors duration-250"
                    aria-label={`Share on ${platform?.name}`}
                  >
                    <Icon name={platform?.icon} size={24} color={platform?.color} />
                    <span className="text-xs text-muted-foreground">
                      {platform?.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              size="default"
              fullWidth
              iconName="Plus"
              iconPosition="left"
              onClick={onClose}
            >
              Create Another
            </Button>
            <Button
              variant="ghost"
              size="default"
              fullWidth
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;