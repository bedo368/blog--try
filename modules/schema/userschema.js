const mongoose = require("mongoose");

const { Schema, model } = mongoose;




const userSchema = new Schema({
  email : {type: String , required: true},
  password : {type: String , required: true},
  date: { type: Date },
  displayName:  {type: String , required: true},
  photo : {type: String },
  createdPost : [{
      type : Schema.Types.ObjectId,
      ref : "Post"
  }],
  createdComments :[{
    type : Schema.Types.ObjectId,
    ref : "Comment"
  }]
});


module.exports = model("User", userSchema);
