import React, { useEffect, useState } from 'react';
import './PointsSection.css';
import PointsTally from './PointsTally';
import { usePoints } from '../context/PointsContext';

const PointsSection = ({ user, rewards }) => {
  const { isRewardRedeemed } = usePoints();
  const currentPoints = user.points;

  const [nextReward, setNextReward] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUnredeemed = async () => {
      setLoading(true);
      const unredeemed = [];

      for (const reward of rewards) {
        const redeemed = await isRewardRedeemed(reward.id);
        if (!redeemed && currentPoints < reward.reward_points) {
          unredeemed.push(reward);
        }
      }

      //Sort by lowest points required
      unredeemed.sort((a, b) => a.reward_points - b.reward_points);

      setNextReward(unredeemed[0] || null);
      setLoading(false);
    }

    getUnredeemed();
  }, [rewards, isRewardRedeemed, currentPoints]);

  const pointsNeeded = nextReward ? nextReward.reward_points : currentPoints;
  const pointsRemaining = nextReward ? pointsNeeded - currentPoints : 0;
  const progressPercentage = nextReward ? (currentPoints / nextReward.reward_points) * 100 : 100;

  if (loading) {
    return <div>Loading next reward...</div>;
  }

  return (
    <div className="section">
      <h2 className="heading">Points</h2>
      <div className="points-card">
        <PointsTally points={currentPoints} />
        <div className="points-progress-box">
          <div className="progress-left">
            <p className="progress-message">
              {nextReward ? "Purchase more from Braddex in order to avail your next awesome reward!" : "You've reached all available rewards! Great job!"}
            </p>
          </div>
          <div className="progress-divider"></div>
          <div className="progress-right">
            <p className="points-remaining">
              {nextReward ? `${pointsRemaining} more points until you can redeem your next reward!` : "You've unlocked all rewards!"}
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