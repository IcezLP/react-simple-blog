import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MDBBtn } from 'mdbreact';
import Moment from 'react-moment';

const Posts = ({ posts }) =>
  posts.map((post) => (
    <div className="mb-5 animated fadeIn" key={post._id}>
      <h3 className="mb-3 p-0 d-block">
        {/* eslint-disable-next-line */}
          <strong>{post.title}</strong>, <small>Posted <Moment fromNow ago>{post.createdAt}</Moment> ago</small>
      </h3>
      <Link to={`/post/${post.slug}`}>
        <MDBBtn color="success" size="md" className="waves-light ">
          Read more
        </MDBBtn>
      </Link>
    </div>
  ));

Posts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Posts;
