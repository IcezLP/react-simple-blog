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
import { connect } from 'react-redux';
import { sendEmail } from '../../redux/actions/guestActions';
import { newNotification } from '../../components/commons/Notification';

class Contact extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      message: '',
      errors: {},
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { success } = nextProps.guest;

    if (success) {
      newNotification('Email sent', 'Your email has been succesfully sent');

      this.setState({
        name: '',
        email: '',
        message: '',
        errors: {},
      });
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  autoResize = (e) => {
    e.target.style.cssText = 'height:auto; padding:0';
    e.target.style.cssText = `height:${e.target.scrollHeight}px`;
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.sendEmail(this.state);
  };

  render() {
    const { name, email, message, errors } = this.state;
    const { sendingEmail } = this.props.guest;

    const btnText = (
      <span>
        {/* eslint-disable-next-line */}
        Send<MDBIcon far icon="paper-plane" className="ml-1" />
      </span>
    );

    const spinner = (
      <div className="text-center">
        <div className="spinner-border spinner-border-sm white-text" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );

    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol md="6" className="py-5 offset-md-3">
            <MDBCard>
              <MDBCardBody>
                <form noValidate onSubmit={this.onSubmit}>
                  <p className="h4 text-center py-4">Contact</p>
                  <MDBInput
                    label="Your name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={this.onChange}
                    className={errors.name && 'is-invalid'}
                  >
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                  </MDBInput>
                  <MDBInput
                    label="Your email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={this.onChange}
                    className={errors.email && 'is-invalid'}
                  >
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </MDBInput>
                  <MDBInput
                    label="Your message"
                    name="message"
                    type="textarea"
                    rows="2"
                    value={message}
                    onChange={this.onChange}
                    className={errors.message && 'is-invalid'}
                    maxLength={500}
                    onKeyDown={this.autoResize}
                  >
                    {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                  </MDBInput>
                  <div className="text-center py-4 mt-3">
                    <MDBBtn color="cyan" type="submit" disabled={sendingEmail}>
                      {sendingEmail ? spinner : btnText}
                    </MDBBtn>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

Contact.propTypes = {
  sendEmail: PropTypes.func.isRequired,
  guest: PropTypes.shape({
    success: PropTypes.bool.isRequired,
    sendingEmail: PropTypes.bool.isRequired,
  }).isRequired,
  errors: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    message: PropTypes.string,
  }),
};

Contact.defaultProps = {
  errors: {},
};

const mapStateToProps = (state) => ({
  guest: state.guest,
  errors: state.errors,
});

export default connect(
  mapStateToProps,
  { sendEmail },
)(Contact);
