import React, { useState } from "react"
import EditorComponent from "../../components/editor/editor"
import { EditorState, convertToRaw } from "draft-js"
import axios from "axios"
import {useHistory} from "react-router-dom"
import "./create-post.scss"
import { connect } from "react-redux"
import { tokenSelector } from "../../redux/auth/auth.selector"
import { addPost } from "../../redux/posts/post.action"
import draftToHtml from "draftjs-to-html"
function CreatePost({ token, dispatch }) {
  const history = useHistory()
  const [editorState, updateeditorState] = useState(EditorState.createEmpty())
  const [postForm, updatePostForm] = useState({ title: "" })
  const onEditorStateChange = (EditorState) => {
    const rawContentState = convertToRaw(EditorState.getCurrentContent())
    updateeditorState(draftToHtml( rawContentState))
  }

  const { title } = postForm
  const formOnChange = (event) => {
    const { name, value } = event.target
    updatePostForm((preval) => {
      return { ...preval, [name]: value }
    })
  }
  const formOnSubmit = (event) => {
    event.preventDefault()
    const content = editorState
    const query = `mutation createPost($title: String! , $content: String!) {
            createPost(title: $title ,  content: $content ){
                _id
                title
                content
                date
                relatedComment{
                  commentContent
                  commentCreator{
                    displayName
                  }
                }
                postCreator{
                  displayName
                }
              
              
            }
          }`
    axios({
      url: "http://localhost:5000/graphql",
      method: "POST",
      data: JSON.stringify({
        query,
        variables: { content, title },
      }),

      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        dispatch(addPost(res.data.data.createPost))
        updateeditorState(EditorState.createEmpty())
        updatePostForm({title:""})
        history.push(`/post/${res.data.data.createPost._id}`)
        
        


      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <div className="create_post">
      <div className="container">
        <form className="create_post_form" onSubmit={formOnSubmit}>
          <label htmlFor="title"> title </label>
          <input type="text" value={title} name="title" onChange={formOnChange} />
          <label htmlFor="title"> post content </label>

          <EditorComponent className="editor" onEditorStateChange={onEditorStateChange}  value={editorState} />
          <button>Add post</button>
        </form>
      </div>
    </div>
  )
}
const mapStateToProps = (state, ownprops) => ({
  token: tokenSelector(state),
})
export default connect(mapStateToProps)(CreatePost)
