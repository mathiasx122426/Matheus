import React from 'react';
import { Pallet } from '../types';

interface PalletDetailsProps {
    pallets: Pallet[];
}

const PalletDetails: React.FC<PalletDetailsProps> = React.memo(({ pallets }) => {
    return (
        <div className="max-h-64 overflow-y-auto pr-2 custom-scrollbar">
            {pallets.map(pallet => (
                <div key={pallet.id} className="flex items-start mb-4 last:mb-0">
                    <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full mr-3 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2H4zm0 10h12V7H4v8zM8 9h8v2H8V9z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-gray-800 dark:text-gray-100 font-medium">Palete {pallet.id}</p>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">Cliente: {pallet.clientName}</p>
                        <p className="text-gray-800 dark:text-gray-100 text-sm font-bold">Peso Total: {pallet.totalWeightKg.toFixed(2)} kg</p>
                    </div>
                </div>
            ))}
        </div>
    );
});

export default PalletDetails;