const User = require("../schema/userschema");
const  Comment = require("../schema/comment.schema");
const Post = require("../schema/postschema");

module.exports = {
  addComment: async ({ commentContent, relatedPost, date }) => {
    try {
      const exsistingUser = await User.findById("5f7c959c27fbea2ca72c110b");
      if (!exsistingUser) {
        throw new Error("you should loh in ");
      }

      const relatedPostFetch = await Post.findById(relatedPost);
      if (relatedPostFetch) {
        const newComment = new Comment({
          commentContent,
          relatedPost :relatedPostFetch,
          commentCreator: exsistingUser,
          date: new Date(),
        });
        console.log(newComment);
        const saveComment = await newComment.save();
        relatedPostFetch.relatedComment.push(saveComment);
        const savepost =  await relatedPostFetch.save();
        exsistingUser.createdComments.push(saveComment);
        const saveuser =  await exsistingUser.save();

        return {
          ...saveComment._doc,
          commentCreator: {...saveuser._doc , password : null},
          relatedPost : {...savepost._doc } ,
        };
      }
    } catch (error) {
      throw error;
    }
  },
};
