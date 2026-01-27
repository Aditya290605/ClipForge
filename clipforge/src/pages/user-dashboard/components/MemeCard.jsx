import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MemeCard = ({ meme, onRedownload, onEdit, onDelete, isSelected, onSelect }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success bg-success/10';
      case 'processing':
        return 'text-warning bg-warning/10';
      case 'failed':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'CheckCircle2';
      case 'processing':
        return 'Loader2';
      case 'failed':
        return 'XCircle';
      default:
        return 'Clock';
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return d?.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden transition-all duration-250 hover:shadow-lg group">
      <div className="relative aspect-video bg-muted overflow-hidden">
        <Image
          src={meme?.thumbnail}
          alt={meme?.thumbnailAlt}
          className="w-full h-full object-cover transition-transform duration-250 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <div className={`${getStatusColor(meme?.status)} px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs md:text-sm font-medium`}>
            <Icon name={getStatusIcon(meme?.status)} size={14} />
            <span className="capitalize">{meme?.status}</span>
          </div>
          <button
            onClick={() => onSelect(meme?.id)}
            className={`w-6 h-6 md:w-7 md:h-7 rounded-md border-2 flex items-center justify-center transition-all duration-250 ${
              isSelected
                ? 'bg-primary border-primary' :'bg-background/80 border-border hover:border-primary'
            }`}
            aria-label={isSelected ? 'Deselect meme' : 'Select meme'}
          >
            {isSelected && <Icon name="Check" size={14} color="#FFFFFF" />}
          </button>
        </div>
        {meme?.duration && (
          <div className="absolute bottom-3 right-3 bg-background/90 px-2 py-1 rounded-md text-xs font-medium text-foreground">
            {meme?.duration}
          </div>
        )}
      </div>
      <div className="p-4 md:p-5">
        <h3 className="text-base md:text-lg font-semibold text-foreground mb-2 line-clamp-2">
          {meme?.title}
        </h3>
        
        <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
          <Icon name="Calendar" size={14} />
          <span>{formatDate(meme?.createdAt)}</span>
          <span className="mx-1">•</span>
          <Icon name="Youtube" size={14} />
          <span className="truncate">{meme?.source}</span>
        </div>

        {meme?.modifications && meme?.modifications?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4">
            {meme?.modifications?.map((mod, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
              >
                {mod}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 pt-3 md:pt-4 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            onClick={() => onRedownload(meme?.id)}
            disabled={meme?.status !== 'completed'}
            className="flex-1"
          >
            Download
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="Edit"
            onClick={() => onEdit(meme?.id)}
            disabled={meme?.status !== 'completed'}
            aria-label="Edit meme"
          />
          <Button
            variant="ghost"
            size="sm"
            iconName="Trash2"
            onClick={() => onDelete(meme?.id)}
            className="text-error hover:text-error"
            aria-label="Delete meme"
          />
        </div>
      </div>
    </div>
  );
};

export default MemeCard;