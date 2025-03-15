// AddPurchase.tsx
import React, { useState, useCallback } from 'react';

interface RawMaterial {
    id: string;
    name: string;
    qty: number;
    unit: string;
    price: number;
    tax: number;
    description: string;
    checked: boolean;
}

interface FormState {
    purchaseType: 'supplier' | 'kitchen';
    supplier: string;
    poNumber: string;
    invoiceDate: string;
    invoiceNumber: string;
    gstNumber: string;
    paymentStatus: 'unpaid' | 'paid';
    updateInventory: boolean;
    invoiceFile: File | null;
}

const suppliers = [
    { id: '1', name: 'Supplier 1' },
    { id: '2', name: 'Supplier 2' },
    { id: '3', name: 'Supplier 3' },
];

const AddPurchase: React.FC = () => {
    const [formState, setFormState] = useState<FormState>({
        purchaseType: 'supplier',
        supplier: '',
        poNumber: '',
        invoiceDate: '',
        invoiceNumber: '',
        gstNumber: '',
        paymentStatus: 'unpaid',
        updateInventory: false,
        invoiceFile: null,
    });

    const [rawMaterials, setRawMaterials] = useState<RawMaterial[]>([]);
    const [isFavorite, setIsFavorite] = useState(false);

    // Memoized handlers for better performance
    const updateFormState = useCallback((field: keyof FormState, value: any) => {
        setFormState(prev => ({ ...prev, [field]: value }));
    }, []);

    const addMaterial = useCallback(() => {
        const newMaterial: RawMaterial = {
            id: crypto.randomUUID(),
            name: '',
            qty: 0,
            unit: '',
            price: 0,
            tax: 0,
            description: '',
            checked: false,
        };
        setRawMaterials(prev => [...prev, newMaterial]);
    }, []);

    const updateMaterial = useCallback((id: string, field: keyof RawMaterial, value: any) => {
        setRawMaterials(prev =>
            prev.map(item =>
                item.id === id ? { ...item, [field]: value } : item
            )
        );
    }, []);

    const removeSelected = useCallback(() => {
        setRawMaterials(prev => prev.filter(item => !item.checked));
    }, []);

    const clearAll = useCallback(() => setRawMaterials([]), []);

    return (
        <div className="max-w-7xl mx-auto p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-2xl">
            <div className="space-y-8">
                {/* Purchase Type */}
                <section className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">New Purchase Details</h2>
                    <div className="flex gap-6">
                        {(['supplier', 'kitchen'] as const).map(type => (
                            <label key={type} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="radio"
                                    value={type}
                                    checked={formState.purchaseType === type}
                                    onChange={() => updateFormState('purchaseType', type)}
                                    className="w-5 h-5 text-indigo-600 focus:ring-indigo-500"
                                />
                                <span className="text-gray-700 capitalize">{type}</span>
                            </label>
                        ))}
                    </div>
                </section>

                {/* Supplier and PO */}
                <section className="bg-white p-6 rounded-lg shadow grid grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
                        <select
                            value={formState.supplier}
                            onChange={e => updateFormState('supplier', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="">Select Supplier</option>
                            {suppliers.map(supplier => (
                                <option key={supplier.id} value={supplier.id}>
                                    {supplier.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">PO Number</label>
                        <input
                            type="text"
                            value={formState.poNumber}
                            onChange={e => updateFormState('poNumber', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                </section>

                {/* Invoice Details */}
                <section className="bg-white p-6 rounded-lg shadow grid grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Date</label>
                        <input
                            type="date"
                            value={formState.invoiceDate}
                            onChange={e => updateFormState('invoiceDate', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Number</label>
                        <input
                            type="text"
                            value={formState.invoiceNumber}
                            onChange={e => updateFormState('invoiceNumber', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">GST Number</label>
                        <input
                            type="text"
                            value={formState.gstNumber}
                            onChange={e => updateFormState('gstNumber', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                </section>

                {/* Payment and Inventory */}
                <section className="bg-white p-6 rounded-lg shadow grid grid-cols-2 gap-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Status</h2>
                        <div className="flex gap-6">
                            {(['unpaid', 'paid'] as const).map(status => (
                                <label key={status} className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        value={status}
                                        checked={formState.paymentStatus === status}
                                        onChange={() => updateFormState('paymentStatus', status)}
                                        className="w-5 h-5 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <span className="text-gray-700 capitalize">{status}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formState.updateInventory}
                                onChange={e => updateFormState('updateInventory', e.target.checked)}
                                className="w-5 h-5 text-indigo-600 focus:ring-indigo-500"
                            />
                            <span className="text-gray-700">Update Inventory Stock</span>
                        </label>
                    </div>
                </section>

                {/* File Upload */}
                <section className="bg-white p-6 rounded-lg shadow">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Invoice File</label>
                    <input
                        type="file"
                        onChange={e => updateFormState('invoiceFile', e.target.files?.[0] || null)}
                        className="w-full p-2 border border-gray-300 rounded-md file:bg-indigo-600 file:text-white file:border-0 file:px-4 file:py-2 file:rounded-md file:hover:bg-indigo-700"
                    />
                </section>

                {/* Raw Materials */}
                <section className="bg-white p-6 rounded-lg shadow">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Raw Materials</h2>
                        <div className="space-x-3">
                            <button
                                onClick={addMaterial}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                            >
                                Add New
                            </button>
                            <button
                                onClick={clearAll}
                                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                            >
                                Clear All
                            </button>
                            <button
                                onClick={() => setIsFavorite(!isFavorite)}
                                className={`px-4 py-2 ${isFavorite ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-yellow-500 hover:bg-yellow-600'} text-white rounded-md transition-colors`}
                            >
                                {isFavorite ? 'Remove Favorite' : 'Set Favorite'}
                            </button>
                            <button
                                onClick={removeSelected}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                            >
                                Remove Selected
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-100">
                                <tr>
                                    {['Select', 'Name', 'Qty', 'Unit', 'Price', 'Tax', 'Description'].map(header => (
                                        <th
                                            key={header}
                                            className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {rawMaterials.map(material => (
                                    <tr key={material.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-2">
                                            <input
                                                type="checkbox"
                                                checked={material.checked}
                                                onChange={e => updateMaterial(material.id, 'checked', e.target.checked)}
                                                className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                                            />
                                        </td>
                                        <td className="px-4 py-2">
                                            <input
                                                type="text"
                                                value={material.name}
                                                onChange={e => updateMaterial(material.id, 'name', e.target.value)}
                                                className="w-full p-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                        </td>
                                        <td className="px-4 py-2 w-24">
                                            <input
                                                type="number"
                                                value={material.qty}
                                                onChange={e => updateMaterial(material.id, 'qty', Number(e.target.value))}
                                                className="w-full p-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                        </td>
                                        <td className="px-4 py-2 w-24">
                                            <input
                                                type="text"
                                                value={material.unit}
                                                onChange={e => updateMaterial(material.id, 'unit', e.target.value)}
                                                className="w-full p-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                        </td>
                                        <td className="px-4 py-2 w-32">
                                            <input
                                                type="number"
                                                value={material.price}
                                                onChange={e => updateMaterial(material.id, 'price', Number(e.target.value))}
                                                className="w-full p-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                        </td>
                                        <td className="px-4 py-2 w-24">
                                            <input
                                                type="number"
                                                value={material.tax}
                                                onChange={e => updateMaterial(material.id, 'tax', Number(e.target.value))}
                                                className="w-full p-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                        </td>
                                        <td className="px-4 py-2">
                                            <input
                                                type="text"
                                                value={material.description}
                                                onChange={e => updateMaterial(material.id, 'description', e.target.value)}
                                                className="w-full p-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AddPurchase;