import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import './permanent.css';
import './home.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ImageHeader from './components/ImageHeader';
import PointsSection from './components/PointsSection';
import RewardsSection from './components/RewardsSection';
import FeedbackSection from './components/FeedbackSection';

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

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Header user={user} />
        <ImageHeader />
        <PointsSection user={user}/>
        <RewardsSection />
        <FeedbackSection />
      </div>
    </div>
  );
}

export default App;