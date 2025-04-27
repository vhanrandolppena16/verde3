import React from "react";
import Gauge from "./Gauge";

// Function that takes sensor data
const SensorReadings = ({ temperature, humidity, pH, tds }) => {
  return (
    <div
      className="
        grid grid-cols-2 gap-4 bg-white rounded-2xl p-4 shadow-md
        xl:col-span-2
      "
    >
      {/**Calls for individual parameter */}
      <Gauge
        name="Temperature"
        min={0}
        max={50}
        value={temperature}
        unit="°C"
        customRanges={[
          { stop: 0, color: "blue" },
          { stop: 15, color: "green" },
          { stop: 30, color: "red" },
          { stop: 50, color: "red" },
        ]}
      />
      <Gauge
        name="Humidity"
        min={0}
        max={100}
        value={humidity}
        unit="%"
        customRanges={[
          { stop: 0, color: "red" },
          { stop: 30, color: "orange" },
          { stop: 60, color: "green" },
          { stop: 100, color: "blue" },
        ]}
      />
      <Gauge
        name="pH"
        min={0}
        max={14}
        value={pH}
        customRanges={[
          { stop: 0, color: "yellow" },
          { stop: 6, color: "green" },
          { stop: 9, color: "blue" },
          { stop: 14, color: "blue" },
        ]}
      />
      <Gauge
        name="Total Dissolved Solids"
        min={0}
        max={2000}
        value={tds}
        unit="ppm"
        customRanges={[
          { stop: 0, color: "blue" },
          { stop: 700, color: "green" },
          { stop: 1500, color: "orange" },
          { stop: 2000, color: "red" },
        ]}
      />
    </div>
  );
};

export default SensorReadings;
