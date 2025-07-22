import React, { createContext, useContext, useState, useEffect } from 'react';

const PointsContext = createContext();

export const usePoints = () => {
  const context = useContext(PointsContext);
  if (!context) {
    throw new Error('usePoints must be used within a PointsProvider');
  }
  return context;
};

export const PointsProvider = ({ children, points, updateUserPoints }) => {
  const [currentPoints, setCurrentPoints] = useState(points);

  useEffect(() => {
    setCurrentPoints(points);
  }, [points]);

  const [redeemedRewards, setRedeemedRewards] = useState(new Set());
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch("http://localhost/BradPoints/php-backend/get-notifs.php", {
          credentials: 'include'
        });

        const data = await response.json();

        const formatted = data.map(n => ({
          id: n.id,
          type: n.type,
          title: n.title,
          message: n.message,
          timestamp: n.date_created,
          read: false
        }));

        setNotifications(formatted);
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
      }
    };

    fetchNotifications();
  }, []);

  const redeemReward = async (reward) => {
    const response = await fetch("http://localhost/BradPoints/php-backend/redeem-reward.php", {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        avail_reward_name: reward.reward_name,
        avail_reward_points: reward.reward_points,
        avail_reward_id: reward.id,
      }),
    });
    const data = await response.json();
    if (data.success) {
      setCurrentPoints(Number(data.points)); // update points from backend
      if (updateUserPoints) updateUserPoints(Number(data.points));
      setNotifications((prev) => [
        ...prev,
        {
          id: Date.now(),
          type: 'redemption',
          title: 'Reward Redeemed!',
          message: data.message,
          timestamp: new Date().toISOString(),
          read: false,
        },
      ]);
      alert(data.message);
      return true;
    } else {
      alert(data.message);
      return false;
    }
  };

  const isRewardClaimed = async (rewardId) => {
    const response = await fetch("http://localhost/BradPoints/php-backend/check-claim.php", {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        reward_id: rewardId
      }),
    });
    const data = await response.json();
    return data.claimed;
  }

  const isRewardRedeemed = async (rewardId) => {
    const response = await fetch("http://localhost/BradPoints/php-backend/check-redeem.php", {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        avail_reward_id: rewardId
      }),
    });
    const data = await response.json();
    return data.redeemed;
  };

  const canRedeemReward = (pointsRequired) => {
    return currentPoints >= pointsRequired;
  };

  const value = {
    currentPoints,
    setCurrentPoints,
    redeemReward,
    isRewardRedeemed,
    isRewardClaimed,
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

/* const redeemReward = (rewardId, pointsRequired) => {
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
  }; */

  /*{
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
    }*/