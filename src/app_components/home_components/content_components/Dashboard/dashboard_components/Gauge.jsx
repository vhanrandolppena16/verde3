import React from "react";
import ReactSpeedometer from "react-d3-speedometer";

// Declare a constant reusable Gauge component
const Gauge = ({
  name,
  min = 0,
  max = 100,
  value = 0,
  unit = "",
  customRanges = null,
}) => {
  // Check if valid custom ranges are provided
  const hasCustomRanges = Array.isArray(customRanges) && customRanges.length > 1;

  return (
    // Individual Gauge Container
    <div
      className="
        flex flex-col items-center justify-center
        bg-blue-50 rounded-xl shadow p-4
      "
    >
      <ReactSpeedometer
        minValue={min}
        maxValue={max}
        value={value}
        needleColor="red"
        width={200}
        height={160}
        ringWidth={20}
        valueTextFontSize="0px" // Hide built-in text
        // Changes in Color based on range
        {...(hasCustomRanges
          ? {
              customSegmentStops: customRanges.map((r) => r.stop),
              segmentColors: customRanges.map((r) => r.color),
              segments: customRanges.length - 1,
            }
          : {
              startColor: "green",
              endColor: "blue",
              segments: 3,
            })}
      />
      <div className="text-xl font-bold mt-1">
        {value} {unit}
      </div>
      <span className="text-lg font-semibold mt-1">{name}</span>
    </div>
  );
};

export default Gauge;
