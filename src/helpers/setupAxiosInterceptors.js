/* eslint-disable no-param-reassign */
import axios from 'axios';

const setupAxiosInterceptors = () => {
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('Authorization header added:', config.headers.Authorization);
      } else {
        // If no token is available, remove the "Authorization" header
        delete config.headers.Authorization;
        console.log('no token');
      }
      return config;
    },
    (error) => Promise.reject(error),
  );
};

export default setupAxiosInterceptors;
