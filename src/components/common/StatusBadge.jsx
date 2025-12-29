/**
 * StatusBadge Component
 * Colored badge for displaying status
 */

import { colors, ORDER_STATUS } from '../../utils/constants';

const statusStyles = {
    pending: {
        background: `${colors.warning}20`,
        color: colors.warning,
        border: colors.warning,
    },
    approved: {
        background: `${colors.success}20`,
        color: colors.success,
        border: colors.success,
    },
    rejected: {
        background: `${colors.error}20`,
        color: colors.error,
        border: colors.error,
    },
    delivered: {
        background: `${colors.info}20`,
        color: colors.info,
        border: colors.info,
    },
    active: {
        background: `${colors.success}20`,
        color: colors.success,
        border: colors.success,
    },
    inactive: {
        background: `${colors.grey}30`,
        color: colors.textSecondary,
        border: colors.grey,
    },
};

export default function StatusBadge({
    status,
    label,
    size = 'md',
    className = '',
}) {
    const normalizedStatus = status?.toLowerCase() || 'pending';
    const style = statusStyles[normalizedStatus] || statusStyles.pending;

    const sizes = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-1 text-sm',
        lg: 'px-3 py-1.5 text-base',
    };

    return (
        <span
            className={`
        inline-flex items-center font-medium rounded-full
        border capitalize
        ${sizes[size]}
        ${className}
      `}
            style={{
                backgroundColor: style.background,
                color: style.color,
                borderColor: style.border,
            }}
        >
            <span
                className="w-1.5 h-1.5 rounded-full mr-1.5"
                style={{ backgroundColor: style.color }}
            />
            {label || status}
        </span>
    );
}
