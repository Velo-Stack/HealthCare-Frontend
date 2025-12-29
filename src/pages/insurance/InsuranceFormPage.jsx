/**
 * InsuranceFormPage Component
 * Add or edit insurance company
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { HiArrowLeft, HiSave, HiUpload } from 'react-icons/hi';
import Button from '../../components/common/Button';
import {
    useInsurance,
    useCreateInsurance,
    useUpdateInsurance,
} from '../../hooks/useInsurance';
import { colors } from '../../utils/constants';

export default function InsuranceFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;

    const [logoPreview, setLogoPreview] = useState(null);
    const [logoFile, setLogoFile] = useState(null);

    // Fetch existing data if editing
    const { data: insuranceData, isLoading: loadingData } = useInsurance(id);
    const createMutation = useCreateInsurance();
    const updateMutation = useUpdateInsurance();

    const insurance = insuranceData?.data || insuranceData;

    // Form setup
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: '',
            description: '',
            isActive: true,
        },
    });

    // Populate form when editing
    useEffect(() => {
        if (insurance) {
            reset({
                name: insurance.name || '',
                description: insurance.description || '',
                isActive: insurance.isActive ?? true,
            });
            if (insurance.logo) {
                setLogoPreview(insurance.logo);
            }
        }
    }, [insurance, reset]);

    // Handle logo upload
    const handleLogoChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setLogoFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Form submission
    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('isActive', data.isActive);

        if (logoFile) {
            formData.append('logo', logoFile);
        }

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

    const isSubmitting = createMutation.isPending || updateMutation.isPending;

    if (isEdit && loadingData) {
        return (
            <div className="animate-pulse space-y-6">
                <div className="h-10 w-32 bg-gray-200 rounded" />
                <div className="bg-white rounded-xl p-6">
                    <div className="space-y-4">
                        <div className="h-10 bg-gray-200 rounded" />
                        <div className="h-24 bg-gray-200 rounded" />
                        <div className="h-10 bg-gray-200 rounded w-1/2" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Back button */}
            <Button variant="ghost" icon={HiArrowLeft} onClick={() => navigate('/insurance')}>
                Back to Insurance Companies
            </Button>

            {/* Form Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                    {isEdit ? 'Edit Insurance Company' : 'Add New Insurance Company'}
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Logo Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Company Logo
                        </label>
                        <div className="flex items-center gap-6">
                            {/* Preview */}
                            <div
                                className="w-24 h-24 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden bg-gray-50"
                            >
                                {logoPreview ? (
                                    <img
                                        src={logoPreview}
                                        alt="Logo preview"
                                        className="w-full h-full object-contain"
                                    />
                                ) : (
                                    <span className="text-gray-400 text-xs text-center">
                                        No logo
                                    </span>
                                )}
                            </div>

                            {/* Upload button */}
                            <div>
                                <label className="cursor-pointer">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleLogoChange}
                                        className="hidden"
                                    />
                                    <div
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        <HiUpload className="w-5 h-5" />
                                        <span>Upload Logo</span>
                                    </div>
                                </label>
                                <p className="text-xs text-gray-500 mt-2">
                                    PNG, JPG up to 2MB
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Company Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Company Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            {...register('name', { required: 'Company name is required' })}
                            className={`
                w-full px-4 py-3 rounded-lg border transition-colors
                ${errors.name ? 'border-red-500' : 'border-gray-200'}
                focus:border-[#82C341] focus:ring-2 focus:ring-[#82C341]/20
              `}
                            placeholder="Enter company name"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                        </label>
                        <textarea
                            {...register('description')}
                            rows={4}
                            className="
                w-full px-4 py-3 rounded-lg border border-gray-200 transition-colors
                focus:border-[#82C341] focus:ring-2 focus:ring-[#82C341]/20
                resize-none
              "
                            placeholder="Enter company description"
                        />
                    </div>

                    {/* Active Status */}
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            {...register('isActive')}
                            id="isActive"
                            className="w-5 h-5 rounded border-gray-300 text-[#82C341] focus:ring-[#82C341]"
                        />
                        <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                            Active (visible to users)
                        </label>
                    </div>

                    {/* Submit */}
                    <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                        <Button
                            type="submit"
                            icon={HiSave}
                            loading={isSubmitting}
                        >
                            {isEdit ? 'Save Changes' : 'Create Company'}
                        </Button>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => navigate('/insurance')}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
