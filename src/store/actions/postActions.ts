import axios from "axios";
import { PostForm } from "../../PostsTable";
import {
  PostDispatch,
  PostPostResponse,
  PostPutResponse,
  PostResponse,
} from "../../types/post";

export const getPosts = () => async (dispatch: PostDispatch) => {
  dispatch({ type: "GET_POSTS_START" });
  try {
    const response = await axios.get<PostResponse>(
      "https://gorest.co.in/public/v1/posts"
    );
    dispatch({ type: "GET_POSTS_SUCCESS", payload: response.data });
  } catch {
    dispatch({ type: "GET_POSTS_ERROR" });
  }
};

export const addPost = (form: PostForm) => async (dispatch: PostDispatch) => {
  dispatch({ type: "ADD_POST_START" });
  try {
    const response = await axios.post<PostPostResponse>(
      "https://gorest.co.in/public/v1/posts",
      form,
      {
        headers: {
          Authorization:
            "Bearer c9c8d3d10c492803c3fe392eb81b1f0a5f1c93800d976482efce5c8ee1c40c28",
        },
      }
    );
    dispatch({ type: "ADD_POST_SUCCESS", payload: response.data });
  } catch {
    dispatch({ type: "ADD_POST_ERROR" });
  }
};

export const updatePost =
  (id: number, form: PostForm) => async (dispatch: PostDispatch) => {
    dispatch({ type: "UPDATE_POST_START" });
    try {
      const response = await axios.put<PostPutResponse>(
        "https://gorest.co.in/public/v1/posts/" + id,
        form,
        {
          headers: {
            Authorization:
              "Bearer c9c8d3d10c492803c3fe392eb81b1f0a5f1c93800d976482efce5c8ee1c40c28",
          },
        }
      );
      dispatch({ type: "UPDATE_POST_SUCCESS", payload: response.data });
    } catch {
      dispatch({ type: "UPDATE_POST_ERROR" });
    }
  };

export const deletePost = (id: number) => async (dispatch: PostDispatch) => {
  dispatch({ type: "DELETE_POST_START" });
  try {
    await axios.delete<PostPutResponse>(
      "https://gorest.co.in/public/v1/posts/" + id,
      {
        headers: {
          Authorization:
            "Bearer c9c8d3d10c492803c3fe392eb81b1f0a5f1c93800d976482efce5c8ee1c40c28",
        },
      }
    );
    dispatch({ type: "DELETE_POST_SUCCESS", payload: id });
  } catch {
    dispatch({ type: "DELETE_POST_ERROR" });
  }
};
