import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import postReducer from "./posts/post.reducer"
import storage from "redux-persist/lib/storage";
import authReducer from "./auth/auth.reducer";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["authdata"],
  };
const rootReducer = combineReducers({
    authdata: authReducer,
    posts : postReducer
    
    
 
});

export default persistReducer(persistConfig, rootReducer);
