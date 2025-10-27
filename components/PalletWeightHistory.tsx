import React from 'react';
import { Pallet } from '../types';

interface PalletWeightHistoryProps {
    pallets: Pallet[];
}

const PalletWeightHistory: React.FC<PalletWeightHistoryProps> = React.memo(({ pallets }) => {
    return (
        <div className="max-h-64 overflow-y-auto pr-2 custom-scrollbar">
            {pallets.map(pallet => (
                <div key={pallet.id} className="flex items-start mb-4 last:mb-0">
                    <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full mr-3 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-fruitflowGreen" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-gray-800 dark:text-gray-100 font-medium">Palete {pallet.id}</p>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">Cliente: {pallet.clientName}</p>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">Peso Total: {pallet.totalWeightKg.toFixed(2)} kg</p>
                    </div>
                </div>
            ))}
        </div>
    );
});

export default PalletWeightHistory;