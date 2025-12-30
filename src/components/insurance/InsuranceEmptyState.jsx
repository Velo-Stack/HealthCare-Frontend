/**
 * InsuranceEmptyState Component
 * Empty state display when no insurance companies exist
 */

import { HiOfficeBuilding, HiPlus } from 'react-icons/hi';

export default function InsuranceEmptyState({
    onAddNew,
    title = 'No insurance companies found',
    description = 'Get started by adding your first insurance company',
}) {
    return (
        <div className="
      bg-white rounded-2xl border-2 border-dashed border-gray-200
      py-16 px-8 text-center animate-fade-in
    ">
            {/* Icon */}
            <div className="
        w-20 h-20 rounded-2xl bg-gray-50 mx-auto
        flex items-center justify-center mb-6
      ">
                <HiOfficeBuilding className="w-10 h-10 text-gray-300" />
            </div>

            {/* Text */}
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {title}
            </h3>
            <p className="text-gray-500 max-w-sm mx-auto mb-8">
                {description}
            </p>

            {/* Action Button */}
            {onAddNew && (
                <button
                    onClick={onAddNew}
                    className="
            inline-flex items-center gap-2 px-6 py-3 rounded-xl
            bg-gradient-to-r from-[#5C914C] to-[#82C341] text-white
            font-semibold transition-all duration-200
            hover:shadow-lg hover:shadow-green-500/25
            hover:scale-105 active:scale-100
          "
                >
                    <HiPlus className="w-5 h-5" />
                    Add Insurance Company
                </button>
            )}
        </div>
    );
}
