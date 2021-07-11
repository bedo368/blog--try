import { createSelector } from "reselect";

const postReducerSelect = (state ) => state.posts

export const postsSelector = createSelector([postReducerSelect] ,(postReducerSelect)=>{
    return postReducerSelect.postCollections
})

export const isFitchingSelector = createSelector([postReducerSelect] ,(postReducerSelect)=>{
    return postReducerSelect.isFitching
})

export const selectPostById = (postId)=> createSelector([postsSelector],(posts)=>{
    console.log(posts);
    const storepost = posts?.filter(post =>{
        return post._id ===postId
    })
    return storepost && storepost[0]
})