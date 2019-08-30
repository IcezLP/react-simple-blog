import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol } from 'mdbreact';

const Footer = () => (
  <MDBFooter color="grey lighten-3" className="black-text">
    <MDBContainer className="text-center text-md-left py-3">
      <MDBRow>
        <MDBCol md="6">
          <h5 className="title">Simple React Blog</h5>
          <p>Made with NodeJS, MongoDB, React, and Redux</p>
        </MDBCol>
        <MDBCol md="6">
          <h5 className="title">Additional links</h5>
          <ul className="pl-sm-0 pl-md-3">
            <li className="list-unstyled">
              <a
                href="https://github.com/IcezLP/react-simple-blog"
                target="_blank"
                rel="noreferrer noopener"
                className="black-text"
              >
                Github
              </a>
            </li>
          </ul>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    <div className="footer-copyright text-center py-3 black-text">
      <MDBContainer>
        {/* eslint-disable-next-line */}
        &copy; {new Date().getFullYear()} Copyright: Joachim Brasier
      </MDBContainer>
    </div>
  </MDBFooter>
);

export default Footer;
