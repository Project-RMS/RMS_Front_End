// ConsumptionExpire.tsx
import React, { useState } from 'react';
import { saveAs } from 'file-saver';

// Types
interface ConsumptionItem {
    id: number;
    rawMaterial: string;
    unit: string;
    invoiceDate: string;
    invoiceNumber: string;
    actualQuantity: number;
    price: number;
    amount: number;
}

const ConsumptionExpire: React.FC = () => {
    // State management
    const [searchType, setSearchType] = useState<'expired' | 'aboutToExpire'>('expired');
    const [days, setDays] = useState<30 | 60 | 90>(30);
    const [consumptionData, setConsumptionData] = useState<ConsumptionItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch data (mock API)
    const fetchConsumptionData = async () => {
        setIsLoading(true);
        const mockData: ConsumptionItem[] = [
            {
                id: 1,
                rawMaterial: 'Sugar',
                unit: 'kg',
                invoiceDate: '2024-12-01',
                invoiceNumber: 'INV001',
                actualQuantity: 100,
                price: 2.5,
                amount: 250
            },
            {
                id: 2,
                rawMaterial: 'Flour',
                unit: 'kg',
                invoiceDate: '2025-01-15',
                invoiceNumber: 'INV002',
                actualQuantity: 150,
                price: 1.8,
                amount: 270
            }
        ];
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate loading
        setConsumptionData(mockData);
        setIsLoading(false);
    };

    // Export to CSV
    const exportToCSV = () => {
        const headers = ['Raw Material,Unit,Invoice Date,Invoice Number,Quantity,Price,Amount'];
        const rows = consumptionData.map(item =>
            `${item.rawMaterial},${item.unit},${item.invoiceDate},${item.invoiceNumber},${item.actualQuantity},${item.price},${item.amount}`
        );
        const csvContent = headers.concat(rows).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'consumption_data.csv');
    };

    // Calculate total
    const totalAmount = consumptionData.reduce((sum, item) => sum + item.amount, 0);

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Consumption Expire
                    </h1>
                    <button
                        onClick={exportToCSV}
                        disabled={consumptionData.length === 0}
                        className="group relative inline-flex items-center px-6 py-2.5 rounded-lg bg-indigo-600 text-white font-medium 
              hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 
              shadow-md hover:shadow-lg"
                    >
                        <span className="mr-2">Export CSV</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                    </button>
                </div>

                {/* Controls Section */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8 animate-in fade-in duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Type Selection */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-gray-700">Filter Type</h3>
                            <div className="flex gap-4">
                                {['expired', 'aboutToExpire'].map((type) => (
                                    <label key={type} className="flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            name="type"
                                            value={type}
                                            checked={searchType === type}
                                            onChange={() => setSearchType(type as 'expired' | 'aboutToExpire')}
                                            className="hidden peer"
                                        />
                                        <span className="w-5 h-5 mr-2 rounded-full border-2 border-gray-300 peer-checked:border-indigo-600 
                      peer-checked:bg-indigo-600 transition-all duration-200 flex-shrink-0"/>
                                        <span className="text-gray-700 capitalize">{type.replace(/([A-Z])/g, ' $1').trim()}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Days Selection */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-gray-700">Time Period</h3>
                            <div className="flex gap-4">
                                {[30, 60, 90].map((day) => (
                                    <label key={day} className="flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            name="days"
                                            value={day}
                                            checked={days === day}
                                            onChange={() => setDays(day as 30 | 60 | 90)}
                                            className="hidden peer"
                                        />
                                        <span className="w-5 h-5 mr-2 rounded-full border-2 border-gray-300 peer-checked:border-indigo-600 
                      peer-checked:bg-indigo-600 transition-all duration-200 flex-shrink-0"/>
                                        <span className="text-gray-700">{day} Days</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Search Button */}
                        <div className="flex items-end">
                            <button
                                onClick={fetchConsumptionData}
                                disabled={isLoading}
                                className="w-full py-2.5 px-6 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-700 
                  text-white font-medium hover:from-indigo-700 hover:to-indigo-800 disabled:opacity-50 
                  transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center"
                            >
                                {isLoading ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Searching...
                                    </span>
                                ) : (
                                    'Search'
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Results Section */}
                {consumptionData.length > 0 && (
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-in slide-in-from-bottom-10 duration-500">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-indigo-50 text-indigo-900">
                                        {['Raw Material', 'Unit', 'Invoice Date', 'Invoice Number', 'Quantity', 'Price', 'Amount'].map((header) => (
                                            <th key={header} className="p-4 text-left font-semibold">
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {consumptionData.map((item, index) => (
                                        <tr
                                            key={item.id}
                                            className="border-t border-gray-100 hover:bg-indigo-50 transition-colors duration-150"
                                        >
                                            <td className="p-4">{item.rawMaterial}</td>
                                            <td className="p-4">{item.unit}</td>
                                            <td className="p-4">{item.invoiceDate}</td>
                                            <td className="p-4">{item.invoiceNumber}</td>
                                            <td className="p-4 text-right">{item.actualQuantity.toLocaleString()}</td>
                                            <td className="p-4 text-right">${item.price.toFixed(2)}</td>
                                            <td className="p-4 text-right font-medium">${item.amount.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr className="bg-indigo-100 text-indigo-900 font-semibold">
                                        <td colSpan={6} className="p-4 text-right">Total Amount:</td>
                                        <td className="p-4 text-right">${totalAmount.toFixed(2)}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {consumptionData.length === 0 && !isLoading && (
                    <div className="text-center py-12 animate-in fade-in duration-500">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No results found</h3>
                        <p className="mt-1 text-sm text-gray-500">Start by searching for consumption data</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConsumptionExpire;