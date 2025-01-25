import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Dropdown = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    if (item.link) {
      navigate(item.link);
      setIsOpen(false);
    }

    // If the item has nested items, toggle its own dropdown
    if (item.items) {
      item.isOpen = !item.isOpen;
    }
  };

  const renderItems = (items) => {
    return items.map((item, index) => (
      <div key={index} className="dropdown-item-wrapper">
        <div 
          className="dropdown-item"
          onClick={() => handleItemClick(item)}
        >
          {item.label}
          {item.items && (
            <span className={`dropdown-arrow ${item.isOpen ? 'open' : ''}`}>
              ▼
            </span>
          )}
        </div>
        {item.items && item.isOpen && (
          <div className="dropdown-submenu">
            {renderItems(item.items)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div 
      className="dropdown" 
      onBlur={() => setIsOpen(false)} 
      tabIndex={0}
    >
      <button 
        className="dropdown-toggle" 
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {title}
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>
          ▼
        </span>
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          {renderItems(items)}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
