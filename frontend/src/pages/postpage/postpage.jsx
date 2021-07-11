import React from "react";
import "./postpage.scss";
import CommentIcon from "@material-ui/icons/Comment";
import DateRangeIcon from "@material-ui/icons/DateRange";
import draftToHtml from "draftjs-to-html";

import { useState } from "react";
import { connect } from "react-redux";
import {
  isFitchingSelector,
  selectPostById,
} from "../../redux/posts/post.selector";
import {addComment} from "../../redux/posts/post.action"
import axios from "axios";

import Comment from "../../components/comment/comment";

import Post from "../../components/post/post";
import { tokenSelector } from "../../redux/auth/auth.selector";
import WithSpinner from "../../components/withspiner.component/withspiner.component";
function Postpage({ post, token, isFitching , dispatch }) {
  const [commentContent, updateCommentContent] = useState("");

  const commentOnSubmit = (event) => {
    event.preventDefault();
    if (commentContent === "") {
      return;
    }
    const query = `mutation{
      addComment(commentContent:"${commentContent}" relatedPost:"${post._id}" ){
        commentContent
        commentCreator{
            displayName
        }
        
          
        
      }
    }`;
    axios({
      url: "http://localhost:5000/graphql",
      method: "POST",
      data: {
        query: query,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        console.log(res);
        dispatch(addComment(post._id , res.data.data.addComment))
        updateCommentContent("");
      })
      .catch((err) => {});
  };
  return (
    <div className="postpage">
      {isFitching ? (
        <WithSpinner />
      ) : (
        <div className="container">
          {post && (
            <Post
              comments={post.relatedComment}
              title={post.title}
              Content={post.content}
              date={post.date}
              writer={post.postCreator.displayName}
            />
          )}

          <div>
            {" "}
            {post && (
              <div>
                <h2 className="commentb"> Comments</h2>
                {post.relatedComment?.map((comment) => {
                  return (
                    <Comment
                      commentContent={comment.commentContent}
                      creator={comment.commentCreator}
                    />
                  );
                })}
              </div>
            )}{" "}
          </div>
          <div>
            <h3>Add comment</h3>
            <form className="comment_form" onSubmit={commentOnSubmit}>
              <input
                type="text"
                value={commentContent}
                onChange={(event) => {
                  updateCommentContent(event.target.value);
                }}
              />

              <button className="comment_button"> Add </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
const mapStateToProps = (state, ownprops) => ({
  post: selectPostById(ownprops.match.params.postId)(state),
  token: tokenSelector(state),
  isFitching: isFitchingSelector(state),
});

export default connect(mapStateToProps)(Postpage);
