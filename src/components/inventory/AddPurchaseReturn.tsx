// AddPurchaseReturn.tsx
import React, { useState } from 'react';

interface RawMaterial {
    id: number;
    name: string;
    checked: boolean;
    qty: number;
    unit: string;
    price: number;
    amount: number;
    tax: number;
    description: string;
}

const AddPurchaseReturn: React.FC = () => {
    const [formData, setFormData] = useState({
        to: 'supplier',
        debitNoteNo: '',
        kitchen: '',
        invoiceDate: '',
        invoiceNumber: '',
        paymentType: 'unpaid',
        updateInventory: false,
        editable: false,
    });

    const [rawMaterials, setRawMaterials] = useState<RawMaterial[]>([]);

    // Handle input changes
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    // Add new raw material
    const handleAddRawMaterial = () => {
        setRawMaterials((prev) => [
            ...prev,
            {
                id: Date.now(),
                name: '',
                checked: false,
                qty: 0,
                unit: '',
                price: 0,
                amount: 0,
                tax: 0,
                description: '',
            },
        ]);
    };

    // Clear all raw materials
    const handleClearAll = () => {
        setRawMaterials([]);
    };

    // Remove raw material
    const handleRemove = (id: number) => {
        setRawMaterials((prev) => prev.filter((item) => item.id !== id));
    };

    // Handle raw material field changes
    const handleRawMaterialChange = (
        id: number,
        field: keyof RawMaterial,
        value: string | number | boolean
    ) => {
        setRawMaterials((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, [field]: value } : item
            )
        );
    };

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Purchase Return</h2>

            {/* To Section */}
            <div className="mb-6">
                <div className="flex flex-wrap gap-6 items-center">
                    <div className="flex items-center gap-4">
                        <label className="font-medium text-gray-700">To:</label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="to"
                                    value="supplier"
                                    checked={formData.to === 'supplier'}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-blue-600"
                                />
                                Supplier
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="to"
                                    value="kitchen"
                                    checked={formData.to === 'kitchen'}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-blue-600"
                                />
                                Kitchen
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="to"
                                    value="salesReturn"
                                    checked={formData.to === 'salesReturn'}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-blue-600"
                                />
                                Select Sales Return Order
                            </label>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Debit Note No
                        </label>
                        <input
                            type="text"
                            name="debitNoteNo"
                            value={formData.debitNoteNo}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded-md px-3 py-2 w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>

            {/* Kitchen Dropdown */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kitchen
                </label>
                <select
                    name="kitchen"
                    value={formData.kitchen}
                    onChange={handleInputChange}
                    className="w-full max-w-md border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select Kitchen</option>
                    <option value="kitchen1">Kitchen 1</option>
                    <option value="kitchen2">Kitchen 2</option>
                    <option value="kitchen3">Kitchen 3</option>
                </select>
            </div>

            {/* Invoice Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Invoice Date
                    </label>
                    <input
                        type="date"
                        name="invoiceDate"
                        value={formData.invoiceDate}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Invoice Number
                    </label>
                    <input
                        type="text"
                        name="invoiceNumber"
                        value={formData.invoiceNumber}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Payment Type */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Type
                </label>
                <div className="flex gap-6">
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="paymentType"
                            value="unpaid"
                            checked={formData.paymentType === 'unpaid'}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-blue-600"
                        />
                        Unpaid
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="paymentType"
                            value="paid"
                            checked={formData.paymentType === 'paid'}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-blue-600"
                        />
                        Paid
                    </label>
                </div>
            </div>

            {/* Checkboxes */}
            <div className="mb-6 flex gap-6">
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="updateInventory"
                        checked={formData.updateInventory}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600"
                    />
                    Update Inventory Stock
                </label>
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="editable"
                        checked={formData.editable}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600"
                    />
                    Editable
                </label>
            </div>

            {/* Raw Material Details */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Raw Material Details</h3>
                    <div className="space-x-3">
                        <button
                            onClick={handleAddRawMaterial}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            Add New
                        </button>
                        <button
                            onClick={handleClearAll}
                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                        >
                            Clear All
                        </button>
                    </div>
                </div>

                {/* Table */}
                {rawMaterials.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-3 text-left text-sm font-medium text-gray-700">Name</th>
                                    <th className="p-3 text-left text-sm font-medium text-gray-700">Qty</th>
                                    <th className="p-3 text-left text-sm font-medium text-gray-700">Unit</th>
                                    <th className="p-3 text-left text-sm font-medium text-gray-700">Price</th>
                                    <th className="p-3 text-left text-sm font-medium text-gray-700">Amount</th>
                                    <th className="p-3 text-left text-sm font-medium text-gray-700">Tax</th>
                                    <th className="p-3 text-left text-sm font-medium text-gray-700">Description</th>
                                    <th className="p-3 text-left text-sm font-medium text-gray-700">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rawMaterials.map((item) => (
                                    <tr key={item.id} className="border-b hover:bg-gray-50">
                                        <td className="p-3">
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={item.checked}
                                                    onChange={(e) =>
                                                        handleRawMaterialChange(item.id, 'checked', e.target.checked)
                                                    }
                                                    className="h-4 w-4 text-blue-600"
                                                />
                                                <input
                                                    type="text"
                                                    value={item.name}
                                                    onChange={(e) =>
                                                        handleRawMaterialChange(item.id, 'name', e.target.value)
                                                    }
                                                    className="border rounded-md px-2 py-1 w-full"
                                                />
                                            </div>
                                        </td>
                                        <td className="p-3">
                                            <input
                                                type="number"
                                                value={item.qty}
                                                onChange={(e) =>
                                                    handleRawMaterialChange(item.id, 'qty', Number(e.target.value))
                                                }
                                                className="border rounded-md px-2 py-1 w-20"
                                            />
                                        </td>
                                        <td className="p-3">
                                            <input
                                                type="text"
                                                value={item.unit}
                                                onChange={(e) =>
                                                    handleRawMaterialChange(item.id, 'unit', e.target.value)
                                                }
                                                className="border rounded-md px-2 py-1 w-20"
                                            />
                                        </td>
                                        <td className="p-3">
                                            <input
                                                type="number"
                                                value={item.price}
                                                onChange={(e) =>
                                                    handleRawMaterialChange(item.id, 'price', Number(e.target.value))
                                                }
                                                className="border rounded-md px-2 py-1 w-24"
                                            />
                                        </td>
                                        <td className="p-3">
                                            <input
                                                type="number"
                                                value={item.amount}
                                                onChange={(e) =>
                                                    handleRawMaterialChange(item.id, 'amount', Number(e.target.value))
                                                }
                                                className="border rounded-md px-2 py-1 w-24"
                                            />
                                        </td>
                                        <td className="p-3">
                                            <input
                                                type="number"
                                                value={item.tax}
                                                onChange={(e) =>
                                                    handleRawMaterialChange(item.id, 'tax', Number(e.target.value))
                                                }
                                                className="border rounded-md px-2 py-1 w-20"
                                            />
                                        </td>
                                        <td className="p-3">
                                            <input
                                                type="text"
                                                value={item.description}
                                                onChange={(e) =>
                                                    handleRawMaterialChange(item.id, 'description', e.target.value)
                                                }
                                                className="border rounded-md px-2 py-1 w-full"
                                            />
                                        </td>
                                        <td className="p-3">
                                            <button
                                                onClick={() => handleRemove(item.id)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddPurchaseReturn;