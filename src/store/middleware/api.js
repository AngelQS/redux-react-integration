import axios from "axios";

import * as actions from "../api";

const api = ({ dispatch }) => (next) => async (action) => {
  if (action.type !== actions.apiCallBegan.type) {
    return next(action);
  }

  const { url, method, data, onStart, onSuccess, onError } = action.payload;

  if (onStart) dispatch({ type: onStart });

  next(action);

  try {
    const response = await axios.request({
      baseURL: "http://localhost:9001/api",
      url,
      method,
      data,
    });
    console.log("RESPONSE:", response);
    // General success
    dispatch(actions.apiCallSuccess(response.data));
    // Specific success when onSuccess is defined
    if (onSuccess) {
      dispatch({ type: onSuccess, payload: response.data });
    }
  } catch (err) {
    // General error
    dispatch(actions.apiCallFailed(err.message));
    // Specific error when onError is defined
    if (onError) {
      dispatch({ type: onError, payload: err.message });
    }
  }
};

export default api;
