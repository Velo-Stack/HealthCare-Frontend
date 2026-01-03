/**
 * useOrders Hook
 * React Query hooks for orders management
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    getOrders,
    getOrderById,
    updateOrderStatus,
    approveOrder,
    rejectOrder,
    getOrderStats,
    updateAdminNotes,
} from '../api/orders.api';
import toast from 'react-hot-toast';

const ORDERS_KEY = 'orders';
const ORDERS_STATS_KEY = 'orders-stats';

/**
 * Hook to fetch all orders
 * @param {Object} params - Query parameters (status, page, limit, search)
 */
export const useOrders = (params = {}) => {
    return useQuery({
        queryKey: [ORDERS_KEY, params],
        queryFn: () => getOrders(params),
        staleTime: 2 * 60 * 1000, // 2 minutes (orders change frequently)
    });
};

/**
 * Hook to fetch single order
 * @param {string} id - Order ID
 */
export const useOrder = (id) => {
    return useQuery({
        queryKey: [ORDERS_KEY, id],
        queryFn: () => getOrderById(id),
        enabled: !!id,
    });
};

/**
 * Hook to fetch order statistics
 */
export const useOrderStats = () => {
    return useQuery({
        queryKey: [ORDERS_STATS_KEY],
        queryFn: getOrderStats,
        staleTime: 1 * 60 * 1000, // 1 minute
    });
};

/**
 * Hook to update order status
 */
export const useUpdateOrderStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, status }) => updateOrderStatus(id, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [ORDERS_KEY] });
            queryClient.invalidateQueries({ queryKey: [ORDERS_STATS_KEY] });
            toast.success('Order status updated successfully');
        },
        onError: () => {
            toast.error('Failed to update order status');
        },
    });
};

/**
 * Hook to approve order
 */
export const useApproveOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: approveOrder,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [ORDERS_KEY] });
            queryClient.invalidateQueries({ queryKey: [ORDERS_STATS_KEY] });
            toast.success('Order approved successfully');
        },
        onError: () => {
            toast.error('Failed to approve order');
        },
    });
};

/**
 * Hook to reject order
 */
export const useRejectOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: rejectOrder,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [ORDERS_KEY] });
            queryClient.invalidateQueries({ queryKey: [ORDERS_STATS_KEY] });
            toast.success('Order rejected successfully');
        },
        onError: () => {
            toast.error('Failed to reject order');
        },
    });
};

/**
 * Hook to update admin notes
 */
export const useUpdateAdminNotes = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, adminNotes }) => updateAdminNotes(id, adminNotes),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [ORDERS_KEY] });
            toast.success('Notes saved successfully');
        },
        onError: () => {
            toast.error('Failed to save notes');
        },
    });
};

export default {
    useOrders,
    useOrder,
    useOrderStats,
    useUpdateOrderStatus,
    useApproveOrder,
    useRejectOrder,
    useUpdateAdminNotes,
};
