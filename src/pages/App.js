import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import { LOGGED } from '../redux/types';
import PrivateRoute from '../components/commons/PrivateRoute';

// Redux store import
import store from '../redux/store';

// Layout components import
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Notification from '../components/commons/Notification';

// Pages import
import Index from './index';
import Login from './login';
import Post from './post';
import Contact from './contact';
import Manage from './manage';
import Add from './add';
import Edit from './edit';
import notFound from './not-found';

if (localStorage.token) {
  setAuthToken(localStorage.token);
  const decoded = decode(localStorage.token);
  store.dispatch({ type: LOGGED, payload: decoded });
}

const App = () => (
  <Provider store={store}>
    <Router>
      <Header />
      <Notification />
      <Route exact path="/404" component={notFound} />
      <Route exact path="/" component={Index} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/post/:slug" component={Post} />
      <Route exact path="/contact" component={Contact} />
      <Switch>
        <PrivateRoute exact path="/manage" component={Manage} />
      </Switch>
      <Switch>
        <PrivateRoute exact path="/manage/add" component={Add} />
      </Switch>
      <Switch>
        <PrivateRoute exact path="/manage/edit/:slug" component={Edit} />
      </Switch>
      <Footer />
    </Router>
  </Provider>
);

export default App;
