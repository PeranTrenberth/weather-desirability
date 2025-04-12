import React, { useState } from 'react';
import { getWeatherData, processWeatherData } from './services/weatherService';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isNearCoast = (lat, lon) => {
    return Math.abs(lat) < 60 && Math.abs(lon) < 180 && Math.random() > 0.5;
  };

  const isNearMountains = (lat, lon) => {
    return Math.abs(lat) > 30 && Math.random() > 0.5;
  };

  const handleSearch = async () => {
    if (!city) return;
    setError('');
    setLoading(true);
    try {
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`);
      const geoData = await geoRes.json();
      if (!geoData.results || geoData.results.length === 0) {
        setError('Location not found');
        setLoading(false);
        return;
      }

      const { latitude, longitude } = geoData.results[0];
      const weatherRaw = await getWeatherData(latitude, longitude);
      const processed = processWeatherData({
        ...weatherRaw,
        latitude,
        longitude,
        location: city,
        isNearCoast: isNearCoast(latitude, longitude),
        isNearMountains: isNearMountains(latitude, longitude),
      });
      setData(processed);
    } catch (err) {
      console.error(err);
      setError('Weather data not available');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>🌤️ Destination Desirability Ranking</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter a city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {data && (
        <div className="results">
          <h2>Weather Summary</h2>
          <p>Average Temperature: {data.weatherSummary.average_temperature}</p>
          <p>Predominant Condition: {data.weatherSummary.predominant_condition}</p>

          <h2>Activity Scores</h2>
          {Object.entries(data.activities)
            .sort(([, a], [, b]) => b.overall_score - a.overall_score)
            .map(([activity, info]) => (
              <div key={activity} className="activity-card">
                <h3>{activity.replace('_', ' ').toUpperCase()}</h3>
                <p>Overall Score: {info.overall_score} / 10</p>

              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default App;
