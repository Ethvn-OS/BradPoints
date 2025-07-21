import React, { useState } from 'react';
import './VouchersPage.css';
import '../App.css';
import Sidebar from './Sidebar';
import Header from './Header';
import { usePoints } from '../context/PointsContext';

const VouchersPage = () => {
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { redeemedRewards } = usePoints();

  const allRewards = [
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
  ];

  // Only show vouchers that have been redeemed (claimed)
  const redeemedVouchers = allRewards.filter(reward => redeemedRewards.has(reward.id));

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
          <Header />
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
                    <div className="reward-left-border" style={{ backgroundColor: voucher.color }}></div>
                    <div className="reward-image-placeholder">
                      {voucher.image
                        ? <img src={voucher.image} alt={voucher.name} className="reward-img" />
                        : <span role="img" aria-label="placeholder">📷</span>
                      }
                    </div>
                    <div className="reward-content">
                      <div className="reward-header" style={{ backgroundColor: voucher.color }}>
                        <h3>{voucher.name}</h3>
                        <span className="category-tag">{voucher.category}</span>
                      </div>
                      <div className="reward-body">
                        <p className="reward-description">{voucher.description}</p>
                        <div className="reward-footer">
                          <span className="points-required">{voucher.pointsRequired} Points</span>
                          <button className="redeem-btn" disabled>Redeemed</button>
                          <span className="reward-status-text">
                            STATUS: UNCLAIMED REWARD
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
              <h2>{selectedVoucher.name}</h2>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              <p>{selectedVoucher.description}</p>
              <div style={{ color: '#a22221', fontWeight: 'bold', fontSize: '1rem', margin: '10px 0', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                This voucher is redeemed, but the reward has not yet been claimed. Please claim your reward in-store soon!
              </div>
              <p><strong>Points Required: {selectedVoucher.pointsRequired}</strong></p>
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