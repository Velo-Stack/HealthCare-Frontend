/**
 * InsuranceFieldInput Component
 * Dynamic input field based on valueType (string, number, date)
 */

import { HiExclamationCircle } from 'react-icons/hi';

/**
 * Convert camelCase key to readable label
 * e.g., "policyNumber" -> "Policy Number"
 */
const keyToLabel = (key) => {
    if (!key) return '';
    return key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase())
        .trim();
};

/**
 * Get input type based on valueType
 */
const getInputType = (valueType) => {
    switch (valueType) {
        case 'number':
            return 'number';
        case 'date':
            return 'date';
        case 'string':
        default:
            return 'text';
    }
};

export default function InsuranceFieldInput({
    field,
    register,
    errors,
    index,
    disabled = false,
}) {
    const { key, label, valueType, required } = field;
    const displayLabel = label || keyToLabel(key);
    const inputType = getInputType(valueType);
    const fieldName = `dynamicFields.${index}.value`;
    const hasError = errors?.dynamicFields?.[index]?.value;

    return (
        <div className="space-y-2">
            {/* Label */}
            <label
                htmlFor={fieldName}
                className="flex items-center gap-1 text-sm font-medium text-gray-700"
            >
                {displayLabel}
                {required && (
                    <span className="text-red-500 font-semibold">*</span>
                )}
            </label>

            {/* Input */}
            <div className="relative">
                <input
                    id={fieldName}
                    type={inputType}
                    disabled={disabled}
                    placeholder={`Enter ${displayLabel.toLowerCase()}`}
                    {...register(fieldName, {
                        required: required ? `${displayLabel} is required` : false,
                        ...(valueType === 'number' && {
                            valueAsNumber: true,
                            min: { value: 0, message: `${displayLabel} must be positive` },
                        }),
                    })}
                    className={`
            w-full px-4 py-3 rounded-xl border-2 transition-all duration-200
            bg-white text-gray-900 placeholder-gray-400
            focus:outline-none focus:ring-0
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${hasError
                            ? 'border-red-400 focus:border-red-500'
                            : 'border-gray-200 hover:border-gray-300 focus:border-[#82C341]'
                        }
          `}
                />

                {/* Error Icon */}
                {hasError && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <HiExclamationCircle className="w-5 h-5 text-red-500" />
                    </div>
                )}
            </div>

            {/* Error Message */}
            {hasError && (
                <p className="text-sm text-red-500 flex items-center gap-1 animate-slide-in">
                    {hasError.message}
                </p>
            )}

            {/* Field Type Badge */}
            <div className="flex items-center gap-2">
                <span className={`
          inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium
          ${valueType === 'date'
                        ? 'bg-purple-100 text-purple-700'
                        : valueType === 'number'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-600'
                    }
        `}>
                    {valueType}
                </span>
                {required && (
                    <span className="text-xs text-gray-500">Required</span>
                )}
            </div>
        </div>
    );
}
