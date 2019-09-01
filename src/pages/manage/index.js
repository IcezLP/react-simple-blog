import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MDBContainer, MDBRow, MDBDataTable, MDBIcon, MDBBtn } from 'mdbreact';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { getPosts, deletePost } from '../../redux/actions/postActions';
import { newNotification } from '../../components/commons/Notification';

class Manage extends Component {
  async componentDidMount() {
    await this.props.getPosts(); // eslint-disable-line
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { successDeleted } = nextProps.posts;

    if (successDeleted) {
      newNotification('Post deleted', 'Post has been successfully deleted');
    }
  }

  onDelete = (id) => {
    const { success } = this.props.deletePost(id);
    console.log(success);
  };

  render() {
    const { posts, loadingPosts } = this.props.posts; // eslint-disable-line

    const filteredPosts = [];

    posts.map((post) =>
      filteredPosts.push({
        title: post.title,
        slug: post.slug,
        createdAt: <Moment format="MM/DD/YYYY">{post.createdAt}</Moment>,
        controls: (
          <span className="d-block text-center">
            <Link to={`/manage/edit/${post.slug}`}>
              <MDBIcon icon="pen mr-3" className="blue-text" />
            </Link>
            <MDBIcon
              icon="trash"
              onClick={this.onDelete.bind(this, post._id)}
              className="red-text"
            />
          </span>
        ),
      }),
    );

    const data = {
      columns: [
        {
          label: 'Title',
          field: 'title',
          sort: 'asc',
        },
        {
          label: 'Slug',
          field: 'slug',
          sort: 'asc',
        },
        {
          label: 'Created date',
          field: 'createdAt',
          sort: 'asc',
        },
        {
          label: 'Controls',
        },
      ],
      rows: filteredPosts,
    };

    return (
      <MDBContainer className="py-5">
        <MDBRow>
          <Link to="/manage/add">
            <MDBBtn color="cyan" size="md">
              Add post
            </MDBBtn>
          </Link>
        </MDBRow>
        <MDBDataTable striped bordered small hover responsive data={data} />
      </MDBContainer>
    );
  }
}

Manage.propTypes = {
  getPosts: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  posts: PropTypes.shape({
    posts: PropTypes.arrayOf(PropTypes.object),
    successDeleted: PropTypes.bool.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  posts: state.posts,
});

export default connect(
  mapStateToProps,
  { getPosts, deletePost },
)(Manage);
