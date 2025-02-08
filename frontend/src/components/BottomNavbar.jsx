import React, { useState  , useEffect } from 'react';
import { Home, Map, User, Settings } from 'lucide-react';
import './BottomNavbar.css';
function BottomNavbar() {
  const [activeTab, setActiveTab] = useState('home');
  useEffect(() => {
    const page = window.location.pathname;
    setActiveTab(page);
    console.log(page);
  }, [activeTab])
  
  const handleNavigation = (tab) => {
    setActiveTab(tab);
    
    window.location.href = `/${tab}`; 
    console.log(`Navigating to ${tab}`);
  };

  return (
    <nav className="bottom-navbar">
      <div className="bottom-navbar-container">
        <button 
          onClick={() => handleNavigation('home')}
          className={`nav-button ${activeTab === '/' ? 'active' : ''}`}
        >
          <Home size={24} />
          <span>Home</span>
        </button>
        <button 
          onClick={() => handleNavigation('map')}
          className={`nav-button ${activeTab === '/map' ? 'active' : ''}`}
        >
          <Map size={24} />
          <span>Map</span>
        </button>
        <button 
          onClick={() => handleNavigation('profile')}
          className={`nav-button ${activeTab === '/profile' ? 'active' : ''}`}
        >
          <User size={24} />
          <span>Profile</span>
        </button>
        <button 
          onClick={() => handleNavigation('settings')}
          className={`nav-button ${activeTab === '/settings' ? 'active' : ''}`}
        >
          <Settings size={24} />
          <span>Settings</span>
        </button>
      </div>
    </nav>
  );
}

export default BottomNavbar;