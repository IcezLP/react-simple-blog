import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, guest, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (guest.isAuthenticated ? <Component {...props} /> : <Redirect to="/404" />)}
  />
);

PrivateRoute.propTypes = {
  guest: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  guest: state.guest,
});

export default connect(mapStateToProps)(PrivateRoute);
