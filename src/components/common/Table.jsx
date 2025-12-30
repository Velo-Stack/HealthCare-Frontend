/**
 * Table Component (Refined UI)
 */

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
            <div className={`bg-white rounded-2xl shadow-sm ${className}`}>
                <div className="animate-pulse divide-y">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="px-6 py-4">
                            <div className="h-4 w-1/2 bg-gray-200 rounded" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (!data?.length) {
        return (
            <div className={`bg-white rounded-2xl shadow-sm ${className}`}>
                <div className="py-20 text-center text-sm text-gray-500">
                    {emptyMessage}
                </div>
            </div>
        );
    }

    return (
        <div className={`bg-white rounded-2xl shadow-sm overflow-hidden ${className}`}>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            {columns.map((col, i) => (
                                <th
                                    key={i}
                                    className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide"
                                    style={{ width: col.width }}
                                >
                                    {col.title}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="divide-y">
                        {data.map((row, rowIndex) => (
                            <tr
                                key={row.id || rowIndex}
                                onClick={() => onRowClick?.(row)}
                                className={`
                  transition
                  ${onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}
                `}
                            >
                                {columns.map((col, colIndex) => (
                                    <td
                                        key={colIndex}
                                        className="px-6 py-4 text-gray-700"
                                    >
                                        {col.render
                                            ? col.render(row[col.key], row, rowIndex)
                                            : row[col.key] ?? '-'}
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
