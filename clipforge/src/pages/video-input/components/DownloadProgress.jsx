import React from 'react';
import Icon from '../../../components/AppIcon';

const DownloadProgress = ({ progress, status, estimatedTime }) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'downloading':
        return 'Download';
      case 'processing':
        return 'Loader';
      case 'complete':
        return 'CheckCircle';
      case 'error':
        return 'AlertCircle';
      default:
        return 'Download';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'downloading':
      case 'processing':
        return 'var(--color-primary)';
      case 'complete':
        return 'var(--color-success)';
      case 'error':
        return 'var(--color-error)';
      default:
        return 'var(--color-muted-foreground)';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'downloading':
        return 'Downloading video...';
      case 'processing':
        return 'Processing video...';
      case 'complete':
        return 'Download complete!';
      case 'error':
        return 'Download failed';
      default:
        return 'Preparing...';
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 md:px-6 lg:px-8 mt-8">
      <div className="bg-card rounded-xl shadow-lg p-6 md:p-8 border border-border">
        <div className="flex items-center gap-4 mb-6">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${getStatusColor()}20` }}
          >
            <Icon 
              name={getStatusIcon()} 
              size={24} 
              color={getStatusColor()}
              className={status === 'processing' ? 'animate-spin' : ''}
            />
          </div>
          <div className="flex-1">
            <h3 className="text-lg md:text-xl font-semibold text-foreground">
              {getStatusText()}
            </h3>
            {estimatedTime && status !== 'complete' && status !== 'error' && (
              <p className="text-sm text-muted-foreground mt-1">
                Estimated time: {estimatedTime}
              </p>
            )}
          </div>
          <div className="text-2xl md:text-3xl font-bold" style={{ color: getStatusColor() }}>
            {progress}%
          </div>
        </div>

        <div className="relative w-full h-3 bg-muted rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              backgroundColor: getStatusColor()
            }}
          />
        </div>

        {status === 'complete' && (
          <div className="mt-6 p-4 bg-success/10 rounded-lg border border-success/20">
            <div className="flex items-center gap-3">
              <Icon name="CheckCircle" size={20} color="var(--color-success)" />
              <p className="text-sm text-success-foreground">
                Your video is ready for editing! Click continue to proceed.
              </p>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="mt-6 p-4 bg-error/10 rounded-lg border border-error/20">
            <div className="flex items-center gap-3">
              <Icon name="AlertCircle" size={20} color="var(--color-error)" />
              <p className="text-sm text-error-foreground">
                Failed to download video. Please check the URL and try again.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DownloadProgress;