import { PostAction, PostState } from "../../types/post";

const initialState: PostState = {
  data: [],
  loading: false,
  error: "",
};

const postsReducer = (state: PostState = initialState, action: PostAction) => {
  switch (action.type) {
    case "GET_POSTS_START":
      return { ...state, loading: true, error: "" };
    case "GET_POSTS_SUCCESS":
      return { ...state, loading: false, data: action.payload.data };
    case "GET_POSTS_ERROR":
      return { ...state, loading: false, error: "Error fetching posts" };
    case "ADD_POST_START":
      return { ...state, loading: true, error: "" };
    case "ADD_POST_SUCCESS":
      return {
        ...state,
        loading: false,
        data: [action.payload.data, ...state.data],
      };
    case "ADD_POST_ERROR":
      return { ...state, loading: false, error: "Errror adding post" };
    case "UPDATE_POST_START":
      return { ...state, loading: true, error: "" };
    case "UPDATE_POST_SUCCESS":
      return {
        ...state,
        loading: false,
        data: state.data.map((post) =>
          post.id === action.payload.data.id ? action.payload.data : post
        ),
      };
    case "UPDATE_POST_ERROR":
      return { ...state, loading: false, error: "Error updating post" };
    case "DELETE_POST_START":
      return { ...state, loading: true, error: "" };
    case "DELETE_POST_SUCCESS":
      return {
        ...state,
        loading: false,
        data: state.data.filter((post) => post.id !== action.payload),
      };
    case "DELETE_POST_ERROR":
      return { ...state, loading: false, error: "Error deleting data" };
    default:
      return state;
  }
};

export default postsReducer;
