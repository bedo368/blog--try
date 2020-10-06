const User = require("../schema/userschema");
const  Comment = require("../schema/comment.schema");
const Post = require("../schema/postschema");


const fitchCommetOfPost =  async(comentsId)=>{

    const postComments = await Comment.find({ _id: { $in: comentsId }})

    return postComments.map((comment)=>{
        return {...comment._doc  , commentCreator : getUser.bind(this ,comment._doc.commentCreator )
         }
    })
}

const getUser = async (userId )=>{
    const postCreator = await User.findById(userId)

    return { 
        ...postCreator._doc , 
        password : null,
        createdPost : getUserPosts.bind(this ,postCreator._doc.createdPost ),

    }
}

const getUserPosts = async (postsId)=>{
    const fetchUserPosts = await Post.find({ _id: { $in: postsId }})
    return fetchUserPosts.map(post=>{
        return {
            ...post._doc,
            postCreator: getUser.bind(this ,post._doc.postCreator ),
            relatedComment : fitchCommetOfPost.bind(this ,post._doc.relatedComment  )

        }
    })
}




exports.getUser = getUser;
exports.fitchCommetOfPost = fitchCommetOfPost ;