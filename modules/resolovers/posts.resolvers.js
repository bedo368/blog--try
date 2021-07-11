const Post = require("../schema/postschema");
const User = require("../schema/userschema");
const { fitchCommetOfPost, getUser } = require("./merge");
const postMutation = {
  createPost: async ({ title, content, date }, req) => {
    if (!req.isAuth) {
      throw new Error("un auth");
    }
    try {
      const creator = await User.findById(req.userId);
      if (!creator) {
        throw new Error("post should have creator");
      }

      if (creator) {
        const newPost = new Post({
          title,
          content,
          date: new Date(),
          postCreator: creator,
        });

        const savePost = await newPost.save();
        creator.createdPost.push(newPost);
        const save = await creator.save();

        return {
          ...savePost._doc,
        };
      }
    } catch (error) {
      throw error;
    }
  },
};

const postQuery = {
  getAllPosts: async () => {
    try {
      const allPosts = await Post.find();

      return allPosts.map((post) => {
        return {
          ...post._doc,
          relatedComment: fitchCommetOfPost(post.relatedComment),
          postCreator: getUser(post._doc.postCreator),
        };
      });
    } catch (error) {
      throw error;
    }
  },
};

module.exports = {
  ...postMutation,
  ...postQuery,
};
