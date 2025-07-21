import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = ({ user }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = (e) => {
    if (!e.target.closest('.profile-dropdown')) {
      setIsDropdownOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', closeDropdown);
    return () => document.removeEventListener('click', closeDropdown);
  }, []);

  return (
    <div className="header-bar">
      <div className="header-left">
        <div className="welcome-message">Welcome back, {user.user_name}!</div>
        <div className="slogan">User ID: {user.id}</div>
      </div>
      <div className="profile-dropdown">
        <img 
          src="/userProfile.png" 
          alt="User Icon" 
          className="user-icon" 
          onClick={toggleDropdown}
        />
        {isDropdownOpen && (
          <ul className="dropdown-menu">
            <li><Link to="/profile">Profile</Link></li>
            <li><a href="#">User Guide</a></li>
            <li><a href="http://localhost/BradPoints/logout.php">Log Out</a></li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Header;