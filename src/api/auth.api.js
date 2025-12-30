/**
 * Auth API Service
 * Authentication API calls
 */

import axiosInstance from './axiosInstance';
import { API_ENDPOINTS } from '../utils/constants';

/**
 * Login user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} Login response with token
 */
export const login = async (email, password) => {
    const response = await axiosInstance.post(`${API_ENDPOINTS.AUTH}/login`, {
        email,
        password,
    });
    return response.data;
};

export default {
    login,
};
