import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const TimelineEditor = ({ duration, startTime, endTime, onStartTimeChange, onEndTimeChange, currentTime }) => {
  const timelineRef = useRef(null);
  const [isDraggingStart, setIsDraggingStart] = useState(false);
  const [isDraggingEnd, setIsDraggingEnd] = useState(false);

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const getPositionFromTime = (time) => {
    return (time / duration) * 100;
  };

  const getTimeFromPosition = (clientX) => {
    if (!timelineRef?.current) return 0;
    const rect = timelineRef?.current?.getBoundingClientRect();
    const position = (clientX - rect?.left) / rect?.width;
    return Math.max(0, Math.min(duration, position * duration));
  };

  const handleMouseDown = (type) => (e) => {
    e?.preventDefault();
    if (type === 'start') {
      setIsDraggingStart(true);
    } else {
      setIsDraggingEnd(true);
    }
  };

  const handleMouseMove = (e) => {
    if (isDraggingStart) {
      const newTime = getTimeFromPosition(e?.clientX);
      if (newTime < endTime - 1) {
        onStartTimeChange(newTime);
      }
    } else if (isDraggingEnd) {
      const newTime = getTimeFromPosition(e?.clientX);
      if (newTime > startTime + 1) {
        onEndTimeChange(newTime);
      }
    }
  };

  const handleMouseUp = () => {
    setIsDraggingStart(false);
    setIsDraggingEnd(false);
  };

  useEffect(() => {
    if (isDraggingStart || isDraggingEnd) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDraggingStart, isDraggingEnd, startTime, endTime]);

  const handleTouchStart = (type) => (e) => {
    if (type === 'start') {
      setIsDraggingStart(true);
    } else {
      setIsDraggingEnd(true);
    }
  };

  const handleTouchMove = (e) => {
    const touch = e?.touches?.[0];
    if (isDraggingStart) {
      const newTime = getTimeFromPosition(touch?.clientX);
      if (newTime < endTime - 1) {
        onStartTimeChange(newTime);
      }
    } else if (isDraggingEnd) {
      const newTime = getTimeFromPosition(touch?.clientX);
      if (newTime > startTime + 1) {
        onEndTimeChange(newTime);
      }
    }
  };

  const handleTouchEnd = () => {
    setIsDraggingStart(false);
    setIsDraggingEnd(false);
  };

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base md:text-lg font-semibold text-foreground flex items-center gap-2">
          <Icon name="Scissors" size={20} color="var(--color-primary)" />
          Crop Timeline
        </h3>
        <div className="text-xs md:text-sm text-muted-foreground">
          Duration: {formatTime(endTime - startTime)}
        </div>
      </div>
      <div className="space-y-4">
        <div 
          ref={timelineRef}
          className="relative h-16 md:h-20 bg-muted rounded-lg overflow-hidden cursor-pointer"
        >
          <div className="absolute inset-0 flex">
            {Array.from({ length: 20 })?.map((_, i) => (
              <div key={i} className="flex-1 border-r border-border/30" />
            ))}
          </div>

          <div
            className="absolute top-0 bottom-0 bg-primary/20 border-l-2 border-r-2 border-primary"
            style={{
              left: `${getPositionFromTime(startTime)}%`,
              right: `${100 - getPositionFromTime(endTime)}%`
            }}
          />

          <div
            className="absolute top-0 bottom-0 w-1 bg-accent cursor-pointer z-10"
            style={{ left: `${getPositionFromTime(currentTime)}%` }}
          />

          <div
            className="absolute top-0 bottom-0 w-3 md:w-4 bg-primary rounded-l-lg cursor-ew-resize z-20 flex items-center justify-center hover:bg-primary/80 transition-colors touch-none"
            style={{ left: `${getPositionFromTime(startTime)}%`, transform: 'translateX(-50%)' }}
            onMouseDown={handleMouseDown('start')}
            onTouchStart={handleTouchStart('start')}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <Icon name="GripVertical" size={12} color="#FFFFFF" />
          </div>

          <div
            className="absolute top-0 bottom-0 w-3 md:w-4 bg-primary rounded-r-lg cursor-ew-resize z-20 flex items-center justify-center hover:bg-primary/80 transition-colors touch-none"
            style={{ left: `${getPositionFromTime(endTime)}%`, transform: 'translateX(-50%)' }}
            onMouseDown={handleMouseDown('end')}
            onTouchStart={handleTouchStart('end')}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <Icon name="GripVertical" size={12} color="#FFFFFF" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 md:gap-4">
          <div className="bg-muted rounded-lg p-3">
            <div className="text-xs text-muted-foreground mb-1">Start Time</div>
            <div className="text-sm md:text-base font-semibold text-foreground">{formatTime(startTime)}</div>
          </div>
          <div className="bg-muted rounded-lg p-3">
            <div className="text-xs text-muted-foreground mb-1">End Time</div>
            <div className="text-sm md:text-base font-semibold text-foreground">{formatTime(endTime)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineEditor;