import React, { useState } from 'react';
import { Search } from 'lucide-react';
import './Navbar.css';

function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="navbar">
      <div className="navbar-container">
        <h1 className="site-title">RushRoom</h1>
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search toilets, locations..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="search-input"
          />
          <Search className="search-icon" size={20} />
        </div>
      </div>
    </div>
  );
}

export default Navbar;