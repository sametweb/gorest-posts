import { ThunkDispatch } from "redux-thunk";

export interface PostState {
  data: Datum[];
  loading: boolean;
  error: "";
}

export interface Links {
  previous?: any;
  current: string;
  next: string;
}

export interface Pagination {
  total: number;
  pages: number;
  page: number;
  limit: number;
  links: Links;
}

export interface Meta {
  pagination: Pagination;
}

export interface Datum {
  id: number;
  user_id: number;
  title: string;
  body: string;
}

export interface PostResponse {
  meta: Meta;
  data: Datum[];
}

export interface PostPostResponse {
  data: Datum;
}

export interface PostPutResponse {
  data: Datum;
}

interface GET_POSTS_START {
  type: "GET_POSTS_START";
}

interface GET_POSTS_SUCCESS {
  type: "GET_POSTS_SUCCESS";
  payload: PostResponse;
}

interface GET_POSTS_ERROR {
  type: "GET_POSTS_ERROR";
}

interface ADD_POST_START {
  type: "ADD_POST_START";
}

interface ADD_POST_SUCCESS {
  type: "ADD_POST_SUCCESS";
  payload: PostPostResponse;
}

interface ADD_POST_ERROR {
  type: "ADD_POST_ERROR";
}

interface UPDATE_POST_START {
  type: "UPDATE_POST_START";
}

interface UPDATE_POST_SUCCESS {
  type: "UPDATE_POST_SUCCESS";
  payload: PostPutResponse;
}

interface UPDATE_POST_ERROR {
  type: "UPDATE_POST_ERROR";
}

interface DELETE_POST_START {
  type: "DELETE_POST_START";
}

interface DELETE_POST_SUCCESS {
  type: "DELETE_POST_SUCCESS";
  payload: number;
}

interface DELETE_POST_ERROR {
  type: "DELETE_POST_ERROR";
}

export type PostAction =
  | GET_POSTS_START
  | GET_POSTS_SUCCESS
  | GET_POSTS_ERROR
  | ADD_POST_START
  | ADD_POST_SUCCESS
  | ADD_POST_ERROR
  | UPDATE_POST_START
  | UPDATE_POST_SUCCESS
  | UPDATE_POST_ERROR
  | DELETE_POST_START
  | DELETE_POST_SUCCESS
  | DELETE_POST_ERROR;

export type PostDispatch = ThunkDispatch<PostState, void, PostAction>;
