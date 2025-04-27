// AlertContext.jsx
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { ref, onValue, push } from "firebase/database";
import { sensor_db } from "../../../../../Firebase Database/FirebaseConfig"; // adjust if needed

const AlertContext = createContext();

const THRESHOLDS = {
  temperature: { min: 18, max: 35 },
  humidity: { min: 40, max: 80 },
  ph: { min: 5.5, max: 7.5 },
  tds: { min: 800, max: 1600 },
};

export const AlertProvider = ({ children }) => {
  const [activeAlerts, setActiveAlerts] = useState({});
  const [alerts, setAlerts] = useState([]);
  const rerunCountRef = useRef(0);

  const checkLiveData = (entry) => {
    if (rerunCountRef.current >= 3) return;
    rerunCountRef.current += 1;

    const now = new Date();
    const updatedActiveAlerts = { ...activeAlerts };
    const newOutOfRange = [];
    const resolvedNow = [];

    Object.entries(THRESHOLDS).forEach(([param, range]) => {
      const val = parseFloat(entry[param]);
      if (isNaN(val)) return;

      const isOutOfRange = val < range.min || val > range.max;

      if (isOutOfRange) {
        if (!activeAlerts[param]) {
          newOutOfRange.push({
            parameter: param,
            value: val,
            threshold: `${range.min}–${range.max}`,
          });
        }
      } else {
        if (activeAlerts[param]) {
          const startData = activeAlerts[param];
          const start = new Date(startData.timestamp);
          const id = startData.id;
          const durationMin = Math.round((now - start) / 60000);

          resolvedNow.push({
            parameter: param,
            value: val,
            resolved: true,
            resolvedAt: now.toISOString(),
            durationMinutes: durationMin,
            range: `${range.min}–${range.max}`,
            triggeredId: id, // 🔥 link to original alert
          });

          delete updatedActiveAlerts[param]; // ✅ remove from active
        }
      }
    });

    if (newOutOfRange.length > 0) {
      const alertEntry = {
        timestamp: now.toISOString(),
        issues: newOutOfRange,
        raw: entry,
        status: "alert",
      };

      // 🔥 Push and get generated ID
      const newAlertRef = push(ref(sensor_db, "parameter_logs"), alertEntry);
      const alertId = newAlertRef.key;

      alertEntry.id = alertId; // ✅ Save ID inside

      // 🔥 Save ID + timestamp for each parameter
      newOutOfRange.forEach((issue) => {
        updatedActiveAlerts[issue.parameter] = {
          timestamp: alertEntry.raw.timestamp,
          id: alertId,
        };
      });

      setAlerts((prev) => [alertEntry, ...prev]);
    }

    if (resolvedNow.length > 0) {
      const resolvedEntry = {
        timestamp: now.toISOString(),
        issues: resolvedNow,
        raw: entry,
        status: "resolved",
      };

      push(ref(sensor_db, "parameter_logs"), resolvedEntry); // Push resolved to Firebase
      setAlerts((prev) => [resolvedEntry, ...prev]);
    }

    setActiveAlerts(updatedActiveAlerts);
  };

  useEffect(() => {
    const sensorRef = ref(sensor_db, "predictions");

    const unsubscribe = onValue(sensorRef, (snapshot) => {
      if (snapshot.exists()) {
        const rawData = snapshot.val();
        const lastEntry = Object.values(rawData).pop();
        checkLiveData(lastEntry);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AlertContext.Provider value={{ activeAlerts, alerts }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
