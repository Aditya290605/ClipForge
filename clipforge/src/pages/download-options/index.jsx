import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PrimaryNavigation from '../../components/navigation/PrimaryNavigation';
import WorkflowProgress from '../../components/navigation/WorkflowProgress';
import VideoPreview from './components/VideoPreview';
import QualitySelector from './components/QualitySelector';
import FormatSelector from './components/FormatSelector';
import AdvancedSettings from './components/AdvancedSettings';
import DownloadButton from './components/DownloadButton';
import ProcessingQueue from './components/ProcessingQueue';
import SuccessModal from './components/SuccessModal';
import Icon from '../../components/AppIcon';

const DownloadOptions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state || {};

  const [user] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com"
  });

  const [videoData] = useState({
    videoUrl: locationState.videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnail: locationState.videoData?.thumbnail || "https://img.rocket.new/generatedImages/rocket_gen_img_19fc6e350-1765088577444.png",
    thumbnailAlt: locationState.videoData?.thumbnailAlt || "Video thumbnail",
    duration: locationState.videoData?.duration || "0:45",
    resolution: locationState.videoData?.quality || "1080p",
    speed: locationState.speed || 1,
    cropDimensions: "1080x1920", // TODO: Pass this from editor
    appliedFilters: "None",
    textOverlay: locationState.texts?.[0] || null
  });

  const [selectedQuality, setSelectedQuality] = useState('720p');
  const [selectedFormat, setSelectedFormat] = useState('mp4');
  const [advancedSettings, setAdvancedSettings] = useState({
    frameRate: 30,
    compression: 50,
    bitrate: 'auto',
    preserveAudio: true,
    fastStart: true
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState('2m 30s');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const qualities = [
    {
      value: '360p',
      label: '360p',
      description: 'Basic quality, smallest file',
      fileSize: '8 MB',
      recommended: false
    },
    {
      value: '420p',
      label: '420p',
      description: 'Good for quick sharing',
      fileSize: '12 MB',
      recommended: false
    },
    {
      value: '720p',
      label: '720p HD',
      description: 'Best balance of quality and size',
      fileSize: '25 MB',
      recommended: true
    },
    {
      value: '1080p',
      label: '1080p Full HD',
      description: 'Maximum quality, larger file',
      fileSize: '45 MB',
      recommended: false
    }];


  const formats = [
    {
      value: 'mp4',
      label: 'MP4',
      description: 'Universal compatibility',
      compatibility: ['All Platforms', 'Social Media', 'Mobile']
    },
    {
      value: 'webm',
      label: 'WebM',
      description: 'Optimized for web',
      compatibility: ['Web', 'Chrome', 'Firefox']
    },
    {
      value: 'gif',
      label: 'GIF',
      description: 'Animated image format',
      compatibility: ['All Platforms', 'No Audio']
    }];


  const [processingQueue] = useState([
    {
      id: 1,
      filename: "funny_cat_meme.mp4",
      quality: "720p",
      format: "mp4",
      fileSize: "18 MB",
      status: "completed",
      progress: 100,
      timeRemaining: "0s"
    },
    {
      id: 2,
      filename: "reaction_video.webm",
      quality: "1080p",
      format: "webm",
      fileSize: "32 MB",
      status: "processing",
      progress: 67,
      timeRemaining: "1m 15s"
    },
    {
      id: 3,
      filename: "short_clip.gif",
      quality: "420p",
      format: "gif",
      fileSize: "5 MB",
      status: "queued",
      progress: 0,
      timeRemaining: "3m 45s"
    }]
  );

  useEffect(() => {
    if (isProcessing && progress < 100) {
      const timer = setTimeout(() => {
        setProgress((prev) => {
          const newProgress = Math.min(prev + Math.random() * 15, 100);
          if (newProgress >= 100) {
            setIsProcessing(false);
            setShowSuccessModal(true);
          }
          return newProgress;
        });

        const remainingSeconds = Math.floor((100 - progress) * 1.5);
        const minutes = Math.floor(remainingSeconds / 60);
        const seconds = remainingSeconds % 60;
        setEstimatedTime(`${minutes}m ${seconds}s`);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isProcessing, progress]);

  const handleDownload = () => {
    setIsProcessing(true);
    setProgress(0);
  };

  const handleLogout = () => {
    navigate('/landing-page');
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    setProgress(0);
  };

  return (
    <div className="min-h-screen bg-background">
      <PrimaryNavigation user={user} onLogout={handleLogout} />
      <WorkflowProgress />
      <main className="pt-32 pb-12 px-4 md:px-6 lg:px-8">
        <div className="max-w-screen-2xl mx-auto">
          <div className="mb-8 md:mb-10 lg:mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name="Download" size={24} color="#FFFFFF" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                  Download Options
                </h1>
                <p className="text-sm md:text-base text-muted-foreground mt-1">
                  Configure your video settings and download your meme
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
            <div className="space-y-6 md:space-y-8">
              <VideoPreview videoData={videoData} />

              <div className="lg:hidden">
                <ProcessingQueue queue={processingQueue} />
              </div>
            </div>

            <div className="space-y-6 md:space-y-8">
              <div className="bg-card rounded-xl p-6 md:p-7 lg:p-8 shadow-lg border border-border space-y-6 md:space-y-8">
                <QualitySelector
                  selectedQuality={selectedQuality}
                  onQualityChange={setSelectedQuality}
                  qualities={qualities} />


                <div className="h-px bg-border" />

                <FormatSelector
                  selectedFormat={selectedFormat}
                  onFormatChange={setSelectedFormat}
                  formats={formats} />


                <div className="h-px bg-border" />

                <AdvancedSettings
                  settings={advancedSettings}
                  onSettingsChange={setAdvancedSettings} />


                <div className="h-px bg-border" />

                <DownloadButton
                  isProcessing={isProcessing}
                  progress={progress}
                  estimatedTime={estimatedTime}
                  onDownload={handleDownload}
                  disabled={false} />

              </div>

              <div className="hidden lg:block">
                <ProcessingQueue queue={processingQueue} />
              </div>
            </div>
          </div>

          <div className="mt-8 md:mt-10 lg:mt-12 p-6 md:p-7 lg:p-8 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl border border-primary/20">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                <Icon name="Sparkles" size={32} color="#FFFFFF" />
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="text-lg md:text-xl font-bold text-foreground">
                  Pro Tip: Optimize Your Downloads
                </h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  For social media sharing, we recommend 720p MP4 format with medium compression. This provides excellent quality while keeping file sizes manageable for quick uploads. Enable fast start for better streaming performance on platforms like Twitter and Instagram.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseSuccessModal}
        downloadUrl="https://example.com/download/meme.mp4"
        videoDetails={{
          filename: "my_awesome_meme.mp4",
          quality: selectedQuality,
          format: selectedFormat,
          fileSize: qualities?.find((q) => q?.value === selectedQuality)?.fileSize || "25 MB"
        }} />

    </div>);

};

export default DownloadOptions;