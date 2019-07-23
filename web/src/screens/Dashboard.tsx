import React, { useEffect } from 'react';

import logo from '../logo.svg';
import './Dashboard.css';
import './Screen.css';
import { Auth } from 'aws-amplify';

const Dashboard: React.FC = () => {
  useEffect(() => {
    Auth.currentSession().then(currentSession => {
      console.log(
        'currentSession.getIdToken().getJwtToken()',
        currentSession.getIdToken().getJwtToken(),
      );
    });
  });
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
