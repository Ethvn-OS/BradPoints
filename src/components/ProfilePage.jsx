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
    email: 'alagon06.yza@gmail.com',
    phone: '09664006380',
    memberSince: 'January 2023',
    memberId: 'BP123456789',
    totalPoints: 2450,
    tier: 'Gold',
    preferences: {
      emailNotifications: true,
      smsNotifications: false,
      marketingEmails: true
    }
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
    // In a real app, you would save to backend here
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data if needed
  };

  const renderProfileTab = () => (
    <div className="profile-page-profile-tab">
      <div className="profile-page-header">
        <div className="profile-page-avatar">
          <img src="/userProfile.png" alt="Profile" />
        </div>
        <div className="profile-page-info">
          <h2>{userData.firstName} {userData.lastName}</h2>
          <p className="profile-page-member-id">Member ID: {userData.memberId}</p>
          <p className="profile-page-member-since">Member since {userData.memberSince}</p>
          <div className="profile-page-tier-badge">
            <span className={`profile-page-tier ${userData.tier.toLowerCase()}`}>{userData.tier}</span>
          </div>
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
            <label>Email Address</label>
            {isEditing ? (
              <input 
                type="email" 
                value={userData.email}
                onChange={(e) => setUserData({...userData, email: e.target.value})}
              />
            ) : (
              <p>{userData.email}</p>
            )}
          </div>
          
          <div className="profile-page-form-group">
            <label>Phone Number</label>
            {isEditing ? (
              <input 
                type="tel" 
                value={userData.phone}
                onChange={(e) => setUserData({...userData, phone: e.target.value})}
              />
            ) : (
              <p>{userData.phone}</p>
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
        <div className="profile-page-points-card">
          <h3>Member Tier</h3>
          <div className="profile-page-tier-display">{userData.tier}</div>
          <p>Current Level</p>
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

  const renderPreferencesTab = () => (
    <div className="profile-page-preferences-tab">
      <h3>Notification Preferences</h3>
      
      <div className="profile-page-preference-item">
        <div className="profile-page-preference-info">
          <h4>Email Notifications</h4>
          <p>Receive updates about your points, rewards, and special offers via email</p>
        </div>
        <label className="profile-page-toggle">
          <input 
            type="checkbox" 
            checked={userData.preferences.emailNotifications}
            onChange={(e) => setUserData({
              ...userData, 
              preferences: {
                ...userData.preferences,
                emailNotifications: e.target.checked
              }
            })}
          />
          <span className="profile-page-slider"></span>
        </label>
      </div>

      <div className="profile-page-preference-item">
        <div className="profile-page-preference-info">
          <h4>SMS Notifications</h4>
          <p>Get text messages for important updates and promotions</p>
        </div>
        <label className="profile-page-toggle">
          <input 
            type="checkbox" 
            checked={userData.preferences.smsNotifications}
            onChange={(e) => setUserData({
              ...userData, 
              preferences: {
                ...userData.preferences,
                smsNotifications: e.target.checked
              }
            })}
          />
          <span className="profile-page-slider"></span>
        </label>
      </div>

      <div className="profile-page-preference-item">
        <div className="profile-page-preference-info">
          <h4>Marketing Emails</h4>
          <p>Receive promotional emails about new products and special offers</p>
        </div>
        <label className="profile-page-toggle">
          <input 
            type="checkbox" 
            checked={userData.preferences.marketingEmails}
            onChange={(e) => setUserData({
              ...userData, 
              preferences: {
                ...userData.preferences,
                marketingEmails: e.target.checked
              }
            })}
          />
          <span className="profile-page-slider"></span>
        </label>
      </div>

      <div className="profile-page-preferences-actions">
        <button className="profile-page-save-preferences-btn">Save Preferences</button>
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
        <h4>Two-Factor Authentication</h4>
        <p>Add an extra layer of security to your account</p>
        <button className="profile-page-setup-2fa-btn">Set Up 2FA</button>
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
                className={`profile-page-tab ${activeTab === 'preferences' ? 'active' : ''}`}
                onClick={() => setActiveTab('preferences')}
              >
                Preferences
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
              {activeTab === 'preferences' && renderPreferencesTab()}
              {activeTab === 'security' && renderSecurityTab()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 