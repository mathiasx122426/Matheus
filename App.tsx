import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import DashboardContent from './components/DashboardContent';
import OrdersPage from './components/OrdersPage';
import ClientsPage from './components/ClientsPage';
import PalletsPage from './components/PalletsPage';
import { Customer, Order, Pallet } from './types';
import { fetchCustomers, fetchOrders, fetchPallets } from './services/apiService';
import { customers as mockCustomers, orders as mockOrders, pallets as mockPallets } from './mockData';

const POLLING_INTERVAL = 15000; // 15 segundos

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'Dashboard' | 'Encomendas' | 'Clientes' | 'Paletes'>('Dashboard');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                return savedTheme === 'dark';
            }
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false;
    });

    // State for fetched data
    const [fetchedOrders, setFetchedOrders] = useState<Order[]>([]);
    const [fetchedCustomers, setFetchedCustomers] = useState<Customer[]>([]);
    const [fetchedPallets, setFetchedPallets] = useState<Pallet[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            setError(null);
            try {
                // ATENÇÃO: Para usar dados reais, DESCOMENTE A SEÇÃO ABAIXO
                // e COMENTE a seção de dados simulados que segue.
                // Certifique-se de que o seu backend está a correr em http://localhost:5000
                // para que as chamadas à API funcionem.

                // const [ordersData, customersData, palletsData] = await Promise.all([
                //     fetchOrders(),
                //     fetchCustomers(),
                //     fetchPallets(),
                // ]);
                // setFetchedOrders(ordersData);
                // setFetchedCustomers(customersData);
                // setFetchedPallets(palletsData);

                // // ##############################################
                // // USANDO DADOS SIMULADOS PARA DIAGNÓSTICO E DESENVOLVIMENTO.
                // // REMOVA OU COMENTE ISTO PARA USAR A API REAL.
                setFetchedOrders(mockOrders);
                setFetchedCustomers(mockCustomers);
                setFetchedPallets(mockPallets);
                // // ##############################################

            } catch (err) {
                console.error("App component: Erro ao carregar dados:", err);
                setError("Não foi possível carregar os dados. Tente novamente mais tarde.");
            } finally {
                setLoading(false);
            }
        };

        // Carrega os dados imediatamente na montagem do componente
        loadData();

        // Configura o polling para carregar dados a cada POLLING_INTERVAL
        const intervalId = setInterval(loadData, POLLING_INTERVAL);

        // Função de limpeza: limpa o intervalo quando o componente é desmontado
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array means this runs once on mount and sets up polling

    const toggleDarkMode = useCallback(() => {
        setIsDarkMode(prevMode => !prevMode);
    }, []);

    const handleSearchChange = useCallback((term: string) => {
        setSearchTerm(term);
    }, []);

    const renderContent = () => {
        if (loading) {
            return (
                <div className="flex items-center justify-center h-full text-gray-700 dark:text-gray-300">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-fruitflowGreen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Carregando dados...
                </div>
            );
        }

        if (error) {
            return (
                <div className="text-center text-red-600 dark:text-red-400 p-4">
                    {error}
                </div>
            );
        }

        switch (activeTab) {
            case 'Dashboard':
                return <DashboardContent orders={fetchedOrders} customers={fetchedCustomers} pallets={fetchedPallets} searchTerm={searchTerm} />;
            case 'Encomendas':
                return <OrdersPage orders={fetchedOrders} searchTerm={searchTerm} />;
            case 'Clientes':
                return <ClientsPage customers={fetchedCustomers} searchTerm={searchTerm} />;
            case 'Paletes':
                return <PalletsPage pallets={fetchedPallets} orders={fetchedOrders} searchTerm={searchTerm} />;
            default:
                return <DashboardContent orders={fetchedOrders} customers={fetchedCustomers} pallets={fetchedPallets} searchTerm={searchTerm} />;
        }
    };

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900 font-sans">
            <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} searchTerm={searchTerm} onSearchChange={handleSearchChange} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-4 md:p-6 lg:p-8">
                    <div className="container mx-auto max-w-7xl">
                        {renderContent()}
                    </div>
                </main>
            </div>
        </div>
    );
};
export default App;