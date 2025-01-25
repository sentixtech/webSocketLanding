import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

function Home() {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const handleCopy = () => {
    navigator.clipboard.writeText('composer require sentixtech/websoket')
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  const features = [
    {
      icon: '⚡',
      title: 'Zero Dependencies',
      description: 'Pure PHP implementation, no external packages required.'
    },
    {
      icon: '🚀',
      title: 'Auto Configuration',
      description: 'Automatic host, port, and SSL detection.'
    },
    {
      icon: '🔒',
      title: 'Secure Connections',
      description: 'Built-in SSL/TLS support for secure WebSocket connections.'
    },
    {
      icon: '🎯',
      title: 'Custom Channels',
      description: 'Create and manage multiple communication channels easily.'
    },
    {
      icon: '🔥',
      title: 'Event System',
      description: 'Robust built-in event system with custom event support.'
    },
    {
      icon: '📝',
      title: 'Easy Integration',
      description: 'Seamless integration with any PHP framework or setup.'
    }
  ];

  return (
    <div className="home-container">
      <section className="hero-section">
        <h1 className="hero-title">Free WebSocket Server for PHP</h1>
        <p className="hero-subtitle">A powerful, easy-to-use WebSocket server implementation for PHP applications.</p>
        <div className="hero-actions">
          <Link to="/docs" className="btn-primary">Get Started</Link>
        </div>
      </section>

      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="code-block">
        <div className="code-header">
          Quick Installation
          <button 
            className="copy-btn" 
            onClick={handleCopy}
            aria-label="Copy installation command"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <pre><code>composer require sentixtech/websoket</code></pre>
      </div>

      <section className="support-section">
        <h2 className="support-title">Need Support?</h2>
        <div className="support-grid">
          <div className="support-card">
            <h3>Contact Us</h3>
            <p>Email 1: sentixtech@gmail.com</p>
            <p>Email 2: info@sentixtech.com</p>
            <p>Website: sentixtech.com</p>
          </div>
          <div className="support-card">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/docs">Documentation</Link></li>
              <li><a href="https://github.com/sentixtech/websocket" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="mailto:info@sentixtech.com">Email Support</a></li>
            </ul>
          </div>
          <div className="support-card">
            <h3>Community</h3>
            <p>Join our community for updates, discussions, and support.</p>
            <a href="https://sentixtech.com" className="btn-primary">Visit Website</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
