import axios from "axios";

const setAuthToken = token => {
  if (token) {
    // Apply To every Request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete Auth header
    delete axios.defaults.headers.common["Authorization"]; // setAuthToken(false); in logoutUser
  }
};

export default setAuthToken;
