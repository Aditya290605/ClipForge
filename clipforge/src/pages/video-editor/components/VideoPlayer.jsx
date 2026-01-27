import React, { useRef, useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const VideoPlayer = ({ videoUrl, currentTime, onTimeUpdate, onDurationChange, isPlaying, onPlayPause }) => {
  const videoRef = useRef(null);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (videoRef?.current) {
      if (isPlaying) {
        videoRef?.current?.play();
      } else {
        videoRef?.current?.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (videoRef?.current && Math.abs(videoRef?.current?.currentTime - currentTime) > 0.5) {
      videoRef.current.currentTime = currentTime;
    }
  }, [currentTime]);

  const handleTimeUpdate = () => {
    if (videoRef?.current && onTimeUpdate) {
      onTimeUpdate(videoRef?.current?.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef?.current && onDurationChange) {
      onDurationChange(videoRef?.current?.duration);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e?.target?.value);
    setVolume(newVolume);
    if (videoRef?.current) {
      videoRef.current.volume = newVolume;
    }
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (videoRef?.current) {
      const newMutedState = !isMuted;
      setIsMuted(newMutedState);
      videoRef.current.muted = newMutedState;
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef?.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  return (
    <div className="relative w-full bg-black rounded-xl overflow-hidden shadow-lg">
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full aspect-video object-contain"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        playsInline
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3 md:p-4">
        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={onPlayPause}
            className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            <Icon name={isPlaying ? 'Pause' : 'Play'} size={18} color="#FFFFFF" />
          </button>

          <div className="flex-1 flex items-center gap-2">
            <span className="text-white text-xs md:text-sm font-medium whitespace-nowrap">
              {formatTime(currentTime)}
            </span>
            <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${(currentTime / (videoRef?.current?.duration || 1)) * 100}%` }}
              />
            </div>
            <span className="text-white text-xs md:text-sm font-medium whitespace-nowrap">
              {formatTime(videoRef?.current?.duration || 0)}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              <Icon name={isMuted || volume === 0 ? 'VolumeX' : volume < 0.5 ? 'Volume1' : 'Volume2'} size={16} color="#FFFFFF" />
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-16 accent-primary"
              aria-label="Volume control"
            />
          </div>

          <button
            onClick={toggleFullscreen}
            className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            <Icon name={isFullscreen ? 'Minimize' : 'Maximize'} size={16} color="#FFFFFF" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;