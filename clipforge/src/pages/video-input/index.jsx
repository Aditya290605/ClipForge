import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryNavigation from '../../components/navigation/PrimaryNavigation';
import WorkflowProgress from '../../components/navigation/WorkflowProgress';
import URLInputSection from './components/URLInputSection';
import ExampleURLs from './components/ExampleURLs';
import DownloadProgress from './components/DownloadProgress';
import VideoPreview from './components/VideoPreview';

const VideoInput = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState('');
  const [validationState, setValidationState] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadStatus, setDownloadStatus] = useState('idle');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [videoData, setVideoData] = useState(null);
  const [downloadedVideoUrl, setDownloadedVideoUrl] = useState(null);
  const [currentUser] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com"
  });

  const validateYouTubeUrl = (urlString) => {
    if (!urlString) return null;

    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+/;
    return youtubeRegex?.test(urlString) ? 'valid' : 'invalid';
  };

  useEffect(() => {
    if (url) {
      const validation = validateYouTubeUrl(url);
      setValidationState(validation);
    } else {
      setValidationState(null);
    }
  }, [url]);

  const simulateDownload = (youtubeUrl) => {
    setIsProcessing(true);
    setDownloadStatus('downloading');
    setDownloadProgress(0);
    setEstimatedTime('30 seconds');

    const progressInterval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setDownloadStatus('processing');

          setTimeout(() => {
            setDownloadStatus('complete');
            setIsProcessing(false);
            
            // Store the actual video URL from YouTube
            const actualVideoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
            setDownloadedVideoUrl(actualVideoUrl);
            
            setVideoData({
              title: "Amazing Meme Compilation 2026 - Best Funny Moments",
              thumbnail: "https://images.unsplash.com/photo-1727091051318-95e0a8008b17",
              thumbnailAlt: "Colorful abstract digital art with vibrant neon lights and geometric patterns creating dynamic visual composition on dark background",
              duration: 245,
              fileSize: 52428800,
              quality: "1080p",
              format: "MP4",
              channel: "MemeCreators Official",
              sourceUrl: youtubeUrl
            });
          }, 2000);

          return 100;
        }

        const increment = Math.random() * 15 + 5;
        const newProgress = Math.min(prev + increment, 100);

        if (newProgress < 50) {
          setEstimatedTime('25 seconds');
        } else if (newProgress < 75) {
          setEstimatedTime('15 seconds');
        } else {
          setEstimatedTime('5 seconds');
        }

        return newProgress;
      });
    }, 500);
  };

  const handleSubmit = () => {
    if (validationState === 'valid') {
      const randomError = Math.random();

      if (randomError < 0.1) {
        setValidationState('network');
        return;
      } else if (randomError < 0.15) {
        setValidationState('restricted');
        return;
      } else if (randomError < 0.2) {
        setValidationState('unsupported');
        return;
      }

      simulateDownload(url);
    }
  };

  const handleExampleSelect = (exampleUrl) => {
    setUrl(exampleUrl);
    setValidationState('valid');
  };

  const handleContinue = () => {
    navigate('/video-editor', { 
      state: { 
        videoData,
        videoUrl: downloadedVideoUrl
      } 
    });
  };

  const handleCancel = () => {
    setUrl('');
    setValidationState(null);
    setIsProcessing(false);
    setDownloadProgress(0);
    setDownloadStatus('idle');
    setVideoData(null);
    setDownloadedVideoUrl(null);
  };

  const handleLogout = () => {
    navigate('/landing-page');
  };

  return (
    <div className="min-h-screen bg-background">
      <PrimaryNavigation user={currentUser} onLogout={handleLogout} />
      <WorkflowProgress />
      
      <main className="pt-32 pb-16 md:pt-36 md:pb-20 lg:pt-40 lg:pb-24">
        <URLInputSection
          url={url}
          onUrlChange={setUrl}
          onSubmit={handleSubmit}
          validationState={validationState}
          isProcessing={isProcessing} />


        {!isProcessing && !videoData &&
        <ExampleURLs onSelectExample={handleExampleSelect} />
        }

        {isProcessing &&
        <DownloadProgress
          progress={Math.round(downloadProgress)}
          status={downloadStatus}
          estimatedTime={estimatedTime} />

        }

        {videoData && !isProcessing &&
        <VideoPreview
          videoData={videoData}
          onContinue={handleContinue}
          onCancel={handleCancel} />

        }
      </main>
    </div>);

};

export default VideoInput;