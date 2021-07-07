import React from "react";
import PropTypes from "prop-types";

function PostDetail(props){
  const { Post, onClickingDelete } = props;
  
  return (
    <React.Fragment>
      <h1>Post Detail</h1>
      <h3>{Post.location} - {Post.names}</h3>
      <p><em>{Post.issue}</em></p>
      <button onClick={ props.onClickingEdit }>Update Post</button>
      <button onClick={()=> onClickingDelete(Post.id) }>Close Post</button>
      <hr/>
    </React.Fragment>
  );
}

PostDetail.propTypes = {
  Post: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func
};

export default PostDetail;