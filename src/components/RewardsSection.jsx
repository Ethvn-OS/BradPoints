import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RewardsSection.css';
import { usePoints } from '../context/PointsContext';

const RewardsSection = () => {
  const [selectedReward, setSelectedReward] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { redeemReward, isRewardRedeemed, canRedeemReward } = usePoints();

  const rewards = [
    {
      id: 1,
      name: "FREEDRINK",
      description: "Get a free drink of any choice from any Braddex location!",
      pointsRequired: 25,
      color: "#FF6B6B"
    },
    {
      id: 2,
      name: "SIDEDISH50",
      description: "Get Php 50 off any side dish order at any Braddex location!",
      pointsRequired: 50,
      color: "#fa9c1b"
    },
    {
      id: 3,
      name: "BUYROLLSTAKE1",
      description: "Receive a Buy 1 Take 1 promo for any rolls meal orders at any Braddex location!",
      pointsRequired: 75,
      color: "#ffca7a"
    }
  ];

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
      <div className="section">
        <h2 className="heading">Rewards</h2>
        <div className="rewards-container">
          {rewards.map((reward) => (
            <div
              key={reward.id}
              className="reward-card"
              onClick={() => openModal(reward)}
              role="button"
              tabIndex={0}
              onKeyPress={e => { if (e.key === 'Enter') openModal(reward); }}
            >
              <div className="reward-top" style={{ backgroundColor: reward.color }}>
                <h3 className="voucher-name">{reward.name}</h3>
              </div>
              <div className="reward-bottom">
                Click to See More!
              </div>
            </div>
          ))}
        </div>
        <div className="rewards-button-container">
          <button className="view-all-rewards-btn" onClick={() => navigate('/rewards')}>
            View All Rewards
          </button>
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

export default RewardsSection;