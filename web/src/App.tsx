import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'unstated';

import AppAuth from './AppAuth';

const App: React.FC = () => {
  return (
    <Router>
      <Provider>
        <AppAuth />
      </Provider>
    </Router>
  );
};

export default App;
