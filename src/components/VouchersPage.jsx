import React, { useState, useEffect } from 'react';
import './VouchersPage.css';
import '../App.css';
import Sidebar from './Sidebar';
import Header from './Header';
import { usePoints } from '../context/PointsContext';

const VouchersPage = ({ user, rewards = [] }) => {
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [redeemedVouchers, setRedeemedVouchers] = useState([]);
  const [claimedStatuses, setClaimedStatuses] = useState({});
  const { isRewardRedeemed } = usePoints();
  const { isRewardClaimed } = usePoints();

  const allRewards = rewards || [];

  // Only show vouchers that have been redeemed (claimed)
  useEffect(() => {
    const fetchRedeemedVouchers = async () => {
      const redeemed = [];
      const claims = {};

      for (const reward of allRewards) {
        try {
          const isRedeemed = await isRewardRedeemed(reward.id);
          if (isRedeemed) {
            redeemed.push(reward);
            const isClaimed = await isRewardClaimed(reward.id);
            claims[reward.id] = isClaimed;
          }
        } catch (err) {
          console.error(`Error checking reward ${reward.id}:`, err);
        }
      }

      setRedeemedVouchers(redeemed);
      setClaimedStatuses(claims);
    };

    fetchRedeemedVouchers();
  }, [allRewards]);

  console.log('Redeemed Vouchers:', redeemedVouchers);

  console.log(rewards);

  const openModal = (voucher) => {
    setSelectedVoucher(voucher);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVoucher(null);
  };

  return (
    <>
      <div className="app-layout">
        <Sidebar />
        <div className="main-content">
          <Header user={user} />
          <div className="rewards-page">
            <div className="rewards-page-header">
              <h1>Redeemed Vouchers</h1>
              <p>Here are all the vouchers you have redeemed with your BradPoints!</p>
              <div className="reminder-box">
                Reminder: You have redeemed these vouchers, but you still need to claim your rewards in-store. Please claim your reward soon!
              </div>
            </div>
            <div className="rewards-grid">
              {redeemedVouchers.length === 0 ? (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#a22221', fontSize: '1.2rem', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  You haven't redeemed any vouchers yet.
                </div>
              ) : (
                redeemedVouchers.map((voucher) => (
                  <div key={voucher.id} className="reward-item" onClick={() => openModal(voucher)} style={{ cursor: 'pointer' }}>
                    <div className="reward-left-border" style={{ backgroundColor: voucher.reward_color }}></div>
                    <div className="reward-image-placeholder">
                      {voucher.reward_image
                        ? <img src={voucher.reward_image} alt={voucher.reward_name} className="reward-img" />
                        : <span role="img" aria-label="placeholder">📷</span>
                      }
                    </div>
                    <div className="reward-content">
                      <div className="reward-header" style={{ backgroundColor: voucher.reward_color }}>
                        <h3>{voucher.reward_name}</h3>
                        <span className="category-tag">{voucher.reward_category}</span>
                      </div>
                      <div className="reward-body">
                        <p className="reward-description">{voucher.reward_desc}</p>
                        <div className="reward-footer">
                          <span className="points-required">{voucher.reward_points} Points</span>
                          <button className="redeem-btn" disabled>Redeemed</button>
                          <span className="reward-status-text">
                            STATUS: {claimedStatuses[voucher.id] ? 'CLAIMED REWARD' : 'UNCLAIMED REWARD'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="back-to-home">
              <button onClick={() => window.history.back()} className="back-btn">
                ← Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && selectedVoucher && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedVoucher.reward_name}</h2>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              <p>{selectedVoucher.reward_desc}</p>
              <div style={{ color: '#a22221', fontWeight: 'bold', fontSize: '1rem', margin: '10px 0', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                {claimedStatuses[selectedVoucher.id] ? 'This voucher has been claimed!' : 'This voucher is redeemed, but the reward has not yet been claimed. Please claim your reward in-store soon!'}
              </div>
              <p><strong>Points Required: {selectedVoucher.reward_points}</strong></p>
            </div>
            <div className="modal-footer">
              <button className="claim-btn redeemed" disabled>
                Already Redeemed
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VouchersPage; 