import axios from 'axios';

// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:5000/api',
// });

const axiosInstance = axios.create({
  baseURL: 'https://memberbackend.onrender.com/api',
});

// https://memberbackend.onrender.com
// Request Interceptor: Attach Token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle Global Errors (Optional)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can handle global errors here (e.g., redirect to login if 401)
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // window.location.href = '/login'; // Optional: Auto-redirect
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
