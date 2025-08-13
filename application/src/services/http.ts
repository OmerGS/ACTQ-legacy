import axios from 'axios';
import { BACKEND_API } from '../config';

const http = axios.create({
  baseURL: BACKEND_API.baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

http.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.data && error.response.data.error) {
      error.message = error.response.data.error;
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default http;