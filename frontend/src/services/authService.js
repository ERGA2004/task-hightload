import axios from 'axios';

const API_USERS_URL = process.env.REACT_APP_API_USERS;

export const register = async (userData) => {
    const response = await axios.post(`${API_USERS_URL}/register`, userData);
    return response.data;
};

export const login = async (credentials) => {
    const response = await axios.post(`${API_USERS_URL}/login`, credentials);
    localStorage.setItem('token', response.data.token);
    return response.data.token;
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export const logout = () => {
    localStorage.removeItem('token');
};
