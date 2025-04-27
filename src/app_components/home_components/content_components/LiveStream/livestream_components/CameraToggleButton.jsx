// components/CameraToggleButton.jsx

import React from 'react';
import { CameraOff, Camera } from 'lucide-react';

const CameraToggleButton = ({ isCameraOn, toggleCamera }) => {
  return (
    <button
      onClick={toggleCamera}
      className="text-red-600 hover:text-red-800 p-1"
      title={isCameraOn ? "Turn Off Camera" : "Turn On Camera"}
    >
      {isCameraOn ? <CameraOff size={24} /> : <Camera size={24} />}
    </button>
  );
};

export default CameraToggleButton;
