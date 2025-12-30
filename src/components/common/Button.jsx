/**
 * Button Component (Refined UI)
 */

import { colors } from '../../utils/constants';

const variants = {
    primary: {
        background: `linear-gradient(to right, ${colors.primaryDark}, ${colors.primary})`,
        color: colors.white,
        border: 'none',
    },
    secondary: {
        background: colors.white,
        color: colors.textPrimary,
        border: `1px solid ${colors.greyLight}`,
    },
    danger: {
        background: colors.error,
        color: colors.white,
        border: 'none',
    },
    success: {
        background: colors.success,
        color: colors.white,
        border: 'none',
    },
    ghost: {
        background: 'transparent',
        color: colors.primary,
        border: 'none',
    },
};

const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
};

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    fullWidth = false,
    icon: Icon,
    className = '',
    ...props
}) {
    const variantStyles = variants[variant] || variants.primary;

    return (
        <button
            disabled={disabled || loading}
            className={`
        inline-flex items-center justify-center gap-2
        rounded-xl font-medium
        transition-all duration-200
        hover:opacity-90 hover:shadow-sm
        disabled:opacity-50 disabled:cursor-not-allowed
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
            style={variantStyles}
            {...props}
        >
            {loading && (
                <span className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
            )}
            {!loading && Icon && <Icon className="w-4 h-4" />}
            <span>{children}</span>
        </button>
    );
}
