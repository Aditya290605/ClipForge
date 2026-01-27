import React from 'react';
import Icon from '../../../components/AppIcon';

const StatisticsPanel = ({ stats }) => {
  const statisticsData = [
    {
      id: 1,
      label: "Total Memes Created",
      value: stats?.totalMemes,
      icon: "Sparkles",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      id: 2,
      label: "Downloads Completed",
      value: stats?.totalDownloads,
      icon: "Download",
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      id: 3,
      label: "Storage Used",
      value: `${stats?.storageUsed}GB / ${stats?.storageLimit}GB`,
      icon: "HardDrive",
      color: "text-warning",
      bgColor: "bg-warning/10"
    },
    {
      id: 4,
      label: "Active Projects",
      value: stats?.activeProjects,
      icon: "FolderOpen",
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    }
  ];

  const storagePercentage = (stats?.storageUsed / stats?.storageLimit) * 100;

  return (
    <div className="bg-card rounded-xl border border-border p-4 md:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground">
          Your Statistics
        </h2>
        <Icon name="TrendingUp" size={24} className="text-primary" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        {statisticsData?.map((stat) => (
          <div
            key={stat?.id}
            className="bg-muted/50 rounded-xl p-4 md:p-5 lg:p-6 transition-all duration-250 hover:shadow-lg"
          >
            <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
              <div className={`${stat?.bgColor} ${stat?.color} w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center`}>
                <Icon name={stat?.icon} size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs md:text-sm text-muted-foreground mb-1">
                  {stat?.label}
                </p>
                <p className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground whitespace-nowrap">
                  {stat?.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-muted/30 rounded-xl p-4 md:p-5 lg:p-6">
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <span className="text-sm md:text-base text-foreground font-medium">
            Storage Usage
          </span>
          <span className="text-xs md:text-sm text-muted-foreground">
            {storagePercentage?.toFixed(1)}% used
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 md:h-3 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              storagePercentage > 80 ? 'bg-error' : storagePercentage > 60 ? 'bg-warning' : 'bg-success'
            }`}
            style={{ width: `${Math.min(storagePercentage, 100)}%` }}
          />
        </div>
        {storagePercentage > 80 && (
          <p className="text-xs md:text-sm text-error mt-2 md:mt-3">
            Storage almost full. Consider upgrading your plan.
          </p>
        )}
      </div>
    </div>
  );
};

export default StatisticsPanel;