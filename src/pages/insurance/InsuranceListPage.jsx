/**
 * InsuranceListPage Component
 * Display all insurance companies with CRUD operations
 */

import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiPlus } from 'react-icons/hi';
import { InsuranceList } from '../../components/insurance';
import SearchBar from '../../components/common/SearchBar';
import Pagination from '../../components/common/Pagination';
import Button from '../../components/common/Button';
import { ConfirmModal } from '../../components/common/Modal';
import {
    useInsuranceCompanies,
    useDeleteInsurance,
    useToggleInsuranceStatus,
} from '../../hooks/useInsurance';
import { ITEMS_PER_PAGE } from '../../utils/constants';

export default function InsuranceListPage() {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteModal, setDeleteModal] = useState({ open: false, company: null });

    // Fetch insurance companies
    const { data: insuranceData, isLoading } = useInsuranceCompanies();
    const deleteMutation = useDeleteInsurance();
    const toggleStatusMutation = useToggleInsuranceStatus();

    // Filter and paginate
    const { paginatedCompanies, totalPages, totalItems } = useMemo(() => {
        const companies = insuranceData?.data || insuranceData || [];

        // Filter by search
        const filtered = companies.filter((company) =>
            company.name?.toLowerCase().includes(search.toLowerCase())
        );

        // Paginate
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        const paginated = filtered.slice(start, start + ITEMS_PER_PAGE);

        return {
            paginatedCompanies: paginated,
            totalPages: Math.ceil(filtered.length / ITEMS_PER_PAGE),
            totalItems: filtered.length,
        };
    }, [insuranceData, search, currentPage]);

    // Handle search
    const handleSearch = (value) => {
        setSearch(value);
        setCurrentPage(1);
    };

    // Handle edit
    const handleEdit = (company) => {
        navigate(`/insurance/edit/${company.id || company._id}`);
    };

    // Handle delete
    const handleDelete = () => {
        if (deleteModal.company) {
            deleteMutation.mutate(deleteModal.company.id || deleteModal.company._id, {
                onSuccess: () => setDeleteModal({ open: false, company: null }),
            });
        }
    };

    // Handle status toggle
    const handleToggleStatus = (company) => {
        toggleStatusMutation.mutate({
            id: company.id || company._id,
            isActive: !company.isActive,
        });
    };

    // Handle add new
    const handleAddNew = () => {
        navigate('/insurance/new');
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Insurance Companies
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Manage insurance companies and their dynamic fields
                    </p>
                </div>
                <Button
                    icon={HiPlus}
                    onClick={handleAddNew}
                >
                    Add Company
                </Button>
            </div>

            {/* Search & Filters */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <SearchBar
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search by company name..."
                    className="w-full sm:max-w-md"
                />
                {totalItems > 0 && (
                    <div className="text-sm text-gray-500">
                        {totalItems} {totalItems === 1 ? 'company' : 'companies'} found
                    </div>
                )}
            </div>

            {/* Insurance List */}
            <InsuranceList
                companies={paginatedCompanies}
                loading={isLoading}
                onEdit={handleEdit}
                onDelete={(company) => setDeleteModal({ open: true, company })}
                onToggleStatus={handleToggleStatus}
                onAddNew={handleAddNew}
                isToggling={toggleStatusMutation.isPending}
            />

            {/* Pagination */}
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    itemsPerPage={ITEMS_PER_PAGE}
                    onPageChange={setCurrentPage}
                />
            )}

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                isOpen={deleteModal.open}
                onClose={() => setDeleteModal({ open: false, company: null })}
                onConfirm={handleDelete}
                title="Delete Insurance Company"
                message={`Are you sure you want to delete "${deleteModal.company?.name}"? This action cannot be undone.`}
                confirmText="Delete"
                loading={deleteMutation.isPending}
            />
        </div>
    );
}
