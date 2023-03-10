import { CategoryActionTypes, CategoryActions, CategoryState } from "./types";

const initialState: CategoryState = {
  message: null,
  error: null,
  loading: false,
  categories: [],
  selectedCategory: null,
};

const CategoryReducer = (
  state = initialState,
  action: CategoryActions
): CategoryState => {
  switch (action.type) {
    case CategoryActionTypes.START_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CategoryActionTypes.FINISH_REQUEST:
      return {
        ...state,
        loading: false,
      };
    case CategoryActionTypes.ALL_CATEGORIES_LOADED:
      return {
        ...state,
        loading: false,
        message: action.payload.Message,
        categories: action.payload.Payload,
      };
    case CategoryActionTypes.SELECT_CATEGORY:
      return {
        ...state,
        selectedCategory: action.payload,
      };
    case CategoryActionTypes.CATEGORY_UPDATED:
      return {
        ...state,
        message: action.payload.Message,
        categories: action.payload.Payload,
      };
    case CategoryActionTypes.CATEGORY_DELETED:
      return {
        ...state,
        message: action.payload.Message,
        categories: action.payload.Payload,
      };
    case CategoryActionTypes.CATEGORY_CREATED:
      return {
        ...state,
        message: action.payload.Message,
        categories: action.payload.Payload,
      };
    case CategoryActionTypes.SERVER_CATEGORY_ERROR:
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};

export default CategoryReducer;
