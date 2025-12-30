/**
 * Cards API Service
 * User insurance cards API calls
 */

import axiosInstance from './axiosInstance';
import { API_ENDPOINTS } from '../utils/constants';

/**
 * Get all cards
 * @returns {Promise} Cards list
 */
export const getCards = async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.CARDS);
    return response.data;
};

/**
 * Get single card by ID
 * @param {string} id - Card ID
 * @returns {Promise} Card data
 */
export const getCardById = async (id) => {
    const response = await axiosInstance.get(`${API_ENDPOINTS.CARDS}/${id}`);
    return response.data;
};

export default {
    getCards,
    getCardById,
};
