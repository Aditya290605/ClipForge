import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const TextOverlay = ({ texts, onAddText, onUpdateText, onRemoveText }) => {
  const [newText, setNewText] = useState('');
  const [selectedFont, setSelectedFont] = useState('Arial');
  const [selectedSize, setSelectedSize] = useState('32');
  const [selectedColor, setSelectedColor] = useState('#FFFFFF');
  const [selectedPosition, setSelectedPosition] = useState('bottom');

  const fontOptions = [
    { value: 'Arial', label: 'Arial' },
    { value: 'Impact', label: 'Impact' },
    { value: 'Comic Sans MS', label: 'Comic Sans' },
    { value: 'Times New Roman', label: 'Times New Roman' },
    { value: 'Courier New', label: 'Courier' }
  ];

  const sizeOptions = [
    { value: '16', label: 'Small (16px)' },
    { value: '24', label: 'Medium (24px)' },
    { value: '32', label: 'Large (32px)' },
    { value: '48', label: 'Extra Large (48px)' },
    { value: '64', label: 'Huge (64px)' }
  ];

  const positionOptions = [
    { value: 'top', label: 'Top' },
    { value: 'center', label: 'Center' },
    { value: 'bottom', label: 'Bottom' }
  ];

  const handleAddText = () => {
    if (newText?.trim()) {
      onAddText({
        id: Date.now(),
        text: newText,
        font: selectedFont,
        size: parseInt(selectedSize),
        color: selectedColor,
        position: selectedPosition
      });
      setNewText('');
    }
  };

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 border border-border">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="Type" size={20} color="var(--color-primary)" />
        <h3 className="text-base md:text-lg font-semibold text-foreground">Text Overlay</h3>
      </div>
      <div className="space-y-4">
        <Input
          label="Text Content"
          type="text"
          placeholder="Enter your meme text..."
          value={newText}
          onChange={(e) => setNewText(e?.target?.value)}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Select
            label="Font"
            options={fontOptions}
            value={selectedFont}
            onChange={setSelectedFont}
          />

          <Select
            label="Size"
            options={sizeOptions}
            value={selectedSize}
            onChange={setSelectedSize}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e?.target?.value)}
                className="w-12 h-10 rounded-lg border border-border cursor-pointer"
                aria-label="Text color picker"
              />
              <Input
                type="text"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e?.target?.value)}
                className="flex-1"
              />
            </div>
          </div>

          <Select
            label="Position"
            options={positionOptions}
            value={selectedPosition}
            onChange={setSelectedPosition}
          />
        </div>

        <Button
          variant="default"
          onClick={handleAddText}
          iconName="Plus"
          iconPosition="left"
          fullWidth
        >
          Add Text
        </Button>

        {texts?.length > 0 && (
          <div className="space-y-2 pt-4 border-t border-border">
            <h4 className="text-sm font-medium text-foreground mb-2">Active Text Overlays</h4>
            {texts?.map((text) => (
              <div key={text?.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{text?.text}</p>
                  <p className="text-xs text-muted-foreground">
                    {text?.font} • {text?.size}px • {text?.position}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveText(text?.id)}
                  iconName="Trash2"
                  iconSize={16}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TextOverlay;