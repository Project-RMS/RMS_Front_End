// ConsumptionClosingStock.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Types
interface StockItem {
    id: number;
    isFavorite: boolean;
    rawMaterial: string;
    existingStock: number;
    currentStock: number;
    comment: string;
}

const ConsumptionClosingStock: React.FC = () => {
    // State management
    const [rawMaterial, setRawMaterial] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [closingStockType, setClosingStockType] = useState<'daily' | 'weekly' | 'monthly'>('daily');
    const [stockData, setStockData] = useState<StockItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Sample data for dropdowns
    const rawMaterials = ['Sugar', 'Flour', 'Salt', 'Oil'];
    const categories = ['Ingredients', 'Packaging', 'Spices'];
    const importOptions = ['Import CSV', 'Import Excel', 'Manual Entry'];

    // Handle load data
    const loadStockData = async () => {
        setIsLoading(true);
        // Simulated API call
        const mockData: StockItem[] = [
            {
                id: 1,
                isFavorite: false,
                rawMaterial: 'Sugar',
                existingStock: 100,
                currentStock: 85,
                comment: 'Regular usage'
            },
            {
                id: 2,
                isFavorite: true,
                rawMaterial: 'Flour',
                existingStock: 150,
                currentStock: 120,
                comment: 'Bulk order'
            }
        ];
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStockData(mockData);
        setIsLoading(false);
    };

    // Toggle favorite status
    const toggleFavorite = (id: number) => {
        setStockData(prevData =>
            prevData.map(item =>
                item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
            )
        );
    };

    // Handle comment change
    const updateComment = (id: number, newComment: string) => {
        setStockData(prevData =>
            prevData.map(item =>
                item.id === id ? { ...item, comment: newComment } : item
            )
        );
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Consumption Closing Stock
                    </h1>
                    <div className="flex gap-4">
                        <Link
                            to="/consumtion/closing-stock/add"
                            className="inline-flex items-center px-6 py-2.5 rounded-lg bg-green-600 text-white font-medium 
                hover:bg-green-700 transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add Closing Stock
                        </Link>
                        <select
                            className="px-4 py-2.5 rounded-lg bg-indigo-600 text-white font-medium 
                focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-indigo-700 
                transition-all duration-200 shadow-md"
                        >
                            {importOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Filter Section */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8 animate-in fade-in duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                        {/* Raw Material */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Raw Material</label>
                            <select
                                value={rawMaterial}
                                onChange={(e) => setRawMaterial(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 
                  focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                            >
                                <option value="">Select Material</option>
                                {rawMaterials.map(material => (
                                    <option key={material} value={material}>{material}</option>
                                ))}
                            </select>
                        </div>

                        {/* Category */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 
                  focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                            >
                                <option value="">Select Category</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        {/* Date */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Date</label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 
                  focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                            />
                        </div>

                        {/* Closing Stock Type */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Closing Stock</label>
                            <select
                                value={closingStockType}
                                onChange={(e) => setClosingStockType(e.target.value as 'daily' | 'weekly' | 'monthly')}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 
                  focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                            >
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                            </select>
                        </div>

                        {/* Load Button */}
                        <div className="flex items-end">
                            <button
                                onClick={loadStockData}
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
                                        Loading...
                                    </span>
                                ) : (
                                    'Load'
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                {stockData.length > 0 && (
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-in slide-in-from-bottom-10 duration-500">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-indigo-50 text-indigo-900">
                                        <th className="p-4 text-left font-semibold w-16">Favorite</th>
                                        <th className="p-4 text-left font-semibold">Raw Material</th>
                                        <th className="p-4 text-right font-semibold">Existing Stock</th>
                                        <th className="p-4 text-right font-semibold">Current Stock</th>
                                        <th className="p-4 text-left font-semibold">Comment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stockData.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="border-t border-gray-100 hover:bg-indigo-50 transition-colors duration-150"
                                        >
                                            <td className="p-4">
                                                <button
                                                    onClick={() => toggleFavorite(item.id)}
                                                    className="focus:outline-none"
                                                >
                                                    <svg
                                                        className={`w-5 h-5 ${item.isFavorite ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                </button>
                                            </td>
                                            <td className="p-4">{item.rawMaterial}</td>
                                            <td className="p-4 text-right">{item.existingStock.toLocaleString()}</td>
                                            <td className="p-4 text-right font-medium">{item.currentStock.toLocaleString()}</td>
                                            <td className="p-4">
                                                <input
                                                    type="text"
                                                    value={item.comment}
                                                    onChange={(e) => updateComment(item.id, e.target.value)}
                                                    className="w-full px-2 py-1 rounded border border-gray-300 focus:ring-2 
                            focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {stockData.length === 0 && !isLoading && (
                    <div className="text-center py-12 animate-in fade-in duration-500">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No stock data found</h3>
                        <p className="mt-1 text-sm text-gray-500">Start by loading stock information</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConsumptionClosingStock;