import axios from "axios";
import * as Types from "./actionTypes";

export const getAllProductAdmin = () => (dispatch) => {
  dispatch({ type: Types.ADMIN_ALL_PRODUCTS_REQUEST });
  return axios
    .get("/api/v1/admin/products")
    .then((r) => {
      dispatch({ type: Types.ADMIN_ALL_PRODUCTS_SUCCESS, payload: r.data });
    })
    .catch((e) => {
      dispatch({
        type: Types.ADMIN_ALL_PRODUCTS_FAILURE,
        payload: e.response.data,
      });
    });
};

export const createProduct = (productData) => (dispatch) => {
  dispatch({ type: Types.CREATE_PRODUCT_REQUEST });
  return axios
    .post("/api/v1/admin/product/new", productData)
    .then((r) => {
      dispatch(
        { type: Types.CREATE_PRODUCT_SUCCESS, payload: r.data },
        console.log(r.data)
      );
      return Types.CREATE_PRODUCT_SUCCESS;
    })
    .catch((e) => {
      dispatch(
        {
          type: Types.CREATE_PRODUCT_FAILURE,
          payload: e.response.data,
        },
        console.log(e.response.data)
      );
    });
};

export const clearError = () => (dispatch) => {
  dispatch({ type: Types.CLEAR_ERROR });
};

export const deleteProduct = (id) => (dispatch) => {
  dispatch({ type: Types.DELETE_PRODUCT_REQUEST });
  return axios
    .delete(`/api/v1/admin/product/${id}`)
    .then((r) => {
      dispatch({ type: Types.DELETE_PRODUCT_SUCCESS, payload: r.data });
    })
    .then((e) => {
      dispatch({
        type: Types.DELETE_PRODUCT_FAILURE,
        payload: e.response.data,
      });
    });
};

export const updateProduct = (id, productData) => (dispatch) => {
  dispatch({ type: Types.UPDATE_PRODUCT_REQUEST });
  return axios
    .put(`/api/v1/admin/product/${id}`, productData)
    .then((r) => {
      dispatch({
        type: Types.UPDATE_PRODUCT_SUCCESS,
        payload: r.data,
      });
      return Types.UPDATE_PRODUCT_SUCCESS;
    })
    .catch((e) => {
      dispatch({
        type: Types.UPDATE_PRODUCT_FAILURE,
        payload: e.response.data,
      });
      return Types.UPDATE_PRODUCT_FAILURE;
    });
};

// get all order (admin)
export const getAllOrders = () => (dispatch) => {
  dispatch({ type: Types.GET_ALL_ORDER_REQUEST });
  return axios
    .get("/api/v1/admin/orders")
    .then((r) => {
      dispatch({ type: Types.GET_ALL_ORDER_SUCCESS, payload: r.data });
    })
    .catch((e) => {
      dispatch({ type: Types.GET_ALL_ORDER_FAILURE, payload: e.response.data });
    });
};

export const deleteOrder = (id) => (dispatch) => {
  dispatch({ type: Types.DELETE_ORDER_REQUEST });
  return axios
    .delete(`/api/v1/admin/order/${id}`)
    .then((r) => {
      dispatch({ type: Types.DELETE_ORDER_SUCCESS, payload: r.data });
    })
    .then((e) => {
      dispatch({
        type: Types.DELETE_ORDER_FAILURE,
        payload: e.response.data,
      });
    });
};
export const updateOrder = (id, orderStatus) => (dispatch) => {
  dispatch({ type: Types.UPDATE_ORDER_REQUEST });
  return axios
    .put(`/api/v1/admin/order/${id}`, orderStatus)
    .then((r) => {
      dispatch({
        type: Types.UPDATE_ORDER_SUCCESS,
        payload: r.data,
      });
      return Types.UPDATE_ORDER_SUCCESS;
    })
    .catch((e) => {
      dispatch({
        type: Types.UPDATE_ORDER_FAILURE,
        payload: e.response.data,
      });
      return Types.UPDATE_ORDER_FAILURE;
    });
};

//all user
export const getAllUsers = () => (dispatch) => {
  dispatch({ type: Types.GET_ALL_USER_REQUEST });
  return axios
    .get("/api/v1/admin/users")
    .then((r) => {
      dispatch({ type: Types.GET_ALL_USER_SUCCESS, payload: r.data });
    })
    .catch((e) => {
      dispatch({
        type: Types.GET_ALL_USER_FAILURE,
        payload: e.response.data,
      });
    });
};
// user details
export const getSingleUser = (id) => (dispatch) => {
  dispatch({ type: Types.GET_SINGLE_USER_REQUEST });
  return axios
    .get(`/api/v1/admin/user/${id}`)
    .then((r) => {
      dispatch({ type: Types.GET_SINGLE_USER_SUCCESS, payload: r.data.user });
    })
    .catch((e) => {
      dispatch({
        type: Types.GET_SINGLE_USER_FAILURE,
        payload: e.response.data,
      });
    });
};
// update user
export const updateUser = (id, userData) => (dispatch) => {
  dispatch({ type: Types.UPDATE_USER_REQUEST });
  return axios
    .put(`/api/v1/admin/user/${id}`, userData)
    .then((r) => {
      dispatch({
        type: Types.UPDATE_USER_SUCCESS,
        payload: r.data,
      });
      return Types.UPDATE_USER_SUCCESS;
    })
    .catch((e) => {
      dispatch({
        type: Types.UPDATE_USER_FAILURE,
        payload: e.response.data,
      });
      return Types.UPDATE_USER_FAILURE;
    });
};
// delete user
export const deleteUser = (id) => (dispatch) => {
  dispatch({ type: Types.DELETE_USER_REQUEST });
  return axios
    .delete(`/api/v1/admin/user/${id}`)
    .then((r) => {
      dispatch({ type: Types.DELETE_USER_SUCCESS, payload: r.data });
    })
    .then((e) => {
      dispatch({
        type: Types.DELETE_USER_FAILURE,
        payload: e.response,
      });
    });
};

// reviews
export const getAllReviews = (id) => (dispatch) => {
  dispatch({ type: Types.GET_ALL_REVIEWS_REQUEST });
  return axios
    .get(`/api/v1/reviews?id=${id}`)
    .then((r) => {
      dispatch(
        { type: Types.GET_ALL_REVIEWS_SUCCESS, payload: r.data }
        // console.log(r.data)
      );
    })
    .catch((e) => {
      dispatch({
        type: Types.GET_ALL_REVIEWS_FAILURE,
        payload: e.response.data,
      });
    });
};

export const deleteReviews = (productId, reviewId) => (dispatch) => {
  dispatch({ type: Types.DELETE_REVIEW_REQUEST });
  return axios
    .delete(`/api/v1/reviews?productId=${productId}&id=${reviewId}`)
    .then((r) => {
      dispatch({ type: Types.DELETE_REVIEW_SUCCESS, payload: r.data });
      return Types.DELETE_REVIEW_SUCCESS;
    })

    .then((e) => {
      dispatch({
        type: Types.DELETE_REVIEW_FAILURE,
        payload: e,
      });
    });
};
