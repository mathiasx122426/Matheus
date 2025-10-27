
import React from 'react';
import DashboardCard from './DashboardCard';
import RecentOrdersTable from './RecentOrdersTable';
import PalletStatusSummary from './PalletStatusSummary';
import PalletWeightHistory from './PalletWeightHistory';
import PalletDetails from './PalletDetails';
import { Order, Customer, Pallet, PalletStatus, OrderStatus } from '../types';

interface DashboardContentProps {
    orders: Order[];
    customers: Customer[];
    pallets: Pallet[];
    searchTerm: string;
}

// Ícones personalizados correspondentes à imagem
const IconeGrupoUsuarios: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);

const IconeListaEncomendas: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
);

const IconeMacaPalete: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C9.8 2 8 3.8 8 6c0 1.5.7 2.8 1.8 3.7C8.2 10.7 7 12.3 7 14c0 2.8 2.2 5 5 5s5-2.2 5-5c0-1.7-1.2-3.3-2.8-4.3C15.3 8.8 16 7.5 16 6c0-2.2-1.8-4-4-4zm-1 0a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0V2z"/>
    </svg>
);


const IconeBalanca: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 21h10"></path><path d="M12 17V3"></path><path d="M6 15l-4 2"></path><path d="M18 15l4 2"></path><path d="M3 3h18l-2 4H5L3 3z"></path></svg>
);


const DashboardContent: React.FC<DashboardContentProps> = React.memo(({ orders, customers, pallets, searchTerm }) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    // Filtered data for tables/lists within the dashboard using useMemo
    const filteredOrders = React.useMemo(() => orders.filter(order =>
        order.id.toLowerCase().includes(lowerCaseSearchTerm) ||
        order.customer.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        order.status.toLowerCase().includes(lowerCaseSearchTerm)
    ), [orders, lowerCaseSearchTerm]);

    const filteredPallets = React.useMemo(() => pallets.filter(pallet =>
        pallet.id.toLowerCase().includes(lowerCaseSearchTerm) ||
        pallet.orderId.toLowerCase().includes(lowerCaseSearchTerm) ||
        pallet.clientName.toLowerCase().includes(lowerCaseSearchTerm) ||
        pallet.status.toLowerCase().includes(lowerCaseSearchTerm)
    ), [pallets, lowerCaseSearchTerm]);

    const totalCustomers = customers.length;
    const activeOrders = orders.filter(o => o.status === OrderStatus.Processando || o.status === OrderStatus.Enviado).length;
    const palletsInProgress = pallets.filter(p => p.status === PalletStatus.EmProgresso).length;
    const totalProcessedWeight = React.useMemo(() => pallets.reduce((sum, p) => sum + p.totalWeightKg, 0), [pallets]);


    return (
        <>
            {/* Linha de Cards do Painel de Controle */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <DashboardCard title="Total Clientes" value={totalCustomers.toString()} icon={<IconeGrupoUsuarios className="w-8 h-8 text-fruitflowGreen" />} />
                <DashboardCard title="Encomendas Ativas" value={activeOrders.toString()} icon={<IconeListaEncomendas className="w-8 h-8 text-fruitflowGreen" />} />
                <DashboardCard title="Paletes em Progresso" value={palletsInProgress.toString()} icon={<IconeMacaPalete className="w-8 h-8 text-orange-500" />} />
                <DashboardCard title="Peso Processado" value={`${totalProcessedWeight.toFixed(0)} kg`} icon={<IconeBalanca className="w-8 h-8 text-teal-500" />} />
            </div>

            {/* Resumo do Estado da Palete e Linha de Tickets (Agora lado a lado) */}
            <div className="mt-6 md:mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Resumo do Estado das Paletes</h3>
                    <PalletStatusSummary pallets={filteredPallets} />
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Tickets: Histórico de Pesagem</h3>
                    <PalletWeightHistory pallets={filteredPallets.slice(0, 5)} /> {/* Displaying first 5 as example */}
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Tickets: Detalhes de Palots</h3>
                    <PalletDetails pallets={filteredPallets.slice(0, 5)} /> {/* Displaying first 5 as example */}
                </div>
            </div>

            {/* Linha da Tabela de Encomendas Recentes */}
            <div className="mt-6 md:mt-8 bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Encomendas Recentes</h3>
                <RecentOrdersTable orders={filteredOrders.slice(0, 5)} />
            </div>
        </>
    );
});

export default DashboardContent;