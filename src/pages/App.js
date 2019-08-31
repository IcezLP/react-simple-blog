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
import Login from './login';
import Post from './post';
import Contact from './contact';

const App = () => (
  <Provider store={store}>
    <Router>
      <Header />
      <Route exact path="/" component={Index} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/post/:slug" component={Post} />
      <Route exact path="/contact" component={Contact} />
      <Footer />
    </Router>
  </Provider>
);

export default App;
