import React, { Component } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBIcon,
} from 'mdbreact';
import PropTypes from 'prop-types';

class Contact extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      message: '',
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {};

  render() {
    const { name, email, message } = this.state;

    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol md="6" className="py-5 offset-md-3">
            <MDBCard>
              <MDBCardBody>
                <p className="h4 text-center py-4">Contact</p>
                <MDBInput
                  label="Your name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={this.onChange}
                />
                <MDBInput
                  label="Your email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={this.onChange}
                />
                <MDBInput
                  label="Your message"
                  name="message"
                  type="textarea"
                  rows="2"
                  value={message}
                  onChange={this.onChange}
                />
                <div className="text-center py-4 mt-3">
                  <MDBBtn color="cyan" type="submit">
                    {/* eslint-disable-next-line */}
                    Send <MDBIcon far icon="paper-plane" className="ml-1" />
                  </MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default Contact;
