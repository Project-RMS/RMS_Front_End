// AddRequest.tsx
import React, { useState } from 'react';

interface RawMaterial {
    id: number;
    name: string;
    checked: boolean;
    qty: number;
    unit: string;
    price: number;
    amount: number;
    description: string;
}

const AddRequest: React.FC = () => {
    // State declarations
    const [destination, setDestination] = useState('restaurant');
    const [sroNo, setSroNo] = useState('');
    const [restaurant, setRestaurant] = useState('');
    const [date, setDate] = useState('');
    const [isEditable, setIsEditable] = useState(false);
    const [rawMaterials, setRawMaterials] = useState<RawMaterial[]>([]);

    // Sample restaurant options
    const restaurantOptions = ['Restaurant A', 'Restaurant B', 'Restaurant C'];

    // Add new raw material row
    const addNewRawMaterial = () => {
        const newMaterial: RawMaterial = {
            id: Date.now(),
            name: '',
            checked: false,
            qty: 0,
            unit: 'unit',
            price: 0,
            amount: 0,
            description: ''
        };
        setRawMaterials([...rawMaterials, newMaterial]);
    };

    // Remove specific raw material
    const removeRawMaterial = (id: number) => {
        setRawMaterials(rawMaterials.filter(material => material.id !== id));
    };

    // Remove all raw materials
    const removeAllRawMaterials = () => {
        setRawMaterials([]);
    };

    // Update raw material field
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

    // Handle save
    const handleSave = () => {
        const requestData = {
            destination,
            sroNo,
            restaurant: destination === 'restaurant' ? restaurant : null,
            date,
            isEditable,
            rawMaterials
        };
        console.log('Saving request:', requestData);
        // Add your save logic here (e.g., API call)
    };

    return (
        <div className="w-full min-h-screen bg-gray-100">
            {/* Header */}
            <div className="w-full px-6 py-8 bg-white border-b border-gray-200">
                <h1 className="text-3xl font-bold text-gray-800">Request for Sales Return Details</h1>
            </div>

            {/* Form Section */}
            <div className="w-full px-6 py-6 bg-gray-50">
                {/* Destination and SRO No */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-600 mb-2">To</label>
                        <div className="flex gap-6">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    value="restaurant"
                                    checked={destination === 'restaurant'}
                                    onChange={(e) => setDestination(e.target.value)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-gray-700">Restaurant</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    value="kitchen"
                                    checked={destination === 'kitchen'}
                                    onChange={(e) => setDestination(e.target.value)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-gray-700">Kitchen</span>
                            </label>
                        </div>
                    </div>
                    <div className="flex flex-col md:col-span-2">
                        <label className="text-sm font-medium text-gray-600 mb-2">SRO No</label>
                        <input
                            type="text"
                            value={sroNo}
                            onChange={(e) => setSroNo(e.target.value)}
                            placeholder="Enter SRO Number"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                    </div>
                </div>

                {/* Restaurant and Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-600 mb-2">Restaurant</label>
                        <select
                            value={restaurant}
                            onChange={(e) => setRestaurant(e.target.value)}
                            disabled={destination !== 'restaurant'}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                        >
                            <option value="">Select Restaurant</option>
                            {restaurantOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-600 mb-2">Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                    </div>
                </div>

                {/* Editable Checkbox */}
                <div className="mb-6">
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={isEditable}
                            onChange={(e) => setIsEditable(e.target.checked)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
                        />
                        <span className="text-sm font-medium text-gray-600">Editable</span>
                    </label>
                </div>

                {/* Raw Material Details Header */}
                <div className="w-full py-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-gray-800">Raw Material Details</h2>
                        <div className="flex gap-4">
                            <button
                                onClick={addNewRawMaterial}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                </svg>
                                Add New
                            </button>
                            <button
                                onClick={removeAllRawMaterials}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center gap-2"
                                disabled={rawMaterials.length === 0}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Remove All
                            </button>
                        </div>
                    </div>
                </div>

                {/* Raw Materials Table */}
                <div className="w-full overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Qty</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Unit</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Description</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {rawMaterials.map((material) => (
                                <tr key={material.id} className="hover:bg-gray-50 transition-colors duration-150">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={material.checked}
                                                onChange={(e) => updateRawMaterial(material.id, 'checked', e.target.checked)}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
                                            />
                                            <input
                                                type="text"
                                                value={material.name}
                                                onChange={(e) => updateRawMaterial(material.id, 'name', e.target.value)}
                                                className="w-full px-2 py-1 border border-gray-300 rounded-lg"
                                            />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <input
                                            type="number"
                                            value={material.qty}
                                            onChange={(e) => updateRawMaterial(material.id, 'qty', parseFloat(e.target.value) || 0)}
                                            className="w-20 px-2 py-1 border border-gray-300 rounded-lg"
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <input
                                            type="text"
                                            value={material.unit}
                                            onChange={(e) => updateRawMaterial(material.id, 'unit', e.target.value)}
                                            className="w-20 px-2 py-1 border border-gray-300 rounded-lg"
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <input
                                            type="number"
                                            value={material.price}
                                            onChange={(e) => updateRawMaterial(material.id, 'price', parseFloat(e.target.value) || 0)}
                                            className="w-24 px-2 py-1 border border-gray-300 rounded-lg"
                                        />
                                    </td>
                                    <td className="px-6 py-4 text-gray-700">{material.amount.toFixed(2)}</td>
                                    <td className="px-6 py-4">
                                        <input
                                            type="text"
                                            value={material.description}
                                            onChange={(e) => updateRawMaterial(material.id, 'description', e.target.value)}
                                            className="w-full px-2 py-1 border border-gray-300 rounded-lg"
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => removeRawMaterial(material.id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Save Button */}
                <div className="w-full py-6 border-t border-gray-200">
                    <button
                        onClick={handleSave}
                        className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center gap-2 mx-auto"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                        </svg>
                        Save Request
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddRequest;