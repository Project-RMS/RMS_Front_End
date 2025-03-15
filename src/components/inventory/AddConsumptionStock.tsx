// AddConsumptionStock.tsx
import React, { useState } from 'react';

interface RawMaterial {
    id: number;
    checked: boolean;
    name: string;
    currentStock: number;
    unit: string;
    comments: string;
}

const AddConsumptionStock: React.FC = () => {
    const [rawMaterials, setRawMaterials] = useState<RawMaterial[]>([
        { id: 1, checked: false, name: 'Steel', currentStock: 100, unit: 'kg', comments: '' },
        { id: 2, checked: false, name: 'Wood', currentStock: 50, unit: 'pcs', comments: '' },
    ]);

    // State for date selection
    const [selectedDate, setSelectedDate] = useState<string>(
        new Date().toISOString().split('T')[0]
    );

    const handleCheckboxChange = (id: number) => {
        setRawMaterials(prevMaterials =>
            prevMaterials.map(material =>
                material.id === id ? { ...material, checked: !material.checked } : material
            )
        );
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(e.target.value);
    };

    const handleAddMaterial = () => {
        // Adding a blank material row that can be edited later
        setRawMaterials(prev => [...prev, {
            id: Date.now(),
            checked: false,
            name: '',
            currentStock: 0,
            unit: '',
            comments: '',
        }]);
    };

    const handleSave = () => {
        console.log('Saving materials:', {
            date: selectedDate,
            materials: rawMaterials
        });
        alert('Stock details saved successfully!');
    };

    return (
        <div className="w-full min-h-screen bg-gray-100 p-6">
            {/* Heading */}
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Closing Stock Details
            </h1>

            {/* Date Selection */}
            <div className="mb-6">
                <label className="text-lg text-gray-600 mr-2">Date:</label>
                <input
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Raw Material Details Section */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-xl font-semibold text-gray-700">
                        Raw Material Details
                    </h2>
                    <button
                        onClick={handleAddMaterial}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Add New
                    </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="p-3 border-b">Select</th>
                                <th className="p-3 border-b">Raw Material</th>
                                <th className="p-3 border-b">Current Stock</th>
                                <th className="p-3 border-b">Unit</th>
                                <th className="p-3 border-b">Comments</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rawMaterials.map(material => (
                                <tr key={material.id} className="hover:bg-gray-50">
                                    <td className="p-3 border-b">
                                        <input
                                            type="checkbox"
                                            checked={material.checked}
                                            onChange={() => handleCheckboxChange(material.id)}
                                            className="h-4 w-4 text-blue-600 rounded"
                                        />
                                    </td>
                                    <td className="p-3 border-b">{material.name}</td>
                                    <td className="p-3 border-b">{material.currentStock}</td>
                                    <td className="p-3 border-b">{material.unit}</td>
                                    <td className="p-3 border-b">{material.comments}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Save Button */}
            <div className="mt-6">
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

export default AddConsumptionStock;