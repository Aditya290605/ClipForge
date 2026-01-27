import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkActionsBar = ({ selectedCount, onBulkDownload, onBulkDelete, onClearSelection }) => {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-2xl">
      <div className="bg-card border border-border rounded-xl shadow-xl p-4 md:p-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon name="CheckSquare" size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-sm md:text-base font-semibold text-foreground">
                {selectedCount} {selectedCount === 1 ? 'meme' : 'memes'} selected
              </p>
              <p className="text-xs md:text-sm text-muted-foreground">
                Choose an action to perform
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconPosition="left"
              onClick={onBulkDownload}
              className="hidden md:flex"
            >
              Download
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              onClick={onBulkDownload}
              className="md:hidden"
              aria-label="Bulk download"
            />

            <Button
              variant="outline"
              size="sm"
              iconName="Trash2"
              iconPosition="left"
              onClick={onBulkDelete}
              className="hidden md:flex text-error hover:text-error"
            >
              Delete
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Trash2"
              onClick={onBulkDelete}
              className="md:hidden text-error hover:text-error"
              aria-label="Bulk delete"
            />

            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={onClearSelection}
              aria-label="Clear selection"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsBar;