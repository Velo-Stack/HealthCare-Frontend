/**
 * LoginPage Component
 * Admin login page
 */

import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HiMail, HiLockClosed } from 'react-icons/hi';
import { useAuth } from '../context/AuthContext';
import { colors } from '../utils/constants';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            return;
        }

        const success = await login(email, password);
        if (success) {
            navigate(from, { replace: true });
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center p-4"
            style={{ background: `linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.primary} 50%, ${colors.primaryLight} 100%)` }}
        >
            <div className="w-full max-w-md">
                {/* Logo Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-lg mb-4">
                        <img
                            src="/HealthCare-icon.png"
                            alt="Healthcare Logo"
                            className="w-12 h-12 object-contain"
                        />
                    </div>
                    <h1 className="text-3xl font-bold text-white">Healthcare</h1>
                    <p className="text-white/80 mt-1">Admin Dashboard</p>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
                        Welcome Back
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@example.com"
                                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:border-[#82C341] focus:ring-2 focus:ring-[#82C341]/20 transition-all outline-none"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:border-[#82C341] focus:ring-2 focus:ring-[#82C341]/20 transition-all outline-none"
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 rounded-xl text-white font-semibold transition-all duration-200 hover:opacity-90 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            style={{ background: `linear-gradient(to right, ${colors.primaryDark}, ${colors.primary})` }}
                        >
                            {isLoading ? (
                                <>
                                    <span className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                                    Logging in...
                                </>
                            ) : (
                                'Login'
                            )}
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <p className="text-center text-white/60 text-sm mt-6">
                    © 2025 Healthcare Admin Dashboard
                </p>
            </div>
        </div>
    );
}
