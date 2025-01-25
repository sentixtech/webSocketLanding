import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaCode, FaBookOpen, FaLightbulb, FaBars } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { path: '/', icon: <FaHome />, label: 'Getting Started' },
    { path: '/installation', icon: <FaCode />, label: 'Installation' },
    { path: '/basic-usage', icon: <FaBookOpen />, label: 'Basic Usage' },
    { path: '/examples', icon: <FaLightbulb />, label: 'Examples' },
  ];

  return (
    <>
      <button
        className="btn btn-primary d-md-none position-fixed"
        onClick={() => setIsOpen(!isOpen)}
        style={{ top: '1rem', right: '1rem', zIndex: 1031 }}
      >
        <FaBars />
      </button>

      <div className={`sidebar bg-light border-end ${isOpen ? 'show' : ''}`}>
        <div className="sidebar-header p-3 border-bottom">
          <h3 className="mb-0 text-primary">WebSocket</h3>
          <small className="text-muted d-block mt-1">PHP WebSocket Server</small>
        </div>
        
        <div className="sidebar-menu p-3">
          <div className="list-group list-group-flush">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`list-group-item list-group-item-action border-0 ${
                  location.pathname === item.path ? 'active' : ''
                }`}
                onClick={() => setIsOpen(false)}
              >
                <span className="me-2">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="sidebar-footer p-3 border-top mt-auto">
          <a 
            href="https://github.com/yourusername/websocket" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-outline-primary w-100"
          >
            View on GitHub
          </a>
        </div>
      </div>

      {isOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-md-none"
          style={{ zIndex: 1029 }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
