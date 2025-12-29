/**
 * InsuranceListPage Component
 * Display all insurance companies with CRUD operations
 */

import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiPlus, HiPencil, HiTrash } from 'react-icons/hi';
import Table from '../../components/common/Table';
import SearchBar from '../../components/common/SearchBar';
import Pagination from '../../components/common/Pagination';
import Button from '../../components/common/Button';
import StatusBadge from '../../components/common/StatusBadge';
import { ConfirmModal } from '../../components/common/Modal';
import {
    useInsuranceCompanies,
    useDeleteInsurance,
    useToggleInsuranceStatus,
} from '../../hooks/useInsurance';
import { ITEMS_PER_PAGE, colors } from '../../utils/constants';

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
    const { filteredCompanies, paginatedCompanies, totalPages, totalItems } = useMemo(() => {
        const companies = insuranceData?.data || insuranceData || [];

        // Filter by search
        const filtered = companies.filter((company) =>
            company.name?.toLowerCase().includes(search.toLowerCase())
        );

        // Paginate
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        const paginated = filtered.slice(start, start + ITEMS_PER_PAGE);

        return {
            filteredCompanies: filtered,
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

    // Table columns
    const columns = [
        {
            key: 'logo',
            title: 'Logo',
            width: '80px',
            render: (value) => (
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                    {value ? (
                        <img src={value} alt="Logo" className="w-full h-full object-contain" />
                    ) : (
                        <span className="text-gray-400 text-xs">No Logo</span>
                    )}
                </div>
            ),
        },
        {
            key: 'name',
            title: 'Company Name',
            render: (value) => <span className="font-medium text-gray-900">{value}</span>,
        },
        {
            key: 'description',
            title: 'Description',
            render: (value) => (
                <span className="text-gray-600 line-clamp-2">{value || '-'}</span>
            ),
        },
        {
            key: 'isActive',
            title: 'Status',
            render: (value, row) => (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleToggleStatus(row);
                    }}
                    disabled={toggleStatusMutation.isPending}
                >
                    <StatusBadge
                        status={value ? 'active' : 'inactive'}
                        size="sm"
                    />
                </button>
            ),
        },
        {
            key: 'actions',
            title: 'Actions',
            render: (_, row) => (
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        icon={HiPencil}
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/insurance/edit/${row.id || row._id}`);
                        }}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        icon={HiTrash}
                        onClick={(e) => {
                            e.stopPropagation();
                            setDeleteModal({ open: true, company: row });
                        }}
                        className="text-red-600 hover:text-red-700"
                    >
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Insurance Companies</h1>
                    <p className="text-gray-500">Manage insurance companies and their details</p>
                </div>
                <Button
                    icon={HiPlus}
                    onClick={() => navigate('/insurance/new')}
                >
                    Add Company
                </Button>
            </div>

            {/* Search */}
            <div className="flex items-center gap-4">
                <SearchBar
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search by company name..."
                    className="max-w-md"
                />
            </div>

            {/* Table */}
            <Table
                columns={columns}
                data={paginatedCompanies}
                loading={isLoading}
                emptyMessage="No insurance companies found"
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
