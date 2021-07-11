import React from 'react'
import "./comment.scss"
function Comment({commentContent , creator}) {
    return (
        <div className="comment">
            <h2> {creator.displayName} </h2>
            <p> {commentContent} </p>
            
        </div>
    )
}

export default Comment
