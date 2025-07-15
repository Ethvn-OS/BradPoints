import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import './ProfilePage.css';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  
  // Local storage user data 
  const [userData, setUserData] = useState({
    firstName: 'Yza',
    lastName: 'Alagon',
    username: 'yzayza',
    password: '12345678',
    memberSince: 'January 2023',
    totalPoints: 36
  });

  const [pointsHistory] = useState([
    { date: '2024-01-15', description: 'Coffee Purchase', points: 50, type: 'earned' },
    { date: '2024-01-10', description: 'Redeemed Reward', points: -200, type: 'redeemed' },
    { date: '2024-01-05', description: 'Lunch Purchase', points: 75, type: 'earned' },
    { date: '2023-12-28', description: 'Birthday Bonus', points: 100, type: 'bonus' },
    { date: '2023-12-20', description: 'Holiday Special', points: 25, type: 'earned' }
  ]);

  const handleSave = () => {
    setIsEditing(false);
    // backend 
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const renderProfileTab = () => (
    <div className="profile-page-profile-tab">
      <div className="profile-page-header">
        <div className="profile-page-avatar">
          <img src="/userProfile.png" alt="Profile" />
        </div>
        <div className="profile-page-info">
          <h2>{userData.firstName} {userData.lastName}</h2>
          <p className="profile-page-member-since">Member since {userData.memberSince}</p>
        </div>
        <div className="profile-page-stats">
          <div className="profile-page-stat">
            <span className="profile-page-stat-value">{userData.totalPoints}</span>
            <span className="profile-page-stat-label">Total Points</span>
          </div>
        </div>
      </div>

      <div className="profile-page-details">
        <div className="profile-page-section-header">
          <h3>Personal Information</h3>
          {!isEditing && (
            <button className="profile-page-edit-btn" onClick={() => setIsEditing(true)}>
              Edit
            </button>
          )}
        </div>
        
        <div className="profile-page-form-section">
          <div className="profile-page-form-row">
            <div className="profile-page-form-group">
              <label>First Name</label>
              {isEditing ? (
                <input 
                  type="text" 
                  value={userData.firstName}
                  onChange={(e) => setUserData({...userData, firstName: e.target.value})}
                />
              ) : (
                <p>{userData.firstName}</p>
              )}
            </div>
            <div className="profile-page-form-group">
              <label>Last Name</label>
              {isEditing ? (
                <input 
                  type="text" 
                  value={userData.lastName}
                  onChange={(e) => setUserData({...userData, lastName: e.target.value})}
                />
              ) : (
                <p>{userData.lastName}</p>
              )}
            </div>
          </div>
          
          <div className="profile-page-form-group">
            <label>Username</label>
            {isEditing ? (
              <input 
                type="text" 
                value={userData.username}
                onChange={(e) => setUserData({...userData, username: e.target.value})}
              />
            ) : (
              <p>{userData.username}</p>
            )}
          </div>
          
          <div className="profile-page-form-group">
            <label>Password</label>
            {isEditing ? (
              <input 
                type="password" 
                value={userData.password}
                onChange={(e) => setUserData({...userData, password: e.target.value})}
              />
            ) : (
              <p>••••••••</p>
            )}
          </div>

          {isEditing && (
            <div className="profile-page-form-actions">
              <button className="profile-page-save-btn" onClick={handleSave}>Save Changes</button>
              <button className="profile-page-cancel-btn" onClick={handleCancel}>Cancel</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderPointsTab = () => (
    <div className="profile-page-points-tab">
      <div className="profile-page-points-summary">
        <div className="profile-page-points-card">
          <h3>Current Balance</h3>
          <div className="profile-page-points-display">{userData.totalPoints}</div>
          <p>points</p>
        </div>
      </div>

      <div className="profile-page-points-history">
        <h3>Points History</h3>
        <div className="profile-page-history-list">
          {pointsHistory.map((transaction, index) => (
            <div key={index} className={`profile-page-history-item ${transaction.type}`}>
              <div className="profile-page-history-info">
                <span className="profile-page-description">{transaction.description}</span>
                <span className="profile-page-date">{new Date(transaction.date).toLocaleDateString()}</span>
              </div>
              <div className={`profile-page-points ${transaction.type}`}>
                {transaction.points > 0 ? '+' : ''}{transaction.points}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="profile-page-security-tab">
      <h3>Account Security</h3>
      
      <div className="profile-page-security-section">
        <h4>Change Password</h4>
        <div className="profile-page-password-form">
          <div className="profile-page-form-group">
            <label>Current Password</label>
            <input type="password" placeholder="Enter current password" />
          </div>
          <div className="profile-page-form-group">
            <label>New Password</label>
            <input type="password" placeholder="Enter new password" />
          </div>
          <div className="profile-page-form-group">
            <label>Confirm New Password</label>
            <input type="password" placeholder="Confirm new password" />
          </div>
          <button className="profile-page-change-password-btn">Change Password</button>
        </div>
      </div>

      <div className="profile-page-security-section">
        <h4>Account Actions</h4>
        <div className="profile-page-account-actions">
          <button className="profile-page-danger-btn">Deactivate Account</button>
          <button className="profile-page-danger-btn">Delete Account</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="profile-page-container">
          <div className="profile-page-main-container">
            <div className="profile-page-tabs">
              <button 
                className={`profile-page-tab ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                Profile
              </button>
              <button 
                className={`profile-page-tab ${activeTab === 'points' ? 'active' : ''}`}
                onClick={() => setActiveTab('points')}
              >
                Points & History
              </button>
              <button 
                className={`profile-page-tab ${activeTab === 'security' ? 'active' : ''}`}
                onClick={() => setActiveTab('security')}
              >
                Security
              </button>
            </div>

            <div className="profile-page-tab-content">
              {activeTab === 'profile' && renderProfileTab()}
              {activeTab === 'points' && renderPointsTab()}
              {activeTab === 'security' && renderSecurityTab()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 