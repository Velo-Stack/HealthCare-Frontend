/**
 * SearchBar Component
 * Search input with debounce
 */

import { useState, useEffect } from 'react';
import { HiSearch, HiX } from 'react-icons/hi';

export default function SearchBar({
    value = '',
    onChange,
    placeholder = 'Search...',
    debounceMs = 300,
    className = '',
}) {
    const [localValue, setLocalValue] = useState(value);

    // Debounce the onChange callback
    useEffect(() => {
        const timer = setTimeout(() => {
            if (localValue !== value) {
                onChange?.(localValue);
            }
        }, debounceMs);

        return () => clearTimeout(timer);
    }, [localValue, debounceMs]);

    // Sync with external value
    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const handleClear = () => {
        setLocalValue('');
        onChange?.('');
    };

    return (
        <div className={`relative ${className}`}>
            <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
                type="text"
                value={localValue}
                onChange={(e) => setLocalValue(e.target.value)}
                placeholder={placeholder}
                className="
          w-full pl-10 pr-10 py-2.5
          bg-white border border-gray-200 rounded-lg
          text-gray-700 placeholder-gray-400
          focus:border-[#82C341] focus:ring-2 focus:ring-[#82C341]/20
          transition-all duration-200
        "
            />
            {localValue && (
                <button
                    onClick={handleClear}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                >
                    <HiX className="w-4 h-4" />
                </button>
            )}
        </div>
    );
}
