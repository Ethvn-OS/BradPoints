import React from 'react';
import './ImageHeader.css';

const ImageHeader = () => {
  return (
    <div className="rectangle imageHeader">
      <img src="/rectangle.png" alt="Braddex photo at landing page" />
      <div className="centeredText">
        <h3 className="image-title">bradpoints.</h3>
        <p className="image-desc">BradPoints is your next one stop shop to all things Braddex. Check all your recent purchases, find your next big reward, and tell us all about your unique Braddex experience here!</p>
      </div>
    </div>
  );
};

export default ImageHeader;