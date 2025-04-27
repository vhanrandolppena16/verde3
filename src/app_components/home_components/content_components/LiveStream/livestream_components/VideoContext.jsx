// VideoContext.jsx
import React, { createContext, useRef } from 'react';

// Create the context object, storage of a reference
const VideoContext = createContext();

// Creates a provider component which allows to pass video ref
const VideoProvider = ({ children }) => {
  const videoRef = useRef(null);              // Creates a video reference

  return (
    <VideoContext.Provider value={videoRef}>  {/**Provides contexts holding the video reference */}
      {children}
    </VideoContext.Provider>
  );
};

export {VideoContext, VideoProvider};