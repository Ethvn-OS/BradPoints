import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  return (
    <div className="sidebar">
      <img src="/Logo.png" alt="BradPoints Logo" className="sidebar-logo" />
      <nav className="sidebar-nav">
        <ul>
          <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
          <li><Link to="/rewards" className={location.pathname === '/rewards' ? 'active' : ''}>Rewards</Link></li>
          <li><Link to="/vouchers" className={location.pathname === '/vouchers' ? 'active' : ''}>Vouchers</Link></li>
          <li><Link to="/notifications" className={location.pathname === '/notifications' ? 'active' : ''}>Notifications</Link></li>
          <li><Link to="/feedback" className={location.pathname === '/feedback' ? 'active' : ''}>Feedback</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar; 