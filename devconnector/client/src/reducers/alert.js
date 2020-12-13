import {v4 as uuid} from "uuid";

const SET_ALERT = "SET_ALERT";
const REMOVE_ALERT = "REMOVE_ALERT";

export const setAlert = (msg, alertType, timeout = 3000) => dispatch => {
  const id = uuid();
  dispatch({
    type: SET_ALERT,
    payload: {msg, alertType, id}
  });

  setTimeout(() => dispatch({type: REMOVE_ALERT, payload: id}), timeout);
};

const initialState = [];

export default function (state = initialState, action) {

  const {type, payload} = action;

  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
}