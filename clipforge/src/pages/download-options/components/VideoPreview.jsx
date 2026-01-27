import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';


const VideoPreview = ({ videoData }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef?.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video?.currentTime);
    const handleLoadedMetadata = () => setDuration(video?.duration);
    const handleEnded = () => setIsPlaying(false);

    video?.addEventListener('timeupdate', handleTimeUpdate);
    video?.addEventListener('loadedmetadata', handleLoadedMetadata);
    video?.addEventListener('ended', handleEnded);

    return () => {
      video?.removeEventListener('timeupdate', handleTimeUpdate);
      video?.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video?.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef?.current;
    if (!video) return;

    if (isPlaying) {
      video?.pause();
    } else {
      video?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const video = videoRef?.current;
    if (!video) return;

    const rect = e?.currentTarget?.getBoundingClientRect();
    const pos = (e?.clientX - rect?.left) / rect?.width;
    video.currentTime = pos * duration;
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e?.target?.value);
    setVolume(newVolume);
    if (videoRef?.current) {
      videoRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const video = videoRef?.current;
    if (!video) return;

    if (isMuted) {
      video.volume = volume;
      setIsMuted(false);
    } else {
      video.volume = 0;
      setIsMuted(true);
    }
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-lg border border-border">
      <div className="relative aspect-video bg-muted">
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          src={videoData?.videoUrl}
          poster={videoData?.thumbnail}
        />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={togglePlay}
            className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-primary/90 hover:bg-primary flex items-center justify-center transition-all duration-250 shadow-primary-lg"
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            <Icon 
              name={isPlaying ? 'Pause' : 'Play'} 
              size={32} 
              color="#FFFFFF" 
            />
          </button>
        </div>

        {videoData?.textOverlay && (
          <div 
            className="absolute text-white font-bold text-shadow px-4 py-2 text-center"
            style={{
              top: `${videoData?.textOverlay?.position?.y}%`,
              left: `${videoData?.textOverlay?.position?.x}%`,
              transform: 'translate(-50%, -50%)',
              fontSize: `${videoData?.textOverlay?.fontSize}px`,
              color: videoData?.textOverlay?.color
            }}
          >
            {videoData?.textOverlay?.text}
          </div>
        )}
      </div>
      <div className="p-4 md:p-5 lg:p-6 space-y-4">
        <div className="space-y-2">
          <div 
            className="h-2 bg-muted rounded-full cursor-pointer group"
            onClick={handleSeek}
          >
            <div 
              className="h-full bg-primary rounded-full transition-all duration-150 group-hover:bg-primary/80"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs md:text-sm text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={togglePlay}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center transition-colors duration-250"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              <Icon 
                name={isPlaying ? 'Pause' : 'Play'} 
                size={20} 
                color="#FFFFFF" 
              />
            </button>

            <div className="relative">
              <button
                onClick={toggleMute}
                onMouseEnter={() => setShowVolumeSlider(true)}
                onMouseLeave={() => setShowVolumeSlider(false)}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors duration-250"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                <Icon 
                  name={isMuted ? 'VolumeX' : volume > 0.5 ? 'Volume2' : 'Volume1'} 
                  size={20} 
                />
              </button>

              {showVolumeSlider && (
                <div 
                  className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-popover border border-border rounded-lg p-3 shadow-lg"
                  onMouseEnter={() => setShowVolumeSlider(true)}
                  onMouseLeave={() => setShowVolumeSlider(false)}
                >
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-24 accent-primary"
                    aria-label="Volume control"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
            <Icon name="Zap" size={16} />
            <span>{videoData?.speed}x Speed</span>
          </div>
        </div>

        <div className="pt-4 border-t border-border space-y-2">
          <h3 className="text-sm md:text-base font-semibold text-foreground">
            Video Details
          </h3>
          <div className="grid grid-cols-2 gap-3 text-xs md:text-sm">
            <div className="space-y-1">
              <p className="text-muted-foreground">Duration</p>
              <p className="font-medium text-foreground">{videoData?.duration}</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Resolution</p>
              <p className="font-medium text-foreground">{videoData?.resolution}</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Crop</p>
              <p className="font-medium text-foreground">{videoData?.cropDimensions}</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Filters</p>
              <p className="font-medium text-foreground">{videoData?.appliedFilters}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPreview;