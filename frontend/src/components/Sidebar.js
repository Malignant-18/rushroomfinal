import React from "react";
import './Sidebar.css';

export default function Sidebar({ isOpen, onClose, toilet }) {
  if (!toilet) return null;

  return (<>
    {isOpen && (
      <div 
        className="sidebar-overlay"
        onClick={onClose}
      />
    )}
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        <div className="sidebar-content">
      <h2>{toilet.name}</h2>
      <p>Location: {toilet.location}</p>
      <p>Condition: {toilet.condition}</p>
      <p>
        Facilities:
        {toilet.facilities?.baby_changing && " Baby Changing Station"}
        {toilet.facilities?.wheelchair_accessible && " Wheelchair Accessible"}
      </p>
    </div>
    </div>
    </>
  );
}
  

