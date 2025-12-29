/**
 * useUsers Hook
 * React Query hooks for user data management
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUsers, getUserById, updateUser, deleteUser, updateUserPoints } from '../api/users.api';
import toast from 'react-hot-toast';

const USERS_KEY = 'users';

/**
 * Hook to fetch all users
 * @param {Object} params - Query parameters
 */
export const useUsers = (params = {}) => {
    return useQuery({
        queryKey: [USERS_KEY, params],
        queryFn: () => getUsers(params),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

/**
 * Hook to fetch single user
 * @param {string} id - User ID
 */
export const useUser = (id) => {
    return useQuery({
        queryKey: [USERS_KEY, id],
        queryFn: () => getUserById(id),
        enabled: !!id,
    });
};

/**
 * Hook to update user
 */
export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }) => updateUser(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [USERS_KEY] });
            toast.success('User updated successfully');
        },
        onError: () => {
            toast.error('Failed to update user');
        },
    });
};

/**
 * Hook to delete user
 */
export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [USERS_KEY] });
            toast.success('User deleted successfully');
        },
        onError: () => {
            toast.error('Failed to delete user');
        },
    });
};

/**
 * Hook to update user points
 */
export const useUpdateUserPoints = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, points }) => updateUserPoints(id, points),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [USERS_KEY] });
            toast.success('Points updated successfully');
        },
        onError: () => {
            toast.error('Failed to update points');
        },
    });
};

export default {
    useUsers,
    useUser,
    useUpdateUser,
    useDeleteUser,
    useUpdateUserPoints,
};
