import React from "react";
import ReusableForm from "./ReusableForm";
import PropTypes from "prop-types";

function EditPostForm (props) {
  const { Post } = props;

  function handleEditPostFormSubmission(event) {
    event.preventDefault();
    props.onEditPost({names: event.target.names.value, location: event.target.location.value, issue: event.target.issue.value, id: Post.id});
  }

  return (
    <React.Fragment>
      <ReusableForm 
        formSubmissionHandler={handleEditPostFormSubmission}
        buttonText="Update Post" />
    </React.Fragment>
  );
}

EditPostForm.propTypes = {
  onEditPost: PropTypes.func
};

export default EditPostForm;