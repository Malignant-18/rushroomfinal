import React, { useState } from 'react';
import { Home, Map, User, Settings } from 'lucide-react';
import './BottomNavbar.css';

function BottomNavbar() {
  const [activeTab, setActiveTab] = useState('home');

  const handleNavigation = (tab) => {
    setActiveTab(tab);
    // Add your navigation logic here
    console.log(`Navigating to ${tab}`);
  };

  return (
    <nav className="bottom-navbar">
      <div className="bottom-navbar-container">
        <button 
          onClick={() => handleNavigation('home')}
          className={`nav-button ${activeTab === 'home' ? 'active' : ''}`}
        >
          <Home size={24} />
          <span>Home</span>
        </button>
        <button 
          onClick={() => handleNavigation('map')}
          className={`nav-button ${activeTab === 'map' ? 'active' : ''}`}
        >
          <Map size={24} />
          <span>Map</span>
        </button>
        <button 
          onClick={() => handleNavigation('profile')}
          className={`nav-button ${activeTab === 'profile' ? 'active' : ''}`}
        >
          <User size={24} />
          <span>Profile</span>
        </button>
        <button 
          onClick={() => handleNavigation('settings')}
          className={`nav-button ${activeTab === 'settings' ? 'active' : ''}`}
        >
          <Settings size={24} />
          <span>Settings</span>
        </button>
      </div>
    </nav>
  );
}

export default BottomNavbar;