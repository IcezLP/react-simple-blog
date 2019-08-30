import React, { Component } from 'react';
import PropTypes from 'proptypes';
import { connect } from 'react-redux';
import { MDBContainer } from 'mdbreact';
import { Link } from 'react-router-dom';
import { getPosts } from '../../redux/actions/postActions';

class Index extends Component {
  async componentDidMount() {
    await this.props.getPosts(); // eslint-disable-line
  }

  render() {
    const { posts } = this.props.posts; // eslint-disable-line

    return (
      <MDBContainer className="py-5">
        {posts.map((post) => (
          <div key={post._id}>
            <small className="d-block">{post.createdAt}</small>
            <Link to={`/${post.slug}`}>{post.title}</Link>
            <p>{post.content}</p>
          </div>
        ))}
      </MDBContainer>
    );
  }
}

Index.propTypes = {
  getPosts: PropTypes.func.isRequired,
  posts: PropTypes.shape({
    posts: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

const mapStateToProps = (state) => ({
  posts: state.posts,
});

export default connect(
  mapStateToProps,
  { getPosts },
)(Index);
