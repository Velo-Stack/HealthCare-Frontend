/**
 * Pagination Component
 * Page navigation for data tables
 */

import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { colors } from '../../utils/constants';

export default function Pagination({
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    onPageChange,
    className = '',
}) {
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
            }
        }

        return pages;
    };

    if (totalPages <= 1) return null;

    return (
        <div className={`flex items-center justify-between px-4 py-3 ${className}`}>
            {/* Results info */}
            <div className="text-sm text-gray-600">
                Showing <span className="font-medium">{startItem}</span> to{' '}
                <span className="font-medium">{endItem}</span> of{' '}
                <span className="font-medium">{totalItems}</span> results
            </div>

            {/* Page buttons */}
            <div className="flex items-center gap-1">
                {/* Previous */}
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <HiChevronLeft className="w-5 h-5" />
                </button>

                {/* Page numbers */}
                {getPageNumbers().map((page, index) =>
                    page === '...' ? (
                        <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
                            ...
                        </span>
                    ) : (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`
                min-w-[40px] h-10 px-3 rounded-lg font-medium transition-all
                ${currentPage === page
                                    ? 'text-white shadow-md'
                                    : 'text-gray-600 hover:bg-gray-100'
                                }
              `}
                            style={
                                currentPage === page
                                    ? { background: `linear-gradient(to right, ${colors.primaryDark}, ${colors.primary})` }
                                    : {}
                            }
                        >
                            {page}
                        </button>
                    )
                )}

                {/* Next */}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <HiChevronRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
