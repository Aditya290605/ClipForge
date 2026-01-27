import React from 'react';
import Icon from '../../../components/AppIcon';

const PropertiesPanel = ({ duration, startTime, endTime, speed, texts, brightness, contrast, saturation }) => {
  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const properties = [
    {
      category: 'Timeline',
      icon: 'Clock',
      items: [
        { label: 'Original Duration', value: formatTime(duration) },
        { label: 'Crop Start', value: formatTime(startTime) },
        { label: 'Crop End', value: formatTime(endTime) },
        { label: 'Final Duration', value: formatTime(endTime - startTime) }
      ]
    },
    {
      category: 'Playback',
      icon: 'Gauge',
      items: [
        { label: 'Speed', value: `${speed?.toFixed(2)}x` },
        { label: 'Adjusted Duration', value: formatTime((endTime - startTime) / speed) }
      ]
    },
    {
      category: 'Text Overlays',
      icon: 'Type',
      items: [
        { label: 'Active Texts', value: texts?.length?.toString() }
      ]
    },
    {
      category: 'Color Filters',
      icon: 'Palette',
      items: [
        { label: 'Brightness', value: `${brightness}%` },
        { label: 'Contrast', value: `${contrast}%` },
        { label: 'Saturation', value: `${saturation}%` }
      ]
    }
  ];

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 border border-border">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="Settings" size={20} color="var(--color-primary)" />
        <h3 className="text-base md:text-lg font-semibold text-foreground">Properties</h3>
      </div>
      <div className="space-y-4">
        {properties?.map((section) => (
          <div key={section?.category} className="space-y-2">
            <div className="flex items-center gap-2 pb-2 border-b border-border">
              <Icon name={section?.icon} size={16} color="var(--color-muted-foreground)" />
              <h4 className="text-sm font-semibold text-foreground">{section?.category}</h4>
            </div>
            <div className="space-y-2">
              {section?.items?.map((item) => (
                <div key={item?.label} className="flex items-center justify-between py-1">
                  <span className="text-xs md:text-sm text-muted-foreground">{item?.label}</span>
                  <span className="text-xs md:text-sm font-medium text-foreground">{item?.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertiesPanel;