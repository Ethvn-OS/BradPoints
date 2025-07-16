import React, { useState, useEffect } from 'react';
import './FeedbackPage.css';
import '../App.css';
import Sidebar from './Sidebar';
import Header from './Header';

const FeedbackPage = ({ user }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
      fetch('http://localhost/BradPoints/php-backend/fetch-feedback.php')
      .then(res => res.json())
      .then(data => setReviews(data))
      .catch(err => console.error('Error fetching feedback:', err));
  }, []);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const rating = parseInt(formData.get('rating'));
    const content = formData.get('feedback');
    
    if (!rating || !content.trim()) {
      alert("Please provide both a rating and review content!");
      return;
    }

    try {
      const response = await fetch('http://localhost/BradPoints/php-backend/save-feedback.php', {
        credentials: 'include',
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        setReviews(prev => [
          {
            id: result.review_id,
            rating: rating,
            content: content,
            date: new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })
          },
          ...prev
        ]);
        e.target.reset();
        alert("Review submitted successfully!");
      } else {
        alert("Failed to submit review: " + result.message);
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("An error occurred while submitting feedback.");
    }
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
            <div className="container">
              <form onSubmit={handleSubmitReview}>
                <div className="rating">
                  {[5, 4, 3, 2, 1].map(star => (
                    <React.Fragment key={star}>
                      <input type="radio" name="rating" id={`star-${star}`} value={star} required />
                      <label htmlFor={`star-${star}`} className="star" aria-label={`${star} stars`}></label>
                    </React.Fragment>
                  ))}
                </div>
                <textarea className="textarea" name="feedback" placeholder="Share us your thoughts!"></textarea>
                <input type="hidden" name="user_id" value={user?.id} />
                <button type="submit" className="submit-btn">Submit</button>
              </form>
            </div>
          </div>

          <div className="past-reviews-section">
            <h2>Recently Published</h2>
            <div className="reviews-container">
              {reviews.map((review) => (
                <div key={review.id} className="review-item">
                  <div className="review-header">
                    <div className="review-stars">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className={`star ${star <= review.rating ? 'filled' : ''}`}>★</span>
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
            <button onClick={() => window.history.back()} className="back-btn">← Back to Home</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;

/*
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
*/