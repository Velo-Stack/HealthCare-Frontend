/**
 * OrdersListPage Component
 * Display all orders with filtering and pagination
 */

import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiEye, HiFilter } from 'react-icons/hi';
import Table from '../../components/common/Table';
import SearchBar from '../../components/common/SearchBar';
import Pagination from '../../components/common/Pagination';
import Button from '../../components/common/Button';
import StatusBadge from '../../components/common/StatusBadge';
import { useOrders } from '../../hooks/useOrders';
import { formatDate } from '../../utils/formatDate';
import { ITEMS_PER_PAGE, ORDER_STATUS, colors } from '../../utils/constants';

const STATUS_FILTERS = [
    { value: 'all', label: 'All Orders' },
    { value: ORDER_STATUS.PENDING, label: 'Pending' },
    { value: ORDER_STATUS.APPROVED, label: 'Approved' },
    { value: ORDER_STATUS.REJECTED, label: 'Rejected' },
    { value: ORDER_STATUS.DELIVERED, label: 'Delivered' },
];

export default function OrdersListPage() {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);

    // Fetch orders
    const { data: ordersData, isLoading } = useOrders();

    // Filter and paginate orders
    const { filteredOrders, paginatedOrders, totalPages, totalItems, statusCounts } = useMemo(() => {
        const orders = ordersData?.data || ordersData || [];

        // Count by status
        const counts = {
            all: orders.length,
            pending: orders.filter((o) => o.status === ORDER_STATUS.PENDING).length,
            approved: orders.filter((o) => o.status === ORDER_STATUS.APPROVED).length,
            rejected: orders.filter((o) => o.status === ORDER_STATUS.REJECTED).length,
            delivered: orders.filter((o) => o.status === ORDER_STATUS.DELIVERED).length,
        };

        // Filter by status
        let filtered = orders;
        if (statusFilter !== 'all') {
            filtered = orders.filter((order) => order.status === statusFilter);
        }

        // Filter by search
        if (search) {
            filtered = filtered.filter(
                (order) =>
                    order.medicineName?.toLowerCase().includes(search.toLowerCase()) ||
                    order.userName?.toLowerCase().includes(search.toLowerCase()) ||
                    order.id?.includes(search) ||
                    order._id?.includes(search)
            );
        }

        // Paginate
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        const paginated = filtered.slice(start, start + ITEMS_PER_PAGE);

        return {
            filteredOrders: filtered,
            paginatedOrders: paginated,
            totalPages: Math.ceil(filtered.length / ITEMS_PER_PAGE),
            totalItems: filtered.length,
            statusCounts: counts,
        };
    }, [ordersData, search, statusFilter, currentPage]);

    // Handle search
    const handleSearch = (value) => {
        setSearch(value);
        setCurrentPage(1);
    };

    // Handle status filter
    const handleStatusFilter = (status) => {
        setStatusFilter(status);
        setCurrentPage(1);
    };

    // Table columns
    const columns = [
        {
            key: '_id',
            title: 'Order ID',
            render: (value) => (
                <span className="font-mono text-sm">#{(value || '').slice(-6)}</span>
            ),
        },
        {
            key: 'userId',
            title: 'Customer',
            render: (value) => <span className="font-medium">{value?.name || 'Unknown'}</span>,
        },
        { key: 'medicineName', title: 'Medicine' },
        {
            key: 'quantity',
            title: 'Qty',
            render: (value) => (
                <span className="px-2 py-1 bg-gray-100 rounded-lg text-sm font-medium">
                    {value}
                </span>
            ),
        },
        {
            key: 'status',
            title: 'Status',
            render: (value) => <StatusBadge status={value} />,
        },
        {
            key: 'createdAt',
            title: 'Date',
            render: (value) => formatDate(value),
        },
        {
            key: 'actions',
            title: 'Actions',
            render: (_, row) => (
                <Button
                    variant="ghost"
                    size="sm"
                    icon={HiEye}
                    onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/orders/${row.id || row._id}`);
                    }}
                >
                    View
                </Button>
            ),
        },
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
                <p className="text-gray-500">Manage medicine orders and prescriptions</p>
            </div>

            {/* Status Filter Tabs */}
            <div className="flex flex-wrap gap-2">
                {STATUS_FILTERS.map((filter) => (
                    <button
                        key={filter.value}
                        onClick={() => handleStatusFilter(filter.value)}
                        className={`
              px-4 py-2 rounded-lg font-medium text-sm transition-all
              ${statusFilter === filter.value
                                ? 'text-white shadow-md'
                                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                            }
            `}
                        style={
                            statusFilter === filter.value
                                ? { background: `linear-gradient(to right, ${colors.primaryDark}, ${colors.primary})` }
                                : {}
                        }
                    >
                        {filter.label}
                        <span
                            className={`ml-2 px-2 py-0.5 rounded-full text-xs ${statusFilter === filter.value
                                ? 'bg-white/20'
                                : 'bg-gray-100'
                                }`}
                        >
                            {statusCounts[filter.value] || 0}
                        </span>
                    </button>
                ))}
            </div>

            {/* Search */}
            <div className="flex items-center gap-4">
                <SearchBar
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search by medicine, customer, or order ID..."
                    className="max-w-md"
                />
            </div>

            {/* Table */}
            <Table
                columns={columns}
                data={paginatedOrders}
                loading={isLoading}
                emptyMessage="No orders found"
                onRowClick={(row) => navigate(`/orders/${row.id || row._id}`)}
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
        </div>
    );
}
