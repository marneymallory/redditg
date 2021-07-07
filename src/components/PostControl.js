import React from "react";
import NewPostForm from "./NewPostForm";
import PostFeed from "./PostFeed";
import PostDetail from "./PostDetail";
import EditPostForm from "./EditPostForm";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class PostControl extends React.Component {
  constructor(props) {
    super(props); 
    // console.log(props);
    this.state = {
      selectedPost: null,
      editing: false,
    };
  }
    // : extends operator
    // thisChildClass : thisParentClass. (has properties like dad bod)
    // right to left. 
    // thisChildClass now has a dadDod.
    //class of postControl will be given to react components. so y'all cal talk to each other via props & state.
  

  // if its nothing/not selected we will do the else statement
  // which calls our form-visible-reducer.js file/function via "dispatch"
  // which is already set to false//
  // basically if its nothing don't show the form. 

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
      type: "ADD_POST",
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
    const selectedPost = this.props.masterPostFeed[id];
    this.setState({ selectedPost: selectedPost });
  };

  handleDeletingPost = (id) => {
    const { dispatch } = this.props;
    const action = {
      type: "DELETE_POST",
      id: id,
    };
    dispatch(action);
    this.setState({ selectedPost: null });
  };

  handleEditClick = () => {
    this.setState({ editing: true });
  };

  handleEditingPostInFeed = (PostToEdit) => {
    const { dispatch } = this.props;
    const { id, names, location, issue } = PostToEdit;
    const action = {
      type: "ADD_POST",
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
          onEditPost={this.handleEditingPostInFeed}
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
        <PostFeed
          postFeed={this.props.masterPostFeed}
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

PostControl.propTypes = {
  masterPostFeed: PropTypes.object,
  formVisibleOnPage: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    masterPostFeed: state.masterPostFeed,
    formVisibleOnPage: state.formVisibleOnPage,
  };
};

PostControl = connect(mapStateToProps)(PostControl);

export default PostControl;
