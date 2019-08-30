import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MDBRow, MDBCol, MDBMask, MDBView, MDBBtn } from 'mdbreact';
import Moment from 'react-moment';

const Posts = ({ posts }) =>
  posts.map((post) => (
    <MDBRow className="mb-5 animated fadeIn" key={post._id}>
      <MDBCol lg="5">
        <MDBView className="rounded z-depth-2 mb-lg-0 mb-4" hover waves>
          <img
            className="img-fluid"
            src="https://mdbootstrap.com/img/Photos/Others/img%20(27).jpg"
            alt=""
          />
          <a href="#!">
            <MDBMask overlay="white-slight" />
          </a>
        </MDBView>
      </MDBCol>
      <MDBCol lg="7">
        <h3 className="font-weight-bold mb-3 p-0">
          <strong>{post.title}</strong>
        </h3>
        <p className="text-truncate" style={{ height: '150px' }}>
          {post.content}
        </p>
        <p>
          Posted&nbsp;
          <Moment fromNow ago>
            {post.createdAt}
          </Moment>
          &nbsp;ago
        </p>
        <Link to={`/post/${post.slug}`}>
          <MDBBtn color="success" size="md" className="waves-light ">
            Read more
          </MDBBtn>
        </Link>
      </MDBCol>
    </MDBRow>
  ));

Posts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Posts;
