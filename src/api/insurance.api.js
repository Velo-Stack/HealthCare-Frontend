/**
 * Insurance API Service
 * All API calls related to insurance companies management
 */

import axiosInstance from './axiosInstance';
import { API_ENDPOINTS } from '../utils/constants';

/**
 * Get all insurance companies
 * @param {Object} params - Query parameters
 * @returns {Promise} Insurance companies list
 */
export const getInsuranceCompanies = async (params = {}) => {
    const response = await axiosInstance.get(API_ENDPOINTS.INSURANCE, { params });
    return response.data;
};

/**
 * Get single insurance company by ID
 * @param {string} id - Insurance company ID
 * @returns {Promise} Insurance company data
 */
export const getInsuranceById = async (id) => {
    const response = await axiosInstance.get(`${API_ENDPOINTS.INSURANCE}/${id}`);
    return response.data;
};

/**
 * Create new insurance company
 * @param {FormData} data - Insurance company data (with logo file)
 * @returns {Promise} Created insurance company
 */
export const createInsurance = async (data) => {
    const response = await axiosInstance.post(API_ENDPOINTS.INSURANCE, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

/**
 * Update insurance company
 * @param {string} id - Insurance company ID
 * @param {FormData} data - Updated data (with optional logo file)
 * @returns {Promise} Updated insurance company
 */
export const updateInsurance = async (id, data) => {
    const response = await axiosInstance.put(`${API_ENDPOINTS.INSURANCE}/${id}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

/**
 * Delete insurance company by ID
 * @param {string} id - Insurance company ID
 * @returns {Promise} Deletion result
 */
export const deleteInsurance = async (id) => {
    const response = await axiosInstance.delete(`${API_ENDPOINTS.INSURANCE}/${id}`);
    return response.data;
};

/**
 * Toggle insurance company active status
 * @param {string} id - Insurance company ID
 * @param {boolean} isActive - New active status
 * @returns {Promise} Updated insurance company
 */
export const toggleInsuranceStatus = async (id, isActive) => {
    const response = await axiosInstance.patch(`${API_ENDPOINTS.INSURANCE}/${id}/status`, { isActive });
    return response.data;
};

export default {
    getInsuranceCompanies,
    getInsuranceById,
    createInsurance,
    updateInsurance,
    deleteInsurance,
    toggleInsuranceStatus,
};
