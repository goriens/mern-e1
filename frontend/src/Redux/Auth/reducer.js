import * as Types from "./actionTypes";

const initialState = {
  isAuth: false,
  isLoading: false,
  isError: null,
  user: {},
};

export const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case Types.LOGIN_SUCCESS_REQUEST:
    case Types.REGISTER_SUCCESS_REQUEST:
    case Types.USER_PROFILE_REQUEST:
      return {
        ...state,
        isLoading: true,
        isAuth: false,
        isError: false,
      };
    case Types.LOGIN_SUCCESS_SUCCESS:
    case Types.USER_PROFILE_SUCCESS:
      return {
        ...state,
        isError: false,
        isLoading: false,
        isAuth: true,
        user: payload,
      };
    case Types.REGISTER_SUCCESS_SUCCESS:
      return {
        ...state,
        isError: false,
        isLoading: false,
        user: payload,
      };
    case Types.LOGIN_SUCCESS_FAILURE:
    case Types.REGISTER_SUCCESS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: payload,
        isAuth: false,
      };
    case Types.USER_PROFILE_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuth: false,
      };
    case Types.USER_LOGOUT_SUCCESS:
      return {
        isLoading: false,
        isAuth: false,
        user: null,
      };
    case Types.USER_LOGOUT_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: payload,
      };
    case Types.CLEAR_ERROR:
      return {
        ...state,
        isError: null,
        isLoading: false,
      };
    default:
      return state;
  }
};
const profileState = {
  isLoading: false,
  isError: false,
  updatedUser: {},
};
export const profileReducer = (state = profileState, action) => {
  const { type, payload } = action;
  switch (type) {
    case Types.UPDATED_PROFILE_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case Types.UPDATED_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        updatedUser: payload,
      };
    case Types.UPDATED_PROFILE_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: payload,
        updatedUser: null,
      };
    case Types.UPDATED_PROFILE_RESET:
      return {
        ...state,
        isError: null,
      };
    case Types.CLEAR_ERROR:
      return {
        ...state,
        isError: null,
      };
    default:
      return state;
  }
};
