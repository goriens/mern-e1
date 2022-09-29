import * as Types from "./actionTypes";
import axios from "axios";

export const loginUser = (params) => (dispatch) => {
  dispatch({ type: Types.LOGIN_SUCCESS_REQUEST });
  return axios
    .post("/api/v1/login", params)
    .then((r) => {
      dispatch({ type: Types.LOGIN_SUCCESS_SUCCESS, payload: r.data });
      return Types.LOGIN_SUCCESS_SUCCESS;
    })
    .catch((e) => {
      dispatch({
        type: Types.LOGIN_SUCCESS_FAILURE,
        payload: e.response.data,
      });
      return Types.LOGIN_SUCCESS_FAILURE;
    });
};

export const registerUser = (payload) => (dispatch) => {
  dispatch({ type: Types.REGISTER_SUCCESS_REQUEST });
  return axios
    .post("/api/v1/register", payload, {
      headers: {
        "content-type": "multipart/formdata",
      },
    })
    .then((r) => {
      dispatch({ type: Types.REGISTER_SUCCESS_SUCCESS, payload: r.data });
      return Types.REGISTER_SUCCESS_SUCCESS;
    })
    .catch((e) => {
      dispatch({
        type: Types.REGISTER_SUCCESS_FAILURE,
        payload: e.response.data,
      });
      return Types.REGISTER_SUCCESS_FAILURE;
    });
};
// export const registerUser = (userData) => async (dispatch) => {
//   try {
//     dispatch({ type: Types.REGISTER_SUCCESS_REQUEST });

//     const config = { headers: { "Content-Type": "multipart/form-data" } };

//     const { data } = await axios.post(`/api/v1/register`, userData, config);

//     dispatch({ type: Types.REGISTER_SUCCESS_SUCCESS, payload: data });
//     return Types.REGISTER_SUCCESS_SUCCESS;
//   } catch (error) {
//     dispatch({
//       type: Types.REGISTER_SUCCESS_FAILURE,
//       payload: error.response.data,
//     });
//   }
// };

export const getProfile = () => (dispatch) => {
  dispatch({ type: Types.USER_PROFILE_REQUEST });
  return axios
    .get("/api/v1/me")
    .then((r) => {
      dispatch({ type: Types.USER_PROFILE_SUCCESS, payload: r.data });

      return Types.USER_PROFILE_SUCCESS;
    })
    .catch((e) => {
      dispatch({
        type: Types.USER_PROFILE_FAILURE,
        payload: e.response.data,
      });
    });
};

export const userLogout = () => (dispatch) => {
  return axios
    .get("/api/v1/logout")
    .then((r) => {
      dispatch({ type: Types.USER_LOGOUT_SUCCESS, payload: r.data });
      return Types.USER_LOGOUT_SUCCESS;
    })
    .catch((e) => {
      dispatch({ type: Types.USER_LOGOUT_FAILURE, payload: e });
    });
};
export const clearError = () => (dispatch) => {
  dispatch({ type: Types.CLEAR_ERROR });
};
export const updateAccount = (userData) => (dispatch) => {
  dispatch({ type: Types.UPDATED_PROFILE_REQUEST });
  return axios
    .put("/api/v1/me/update", userData)
    .then((r) => {
      dispatch({ type: Types.UPDATED_PROFILE_SUCCESS });
      return Types.UPDATED_PROFILE_SUCCESS;
    })
    .catch((e) => {
      dispatch({
        type: Types.UPDATED_PROFILE_FAILURE,
        payload: e.response.data,
      });
    });
};
