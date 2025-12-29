/**
 * Healthcare Dashboard - App Colors
 * Converted from Flutter AppColors
 */

export const colors = {
    // Primary Colors
    primaryDark: '#5C914C',
    primary: '#82C341',
    primaryLight: '#A6D672',

    // Neutral Colors
    white: '#FFFFFF',
    background: '#FFFFFF',
    scaffoldBackground: '#F5F5F5',

    // Text Colors
    textPrimary: '#1A1A1A',
    textSecondary: '#666666',
    textHint: '#999999',

    // Grey Scale
    black: '#000000',
    grey: '#BDBDBD',
    greyLight: '#E0E0E0',
    transparent: 'transparent',

    // Status Colors
    success: '#4CAF50',
    error: '#E53935',
    warning: '#FFC107',
    info: '#2196F3',
};

export const gradients = {
    primary: 'linear-gradient(to right, #5C914C, #82C341)',
    primaryVertical: 'linear-gradient(to bottom, #82C341, #A6D672)',
};

export const ORDER_STATUS = {
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    DELIVERED: 'delivered',
};

export const ORDER_STATUS_LABELS = {
    [ORDER_STATUS.PENDING]: 'Pending',
    [ORDER_STATUS.APPROVED]: 'Approved',
    [ORDER_STATUS.REJECTED]: 'Rejected',
    [ORDER_STATUS.DELIVERED]: 'Delivered',
};

export const ORDER_STATUS_COLORS = {
    [ORDER_STATUS.PENDING]: colors.warning,
    [ORDER_STATUS.APPROVED]: colors.success,
    [ORDER_STATUS.REJECTED]: colors.error,
    [ORDER_STATUS.DELIVERED]: colors.info,
};

export const ITEMS_PER_PAGE = 10;

export const API_ENDPOINTS = {
    USERS: '/users',
    INSURANCE: '/insurance',
    ORDERS: '/orders',
};

export default colors;
