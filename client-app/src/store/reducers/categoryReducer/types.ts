export interface CategoryState {
  categories: any;
  message: null | string;
  loading: boolean;
  error: null | string;
  selectedCategory: any;
}

export enum CategoryActionTypes {
  START_REQUEST = "START_REQUEST",
  FINISH_REQUEST = "FINISH_REQUEST",
  ALL_CATEGORIES_LOADED = "ALL_CATEGORIES_LOADED",
  SERVER_CATEGORY_ERROR = "SERVER_CATEGORY_ERROR",
  SELECT_CATEGORY = "SELECT_CATEGORY",
  CATEGORY_UPDATED = "CATEGORY_UPDATED",
  CATEGORY_DELETED = "CATEGORY_DELETED",
  CATEGORY_CREATED = "CATEGORY_CREATED",
}
interface CategoryCreatedActions {
  type: CategoryActionTypes.CATEGORY_CREATED;
  payload: any;
}
interface CategoryDeletedActions {
  type: CategoryActionTypes.CATEGORY_DELETED;
  payload: any;
}
interface CategoryUpdatedActions {
  type: CategoryActionTypes.CATEGORY_UPDATED;
  payload: any;
}
interface SelectedCategoryActions {
  type: CategoryActionTypes.SELECT_CATEGORY;
  payload: any;
}

interface AllCategoriesActions {
  type: CategoryActionTypes.ALL_CATEGORIES_LOADED;
  payload: any;
}

interface FinishRequestAction {
  type: CategoryActionTypes.FINISH_REQUEST;
}

interface StartRequestAction {
  type: CategoryActionTypes.START_REQUEST;
}

interface ServerErrorAction {
  type: CategoryActionTypes.SERVER_CATEGORY_ERROR;
  payload: string;
}

export type CategoryActions =
  | CategoryCreatedActions
  | CategoryDeletedActions
  | CategoryUpdatedActions
  | SelectedCategoryActions
  | FinishRequestAction
  | AllCategoriesActions
  | ServerErrorAction
  | StartRequestAction;
