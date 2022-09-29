import axios from "axios";
import * as Types from "./actionTypes";

export const addItemsToCart = (id, quantity) => (dispatch, getState) => {
  return axios.get(`/api/v1/product/${id}`, quantity).then((r) => {
    dispatch({
      type: Types.ADD_TO_CART,
      payload: {
        product: r.data.product._id,
        name: r.data.product.name,
        price: r.data.product.price,
        image: r.data.product.images[0],
        stock: r.data.product.stock,
        quantity,
      },
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cartReducer.cartItems)
    );
  });
};

export const removeItemCart = (id) => (dispatch, getState) => {
  dispatch({ type: Types.REMOVE_CART_ITEM, payload: id });
  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().cartReducer.cartItems)
  );
};

export const saveShippingInfo = (data) => (dispatch) => {
  dispatch({ type: Types.SAVE_SHIPPING_INFO, payload: data });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};

//order
export const createOrder = (order) => (dispatch) => {
  dispatch({ type: Types.CREATE_ORDER_REQUEST });
  return axios
    .post("/api/v1/order/new", order)
    .then((r) => {
      dispatch(
        { type: Types.CREATE_ORDER_SUCCESS, payload: r.data },
        console.log(r.data)
      );
    })
    .catch((e) => {
      dispatch(
        { type: Types.CREATE_ORDER_FAILURE, payload: e.response.data },
        console.log(e.response.data)
      );
    });
};
export const getMyOrders = () => (dispatch) => {
  dispatch({ type: Types.GET_ORDER_REQUEST });
  return axios
    .get("/api/v1/orders/me")
    .then((r) => {
      dispatch({ type: Types.GET_ORDER_SUCCESS, payload: r.data.order });
    })
    .catch((e) => {
      dispatch({ type: Types.GET_ORDER_FAILURE, payload: e.response.data });
    });
};

export const getSingleOrder = (id) => (dispatch) => {
  dispatch({ type: Types.GET_SINGLE_ORDER_REQUEST });
  return axios
    .get(`/api/v1/order/${id}`)
    .then((r) => {
      dispatch({ type: Types.GET_SINGLE_ORDER_SUCCESS, payload: r.data });
    })
    .catch((e) => {
      dispatch({
        type: Types.GET_SINGLE_ORDER_REQUEST,
        payload: e.response.data,
      });
    });
};
