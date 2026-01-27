import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SpeedControl = ({ speed, onSpeedChange }) => {
  const presetSpeeds = [
    { value: 0.25, label: '0.25x', icon: 'Rewind' },
    { value: 0.5, label: '0.5x', icon: 'Rewind' },
    { value: 1, label: '1x', icon: 'Play' },
    { value: 1.5, label: '1.5x', icon: 'FastForward' },
    { value: 2, label: '2x', icon: 'FastForward' }
  ];

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 border border-border">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="Gauge" size={20} color="var(--color-primary)" />
        <h3 className="text-base md:text-lg font-semibold text-foreground">Playback Speed</h3>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
          {presetSpeeds?.map((preset) => (
            <Button
              key={preset?.value}
              variant={speed === preset?.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => onSpeedChange(preset?.value)}
              iconName={preset?.icon}
              iconPosition="left"
              iconSize={14}
              className="w-full"
            >
              {preset?.label}
            </Button>
          ))}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm text-muted-foreground">Custom Speed</label>
            <span className="text-sm font-semibold text-foreground">{speed?.toFixed(2)}x</span>
          </div>
          <input
            type="range"
            min="0.25"
            max="2"
            step="0.25"
            value={speed}
            onChange={(e) => onSpeedChange(parseFloat(e?.target?.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            aria-label="Custom speed control"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Slow</span>
            <span>Normal</span>
            <span>Fast</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeedControl;