/**
 * useInsurance Hook
 * React Query hooks for insurance companies management
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    getInsuranceCompanies,
    getInsuranceById,
    createInsurance,
    updateInsurance,
    deleteInsurance,
    toggleInsuranceStatus,
} from '../api/insurance.api';
import toast from 'react-hot-toast';

const INSURANCE_KEY = 'insurance';

/**
 * Hook to fetch all insurance companies
 * @param {Object} params - Query parameters
 */
export const useInsuranceCompanies = (params = {}) => {
    return useQuery({
        queryKey: [INSURANCE_KEY, params],
        queryFn: () => getInsuranceCompanies(params),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

/**
 * Hook to fetch single insurance company
 * @param {string} id - Insurance company ID
 */
export const useInsurance = (id) => {
    return useQuery({
        queryKey: [INSURANCE_KEY, id],
        queryFn: () => getInsuranceById(id),
        enabled: !!id,
    });
};

/**
 * Hook to create insurance company
 */
export const useCreateInsurance = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createInsurance,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [INSURANCE_KEY] });
            toast.success('Insurance company created successfully');
        },
        onError: () => {
            toast.error('Failed to create insurance company');
        },
    });
};

/**
 * Hook to update insurance company
 */
export const useUpdateInsurance = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }) => updateInsurance(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [INSURANCE_KEY] });
            toast.success('Insurance company updated successfully');
        },
        onError: () => {
            toast.error('Failed to update insurance company');
        },
    });
};

/**
 * Hook to delete insurance company
 */
export const useDeleteInsurance = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteInsurance,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [INSURANCE_KEY] });
            toast.success('Insurance company deleted successfully');
        },
        onError: () => {
            toast.error('Failed to delete insurance company');
        },
    });
};

/**
 * Hook to toggle insurance status
 */
export const useToggleInsuranceStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, isActive }) => toggleInsuranceStatus(id, isActive),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [INSURANCE_KEY] });
            toast.success('Status updated successfully');
        },
        onError: () => {
            toast.error('Failed to update status');
        },
    });
};

export default {
    useInsuranceCompanies,
    useInsurance,
    useCreateInsurance,
    useUpdateInsurance,
    useDeleteInsurance,
    useToggleInsuranceStatus,
};
