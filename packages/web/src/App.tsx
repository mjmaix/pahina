import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import '@pahina/core';

import AppAuth from './AppAuth';

const App: React.FC = () => {
  return (
    <Router>
      <AppAuth />
    </Router>
  );
};

export default App;
