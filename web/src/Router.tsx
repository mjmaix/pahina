import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Dashboard from './screens/Dashboard';
import { EditorScreen } from './screens/EditorScreen';

function Users() {
  return <h2>Users</h2>;
}

function AppRouter() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Dashboard} />
        <Route path="/editor/" component={EditorScreen} />
        <Route path="/users/" component={Users} />
      </div>
    </Router>
  );
}

export default AppRouter;
