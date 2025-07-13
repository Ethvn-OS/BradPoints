import React, { createContext, useContext, useState } from 'react';

const PointsContext = createContext();

export const usePoints = () => {
  const context = useContext(PointsContext);
  if (!context) {
    throw new Error('usePoints must be used within a PointsProvider');
  }
  return context;
};

export const PointsProvider = ({ children }) => {
  const [currentPoints, setCurrentPoints] = useState(36);
  const [redeemedRewards, setRedeemedRewards] = useState(new Set());
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'redemption',
      title: 'Reward Redeemed!',
      message: 'You successfully redeemed FREEDRINK for 25 points.',
      timestamp: '2024-12-15T10:30:00',
      read: false
    },
    {
      id: 2,
      type: 'new_reward',
      title: 'New Reward Available!',
      message: 'PARTYPACK200 is now available! Get Php 200 off group orders of 4+ people.',
      timestamp: '2024-12-14T15:45:00',
      read: false
    }
  ]);

  const redeemReward = (rewardId, pointsRequired) => {
    // Check if user has enough points
    if (currentPoints < pointsRequired) {
      alert(`You need ${pointsRequired} points to redeem this reward. You currently have ${currentPoints} points.`);
      return false;
    }

    // Check if reward was already redeemed
    if (redeemedRewards.has(rewardId)) {
      alert('You have already redeemed this reward!');
      return false;
    }

    // Deduct points and mark reward as redeemed
    setCurrentPoints(prev => prev - pointsRequired);
    setRedeemedRewards(prev => new Set([...prev, rewardId]));
    
    // Create notification for reward redemption
    const newNotification = {
      id: Date.now(),
      type: 'redemption',
      title: 'Reward Redeemed!',
      message: `You successfully redeemed a reward for ${pointsRequired} points.`,
      timestamp: new Date().toISOString(),
      read: false
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    alert(`Congratulations! You've successfully redeemed the reward for ${pointsRequired} points.`);
    return true;
  };

  const isRewardRedeemed = (rewardId) => {
    return redeemedRewards.has(rewardId);
  };

  const canRedeemReward = (pointsRequired) => {
    return currentPoints >= pointsRequired;
  };

  const value = {
    currentPoints,
    setCurrentPoints,
    redeemReward,
    isRewardRedeemed,
    canRedeemReward,
    redeemedRewards,
    notifications,
    setNotifications
  };

  return (
    <PointsContext.Provider value={value}>
      {children}
    </PointsContext.Provider>
  );
}; 