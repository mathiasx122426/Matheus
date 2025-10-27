import React from 'react';
import { Pallet, PalletStatus } from '../types';

interface PalletStatusSummaryProps {
    pallets: Pallet[];
}

const PalletStatusSummary: React.FC<PalletStatusSummaryProps> = React.memo(({ pallets }) => {
    const statusCounts = pallets.reduce((acc, pallet) => {
        acc[pallet.status] = (acc[pallet.status] || 0) + 1;
        return acc;
    }, {} as Record<PalletStatus, number>);

    const statusDisplayOrder = [PalletStatus.Concluído, PalletStatus.EmProgresso, PalletStatus.Agendado];

    const COLORS: Record<PalletStatus, string> = {
        [PalletStatus.Concluído]: 'bg-fruitflowGreen',
        [PalletStatus.EmProgresso]: 'bg-orange-500',
        [PalletStatus.Agendado]: 'bg-teal-500',
    };

    return (
        <div className="space-y-4">
            {statusDisplayOrder.map(status => (
                <div key={status} className="flex items-center justify-between text-gray-700 dark:text-gray-300">
                    <div className="flex items-center">
                        <span className={`w-3 h-3 rounded-full mr-3 ${COLORS[status]}`}></span>
                        <span className="text-base">{status}</span> {/* Display status directly */}
                    </div>
                    <span className="text-xl font-bold text-gray-800 dark:text-gray-100">{statusCounts[status] || 0}</span>
                </div>
            ))}
        </div>
    );
});

export default PalletStatusSummary;