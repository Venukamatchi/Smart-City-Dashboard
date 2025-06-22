import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaThermometerHalf, 
  FaCar, 
  FaNewspaper, 
  FaCalendarAlt, 
  FaBell 
} from 'react-icons/fa';
import { 
  WiDaySunny, 
  WiDayCloudy, 
  WiNightClear, 
  WiNightAltCloudy 
} from 'weather-icons-react';
import Weather from './Weather';
import Traffic from './Traffic';
import News from './News';
import Events from './Events';
import Alerts from './Alerts';
import './Dashboard.css';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getTimeOfDayIcon = (hours) => {
    if (hours >= 5 && hours < 12) {
      return <WiDaySunny className="text-3xl text-yellow-400" />;
    } else if (hours >= 12 && hours < 17) {
      return <WiDayCloudy className="text-3xl text-yellow-400" />;
    } else if (hours >= 17 && hours < 20) {
      return <WiNightAltCloudy className="text-3xl text-blue-400" />;
    } else {
      return <WiNightClear className="text-3xl text-blue-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="container mx-auto px-4 py-8"
      >
        {/* Header */}
        <motion.div 
          variants={itemVariants}
          className="flex justify-between items-center mb-12"
        >
          <div className="text-left">
            <h1 className="text-5xl font-bold bg-clip-text text-white from-white to-purple-400 mb-2">
              Smart City Dashboard
            </h1>
            <p className="text-gray-300 text-lg">
              Real-time insights and updates for your city
            </p>
          </div>
          <div className="flex items-center space-x-4">
            {getTimeOfDayIcon(currentTime.getHours())}
            <div className="text-right">
              <span className="text-lg">{formatDate(currentTime)}</span>
              <br />
              <span className="text-lg">{formatTime(currentTime)}</span>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats Section */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {/* Weather Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
            <div className="flex items-center gap-4">
              <FaThermometerHalf className="text-3xl text-blue-400" />
              <div>
                <h3 className="text-lg font-semibold">Weather</h3>
                <p className="text-sm text-gray-300">Current conditions</p>
              </div>
            </div>
          </div>
          {/* Traffic Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
            <div className="flex items-center gap-4">
              <FaCar className="text-3xl text-green-400" />
              <div>
                <h3 className="text-lg font-semibold">Traffic</h3>
                <p className="text-sm text-gray-300">Live updates</p>
              </div>
            </div>
          </div>
          {/* Events Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
            <div className="flex items-center gap-4">
              <FaCalendarAlt className="text-3xl text-purple-400" />
              <div>
                <h3 className="text-lg font-semibold">Events</h3>
                <p className="text-sm text-gray-300">Upcoming activities</p>
              </div>
            </div>
          </div>
          {/* Alerts Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
            <div className="flex items-center gap-4">
              <FaBell className="text-3xl text-yellow-400" />
              <div>
                <h3 className="text-lg font-semibold">Alerts</h3>
                <p className="text-sm text-gray-300">Important notices</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Alerts and Events Section */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-4 space-y-6"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FaBell className="text-yellow-400" />
                Alerts
              </h2>
              <Alerts />
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FaCalendarAlt className="text-purple-400" />
                Events
              </h2>
              <Events />
            </div>
          </motion.div>

          {/* Weather and Traffic Section */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-8 space-y-6"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FaThermometerHalf className="text-blue-400" />
                Weather Conditions
              </h2>
              <Weather />
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FaCar className="text-green-400" />
                Traffic Monitor
              </h2>
              <Traffic />
            </div>
          </motion.div>
        </div>

        {/* News Section */}
        <motion.div 
          variants={itemVariants}
          className="mt-6"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FaNewspaper className="text-purple-400" />
              Latest News
            </h2>
            <News />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
