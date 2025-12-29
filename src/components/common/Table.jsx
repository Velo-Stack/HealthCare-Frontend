/**
 * Table Component
 * Reusable data table with loading and empty states
 */

import { colors } from '../../utils/constants';

export default function Table({
    columns,
    data,
    loading = false,
    emptyMessage = 'No data available',
    onRowClick,
    className = '',
}) {
    if (loading) {
        return (
            <div className={`bg-white rounded-2xl shadow-sm overflow-hidden ${className}`}>
                <div className="animate-pulse">
                    {/* Header skeleton */}
                    <div className="bg-gray-50 px-8 py-5 border-b">
                        <div className="h-4 bg-gray-200 rounded w-1/3" />
                    </div>
                    {/* Row skeletons */}
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="px-8 py-5 border-b border-gray-50">
                            <div className="flex gap-6">
                                <div className="h-4 bg-gray-200 rounded w-1/4" />
                                <div className="h-4 bg-gray-200 rounded w-1/3" />
                                <div className="h-4 bg-gray-200 rounded w-1/5" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className={`bg-white rounded-2xl shadow-sm overflow-hidden ${className}`}>
                <div className="px-8 py-20 text-center">
                    <svg
                        className="mx-auto h-16 w-16 text-gray-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                    </svg>
                    <p className="mt-6 text-gray-500 text-lg">{emptyMessage}</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`bg-white rounded-2xl shadow-sm overflow-hidden ${className}`}>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-50">
                            {columns.map((column, index) => (
                                <th
                                    key={column.key || index}
                                    className="px-8 py-5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                                    style={{ width: column.width }}
                                >
                                    {column.title}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {data.map((row, rowIndex) => (
                            <tr
                                key={row.id || row._id || rowIndex}
                                onClick={() => onRowClick?.(row)}
                                className={`
                  transition-colors
                  ${onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}
                `}
                            >
                                {columns.map((column, colIndex) => (
                                    <td
                                        key={column.key || colIndex}
                                        className="px-8 py-5 text-sm text-gray-700"
                                    >
                                        {column.render
                                            ? column.render(row[column.key], row, rowIndex)
                                            : row[column.key] ?? '-'}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
