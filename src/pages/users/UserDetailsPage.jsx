/**
 * UserDetailsPage Component
 * View and edit user details
 */

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HiArrowLeft, HiPencil, HiSave, HiX } from 'react-icons/hi';
import Button from '../../components/common/Button';
import Table from '../../components/common/Table';
import StatusBadge from '../../components/common/StatusBadge';
import Modal from '../../components/common/Modal';
import { useUser, useUpdateUserPoints } from '../../hooks/useUsers';
import { formatDate } from '../../utils/formatDate';
import { colors } from '../../utils/constants';

export default function UserDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [editPoints, setEditPoints] = useState(false);
    const [newPoints, setNewPoints] = useState(0);

    const { data: userData, isLoading } = useUser(id);
    const updatePointsMutation = useUpdateUserPoints();

    const user = userData?.data || userData;

    // Handle points update
    const handleUpdatePoints = () => {
        updatePointsMutation.mutate(
            { id, points: parseInt(newPoints) },
            {
                onSuccess: () => setEditPoints(false),
            }
        );
    };

    // Open edit points modal
    const openEditPoints = () => {
        setNewPoints(user?.points || 0);
        setEditPoints(true);
    };

    // Insurance cards columns
    const insuranceColumns = [
        { key: 'companyName', title: 'Company' },
        { key: 'policyNumber', title: 'Policy Number' },
        {
            key: 'expiryDate',
            title: 'Expiry Date',
            render: (value) => formatDate(value),
        },
        {
            key: 'status',
            title: 'Status',
            render: (value) => <StatusBadge status={value || 'active'} size="sm" />,
        },
    ];

    // User orders columns
    const orderColumns = [
        {
            key: 'id',
            title: 'Order ID',
            render: (value) => `#${value?.slice(-6) || 'N/A'}`,
        },
        { key: 'medicineName', title: 'Medicine' },
        { key: 'quantity', title: 'Qty' },
        {
            key: 'status',
            title: 'Status',
            render: (value) => <StatusBadge status={value} size="sm" />,
        },
        {
            key: 'createdAt',
            title: 'Date',
            render: (value) => formatDate(value),
        },
    ];

    if (isLoading) {
        return (
            <div className="animate-pulse space-y-6">
                <div className="h-8 w-32 bg-gray-200 rounded" />
                <div className="bg-white rounded-xl p-6">
                    <div className="h-6 w-48 bg-gray-200 rounded mb-4" />
                    <div className="space-y-3">
                        <div className="h-4 w-full bg-gray-200 rounded" />
                        <div className="h-4 w-3/4 bg-gray-200 rounded" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Back button */}
            <Button variant="ghost" icon={HiArrowLeft} onClick={() => navigate('/users')}>
                Back to Users
            </Button>

            {/* User Info Card */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {/* Header with gradient */}
                <div
                    className="h-24"
                    style={{ background: `linear-gradient(to right, ${colors.primaryDark}, ${colors.primary})` }}
                />

                {/* User content */}
                <div className="px-6 pb-6">
                    {/* Avatar */}
                    <div className="relative -mt-12 mb-4">
                        <div
                            className="w-24 h-24 rounded-full border-4 border-white flex items-center justify-center text-white text-3xl font-bold shadow-lg"
                            style={{ background: `linear-gradient(to right, ${colors.primaryDark}, ${colors.primary})` }}
                        >
                            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                    </div>

                    {/* User details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{user?.name || 'Unknown'}</h2>
                            <p className="text-gray-500">{user?.email}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <InfoItem label="Gender" value={user?.gender || '-'} />
                            <InfoItem label="Birth Date" value={formatDate(user?.birthDate)} />
                            <InfoItem label="Phone" value={user?.phone || '-'} />
                            <div>
                                <p className="text-sm text-gray-500">Points</p>
                                <div className="flex items-center gap-2">
                                    <span className="text-lg font-bold text-[#82C341]">
                                        {user?.points || 0}
                                    </span>
                                    <button
                                        onClick={openEditPoints}
                                        className="p-1 rounded-lg text-gray-400 hover:text-[#82C341] hover:bg-green-50 transition-colors"
                                    >
                                        <HiPencil className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Insurance Cards */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Insurance Cards</h3>
                <Table
                    columns={insuranceColumns}
                    data={user?.insuranceCards || []}
                    emptyMessage="No insurance cards registered"
                />
            </div>

            {/* User Orders */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Orders History</h3>
                <Table
                    columns={orderColumns}
                    data={user?.orders || []}
                    emptyMessage="No orders yet"
                />
            </div>

            {/* Edit Points Modal */}
            <Modal
                isOpen={editPoints}
                onClose={() => setEditPoints(false)}
                title="Edit Points"
                size="sm"
                footer={
                    <>
                        <Button variant="secondary" onClick={() => setEditPoints(false)}>
                            Cancel
                        </Button>
                        <Button
                            icon={HiSave}
                            onClick={handleUpdatePoints}
                            loading={updatePointsMutation.isPending}
                        >
                            Save
                        </Button>
                    </>
                }
            >
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Points
                    </label>
                    <input
                        type="number"
                        value={newPoints}
                        onChange={(e) => setNewPoints(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#82C341] focus:ring-2 focus:ring-[#82C341]/20"
                        min="0"
                    />
                </div>
            </Modal>
        </div>
    );
}

// Helper component for displaying info items
function InfoItem({ label, value }) {
    return (
        <div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="font-medium text-gray-900">{value}</p>
        </div>
    );
}
