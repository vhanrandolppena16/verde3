import React, { useState, useEffect } from 'react';
import { useAlert } from '../SensorLogs/logs_components/AlertContext'; // import your alert system

const initialRelays = [
  { name: 'Pump', icon: '💧', state: false },
  { name: 'Light', icon: '💡', state: false },
  { name: 'Fan', icon: '🌀', state: false },
  { name: 'Heater', icon: '🔥', state: false },
  { name: 'Cooler', icon: '❄️', state: false },
  { name: 'Humidifier', icon: '💨', state: false },
  { name: 'Water Valve', icon: '🚰', state: false },
  { name: 'Nutrient Pump', icon: '🥬', state: false },
  { name: 'Exhaust', icon: '🌬️', state: false }
];

const Control = () => {
  const [relays, setRelays] = useState(initialRelays);
  const { activeAlerts } = useAlert(); // ✅ use active sensor alerts

  useEffect(() => {
    document.title = "Control | Verde";
  }, []);

  // ✅ Automatically update relays based on activeAlerts
  useEffect(() => {
    const updatedRelays = [...relays];

    // Example logic: Auto control based on active alerts
    if (activeAlerts.temperature) {
      updatedRelays.find(r => r.name === 'Cooler').state = true; // temp high → turn ON Cooler
      updatedRelays.find(r => r.name === 'Fan').state = true;     // temp high → turn ON Fan
      updatedRelays.find(r => r.name === 'Heater').state = false; // temp high → turn OFF Heater
    } else {
      updatedRelays.find(r => r.name === 'Cooler').state = false;
      updatedRelays.find(r => r.name === 'Fan').state = false;
      updatedRelays.find(r => r.name === 'Heater').state = true;  // temp normal → maybe turn ON Heater (example)
    }

    if (activeAlerts.humidity) {
      updatedRelays.find(r => r.name === 'Humidifier').state = true; // humidity low → turn ON Humidifier
      updatedRelays.find(r => r.name === 'Exhaust').state = false;   // humidity low → turn OFF Exhaust
    } else {
      updatedRelays.find(r => r.name === 'Humidifier').state = false;
      updatedRelays.find(r => r.name === 'Exhaust').state = true;    // normal → Exhaust ON
    }

    // TDS and pH could affect Pumps / Nutrient Pumps
    if (activeAlerts.tds || activeAlerts.ph) {
      updatedRelays.find(r => r.name === 'Nutrient Pump').state = true;
    } else {
      updatedRelays.find(r => r.name === 'Nutrient Pump').state = false;
    }


    setRelays(updatedRelays);
  }, [activeAlerts]); // whenever an alert triggers or resolves

  const toggleRelay = (index) => {
    const updatedRelays = [...relays];
    updatedRelays[index].state = !updatedRelays[index].state;
    setRelays(updatedRelays);
  };

  return (
    <div className="bg-white border rounded-xl shadow p-6 mt-4 w-full h-full flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 w-full h-full overflow-auto">
        {relays.map((relay, index) => (
          <div
            key={index}
            className={`flex flex-col sm:flex-row items-center justify-between shadow-md rounded-2xl p-6 h-full w-[98%] ${relay.state ? 'bg-green-100' : 'bg-red-100'}`}
          >
            <div className="flex items-center gap-3 mb-4 sm:mb-0">
              <div className="text-3xl">{relay.icon}</div>
              <div className="text-lg font-semibold">{relay.name}</div>
            </div>
            <div
              onClick={() => toggleRelay(index)}
              className={`w-16 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${relay.state ? 'bg-green-500' : 'bg-gray-300'}`}
            >
              <div
                className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${relay.state ? 'translate-x-8' : 'translate-x-0'}`}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Control;
