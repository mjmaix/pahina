import React from 'react';

import logo from '../logo.svg';
import './Dashboard.css';
import './Screen.css';

const Dashboard: React.FC = () => {
  return (
    <div className="Screen App">
      {
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Welcome to Pahina
          </a>
        </header>
      }
    </div>
  );
};

export default Dashboard;
