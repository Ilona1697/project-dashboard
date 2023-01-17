import { Dispatch } from "react";
import { createPost, getAllPosts, setSelectedPost } from "../../../services/post-api-service";
import { PostActions, PostActionTypes } from "../../reducers/postReducer/types";
import { toast } from "react-toastify";

export const GetAllPosts = () => {
  return async (dispatch: Dispatch<PostActions>) => {
    try {
      dispatch({ type: PostActionTypes.START_REQUEST });
      const data = await getAllPosts();
      if (!data.IsSuccess) {
        dispatch({
          type: PostActionTypes.SERVER_POST_ERROR,
          payload: data.Message,
        });
        toast.error(data.Message);
      } else {
        dispatch({
          type: PostActionTypes.ALL_POSTS_LOADED,
          payload: data,
        });
      }
    } catch (e) {
      dispatch({
        type: PostActionTypes.SERVER_POST_ERROR,
        payload: "Unknown error",
      });
    }
  };
};
export const CreatePost = (newPost: any) => {
  return async (dispatch: Dispatch<PostActions>) => {
    try {
      dispatch({ type: PostActionTypes.START_REQUEST });
      const data = await createPost(newPost);
      if (!data.IsSuccess) {
        dispatch({
          type: PostActionTypes.SERVER_POST_ERROR,
          payload: data.Message,
        });
        toast.error(data.Message);
      } else {
        dispatch({
          type: PostActionTypes.NEW_POST_CREATED,
          payload: data.Message,
        });
        toast.success(data.Message);
      }
    } catch (e) {
      dispatch({
        type: PostActionTypes.SERVER_POST_ERROR,
        payload: "Unknown error",
      });
    }
  };
};
export const SelectPost = (post: any) => {
  return async (dispatch: Dispatch<PostActions>) => {
    dispatch({ type: PostActionTypes.SELECT_POST, payload: post });
    setSelectedPost(post);
  };
};
export const SetSelectedPost = (
  post: any,
  dispatch: Dispatch<PostActions>
) => {
  dispatch({
    type: PostActionTypes.SELECT_POST,
    payload: post,
  });
};