import { Customer, Order, Pallet } from '../types';

// ##############################################################################
// ATENÇÃO: ESTE É O ARQUIVO DE SERVIÇO DE API DO FRONTEND.
// SUAS CREDENCIAIS PHC (PHC_DB, PHC_SERVER, PHC_UID, PHC_PWD)
// NUNCA DEVEM SER INSERIDAS DIRETAMENTE AQUI OU EM QUALQUER PARTE DO FRONTEND.
// ISSO REPRESENTA UMA GRANDE VULNERABILIDADE DE SEGURANÇA.
// ##############################################################################

// A API_BASE_URL deve apontar para o SEU SERVIDOR DE BACKEND,
// que será o responsável por se conectar de forma segura ao PHC/banco de dados.
//
// Exemplo:
// - Se o seu backend estiver rodando localmente na porta 5000: 'http://localhost:5000'
// - Se o seu backend estiver implantado em um domínio: 'https://api.seubackend.com'
//
const API_BASE_URL = 'http://localhost:5000'; // <--- ATUALIZADO AQUI!

const handleResponse = async <T>(response: Response, dataType: string): Promise<T> => {
  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Erro ao buscar ${dataType} da API: HTTP ${response.status} - ${errorText}`);
    throw new Error(`Erro HTTP! status: ${response.status} ao buscar ${dataType}. Detalhes: ${errorText.substring(0, 100)}`);
  }
  return response.json() as Promise<T>;
};

export const fetchCustomers = async (): Promise<Customer[]> => {
  console.log(`Tentando buscar clientes da API em: ${API_BASE_URL}/api/clientes`);
  const response = await fetch(`${API_BASE_URL}/api/clientes`);
  return handleResponse<Customer[]>(response, 'clientes');
};

export const fetchOrders = async (): Promise<Order[]> => {
  console.log(`Tentando buscar encomendas da API em: ${API_BASE_URL}/api/encomendas`);
  const response = await fetch(`${API_BASE_URL}/api/encomendas`);
  return handleResponse<Order[]>(response, 'encomendas');
};

export const fetchPallets = async (): Promise<Pallet[]> => {
  console.log(`Tentando buscar paletes da API em: ${API_BASE_URL}/api/paletes`);
  const response = await fetch(`${API_BASE_URL}/api/paletes`);
  return handleResponse<Pallet[]>(response, 'paletes');
};