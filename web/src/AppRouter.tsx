import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Dashboard from './screens/Dashboard';
import { EditorScreen } from './screens/EditorScreen';
import { NotesScreen } from './screens/NotesScreen';

function AppRouter() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Dashboard} />
        <Route path="/editor/:id?" component={EditorScreen} />
        <Route path="/notes/" component={NotesScreen} />
      </div>
    </Router>
  );
}

export default AppRouter;
