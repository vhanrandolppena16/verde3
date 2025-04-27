import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { sensor_db } from "../../../../Firebase Database/FirebaseConfig";
import getGrowthStage from "../Dashboard/dashboard_components/getGrowthStage";
// Setting of standard growth duration of hydroponic plant in days
const GROWTH_DURATION_DAYS = 30;

// Conversion from Growth Days to Growth Stage
// Based on Describing Lettuce Growth Using Morphological Features Combined with Nonlinear Models
// const getGrowthStage = (days) => {
//   if (days <= 5.5) return "Initial (Germination)";
//   if (days <= 26.2) return "Rapid Growth";
//   return "Senescent (May Harvest)";
// };

const SensorTable = () => {
  // State to store sensor readings
  const [sensorData, setSensorData] = useState([]);
  // State for tracking the plant's growth start date
  const [startDate, setStartDate] = useState(() => {
    const saved = localStorage.getItem('plantStartDate');
    return saved ? new Date(saved) : new Date();
  });

  // State to toggle sort (false = newest first)
  const [sortAsc, setSortAsc] = useState(false); 

  // Function that retrieved reads real-time data of sensor readings
  useEffect(() => {
    document.title = "Dataset | Verde";     // Changing the name of the tab
    
    const sensorRef = ref(sensor_db, 'predictions');
    const unsubscribe = onValue(sensorRef, (snapshot) => {
      if (snapshot.exists()) {
        const rawData = snapshot.val();
        // Convert Firebase object into an array with timestamp objects
        const parsedData = Object.entries(rawData).map(([id, entry]) => ({
          id,
          ...entry,
          timestampObj: new Date(entry.timestamp)
        }));

        // Sort the array by timestamp (based on sort direction)
        const sortedData = parsedData.sort((a, b) =>
          sortAsc
            ? a.timestampObj - b.timestampObj
            : b.timestampObj - a.timestampObj
        );

        setSensorData(sortedData);
      } else {
        setSensorData([]);
      }
    });

    // CLeanup
    return () => unsubscribe();
  }, [sortAsc]); // sort direction is a dependency

  // Resets the plant start date to now and saves it to localStorage
  const handleResetStartDate = () => {
    const now = new Date();
    localStorage.setItem('plantStartDate', now.toISOString());
    setStartDate(now);
  };

  // Toggle the sorting order of the table  
  const toggleSort = () => setSortAsc((prev) => !prev);

  return (
    // Whole Dataset Container
    <div className="w-full h-[90%] p-6 bg-emerald-200 mt-15 rounded-[30px]">
      {/* Header with reset button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Sensor Readings Table</h2>
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-[30px] shadow"
          onClick={handleResetStartDate}
        >
          Reset Growth Start
        </button>
      </div>

      {/* Scrollable table container */}
      <div className="relative overflow-scroll max-h-[90%] rounded-xl shadow bg-white scrollbar-hide">
        <table className="min-w-full table-fixed">
          <thead className="bg-gray-200 sticky top-0 z-10">
            <tr>
              {/* Sortable timestamp column */}
              <th
                className="text-left py-2 px-4 w-[200px] cursor-pointer select-none hover:bg-gray-300 transition"
                onClick={toggleSort}
                title="Click to sort by timestamp"
              >
                Timestamp {sortAsc ? "▲" : "▼"}
              </th>
              {/* Other sensor columns */}
              <th className="text-left py-2 px-4 w-[160px]">Temperature (°C)</th>
              <th className="text-left py-2 px-4 w-[140px]">Humidity (%)</th>
              <th className="text-left py-2 px-4 w-[100px]">pH</th>
              <th className="text-left py-2 px-4 w-[140px]">TDS (ppm)</th>
              <th className="text-left py-2 px-4 w-[100px]">Day #</th>
              <th className="text-left py-2 px-4 w-[140px]">Current Growth Stage</th>
              <th className="text-left py-2 px-4 w-[200px]">Predicted Maturity (Days)</th>
              <th className="text-left py-2 px-4 w-[140px]">Predicted Growth Stage</th>
            </tr>
          </thead>
          <tbody>
            {/* Render each row of sensor data */}
            {sensorData.map((entry) => {
              const dayNum = Math.floor(
                (entry.timestampObj - startDate) / (1000 * 60 * 60 * 24)
              );
              return (
                <tr key={entry.id} className="border-t">
                  <td className="py-2 px-4">{entry.timestamp}</td>
                  <td className="py-2 px-4">{entry.temperature}</td>
                  <td className="py-2 px-4">{entry.humidity}</td>
                  <td className="py-2 px-4">{entry.ph}</td>
                  <td className="py-2 px-4">{entry.tds}</td>
                  <td className="py-2 px-4">{dayNum >= 0 ? dayNum : 0}</td>
                  <td className="py-2 px-4">{getGrowthStage(dayNum)}</td>
                  <td className="py-2 px-4">{entry.predicted_days}</td>{/**Apply the prediction here */}
                  <td className="py-2 px-4">{getGrowthStage(entry.predicted_days)}</td> 
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SensorTable;
