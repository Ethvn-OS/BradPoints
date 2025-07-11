import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <img src="/Logo.png" alt="BradPoints Logo" className="sidebar-logo" />
      <nav className="sidebar-nav">
        <ul>
          <li><a href="#" className="active">Home</a></li>
          <li><a href="#">Points</a></li>
          <li><a href="http://localhost/BradPoints/rewards.php">Rewards</a></li>
          <li><a href="#">Notifications</a></li>
          <li><a href="#">Feedback</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar; 