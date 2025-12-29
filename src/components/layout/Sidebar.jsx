/**
 * Sidebar Component
 * Main navigation sidebar with logo
 */

import { NavLink } from 'react-router-dom';
import {
    HiHome,
    HiUsers,
    HiShieldCheck,
    HiShoppingCart,
    HiLogout,
} from 'react-icons/hi';
import { colors } from '../../utils/constants';

const menuItems = [
    { path: '/', icon: HiHome, label: 'Dashboard' },
    { path: '/users', icon: HiUsers, label: 'Users' },
    { path: '/insurance', icon: HiShieldCheck, label: 'Insurance' },
    { path: '/orders', icon: HiShoppingCart, label: 'Orders' },
];

export default function Sidebar() {
    return (
        <aside
            className="fixed top-0 left-0 h-screen bg-white border-r border-gray-100 flex flex-col z-40"
            style={{ width: 'var(--sidebar-width)' }}
        >
            {/* Logo Section */}
            <div className="p-8 border-b border-gray-100">
                <div className="flex items-center gap-4">
                    <img
                        src="/HealthCare-icon.png"
                        alt="Healthcare Logo"
                        className="w-12 h-12 object-contain"
                    />
                    <div>
                        <h1
                            className="text-xl font-bold"
                            style={{ color: colors.primary }}
                        >
                            Healthcare
                        </h1>
                        <p className="text-xs text-gray-400 mt-0.5">Admin Dashboard</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-6 overflow-y-auto">
                <ul className="space-y-2">
                    {menuItems.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-4 px-5 py-4 rounded-xl font-medium transition-all duration-200 ${isActive
                                        ? 'text-white shadow-md'
                                        : 'text-gray-600 hover:bg-gray-50'
                                    }`
                                }
                                style={({ isActive }) =>
                                    isActive
                                        ? { background: `linear-gradient(to right, ${colors.primaryDark}, ${colors.primary})` }
                                        : {}
                                }
                            >
                                <item.icon className="w-6 h-6" />
                                <span className="text-base">{item.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Footer / Logout */}
            <div className="p-6 border-t border-gray-100">
                <button
                    className="flex items-center gap-4 w-full px-5 py-4 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 font-medium transition-all duration-200"
                >
                    <HiLogout className="w-6 h-6" />
                    <span className="text-base">Logout</span>
                </button>
            </div>
        </aside>
    );
}
