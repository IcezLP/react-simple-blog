import React, { Component } from 'react';
import { MDBNotification, MDBContainer } from 'mdbreact';

let newNotificationFn;

class Notification extends Component {
  constructor() {
    super();

    this.state = {
      notifications: [],
    };
  }

  componentDidMount() {
    newNotificationFn = this.addNotification;
  }

  addNotification = (title, message) => {
    const { notifications } = this.state;

    this.setState({
      notifications: [...notifications, { title, message }],
    });
  };

  render() {
    const { notifications } = this.state;
    return (
      <MDBContainer
        style={{
          width: 'auto',
          position: 'fixed',
          top: '10px',
          right: '10px',
          zIndex: 9999,
        }}
      >
        {notifications.map((notification, index) => (
          <MDBNotification
            key={index}
            autohide={3000}
            id={index}
            show
            fade
            icon="bell"
            className="white"
            title={notification.title}
            message={notification.message}
          />
        ))}
      </MDBContainer>
    );
  }
}

export function newNotification(title, message) {
  newNotificationFn(title, message);
}

export default Notification;
