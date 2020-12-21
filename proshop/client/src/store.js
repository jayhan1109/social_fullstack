import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {productList} from "./reducers/productListReducer";
import {productDetail} from "./reducers/productDetailReducer";
import {cart} from "./reducers/cartReducer";

const reducer = combineReducers({
  productList,
  productDetail,
  cart
});

const cartItemsFromStorage = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [];

const initialState = {
  cart: {cartItems: cartItemsFromStorage},
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;