import { useState } from "react";

export default function Filter (){
    const FilterBar = ({ onApplyFilters }) => {
        const [attributes, setAttributes] = useState({
          wheelchairAccessible: false,
          babyChanging: false,
        });
      
        const applyFilters = () => {
          onApplyFilters(attributes);
        };
      
        return (
          <div style={{ padding: "10px", backgroundColor: "#f8f9fa", display: "flex", gap: "10px" }}>
            <label>
              <input
                type="checkbox"
                checked={attributes.wheelchairAccessible}
                onChange={(e) => setAttributes({ ...attributes, wheelchairAccessible: e.target.checked })}
              />
              Wheelchair Accessible
            </label>
            <label>
              <input
                type="checkbox"
                checked={attributes.babyChanging}
                onChange={(e) => setAttributes({ ...attributes, babyChanging: e.target.checked })}
              />
              Baby Changing
            </label>
            <button onClick={applyFilters}>Apply Filters</button>
          </div>
        );
      };
      
    
    
}