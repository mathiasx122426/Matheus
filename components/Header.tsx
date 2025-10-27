import React from 'react';

interface HeaderProps {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    searchTerm: string;
    onSearchChange: (term: string) => void;
}

const Header: React.FC<HeaderProps> = React.memo(({ isDarkMode, toggleDarkMode, searchTerm, onSearchChange }) => {
    return (
        <header className="bg-white dark:bg-gray-800 shadow-sm p-4 flex justify-between items-center z-10 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Painel de Controle</h1>
            <div className="flex-1 max-w-lg mx-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Pesquisar encomendas, clientes..."
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-1 focus:ring-fruitflowGreen text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                {/* Dark Mode Toggle */}
                <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-fruitflowGreen transition-colors duration-200"
                    aria-label={isDarkMode ? 'Ativar Modo Claro' : 'Ativar Modo Escuro'}
                >
                    {isDarkMode ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h1M3 12H2m15.325-4.757l-.707-.707M6.343 17.657l-.707.707M16.95 18.364l.707-.707M7.05 6.343l-.707-.707M12 18a6 6 0 110-12 6 6 0 010 12z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                    )}
                </button>
            </div>
        </header>
    );
});

export default Header;