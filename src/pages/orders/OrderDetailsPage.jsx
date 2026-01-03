/**
 * OrderDetailsPage Component
 * View order details and update status
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HiArrowLeft, HiCheck, HiX, HiPhotograph, HiPencil, HiSave } from 'react-icons/hi';
import Button from '../../components/common/Button';
import StatusBadge from '../../components/common/StatusBadge';
import { useOrder, useApproveOrder, useRejectOrder, useUpdateAdminNotes } from '../../hooks/useOrders';
import { formatDateTime } from '../../utils/formatDate';
import { colors, ORDER_STATUS } from '../../utils/constants';

export default function OrderDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: orderData, isLoading } = useOrder(id);
    const approveMutation = useApproveOrder();
    const rejectMutation = useRejectOrder();
    const notesMutation = useUpdateAdminNotes();

    const order = orderData?.data || orderData;

    // Admin notes state
    const [adminNotes, setAdminNotes] = useState('');

    // Sync notes when order loads
    useEffect(() => {
        if (order?.adminNotes !== undefined) {
            setAdminNotes(order.adminNotes || '');
        }
    }, [order?.adminNotes]);

    // Handle save notes
    const handleSaveNotes = () => {
        notesMutation.mutate({ id, adminNotes });
    };

    // Handle approve
    const handleApprove = () => {
        approveMutation.mutate(id);
    };

    // Handle reject
    const handleReject = () => {
        rejectMutation.mutate(id);
    };

    const isPending = order?.status === ORDER_STATUS.PENDING;
    const isActioning = approveMutation.isPending || rejectMutation.isPending;

    if (isLoading) {
        return (
            <div className="animate-pulse space-y-6">
                <div className="h-10 w-32 bg-gray-200 rounded" />
                <div className="bg-white rounded-xl p-6">
                    <div className="space-y-4">
                        <div className="h-6 w-48 bg-gray-200 rounded" />
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
            <Button variant="ghost" icon={HiArrowLeft} onClick={() => navigate('/orders')}>
                Back to Orders
            </Button>

            {/* Order Header */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-gray-900">
                                Order #{(order?.id || order?._id || '').slice(-6)}
                            </h1>
                            <StatusBadge status={order?.status} />
                        </div>
                        <p className="text-gray-500 mt-1">
                            Placed on {formatDateTime(order?.createdAt)}
                        </p>
                    </div>

                    {/* Action Buttons (only for pending orders) */}
                    {isPending && (
                        <div className="flex items-center gap-3">
                            <Button
                                variant="danger"
                                icon={HiX}
                                onClick={handleReject}
                                loading={rejectMutation.isPending}
                                disabled={isActioning}
                            >
                                Reject
                            </Button>
                            <Button
                                variant="success"
                                icon={HiCheck}
                                onClick={handleApprove}
                                loading={approveMutation.isPending}
                                disabled={isActioning}
                            >
                                Approve
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* Order Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Medicine Details */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Medicine Details
                    </h2>
                    <div className="space-y-4">
                        <DetailItem label="Medicine Name" value={order?.medicineName || '-'} />
                        <DetailItem label="Quantity" value={order?.quantity || 0} />
                        <DetailItem label="Dosage" value={order?.dosage || '-'} />
                        <DetailItem label="Notes" value={order?.notes || 'No additional notes'} />
                    </div>
                </div>

                {/* Customer Details */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Customer Details
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div
                                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                                style={{ background: `linear-gradient(to right, ${colors.primaryDark}, ${colors.primary})` }}
                            >
                                {order?.userId?.name?.charAt(0)?.toUpperCase() || 'U'}
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">{order?.userId?.name || 'Unknown'}</p>
                                <p className="text-sm text-gray-500">{order?.userId?.email || '-'}</p>
                            </div>
                        </div>
                        <DetailItem label="Phone" value={order?.userId?.phone || '-'} />
                        <DetailItem label="Address" value={order?.deliveryAddress || '-'} />
                    </div>
                </div>
            </div>

            {/* Prescription Image */}
            {order?.prescriptionImage && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <HiPhotograph className="w-5 h-5 text-gray-400" />
                        Prescription Image
                    </h2>
                    <div className="relative">
                        <img
                            src={order.prescriptionImage}
                            alt="Prescription"
                            className="max-w-full max-h-[500px] rounded-lg border border-gray-200 object-contain"
                        />
                        <a
                            href={order.prescriptionImage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute top-2 right-2 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-lg text-sm font-medium text-gray-700 hover:bg-white shadow-sm transition-colors"
                        >
                            Open Full Size
                        </a>
                    </div>
                </div>
            )}

            {/* No Prescription */}
            {!order?.prescriptionImage && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                        <HiPhotograph className="w-16 h-16 mb-4" />
                        <p className="text-lg font-medium">No prescription uploaded</p>
                        <p className="text-sm">Customer did not provide a prescription image</p>
                    </div>
                </div>
            )}

            {/* Admin Notes Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <HiPencil className="w-5 h-5 text-gray-400" />
                    Admin Notes
                    <span className="text-xs font-normal text-gray-400">(Visible to customer)</span>
                </h2>
                <div className="space-y-4">
                    <textarea
                        value={adminNotes}
                        onChange={(e) => setAdminNotes(e.target.value)}
                        placeholder="Add notes for this order... (e.g., special instructions, delivery notes)"
                        className="w-full h-32 px-4 py-3 border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#82C341]/30 focus:border-[#82C341] resize-none transition-all"
                    />
                    <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-400">
                            {adminNotes.length} characters
                        </p>
                        <Button
                            icon={HiSave}
                            onClick={handleSaveNotes}
                            loading={notesMutation.isPending}
                            disabled={adminNotes === (order?.adminNotes || '')}
                        >
                            Save Notes
                        </Button>
                    </div>
                </div>
            </div>

            {/* Order Timeline/History */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Order History
                </h2>
                <div className="space-y-4">
                    <TimelineItem
                        status="created"
                        label="Order Placed"
                        date={order?.createdAt}
                        isCompleted
                    />
                    {order?.status !== ORDER_STATUS.PENDING && (
                        <TimelineItem
                            status={order?.status}
                            label={
                                order?.status === ORDER_STATUS.APPROVED
                                    ? 'Order Approved'
                                    : order?.status === ORDER_STATUS.REJECTED
                                        ? 'Order Rejected'
                                        : 'Order Delivered'
                            }
                            date={order?.updatedAt}
                            isCompleted
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

// Helper component for detail items
function DetailItem({ label, value }) {
    return (
        <div className="flex justify-between items-start">
            <span className="text-sm text-gray-500">{label}</span>
            <span className="font-medium text-gray-900 text-right max-w-[60%]">{value}</span>
        </div>
    );
}

// Helper component for timeline
function TimelineItem({ status, label, date, isCompleted }) {
    const getColor = () => {
        switch (status) {
            case 'approved':
                return colors.success;
            case 'rejected':
                return colors.error;
            case 'delivered':
                return colors.info;
            default:
                return colors.primary;
        }
    };

    return (
        <div className="flex items-start gap-4">
            <div
                className={`w-4 h-4 rounded-full mt-1 ${isCompleted ? '' : 'opacity-30'}`}
                style={{ backgroundColor: getColor() }}
            />
            <div>
                <p className="font-medium text-gray-900">{label}</p>
                <p className="text-sm text-gray-500">{formatDateTime(date)}</p>
            </div>
        </div>
    );
}
