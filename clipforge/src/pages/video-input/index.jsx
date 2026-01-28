import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

  const handleDownload = async (youtubeUrl) => {
    setIsProcessing(true);
    setDownloadStatus('downloading');
    setDownloadProgress(0);
    setEstimatedTime('Calculating...');

    try {
      // 1. Validate and get metadata
      const validateResponse = await axios.get(`/api/validate?url=${encodeURIComponent(youtubeUrl)}`);
      const metadata = validateResponse.data;

      // 2. Download the video
      const response = await axios.get(`/api/download?url=${encodeURIComponent(youtubeUrl)}`, {
        responseType: 'blob',
        onDownloadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 50000000)); // Fallback total if missing
          setDownloadProgress(percentCompleted);

          if (percentCompleted < 50) setEstimatedTime('Downloading...');
          else setEstimatedTime('Finalizing...');
        }
      });

      setDownloadStatus('processing');
      setDownloadProgress(100);

      // Create blob URL
      const videoBlob = new Blob([response.data], { type: 'video/mp4' });
      const videoObjectUrl = URL.createObjectURL(videoBlob);

      setDownloadedVideoUrl(videoObjectUrl);
      setVideoData({
        title: metadata.title,
        thumbnail: metadata.thumbnail,
        thumbnailAlt: metadata.title,
        duration: parseInt(metadata.duration),
        fileSize: response.data.size,
        quality: metadata.format,
        format: "MP4",
        channel: metadata.channel,
        sourceUrl: youtubeUrl
      });

      setDownloadStatus('complete');

    } catch (error) {
      console.error('Download failed:', error);
      setValidationState('network'); // Or a more specific error
      setDownloadStatus('idle');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = () => {
    if (validationState === 'valid') {
      handleDownload(url);
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