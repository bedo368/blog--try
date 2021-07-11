import POST_TYPES from "./post.types";
import { addCommentToPost} from "./post.utilites"
const intialState = {
  postCollections: null,
  isFitching: false,
  errMassage: "",
};

const postReducer = (state = intialState, action) => {
  switch (action.type) {
    case POST_TYPES.FITCH_POST_START:
      return { ...state, isFitching: true };

      break;
    case POST_TYPES.FITCH_POST_SUCSESS:
      return { ...state, postCollections: action.payload, isFitching: false };
    case POST_TYPES.FITCH_POST_FAIL:
      return { ...state, isFitching: false, errMassage: action.payload };

    case POST_TYPES.ADD_POST : 
      return{
        ...state , postCollections: [...state.postCollections , action.payload ]
      }
    case POST_TYPES.ADD_COMMENT : 
      return{
        ...state , postCollections : addCommentToPost(state.postCollections , action.payload)
      }
    default:
        return state
      break;
  }
};

export default postReducer