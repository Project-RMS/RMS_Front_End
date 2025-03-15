// AddSalesReturn.tsx
import React, { useState } from 'react';

interface RawMaterial {
    id: number;
    selected: boolean;
    name: string;
    qty: number;
    unit: string;
    price: number;
    amount: number;
    tax: number;
    description: string;
}

const AddSalesReturn: React.FC = () => {
    // Form States
    const [returnType, setReturnType] = useState<string>('');
    const [restaurant, setRestaurant] = useState<string>('');
    const [creditNoteNo, setCreditNoteNo] = useState<string>('');
    const [invoiceDate, setInvoiceDate] = useState<string>('');
    const [invoiceNumber, setInvoiceNumber] = useState<string>('');
    const [gstNo, setGstNo] = useState<string>('');
    const [paymentType, setPaymentType] = useState<string>('unpaid');
    const [updateInventory, setUpdateInventory] = useState<boolean>(false);
    const [rawMaterials, setRawMaterials] = useState<RawMaterial[]>([]);

    // Handle Add New Raw Material
    const handleAddRawMaterial = () => {
        const newMaterial: RawMaterial = {
            id: Date.now(),
            selected: false,
            name: '',
            qty: 0,
            unit: '',
            price: 0,
            amount: 0,
            tax: 0,
            description: ''
        };
        setRawMaterials([...rawMaterials, newMaterial]);
    };

    // Handle Remove Selected
    const handleRemove = () => {
        setRawMaterials(rawMaterials.filter(item => !item.selected));
    };

    // Handle Clear All
    const handleClearAll = () => {
        setRawMaterials([]);
    };

    // Handle Input Change for Raw Materials
    const handleMaterialChange = (id: number, field: keyof RawMaterial, value: any) => {
        setRawMaterials(rawMaterials.map(item => {
            if (item.id === id) {
                const updatedItem = { ...item, [field]: value };
                if (field === 'qty' || field === 'price') {
                    updatedItem.amount = updatedItem.qty * updatedItem.price;
                }
                return updatedItem;
            }
            return item;
        }));
    };

    // Calculate Total Amount
    const totalAmount = rawMaterials.reduce((sum, item) =>
        sum + item.amount + (item.amount * item.tax / 100), 0);

    // Handle Form Submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({
            returnType,
            restaurant,
            creditNoteNo,
            invoiceDate,
            invoiceNumber,
            gstNo,
            paymentType,
            updateInventory,
            rawMaterials,
            totalAmount
        });
        // Add your save logic here
    };

    return (
        <div className="w-full px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">New Sales Return Details</h1>

            {/* Return Type Selection */}
            <div className="mb-6">
                <div className="flex space-x-6">
                    {['Supplier', 'Restaurant', 'Kitchen', 'Purchase Return'].map((type) => (
                        <label key={type} className="flex items-center">
                            <input
                                type="radio"
                                name="returnType"
                                value={type.toLowerCase()}
                                checked={returnType === type.toLowerCase()}
                                onChange={(e) => setReturnType(e.target.value)}
                                className="mr-2"
                            />
                            {type}
                        </label>
                    ))}
                </div>
            </div>

            {/* Restaurant and Credit Note */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <label className="block mb-1">Restaurant</label>
                    <input
                        type="text"
                        value={restaurant}
                        onChange={(e) => setRestaurant(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block mb-1">Credit Note No</label>
                    <input
                        type="text"
                        value={creditNoteNo}
                        onChange={(e) => setCreditNoteNo(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>
            </div>

            {/* Invoice Details */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Invoice Details</h2>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block mb-1">Invoice Date</label>
                        <input
                            type="date"
                            value={invoiceDate}
                            onChange={(e) => setInvoiceDate(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Invoice Number</label>
                        <input
                            type="text"
                            value={invoiceNumber}
                            onChange={(e) => setInvoiceNumber(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block mb-1">GST No</label>
                        <input
                            type="text"
                            value={gstNo}
                            onChange={(e) => setGstNo(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                </div>
            </div>

            {/* Payment Type */}
            <div className="mb-6">
                <div className="flex items-center space-x-6">
                    {['Unpaid', 'Paid'].map((type) => (
                        <label key={type} className="flex items-center">
                            <input
                                type="radio"
                                name="paymentType"
                                value={type.toLowerCase()}
                                checked={paymentType === type.toLowerCase()}
                                onChange={(e) => setPaymentType(e.target.value)}
                                className="mr-2"
                            />
                            {type}
                        </label>
                    ))}
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={updateInventory}
                            onChange={(e) => setUpdateInventory(e.target.checked)}
                            className="mr-2"
                        />
                        Update Inventory Stock
                    </label>
                </div>
            </div>

            {/* Raw Material Details */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-xl font-semibold">Raw Material Details</h2>
                    <div className="space-x-2">
                        <button
                            onClick={handleAddRawMaterial}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Add New
                        </button>
                        <button
                            onClick={handleClearAll}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                            Clear All
                        </button>
                        <button
                            onClick={handleRemove}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            Remove
                        </button>
                    </div>
                </div>

                {/* Table */}
                {rawMaterials.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border p-2"><input type="checkbox" /></th>
                                    <th className="border p-2">Name</th>
                                    <th className="border p-2">Qty</th>
                                    <th className="border p-2">Unit</th>
                                    <th className="border p-2">Price</th>
                                    <th className="border p-2">Amount</th>
                                    <th className="border p-2">Tax (%)</th>
                                    <th className="border p-2">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rawMaterials.map((material) => (
                                    <tr key={material.id}>
                                        <td className="border p-2">
                                            <input
                                                type="checkbox"
                                                checked={material.selected}
                                                onChange={(e) => handleMaterialChange(material.id, 'selected', e.target.checked)}
                                            />
                                        </td>
                                        <td className="border p-2">
                                            <input
                                                type="text"
                                                value={material.name}
                                                onChange={(e) => handleMaterialChange(material.id, 'name', e.target.value)}
                                                className="w-full p-1"
                                            />
                                        </td>
                                        <td className="border p-2">
                                            <input
                                                type="number"
                                                value={material.qty}
                                                onChange={(e) => handleMaterialChange(material.id, 'qty', parseFloat(e.target.value))}
                                                className="w-full p-1"
                                            />
                                        </td>
                                        <td className="border p-2">
                                            <input
                                                type="text"
                                                value={material.unit}
                                                onChange={(e) => handleMaterialChange(material.id, 'unit', e.target.value)}
                                                className="w-full p-1"
                                            />
                                        </td>
                                        <td className="border p-2">
                                            <input
                                                type="number"
                                                value={material.price}
                                                onChange={(e) => handleMaterialChange(material.id, 'price', parseFloat(e.target.value))}
                                                className="w-full p-1"
                                            />
                                        </td>
                                        <td className="border p-2">{material.amount.toFixed(2)}</td>
                                        <td className="border p-2">
                                            <input
                                                type="number"
                                                value={material.tax}
                                                onChange={(e) => handleMaterialChange(material.id, 'tax', parseFloat(e.target.value))}
                                                className="w-full p-1"
                                            />
                                        </td>
                                        <td className="border p-2">
                                            <input
                                                type="text"
                                                value={material.description}
                                                onChange={(e) => handleMaterialChange(material.id, 'description', e.target.value)}
                                                className="w-full p-1"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Total Amount */}
            <div className="mb-6 text-right">
                <p className="text-lg font-semibold">Total Amount: ₹{totalAmount.toFixed(2)}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4">
                <button
                    onClick={() => {
                        setReturnType('');
                        setRestaurant('');
                        setCreditNoteNo('');
                        setInvoiceDate('');
                        setInvoiceNumber('');
                        setGstNo('');
                        setPaymentType('unpaid');
                        setUpdateInventory(false);
                        setRawMaterials([]);
                    }}
                    className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSubmit}
                    className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default AddSalesReturn;