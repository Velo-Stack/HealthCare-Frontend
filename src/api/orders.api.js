/**
 * Orders API Service
 * All API calls related to medicine orders management
 */

import axiosInstance from './axiosInstance';
import { API_ENDPOINTS } from '../utils/constants';

/**
 * Get all orders with optional filters
 * @param {Object} params - Query parameters (status, page, limit, search)
 * @returns {Promise} Orders list
 */
export const getOrders = async (params = {}) => {
    const response = await axiosInstance.get(API_ENDPOINTS.ORDERS, { params });
    return response.data;
};

/**
 * Get single order by ID
 * @param {string} id - Order ID
 * @returns {Promise} Order data
 */
export const getOrderById = async (id) => {
    const response = await axiosInstance.get(`${API_ENDPOINTS.ORDERS}/${id}`);
    return response.data;
};

/**
 * Update order status
 * @param {string} id - Order ID
 * @param {string} status - New status (pending, approved, rejected, delivered)
 * @returns {Promise} Updated order
 */
export const updateOrderStatus = async (id, status) => {
    const response = await axiosInstance.patch(`${API_ENDPOINTS.ORDERS}/${id}/status`, { status });
    return response.data;
};

/**
 * Approve order
 * @param {string} id - Order ID
 * @returns {Promise} Updated order
 */
export const approveOrder = async (id) => {
    return updateOrderStatus(id, 'approved');
};

/**
 * Reject order
 * @param {string} id - Order ID
 * @returns {Promise} Updated order
 */
export const rejectOrder = async (id) => {
    return updateOrderStatus(id, 'rejected');
};

/**
 * Get order statistics
 * @returns {Promise} Order stats (total, pending, approved, rejected)
 */
export const getOrderStats = async () => {
    const response = await axiosInstance.get(`${API_ENDPOINTS.ORDERS}/stats`);
    return response.data;
};

export default {
    getOrders,
    getOrderById,
    updateOrderStatus,
    approveOrder,
    rejectOrder,
    getOrderStats,
};
