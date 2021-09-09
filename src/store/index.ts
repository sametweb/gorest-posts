import { combineReducers } from "redux";
import { PostState } from "../types/post";
import postsReducer from "./reducers/postsReducer";

export interface AppState {
  posts: PostState;
}

const rootReducer = combineReducers({
  posts: postsReducer,
});

export default rootReducer;
