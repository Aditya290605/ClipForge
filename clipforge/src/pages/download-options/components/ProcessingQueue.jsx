import React from 'react';
import Icon from '../../../components/AppIcon';

const ProcessingQueue = ({ queue }) => {
  if (!queue || queue?.length === 0) return null;

  const getStatusIcon = (status) => {
    switch (status) {
      case 'processing':
        return 'Loader2';
      case 'completed':
        return 'CheckCircle2';
      case 'failed':
        return 'XCircle';
      default:
        return 'Clock';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'processing':
        return 'var(--color-primary)';
      case 'completed':
        return 'var(--color-success)';
      case 'failed':
        return 'var(--color-error)';
      default:
        return 'var(--color-muted-foreground)';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base md:text-lg font-semibold text-foreground">
          Processing Queue
        </h3>
        <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
          {queue?.filter(item => item?.status === 'processing')?.length} Active
        </span>
      </div>
      <div className="space-y-3">
        {queue?.map((item) => (
          <div
            key={item?.id}
            className="p-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors duration-250"
          >
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                item?.status === 'processing' ? 'bg-primary/10' :
                item?.status === 'completed' ? 'bg-success/10' :
                item?.status === 'failed'? 'bg-error/10' : 'bg-muted'
              }`}>
                <Icon 
                  name={getStatusIcon(item?.status)} 
                  size={20} 
                  color={getStatusColor(item?.status)}
                  className={item?.status === 'processing' ? 'animate-spin' : ''}
                />
              </div>

              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1 flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {item?.filename}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item?.quality} • {item?.format?.toUpperCase()} • {item?.fileSize}
                    </p>
                  </div>
                  {item?.status === 'completed' && (
                    <button className="flex-shrink-0 px-3 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-250">
                      Download
                    </button>
                  )}
                </div>

                {item?.status === 'processing' && (
                  <div className="space-y-1">
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-300 rounded-full"
                        style={{ width: `${item?.progress}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{item?.progress}% complete</span>
                      <span>{item?.timeRemaining}</span>
                    </div>
                  </div>
                )}

                {item?.status === 'failed' && (
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-error">
                      Processing failed
                    </p>
                    <button className="text-xs font-medium text-primary hover:underline">
                      Retry
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcessingQueue;