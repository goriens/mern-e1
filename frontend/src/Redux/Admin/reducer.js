import * as Types from "./actionTypes";
const initialState = {
  isLoading: false,
  isError: false,
  products: [],
  product: {},
  isUpdated: {},
};

export const adminReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case Types.ADMIN_ALL_PRODUCTS_REQUEST:
    case Types.CREATE_PRODUCT_REQUEST:
    case Types.UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case Types.CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        product: payload.product,
      };
    case Types.ADMIN_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        products: payload,
      };
    case Types.UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isUpdated: payload,
      };
    case Types.ADMIN_ALL_PRODUCTS_FAILURE:
    case Types.CREATE_PRODUCT_FAILURE:
    case Types.UPDATE_PRODUCT_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: payload,
      };
    case Types.CREATE_PRODUCT_RESET:
    case Types.UPDATE_PRODUCT_RESET:
      return {
        ...state,
        isLoading: false,
        isError: false,
        product: null,
        isUpdated: null,
      };
    case Types.CLEAR_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: null,
        product: null,
      };
    default:
      return state;
  }
};

const orderState = {
  isLoading: false,
  isError: false,
  orders: [],
  isUpdated: {},
};

export const adminOrderReducer = (state = orderState, action) => {
  const { type, payload } = action;
  switch (type) {
    case Types.GET_ALL_ORDER_REQUEST:
    case Types.UPDATE_ORDER_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case Types.UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isUpdated: payload,
      };
    case Types.GET_ALL_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        orders: payload,
      };
    case Types.GET_ALL_ORDER_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: payload,
        orders: null,
      };

    case Types.UPDATE_ORDER_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: payload,
        isUpdated: null,
      };
    case Types.RESET_ORDERS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        orders: null,
        isUpdated: null,
      };
    default:
      return state;
  }
};

const userState = {
  isLoading: false,
  isError: false,
  users: [],
  updatedUser: {},
  user: {},
};

export const adminUserReducer = (state = userState, action) => {
  const { type, payload } = action;
  switch (type) {
    case Types.GET_ALL_USER_REQUEST:
    case Types.UPDATE_USER_REQUEST:
    case Types.GET_SINGLE_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case Types.GET_ALL_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        users: payload,
      };
    case Types.GET_SINGLE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        user: payload,
      };

    case Types.UPDATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        updatedUser: payload,
      };

    case Types.GET_ALL_USER_FAILURE:
    case Types.UPDATE_USER_FAILURE:
    case Types.GET_SINGLE_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: payload,
        users: null,
      };
    case Types.CLEAR_ERROR:
      return {
        isLoading: false,
        isError: null,
      };

    default:
      return state;
  }
};

const reviewState = {
  isLoading: false,
  isError: false,
  reviews: [],
};

export const adminReviewsReducer = (state = reviewState, action) => {
  const { type, payload } = action;
  switch (type) {
    case Types.GET_ALL_REVIEWS_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case Types.GET_ALL_REVIEWS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        reviews: payload,
      };

    case Types.GET_ALL_REVIEWS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: payload,
        reviews: null,
      };
    default:
      return state;
  }
};
