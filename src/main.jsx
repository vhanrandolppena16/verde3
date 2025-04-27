// main.jsx

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Imports BrowserRouter for application navigation
import { BrowserRouter } from 'react-router-dom';
// Import VideoProvider for video sharing purpose 
import { VideoProvider } from './app_components/home_components/content_components/LiveStream/livestream_components/VideoContext.jsx'; // 👈 import this
// Import Alert Context for StatusModal
import { AlertProvider } from './app_components/home_components/content_components/SensorLogs/logs_components/AlertContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/**Allows application navigation within the system */}
      <VideoProvider> {/**Allows access for video sharing purposes */}
        <AlertProvider> {/**Allows access for sharing of modal for alerts */}
          <App /> 
        </AlertProvider>
      </VideoProvider>
    </BrowserRouter>
  </StrictMode>
)
