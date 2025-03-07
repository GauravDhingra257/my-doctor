import axios, { AxiosInstance } from "axios";

export const apiClient: AxiosInstance = axios.create({
    baseURL: 'https://admin.nexthealthcare.in/',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },  
  });
  // Add a request interceptor to include the access token in the Authorization header
  apiClient.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );