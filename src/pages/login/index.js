import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logInUser } from '../../redux/actions/guestActions';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      errors: {},
    };
  }

  componentWillMount() {
    if (this.props.guest.isAuthenticated) {
      this.props.history.push('/404');
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { success, isAuthenticated } = nextProps.guest;

    if (success) {
      this.setState({
        username: '',
        password: '',
        errors: {},
      });
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (isAuthenticated) {
      this.props.history.push('/');
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.logInUser(this.state);
  };

  render() {
    const { username, password, errors } = this.state;
    const { loggingIn } = this.props.guest;

    const btnText = <span>Login</span>;

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
                  <p className="h4 text-center py-4">Login</p>
                  <MDBInput
                    label="Username"
                    name="username"
                    type="text"
                    value={username}
                    onChange={this.onChange}
                    className={errors.username && 'is-invalid'}
                  >
                    {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                  </MDBInput>
                  <MDBInput
                    label="Password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={this.onChange}
                    className={errors.password && 'is-invalid'}
                  >
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                  </MDBInput>
                  <div className="text-center py-4 mt-3">
                    <MDBBtn color="cyan" type="submit" disabled={loggingIn}>
                      {loggingIn ? spinner : btnText}
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

Login.propTypes = {
  logInUser: PropTypes.func.isRequired,
  guest: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
    success: PropTypes.bool.isRequired,
    loggingIn: PropTypes.bool.isRequired,
  }).isRequired,
  errors: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    message: PropTypes.string,
  }),
};

Login.defaultProps = {
  errors: {},
};

const mapStateToProps = (state) => ({
  guest: state.guest,
  errors: state.errors,
});

export default connect(
  mapStateToProps,
  { logInUser },
)(Login);
