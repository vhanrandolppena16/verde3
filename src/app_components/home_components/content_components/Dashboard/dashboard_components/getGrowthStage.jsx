// getGrowthStage.jsx
const getGrowthStage = (days) => {
  if (days <= 5.5) return "Initial (Germination)";
  if (days <= 26.2) return "Rapid Growth";
  return "Senescent (May Harvest)";
};

export default getGrowthStage;
