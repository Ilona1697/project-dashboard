import { UserActions, UserActionTypes, UserState } from "./types";

const initialState: UserState = {
  user: {},
  message: null,
  error: null,
  loading: false,
  isAuth: false,
  selectedUser: null,
  users: [],
};

const UserReducer = (state = initialState, action: UserActions): UserState => {
  switch (action.type) {
    case UserActionTypes.START_REQUEST:
      return { ...state, loading: true };
    case UserActionTypes.LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.decodedToken,
        loading: false,
        isAuth: true,
        message: action.payload.Message,
      };
    case UserActionTypes.LOGIN_USER_ERROR:
      return {
        ...state,
        message: action.payload,
        loading: false,
      };
    case UserActionTypes.FINISH_REQUEST:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case UserActionTypes.SELECT_USER:
      return { ...state, selectedUser: action.payload };
    case UserActionTypes.LOGOUT_USER:
      return {
        user: null,
        message: null,
        error: null,
        loading: false,
        isAuth: false,
        selectedUser: null,
        users: [],
      };
    case UserActionTypes.USER_UPDATED:
      return {
        ...state,
        message: action.payload.Message,
        users: action.payload.Payload,
      };
    case UserActionTypes.USER_BLOCKED:
      return {
        ...state,
        message: action.payload.Message,
        users: action.payload.Payload
      };
    case UserActionTypes.USER_DELETED:
      return {
        ...state,
        message: action.payload.Message,
        users: action.payload.Payload,
      };
    case UserActionTypes.ALL_USERS_LOADED:
      return {
        ...state,
        loading: false,
        message: action.payload.Message,
        users: action.payload.Payload,
      };
    case UserActionTypes.SERVER_USER_ERROR:
      return {
        ...state,
        message: action.payload,
      };
    case UserActionTypes.REGISTER_USER:
      return {
        ...state,
        message: action.payload.Message,
        users: action.payload.Payload,
      };
    default:
      return state;
  }
};

export default UserReducer;
