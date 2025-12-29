/**
 * StatsCard Component
 * Statistics display card for dashboard
 */

import { colors } from '../../utils/constants';

export default function StatsCard({
    title,
    value,
    icon: Icon,
    trend,
    trendValue,
    color = 'primary',
    loading = false,
}) {
    const colorMap = {
        primary: colors.primary,
        success: colors.success,
        warning: colors.warning,
        error: colors.error,
        info: colors.info,
    };

    const bgColor = colorMap[color] || colors.primary;

    if (loading) {
        return (
            <div className="bg-white rounded-2xl p-8 shadow-sm animate-pulse">
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
                        <div className="h-10 bg-gray-200 rounded w-1/3" />
                    </div>
                    <div className="w-16 h-16 bg-gray-200 rounded-2xl" />
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl p-8 shadow-sm card-hover">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500 mb-2">{title}</p>
                    <p className="text-4xl font-bold text-gray-900">{value}</p>

                    {trend && (
                        <div className="flex items-center mt-3">
                            <span
                                className={`text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'
                                    }`}
                            >
                                {trend === 'up' ? '↑' : '↓'} {trendValue}
                            </span>
                            <span className="text-xs text-gray-400 ml-2">vs last month</span>
                        </div>
                    )}
                </div>

                {Icon && (
                    <div
                        className="p-5 rounded-2xl"
                        style={{ backgroundColor: `${bgColor}15` }}
                    >
                        <Icon className="w-8 h-8" style={{ color: bgColor }} />
                    </div>
                )}
            </div>
        </div>
    );
}
