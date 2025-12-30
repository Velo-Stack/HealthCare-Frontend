/**
 * InsuranceForm Component
 * Main form wrapper for creating/editing insurance companies
 */

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { HiArrowLeft, HiSave, HiUpload, HiPhotograph } from 'react-icons/hi';
import InsuranceFieldsBuilder from './InsuranceFieldsBuilder';
import Button from '../common/Button';

export default function InsuranceForm({
    initialData = null,
    onSubmit,
    onCancel,
    isSubmitting = false,
    isEdit = false,
}) {
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    // Form setup with default values
    const {
        register,
        handleSubmit,
        control,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: '',
            description: '',
            isActive: true,
            fields: [],
        },
    });

    // Populate form when editing
    useEffect(() => {
        if (initialData) {
            reset({
                name: initialData.name || '',
                description: initialData.description || '',
                isActive: initialData.isActive ?? true,
                fields: initialData.fields || [],
            });
            // Set image preview
            const existingImage = initialData.logo || initialData.imageUrl;
            if (existingImage) {
                setImagePreview(existingImage);
            }
        }
    }, [initialData, reset]);

    // Handle image upload
    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file size (max 2MB)
            if (file.size > 2 * 1024 * 1024) {
                alert('Image size must be less than 2MB');
                return;
            }
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle form submission
    const handleFormSubmit = (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description || '');
        formData.append('isActive', data.isActive);

        // Append fields as JSON string
        if (data.fields && data.fields.length > 0) {
            formData.append('fields', JSON.stringify(data.fields));
        }

        // Append image if new one was selected
        if (imageFile) {
            formData.append('image', imageFile);
        }

        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
            {/* Company Information Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Company Information
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Basic details about the insurance company
                    </p>
                </div>

                <div className="p-6 space-y-6">
                    {/* Image Upload */}
                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-gray-700">
                            Company Logo
                        </label>
                        <div className="flex items-start gap-6">
                            {/* Preview */}
                            <div className="
                w-28 h-28 rounded-2xl border-2 border-dashed border-gray-200
                flex items-center justify-center overflow-hidden bg-gray-50
                transition-colors hover:border-[#82C341]/50
              ">
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-full h-full object-contain p-2"
                                    />
                                ) : (
                                    <HiPhotograph className="w-10 h-10 text-gray-300" />
                                )}
                            </div>

                            {/* Upload Controls */}
                            <div className="flex-1 space-y-3">
                                <label className="
                  inline-flex items-center gap-2 px-4 py-2.5 rounded-xl
                  border border-gray-200 bg-white cursor-pointer
                  hover:bg-gray-50 hover:border-gray-300 transition-all
                ">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                    <HiUpload className="w-5 h-5 text-gray-500" />
                                    <span className="text-sm font-medium text-gray-700">
                                        Upload Image
                                    </span>
                                </label>
                                <p className="text-xs text-gray-500">
                                    PNG, JPG or SVG. Max 2MB. Recommended: 200x200px
                                </p>
                                {imagePreview && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setImagePreview(null);
                                            setImageFile(null);
                                        }}
                                        className="text-xs text-red-500 hover:text-red-600 font-medium"
                                    >
                                        Remove image
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Company Name */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Company Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            {...register('name', { required: 'Company name is required' })}
                            placeholder="Enter company name"
                            className={`
                w-full px-4 py-3 rounded-xl border-2 transition-all duration-200
                bg-white text-gray-900 placeholder-gray-400
                focus:outline-none focus:ring-0
                ${errors.name
                                    ? 'border-red-400 focus:border-red-500'
                                    : 'border-gray-200 hover:border-gray-300 focus:border-[#82C341]'
                                }
              `}
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500 animate-slide-in">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            {...register('description')}
                            rows={4}
                            placeholder="Enter company description"
                            className="
                w-full px-4 py-3 rounded-xl border-2 border-gray-200 transition-all duration-200
                bg-white text-gray-900 placeholder-gray-400 resize-none
                hover:border-gray-300 focus:outline-none focus:ring-0 focus:border-[#82C341]
              "
                        />
                    </div>

                    {/* Active Status */}
                    <div className="flex items-center gap-4">
                        <label className="
              flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200
              cursor-pointer hover:bg-gray-50 transition-colors
            ">
                            <input
                                type="checkbox"
                                {...register('isActive')}
                                className="
                  w-5 h-5 rounded border-gray-300 
                  text-[#82C341] focus:ring-[#82C341] focus:ring-offset-0
                "
                            />
                            <div>
                                <span className="text-sm font-medium text-gray-700 block">
                                    Active
                                </span>
                                <span className="text-xs text-gray-500">
                                    Company is visible to users
                                </span>
                            </div>
                        </label>
                    </div>
                </div>
            </div>

            {/* Dynamic Fields Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Insurance Card Fields
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Define what information users need to provide for their insurance cards
                    </p>
                </div>

                <div className="p-6">
                    <InsuranceFieldsBuilder
                        control={control}
                        register={register}
                        errors={errors}
                        disabled={isSubmitting}
                    />
                </div>
            </div>

            {/* Form Actions */}
            <div className="
        flex items-center justify-end gap-4 
        pt-6 border-t border-gray-200
      ">
                <Button
                    type="button"
                    variant="secondary"
                    onClick={onCancel}
                    disabled={isSubmitting}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    icon={HiSave}
                    loading={isSubmitting}
                >
                    {isEdit ? 'Save Changes' : 'Create Company'}
                </Button>
            </div>
        </form>
    );
}
