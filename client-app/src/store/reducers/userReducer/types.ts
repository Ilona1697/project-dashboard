export interface UserState {
  user: any;
  message: null | string;
  loading: boolean;
  error: null | string;
  isAuth: boolean;
  selectedUser: any;
  users: [];
}

export enum UserActionTypes {
  START_REQUEST = "START_REQUEST",
  FINISH_REQUEST = "FINISH_REQUEST",
  LOGIN_USER = "LOGIN_USER",
  LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS",
  LOGIN_USER_ERROR = "LOGIN_USER_ERROR",
  SERVER_USER_ERROR = "SERVER_USER_ERROR",
  LOGOUT_USER = "LOGOUT_USER",
  ALL_USERS_LOADED = "ALL_USERS_LOADED",
  SELECT_USER = "SELECT_USER",
  USER_UPDATED = "USER_UPDATED",
  USER_DELETED = "USER_DELETED",
  REGISTER_USER = "REGISTER_USER",
  USER_BLOCKED = "USER_BLOCKED",
}
interface UserBlockedActions {
  type: UserActionTypes.USER_BLOCKED;
  payload: any;
}
interface UserRegisteredActions {
  type: UserActionTypes.REGISTER_USER;
  payload: any;
}
interface UserUpdatedActions {
  type: UserActionTypes.USER_UPDATED;
  payload: any;
}
interface UserDeletedActions {
  type: UserActionTypes.USER_DELETED;
  payload: any;
}
interface SelectUserActions {
  type: UserActionTypes.SELECT_USER;
  payload: any;
}

interface FinishUserRequestActions {
  type: UserActionTypes.FINISH_REQUEST;
  payload: any;
}

interface AllUsersLoadedActions {
  type: UserActionTypes.ALL_USERS_LOADED;
  payload: any;
}

interface LogoutUserAction {
  type: UserActionTypes.LOGOUT_USER;
}

interface StartRequestAction {
  type: UserActionTypes.START_REQUEST;
}

interface ServerErrorAction {
  type: UserActionTypes.SERVER_USER_ERROR;
  payload: string;
}

interface LoginUserAction {
  type: UserActionTypes.LOGIN_USER;
}

interface LoginUserSuccessAction {
  type: UserActionTypes.LOGIN_USER_SUCCESS;
  payload: any;
}

interface LoginUserErrorAction {
  type: UserActionTypes.LOGIN_USER_ERROR;
  payload: string;
}

export type UserActions =
  | UserBlockedActions
  | UserRegisteredActions
  | UserUpdatedActions
  | UserDeletedActions
  | SelectUserActions
  | FinishUserRequestActions
  | AllUsersLoadedActions
  | LogoutUserAction
  | ServerErrorAction
  | StartRequestAction
  | LoginUserAction
  | LoginUserErrorAction
  | LoginUserSuccessAction;
