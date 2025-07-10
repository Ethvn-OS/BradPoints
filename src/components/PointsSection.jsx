import React from 'react';
import './PointsSection.css';
import PointsTally from './PointsTally';

const PointsSection = ({ user }) => {
  const currentPoints = user.points;
  const pointsNeeded = 50;
  const pointsRemaining = pointsNeeded - currentPoints;
  const progressPercentage = (currentPoints / pointsNeeded) * 100;

  return (
    <div className="section">
      <h2 className="heading">Points</h2>
      <div className="points-card">
        <PointsTally points={currentPoints} />
        <div className="points-progress-box">
          <div className="progress-left">
            <p className="progress-message">
              Purchase more from Braddex in order to avail your next awesome reward!
            </p>
          </div>
          <div className="progress-divider"></div>
          <div className="progress-right">
            <p className="points-remaining">
              {pointsRemaining} more points until you can redeem your next reward!
            </p>
            <div className="progress-bar-container">
              <div
                className="progress-bar-fill"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointsSection;