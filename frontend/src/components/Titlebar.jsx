import React, { useState, useEffect } from 'react';

import './Titlebar.css';

function Titlebar() {
  const [isHidden, setIsHidden] = useState(false);


  useEffect(() => {
    if(window.location.pathname !== '/map'){
    const handleScroll = () => {
      setIsHidden(window.scrollY > 1); // Adjust threshold as needed
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }}, []);

  return (
    <div className={`navbar ${isHidden ? 'hidden' : ''}`}>  
      <div className="navbar-container">
        <h1 className="site-title">RushRoom</h1>
      </div>
    </div>
  );
}

export default Titlebar;

        // <div className="search-container">
        //   <input 
        //     type="text" 
        //     placeholder="Search toilets, locations..." 
        //     value={searchTerm} 
        //     onChange={(e) => setSearchTerm(e.target.value)} 
        //     className="search-input"
        //   />
        //   <Search className="search-icon" size={20} />
        // </div>