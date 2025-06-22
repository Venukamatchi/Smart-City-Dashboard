import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TestEvents = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.cricapi.com/v1/match_info', {
          params: {
            apikey: 'bcf56279-8a5b-42e2-84ac-07ab4f0c6724',
            id: 'ff2945de-f5f3-4bb0-950a-58c946d5792e', // Match ID from the URL
          },
        });
        setData(response.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  if (error) return <div className="text-red-500 text-center mt-8">Error: {error}</div>;
  if (!data) return <div className="text-center mt-8">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 text-white rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold text-center mb-6">Match Information</h2>
      
      <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 shadow-lg">
        {/* Display match details */}
        <h3 className="text-2xl font-semibold mb-4">Match Details</h3>
        <div className="flex flex-col space-y-3">
          <div className="flex justify-between">
            <span className="font-medium">Match Title:</span>
            <span>{data.title || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Status:</span>
            <span>{data.status || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Match Type:</span>
            <span>{data.type || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Date:</span>
            <span>{data.date || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Venue:</span>
            <span>{data.venue || 'N/A'}</span>
          </div>
        </div>

        {/* Display teams */}
        <h3 className="text-2xl font-semibold mt-6 mb-4">Teams</h3>
        <div className="flex justify-between">
          <span className="font-medium">Team 1:</span>
          <span>{data.team1 || 'N/A'}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Team 2:</span>
          <span>{data.team2 || 'N/A'}</span>
        </div>

        {/* Additional match information */}
        <h3 className="text-2xl font-semibold mt-6 mb-4">Additional Information</h3>
        <div className="flex justify-between">
          <span className="font-medium">Toss Winner:</span>
          <span>{data.toss_winner || 'N/A'}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Player of the Match:</span>
          <span>{data.player_of_the_match || 'N/A'}</span>
        </div>
      </div>
    </div>
  );
};

export default TestEvents;