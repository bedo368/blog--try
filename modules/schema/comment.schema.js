const mongoose = require("mongoose");

const { Schema, model } = mongoose;




const commentSchema = new Schema({
  commentContent : {type: String , required: true},
  date: { type: Date },
  commentCreator : {
      type : Schema.Types.ObjectId,
      ref : "User"
  },
  relatedPost : {
    type : Schema.Types.ObjectId,
    ref : "Post"
}
});


module.exports = model("Comment", commentSchema);
