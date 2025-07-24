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
    return Promise.reject(error);
  }
);

export default http;