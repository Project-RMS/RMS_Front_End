// AddWastage.tsx
import React, { useState } from 'react';

interface WastageItem {
    id: number;
    rawMaterial: boolean;
    qty: number;
    unit: string;
    avgPurchasePrice: number;
    amount: number;
    description: string;
}

const AddWastage: React.FC = () => {
    // Form state
    const [wastageFor, setWastageFor] = useState<'raw_material' | 'item'>('raw_material');
    const [date, setDate] = useState<string>('');
    const [items, setItems] = useState<WastageItem[]>([
        {
            id: 1,
            rawMaterial: false,
            qty: 0,
            unit: '',
            avgPurchasePrice: 0,
            amount: 0,
            description: ''
        }
    ]);

    // Handle radio button change
    const handleWastageForChange = (value: 'raw_material' | 'item') => {
        setWastageFor(value);
    };

    // Handle item field change
    const handleItemChange = (id: number, field: keyof WastageItem, value: string | boolean | number) => {
        setItems(prevItems =>
            prevItems.map(item => {
                if (item.id === id) {
                    const updatedItem = { ...item, [field]: value };
                    // Calculate amount when qty or avgPurchasePrice changes
                    if (field === 'qty' || field === 'avgPurchasePrice') {
                        updatedItem.amount = Number(updatedItem.qty) * Number(updatedItem.avgPurchasePrice);
                    }
                    return updatedItem;
                }
                return item;
            })
        );
    };

    // Add new item
    const addNewItem = () => {
        const newId = Math.max(...items.map(item => item.id), 0) + 1;
        setItems(prev => [
            ...prev,
            {
                id: newId,
                rawMaterial: false,
                qty: 0,
                unit: '',
                avgPurchasePrice: 0,
                amount: 0,
                description: ''
            }
        ]);
    };

    // Remove item
    const removeItem = (id: number) => {
        if (items.length > 1) {
            setItems(prev => prev.filter(item => item.id !== id));
        }
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = {
            wastageFor,
            date,
            items
        };
        console.log('Form submitted:', formData);
        // Add your submission logic here (API call, etc.)
    };

    return (
        <div className="w-full bg-gray-50 min-h-screen p-6">
            {/* Wastage Stock Details Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Wastage Stock Details</h1>
            </div>

            {/* Wastage For and Date */}
            <div className="mb-6">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Wastage For</label>
                        <div className="flex gap-6">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="wastageFor"
                                    value="raw_material"
                                    checked={wastageFor === 'raw_material'}
                                    onChange={() => handleWastageForChange('raw_material')}
                                    className="mr-2"
                                />
                                <span className="text-gray-700">Raw Material</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="wastageFor"
                                    value="item"
                                    checked={wastageFor === 'item'}
                                    onChange={() => handleWastageForChange('item')}
                                    className="mr-2"
                                />
                                <span className="text-gray-700">Item</span>
                            </label>
                        </div>
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                        />
                    </div>
                </div>
            </div>

            {/* Wastage Item Details Header and Buttons */}
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800">Wastage Item Details</h2>
                <div className="flex gap-3">
                    <button
                        onClick={addNewItem}
                        className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 shadow-sm"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add New
                    </button>
                    <button
                        onClick={() => removeItem(items[items.length - 1].id)}
                        disabled={items.length <= 1}
                        className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 shadow-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Remove
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Raw Material</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Qty</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Unit</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Avg. Purchase Price</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Amount</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="px-4 py-3">
                                    <input
                                        type="checkbox"
                                        checked={item.rawMaterial}
                                        onChange={(e) => handleItemChange(item.id, 'rawMaterial', e.target.checked)}
                                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                    />
                                </td>
                                <td className="px-4 py-3">
                                    <input
                                        type="number"
                                        value={item.qty}
                                        onChange={(e) => handleItemChange(item.id, 'qty', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                </td>
                                <td className="px-4 py-3">
                                    <input
                                        type="text"
                                        value={item.unit}
                                        onChange={(e) => handleItemChange(item.id, 'unit', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                </td>
                                <td className="px-4 py-3">
                                    <input
                                        type="number"
                                        value={item.avgPurchasePrice}
                                        onChange={(e) => handleItemChange(item.id, 'avgPurchasePrice', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                </td>
                                <td className="px-4 py-3">
                                    <input
                                        type="number"
                                        value={item.amount}
                                        readOnly
                                        className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2"
                                    />
                                </td>
                                <td className="px-4 py-3">
                                    <input
                                        type="text"
                                        value={item.description}
                                        onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
                <button
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default AddWastage;