const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const PostSchema = new Schema({
    title : {type: String , required: true},
    content : {type: String , required: true},
    date: { type: Date },
    postCreator : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    relatedComment : [{
        type : Schema.Types.ObjectId,
        ref : "Comment" }
    ]
  });
  
  
  module.exports = model("Post", PostSchema);
  