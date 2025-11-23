import { reducer as postReducer } from "@/features/post";
import { reducer as userReducer } from "@/features/user";
import { combineReducers } from "redux";

export default combineReducers({
  post: postReducer,
  user: userReducer,
});
