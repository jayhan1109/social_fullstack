import Axios from "axios";

const PRODUCT_LIST_REQUEST = "PRODUCT_LIST_REQUEST";
const PRODUCT_LIST_SUCCESS = "PRODUCT_LIST_SUCCESS";
const PRODUCT_LIST_FAIL = "PRODUCT_LIST_FAIL";

export const listProducts = () => async dispatch => {
  try {
    dispatch({type: PRODUCT_LIST_REQUEST});

    const {data} = await Axios.get("/api/products");

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message
    });
  }
};


export const productList = (state = {products: []}, action) => {
  const {type, payload} = action;
  switch (type) {
    case PRODUCT_LIST_REQUEST:
      return {...state, loading: true};
    case PRODUCT_LIST_SUCCESS:
      return {loading: false, products: payload};
    case PRODUCT_LIST_FAIL:
      return {loading: false, error: payload};
    default:
      return state;
  }
};