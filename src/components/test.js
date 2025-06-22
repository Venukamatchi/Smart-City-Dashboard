import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { WiDaySunny, WiNightClear, WiRain, WiCloudy, WiFog } from 'weather-icons-react';
import './Weather.css';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [isDaytime, setIsDaytime] = useState(null);
  const [songRecommendations, setSongRecommendations] = useState([]);
  const [selectedSongIndex, setSelectedSongIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingSpotify, setLoadingSpotify] = useState(false);
  const API_KEY = '34d531b0d791b6475ab886c9ce9eae2e'; // Replace with actual key
  const city = 'Chennai';

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const { data } = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        setWeather(data);

        const currentTime = Date.now() / 1000;
        const daytime = currentTime > data.sys.sunrise && currentTime < data.sys.sunset;
        setIsDaytime(daytime);

        const description = data.weather[0]?.main.toLowerCase() || '';
        setSongRecommendations(getSongRecommendations(description, daytime));
        setLoading(false);
      } catch (error) {
        console.error('Weather data fetch error:', error);
        setLoading(false);
      }
    };

    const fetchHourlyForecast = async () => {
      try {
        const { data } = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
        );
        setHourlyForecast(data.list.slice(0, 5)); // Get the next 5 hours
      } catch (error) {
        console.error('Hourly forecast fetch error:', error);
      }
    };

    fetchWeather();
    fetchHourlyForecast();
  }, []);

  const getSongRecommendations = (description, isDaytime) => {
    const songs = {
      clear: {
        day: [
          { trackId: 'track1', trackName: 'Ennavale Adi Ennavale - Kadhalan' },
          { trackId: 'track13', trackName: 'Oru Deivam Thantha Poove - Kannathil Muthamittal' },
          { trackId: 'track14', trackName: 'New York Nagaram - Sillunu Oru Kaadhal' },
          { trackId: 'track15', trackName: 'Anjali Anjali - Duet' },
          { trackId: 'track16', trackName: 'Roja Roja - Kadhalar Dhinam' }
        ],
        night: [
          { trackId: 'track2', trackName: 'Kadhal Rojave - Roja' },
          { trackId: 'track17', trackName: 'Uyire Uyire - Bombay' },
          { trackId: 'track18', trackName: 'Vennilave Vennilave - Minsara Kanavu' },
          { trackId: 'track19', trackName: 'Pachai Nirame - Alaipayuthey' },
          { trackId: 'track20', trackName: 'Snehithane - Alaipayuthey' }
        ]
      },
      rain: {
        day: [
          { trackId: 'track3', trackName: 'Kannalanae - Bombay' },
          { trackId: 'track21', trackName: 'Mazhai Thuli - Sangamam' },
          { trackId: 'track22', trackName: 'Thoda Thoda Malarndhadhenna - Indira' },
          { trackId: 'track23', trackName: 'Enna Solla Pogirai - Kandukondain Kandukondain' },
          { trackId: 'track24', trackName: 'Sundari Kannal - Thalapathi' }
        ],
        night: [
          { trackId: 'track4', trackName: 'Malargale Malargale - Love Birds' },
          { trackId: 'track25', trackName: 'Vaseegara - Minnale' },
          { trackId: 'track26', trackName: 'Nila Kaigirathu - Indira' },
          { trackId: 'track27', trackName: 'Munbe Vaa - Sillunu Oru Kaadhal' },
          { trackId: 'track28', trackName: 'Suttum Vizhi - Ghajini' }
        ]
      },
      drizzle: {
        day: [
          { trackId: 'track21', trackName: 'Kannalanae - Bombay' },
          { trackId: 'track29', trackName: 'Ennavale Adi Ennavale - Kadhalan' },
          { trackId: 'track30', trackName: 'Oru Deivam Thantha Poove - Kannathil Muthamittal' },
          { trackId: 'track31', trackName: 'New York Nagaram - Sillunu Oru Kaadhal' },
          { trackId: 'track32', trackName: 'Anjali Anjali - Duet' }
        ],
        night: [
          { trackId: 'track22', trackName: 'Malargale Malargale - Love Birds' },
          { trackId: 'track33', trackName: 'Uyire Uyire - Bombay' },
          { trackId: 'track34', trackName: 'Vennilave Vennilave - Minsara Kanavu' },
          { trackId: 'track35', trackName: 'Pachai Nirame - Alaipayuthey' },
          { trackId: 'track36', trackName: 'Snehithane - Alaipayuthey' }
        ]
      },
      fog: {
        day: [
          { trackId: 'track5', trackName: 'Nee Katru - Rhythm' },
          { trackId: 'track37', trackName: 'En Veetu Thottathil - Gentleman' },
          { trackId: 'track38', trackName: 'Kannalanae - Bombay' },
          { trackId: 'track39', trackName: 'Mazhai Thuli - Sangamam' },
          { trackId: 'track40', trackName: 'Thoda Thoda Malarndhadhenna - Indira' }
        ],
        night: [
          { trackId: 'track6', trackName: 'En Veetu Thottathil - Gentleman' },
          { trackId: 'track41', trackName: 'Ennavale Adi Ennavale - Kadhalan' },
          { trackId: 'track42', trackName: 'Oru Deivam Thantha Poove - Kannathil Muthamittal' },
          { trackId: 'track43', trackName: 'New York Nagaram - Sillunu Oru Kaadhal' },
          { trackId: 'track44', trackName: 'Anjali Anjali - Duet' }
        ]
      },
      clouds: {
        day: [
          { trackId: 'track7', trackName: 'Uyire Uyire - Bombay' },
          { trackId: 'track45', trackName: 'Vennilave Vennilave - Minsara Kanavu' },
          { trackId: 'track46', trackName: 'Pachai Nirame - Alaipayuthey' },
          { trackId: 'track47', trackName: 'Snehithane - Alaipayuthey' },
          { trackId: 'track48', trackName: 'Kannalanae - Bombay' }
        ],
        night: [
          { trackId: 'track8', trackName: 'Vennilave Vennilave - Minsara Kanavu' },
          { trackId: 'track49', trackName: 'Pachai Nirame - Alaipayuthey' },
          { trackId: 'track50', trackName: 'Snehithane - Alaipayuthey' },
          { trackId: 'track51', trackName: 'Mazhai Thuli - Sangamam' },
          { trackId: 'track52', trackName: 'Thoda Thoda Malarndhadhenna - Indira' }
        ]
      },
      snow: {
        day: [
          { trackId: 'track9', trackName: 'Poongatru - Mouna Ragam' },
          { trackId: 'track53', trackName: 'Idhu Oru Pon Malai - Nizhalgal' },
          { trackId: 'track54', trackName: 'Kannalanae - Bombay' },
          { trackId: 'track55', trackName: 'Mazhai Thuli - Sangamam' },
          { trackId: 'track56', trackName: 'Thoda Thoda Malarndhadhenna - Indira' }
        ],
        night: [
          { trackId: 'track10', trackName: 'Idhu Oru Pon Malai - Nizhalgal' },
          { trackId: 'track57', trackName: 'Ennavale Adi Ennavale - Kadhalan' },
          { trackId: 'track58', trackName: 'Oru Deivam Thantha Poove - Kannathil Muthamittal' },
          { trackId: 'track59', trackName: 'New York Nagaram - Sillunu Oru Kaadhal' },
          { trackId: 'track60', trackName: 'Anjali Anjali - Duet' }
        ]
      },
      thunderstorm: {
        day: [
          { trackId: 'track11', trackName: 'Vaseegara - Minnale' },
          { trackId: 'track61', trackName: 'Nila Kaigirathu - Indira' },
          { trackId: 'track62', trackName: 'Munbe Vaa - Sillunu Oru Kaadhal' },
          { trackId: 'track63', trackName: 'Suttum Vizhi - Ghajini' },
          { trackId: 'track64', trackName: 'Kannalanae - Bombay' }
        ],
        night: [
          { trackId: 'track12', trackName: 'Nila Kaigirathu - Indira' },
          { trackId: 'track65', trackName: 'Ennavale Adi Ennavale - Kadhalan' },
          { trackId: 'track66', trackName: 'Oru Deivam Thantha Poove - Kannathil Muthamittal' },
          { trackId: 'track67', trackName: 'New York Nagaram - Sillunu Oru Kaadhal' },
          { trackId: 'track68', trackName: 'Anjali Anjali - Duet' }
        ]
      },
      mist: {
        day: [
          { trackId: '65dvxc4Kctq3JIJ2BkKKMj', trackName: 'Munbe Vaa - Sillunu Oru Kaadhal' },
          { trackId: 'track69', trackName: 'Suttum Vizhi - Ghajini' },
          { trackId: 'track70', trackName: 'Kannalanae - Bombay' },
          { trackId: 'track71', trackName: 'Mazhai Thuli - Sangamam' },
          { trackId: 'track72', trackName: 'Thoda Thoda Malarndhadhenna - Indira' }
        ],
        night: [
          { trackId: '6wdyJnmcSeBXUyR6H5gGKd', trackName: 'Suttum Vizhi - Ghajini' },
          { trackId: 'track73', trackName: 'Ennavale Adi Ennavale - Kadhalan' },
          { trackId: 'track74', trackName: 'Oru Deivam Thantha Poove - Kannathil Muthamittal' },
          { trackId: 'track75', trackName: 'New York Nagaram - Sillunu Oru Kaadhal' },
          { trackId: 'track76', trackName: 'Anjali Anjali - Duet' }
        ]
      },
      default: {
        day: [
          { trackId: 'track19', trackName: 'Chikku Bukku Rayile - Gentleman' },
          { trackId: 'track77', trackName: 'Aathichudi - Indian' },
          { trackId: 'track78', trackName: 'Kannalanae - Bombay' },
          { trackId: 'track79', trackName: 'Mazhai Thuli - Sangamam' },
          { trackId: 'track80', trackName: 'Thoda Thoda Malarndhadhenna - Indira' }
        ],
        night: [
          { trackId: 'track20', trackName: 'Aathichudi - Indian' },
          { trackId: 'track81', trackName: 'Ennavale Adi Ennavale - Kadhalan' },
          { trackId: 'track82', trackName: 'Oru Deivam Thantha Poove - Kannathil Muthamittal' },
          { trackId: 'track83', trackName: 'New York Nagaram - Sillunu Oru Kaadhal' },
          { trackId: 'track84', trackName: 'Anjali Anjali - Duet' }
        ]
      }
    };
  
    const timeOfDay = isDaytime ? 'day' : 'night';
    return songs[description] && songs[description][timeOfDay]
      ? songs[description][timeOfDay]
      : songs.default[timeOfDay];
  };

  const handleSongClick = (index) => {
    setSelectedSongIndex(index);
    setLoadingSpotify(true);
    setTimeout(() => setLoadingSpotify(false), 1000);
  };

  const getWeatherIcon = (description, size = 64) => {
    const icons = {
      clear: isDaytime ? <WiDaySunny size={size} /> : <WiNightClear size={size} />,
      rain: <WiRain size={size} />,
      fog: <WiFog size={size} />,
      default: <WiCloudy size={size} />,
    };
    
    return (
      <div className="relative group">
        <div className="text-6xl transition-transform transform hover:scale-125 cursor-pointer">
          {icons[description.split(' ')[0]] || icons.default}
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2 translate-y-2 bg-gray-800 text-white text-sm rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {description.charAt(0).toUpperCase() + description.slice(1)}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white font-serif">Weather & Music</h1>
          <p className="text-blue-200">Perfect tunes for every weather</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="bg-white/10 p-8 rounded-3xl shadow-lg text-white">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white" role="status" aria-label="Loading weather"></div>
              </div>
            ) : weather ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-bold">{city}</h2>
                  <div aria-label="Weather icon">
                    {getWeatherIcon(weather.weather[0]?.description)}
                  </div>
                </div>
                <div className="text-6xl font-bold">{Math.round(weather.main.temp)}°C</div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 rounded-xl">
                    <p className="text-blue-200">Humidity</p>
                    <p className="text-2xl font-semibold">{weather.main.humidity}%</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl">
                    <p className="text-blue-200">Wind Speed</p>
                    <p className="text-2xl font-semibold">{weather.wind.speed} m/s</p>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-2xl font-bold">Next 5 Hours</h3>
                  <div className="grid grid-cols-5 gap-2">
                    {hourlyForecast.map((hour, index) => (
                      <div key={index} className="bg-white/5 p-2 rounded-xl text-center">
                        <p className="text-blue-200">{new Date(hour.dt * 1000).getHours()}:00</p>
                        <p className="text-2xl font-semibold">{Math.round(hour.main.temp)}°C</p>
                        <div aria-label="Weather icon">
                          {getWeatherIcon(hour.weather[0]?.description, 32)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-red-300">Error loading weather data.</p>
            )}
          </motion.div>
          <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="bg-white/10 p-8 rounded-3xl shadow-lg text-white">
            <h2 className="text-3xl font-bold mb-4">Weather-Driven Music Suggestions</h2>
            <div className="grid gap-2">
              {songRecommendations.map((song, index) => (
                <motion.div key={song.trackId} onClick={() => handleSongClick(index)} className={`p-4 rounded-xl cursor-pointer transition ${selectedSongIndex === index ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-white/5'}`}>
                  <p className="font-semibold">{song.trackName}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        {selectedSongIndex !== null && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 bg-white/10 p-8 rounded-3xl shadow-lg">
            {loadingSpotify ? (
              <div className="animate-spin h-16 w-16 rounded-full border-b-2 border-white mx-auto"></div>
            ) : (
              <iframe 
                src={`https://open.spotify.com/embed/track/${songRecommendations[selectedSongIndex].trackId}`} 
                width="100%" 
                height="380" 
                frameBorder="0" 
                allow="encrypted-media" 
                className="rounded-xl max-w-3xl" 
                title="Spotify player">
              </iframe>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Weather;