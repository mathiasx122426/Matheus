export enum OrderStatus {
  Pendente = 'Pendente',
  Processando = 'Processando',
  Enviado = 'Enviado',
  Entregue = 'Entregue',
  Cancelado = 'Cancelado',
}

export enum PalletStatus {
  Agendado = 'Agendado',
  EmProgresso = 'Em Progresso',
  Concluído = 'Concluído',
}

export interface Customer {
  id: string;
  name: string;
  registrationDate: string; // Data de Registo
  lastDestination: string;   // Último Destino
}

export interface Order {
  id: string;
  customer: Customer;
  orderDate: string;
  status: OrderStatus;
  itemCount: number;
  // Novos campos para a tabela de pedidos detalhada
  boxCount: number;
  fruitWeightPerBoxKg: number;
  grossWeightPerBoxKg: number;
  pricePerBoxEuro: number;
}

export interface Pallet {
  id: string;
  orderId: string;
  clientName: string; // Adicionado para fácil exibição do cliente nos tickets de paletes
  status: PalletStatus;
  boxCount: number;
  boxTareWeightKg: number;
  itemsWeightKg: number;
  totalWeightKg: number;
}