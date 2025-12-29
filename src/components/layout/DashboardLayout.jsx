/**
 * DashboardLayout Component
 * Main layout wrapper with sidebar and header
 */

import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function DashboardLayout({ title = 'Dashboard', subtitle = '' }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[var(--color-scaffold-background)]">
            {/* Mobile overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={`
          fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
            >
                <Sidebar />
            </div>

            {/* Main content area */}
            <div
                className="min-h-screen transition-all duration-300"
                style={{ marginLeft: 'var(--sidebar-width)' }}
            >
                {/* Header */}
                <Header
                    title={title}
                    subtitle={subtitle}
                    onMenuClick={() => setIsMobileMenuOpen(true)}
                />

                {/* Page content - More padding */}
                <main className="p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
