import * as Types from "./actionTypes";
import axios from "axios";

export const getProducts =
  (keyword = "", page = 1, price = [0, 10000], category = "", ratings = 0) =>
  (dispatch) => {
    dispatch({ type: Types.ALL_PRODUCT_REQUEST });
    let url = `/api/v1/products?keyword=${keyword}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
    if (category) {
      url = `/api/v1/products?keyword=${keyword}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
    }
    return axios
      .get(url)
      .then((r) =>
        dispatch({ type: Types.ALL_PRODUCT_SUCCESS, payload: r.data })
      )
      .catch((e) =>
        dispatch({ type: Types.ALL_PRODUCT_FAILURE, payload: e.response.data })
      );
  };

export const getSingleProducts = (id) => (dispatch) => {
  dispatch({ type: Types.SINGLE_PRODUCT_REQUEST });
  return axios
    .get(`/api/v1/product/${id}`)
    .then((r) =>
      dispatch({ type: Types.SINGLE_PRODUCT_SUCCESS, payload: r.data })
    )
    .catch((e) =>
      dispatch({ type: Types.SINGLE_PRODUCT_FAILURE, payload: e.data })
    );
};

export const clearError = () => async (dispatch) => {
  dispatch({ type: Types.CLEAR_ERROR });
};

export const createReview = (reviewData) => (dispatch) => {
  dispatch({ type: Types.NEW_REVIEW_REQUEST });
  return axios
    .put("/api/v1/review", reviewData)
    .then((r) => {
      dispatch({ type: Types.NEW_REVIEW_SUCCESS, payload: r.data });
    })
    .catch((e) => {
      dispatch({ type: Types.NEW_REVIEW_FAILURE, payload: e.response.data });
    });
};
