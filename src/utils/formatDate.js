/**
 * Date Formatting Utilities
 */

/**
 * Format date to localized string
 * @param {string|Date} date - Date to format
 * @param {string} locale - Locale (default: 'ar-EG')
 * @returns {string} Formatted date
 */
export const formatDate = (date, locale = 'ar-EG') => {
    if (!date) return '-';

    const dateObj = new Date(date);

    if (isNaN(dateObj.getTime())) return '-';

    return dateObj.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

/**
 * Format date with time
 * @param {string|Date} date - Date to format
 * @param {string} locale - Locale (default: 'ar-EG')
 * @returns {string} Formatted date with time
 */
export const formatDateTime = (date, locale = 'ar-EG') => {
    if (!date) return '-';

    const dateObj = new Date(date);

    if (isNaN(dateObj.getTime())) return '-';

    return dateObj.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

/**
 * Get relative time (e.g., "2 hours ago")
 * @param {string|Date} date - Date to format
 * @returns {string} Relative time string
 */
export const getRelativeTime = (date) => {
    if (!date) return '-';

    const dateObj = new Date(date);

    if (isNaN(dateObj.getTime())) return '-';

    const now = new Date();
    const diffInSeconds = Math.floor((now - dateObj) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;

    return formatDate(date, 'en-US');
};

/**
 * Format date for input fields (YYYY-MM-DD)
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date for input
 */
export const formatDateForInput = (date) => {
    if (!date) return '';

    const dateObj = new Date(date);

    if (isNaN(dateObj.getTime())) return '';

    return dateObj.toISOString().split('T')[0];
};
