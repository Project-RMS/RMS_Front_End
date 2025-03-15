// AddTransfer.tsx
import React, { useState } from 'react';

interface RawMaterial {
    id: number;
    name: string;
    qty: number;
    unit: string;
    price: number;
    amount: number;
    description: string;
    selected: boolean;
}

const AddTransfer: React.FC = () => {
    // State management
    const [orderType, setOrderType] = useState<'supplier' | 'restaurant' | 'kitchen'>('supplier');
    const [restaurant, setRestaurant] = useState('');
    const [invoiceDate, setInvoiceDate] = useState('');
    const [category, setCategory] = useState('');
    const [challanNo, setChallanNo] = useState('');
    const [paymentType, setPaymentType] = useState<'unpaid' | 'paid'>('unpaid');
    const [address, setAddress] = useState('');
    const [rawMaterials, setRawMaterials] = useState<RawMaterial[]>([]);
    const [isFavorite, setIsFavorite] = useState(false);

    // Sample data
    const restaurants = ['Restaurant A', 'Restaurant B', 'Restaurant C'];
    const categories = ['Food', 'Beverage', 'Supplies'];
    const units = ['kg', 'liter', 'piece', 'pack'];

    // Handlers
    const addRawMaterial = () => {
        const newMaterial: RawMaterial = {
            id: Date.now(),
            name: '',
            qty: 0,
            unit: '',
            price: 0,
            amount: 0,
            description: '',
            selected: false
        };
        setRawMaterials([...rawMaterials, newMaterial]);
    };

    const removeSelected = () => {
        setRawMaterials(rawMaterials.filter(material => !material.selected));
    };

    const clearAll = () => {
        setRawMaterials([]);
        setRestaurant('');
        setInvoiceDate('');
        setCategory('');
        setChallanNo('');
        setPaymentType('unpaid');
        setAddress('');
        setOrderType('supplier');
        setIsFavorite(false);
    };

    const updateRawMaterial = (id: number, field: keyof RawMaterial, value: any) => {
        setRawMaterials(rawMaterials.map(material => {
            if (material.id === id) {
                const updatedMaterial = { ...material, [field]: value };
                if (field === 'qty' || field === 'price') {
                    updatedMaterial.amount = updatedMaterial.qty * updatedMaterial.price;
                }
                return updatedMaterial;
            }
            return material;
        }));
    };

    const totalAmount = rawMaterials.reduce((sum, item) => sum + item.amount, 0);

    const handleSave = () => {
        const formData = {
            orderType,
            restaurant,
            invoiceDate,
            category,
            challanNo,
            paymentType,
            address,
            rawMaterials,
            totalAmount,
            isFavorite
        };
        console.log('Saving:', formData);
        // Add your save logic here
    };

    return (
        <div className="w-full min-h-screen bg-gray-50 p-6">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Purchase Order Form</h1>

            {/* Order Type */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Order Type</label>
                <div className="flex gap-6">
                    {['supplier', 'restaurant', 'kitchen'].map((type) => (
                        <label key={type} className="flex items-center">
                            <input
                                type="radio"
                                name="orderType"
                                value={type}
                                checked={orderType === type}
                                onChange={() => setOrderType(type as typeof orderType)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-gray-700 capitalize">{type}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Restaurant</label>
                    <select
                        value={restaurant}
                        onChange={(e) => setRestaurant(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Select Restaurant</option>
                        {restaurants.map((r) => (
                            <option key={r} value={r}>{r}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Date</label>
                    <input
                        type="date"
                        value={invoiceDate}
                        onChange={(e) => setInvoiceDate(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Select Category</option>
                        {categories.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Challan and Payment */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Challan No</label>
                    <input
                        type="text"
                        value={challanNo}
                        onChange={(e) => setChallanNo(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Payment Type</label>
                    <div className="flex gap-6">
                        {['unpaid', 'paid'].map((type) => (
                            <label key={type} className="flex items-center">
                                <input
                                    type="radio"
                                    name="paymentType"
                                    value={type}
                                    checked={paymentType === type}
                                    onChange={() => setPaymentType(type as typeof paymentType)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="ml-2 text-gray-700 capitalize">{type}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            {/* Address */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    rows={4}
                />
            </div>

            {/* Raw Materials Section */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Raw Material </h1>

                <div className="flex flex-wrap gap-4 mb-4">
                    <button
                        onClick={addRawMaterial}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
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
                        className={`px-4 py-2 ${isFavorite ? 'bg-yellow-600' : 'bg-green-600'} text-white rounded-md hover:opacity-90 transition-colors`}
                    >
                        {isFavorite ? 'Remove from Favorite' : 'Set as Favorite'}
                    </button>
                    <button
                        onClick={removeSelected}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                        Remove Selected
                    </button>
                </div>

                {/* Raw Materials Table */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b">Select</th>
                                <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b">Name</th>
                                <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b">Qty</th>
                                <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b">Unit</th>
                                <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b">Price</th>
                                <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b">Amount</th>
                                <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rawMaterials.map((material) => (
                                <tr key={material.id} className="hover:bg-gray-50">
                                    <td className="p-3 border-b">
                                        <input
                                            type="checkbox"
                                            checked={material.selected}
                                            onChange={() => updateRawMaterial(material.id, 'selected', !material.selected)}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                        />
                                    </td>
                                    <td className="p-3 border-b">
                                        <input
                                            type="text"
                                            value={material.name}
                                            onChange={(e) => updateRawMaterial(material.id, 'name', e.target.value)}
                                            className="w-full p-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </td>
                                    <td className="p-3 border-b">
                                        <input
                                            type="number"
                                            value={material.qty}
                                            onChange={(e) => updateRawMaterial(material.id, 'qty', Number(e.target.value))}
                                            className="w-full p-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </td>
                                    <td className="p-3 border-b">
                                        <select
                                            value={material.unit}
                                            onChange={(e) => updateRawMaterial(material.id, 'unit', e.target.value)}
                                            className="w-full p-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="">Select Unit</option>
                                            {units.map((unit) => (
                                                <option key={unit} value={unit}>{unit}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="p-3 border-b">
                                        <input
                                            type="number"
                                            value={material.price}
                                            onChange={(e) => updateRawMaterial(material.id, 'price', Number(e.target.value))}
                                            className="w-full p-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </td>
                                    <td className="p-3 border-b text-gray-700">{material.amount.toFixed(2)}</td>
                                    <td className="p-3 border-b">
                                        <input
                                            type="text"
                                            value={material.description}
                                            onChange={(e) => updateRawMaterial(material.id, 'description', e.target.value)}
                                            className="w-full p-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="bg-gray-100">
                                <td colSpan={5} className="p-3 text-right font-semibold text-gray-700">Total Amount:</td>
                                <td className="p-3 font-semibold text-gray-700">{totalAmount.toFixed(2)}</td>
                                <td className="p-3"></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-4">
                <button
                    onClick={clearAll}
                    className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                    Clear
                </button>
                <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default AddTransfer;