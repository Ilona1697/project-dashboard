import { combineReducers } from "redux";
import UserReducer from "./userReducer/index";
import CategoryReducer from "./categoryReducer/index";
import PostReducer from "./postReducer/index";

export const rootReducer = combineReducers({
  UserReducer,
  CategoryReducer,
  PostReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
