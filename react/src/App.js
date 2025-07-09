import React from 'react';
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
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <ImageHeader />
        <PointsSection />
        <RewardsSection />
        <FeedbackSection />
      </div>
    </div>
  );
}

export default App;