/**
 * Button Component
 * Reusable button with multiple variants
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
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
};

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    fullWidth = false,
    icon: Icon,
    onClick,
    type = 'button',
    className = '',
    ...props
}) {
    const variantStyles = variants[variant] || variants.primary;
    const sizeClass = sizes[size] || sizes.md;

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`
        inline-flex items-center justify-center gap-2
        font-medium rounded-lg transition-all duration-200
        hover:opacity-90 hover:shadow-md
        disabled:opacity-50 disabled:cursor-not-allowed
        ${sizeClass}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
            style={{
                ...variantStyles,
                cursor: disabled || loading ? 'not-allowed' : 'pointer',
            }}
            {...props}
        >
            {loading ? (
                <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            ) : Icon ? (
                <Icon className="w-5 h-5" />
            ) : null}
            {children}
        </button>
    );
}
