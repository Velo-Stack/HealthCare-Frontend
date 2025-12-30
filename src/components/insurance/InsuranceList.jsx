/**
 * InsuranceList Component
 * Grid layout for insurance company cards
 */

import InsuranceCard from './InsuranceCard';
import InsuranceEmptyState from './InsuranceEmptyState';

export default function InsuranceList({
    companies = [],
    loading = false,
    onEdit,
    onDelete,
    onToggleStatus,
    onAddNew,
    isToggling = false,
}) {
    // Loading state
    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse"
                    >
                        <div className="p-5 border-b border-gray-100">
                            <div className="flex items-start gap-4">
                                <div className="w-16 h-16 rounded-xl bg-gray-200" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-5 w-32 bg-gray-200 rounded" />
                                    <div className="h-4 w-full bg-gray-100 rounded" />
                                </div>
                            </div>
                        </div>
                        <div className="px-5 py-3 bg-gray-50">
                            <div className="h-4 w-24 bg-gray-200 rounded" />
                        </div>
                        <div className="px-5 py-3 border-t border-gray-100">
                            <div className="h-9 bg-gray-100 rounded-xl" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    // Empty state
    if (companies.length === 0) {
        return <InsuranceEmptyState onAddNew={onAddNew} />;
    }

    // Grid of cards
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {companies.map((company) => (
                <InsuranceCard
                    key={company._id || company.id}
                    company={company}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onToggleStatus={onToggleStatus}
                    isToggling={isToggling}
                />
            ))}
        </div>
    );
}
