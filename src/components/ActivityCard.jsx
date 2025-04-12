import React from 'react';

function ActivityCard({ activity, data }) {
  return (
    <div className="activity-card">
      <h2>{activity.toUpperCase()}</h2>
      <p>Overall Score: {data.overall_score.toFixed(1)} / 10</p>

    </div>
  );
}

export default ActivityCard;
