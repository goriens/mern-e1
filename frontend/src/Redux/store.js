import {
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore,
} from "redux";
import thunk from "redux-thunk";
import { productReducer, reviewReducer } from "./App/reducer";
import { authReducer, profileReducer } from "./Auth/reducer";
import { cartReducer, orderReducer, getOrderReducer } from "./Cart/reducer";
import {
  adminReducer,
  adminOrderReducer,
  adminUserReducer,
  adminReviewsReducer,
} from "./Admin/reducer";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const rootReducer = combineReducers({
  productReducer,
  authReducer,
  profileReducer,
  cartReducer,
  orderReducer,
  getOrderReducer,
  reviewReducer,
  adminReducer,
  adminOrderReducer,
  adminUserReducer,
  adminReviewsReducer,
});

export const store = legacy_createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
