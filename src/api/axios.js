import axios from 'axios';
import { saveUserData } from '../redux/reducers/auth.reducer';
import store from '../redux/store';

const baseURL = 'https://ekoxpedite.shop/api/v1/';
// const baseURL = 'http://localhost:4000/api/v1/';
// const baseURL = 'http://192.168.114.15:4000/api/v1/';

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

axiosInstance.interceptors.request.use(
  (config) => {
    const userdata = JSON.parse(localStorage.getItem('persist:auth'));
    const token = userdata && JSON.parse(userdata.user);
    if (token) {
      config.headers.cookie = `eko-admin-gateway=${token.id}`;
      axios.defaults.withCredentials = true;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Response received:', response);

    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn('Unauthorized. Redirecting to login...');
      store.dispatch(
        saveUserData({
          user: null,
          isAuthenticated: false
        })
      );
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
