import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorsReducer from "./errorReducers";
import profileReducer from "./profileReducer";
import PostReducer from "./postReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorsReducer,
  profile: profileReducer,
  post: PostReducer
});
