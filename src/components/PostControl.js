import React from "react";
import NewPostForm from "./NewPostForm";
import PostList from "./PostList";
import PostDetail from "./PostDetail";
import EditPostForm from "./EditPostForm";
import { connect } from "react-redux";
import Post from "./Post";
import PropTypes from "prop-types";

class PostControl extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      selectedPost: null,
      editing: false,
    };
  }

  handleClick = () => {
    if (this.state.selectedPost != null) {
      this.setState({
        selectedPost: null,
        editing: false,
      });
    } else {
      const { dispatch } = this.props;
      const action = {
        type: "TOGGLE_FORM",
      };
      dispatch(action);
    }
  };

  handleAddingNewPostToList = (newPost) => {
    const { dispatch } = this.props;
    const { id, names, location, issue } = newPost;
    const action = {
      type: "ADD_Post",
      id: id,
      names: names,
      location: location,
      issue: issue,
    };
    dispatch(action);
    const action2 = {
      type: "TOGGLE_FORM",
    };
    dispatch(action2);
  };

  handleChangingSelectedPost = (id) => {
    const selectedPost = this.props.masterPostList[id];
    this.setState({ selectedPost: selectedPost });
  };

  handleDeletingPost = (id) => {
    const { dispatch } = this.props;
    const action = {
      type: "DELETE_Post",
      id: id,
    };
    dispatch(action);
    this.setState({ selectedPost: null });
  };

  handleEditClick = () => {
    this.setState({ editing: true });
  };

  handleEditingPostInList = (PostToEdit) => {
    const { dispatch } = this.props;
    const { id, names, location, issue } = PostToEdit;
    const action = {
      type: "ADD_Post",
      id: id,
      names: names,
      location: location,
      issue: issue,
    };
    dispatch(action);
    this.setState({
      editing: false,
      selectedPost: null,
    });
  };

  render() {
    let currentlyVisibleState = null;
    let buttonText = null;
    if (this.state.editing) {
      currentlyVisibleState = (
        <EditPostForm
          Post={this.state.selectedPost}
          onEditPost={this.handleEditingPostInList}
        />
      );
      buttonText = "Return to Post List";
    } else if (this.state.selectedPost != null) {
      currentlyVisibleState = (
        <PostDetail
          Post={this.state.selectedPost}
          onClickingDelete={this.handleDeletingPost}
          onClickingEdit={this.handleEditClick}
        />
      );
      buttonText = "Return to Post List";
    } else if (this.props.formVisibleOnPage) {
      currentlyVisibleState = (
        <NewPostForm onNewPostCreation={this.handleAddingNewPostToList} />
      );
      buttonText = "Return to Post List";
    } else {
      currentlyVisibleState = (
        <PostList
          PostList={this.props.masterPostList}
          onPostSelection={this.handleChangingSelectedPost}
        />
      );
      buttonText = "Add Post";
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }
}

PostControl.prototype = {
  masterPostList: PropTypes.object,
};
PostControl.propTypes = {
  masterPostList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    masterPostList: state.masterPostList,
    formVisibleOnPage: state.formVisibleOnPage,
  };
};

PostControl = connect(mapStateToProps)(PostControl);

export default PostControl;
