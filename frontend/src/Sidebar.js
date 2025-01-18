import React from 'react';

const Sidebar = ({ toilet, onClose }) => {
  // Return null if no toilet is selected
  if (!toilet) {
    return null;  // Avoid rendering the Sidebar if no toilet is selected
  }

  return (
    <div className="sidebar">
      <button onClick={onClose} className="close-btn">Close</button>
      <h2>{toilet.name}</h2>
      <p>{toilet.address}</p>
      <p>Accessible: {toilet.is_accessible ? 'Yes' : 'No'}</p>
      <p>Free: {toilet.is_free ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default Sidebar;
