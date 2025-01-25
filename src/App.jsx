import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Documentation from './pages/Documentation';
import Home from './pages/Home';
import Examples from './pages/Examples';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/docs" element={<Documentation />} />
            <Route path="/examples" element={<Examples />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
