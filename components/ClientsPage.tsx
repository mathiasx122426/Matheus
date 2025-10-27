import React from 'react';
import { Customer } from '../types';

interface ClientsPageProps {
    customers: Customer[];
    searchTerm: string;
}

const ClientsPage: React.FC<ClientsPageProps> = React.memo(({ customers, searchTerm }) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filteredCustomers = React.useMemo(() => customers.filter(customer =>
        customer.id.toLowerCase().includes(lowerCaseSearchTerm) ||
        customer.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        customer.registrationDate.toLowerCase().includes(lowerCaseSearchTerm) ||
        customer.lastDestination.toLowerCase().includes(lowerCaseSearchTerm)
    ), [customers, lowerCaseSearchTerm]);

    return (
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Clientes</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th scope="col" className="px-6 py-3">ID Cliente</th>
                            <th scope="col" className="px-6 py-3">Nome</th>
                            <th scope="col" className="px-6 py-3">Data de Registo</th>
                            <th scope="col" className="px-6 py-3">Último Destino</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCustomers.map(customer => (
                            <tr key={customer.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap">{customer.id}</td>
                                <td className="px-6 py-4">{customer.name}</td>
                                <td className="px-6 py-4">{customer.registrationDate}</td>
                                <td className="px-6 py-4">{customer.lastDestination}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
});

export default ClientsPage;