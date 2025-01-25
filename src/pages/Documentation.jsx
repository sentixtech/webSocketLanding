import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaGithub, FaBars, FaTimes, FaCode, FaServer, FaLock, FaBolt, FaTools, FaCloud, FaBook, FaLaptopCode, FaBug } from 'react-icons/fa';
import './Documentation.css';

// Import graphics
import webSocketHero from '../assets/websocket-hero.svg';
import realTimeIcon from '../assets/realtime-icon.svg';
import secureIcon from '../assets/secure-icon.svg';
import scaleIcon from '../assets/scale-icon.svg';

function Documentation() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('gettingStarted');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const sectionParam = searchParams.get('section');
    
    if (sectionParam && sections[sectionParam]) {
      setActiveSection(sectionParam);
    }
  }, [location.search]);

  const sections = {
    gettingStarted: {
      title: 'Getting Started',
      icon: <FaCode />,
      subsections: ['Introduction', 'Installation', 'Quick Start'],
      image: webSocketHero
    },
    basicUsage: {
      title: 'Basic Usage',
      icon: <FaServer />,
      subsections: ['Server Setup', 'Client Setup', 'Basic Example'],
      image: realTimeIcon
    },
    features: {
      title: 'Features',
      icon: <FaBolt />,
      subsections: ['Real-time Events', 'Broadcasting', 'Private Channels']
    },
    security: {
      title: 'Security',
      icon: <FaLock />,
      subsections: ['Authentication', 'SSL/TLS', 'Best Practices'],
      image: secureIcon
    },
    advanced: {
      title: 'Advanced',
      icon: <FaTools />,
      subsections: ['Custom Protocols', 'Load Balancing', 'Scaling'],
      image: scaleIcon
    },
    deployment: {
      title: 'Deployment',
      icon: <FaCloud />,
      subsections: ['Production Setup', 'Docker', 'Cloud Hosting']
    },
    api: {
      title: 'API Reference',
      icon: <FaBook />,
      subsections: ['Server API', 'Client API', 'Events']
    },
    examples: {
      title: 'Examples',
      icon: <FaLaptopCode />,
      subsections: ['Chat App', 'Game Server', 'IoT']
    },
    troubleshooting: {
      title: 'Troubleshooting',
      icon: <FaBug />,
      subsections: ['Common Issues', 'Debug Mode', 'FAQ']
    }
  };

  return (
    <div className="doc-wrapper">
      {/* Navbar */}
      <nav className="doc-navbar">
        <div className="nav-content">
          <div className="nav-left">
            <button 
              className="menu-toggle"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              aria-label="Toggle Menu"
            >
              {isSidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
            <div className="nav-logo">
              <img src={webSocketHero} alt="WebSoket Logo" className="nav-logo-img" />
              <h1 className="nav-title">WebSoket</h1>
            </div>
          </div>
          <div className="nav-right">
            <a href="https://github.com/sentixtech/websocket.git" className="github-link" target="_blank" rel="noopener noreferrer">
              <FaGithub /> GitHub
            </a>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <div className="doc-container">
        {/* Sidebar */}
        <aside className={`doc-sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-content">
            {Object.entries(sections).map(([key, section]) => (
              <div key={key} className="sidebar-section">
                <button
                  className={`section-button ${activeSection === key ? 'active' : ''}`}
                  onClick={() => {
                    setActiveSection(key);
                    if (window.innerWidth < 768) {
                      setIsSidebarOpen(false);
                    }
                    // Update URL without page reload
                    window.history.replaceState(
                      null, 
                      '', 
                      `${window.location.pathname}?section=${key}`
                    );
                  }}
                >
                  <span className="section-icon">{section.icon}</span>
                  {section.title}
                </button>
                <div className={`subsections ${activeSection === key ? 'show' : ''}`}>
                  {section.subsections.map((sub, idx) => (
                    <button key={idx} className="subsection-button">
                      {sub}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="doc-content">
          <div className="content-inner">
            {Object.entries(sections).map(([key, section]) => (
              activeSection === key && (
                <div key={key} className="content-section">
                  <div className="section-header">
                    <div className="section-info">
                      <span className="section-icon-large">{section.icon}</span>
                      <h1 className="section-title">{section.title}</h1>
                    </div>
                    {section.image && (
                      <div className="section-image">
                        <img src={section.image} alt={section.title} />
                      </div>
                    )}
                  </div>
                  
                  {/* Content Cards */}
                  <div className="card-grid">
                    {section.subsections.map((subsection, idx) => (
                      <div key={idx} className="content-card">
                        <div className="card-header">
                          <span className="card-icon">{section.icon}</span>
                          <h2>{subsection}</h2>
                        </div>
                        <div className="card-content">
                          <div className="code-block">
                            <div className="code-header">
                              <span>Example</span>
                              <button className="copy-button">
                                <FaCode /> Copy
                              </button>
                            </div>
                            <pre><code>{`// ${subsection} example
const ws = new WebSocket('ws://localhost:8080');
ws.onmessage = (event) => {
    console.log(event.data);
};`}</code></pre>
                          </div>
                          <p className="card-description">
                            Learn how to implement {subsection.toLowerCase()} in your WebSocket application.
                            This section covers all the essential concepts and best practices.
                          </p>
                          <div className="card-footer">
                            <button className="learn-more">
                              Learn More
                              <span className="button-icon">→</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Documentation;
