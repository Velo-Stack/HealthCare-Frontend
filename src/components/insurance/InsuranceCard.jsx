/**
 * InsuranceCard Component
 * Card display for insurance company in list view
 */

import { HiPencil, HiTrash, HiOfficeBuilding } from 'react-icons/hi';
import StatusBadge from '../common/StatusBadge';

export default function InsuranceCard({
    company,
    onEdit,
    onDelete,
    onToggleStatus,
    isToggling = false,
}) {
    const { name, description, logo, imageUrl, isActive, fields = [] } = company;
    const displayLogo = logo || imageUrl;

    return (
        <div className="
      bg-white rounded-2xl border border-gray-100 overflow-hidden
      hover:border-gray-200 hover:shadow-lg transition-all duration-300
      group
    ">
            {/* Header with Logo */}
            <div className="p-5 border-b border-gray-100">
                <div className="flex items-start gap-4">
                    {/* Logo */}
                    <div className="
            w-16 h-16 rounded-xl bg-gray-50 border border-gray-100
            flex items-center justify-center overflow-hidden shrink-0
            group-hover:border-[#82C341]/30 transition-colors
          ">
                        {displayLogo ? (
                            <img
                                src={displayLogo}
                                alt={`${name} logo`}
                                className="w-full h-full object-contain p-1"
                            />
                        ) : (
                            <HiOfficeBuilding className="w-8 h-8 text-gray-300" />
                        )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-lg truncate">
                            {name}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                            {description || 'No description'}
                        </p>
                    </div>

                    {/* Status Badge */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggleStatus?.(company);
                        }}
                        disabled={isToggling}
                        className="shrink-0"
                    >
                        <StatusBadge
                            status={isActive ? 'active' : 'inactive'}
                            size="sm"
                        />
                    </button>
                </div>
            </div>

            {/* Fields Count */}
            <div className="px-5 py-3 bg-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Dynamic Fields
                    </span>
                    <span className="
            inline-flex items-center justify-center
            px-2 py-0.5 rounded-full text-xs font-semibold
            bg-[#82C341]/10 text-[#5C914C]
          ">
                        {fields.length}
                    </span>
                </div>

                {/* Field Types Preview */}
                {fields.length > 0 && (
                    <div className="flex items-center gap-1">
                        {fields.slice(0, 3).map((field, i) => (
                            <span
                                key={i}
                                className={`
                  px-1.5 py-0.5 rounded text-[10px] font-medium
                  ${field.valueType === 'date'
                                        ? 'bg-purple-100 text-purple-600'
                                        : field.valueType === 'number'
                                            ? 'bg-blue-100 text-blue-600'
                                            : 'bg-gray-100 text-gray-600'
                                    }
                `}
                            >
                                {field.valueType}
                            </span>
                        ))}
                        {fields.length > 3 && (
                            <span className="text-xs text-gray-400">
                                +{fields.length - 3}
                            </span>
                        )}
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="px-5 py-3 flex items-center gap-2 border-t border-gray-100">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit?.(company);
                    }}
                    className="
            flex-1 inline-flex items-center justify-center gap-2
            px-4 py-2 rounded-xl text-sm font-medium
            bg-gray-50 text-gray-700 hover:bg-gray-100
            transition-colors
          "
                >
                    <HiPencil className="w-4 h-4" />
                    Edit
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete?.(company);
                    }}
                    className="
            inline-flex items-center justify-center
            p-2 rounded-xl text-gray-400 hover:text-red-500
            hover:bg-red-50 transition-colors
          "
                >
                    <HiTrash className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
