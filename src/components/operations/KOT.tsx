import React, { useState, useEffect } from 'react';
import { Printer, Clock, CheckCircle, AlertCircle } from 'lucide-react';

// Interfaces for TypeScript
interface OrderItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
    specialRequest?: string;
    status: 'pending' | 'in-progress' | 'ready';
}

interface KOT {
    id: string;
    tableNumber: string;
    items: OrderItem[];
    timestamp: string;
    orderType: 'dine-in' | 'takeaway' | 'delivery';
    total: number;
}

// Mock initial data (simulating orders like PetPooja)
const initialOrders: KOT[] = [
    {
        id: 'kot1',
        tableNumber: 'G1',
        items: [
            { id: 'item1', name: 'Margherita Pizza', quantity: 2, price: 9.99, status: 'pending', specialRequest: 'Extra cheese' },
            { id: 'item2', name: 'Coke', quantity: 3, price: 2.50, status: 'pending' },
        ],
        timestamp: new Date().toLocaleString(),
        orderType: 'dine-in',
        total: 27.48,
    },
    {
        id: 'kot2',
        tableNumber: 'B3',
        items: [
            { id: 'item3', name: 'Chicken Tikka', quantity: 1, price: 12.99, status: 'pending' },
        ],
        timestamp: new Date().toLocaleString(),
        orderType: 'takeaway',
        total: 12.99,
    },
];

const KOT: React.FC = () => {
    const [orders, setOrders] = useState<KOT[]>(initialOrders);

    // Simulate real-time order updates (like PetPooja KDS)
    useEffect(() => {
        const interval = setInterval(() => {
            setOrders(prevOrders =>
                prevOrders.map(order => ({
                    ...order,
                    timestamp: new Date().toLocaleString(), // Update timestamp
                }))
            );
        }, 60000); // Update every minute
        return () => clearInterval(interval);
    }, []);

    // Mark item status (e.g., "Ready" button like PetPooja)
    const handleStatusChange = (kotId: string, itemId: string, newStatus: OrderItem['status']) => {
        setOrders(prevOrders =>
            prevOrders.map(order =>
                order.id === kotId
                    ? {
                        ...order,
                        items: order.items.map(item =>
                            item.id === itemId ? { ...item, status: newStatus } : item
                        ),
                    }
                    : order
            )
        );
    };

    // Print KOT (simplified, console.log for demo)
    const handlePrintKOT = (kot: KOT) => {
        console.log('Printing KOT:', {
            Table: kot.tableNumber,
            Items: kot.items.map(item => ({
                Name: item.name,
                Quantity: item.quantity,
                SpecialRequest: item.specialRequest || 'None',
                Status: item.status,
            })),
            Total: `$${kot.total.toFixed(2)}`,
            Timestamp: kot.timestamp,
            OrderType: kot.orderType,
        });
        // In a real app, integrate with a printer API or library
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Header */}
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Kitchen Order Ticket (KOT) System</h1>

            {/* Legends (PetPooja-like status indicators) */}
            <div className="mb-6 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <span className="w-4 h-4 bg-yellow-300 border-2 border-yellow-500 rounded-full" />
                    <span>Pending</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-4 h-4 bg-blue-300 border-2 border-blue-500 rounded-full" />
                    <span>In Progress</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-4 h-4 bg-green-300 border-2 border-green-500 rounded-full" />
                    <span>Ready</span>
                </div>
            </div>

            {/* KOT Cards (Card-wise layout like PetPooja) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.map(kot => (
                    <div
                        key={kot.id}
                        className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex flex-col"
                    >
                        {/* KOT Header */}
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="text-lg font-semibold text-gray-800">Table {kot.tableNumber}</h2>
                            <button
                                onClick={() => handlePrintKOT(kot)}
                                className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
                                title="Print KOT"
                            >
                                <Printer className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Order Details */}
                        <div className="text-sm text-gray-600 mb-2">
                            <p><Clock className="inline h-4 w-4 mr-1" /> {kot.timestamp}</p>
                            <p>Type: {kot.orderType}</p>
                        </div>

                        {/* Items List */}
                        <div className="flex-1 overflow-y-auto max-h-64">
                            {kot.items.map(item => (
                                <div
                                    key={item.id}
                                    className={`p-3 mb-2 rounded-md ${item.status === 'pending'
                                            ? 'bg-yellow-50 border-yellow-200'
                                            : item.status === 'in-progress'
                                                ? 'bg-blue-50 border-blue-200'
                                                : 'bg-green-50 border-green-200'
                                        } border`}
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-medium text-gray-800">{item.name}</p>
                                            <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                                            {item.specialRequest && (
                                                <p className="text-xs text-gray-500 italic">Note: {item.specialRequest}</p>
                                            )}
                                        </div>
                                        <div className="flex gap-2">
                                            {item.status === 'pending' && (
                                                <button
                                                    onClick={() => handleStatusChange(kot.id, item.id, 'in-progress')}
                                                    className="text-blue-500 hover:text-blue-700 text-xs"
                                                >
                                                    Start
                                                </button>
                                            )}
                                            {item.status === 'in-progress' && (
                                                <button
                                                    onClick={() => handleStatusChange(kot.id, item.id, 'ready')}
                                                    className="text-green-500 hover:text-green-700 text-xs"
                                                >
                                                    Ready
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Total */}
                        <div className="mt-3 border-t pt-2 text-right">
                            <p className="text-lg font-semibold text-gray-800">Total: ${kot.total.toFixed(2)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default KOT;