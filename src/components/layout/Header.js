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

class Header extends Component {
  constructor() {
    super();

    this.state = {
      isOpen: false,
    };
  }

  render() {
    const { isOpen } = this.state;

    return (
      <MDBNavbar color="blue" dark expand="md">
        <MDBNavbarBrand className="white-text">
          <Link to="/" className="white-text">
            React Simple Blog
          </Link>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={() => this.setState({ isOpen: !isOpen })} />
        <MDBCollapse isOpen={isOpen} navbar>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBNavLink to="/login">Login</MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
  }
}

export default Header;
