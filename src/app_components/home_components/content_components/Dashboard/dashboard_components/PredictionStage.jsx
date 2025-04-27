//PredictionStage.jsx
import React, { useState } from "react";
import GrowthStage from "../../../../../assets/images/lettuce-growing-timeline.png";

const PredictionStage = ({predicted_days, predicted_stages}) => {
  const [hovered, setHovered] = useState(false); 
  // Track hover state for shifting of prediction
  // From Predicted Growth Stage to Predicted Growth Days

  return (
    // Prediction Container
    <div
      className="
        relative flex items-center justify-center
        bg-green-50 rounded-2xl shadow-md h-[50%] min-h-[240px]
      "
      style={{
        backgroundImage: `url(${GrowthStage})`,
        backgroundSize: "95% 90%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h2
        className="
          relative items-center 
          bg-green-700 text-white px-6 py-3 rounded-xl shadow-xl 
          text-3xl font-bold tracking-wide transition-all duration-200
        "
      >
        {hovered
          ? predicted_days !== null
            ? `${predicted_days} days`
            : "Loading..."
          : predicted_stages || "Loading Stage..."}
      </h2>
    </div>
  );
};

export default PredictionStage;