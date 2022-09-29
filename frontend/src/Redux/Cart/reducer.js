import * as Types from "./actionTypes";

const cartState = {
  isLoading: false,
  isError: false,
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  shippingInfo: localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : {},
};
export const cartReducer = (state = cartState, action) => {
  const { type, payload } = action;
  switch (type) {
    case Types.ADD_TO_CART:
      const item = payload;
      const isItemExist = state.cartItems.find(
        (i) => i.product === item.product
      );

      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === isItemExist.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case Types.REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== payload),
      };
    case Types.SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: payload,
      };

    default:
      return state;
  }
};

const orderState = {
  isLoading: false,
  isError: false,
  order: {},
};

export const orderReducer = (state = orderState, action) => {
  const { type, payload } = action;
  switch (type) {
    case Types.CREATE_ORDER_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case Types.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        order: payload,
      };
    case Types.CREATE_ORDER_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: payload,
        order: null,
      };
    default:
      return state;
  }
};

const getOrderState = {
  isLoading: false,
  isError: false,
  orders: [],
  order: {},
};

export const getOrderReducer = (state = getOrderState, action) => {
  const { type, payload } = action;
  switch (type) {
    case Types.GET_ORDER_REQUEST:
    case Types.GET_SINGLE_ORDER_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case Types.GET_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        orders: payload,
      };
    case Types.GET_SINGLE_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        order: payload,
      };
    case Types.GET_ORDER_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: payload,
        orders: null,
      };
    case Types.GET_SINGLE_ORDER_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: payload,
        order: null,
      };
    default:
      return state;
  }
};
