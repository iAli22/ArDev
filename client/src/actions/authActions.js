import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER } from "./types";

export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData) // BackEnd
    .then(res => history.push("/login")) // Redirect
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login User Token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      // Set token to ls
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set Logged User
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// LogOut User
export const logoutUser = () => dispatch => {
  // Rempve Token  from LocalStorg
  localStorage.removeItem("jwtToken");
  // Remove auth Header from Future Requests
  setAuthToken(false);
  // Set Current User To {} , set isAuthenticated to False
  dispatch(setCurrentUser({}));
  // Redirect To Login Page
};
