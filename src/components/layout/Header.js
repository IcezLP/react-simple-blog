import React, { Component } from 'react';
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavLink,
} from 'mdbreact';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logOutUser } from '../../redux/actions/guestActions';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      isOpen: false,
    };
  }

  render() {
    const { isOpen } = this.state;
    const { isAuthenticated } = this.props.guest;

    const authMenu = (
      <MDBNavbarNav right>
        <MDBNavItem>
          <MDBNavLink to="/manage">Manage</MDBNavLink>
        </MDBNavItem>
        <MDBNavItem>
          <MDBNavLink to="/contact">Contact</MDBNavLink>
        </MDBNavItem>
        <MDBNavItem>
          <MDBNavLink to="/" onClick={() => this.props.logOutUser()}>
            Logout
          </MDBNavLink>
        </MDBNavItem>
      </MDBNavbarNav>
    );

    const guestMenu = (
      <MDBNavbarNav right>
        <MDBNavItem>
          <MDBNavLink to="/contact">Contact</MDBNavLink>
        </MDBNavItem>
        <MDBNavItem>
          <MDBNavLink to="/login">Login</MDBNavLink>
        </MDBNavItem>
      </MDBNavbarNav>
    );

    return (
      <MDBNavbar color="cyan" dark expand="md">
        <MDBNavbarBrand className="white-text">
          <Link to="/" className="white-text">
            React Simple Blog
          </Link>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={() => this.setState({ isOpen: !isOpen })} />
        <MDBCollapse isOpen={isOpen} navbar>
          <MDBNavbarNav right>{isAuthenticated ? authMenu : guestMenu}</MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
  }
}

Header.propTypes = {
  logOutUser: PropTypes.func.isRequired,
  guest: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  guest: state.guest,
});

export default connect(
  mapStateToProps,
  { logOutUser },
)(Header);
