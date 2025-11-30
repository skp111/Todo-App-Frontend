import axios from 'axios'; 
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // backend base url
  withCredentials: true, // cookies for auth (optional)
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


const registerUser = (data) => api.post('/register', data);
const loginUser = (data) => api.post('/login', data);
const sendSecurityCode = (data) => api.post('/send-code', data);
const verifySecurityCode = (data) => api.post('/verify-code', data);
const resetPassword = (data) => api.post('/reset-password', data);
const verifyUser = () => api.get('/verify-user', { withCredentials: true });
const logoutUser = () => api.post('/logout', { withCredentials: true });

const AuthServices = { registerUser, loginUser, sendSecurityCode, verifySecurityCode, resetPassword, verifyUser, logoutUser };
export default AuthServices;
