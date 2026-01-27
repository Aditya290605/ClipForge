import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'created':
        return 'Plus';
      case 'downloaded':
        return 'Download';
      case 'edited':
        return 'Edit';
      case 'deleted':
        return 'Trash2';
      case 'completed':
        return 'CheckCircle2';
      case 'failed':
        return 'XCircle';
      default:
        return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'created':
        return 'text-primary bg-primary/10';
      case 'downloaded':
        return 'text-success bg-success/10';
      case 'edited':
        return 'text-secondary bg-secondary/10';
      case 'deleted':
        return 'text-error bg-error/10';
      case 'completed':
        return 'text-success bg-success/10';
      case 'failed':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const formatTime = (date) => {
    const now = new Date();
    const activityDate = new Date(date);
    const diffMs = now - activityDate;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return activityDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-card rounded-xl border border-border p-4 md:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground">
          Recent Activity
        </h2>
        <Icon name="Clock" size={24} className="text-primary" />
      </div>
      <div className="space-y-3 md:space-y-4">
        {activities?.length === 0 ? (
          <div className="text-center py-8 md:py-12">
            <Icon name="Inbox" size={48} className="text-muted-foreground mx-auto mb-3 md:mb-4" />
            <p className="text-sm md:text-base text-muted-foreground">
              No recent activity to display
            </p>
          </div>
        ) : (
          activities?.map((activity) => (
            <div
              key={activity?.id}
              className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors duration-250"
            >
              <div className={`${getActivityColor(activity?.type)} w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center flex-shrink-0`}>
                <Icon name={getActivityIcon(activity?.type)} size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm md:text-base text-foreground font-medium mb-1 line-clamp-2">
                  {activity?.message}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {formatTime(activity?.timestamp)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;