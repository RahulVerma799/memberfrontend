import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:5000/api',
  baseURL: 'https://memberbackend.onrender.com/api',
  // Local development URL
});

// Request Interceptor: Attach Token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    // Ensure token is not null, undefined, or the string "null"/"undefined"
    if (token && token !== 'null' && token !== 'undefined') {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle Global Errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Optional: window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
