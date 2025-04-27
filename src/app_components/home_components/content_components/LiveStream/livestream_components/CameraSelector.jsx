// components/CameraSelector.jsx

import React from 'react';

const CameraSelector = ({ devices, selectedDeviceId, onChange }) => {
  return (
    <select
      onChange={(e) => onChange(e.target.value)}
      value={selectedDeviceId}
      className="text-sm p-1 rounded border border-gray-300 focus:outline-none"
    >
      {devices.map((device, index) => (
        <option key={device.deviceId} value={device.deviceId}>
          {device.label || `Camera ${index + 1}`}
        </option>
      ))}
    </select>
  );
};

export default CameraSelector;
