import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

// Redux store import
import store from '../redux/store';

// Layout components import
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

// Pages import
import Index from './index';

const App = () => (
  <Provider store={store}>
    <Router>
      <Header />
      <Route exact path="/" component={Index} />
      <Footer />
    </Router>
  </Provider>
);

export default App;
