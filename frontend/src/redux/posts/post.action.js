import POST_TYPES from "./post.types"
import axios from "axios"
 const fitchPostsStart = ()=>{

    return{type : POST_TYPES.FITCH_POST_START }

} 
const fitchPostsSuccess = (postArray)=>{

    return { 
        type : POST_TYPES.FITCH_POST_SUCSESS,
        payload : postArray
    }
}
const fitchPostsFail = (errMassage)=>{
    return{
        type : POST_TYPES.FITCH_POST_FAIL,
        payload : errMassage
    }
}

export const fitchPostsAsync = ()=>{


    return (dispatch)=>{
        dispatch(fitchPostsStart())

        const query = `query{
            getAllPosts{
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
              url:"http://localhost:5000/graphql",
              method:"POST",
              data:{
                  query : query
              }
          }).then(res=>{
            console.log(res.data.data.getAllPosts);
             dispatch(fitchPostsSuccess(res.data.data.getAllPosts))
          }).catch(err =>{  
                dispatch(fitchPostsFail(err))
          })
       

    }
}

export const addPost = (post)=>{
  return{
    type: POST_TYPES.ADD_POST,
    payload : post 
  }
}

export const addComment = ( postId , comment)=>{
  return{
    type: POST_TYPES.ADD_COMMENT,
    payload : {postId ,  comment }
  }
}
