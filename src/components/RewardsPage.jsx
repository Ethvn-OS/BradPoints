import React, { useState } from 'react';
import './RewardsPage.css';
import '../App.css';
import Sidebar from './Sidebar';
import Header from './Header';
import { usePoints } from '../context/PointsContext';

const RewardsPage = ({ user, rewards = [] }) => {
  console.log(rewards);
  const [selectedReward, setSelectedReward] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { redeemReward, isRewardRedeemed, canRedeemReward } = usePoints();

  /* const allRewards = [
    {
      id: 1,
      name: "FREEDRINK",
      description: "Get a free drink of any choice from any Braddex location!",
      pointsRequired: 25,
      color: "#FF6B6B",
      category: "Drinks",
      image: "/voucherImg1.png" 
    },
    {
      id: 2,
      name: "SIDEDISH50",
      description: "Get Php 50 off any side dish order at any Braddex location!",
      pointsRequired: 50,
      color: "#fa9c1b",
      category: "Side Dishes",
      image: "/voucherImg2.png"
    },
    {
      id: 3,
      name: "BUYROLLSTAKE1",
      description: "Receive a Buy 1 Take 1 promo for any rolls meal orders at any Braddex location!",
      pointsRequired: 75,
      color: "#FF7F50",
      category: "Main Meals",
      image: "/voucherImg3.png"
    },
    {
      id: 4,
      name: "FREERICEMEAL",
      description: "Get a free rice meal of your choice from any Braddex location!",
      pointsRequired: 100,
      color: "#ffca7a",
      category: "Main Meals",
      image: "/voucherImg4.png"
    },
    {
      id: 5,
      name: "FREESIOMAI",
      description: "Receive one free order of Braddex siomai!",
      pointsRequired: 125,
      color: "#FF6B6B",
      category: "Main Meals",
      image: "/voucherImg5.png"
    },
    {
      id: 6,
      name: "10PERCENT",
      description: "Get a voucher for 10% off your next order (minimum spend Php 150) at any Braddex location!",
      pointsRequired: 150,
      color: "#fa9c1b",
      category: "Discounts",
      image: "/voucherImg6.png"
    },
    {
      id: 7,
      name: "BATCHOYLOVE",
      description: "Receive a free order of batchoy at any Braddex location!",
      pointsRequired: 175,
      color: "#FF7F50",
      category: "Main Meals",
      image: "/voucherImg7.png"
    },
    {
      id: 8,
      name: "PARTYPACK200",
      description: "Php 200 off the next group order! (Group orders apply only to groups of 4 and above).",
      pointsRequired: 200,
      color: "#ffca7a",
      category: "Combo Meals",
      image: "/voucherImg8.png"
    }
  ]; */

  const allRewards = rewards || [];

  //console.log(rewards);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Drinks', 'Side Dishes', 'Main Meals', 'Discounts', 'Combo Meals'];

  const filteredRewards = selectedCategory === 'All'
    ? rewards
    : rewards.filter(reward => reward.reward_category === selectedCategory);

  console.log('rewards:', rewards);
  console.log('filteredRewards:', filteredRewards);

  const openModal = (reward) => {
    setSelectedReward(reward);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReward(null);
  };

  const claimReward = () => {
    const success = redeemReward(selectedReward.id, selectedReward.pointsRequired);
    if (success) {
      closeModal();
    }
  };

  return (
    <>
      <div className="app-layout">
        <Sidebar />
        <div className="main-content">
          <Header user={user}/>
          <div className="rewards-page">
            <div className="rewards-page-header">
              <h1>Available Rewards</h1>
              <p>Browse through all the amazing rewards you can redeem with BradPoints!</p>
            </div>

            <div className="category-filter">
              {categories.map(category => (
                <button
                  key={category}
                  className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="rewards-grid">
              {filteredRewards.map((rewards) => (
                <div key={rewards.id} className="reward-item">
                  <div className="reward-left-border" style={{ backgroundColor: rewards.reward_color }}></div>
                  <div className="reward-image-placeholder">
                    {rewards.reward_image
                      ? <img src={rewards.reward_image} alt={rewards.reward_name} className="reward-img" />
                      : <span role="img" aria-label="placeholder">📷</span>
                    }
                  </div>
                  <div className="reward-content">
                    <div className="reward-header" style={{ backgroundColor: rewards.reward_color }}>
                      <h3>{rewards.reward_name}</h3>
                      <span className="category-tag">{rewards.reward_category}</span>
                    </div>
                    <div className="reward-body">
                      <p className="reward-description">{rewards.reward_desc}</p>
                      <div className="reward-footer">
                        <span className="points-required">{rewards.reward_points} Points</span>
                        <button className="redeem-btn" onClick={() => openModal(rewards)}>Redeem</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="see-more-section">
              <p>Stay tuned for more exciting new rewards coming your way! Don't forget to check the notifications page for the hottest BradPoints updates.</p>
            </div>

            <div className="back-to-home">
              <button onClick={() => window.history.back()} className="back-btn">
                ← Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && selectedReward && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedReward.name}</h2>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              <p>{selectedReward.description}</p>
              <p><strong>Points Required: {selectedReward.pointsRequired}</strong></p>
            </div>
            <div className="modal-footer">
              {isRewardRedeemed(selectedReward.id) ? (
                <button className="claim-btn redeemed" disabled>
                  Already Redeemed
                </button>
              ) : !canRedeemReward(selectedReward.pointsRequired) ? (
                <button className="claim-btn insufficient" disabled>
                  Insufficient Points
                </button>
              ) : (
                <button className="claim-btn" onClick={claimReward}>
                  Claim Voucher
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RewardsPage;