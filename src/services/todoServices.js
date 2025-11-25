import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
});

// SERVICES
const getTodos = (_id) => api.get(`/todo/${_id}`);
const postTodo = (data) => api.post('/todo/create', data);
const updateTodo = (_id, data) => api.put(`/todo/${_id}`, data);
const deleteTodo = (_id) => api.delete(`/todo/${_id}`);

const todoServices = { getTodos, postTodo, updateTodo, deleteTodo };
export default todoServices;
