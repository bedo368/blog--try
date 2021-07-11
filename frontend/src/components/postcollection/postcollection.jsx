import React, { useState, useEffect } from "react";
import Post from "../post/post";
import "./postcollection.scss"

import {
  postsSelector,
  isFitchingSelector,
} from "../../redux/posts/post.selector";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import WithSpinner from "../withspiner.component/withspiner.component";
import { withRouter } from "react-router";
function PostCollection({ posts, isFitching , history }) {
  const [Posts, updatePosts] = useState([]);

  useEffect(() => {
    updatePosts(posts);
  }, [isFitching]);

  return (
    <div className="postcollection">
      { isFitching ? (
        <WithSpinner />
      ) : (
        <div className="post-collection">
          {Posts?.map((post) => {
            return (
              <Post
              getpost = {()=>{ history.push(`post/${post._id}`) }}
                key={post._id}
                _id ={post._id}
                title={post.title}
                Content={post.content}
                date={post.date}
                writer={post.postCreator.displayName}
                comments={post.relatedComment}
              />
            );
          })}
        </div>
      )
      
      }
    </div>
  );
}
const mapStateToProps = createStructuredSelector({
  posts: postsSelector,
  isFitching: isFitchingSelector,
});
export default  withRouter( connect(mapStateToProps)( PostCollection))
