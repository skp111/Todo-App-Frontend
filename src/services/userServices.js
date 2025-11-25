// src/services/userServices.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

// Upload/update user data (FormData with optional file)
const userData = (formData) => {
  return api.post('/user', formData);
};

export default userData;
