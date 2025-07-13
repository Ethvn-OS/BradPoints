import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FeedbackSection.css';

const FeedbackSection = () => {
  const navigate = useNavigate();

  return (
    <div className="section">
      <h2 className="heading">Feedback</h2>
      <div className="feedback-box">
        <div className="feedback-content">
          <div className="feedback-text-section">
            <h3 className="feedback-title">Share Your Experience</h3>
            <p className="feedback-description">
              We value your feedback! Tell us about your Braddex experience and help us improve our services. Your input helps us create better experiences for everyone.
            </p>
            <button className="feedback-button" onClick={() => navigate('/feedback')}>
              Access the Feedback Form Here
            </button>
          </div>
          <div className="feedback-image-section">
            <img 
              src="/feedbackPhoto.png" 
              alt="Feedback illustration" 
              className="feedback-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackSection; 