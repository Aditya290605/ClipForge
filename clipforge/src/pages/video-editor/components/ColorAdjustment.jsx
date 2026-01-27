import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ColorAdjustment = ({ brightness, contrast, saturation, onBrightnessChange, onContrastChange, onSaturationChange, onResetFilters }) => {
  const filters = [
    { name: 'brightness', label: 'Brightness', value: brightness, onChange: onBrightnessChange, min: 0, max: 200, default: 100, icon: 'Sun' },
    { name: 'contrast', label: 'Contrast', value: contrast, onChange: onContrastChange, min: 0, max: 200, default: 100, icon: 'Circle' },
    { name: 'saturation', label: 'Saturation', value: saturation, onChange: onSaturationChange, min: 0, max: 200, default: 100, icon: 'Droplet' }
  ];

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon name="Palette" size={20} color="var(--color-primary)" />
          <h3 className="text-base md:text-lg font-semibold text-foreground">Color Adjustment</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onResetFilters}
          iconName="RotateCcw"
          iconPosition="left"
          iconSize={14}
        >
          Reset
        </Button>
      </div>
      <div className="space-y-6">
        {filters?.map((filter) => (
          <div key={filter?.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Icon name={filter?.icon} size={16} color="var(--color-muted-foreground)" />
                {filter?.label}
              </label>
              <span className="text-sm font-semibold text-foreground">{filter?.value}%</span>
            </div>
            <input
              type="range"
              min={filter?.min}
              max={filter?.max}
              value={filter?.value}
              onChange={(e) => filter?.onChange(parseInt(e?.target?.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              aria-label={`${filter?.label} control`}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{filter?.min}%</span>
              <span>{filter?.default}%</span>
              <span>{filter?.max}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorAdjustment;