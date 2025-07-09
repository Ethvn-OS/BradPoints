import React from 'react';
import './FeedbackSection.css';

const FeedbackSection = () => {
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
            <button className="feedback-button">
              Feedback Form
            </button>
          </div>
          <div className="feedback-image-section">
            <div className="image-placeholder">
              <span>Image Placeholder</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackSection; 