import React from 'react';
import '../App.css';

function Examples() {
  return (
    <div>
      <h1 className="section-title">Example Use Cases</h1>
      <div className="features-grid">
        <div className="feature-card">
          <h3>Real-time Chat</h3>
          <p>Build chat applications with real-time message delivery.</p>
        </div>
        <div className="feature-card">
          <h3>Live Notifications</h3>
          <p>Send instant notifications to users.</p>
        </div>
        <div className="feature-card">
          <h3>Game Updates</h3>
          <p>Real-time multiplayer game state synchronization.</p>
        </div>
      </div>
    </div>
  );
}

export default Examples;
