import Axios from "axios";

const CART_ADD_ITEM = "CART_ADD_ITEM";
const CART_REMOVE_ITEM = "CART_REMOVE_ITEM";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const {data} = await Axios.get(`/api/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty
    }
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const cart = (state = {cartItems: []}, action) => {
  const {type, payload} = action;

  switch (type) {
    case CART_ADD_ITEM:
      const existItem = state.cartItems.find(x => x.product === payload.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(x => x.product === existItem.product ? payload : x)
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, payload]
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(x => x.product !== payload)
      };
    default:
      return state;
  }
};