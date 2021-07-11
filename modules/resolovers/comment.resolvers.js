const User = require("../schema/userschema");
const  Comment = require("../schema/comment.schema");
const Post = require("../schema/postschema");
const {getPostById} = require("./merge")
module.exports = {
  addComment: async ({ commentContent, relatedPost, date },req) => {
    if (!req.isAuth) {
        throw new Error("un auth");
      }

    try {
      const exsistingUser = await User.findById(req.userId);
      

      const relatedPostFetch = await Post.findById(relatedPost);
      if (relatedPostFetch) {
        const newComment = new Comment({
          commentContent,
          relatedPost :relatedPostFetch,
          commentCreator: exsistingUser,
          date: new Date(),
        });
        const saveComment = await newComment.save();
        relatedPostFetch.relatedComment.push(saveComment);
        const savepost =  await relatedPostFetch.save();
        exsistingUser.createdComments.push(saveComment);
        const saveuser =  await exsistingUser.save();
        console.log(getPostById( saveComment._doc.relatedPost._id));

        return {
          ...saveComment._doc,
          commentCreator: {...saveuser._doc , password : null},
          relatedPost : await getPostById( saveComment._doc.relatedPost._id) ,
        };
      }
    } catch (error) {
      throw error;
    }
  },
};
