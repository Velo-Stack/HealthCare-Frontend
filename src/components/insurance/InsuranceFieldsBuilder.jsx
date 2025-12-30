/**
 * InsuranceFieldsBuilder Component
 * Dynamic field array manager for insurance form
 */

import { useFieldArray } from 'react-hook-form';
import { HiPlus, HiTrash } from 'react-icons/hi';

/**
 * Convert camelCase key to readable label
 */
const keyToLabel = (key) => {
    if (!key) return '';
    return key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase())
        .trim();
};

const FIELD_TYPES = [
    { value: 'string', label: 'Text', color: 'bg-gray-100 text-gray-700' },
    { value: 'number', label: 'Number', color: 'bg-blue-100 text-blue-700' },
    { value: 'date', label: 'Date', color: 'bg-purple-100 text-purple-700' },
];

export default function InsuranceFieldsBuilder({
    control,
    register,
    errors,
    disabled = false,
}) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'fields',
    });

    const handleAddField = () => {
        append({
            key: '',
            label: '',
            valueType: 'string',
            required: false,
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                        Dynamic Fields
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                        Define the fields users will fill when creating insurance cards
                    </p>
                </div>
                <button
                    type="button"
                    onClick={handleAddField}
                    disabled={disabled}
                    className="
            inline-flex items-center gap-2 px-4 py-2 rounded-xl
            bg-gradient-to-r from-[#5C914C] to-[#82C341] text-white
            font-medium text-sm transition-all duration-200
            hover:shadow-lg hover:shadow-green-500/25
            disabled:opacity-50 disabled:cursor-not-allowed
          "
                >
                    <HiPlus className="w-5 h-5" />
                    Add Field
                </button>
            </div>

            {/* Fields List */}
            {fields.length === 0 ? (
                <div className="
          border-2 border-dashed border-gray-200 rounded-xl p-8
          text-center bg-gray-50
        ">
                    <div className="text-gray-400 mb-2">
                        <HiPlus className="w-12 h-12 mx-auto opacity-50" />
                    </div>
                    <p className="text-gray-500 font-medium">No fields defined yet</p>
                    <p className="text-sm text-gray-400 mt-1">
                        Click "Add Field" to create dynamic fields for this insurance
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {fields.map((field, index) => (
                        <div
                            key={field.id}
                            className="
                bg-white border border-gray-200 rounded-xl p-5
                hover:border-gray-300 transition-all duration-200
                animate-slide-up
              "
                        >
                            <div className="flex items-start gap-4">
                                {/* Field Number */}
                                <div className="
                  w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center
                  text-sm font-semibold text-gray-600 shrink-0
                ">
                                    {index + 1}
                                </div>

                                {/* Field Inputs */}
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {/* Key Input */}
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                            Field Key
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g., policyNumber"
                                            disabled={disabled}
                                            {...register(`fields.${index}.key`, {
                                                required: 'Key is required',
                                                pattern: {
                                                    value: /^[a-zA-Z][a-zA-Z0-9]*$/,
                                                    message: 'Key must be camelCase',
                                                },
                                            })}
                                            className={`
                        w-full px-3 py-2 rounded-lg border transition-all
                        text-sm bg-white
                        focus:outline-none focus:border-[#82C341]
                        ${errors?.fields?.[index]?.key
                                                    ? 'border-red-300'
                                                    : 'border-gray-200'
                                                }
                      `}
                                        />
                                        {errors?.fields?.[index]?.key && (
                                            <p className="text-xs text-red-500">
                                                {errors.fields[index].key.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Label Input (Optional) */}
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                            Label <span className="text-gray-400">(optional)</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder={keyToLabel(fields[index]?.key) || 'Auto-generated'}
                                            disabled={disabled}
                                            {...register(`fields.${index}.label`)}
                                            className="
                        w-full px-3 py-2 rounded-lg border border-gray-200
                        text-sm bg-white transition-all
                        focus:outline-none focus:border-[#82C341]
                      "
                                        />
                                    </div>

                                    {/* Type Select */}
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                            Type
                                        </label>
                                        <select
                                            disabled={disabled}
                                            {...register(`fields.${index}.valueType`)}
                                            className="
                        w-full px-3 py-2 rounded-lg border border-gray-200
                        text-sm bg-white transition-all cursor-pointer
                        focus:outline-none focus:border-[#82C341]
                      "
                                        >
                                            {FIELD_TYPES.map((type) => (
                                                <option key={type.value} value={type.value}>
                                                    {type.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Required Toggle */}
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                            Required
                                        </label>
                                        <label className="
                      flex items-center gap-3 px-3 py-2 rounded-lg border border-gray-200
                      cursor-pointer hover:bg-gray-50 transition-colors
                    ">
                                            <input
                                                type="checkbox"
                                                disabled={disabled}
                                                {...register(`fields.${index}.required`)}
                                                className="
                          w-4 h-4 rounded border-gray-300 
                          text-[#82C341] focus:ring-[#82C341]
                        "
                                            />
                                            <span className="text-sm text-gray-700">
                                                Required field
                                            </span>
                                        </label>
                                    </div>
                                </div>

                                {/* Delete Button */}
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    disabled={disabled}
                                    className="
                    p-2 rounded-lg text-gray-400 hover:text-red-500
                    hover:bg-red-50 transition-all shrink-0
                    disabled:opacity-50 disabled:cursor-not-allowed
                  "
                                    title="Remove field"
                                >
                                    <HiTrash className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Field Count */}
            {fields.length > 0 && (
                <p className="text-sm text-gray-500 text-right">
                    {fields.length} field{fields.length !== 1 ? 's' : ''} defined
                </p>
            )}
        </div>
    );
}
