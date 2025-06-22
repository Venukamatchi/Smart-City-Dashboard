import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const API_KEY = '0wryQZuqtzhuaKiAigYC5CILXBHfCN0y';

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axios.get(
          `https://api.yoursafetyalerts.com/alerts?apikey=${API_KEY}`
        );
        setAlerts(response.data.alerts);
      } catch (error) {
        console.error('Error fetching the alerts data', error);
      }
    };

    fetchAlerts();
  }, []);

  return (
    <div className="bg-red-700 text-white p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-2">Public Safety Alerts</h2>
      <ul>
        {alerts.length > 0 ? (
          alerts.map((alert, index) => (
            <li key={index} className="mb-2 border-b border-red-600 pb-2">
              <h3 className="font-bold">{alert.type}</h3>
              <p>{alert.message}</p>
              <p className="text-sm">{`Location: ${alert.location}`}</p>
              <p className="text-xs">{`Issued at: ${new Date(alert.timestamp).toLocaleString()}`}</p>
            </li>
          ))
        ) : (
          <li>No alerts available at the moment.</li>
        )}
      </ul>
    </div>
  );
};

export default Alerts;
