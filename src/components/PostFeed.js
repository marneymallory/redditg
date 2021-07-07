import React from "react";
import PropTypes from "prop-types";
import Post from "./Post";


function PostFeed(props){
  return (
    <React.Fragment>
      <hr/>
      {Object.values(props.postFeed).map((post) =>
        <Post
          whenPostClicked = { props.onPostSelection }
          names={post.names}
          location={post.location}
          issue={post.issue}
          id={post.id}
          key={post.id}/>
      )}
    </React.Fragment>
  );
}

PostFeed.propTypes = {
  PostFeed: PropTypes.object,
  onPostSelection: PropTypes.func
};

export default PostFeed;