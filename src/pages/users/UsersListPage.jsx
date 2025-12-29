/**
 * UsersListPage Component
 * Display all users with search and pagination
 */

import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiEye, HiTrash } from 'react-icons/hi';
import Table from '../../components/common/Table';
import SearchBar from '../../components/common/SearchBar';
import Pagination from '../../components/common/Pagination';
import Button from '../../components/common/Button';
import { ConfirmModal } from '../../components/common/Modal';
import { useUsers, useDeleteUser } from '../../hooks/useUsers';
import { formatDate } from '../../utils/formatDate';
import { ITEMS_PER_PAGE } from '../../utils/constants';

export default function UsersListPage() {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteModal, setDeleteModal] = useState({ open: false, user: null });

    // Fetch users
    const { data: usersData, isLoading } = useUsers();
    const deleteUserMutation = useDeleteUser();

    // Filter and paginate users
    const { filteredUsers, paginatedUsers, totalPages, totalItems } = useMemo(() => {
        const users = usersData?.data || usersData || [];

        // Filter by search
        const filtered = users.filter(
            (user) =>
                user.name?.toLowerCase().includes(search.toLowerCase()) ||
                user.email?.toLowerCase().includes(search.toLowerCase())
        );

        // Paginate
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        const paginated = filtered.slice(start, start + ITEMS_PER_PAGE);

        return {
            filteredUsers: filtered,
            paginatedUsers: paginated,
            totalPages: Math.ceil(filtered.length / ITEMS_PER_PAGE),
            totalItems: filtered.length,
        };
    }, [usersData, search, currentPage]);

    // Handle search change
    const handleSearch = (value) => {
        setSearch(value);
        setCurrentPage(1);
    };

    // Handle delete
    const handleDelete = () => {
        if (deleteModal.user) {
            deleteUserMutation.mutate(deleteModal.user.id || deleteModal.user._id, {
                onSuccess: () => setDeleteModal({ open: false, user: null }),
            });
        }
    };

    // Table columns
    const columns = [
        {
            key: 'name',
            title: 'Name',
            render: (value, row) => (
                <div className="flex items-center gap-4">
                    <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-base"
                        style={{ background: 'linear-gradient(to right, #5C914C, #82C341)' }}
                    >
                        {value?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <div>
                        <p className="font-medium text-gray-900 text-base">{value || 'Unknown'}</p>
                        <p className="text-sm text-gray-500">{row.email}</p>
                    </div>
                </div>
            ),
        },
        { key: 'gender', title: 'Gender' },
        {
            key: 'birthDate',
            title: 'Birth Date',
            render: (value) => formatDate(value),
        },
        {
            key: 'points',
            title: 'Points',
            render: (value) => (
                <span className="font-semibold text-[#82C341] text-base">{value || 0}</span>
            ),
        },
        {
            key: 'actions',
            title: 'Actions',
            render: (_, row) => (
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="sm"
                        icon={HiEye}
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/users/${row.id || row._id}`);
                        }}
                    >
                        View
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        icon={HiTrash}
                        onClick={(e) => {
                            e.stopPropagation();
                            setDeleteModal({ open: true, user: row });
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
        <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Users</h1>
                    <p className="text-gray-500 mt-1">Manage registered users</p>
                </div>
            </div>

            {/* Search */}
            <div className="flex items-center gap-4">
                <SearchBar
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search by name or email..."
                    className="max-w-lg"
                />
            </div>

            {/* Table */}
            <Table
                columns={columns}
                data={paginatedUsers}
                loading={isLoading}
                emptyMessage="No users found"
                onRowClick={(row) => navigate(`/users/${row.id || row._id}`)}
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
                onClose={() => setDeleteModal({ open: false, user: null })}
                onConfirm={handleDelete}
                title="Delete User"
                message={`Are you sure you want to delete "${deleteModal.user?.name}"? This action cannot be undone.`}
                confirmText="Delete"
                loading={deleteUserMutation.isPending}
            />
        </div>
    );
}
