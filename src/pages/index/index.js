import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MDBContainer } from 'mdbreact';
import { getPosts } from '../../redux/actions/postActions';
import Posts from '../../components/posts/Posts';

class Index extends Component {
  async componentDidMount() {
    await this.props.getPosts(); // eslint-disable-line
  }

  render() {
    const { posts, loading } = this.props.posts; // eslint-disable-line

    const spinner = (
      <div className="text-center">
        <div className="spinner-border text-info" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );

    return (
      <MDBContainer className="py-5">{loading ? spinner : <Posts posts={posts} />}</MDBContainer>
    );
  }
}

Index.propTypes = {
  getPosts: PropTypes.func.isRequired,
  posts: PropTypes.shape({
    posts: PropTypes.arrayOf(PropTypes.object),
    loading: PropTypes.bool.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  posts: state.posts,
});

export default connect(
  mapStateToProps,
  { getPosts },
)(Index);
