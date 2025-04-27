import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { sensor_db } from "../../../../Firebase Database/FirebaseConfig";
import {
  LineChart,         // Main container for rendering the line chart
  Line,              // The actual data line to plot (e.g., temperature, pH, etc.)
  XAxis,             // Horizontal axis (usually timestamps)
  YAxis,             // Vertical axis (sensor values)
  Tooltip,           // Shows values when you hover over data points
  Legend,            // Displays labels for each plotted line
  ResponsiveContainer, // Makes the chart responsive to its container's size
  CartesianGrid,     // Adds a background grid for better readability
} from "recharts";

// Declaring which parameters will be graphed
const PARAMS = [
  { key: "temperature", label: "Temperature (°C)" },
  { key: "humidity", label: "Humidity (%)" },
  { key: "ph", label: "pH" },
  { key: "tds", label: "TDS (ppm)" },
  { key: "predicted_days", label: "Prediction Trend" },
];

const SensorGraph = () => {
  // State to store all sensor readings
  const [sensorData, setSensorData] = useState([]);
  // Choosing which parameter should be visualized. Default: Temp
  const [selectedParams, setSelectedParams] = useState(["temperature"]);
  // Allows for multiselecting parameters for more than 1 data visualization
  const [multiSelect, setMultiSelect] = useState(false);

  useEffect(() => {
    document.title = "Analytics | Verde";     // Changing the name of the tab
    
    // Reference to 'readings' in Firebase
    const sensorRef = ref(sensor_db, "predictions");

    const unsubscribe = onValue(sensorRef, (snapshot) => {
      if (snapshot.exists()) {
        const rawData = snapshot.val();
        // Convert Firebase entries into an array of objects with formatted timestamps
        const parsedData = Object.entries(rawData).map(([id, entry]) => ({
          id,
          ...entry,
          timestamp: new Date(entry.timestamp).toLocaleString(),
        }));

        // Sort data by timestamp (ascending)
        const sortedData = parsedData.sort(
          (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
        );

        setSensorData(sortedData);
      } else {
        setSensorData([]);
      }
    });

    // Cleanup
    return () => unsubscribe();
  }, []);

  // Handles parameter button clicks
  const toggleParam = (key) => {
    if (multiSelect) {
      // Toggle on/off
      setSelectedParams((prev) =>
        prev.includes(key)
          ? prev.filter((param) => param !== key)
          : [...prev, key]
      );
    } else {
      // Single select mode
      setSelectedParams([key]);
    }
  };

  // Helper to control graph grid layout
  const getGridCols = (count) => {
    if (count === 1 || count === 2) return "grid-cols-1 md:grid-cols-2";
    return "grid-cols-1 md:grid-cols-2 lg:grid-cols-2";
  };

  return (
    <div className="relative w-full h-[90%] p-6 overflow-y-auto bg-green-100 mt-15 rounded-[30px]">
      {/* Header with multi/single select toggle */}
      <div className="flex justify-between items-center mb-4 bg-emerald-200 p-4 rounded-[20px]">
        <h2 className="text-xl font-bold">Sensor Data Graph</h2>
        <button
          className={`px-4 py-2 rounded shadow ${
            multiSelect ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
          }`}
          onClick={() => {
            setMultiSelect((prev) => !prev);
            setSelectedParams(["temperature"]); // reset selection to default
          }}
        >
          {multiSelect ? "Multiple Select" : "Single Select"}
        </button>
      </div>

      {/* Parameter selection buttons */}
      <div className="flex flex-wrap gap-3 mb-6 justify-center">
        {PARAMS.map((param) => (
          <button
            key={param.key}
            onClick={() => toggleParam(param.key)}
            className={`px-4 py-2 rounded shadow transition ${
              selectedParams.includes(param.key)
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {param.label}
          </button>
        ))}
      </div>

      {/* Graph Grid */}
      <div
        className={`grid gap-6 ${
          selectedParams.length === 1
            ? "grid-cols-1"
            : "grid-cols-1 md:grid-cols-2"
        }`}>        
        {/* Render a chart for each selected parameter */}
          {selectedParams.map((key) => {
          const label = PARAMS.find((p) => p.key === key)?.label;
          
          return (
            <div
              key={key}
              className="bg-white rounded-xl shadow p-4 w-full min-h-[300px] max-h-[350px] flex flex-col"
            >
              {/* Chart title */}
              <h3 className="text-md font-semibold mb-2">{label}</h3>

              {/* Chart area that grows to fill space */}
              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sensorData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" minTickGap={40} />
                    <YAxis
                      label={{
                        value: label,
                        angle: -90,
                        position: "insideLeft",
                      }}
                    />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"          // Smooth line
                      dataKey={key}            // Which parameter to plot
                      stroke="#16a34a"         // Line color (green)
                      strokeWidth={2}
                      dot={false}              // Disable data point dots
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SensorGraph;
