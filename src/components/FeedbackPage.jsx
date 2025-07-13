import React, { useState } from 'react';
import './FeedbackPage.css';
import '../App.css';
import Sidebar from './Sidebar';
import Header from './Header';

const FeedbackPage = ({ user }) => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      rating: 4,
      content: "Amazing food and great service! The batchoy was delicious and the staff was very friendly. Will definitely come back again!",
      date: "December 15, 2024"
    },
    {
      id: 2,
      rating: 5,
      content: "Best siomai I've ever tasted! The combo meal was perfect and the portion size was generous. Highly recommended!",
      date: "November 28, 2024"
    },
    {
      id: 3,
      rating: 3,
      content: "Good food but the service was a bit slow during peak hours. The rice meals are tasty though!",
      date: "November 10, 2024"
    }
  ]);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const rating = parseInt(formData.get('rating'));
    const content = formData.get('feedback');
    
    if (!rating || !content.trim()) {
      alert("Please provide both a rating and review content!");
      return;
    }

    const review = {
      id: Date.now(),
      rating: rating,
      content: content,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };

    setReviews(prev => [review, ...prev]);
    
    // Reset the form
    e.target.reset();
    
    alert("Review submitted successfully!");
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Header user={user} />
        <div className="feedback-page">
          <div className="feedback-page-header">
            <h1>Feedback & Reviews</h1>
            <p>Share your experience about Braddex here! We look forward to serving you better.</p>
          </div>
          
          <div className="feedback-page-content">
            <div class="container">
                <form action="#" onSubmit={handleSubmitReview}>
                    <div class="rating">
                        <input type="radio" name="rating" id="star-5" value="5"></input>
                        <label for="star-5" class="star" aria-label="5 stars"></label>
                        <input type="radio" name="rating" id="star-4" value="4"></input>
                        <label for="star-4" class="star" aria-label="4 stars"></label>
                        <input type="radio" name="rating" id="star-3" value="3"></input>
                        <label for="star-3" class="star" aria-label="3 stars"></label>
                        <input type="radio" name="rating" id="star-2" value="2"></input>
                        <label for="star-2" class="star" aria-label="2 stars"></label>
                        <input type="radio" name="rating" id="star-1" value="1"></input>
                        <label for="star-1" class="star" aria-label="1 stars"></label>
                    </div>
                    <textarea class="textarea" id="feedback" name="feedback" placeholder="Share us your thoughts!"></textarea>
                    <button class="submit-btn">Submit</button>
                </form>
            </div>
          </div>

          <div className="past-reviews-section">
            <h2>Your Past Reviews</h2>
            <div className="reviews-container">
              {reviews.map((review) => (
                <div key={review.id} className="review-item">
                  <div className="review-header">
                    <div className="review-stars">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span 
                          key={star} 
                          className={`star ${star <= review.rating ? 'filled' : ''}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <div className="review-date">{review.date}</div>
                  </div>
                  <div className="review-content">
                    <p>"{review.content}"</p>
                  </div>
                </div>
              ))}
            </div>
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

export default FeedbackPage;