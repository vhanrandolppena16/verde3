// SensorLogs.jsx
import React, { useEffect, useState } from "react";
import { useAlert } from "./logs_components/AlertContext";
import { getDatabase, ref, onValue } from "firebase/database";

const Logs = () => {
  const { activeAlerts } = useAlert();
  const [alertLogs, setAlertLogs] = useState([]);
  const [showAlertHistory, setShowAlertHistory] = useState(true);
  const [showDetailedIssues, setShowDetailedIssues] = useState(false);
  const currentIssues = Object.keys(activeAlerts);

  useEffect(() => {
    const db = getDatabase();
    const alertsRef = ref(db, "alerts");

    const unsubscribe = onValue(alertsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const parsedData = Object.entries(data)
          .map(([key, value]) => ({ id: key, ...value }))
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setAlertLogs(parsedData);
      } else {
        setAlertLogs([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const findTimestampForParam = (param) => {
    const active = activeAlerts[param];
    if (!active || !active.id) return "Unknown time";
    return active.timestamp ? new Date(active.timestamp).toLocaleString() : "Unknown time";
  };

  return (
    <div className="w-full p-6 flex flex-col gap-8 mt-10">

      {/* (1) CURRENT STATUS */}
      <div className="bg-white shadow-xl rounded-xl p-6">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">📢 Current Status</h2>
        {currentIssues.length === 0 ? (
          <p className="text-green-600 font-semibold text-lg">
            ✅ All parameters are within safe range.
          </p>
        ) : (
          <ul className="space-y-2">
            {currentIssues.map((param, idx) => (
              <li key={idx} className="text-red-600 font-medium">
                ⚠️ {param.toUpperCase()} is out of range since {findTimestampForParam(param)}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* (2) ALERT HISTORY CONTAINER */}
      <div className="bg-white shadow-xl rounded-xl p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-red-700">📜 Alert History</h2>
          <button
            onClick={() => setShowAlertHistory(!showAlertHistory)}
            className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold py-2 px-4 rounded"
          >
            {showAlertHistory ? "Hide" : "Show"}
          </button>
        </div>

        {showAlertHistory && (
          <div className="overflow-x-auto max-h-[400px] mt-4">
            {alertLogs.length === 0 ? (
              <p className="text-gray-500">No alerts recorded yet.</p>
            ) : (
              <table className="min-w-full text-sm text-left text-gray-700">
                <thead className="text-xs uppercase bg-green-200 sticky top-0">
                  <tr>
                    <th className="px-6 py-3">Timestamp</th>
                    <th className="px-6 py-3">pH</th>
                    <th className="px-6 py-3">Temperature (°C)</th>
                    <th className="px-6 py-3">TDS (ppm)</th>
                    <th className="px-6 py-3">Humidity (%)</th>
                    <th className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {alertLogs.slice(0, 10).map((log) => (
                    <tr key={log.id} className="bg-white hover:bg-gray-100">
                      <td className="px-6 py-4">{new Date(log.timestamp).toLocaleString()}</td>
                      <td className="px-6 py-4">{log.raw?.ph ?? "-"}</td>
                      <td className="px-6 py-4">{log.raw?.temperature ?? "-"}</td>
                      <td className="px-6 py-4">{log.raw?.tds ?? "-"}</td>
                      <td className="px-6 py-4">{log.raw?.humidity ?? "-"}</td>
                      <td className="px-6 py-4">
                        {log.status === "alert" ? (
                          <span className="bg-red-200 text-red-800 px-2 py-1 rounded-full text-xs font-bold">
                            ALERT
                          </span>
                        ) : log.status === "resolved" ? (
                          <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs font-bold">
                            RESOLVED
                          </span>
                        ) : (
                          "-"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>

      {/* (3) DETAILED ISSUES CONTAINER */}
      <div className="bg-white shadow-xl rounded-xl p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-blue-700">🔢 Detailed Issues</h2>
          <button
            onClick={() => setShowDetailedIssues(!showDetailedIssues)}
            className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold py-2 px-4 rounded"
          >
            {showDetailedIssues ? "Hide" : "Show"}
          </button>
        </div>

        {showDetailedIssues && (
          <div className="overflow-x-auto max-h-[400px] mt-4">
            {alertLogs.slice(0, 10).map((log) => (
              <div key={`issues-${log.id}`} className="mb-6 bg-gray-200 p-4 rounded-xl">
                <p className="font-semibold mb-2 ">{new Date(log.timestamp).toLocaleString()}</p>
                <table className={`min-w-full text-sm text-left text-gray-700 border rounded-lg overflow-hidden`}>                  
                  <thead className={`${log.status === "resolved" ? "bg-green-700 text-white" : "bg-red-700 text-white"}`}>
                    <tr>
                      <th className="px-4 py-2">Parameter</th>
                      <th className="px-4 py-2">Value</th>
                      <th className="px-4 py-2">Threshold</th>
                    </tr>
                  </thead>
                  <tbody className={`${log.status === "resolved" ? "bg-green-100" : "bg-red-100"}`}>
                    {log.issues?.map((issue, idx) => (
                      <tr key={idx} className= {`${log.status === "resolved" ? "hover:bg-green-200" : "hover:bg-red-200"}`}>
                        <td className="px-4 py-2">{issue.parameter.toUpperCase()}</td>
                        <td className="px-4 py-2">{issue.value}</td>
                        <td className="px-4 py-2">{issue.threshold}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Logs;
