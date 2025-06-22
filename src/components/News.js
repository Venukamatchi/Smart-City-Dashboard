import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaNewspaper, FaExternalLinkAlt, FaClock, FaGlobe } from 'react-icons/fa';

const News = () => {
  const [news, setNews] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const API_KEY = 'c026aff1b306fd596c3cbadb4aaed39a'/* 143356b15a9aa861ca2b32aeecc880e6 */;
  const country = 'in';

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://api.mediastack.com/v1/news`, {
          params: {
            access_key: API_KEY,
            countries: country,
            keywords: 'Tamil',
            limit: 12,
          },
        });
        setNews(response.data.data);
        setError(null);
      } catch (error) {
        setError('Failed to fetch news');
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const truncateText = (text, maxLength) => {
    if (!text) return 'No description available.';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br rounded-2xl from-gray-900 via-blue-900 to-gray-900 py-8 px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-4xl font-bold text-white flex items-center justify-center gap-3 mb-4"
          >
            <FaNewspaper className="text-blue-400" />
            Latest Tamil News
          </motion.h2>
          <p className="text-gray-300">Stay updated with the latest news from Tamil Nadu</p>
        </div>

        {/* News Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-400"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-400 bg-red-900/20 rounded-lg p-4">
            {error}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {news.slice(0, visibleCount).map((article, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
                >
                  <div className="relative">
                    <img
                      src={article.image || 'https://via.placeholder.com/400x200?text=No+Image'}
                      alt={article.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {truncateText(article.title, 60)}
                    </h3>
                    
                    <p className="text-gray-300 text-sm mb-4">
                      {truncateText(article.description, 120)}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                      <div className="flex items-center gap-2">
                        <FaClock />
                        {formatDate(article.published_at)}
                      </div>
                      <div className="flex items-center gap-2">
                        <FaGlobe />
                        {article.source}
                      </div>
                    </div>

                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                    >
                      Read More <FaExternalLinkAlt size={12} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Load More Button */}
        {!loading && visibleCount < news.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-12"
          >
            <button
              onClick={() => setVisibleCount(prev => prev + 8)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg transition-colors duration-300 flex items-center gap-2 mx-auto"
            >
              Load More News
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default News;