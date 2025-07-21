import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RewardsSection.css';
import { usePoints } from '../context/PointsContext';

const RewardsSection = ({ sectionRewards = [] }) => {
  const [selectedReward, setSelectedReward] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { redeemReward, isRewardRedeemed, canRedeemReward } = usePoints();
  const [isRedeemed, setIsRedeemed] = useState(false);
  const [checkingRedeemed, setCheckingRedeemed] = useState(true);

  const rewards = sectionRewards || [];

  const openModal = async (reward) => {
    setSelectedReward(reward);
    setIsModalOpen(true);
    setCheckingRedeemed(true);
    const redeemed = await isRewardRedeemed(reward.id);
    setIsRedeemed(redeemed);
    setCheckingRedeemed(false);
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReward(null);
  };

  const claimReward = () => {
    const success = redeemReward(selectedReward);
    if (success) {
      closeModal();
    }
  };

  return (
    <>
      <div className="section">
        <h2 className="heading">Rewards</h2>
        <div className="rewards-container">
          {rewards.slice(0, 3).map((reward) => (
            <div
              key={reward.id}
              className="reward-card"
              onClick={() => openModal(reward)}
              role="button"
              tabIndex={0}
              onKeyPress={e => { if (e.key === 'Enter') openModal(reward); }}
            >
              <div className="reward-top" style={{ backgroundColor: reward.reward_color }}>
                <h3 className="voucher-name">{reward.reward_name}</h3>
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
              <h2>{selectedReward.reward_name}</h2>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              <p>{selectedReward.reward_desc}</p>
              <p><strong>Points Required: {selectedReward.reward_points}</strong></p>
            </div>
            <div className="modal-footer">
              {checkingRedeemed ? (
                <button className="claim-btn" disabled>Checking...</button>
              ) : isRedeemed ? (
                <button className="claim-btn redeemed" disabled>
                  Already Redeemed
                </button>
              ) : !canRedeemReward(selectedReward.reward_points) ? (
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