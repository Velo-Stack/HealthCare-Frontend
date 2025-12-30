/**
 * InsuranceFormPage Component
 * Add or edit insurance company with dynamic fields
 */

import { useParams, useNavigate } from 'react-router-dom';
import { HiArrowLeft } from 'react-icons/hi';
import { InsuranceForm } from '../../components/insurance';
import Button from '../../components/common/Button';
import {
    useInsurance,
    useCreateInsurance,
    useUpdateInsurance,
} from '../../hooks/useInsurance';

export default function InsuranceFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;

    // Fetch existing data if editing
    const { data: insuranceData, isLoading: loadingData } = useInsurance(id);
    const createMutation = useCreateInsurance();
    const updateMutation = useUpdateInsurance();

    const insurance = insuranceData?.data || insuranceData;
    const isSubmitting = createMutation.isPending || updateMutation.isPending;

    // Handle form submission
    const handleSubmit = (formData) => {
        if (isEdit) {
            updateMutation.mutate(
                { id, data: formData },
                { onSuccess: () => navigate('/insurance') }
            );
        } else {
            createMutation.mutate(formData, {
                onSuccess: () => navigate('/insurance'),
            });
        }
    };

    // Loading state for edit mode
    if (isEdit && loadingData) {
        return (
            <div className="space-y-8 animate-pulse">
                {/* Header Skeleton */}
                <div className="h-10 w-48 bg-gray-200 rounded-lg" />

                {/* Form Card Skeleton */}
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                        <div className="h-6 w-40 bg-gray-200 rounded" />
                        <div className="h-4 w-64 bg-gray-100 rounded mt-2" />
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="flex items-start gap-6">
                            <div className="w-28 h-28 rounded-2xl bg-gray-200" />
                            <div className="flex-1 space-y-3">
                                <div className="h-10 w-32 bg-gray-200 rounded-xl" />
                                <div className="h-4 w-48 bg-gray-100 rounded" />
                            </div>
                        </div>
                        <div className="h-12 bg-gray-200 rounded-xl" />
                        <div className="h-28 bg-gray-200 rounded-xl" />
                    </div>
                </div>

                {/* Fields Section Skeleton */}
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                        <div className="h-6 w-48 bg-gray-200 rounded" />
                    </div>
                    <div className="p-6">
                        <div className="h-32 bg-gray-100 rounded-xl" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Back Button & Header */}
            <div className="flex items-center justify-between">
                <Button
                    variant="ghost"
                    icon={HiArrowLeft}
                    onClick={() => navigate('/insurance')}
                >
                    Back to Insurance Companies
                </Button>
            </div>

            {/* Page Title */}
            <div className="mb-2">
                <h1 className="text-2xl font-bold text-gray-900">
                    {isEdit ? 'Edit Insurance Company' : 'Add New Insurance Company'}
                </h1>
                <p className="text-gray-500 mt-1">
                    {isEdit
                        ? 'Update company details and dynamic fields'
                        : 'Create a new insurance company with custom fields'
                    }
                </p>
            </div>

            {/* Insurance Form */}
            <InsuranceForm
                initialData={insurance}
                onSubmit={handleSubmit}
                onCancel={() => navigate('/insurance')}
                isSubmitting={isSubmitting}
                isEdit={isEdit}
            />
        </div>
    );
}
