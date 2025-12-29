/**
 * DashboardPage Component
 * Main dashboard with statistics, charts, and recent data
 */

import { useMemo } from 'react';
import {
    HiUsers,
    HiShieldCheck,
    HiShoppingCart,
    HiClock,
} from 'react-icons/hi';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from 'recharts';
import StatsCard from '../components/common/StatsCard';
import Table from '../components/common/Table';
import StatusBadge from '../components/common/StatusBadge';
import { useUsers } from '../hooks/useUsers';
import { useInsuranceCompanies } from '../hooks/useInsurance';
import { useOrders } from '../hooks/useOrders';
import { colors } from '../utils/constants';
import { formatDate, getRelativeTime } from '../utils/formatDate';

const CHART_COLORS = [colors.success, colors.warning, colors.error, colors.info];

export default function DashboardPage() {
    // Fetch data
    const { data: usersData, isLoading: usersLoading } = useUsers();
    const { data: insuranceData, isLoading: insuranceLoading } = useInsuranceCompanies();
    const { data: ordersData, isLoading: ordersLoading } = useOrders();

    // Calculate statistics
    const stats = useMemo(() => {
        const orders = ordersData?.data || ordersData || [];
        const users = usersData?.data || usersData || [];
        const insurance = insuranceData?.data || insuranceData || [];

        const pendingOrders = orders.filter(o => o.status === 'pending').length;
        const approvedOrders = orders.filter(o => o.status === 'approved').length;
        const rejectedOrders = orders.filter(o => o.status === 'rejected').length;

        return {
            totalUsers: users.length,
            totalInsurance: insurance.length,
            totalOrders: orders.length,
            pendingOrders,
            ordersByStatus: [
                { name: 'Approved', value: approvedOrders, color: colors.success },
                { name: 'Pending', value: pendingOrders, color: colors.warning },
                { name: 'Rejected', value: rejectedOrders, color: colors.error },
            ],
        };
    }, [usersData, insuranceData, ordersData]);

    // Recent users (last 5)
    const recentUsers = useMemo(() => {
        const users = usersData?.data || usersData || [];
        return users.slice(0, 5);
    }, [usersData]);

    // Recent orders (last 5)
    const recentOrders = useMemo(() => {
        const orders = ordersData?.data || ordersData || [];
        return orders.slice(0, 5);
    }, [ordersData]);

    // Table columns for recent users
    const userColumns = [
        { key: 'name', title: 'Name' },
        { key: 'email', title: 'Email' },
        {
            key: 'createdAt',
            title: 'Joined',
            render: (value) => getRelativeTime(value),
        },
    ];

    // Table columns for recent orders
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
    ];

    const loading = usersLoading || insuranceLoading || ordersLoading;

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Users"
                    value={stats.totalUsers}
                    icon={HiUsers}
                    color="primary"
                    loading={loading}
                />
                <StatsCard
                    title="Insurance Companies"
                    value={stats.totalInsurance}
                    icon={HiShieldCheck}
                    color="info"
                    loading={loading}
                />
                <StatsCard
                    title="Total Orders"
                    value={stats.totalOrders}
                    icon={HiShoppingCart}
                    color="success"
                    loading={loading}
                />
                <StatsCard
                    title="Pending Orders"
                    value={stats.pendingOrders}
                    icon={HiClock}
                    color="warning"
                    loading={loading}
                />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Orders by Status Bar Chart */}
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">
                        Orders by Status
                    </h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stats.ordersByStatus}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="name" tick={{ fill: colors.textSecondary }} />
                                <YAxis tick={{ fill: colors.textSecondary }} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: colors.white,
                                        border: `1px solid ${colors.greyLight}`,
                                        borderRadius: '12px',
                                        padding: '12px',
                                    }}
                                />
                                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                                    {stats.ordersByStatus.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Orders Distribution Pie Chart */}
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">
                        Orders Distribution
                    </h3>
                    <div className="h-72 flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={stats.ordersByStatus}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={110}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {stats.ordersByStatus.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: colors.white,
                                        border: `1px solid ${colors.greyLight}`,
                                        borderRadius: '12px',
                                        padding: '12px',
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    {/* Legend */}
                    <div className="flex justify-center gap-6 mt-6">
                        {stats.ordersByStatus.map((item) => (
                            <div key={item.name} className="flex items-center gap-2">
                                <span
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: item.color }}
                                />
                                <span className="text-sm text-gray-600">{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Data Tables */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Recent Users */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">
                        Recent Users
                    </h3>
                    <Table
                        columns={userColumns}
                        data={recentUsers}
                        loading={usersLoading}
                        emptyMessage="No users yet"
                    />
                </div>

                {/* Recent Orders */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">
                        Recent Orders
                    </h3>
                    <Table
                        columns={orderColumns}
                        data={recentOrders}
                        loading={ordersLoading}
                        emptyMessage="No orders yet"
                    />
                </div>
            </div>
        </div>
    );
}
