import React from 'react';
import { Order } from '../types';
import RecentOrdersTable from './RecentOrdersTable';

interface OrdersPageProps {
    orders: Order[];
    searchTerm: string;
}

const OrdersPage: React.FC<OrdersPageProps> = React.memo(({ orders, searchTerm }) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filteredOrders = React.useMemo(() => orders.filter(order =>
        order.id.toLowerCase().includes(lowerCaseSearchTerm) ||
        order.customer.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        order.status.toLowerCase().includes(lowerCaseSearchTerm)
    ), [orders, lowerCaseSearchTerm]);

    return (
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Encomendas</h2>
            <RecentOrdersTable orders={filteredOrders} />
        </div>
    );
});

export default OrdersPage;