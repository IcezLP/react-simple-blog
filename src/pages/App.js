import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Index from './index';

const App = () => (
  <Router>
    <Route exact path="/" component={Index} />
  </Router>
);

export default App;
