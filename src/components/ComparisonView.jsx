// src/components/ComparisonView.jsx
import React from 'react';
import ActivityCard from './ActivityCard';

function ComparisonView({ locations, onCompareClick }) {
  return (
    <div className="comparison-view">
      <h2>Compare Locations</h2>
      {locations.length === 0 ? (
        <p>No locations to compare. Please search for cities first.</p>
      ) : (
        <div className="comparison-grid">
          {locations.map((location, index) => (
            <div key={index} className="location-card">
              <h3>{location.name}</h3>
              <p>{location.country}</p>
              <div className="activity-grid">
                {Object.entries(location.activities).map(([key, data]) => (
                  <ActivityCard key={key} activity={key} data={data} />
                ))}
              </div>
              <button onClick={() => onCompareClick(index)}>Compare</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ComparisonView;
