import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Reativado o import do App

// Definir a interface para as props do ErrorBoundary
interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  // FIX: Declare 'state' as a class property with its type and initialize it.
  public state: ErrorBoundaryState = { hasError: false, error: null, errorInfo: null };

  constructor(props: ErrorBoundaryProps) {
    super(props);
    // FIX: Remove 'this.state' initialization from constructor as it's now a class property.
    // The commented out line below is removed for cleanliness, as state is initialized as a class property.
    // this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Atualiza o estado para que a próxima renderização mostre a UI de fallback.
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Você também pode registar o erro num serviço de relatório de erros
    console.error("ErrorBoundary apanhou um erro:", error, errorInfo);
    // FIX: 'setState' is now correctly inferred as a method of React.Component.
    this.setState({ errorInfo });
  }

  render() {
    console.log("ErrorBoundary: renderizando.");
    // FIX: 'this.state' is now correctly inferred.
    if (this.state.hasError) {
      // Você pode renderizar qualquer UI de fallback personalizada
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-red-900 text-white p-4">
          <h1 className="text-4xl font-bold mb-4">Ocorreu um erro inesperado.</h1>
          <p className="text-lg mb-2">Lamentamos o transtorno.</p>
          <details className="whitespace-pre-wrap text-sm text-red-200 mt-4 p-4 bg-red-800 rounded-lg max-w-lg overflow-auto">
            <summary className="cursor-pointer text-red-100 mb-2">Detalhes do Erro</summary>
            {/* FIX: 'this.state' is now correctly inferred. */}
            {this.state.error && this.state.error.toString()}
            <br />
            {/* FIX: 'this.state' is now correctly inferred. */}
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition-colors"
          >
            Recarregar a Página
          </button>
        </div>
      );
    }
    console.log("ErrorBoundary: renderizando children.");
    // FIX: 'this.props' is now correctly inferred.
    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    {/* FIX: The usage of ErrorBoundary with children should now be correctly typed */}
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);