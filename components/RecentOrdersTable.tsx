import React from 'react';
import { Order, OrderStatus } from '../types';

interface RecentOrdersTableProps {
    orders: Order[];
}

const statusColorMap: Record<OrderStatus, string> = {
    [OrderStatus.Pendente]: 'bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100', // Matches image's 'Pending'
    [OrderStatus.Processando]: 'bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-blue-100',
    [OrderStatus.Enviado]: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-700 dark:text-indigo-100',
    [OrderStatus.Entregue]: 'bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100', // Matches image's 'Delivered'
    [OrderStatus.Cancelado]: 'bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200',
};

const RecentOrdersTable: React.FC<RecentOrdersTableProps> = React.memo(({ orders }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-50 dark:bg-gray-700">
                    <tr>
                        <th scope="col" className="px-6 py-3">ID ENCOMENDA</th>
                        <th scope="col" className="px-6 py-3">CLIENTE</th>
                        <th scope="col" className="px-6 py-3">DESTINO</th> {/* Nova coluna adicionada aqui */}
                        <th scope="col" className="px-6 py-3">DATA</th>
                        <th scope="col" className="px-6 py-3">ESTADO</th>
                        <th scope="col" className="px-6 py-3">Nº CAIXAS</th>
                        <th scope="col" className="px-6 py-3">PESO FRUTA/CAIXA (KG)</th>
                        <th scope="col" className="px-6 py-3">PESO BRUTO/CAIXA (KG)</th>
                        <th scope="col" className="px-6 py-3">PREÇO/CAIXA</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap">
                                {order.id}
                            </th>
                            <td className="px-6 py-4">{order.customer.name}</td>
                            <td className="px-6 py-4">{order.customer.lastDestination}</td> {/* Dados para a nova coluna */}
                            <td className="px-6 py-4">{order.orderDate}</td>
                            <td className="px-6 py-4">
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColorMap[order.status]}`}>
                                    {order.status}
                                </span>
                            </td>
                            <td className="px-6 py-4">{order.boxCount}</td>
                            <td className="px-6 py-4">{order.fruitWeightPerBoxKg.toFixed(2)}</td>
                            <td className="px-6 py-4">{order.grossWeightPerBoxKg.toFixed(2)}</td>
                            <td className="px-6 py-4">€{order.pricePerBoxEuro.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
});

export default RecentOrdersTable;