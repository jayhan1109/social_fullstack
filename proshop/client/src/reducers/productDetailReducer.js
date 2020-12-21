import Axios from "axios";

const PRODUCT_DETAIL_REQUEST = "PRODUCT_DETAIL_REQUEST";
const PRODUCT_DETAIL_SUCCESS = "PRODUCT_DETAIL_SUCCESS";
const PRODUCT_DETAIL_FAIL = "PRODUCT_DETAIL_FAIL";

export const getProductDetail = id => async dispatch => {
  try {
    dispatch({type: PRODUCT_DETAIL_REQUEST});

    const {data} = await Axios.get(`/api/products/${id}`);

    dispatch({
      type: PRODUCT_DETAIL_SUCCESS,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_DETAIL_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message
    });
  }
};

export const productDetail = (state = {product: {}}, action) => {
  const {type, payload} = action;
  switch (type) {
    case PRODUCT_DETAIL_REQUEST:
      return {...state, loading: true,};
    case PRODUCT_DETAIL_SUCCESS:
      return {loading: false, product: payload};
    case PRODUCT_DETAIL_FAIL:
      return {loading: false, error: payload};
    default:
      return state;
  }
};