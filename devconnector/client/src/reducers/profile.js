import Axios from "axios";

const GET_PROFILE = "GET_PROFILE";
const PROFILE_ERROR = "PROFILE_ERROR";

export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await Axios.get("/api/profile/me");

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    });
  }
};

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {}
};


export default function (state = initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}