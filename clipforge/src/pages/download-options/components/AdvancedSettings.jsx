import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const AdvancedSettings = ({ settings, onSettingsChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFrameRateChange = (e) => {
    onSettingsChange({
      ...settings,
      frameRate: parseInt(e?.target?.value)
    });
  };

  const handleCompressionChange = (e) => {
    onSettingsChange({
      ...settings,
      compression: parseInt(e?.target?.value)
    });
  };

  const handleBitrateChange = (e) => {
    onSettingsChange({
      ...settings,
      bitrate: e?.target?.value
    });
  };

  const getCompressionLabel = (value) => {
    if (value <= 30) return 'Low (Best Quality)';
    if (value <= 60) return 'Medium (Balanced)';
    return 'High (Smaller File)';
  };

  return (
    <div className="space-y-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors duration-250"
      >
        <div className="flex items-center gap-3">
          <Icon name="Settings2" size={20} color="var(--color-primary)" />
          <span className="text-sm md:text-base font-semibold text-foreground">
            Advanced Settings
          </span>
        </div>
        <Icon 
          name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
          size={20} 
        />
      </button>
      {isExpanded && (
        <div className="space-y-6 p-4 md:p-5 lg:p-6 rounded-xl border border-border bg-card">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm md:text-base font-medium text-foreground">
                Frame Rate
              </label>
              <span className="text-sm font-semibold text-primary">
                {settings?.frameRate} FPS
              </span>
            </div>
            <input
              type="range"
              min="24"
              max="60"
              step="6"
              value={settings?.frameRate}
              onChange={handleFrameRateChange}
              className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>24 FPS</span>
              <span>30 FPS</span>
              <span>60 FPS</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Higher frame rates create smoother motion but increase file size
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm md:text-base font-medium text-foreground">
                Compression Level
              </label>
              <span className="text-sm font-semibold text-primary">
                {getCompressionLabel(settings?.compression)}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={settings?.compression}
              onChange={handleCompressionChange}
              className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Higher compression reduces file size but may affect quality
            </p>
          </div>

          <div className="space-y-3">
            <label className="text-sm md:text-base font-medium text-foreground">
              Bitrate Control
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleBitrateChange('auto')}
                className={`p-3 rounded-lg border-2 text-sm font-medium transition-all duration-250 ${
                  settings?.bitrate === 'auto' ?'border-primary bg-primary/5 text-primary' :'border-border bg-card text-foreground hover:border-primary/50'
                }`}
              >
                Auto
              </button>
              <button
                onClick={() => handleBitrateChange('custom')}
                className={`p-3 rounded-lg border-2 text-sm font-medium transition-all duration-250 ${
                  settings?.bitrate === 'custom' ?'border-primary bg-primary/5 text-primary' :'border-border bg-card text-foreground hover:border-primary/50'
                }`}
              >
                Custom
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              Auto bitrate optimizes quality based on selected settings
            </p>
          </div>

          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <input
              type="checkbox"
              id="preserveAudio"
              checked={settings?.preserveAudio}
              onChange={(e) => onSettingsChange({
                ...settings,
                preserveAudio: e?.target?.checked
              })}
              className="w-5 h-5 accent-primary cursor-pointer"
            />
            <label htmlFor="preserveAudio" className="text-sm text-foreground cursor-pointer">
              Preserve original audio quality
            </label>
          </div>

          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <input
              type="checkbox"
              id="fastStart"
              checked={settings?.fastStart}
              onChange={(e) => onSettingsChange({
                ...settings,
                fastStart: e?.target?.checked
              })}
              className="w-5 h-5 accent-primary cursor-pointer"
            />
            <label htmlFor="fastStart" className="text-sm text-foreground cursor-pointer">
              Enable fast start (optimized for streaming)
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedSettings;