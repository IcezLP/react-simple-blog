import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { updatePost, getPost } from '../../redux/actions/postActions';
import { newNotification } from '../../components/commons/Notification';

class Edit extends Component {
  constructor() {
    super();

    this.state = {
      title: '',
      content: '',
      errors: {},
    };
  }

  async componentDidMount() {
    await this.props.getPost(this.props.match.params.slug); // eslint-disable-line
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { successUpdated } = nextProps.posts;

    if (successUpdated) {
      newNotification('Post updated', 'Your post has been succesfully updated');

      this.props.history.push('/manage');
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.posts.post) {
      const { post } = nextProps.posts;

      this.setState({
        title: post.title,
        content: post.content,
      });
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.updatePost(this.props.match.params.slug, this.state);
  };

  render() {
    const { title, content, errors } = this.state;
    const { updatingPost } = this.props.posts;

    const btnText = (
      <span>
        {/* eslint-disable-next-line */}
        Edit
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
          <MDBCol md="10" className="py-5 offset-md-1">
            <MDBCard>
              <MDBCardBody>
                <form noValidate onSubmit={this.onSubmit}>
                  <p className="h4 text-center py-4">Add post</p>
                  <MDBInput
                    label="Title"
                    name="title"
                    type="text"
                    value={title}
                    onChange={this.onChange}
                    className={errors.title && 'is-invalid'}
                  >
                    {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                  </MDBInput>
                  <CKEditor
                    name="content"
                    editor={ClassicEditor}
                    data={content}
                    onChange={(event, editor) => {
                      const data = editor.getData();

                      this.setState({
                        content: data,
                      });
                    }}
                  />
                  <div className="text-center py-4 mt-3">
                    <MDBBtn color="cyan" type="submit" disabled={updatingPost}>
                      {updatingPost ? spinner : btnText}
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

Edit.propTypes = {
  updatePost: PropTypes.func.isRequired,
  getPost: PropTypes.func.isRequired,
  posts: PropTypes.shape({
    post: PropTypes.shape({
      title: PropTypes.string,
      content: PropTypes.string,
    }).isRequired,
    updatingPost: PropTypes.bool.isRequired,
    successUpdated: PropTypes.bool.isRequired,
  }).isRequired,
  errors: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
  }),
};

Edit.defaultProps = {
  errors: {},
};

const mapStateToProps = (state) => ({
  posts: state.posts,
  errors: state.errors,
});

export default connect(
  mapStateToProps,
  { updatePost, getPost },
)(Edit);
