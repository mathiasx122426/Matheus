import React from 'react';
import { Pallet, Order } from '../types';

interface PalletsPageProps {
    pallets: Pallet[];
    orders: Order[];
    searchTerm: string;
}

const PalletsPage: React.FC<PalletsPageProps> = React.memo(({ pallets, orders, searchTerm }) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filteredPallets = React.useMemo(() => pallets.filter(pallet => {
        const order = orders.find(o => o.id === pallet.orderId);
        const clientName = order ? order.customer.name : 'N/A';
        return (
            pallet.id.toLowerCase().includes(lowerCaseSearchTerm) ||
            pallet.orderId.toLowerCase().includes(lowerCaseSearchTerm) ||
            pallet.status.toLowerCase().includes(lowerCaseSearchTerm) ||
            clientName.toLowerCase().includes(lowerCaseSearchTerm)
        );
    }), [pallets, orders, lowerCaseSearchTerm]);

    return (
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Paletes</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th scope="col" className="px-6 py-3">ID Palete</th>
                            <th scope="col" className="px-6 py-3">ID Encomenda</th>
                            <th scope="col" className="px-6 py-3">Estado</th>
                            <th scope="col" className="px-6 py-3">Nº Caixas</th>
                            <th scope="col" className="px-6 py-3">Peso Fruta/Caixa (Kg)</th>
                            <th scope="col" className="px-6 py-3">Peso Bruto/Caixa (Kg)</th>
                            <th scope="col" className="px-6 py-3">Preço/Caixa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPallets.map(pallet => {
                            const order = orders.find(o => o.id === pallet.orderId);
                            return (
                                <tr key={pallet.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap">{pallet.id}</td>
                                    <td className="px-6 py-4">{pallet.orderId}</td>
                                    <td className="px-6 py-4">{pallet.status}</td>
                                    <td className="px-6 py-4">{pallet.boxCount}</td>
                                    <td className="px-6 py-4">{order ? order.fruitWeightPerBoxKg.toFixed(2) : 'N/A'}</td>
                                    <td className="px-6 py-4">{order ? order.grossWeightPerBoxKg.toFixed(2) : 'N/A'}</td>
                                    <td className="px-6 py-4">€{order ? order.pricePerBoxEuro.toFixed(2) : 'N/A'}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
});

export default PalletsPage;