import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AccountInfo = ({ plan, onUpgrade }) => {
  const planFeatures = {
    free: [
      { text: "5 memes per month", available: true },
      { text: "720p max quality", available: true },
      { text: "Basic editing tools", available: true },
      { text: "1GB storage", available: true },
      { text: "Watermark on exports", available: true },
      { text: "HD quality exports", available: false },
      { text: "Advanced editing", available: false },
      { text: "Priority processing", available: false }
    ],
    premium: [
      { text: "Unlimited memes", available: true },
      { text: "1080p max quality", available: true },
      { text: "Advanced editing tools", available: true },
      { text: "10GB storage", available: true },
      { text: "No watermarks", available: true },
      { text: "Priority processing", available: true },
      { text: "Batch downloads", available: true },
      { text: "Custom branding", available: true }
    ]
  };

  const currentFeatures = planFeatures?.[plan?.type] || planFeatures?.free;

  return (
    <div className="bg-card rounded-xl border border-border p-4 md:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground">
          Account Plan
        </h2>
        <div className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg font-semibold text-sm md:text-base ${
          plan?.type === 'premium' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground'
        }`}>
          {plan?.type === 'premium' ? 'Premium' : 'Free Plan'}
        </div>
      </div>
      {plan?.type === 'free' && (
        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-4 md:p-6 mb-4 md:mb-6 border border-primary/20">
          <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Icon name="Zap" size={20} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base md:text-lg font-semibold text-foreground mb-1 md:mb-2">
                Upgrade to Premium
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
                Unlock unlimited memes, HD quality, advanced editing tools, and remove watermarks
              </p>
              <Button
                variant="default"
                size="sm"
                iconName="ArrowRight"
                iconPosition="right"
                onClick={onUpgrade}
                className="w-full md:w-auto"
              >
                Upgrade Now - $9.99/month
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="space-y-2 md:space-y-3">
        <h3 className="text-sm md:text-base font-semibold text-foreground mb-3 md:mb-4">
          Plan Features
        </h3>
        {currentFeatures?.map((feature, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-2 md:p-3 rounded-lg hover:bg-muted/30 transition-colors duration-250"
          >
            <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
              feature?.available 
                ? 'bg-success/20 text-success' :'bg-muted text-muted-foreground'
            }`}>
              <Icon name={feature?.available ? 'Check' : 'X'} size={14} />
            </div>
            <span className={`text-xs md:text-sm ${
              feature?.available 
                ? 'text-foreground' 
                : 'text-muted-foreground line-through'
            }`}>
              {feature?.text}
            </span>
          </div>
        ))}
      </div>
      {plan?.type === 'free' && (
        <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-border">
          <div className="flex items-center justify-between text-xs md:text-sm">
            <span className="text-muted-foreground">Monthly usage</span>
            <span className="font-semibold text-foreground">
              {plan?.memesUsed} / {plan?.memesLimit} memes
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 mt-2 md:mt-3 overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${(plan?.memesUsed / plan?.memesLimit) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountInfo;