import React from 'react';
import './PointsTally.css';

const PointsTally = ({ points }) => {
  return (
    <div className="points-tally-box">
      <span className="points-number">{points}</span>
    </div>
  );
};

export default PointsTally;
