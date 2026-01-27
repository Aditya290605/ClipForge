import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import DownloadOptions from './pages/download-options';
import LandingPage from './pages/landing-page';
import UserDashboard from './pages/user-dashboard';
import VideoEditor from './pages/video-editor';
import VideoInput from './pages/video-input';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/download-options" element={<DownloadOptions />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/video-editor" element={<VideoEditor />} />
        <Route path="/video-input" element={<VideoInput />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
