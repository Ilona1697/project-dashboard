import {
  CategoryActionTypes,
  CategoryActions,
} from "../../reducers/categoryReducer/types";
import { Dispatch } from "redux";
import { toast } from "react-toastify";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  setSelectedCategory,
  updateCategory,
} from "../../../services/api-category-service";

export const GetAllCategories = () => {
  return async (dispatch: Dispatch<CategoryActions>) => {
    try {
      dispatch({ type: CategoryActionTypes.START_REQUEST });
      const data = await getAllCategories();
      if (!data.IsSuccess) {
        dispatch({
          type: CategoryActionTypes.SERVER_CATEGORY_ERROR,
          payload: data.Message,
        });
        toast.error(data.Message);
      } else {
        dispatch({
          type: CategoryActionTypes.ALL_CATEGORIES_LOADED,
          payload: data,
        });
      }
    } catch (e) {
      dispatch({
        type: CategoryActionTypes.SERVER_CATEGORY_ERROR,
        payload: "Unknown error",
      });
    }
  };
};

export const CreateCategory = (category: any) => {
  return async (dispatch: Dispatch<CategoryActions>) => {
    try {
      dispatch({ type: CategoryActionTypes.START_REQUEST });
      const data = await createCategory(category);
      if (!data.IsSuccess) {
        dispatch({
          type: CategoryActionTypes.FINISH_REQUEST,
          payload: data.Message,
        });
        toast.error(data.Message);
      } else {
        dispatch({
          type: CategoryActionTypes.CATEGORY_CREATED,
          payload: data,
        });
        toast.success(data.Message);
      }
    } catch (e) {
      dispatch({
        type: CategoryActionTypes.SERVER_CATEGORY_ERROR,
        payload: "Unknown error",
      });
    }
  };
};
export const DeleteCategory = (id: number) => {
  return async (dispatch: Dispatch<CategoryActions>) => {
    try {
      dispatch({ type: CategoryActionTypes.START_REQUEST });
      const data = await deleteCategory(id);
      if (!data.IsSuccess) {
        dispatch({
          type: CategoryActionTypes.FINISH_REQUEST,
          payload: data.Message,
        });
        toast.error(data.Message);
      } else {
        dispatch({
          type: CategoryActionTypes.CATEGORY_DELETED,
          payload: data,
        });
        toast.success(data.Message);
      }
    } catch (e) {
      dispatch({
        type: CategoryActionTypes.SERVER_CATEGORY_ERROR,
        payload: "Unknown error",
      });
    }
  };
};
export const UpdateCategory = (category: any) => {
  return async (dispatch: Dispatch<CategoryActions>) => {
    try {
      dispatch({ type: CategoryActionTypes.START_REQUEST });
      const data = await updateCategory(category);
      if (!data.IsSuccess) {
        dispatch({
          type: CategoryActionTypes.FINISH_REQUEST,
          payload: data.Message,
        });
        toast.error(data.Message);
      } else {
        dispatch({
          type: CategoryActionTypes.CATEGORY_UPDATED,
          payload: data,
        });
        setSelectedCategory(category);
        toast.success(data.Message);
      }
    } catch (e) {
      dispatch({
        type: CategoryActionTypes.SERVER_CATEGORY_ERROR,
        payload: "Unknown error",
      });
    }
  };
};

export const SetSelectedCategory = (
  category: any,
  dispatch: Dispatch<CategoryActions>
) => {
  dispatch({
    type: CategoryActionTypes.SELECT_CATEGORY,
    payload: category,
  });
};

export const SelectedCategory = (category: any) => {
  return async (dispatch: Dispatch<CategoryActions>) => {
    dispatch({ type: CategoryActionTypes.SELECT_CATEGORY, payload: category });
    setSelectedCategory(category);
  };
};
