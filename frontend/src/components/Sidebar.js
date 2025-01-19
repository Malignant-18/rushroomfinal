import React from "react";

export default function Sidebar({ isOpen, onClose, toilet }) {
  if (!toilet) return null;

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={onClose}>
        ×
      </button>
      <h2>{toilet.name}</h2>
      <p>Location: {toilet.location}</p>
      <p>Condition: {toilet.condition}</p>
      <p>
        Facilities:
        {toilet.facilities?.baby_changing && " Baby Changing Station"}
        {toilet.facilities?.wheelchair_accessible && " Wheelchair Accessible"}
      </p>
    </div>
  );
}
