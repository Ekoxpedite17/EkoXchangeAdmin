import axios from "axios";
import { saveUserData } from "../redux/reducers/auth.reducer";
import store from "../redux/store";

// const baseURL = 'https://api.ekoxchange.com/api/v1/';
const baseURL = "http://localhost:4000/api/v1/";
// const baseURL = "http://172.20.10.2:4000/api/v1/";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response received:", response);

    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized. Redirecting to login...");
      // store.dispatch(
      //   saveUserData({
      //     user: null,
      //     isAuthenticated: false
      //   })
      // );
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
