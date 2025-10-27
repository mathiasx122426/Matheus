import React from 'react';

// Define props interface for SidebarIcon
interface SidebarIconProps {
    children: React.ReactNode;
}

// Explicitly type SidebarIcon as a React Functional Component
const SidebarIcon: React.FC<SidebarIconProps> = ({ children }) => (
    <div className="w-6 h-6 flex items-center justify-center">{children}</div>
);

interface SidebarProps {
    activeTab: 'Dashboard' | 'Encomendas' | 'Clientes' | 'Paletes';
    onTabChange: (tab: 'Dashboard' | 'Encomendas' | 'Clientes' | 'Paletes') => void;
}

const Sidebar: React.FC<SidebarProps> = React.memo(({ activeTab, onTabChange }) => {
    return (
        <aside className="hidden md:flex flex-col w-64 bg-gray-800 text-gray-200 shadow-lg py-4">
            <div className="flex items-center justify-center h-16 mb-6">
                {/* New FruitFlow Logo Icon (stylized apple) */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-fruitflowGreen" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C9.8 2 8 3.8 8 6c0 1.5.7 2.8 1.8 3.7C8.2 10.7 7 12.3 7 14c0 2.8 2.2 5 5 5s5-2.2 5-5c0-1.7-1.2-3.3-2.8-4.3C15.3 8.8 16 7.5 16 6c0-2.2-1.8-4-4-4zm-1 0a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0V2z"/>
                </svg>
                <span className="ml-2 text-xl font-bold text-white">FruitFlow</span>
            </div>
            <nav className="flex-1 px-4 space-y-2">
                <div
                    onClick={() => onTabChange('Dashboard')}
                    role="button" // Added for accessibility
                    aria-current={activeTab === 'Dashboard' ? 'page' : undefined} // Added for accessibility
                    className={`flex items-center px-4 py-2 rounded-lg cursor-pointer transition-colors ${activeTab === 'Dashboard' ? 'bg-fruitflowGreen text-white' : 'text-gray-300 hover:text-white hover:bg-gray-700'}`}
                >
                    <SidebarIcon>
                        {/* New fruit-themed icon (grapes, pear, apple) */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 17a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2z"/>
                            <path d="M15.5 10.5C15.5 12.5 17 14 19 14S22.5 12.5 22.5 10.5 21 7 19 7 15.5 8.5 15.5 10.5z"/>
                            <path d="M8.5 10.5C8.5 12.5 10 14 12 14S15.5 12.5 15.5 10.5 14 7 12 7 8.5 8.5 8.5 10.5z"/>
                            <path d="M4 14C4 16 5.5 17.5 7.5 17.5S11 16 11 14 9.5 10.5 7.5 10.5 4 12 4 14z"/>
                            <path d="M12 7a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h3z"/>
                        </svg>
                    </SidebarIcon>
                    <span className="ml-3">Dashboard</span>
                </div>
                <div
                    onClick={() => onTabChange('Encomendas')}
                    role="button" // Added for accessibility
                    aria-current={activeTab === 'Encomendas' ? 'page' : undefined} // Added for accessibility
                    className={`flex items-center px-4 py-2 rounded-lg cursor-pointer transition-colors ${activeTab === 'Encomendas' ? 'bg-fruitflowGreen text-white' : 'text-gray-300 hover:text-white hover:bg-gray-700'}`}
                >
                    <SidebarIcon>
                        {/* Fruit-themed list/document icon for Encomendas */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            {/* Simple document/list outline */}
                            <rect x="5" y="3" width="14" height="18" rx="2" ry="2"/>
                            {/* Fruit-like bullet points */}
                            <circle cx="9" cy="8" r="1.5" fill="currentColor" stroke="none"/>
                            <line x1="12" y1="8" x2="16" y2="8"/>
                            <circle cx="9" cy="13" r="1.5" fill="currentColor" stroke="none"/>
                            <line x1="12" y1="13" x2="16" y2="13"/>
                            <circle cx="9" cy="18" r="1.5" fill="currentColor" stroke="none"/>
                            <line x1="12" y1="18" x2="16" y2="18"/>
                        </svg>
                    </SidebarIcon>
                    <span className="ml-3">Encomendas</span>
                </div>
                <div
                    onClick={() => onTabChange('Clientes')}
                    role="button" // Added for accessibility
                    aria-current={activeTab === 'Clientes' ? 'page' : undefined} // Added for accessibility
                    className={`flex items-center px-4 py-2 rounded-lg cursor-pointer transition-colors ${activeTab === 'Clientes' ? 'bg-fruitflowGreen text-white' : 'text-gray-300 hover:text-white hover:bg-gray-700'}`}
                >
                     <SidebarIcon>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H2v-2a4 4 0 014-4h2a4 4 0 014 4v2m-1-9a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
                    </SidebarIcon>
                    <span className="ml-3">Clientes</span>
                </div>
                <div
                    onClick={() => onTabChange('Paletes')}
                    role="button" // Added for accessibility
                    aria-current={activeTab === 'Paletes' ? 'page' : undefined} // Added for accessibility
                    className={`flex items-center px-4 py-2 rounded-lg cursor-pointer transition-colors ${activeTab === 'Paletes' ? 'bg-fruitflowGreen text-white' : 'text-gray-300 hover:text-white hover:bg-gray-700'}`}
                >
                     <SidebarIcon>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/></svg>
                    </SidebarIcon>
                    <span className="ml-3">Paletes</span>
                </div>
            </nav>
        </aside>
    );
});

export default Sidebar;