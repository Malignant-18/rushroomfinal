import React from "react";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ isOpen, onClose, toilet }) {
  const navigate = useNavigate();

  if (!toilet) return null;

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="sidebar-content">
          <h2>{toilet.name}</h2>
          <p><strong>Place:</strong> {toilet.place}</p>
          <p><strong>Type:</strong> {toilet.free ? "Free" : "Paid"}</p>
          {!toilet.free && <p><strong>Price:</strong> Rs. {toilet.price}</p>}
          <p><strong>Hours:</strong> {`From ${toilet.opening_hours} to ${toilet.closing_hours}`}</p>

          <button className="more-info-btn" onClick={() => navigate(`/toilets/${toilet.id}`)}>
            Click to Know More
          </button>
        </div>
      </div>
    </>
  );
}
