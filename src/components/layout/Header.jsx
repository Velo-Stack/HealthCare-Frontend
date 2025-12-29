/**
 * Header Component
 * Top header with page title
 */

import { HiMenu } from 'react-icons/hi';
import { colors } from '../../utils/constants';

export default function Header({ title, subtitle, onMenuClick }) {
    return (
        <header className="bg-white border-b border-gray-100 px-8 py-6">
            <div className="flex items-center justify-between">
                {/* Left side - Menu button (mobile) and Title */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={onMenuClick}
                        className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                        <HiMenu className="w-6 h-6" />
                    </button>

                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                        {subtitle && (
                            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
                        )}
                    </div>
                </div>

                {/* Right side - User avatar only */}
                <div className="flex items-center">
                    <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer"
                        style={{ background: `linear-gradient(to right, ${colors.primaryDark}, ${colors.primary})` }}
                    >
                        A
                    </div>
                </div>
            </div>
        </header>
    );
}
