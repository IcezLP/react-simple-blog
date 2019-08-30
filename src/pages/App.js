import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Layout components import
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

// Pages import
import Index from './index';

const App = () => (
  <Router>
    <Header />
    <Route exact path="/" component={Index} />
    <Footer />
  </Router>
);

export default App;
