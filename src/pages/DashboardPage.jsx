/**
 * DashboardPage Component (Refined UI)
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
import { getRelativeTime } from '../utils/formatDate';

export default function DashboardPage() {
    const { data: usersData, isLoading: usersLoading } = useUsers();
    const { data: insuranceData, isLoading: insuranceLoading } = useInsuranceCompanies();
    const { data: ordersData, isLoading: ordersLoading } = useOrders();

    const loading = usersLoading || insuranceLoading || ordersLoading;

    const stats = useMemo(() => {
        const users = usersData?.data || usersData || [];
        const insurance = insuranceData?.data || insuranceData || [];
        const orders = ordersData?.data || ordersData || [];

        const pending = orders.filter(o => o.status === 'pending').length;
        const approved = orders.filter(o => o.status === 'approved').length;
        const rejected = orders.filter(o => o.status === 'rejected').length;

        return {
            totalUsers: users.length,
            totalInsurance: insurance.length,
            totalOrders: orders.length,
            pendingOrders: pending,
            ordersByStatus: [
                { name: 'Approved', value: approved, color: colors.success },
                { name: 'Pending', value: pending, color: colors.warning },
                { name: 'Rejected', value: rejected, color: colors.error },
            ],
        };
    }, [usersData, insuranceData, ordersData]);

    const recentUsers = useMemo(() => {
        const users = usersData?.data || usersData || [];
        return users.slice(0, 5);
    }, [usersData]);

    const recentOrders = useMemo(() => {
        const orders = ordersData?.data || ordersData || [];
        return orders.slice(0, 5);
    }, [ordersData]);

    const userColumns = [
        { key: 'name', title: 'Name' },
        { key: 'email', title: 'Email' },
        {
            key: 'createdAt',
            title: 'Joined',
            render: (v) => getRelativeTime(v),
        },
    ];

    const orderColumns = [
        {
            key: 'id',
            title: 'Order',
            render: (v) => `#${v?.slice(-6) || 'N/A'}`,
        },
        { key: 'medicineName', title: 'Medicine' },
        { key: 'quantity', title: 'Qty' },
        {
            key: 'status',
            title: 'Status',
            render: (v) => <StatusBadge status={v} size="sm" />,
        },
    ];

    return (
        <div className="space-y-10 animate-fade-in">

            {/* ===== Stats ===== */}
            <section>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                    <StatsCard title="Total Users" value={stats.totalUsers} icon={HiUsers} loading={loading} />
                    <StatsCard title="Insurance Companies" value={stats.totalInsurance} icon={HiShieldCheck} color="info" loading={loading} />
                    <StatsCard title="Total Orders" value={stats.totalOrders} icon={HiShoppingCart} color="success" loading={loading} />
                    <StatsCard title="Pending Orders" value={stats.pendingOrders} icon={HiClock} color="warning" loading={loading} />
                </div>
            </section>

            {/* ===== Charts ===== */}
            <section className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Bar Chart */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-800 mb-4">
                        Orders by Status
                    </h3>

                    <div className="h-64">
                        <ResponsiveContainer>
                            <BarChart data={stats.ordersByStatus}>
                                <CartesianGrid stroke="#f1f1f1" strokeDasharray="3 3" />
                                <XAxis dataKey="name" tick={{ fill: '#6B7280', fontSize: 12 }} />
                                <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{
                                        background: '#fff',
                                        borderRadius: 12,
                                        border: '1px solid #eee',
                                        fontSize: 12,
                                    }}
                                />
                                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                                    {stats.ordersByStatus.map((e, i) => (
                                        <Cell key={i} fill={e.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Pie Chart */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-800 mb-4">
                        Orders Distribution
                    </h3>

                    <div className="h-64">
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie
                                    data={stats.ordersByStatus}
                                    dataKey="value"
                                    innerRadius={65}
                                    outerRadius={100}
                                    paddingAngle={4}
                                >
                                    {stats.ordersByStatus.map((e, i) => (
                                        <Cell key={i} fill={e.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="flex justify-center gap-5 mt-4">
                        {stats.ordersByStatus.map(item => (
                            <div key={item.name} className="flex items-center gap-2 text-xs text-gray-600">
                                <span className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                                {item.name}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== Tables ===== */}
            <section className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-4">
                        Recent Users
                    </h3>
                    <Table
                        columns={userColumns}
                        data={recentUsers}
                        loading={usersLoading}
                        emptyMessage="No users yet"
                    />
                </div>

                <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-4">
                        Recent Orders
                    </h3>
                    <Table
                        columns={orderColumns}
                        data={recentOrders}
                        loading={ordersLoading}
                        emptyMessage="No orders yet"
                    />
                </div>
            </section>

        </div>
    );
}
