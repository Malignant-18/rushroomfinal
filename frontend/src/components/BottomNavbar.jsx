import React, { useState  , useEffect } from 'react';
import { Home, Map, User, Settings  ,School} from 'lucide-react';
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
          onClick={() => handleNavigation('')}
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
          onClick={() => handleNavigation('toilets/1')}
          className={`nav-button ${activeTab === '/toilets/1' ? 'active' : ''}`}
        >
          <School size={24} />
          <span>Rushroom</span>
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