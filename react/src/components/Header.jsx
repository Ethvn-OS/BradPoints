import React, { useState } from 'react';
import './Header.css';

const Header = () => {
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
        <div className="welcome-message">Welcome back, (username)!</div>
        <div className="slogan">It's a good day to visit your nearest Braddex.</div>
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
            <li><a href="#">Profile</a></li>
            <li><a href="#">Edit Profile</a></li>
            <li><a href="#">User Guide</a></li>
            <li><a href="/login">Log Out</a></li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Header;