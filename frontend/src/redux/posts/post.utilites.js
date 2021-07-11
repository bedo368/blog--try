export const addCommentToPost = (state , {postId , comment})=>{
    console.log(state);
    console.log({postId , comment});

    return state.map(post =>{
        if (post._id === postId ){
            return {
                ...post , relatedComment : [...post.relatedComment ,comment ]
            }
            
        }
        return post
    })


    

}