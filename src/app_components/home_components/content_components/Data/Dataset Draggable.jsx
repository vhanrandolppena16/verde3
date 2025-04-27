import React, { useEffect, useRef, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { sensor_db } from "../../../../Firebase Database/FirebaseConfig";

const GROWTH_DURATION_DAYS = 30;

const getGrowthStage = (days) => {
  if (days < 7) return "Germination";
  if (days < 14) return "Seeding";
  if (days < 21) return "Vegetative";
  if (days < 28) return "Mature";
  return "Harvest";
};

const SensorTable = () => {
  const [sensorData, setSensorData] = useState([]);
  const [startDate, setStartDate] = useState(() => {
    const saved = localStorage.getItem('plantStartDate');
    return saved ? new Date(saved) : new Date();
  });
  const [sortAsc, setSortAsc] = useState(false);

  const defaultColumns = [
    { key: 'timestamp', label: 'Timestamp' },
    { key: 'temperature', label: 'Temperature (°C)' },
    { key: 'humidity', label: 'Humidity (%)' },
    { key: 'ph', label: 'pH' },
    { key: 'tds', label: 'TDS (ppm)' },
    { key: 'day', label: 'Day #' },
    { key: 'stage', label: 'Growth Stage' },
    { key: 'maturity', label: 'Predicted Maturity (Days)' },
  ];

  const [columns, setColumns] = useState(defaultColumns);
  const [draggedColIndex, setDraggedColIndex] = useState(null);

  useEffect(() => {
    document.title = "Dataset | Verde";
  }, []);

  useEffect(() => {
    const sensorRef = ref(sensor_db, 'readings');
    const unsubscribe = onValue(sensorRef, (snapshot) => {
      if (snapshot.exists()) {
        const rawData = snapshot.val();
        const parsedData = Object.entries(rawData).map(([id, entry]) => ({
          id,
          ...entry,
          timestampObj: new Date(entry.timestamp),
        }));

        const sortedData = parsedData.sort((a, b) =>
          sortAsc ? a.timestampObj - b.timestampObj : b.timestampObj - a.timestampObj
        );

        setSensorData(sortedData);
      } else {
        setSensorData([]);
      }
    });

    return () => unsubscribe();
  }, [sortAsc]);

  const handleResetStartDate = () => {
    const now = new Date();
    localStorage.setItem('plantStartDate', now.toISOString());
    setStartDate(now);
  };

  const toggleSort = () => setSortAsc((prev) => !prev);

  return (
    <div className="w-full h-full p-6 bg-emerald-200 mt-7 rounded-[30px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Sensor Readings Table</h2>
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow"
          onClick={handleResetStartDate}
        >
          Reset Growth Start
        </button>
      </div>

      <div className="relative overflow-auto max-h-[500px] rounded-xl shadow bg-white">
        <table className="min-w-full table-fixed">
          <thead className="bg-gray-200 sticky top-0 z-10">
            <tr>
              {columns.map((col, i) => (
                <th
                  key={col.key}
                  draggable
                  onDragStart={() => setDraggedColIndex(i)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => {
                    if (draggedColIndex === null) return;
                    const newCols = [...columns];
                    const [dragged] = newCols.splice(draggedColIndex, 1);
                    newCols.splice(i, 0, dragged);
                    setColumns(newCols);
                    setDraggedColIndex(null);
                  }}
                  className="text-left py-2 px-4 w-[180px] cursor-move select-none hover:bg-gray-300 transition"
                >
                  {col.label}
                  {col.key === 'timestamp' && (
                    <span
                      onClick={toggleSort}
                      className="ml-1 cursor-pointer select-none"
                      title="Click to sort"
                    >
                      {sortAsc ? "▲" : "▼"}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sensorData.map((entry) => {
              const dayNum = Math.floor((entry.timestampObj - startDate) / (1000 * 60 * 60 * 24));
              const rowData = {
                timestamp: entry.timestamp,
                temperature: entry.temperature,
                humidity: entry.humidity,
                ph: entry.ph,
                tds: entry.tds,
                day: dayNum >= 0 ? dayNum : 0,
                stage: getGrowthStage(dayNum),
                maturity: GROWTH_DURATION_DAYS,
              };

              return (
                <tr key={entry.id} className="border-t">
                  {columns.map((col) => (
                    <td key={col.key} className="py-2 px-4">
                      {rowData[col.key]}
                    </td>
                  ))}
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