import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ImageHeader from './components/ImageHeader';
import PointsSection from './components/PointsSection';
import RewardsSection from './components/RewardsSection';
import FeedbackSection from './components/FeedbackSection';
import RewardsPage from './components/RewardsPage';
import FeedbackPage from './components/FeedbackPage';
import NotificationsPage from './components/NotificationsPage';
import ProfilePage from './components/ProfilePage';
import VouchersPage from './components/VouchersPage';
import { PointsProvider } from './context/PointsContext';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch("http://localhost/BradPoints/php-backend/check-auth.php", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          setAuthenticated(true);
          setUser(data.user);
          console.log(data);
        } else {
          window.location.href = "http://localhost/BradPoints/login.php";
        }
      });
  }, []);

  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    fetch("http://localhost/BradPoints/php-backend/get-rewards.php", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((rewardData) => {
        if (rewardData && Array.isArray(rewardData.rewards)) {
          setRewards(rewardData.rewards);
        } else {
          setRewards([]);
        }
      })
  }, []);

  console.log(user);

  const updateUserPoints = (newPoints) => {
    setUser((prevUser) => ({
      ...prevUser,
      points: newPoints
    }));
  }

  const allRewards = rewards || [];

  return (
    <PointsProvider points={Number(user?.points)} updateUserPoints={updateUserPoints}>
      <Router>
        <Routes>
          <Route path="/" element={
            <div className="app-layout">
              <Sidebar />
              <div className="main-content">
                <Header user={user} />
                <ImageHeader />
                <PointsSection user={user} />
                <RewardsSection />
                <FeedbackSection />
              </div>
            </div>
          } />
                  <Route path="/rewards" element={<RewardsPage user={user} rewards={allRewards} />} />
        <Route path="/feedback" element={<FeedbackPage user={user} />} />
        <Route path="/notifications" element={<NotificationsPage user={user} />} />
        <Route path="/profile" element={<ProfilePage user={user} />} />
        <Route path="/vouchers" element={<VouchersPage />} />
        </Routes>
      </Router>
    </PointsProvider>
  );
}

export default App;