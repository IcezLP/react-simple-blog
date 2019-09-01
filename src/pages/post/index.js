import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MDBContainer } from 'mdbreact';
import { DiscussionEmbed } from 'disqus-react';
import Moment from 'react-moment';
import { getPost } from '../../redux/actions/postActions';

class Post extends Component {
  async componentDidMount() {
    await this.props.getPost(this.props.match.params.slug); // eslint-disable-line
  }

  render() {
    const { post, loadingPost } = this.props.posts; // eslint-disable-line

    const disqusShortname = 'react-simple-blog';

    const disqusConfig = {
      url: window.location.href,
      identifier: post.slug,
      title: post.title,
    };

    const spinner = (
      <div className="text-center">
        <div className="spinner-border text-info" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );

    return (
      <MDBContainer className="py-5">
        {loadingPost ? (
          spinner
        ) : (
          <div className="animated fadeIn">
            <p className="d-block">
              Posted&nbsp;
              <Moment fromNow ago>
                {post.createdAt}
              </Moment>
              &nbsp;ago
            </p>
            <h3 className="title">{post.title}</h3>
            <p dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        )}

        <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
      </MDBContainer>
    );
  }
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  posts: PropTypes.shape({
    post: PropTypes.object,
    loadingPost: PropTypes.bool.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  posts: state.posts,
});

export default connect(
  mapStateToProps,
  { getPost },
)(Post);
