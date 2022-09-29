import * as Types from "./actionTypes";

const initialState = {
  allProducts: [],
  productCount: 0,
  isLoading: false,
  isError: false,
  product: {},
  resultPerPage: 0,
  totalPages: 0,
};

export const productReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case Types.ALL_PRODUCT_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case Types.ALL_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        allProducts: payload.products,
        productCount: payload.productCount,
        resultPerPage: action.payload.resultPerPage,
        totalPages: action.payload.totalPages,
      };
    case Types.ALL_PRODUCT_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case Types.SINGLE_PRODUCT_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case Types.SINGLE_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        product: payload.product,
      };
    case Types.SINGLE_PRODUCT_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case Types.CLEAR_ERROR:
      return {
        ...state,
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
  review: null,
};

export const reviewReducer = (state = reviewState, action) => {
  const { type, payload } = action;

  switch (type) {
    case Types.NEW_REVIEW_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        review: null,
      };
    case Types.NEW_REVIEW_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        review: payload,
      };
    case Types.NEW_REVIEW_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: payload,
        review: null,
      };
    case Types.NEW_REVIEW_RESET:
      return {
        ...state,
        isLoading: false,
        review: null,
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
