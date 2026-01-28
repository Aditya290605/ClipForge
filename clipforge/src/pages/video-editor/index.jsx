import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PrimaryNavigation from '../../components/navigation/PrimaryNavigation';
import WorkflowProgress from '../../components/navigation/WorkflowProgress';
import VideoPlayer from './components/VideoPlayer';
import TimelineEditor from './components/TimelineEditor';
import SpeedControl from './components/SpeedControl';
import TextOverlay from './components/TextOverlay';
import ColorAdjustment from './components/ColorAdjustment';
import PropertiesPanel from './components/PropertiesPanel';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const VideoEditor = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const mockVideoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  const videoUrl = location?.state?.videoUrl || mockVideoUrl;

  const [currentUser] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com"
  });

  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [texts, setTexts] = useState([]);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [activeTab, setActiveTab] = useState('crop');

  useEffect(() => {
    if (duration > 0 && endTime === 0) {
      setEndTime(duration);
    }
  }, [duration]);

  const handleDurationChange = (newDuration) => {
    setDuration(newDuration);
    setEndTime(newDuration);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleAddText = (textData) => {
    setTexts([...texts, textData]);
  };

  const handleUpdateText = (id, updates) => {
    setTexts(texts?.map(text => text?.id === id ? { ...text, ...updates } : text));
  };

  const handleRemoveText = (id) => {
    setTexts(texts?.filter(text => text?.id !== id));
  };

  const handleResetFilters = () => {
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
  };

  const handlePreviewChanges = () => {
    setIsPlaying(true);
    setCurrentTime(startTime);
  };

  const handlePrepareDownload = () => {
    navigate('/download-options', {
      state: {
        videoUrl: videoUrl, // Use the variable from scope
        videoData: location?.state?.videoData, // Pass original metadata
        startTime,
        endTime,
        speed,
        texts,
        brightness,
        contrast,
        saturation
      }
    });
  };

  const handleLogout = () => {
    navigate('/landing-page');
  };

  const tabs = [
    { id: 'crop', label: 'Crop', icon: 'Scissors' },
    { id: 'speed', label: 'Speed', icon: 'Gauge' },
    { id: 'text', label: 'Text', icon: 'Type' },
    { id: 'color', label: 'Color', icon: 'Palette' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <PrimaryNavigation user={currentUser} onLogout={handleLogout} />
      <WorkflowProgress />
      <div className="pt-32 md:pt-36 pb-8 px-4 md:px-6 lg:px-8">
        <div className="max-w-screen-2xl mx-auto">
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
              Video Editor
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Customize your meme with powerful editing tools
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="lg:col-span-2 space-y-4 md:space-y-6">
              <VideoPlayer
                videoUrl={videoUrl}
                currentTime={currentTime}
                onTimeUpdate={setCurrentTime}
                onDurationChange={handleDurationChange}
                isPlaying={isPlaying}
                onPlayPause={handlePlayPause}
              />

              <div className="lg:hidden">
                <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeTab === tab?.id
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                    >
                      <Icon name={tab?.icon} size={16} />
                      {tab?.label}
                    </button>
                  ))}
                </div>

                {activeTab === 'crop' && (
                  <TimelineEditor
                    duration={duration}
                    startTime={startTime}
                    endTime={endTime}
                    onStartTimeChange={setStartTime}
                    onEndTimeChange={setEndTime}
                    currentTime={currentTime}
                  />
                )}

                {activeTab === 'speed' && (
                  <SpeedControl speed={speed} onSpeedChange={setSpeed} />
                )}

                {activeTab === 'text' && (
                  <TextOverlay
                    texts={texts}
                    onAddText={handleAddText}
                    onUpdateText={handleUpdateText}
                    onRemoveText={handleRemoveText}
                  />
                )}

                {activeTab === 'color' && (
                  <ColorAdjustment
                    brightness={brightness}
                    contrast={contrast}
                    saturation={saturation}
                    onBrightnessChange={setBrightness}
                    onContrastChange={setContrast}
                    onSaturationChange={setSaturation}
                    onResetFilters={handleResetFilters}
                  />
                )}
              </div>

              <div className="hidden lg:block">
                <TimelineEditor
                  duration={duration}
                  startTime={startTime}
                  endTime={endTime}
                  onStartTimeChange={setStartTime}
                  onEndTimeChange={setEndTime}
                  currentTime={currentTime}
                />
              </div>
            </div>

            <div className="space-y-4 md:space-y-6">
              <div className="bg-card rounded-xl p-4 md:p-6 border border-border space-y-3">
                <Button
                  variant="outline"
                  onClick={handlePreviewChanges}
                  iconName="Play"
                  iconPosition="left"
                  fullWidth
                >
                  Preview Changes
                </Button>
                <Button
                  variant="default"
                  onClick={handlePrepareDownload}
                  iconName="Download"
                  iconPosition="left"
                  fullWidth
                >
                  Prepare Download
                </Button>
              </div>

              <div className="hidden lg:block space-y-4">
                <SpeedControl speed={speed} onSpeedChange={setSpeed} />

                <TextOverlay
                  texts={texts}
                  onAddText={handleAddText}
                  onUpdateText={handleUpdateText}
                  onRemoveText={handleRemoveText}
                />

                <ColorAdjustment
                  brightness={brightness}
                  contrast={contrast}
                  saturation={saturation}
                  onBrightnessChange={setBrightness}
                  onContrastChange={setContrast}
                  onSaturationChange={setSaturation}
                  onResetFilters={handleResetFilters}
                />

                <PropertiesPanel
                  duration={duration}
                  startTime={startTime}
                  endTime={endTime}
                  speed={speed}
                  texts={texts}
                  brightness={brightness}
                  contrast={contrast}
                  saturation={saturation}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoEditor;