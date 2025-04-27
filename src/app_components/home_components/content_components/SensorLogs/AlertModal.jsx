// AlertModal.jsx
import React, { useState, useEffect } from "react";
import { useAlert } from "./logs_components/AlertContext";

const AlertModal = () => {
  const { activeAlerts } = useAlert();
  const currentIssues = Object.keys(activeAlerts);
  const [isVisible, setIsVisible] = useState(currentIssues.length > 0);

  useEffect(() => {
    if (currentIssues.length > 0) {
      setIsVisible(true); // Show again if new alerts come
    }
  }, [currentIssues.length]);

  if (!isVisible || currentIssues.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 w-80 bg-white shadow-2xl rounded-2xl p-5 border border-red-300 z-50 animate-fade-in">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold text-red-700 flex items-center gap-2">
          🚨 Active Alerts
        </h2>
        <button
          onClick={() => setIsVisible(false)}
          className="text-red-500 hover:text-red-700 text-sm font-bold"
          title="Dismiss"
        >
          ✖️
        </button>
      </div>

      <ul className="space-y-3">
        {currentIssues.map((param, idx) => (
          <li
            key={idx}
            className="bg-red-100 text-red-800 rounded-lg px-4 py-2 font-semibold flex items-center gap-2"
          >
            ⚠️ {param.toUpperCase()} is out of range!
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlertModal;
