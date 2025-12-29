/**
 * Users API Service
 * All API calls related to user management
 */

import axiosInstance from './axiosInstance';
import { API_ENDPOINTS } from '../utils/constants';

/**
 * Get all users with optional pagination
 * @param {Object} params - Query parameters
 * @returns {Promise} Users list
 */
export const getUsers = async (params = {}) => {
    const response = await axiosInstance.get(API_ENDPOINTS.USERS, { params });
    return response.data;
};

/**
 * Get single user by ID
 * @param {string} id - User ID
 * @returns {Promise} User data
 */
export const getUserById = async (id) => {
    const response = await axiosInstance.get(`${API_ENDPOINTS.USERS}/${id}`);
    return response.data;
};

/**
 * Update user data
 * @param {string} id - User ID
 * @param {Object} data - Updated user data
 * @returns {Promise} Updated user
 */
export const updateUser = async (id, data) => {
    const response = await axiosInstance.put(`${API_ENDPOINTS.USERS}/${id}`, data);
    return response.data;
};

/**
 * Delete user by ID
 * @param {string} id - User ID
 * @returns {Promise} Deletion result
 */
export const deleteUser = async (id) => {
    const response = await axiosInstance.delete(`${API_ENDPOINTS.USERS}/${id}`);
    return response.data;
};

/**
 * Update user points
 * @param {string} id - User ID
 * @param {number} points - New points value
 * @returns {Promise} Updated user
 */
export const updateUserPoints = async (id, points) => {
    const response = await axiosInstance.patch(`${API_ENDPOINTS.USERS}/${id}/points`, { points });
    return response.data;
};

export default {
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    updateUserPoints,
};
