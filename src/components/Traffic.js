import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import CircularProgress from '@mui/material/CircularProgress';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt } from 'react-icons/fa';
import './Traffic.css';

const Traffic = () => {
  const mapElement = useRef(null);
  const [map, setMap] = useState(null);
  const [highTrafficAreas, setHighTrafficAreas] = useState([]);
  const [currentTraffic, setCurrentTraffic] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const TOMTOM_API_KEY = 'wm2GcPGKfQa76j9GJnh5Wou6dgdssAxK';
  const CUSTOM_STYLE_URL = 'https://api.tomtom.com/style/2/custom/style/dG9tdG9tQEBAY01JbnNPQ0RFREx3NWM0Tzs3NGZjMTk1ZC1kY2I3LTQ2NmEtOTFlZS00ODkyZjZjYTdjZTg=/drafts/0.json?key=' + TOMTOM_API_KEY;

  const locations = [
    { lat: 13.0827, lng: 80.2707, name: "Chennai Central" },
    { lat: 13.0604, lng: 80.2496, name: "T. Nagar" },
    { lat: 13.0067, lng: 80.2206, name: "Guindy" },
    { lat: 13.0609, lng: 80.2337, name: "Saidapet" },
    { lat: 13.0820, lng: 80.2870, name: "Egmore" },
    { lat: 13.0382, lng: 80.2446, name: "Velachery" },
    { lat: 13.0839, lng: 80.2790, name: "Parrys Corner" },
    { lat: 13.1093, lng: 80.2842, name: "Anna Nagar" },
    { lat: 13.0064, lng: 80.2575, name: "Adyar" },
    { lat: 13.0584, lng: 80.2560, name: "Kodambakkam" },
    { lat: 13.0822, lng: 80.2758, name: "Marina Beach" },
    { lat: 13.0475, lng: 80.0689, name: "Porur" }
  ];

  const getTrafficLevel = (trafficRate) => {
    if (trafficRate < 20) return 'Low';
    if (trafficRate < 50) return 'Medium';
    return 'High';
  };

  const fetchTrafficData = async () => {
    try {
      const highTraffic = await Promise.all(locations.map(async (loc) => {
        const response = await axios.get(
          `https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json?point=${loc.lat},${loc.lng}&key=${TOMTOM_API_KEY}`
        );

        const data = response.data.flowSegmentData;
        if (!data) throw new Error('No traffic data available');

        const trafficRate = ((1 - data.currentSpeed / data.freeFlowSpeed) * 100).toFixed(1);
        return {
          location: loc,
          currentSpeed: data.currentSpeed,
          trafficRate,
          trafficLevel: getTrafficLevel(trafficRate),
        };
      }));
      setHighTrafficAreas(highTraffic);
    } catch (error) {
      console.error("Error fetching traffic data:", error);
      setError('Error fetching traffic data');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCurrentLocationTraffic = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await axios.get(
            `https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json?point=${latitude},${longitude}&key=${TOMTOM_API_KEY}`
          );

          const data = response.data.flowSegmentData;
          if (!data) throw new Error('No traffic data available for current location');

          const trafficRate = ((1 - data.currentSpeed / data.freeFlowSpeed) * 100).toFixed(1);
          setCurrentTraffic({
            location: { lat: latitude, lng: longitude },
            currentSpeed: data.currentSpeed,
            trafficRate,
            trafficLevel: getTrafficLevel(trafficRate),
          });
        } catch (error) {
          console.error("Error fetching current location traffic data:", error);
          setError('Error fetching current location traffic data');
        }
      },
      () => {
        setError('Error accessing current location. Please enable location services.');
      },
      { enableHighAccuracy: true }
    );
  };

  const initializeMap = () => {
    if (mapElement.current) {
      const newMap = tt.map({
        key: TOMTOM_API_KEY,
        container: mapElement.current,
        center: [locations[0].lng, locations[0].lat],
        zoom: 12,
        style: CUSTOM_STYLE_URL,
      });

      newMap.on('load', () => {
        console.log('Map has loaded');

        // Add traffic flow layer
        newMap.addLayer({
          id: 'traffic_flow',
          type: 'raster',
          source: {
            type: 'raster',
            tiles: [`https://api.tomtom.com/traffic/map/4/tile/flow/relative0/{z}/{x}/{y}.png?key=${TOMTOM_API_KEY}`],
            tileSize: 256,
          },
          minzoom: 0,
          maxzoom: 22,
        });

        // Add traffic incidents layer
        newMap.addLayer({
          id: 'traffic_incidents',
          type: 'raster',
          source: {
            type: 'raster',
            tiles: [`https://api.tomtom.com/traffic/map/4/tile/incidents/s0/{z}/{x}/{y}.png?key=${TOMTOM_API_KEY}`],
            tileSize: 256,
          },
          minzoom: 0,
          maxzoom: 22,
        });
      });

      setMap(newMap);
    }
  };

  useEffect(() => {
    fetchTrafficData();
    fetchCurrentLocationTraffic();
    initializeMap();

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, []);

  return (
    <div className="traffic-monitor">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4"
      >
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-bold text-white mb-4">
            Traffic <span className="text-blue-400">Monitor</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Real-time traffic analysis for Chennai
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-6">
          <motion.div
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            className="lg:col-span-3 space-y-6"
          >
            {currentTraffic && (
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white">
                <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
                  <FaMapMarkerAlt className="text-blue-400" />
                  Current Location
                </h3>

                <div className="w-48 h-48 mx-auto mb-6">
                  <CircularProgressbar
                    value={currentTraffic.trafficRate}
                    text={`${currentTraffic.trafficRate}%`}
                    styles={buildStyles({
                      pathColor: `${
                        currentTraffic.trafficLevel === 'High' ? '#ef4444' :
                        currentTraffic.trafficLevel === 'Medium' ? '#f59e0b' : '#10b981'
                      }`,
                      textColor: '#fff',
                      trailColor: 'rgba(255,255,255,0.1)'
                    })}
                  />
                </div>

                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Speed</span>
                      <span className="font-semibold">{currentTraffic.currentSpeed} km/h</span>
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Status</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        currentTraffic.trafficLevel === 'High' ? 'bg-red-500/20 text-red-300' :
                        currentTraffic.trafficLevel === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-green-500/20 text-green-300'
                      }`}>
                        {currentTraffic.trafficLevel}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="lg:col-span-9"
          >
            <div className="map-container" ref={mapElement} style={{ height: '500px' }} />
            {isLoading && <CircularProgress className="absolute inset-0 m-auto" />}
            {error && <p className="text-red-500">{error}</p>}
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mt-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Traffic Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {highTrafficAreas.map((area, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-lg p-4">
                <h4 className="text-lg font-semibold">{area.location.name}</h4>
                <div className="flex justify-between">
                  <span className="text-gray-300">Speed</span>
                  <span className="font-semibold">{area.currentSpeed} km/h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Traffic Rate</span>
                  <span className={`font-semibold ${
                    area.trafficLevel === 'High' ? 'text-red-500' :
                    area.trafficLevel === 'Medium' ? 'text-yellow-500' : 'text-green-500'
                  }`}>
                    {area.trafficRate}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Traffic;
