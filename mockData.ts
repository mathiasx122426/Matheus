import { Customer, Order, Pallet, OrderStatus, PalletStatus } from './types';

export const customers: Customer[] = [
  { id: 'CUST001', name: 'Distribuidora Fresca', registrationDate: '01/01/2023', lastDestination: 'Lisboa' },
  { id: 'CUST002', name: 'Mercado Central', registrationDate: '15/03/2022', lastDestination: 'Porto' },
  { id: 'CUST003', name: 'HortiFresco S.A.', registrationDate: '20/07/2023', lastDestination: 'Faro' },
  { id: 'CUST004', name: 'VitaFruta', registrationDate: '10/09/2021', lastDestination: 'Coimbra' },
  { id: 'CUST005', name: 'AgroImport', registrationDate: '05/02/2024', lastDestination: 'Braga' },
];

export const orders: Order[] = [
  { 
    id: 'E3173', customer: customers[0], orderDate: '20/10/2025', status: OrderStatus.Entregue, itemCount: 150,
    boxCount: 27, fruitWeightPerBoxKg: 1.56, grossWeightPerBoxKg: 2.06, pricePerBoxEuro: 61.75
  },
  { 
    id: 'E3075', customer: customers[1], orderDate: '02/10/2025', status: OrderStatus.Pendente, itemCount: 200,
    boxCount: 50, fruitWeightPerBoxKg: 1.33, grossWeightPerBoxKg: 1.83, pricePerBoxEuro: 25.43
  },
  { 
    id: 'E3180', customer: customers[2], orderDate: '22/10/2025', status: OrderStatus.Enviado, itemCount: 50,
    boxCount: 30, fruitWeightPerBoxKg: 1.80, grossWeightPerBoxKg: 2.30, pricePerBoxEuro: 75.00
  },
  { 
    id: 'E3181', customer: customers[3], orderDate: '23/10/2025', status: OrderStatus.Processando, itemCount: 300,
    boxCount: 45, fruitWeightPerBoxKg: 1.20, grossWeightPerBoxKg: 1.70, pricePerBoxEuro: 50.20
  },
  { 
    id: 'E3182', customer: customers[4], orderDate: '24/10/2025', status: OrderStatus.Entregue, itemCount: 120,
    boxCount: 20, fruitWeightPerBoxKg: 2.10, grossWeightPerBoxKg: 2.60, pricePerBoxEuro: 88.50
  },
  { 
    id: 'E3183', customer: customers[0], orderDate: '25/10/2025', status: OrderStatus.Enviado, itemCount: 80,
    boxCount: 15, fruitWeightPerBoxKg: 0.90, grossWeightPerBoxKg: 1.40, pricePerBoxEuro: 30.00
  },
  { 
    id: 'E3184', customer: customers[1], orderDate: '26/10/2025', status: OrderStatus.Processando, itemCount: 250,
    boxCount: 60, fruitWeightPerBoxKg: 1.65, grossWeightPerBoxKg: 2.15, pricePerBoxEuro: 68.90
  },
  { 
    id: 'E3185', customer: customers[2], orderDate: '27/10/2025', status: OrderStatus.Pendente, itemCount: 100,
    boxCount: 35, fruitWeightPerBoxKg: 1.45, grossWeightPerBoxKg: 1.95, pricePerBoxEuro: 42.10
  },
  { 
    id: 'E3186', customer: customers[3], orderDate: '28/10/2025', status: OrderStatus.Entregue, itemCount: 180,
    boxCount: 40, fruitWeightPerBoxKg: 1.70, grossWeightPerBoxKg: 2.20, pricePerBoxEuro: 72.30
  },
  { 
    id: 'E3187', customer: customers[4], orderDate: '29/10/2025', status: OrderStatus.Enviado, itemCount: 90,
    boxCount: 25, fruitWeightPerBoxKg: 1.10, grossWeightPerBoxKg: 1.60, pricePerBoxEuro: 35.50
  },
];

const generatePallet = (id: string, orderId: string, status: PalletStatus): Pallet => {
    const order = orders.find(o => o.id === orderId);
    const clientName = order ? order.customer.name : 'Cliente Desconhecido';
    const boxCount = Math.floor(Math.random() * 50) + 10;
    const boxTareWeightKg = 0.5;
    const itemsWeightKg = Math.floor(Math.random() * 800) + 100;
    const totalWeightKg = (boxCount * boxTareWeightKg) + itemsWeightKg;
    return {
        id,
        orderId,
        clientName,
        status,
        boxCount,
        boxTareWeightKg,
        itemsWeightKg,
        totalWeightKg: totalWeightKg, // Keep as number, format on display
    };
};

export const pallets: Pallet[] = [
    generatePallet('P2054', 'E3183', PalletStatus.Concluído), // Matched a random order for client name
    generatePallet('P2123', 'E3184', PalletStatus.EmProgresso),
    generatePallet('P2092', 'E3181', PalletStatus.Concluído),
    generatePallet('P2014', 'E3182', PalletStatus.Concluído),
    generatePallet('P2162', 'E3075', PalletStatus.EmProgresso),
    generatePallet('P2013', 'E3185', PalletStatus.EmProgresso),
    generatePallet('P2036', 'E3180', PalletStatus.Concluído),
    generatePallet('P2156', 'E3173', PalletStatus.Agendado),
    generatePallet('P2101', 'E3187', PalletStatus.EmProgresso),
    generatePallet('P2102', 'E3186', PalletStatus.Agendado),
    generatePallet('P2103', 'E3184', PalletStatus.Concluído),
    generatePallet('P2104', 'E3183', PalletStatus.EmProgresso),
    generatePallet('P2105', 'E3181', PalletStatus.Agendado),
    generatePallet('P2106', 'E3180', PalletStatus.Concluído),
    generatePallet('P2107', 'E3075', PalletStatus.EmProgresso),
    generatePallet('P2108', 'E3173', PalletStatus.Concluído),
    generatePallet('P2109', 'E3182', PalletStatus.Agendado),
    generatePallet('P2110', 'E3187', PalletStatus.EmProgresso),
    generatePallet('P2111', 'E3186', PalletStatus.Concluído),
    generatePallet('P2112', 'E3185', PalletStatus.EmProgresso),
    generatePallet('P2113', 'E3184', PalletStatus.Agendado),
    generatePallet('P2114', 'E3183', PalletStatus.Concluído),
    generatePallet('P2115', 'E3181', PalletStatus.EmProgresso),
    generatePallet('P2116', 'E3180', PalletStatus.Agendado),
    generatePallet('P2117', 'E3075', PalletStatus.Concluído),
    generatePallet('P2118', 'E3173', PalletStatus.EmProgresso),
    generatePallet('P2119', 'E3182', PalletStatus.Concluído),
    generatePallet('P2120', 'E3187', PalletStatus.Agendado),
    generatePallet('P2121', 'E3186', PalletStatus.EmProgresso),
    generatePallet('P2122', 'E3185', PalletStatus.Concluído),
];