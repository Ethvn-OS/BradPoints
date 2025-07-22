import React, { useState, useEffect } from 'react';
import './Notifications.css';
import '../App.css';
import Sidebar from './Sidebar';
import Header from './Header';
import { usePoints } from '../context/PointsContext';

const NotificationsPage = ({ user }) => {
  const { notifications, setNotifications } = usePoints();

  // Mark notification as read
  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  // Get unread count
  const unreadCount = notifications.filter(notification => !notification.read).length;

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Header user={user}/>
        <div className="notifications-page">
          <div className="notifications-header">
            <h1>Notifications</h1>
            <p>Stay updated with your latest rewards and announcements</p>
            {unreadCount > 0 && (
              <button className="mark-all-read-btn" onClick={markAllAsRead}>
                Mark all as read
              </button>
            )}
          </div>

          <div className="notifications-container">
            {notifications.length === 0 ? (
              <div className="no-notifications">
                <p>No notifications yet</p>
                <p>You'll see notifications here when you redeem rewards or when new rewards become available.</p>
              </div>
            ) : (
              [...notifications].reverse().map((notification) => (
                <div
                  key={notification.id}
                  className={`notification-item ${!notification.read ? 'unread' : ''}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="notification-icon">
                    {notification.type === 'redemption' ? '🎉' : '🎊'}
                  </div>
                  <div className="notification-content">
                    <div className="notification-header">
                      <h3 className="notification-title">{notification.title}</h3>
                      <span className="notification-time">{formatTimestamp(notification.timestamp)}</span>
                    </div>
                    <p className="notification-message">{notification.message}</p>
                  </div>
                  {!notification.read && <div className="unread-indicator"></div>}
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
  );
};

export default NotificationsPage; 