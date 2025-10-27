import React from 'react';

interface DashboardCardProps {
    title: string;
    value: string;
    icon: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = React.memo(({ title, value, icon }) => {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
                <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{value}</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-full flex items-center justify-center">
                {icon}
            </div>
        </div>
    );
});

export default DashboardCard;