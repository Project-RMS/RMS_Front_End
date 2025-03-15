import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface SalesData {
    salesType: 'supplier' | 'restaurant' | 'kitchen';
    mrnNo: string;
    restaurant: string;
    category: string;
    invoiceDate: string;
    invoiceNumber: string;
    paymentType: 'unpaid' | 'paid';
    taxPayableReverseCharge: 'no' | 'yes';
    bankName: string;
    bankBranch: string;
    ifscCode: string;
    accountNumber: string;
}

interface RawMaterial {
    id: number;
    checked: boolean;
    name: string;
    qty: number;
    unit: string;
    price: number;
    amount: number;
    tax: number;
    description: string;
}

const AddSales: React.FC = () => {
    const [formData, setFormData] = useState<SalesData>({
        salesType: 'supplier',
        mrnNo: '',
        restaurant: '',
        category: '',
        invoiceDate: '',
        invoiceNumber: '',
        paymentType: 'unpaid',
        taxPayableReverseCharge: 'no',
        bankName: '',
        bankBranch: '',
        ifscCode: '',
        accountNumber: '',
    });

    const [rawMaterials, setRawMaterials] = useState<RawMaterial[]>([]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleRawMaterialChange = (
        id: number,
        field: keyof RawMaterial,
        value: string | number | boolean
    ) => {
        setRawMaterials((prev) =>
            prev.map((item) => {
                if (item.id === id) {
                    const updatedItem = { ...item, [field]: value };
                    if (field === 'qty' || field === 'price') {
                        updatedItem.amount = updatedItem.qty * updatedItem.price;
                    }
                    return updatedItem;
                }
                return item;
            })
        );
    };

    const handleRemove = (id: number) => {
        setRawMaterials((prev) => prev.filter((item) => item.id !== id));
    };

    const addRawMaterial = () => {
        const newMaterial: RawMaterial = {
            id: Date.now(),
            checked: false,
            name: '',
            qty: 0,
            unit: '',
            price: 0,
            amount: 0,
            tax: 0,
            description: '',
        };
        setRawMaterials((prev) => [...prev, newMaterial]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', { ...formData, rawMaterials });
        // Add your submission logic here (e.g., API call)
    };

    const totalAmount = rawMaterials.reduce((sum, item) => sum + item.amount, 0);
    const totalTax = rawMaterials.reduce((sum, item) => sum + item.tax, 0);

    return (
        <div className="w-full min-h-screen bg-gray-50 p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Sale</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Sales Type */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sales Type</label>
                    <div className="flex gap-6">
                        {['supplier', 'restaurant', 'kitchen'].map((type) => (
                            <label key={type} className="flex items-center">
                                <input
                                    type="radio"
                                    name="salesType"
                                    value={type}
                                    checked={formData.salesType === type}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                                />
                                <span className="ml-2 text-sm text-gray-600 capitalize">{type}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* MRN No */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">MRN No</label>
                    <input
                        type="text"
                        name="mrnNo"
                        value={formData.mrnNo}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter MRN Number"
                    />
                </div>

                {/* Restaurant and Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Restaurant</label>
                        <select
                            name="restaurant"
                            value={formData.restaurant}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="">Select Restaurant</option>
                            <option value="rest1">Restaurant 1</option>
                            <option value="rest2">Restaurant 2</option>
                            <option value="rest3">Restaurant 3</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="">Select Category</option>
                            <option value="food">Food</option>
                            <option value="beverage">Beverage</option>
                            <option value="supplies">Supplies</option>
                        </select>
                    </div>
                </div>

                {/* Invoice Date and Number */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Date</label>
                        <input
                            type="date"
                            name="invoiceDate"
                            value={formData.invoiceDate}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Number</label>
                        <input
                            type="text"
                            name="invoiceNumber"
                            value={formData.invoiceNumber}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter Invoice Number"
                        />
                    </div>
                </div>

                {/* Payment Type and Tax */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Payment Type</label>
                        <div className="flex gap-6">
                            {['unpaid', 'paid'].map((type) => (
                                <label key={type} className="flex items-center">
                                    <input
                                        type="radio"
                                        name="paymentType"
                                        value={type}
                                        checked={formData.paymentType === type}
                                        onChange={handleChange}
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-sm text-gray-600 capitalize">{type}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tax Payable Reverse Charge</label>
                        <div className="flex gap-6">
                            {['no', 'yes'].map((type) => (
                                <label key={type} className="flex items-center">
                                    <input
                                        type="radio"
                                        name="taxPayableReverseCharge"
                                        value={type}
                                        checked={formData.taxPayableReverseCharge === type}
                                        onChange={handleChange}
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-sm text-gray-600 capitalize">{type}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bank Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                        <input
                            type="text"
                            name="bankName"
                            value={formData.bankName}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter Bank Name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Bank Branch</label>
                        <input
                            type="text"
                            name="bankBranch"
                            value={formData.bankBranch}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter Branch"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">IFSC Code</label>
                        <input
                            type="text"
                            name="ifscCode"
                            value={formData.ifscCode}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter IFSC Code"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
                        <input
                            type="text"
                            name="accountNumber"
                            value={formData.accountNumber}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter Account Number"
                        />
                    </div>
                </div>

                {/* Raw Materials Section */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-800">Raw Materials</h3>
                        <button
                            type="button"
                            onClick={addRawMaterial}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                        >
                            Add Item
                        </button>
                    </div>

                    {rawMaterials.length > 0 && (
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
                                        <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b">Tax</th>
                                        <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b">Description</th>
                                        <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rawMaterials.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50 border-b">
                                            <td className="p-3">
                                                <input
                                                    type="checkbox"
                                                    checked={item.checked}
                                                    onChange={(e) =>
                                                        handleRawMaterialChange(item.id, 'checked', e.target.checked)
                                                    }
                                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                                                />
                                            </td>
                                            <td className="p-3">
                                                <input
                                                    type="text"
                                                    value={item.name}
                                                    onChange={(e) =>
                                                        handleRawMaterialChange(item.id, 'name', e.target.value)
                                                    }
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                />
                                            </td>
                                            <td className="p-3">
                                                <input
                                                    type="number"
                                                    value={item.qty}
                                                    onChange={(e) =>
                                                        handleRawMaterialChange(item.id, 'qty', Number(e.target.value))
                                                    }
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                />
                                            </td>
                                            <td className="p-3">
                                                <input
                                                    type="text"
                                                    value={item.unit}
                                                    onChange={(e) =>
                                                        handleRawMaterialChange(item.id, 'unit', e.target.value)
                                                    }
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                />
                                            </td>
                                            <td className="p-3">
                                                <input
                                                    type="number"
                                                    value={item.price}
                                                    onChange={(e) =>
                                                        handleRawMaterialChange(item.id, 'price', Number(e.target.value))
                                                    }
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                />
                                            </td>
                                            <td className="p-3 text-gray-700">{item.amount.toFixed(2)}</td>
                                            <td className="p-3">
                                                <input
                                                    type="number"
                                                    value={item.tax}
                                                    onChange={(e) =>
                                                        handleRawMaterialChange(item.id, 'tax', Number(e.target.value))
                                                    }
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                />
                                            </td>
                                            <td className="p-3">
                                                <input
                                                    type="text"
                                                    value={item.description}
                                                    onChange={(e) =>
                                                        handleRawMaterialChange(item.id, 'description', e.target.value)
                                                    }
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                />
                                            </td>
                                            <td className="p-3">
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemove(item.id)}
                                                    className="text-red-600 hover:text-red-800 transition-colors"
                                                >
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr className="bg-gray-100">
                                        <td colSpan={5} className="p-3 text-right font-semibold text-gray-700">Total Amount:</td>
                                        <td className="p-3 font-semibold text-gray-700">{totalAmount.toFixed(2)}</td>
                                        <td className="p-3 font-semibold text-gray-700">{totalTax.toFixed(2)}</td>
                                        <td colSpan={2} className="p-3"></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    )}

                    {/* Form Actions */}
                    <div className="flex justify-end gap-4">
                        <Link
                            to="/sales"
                            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors font-medium"
                        >
                            Save Sale
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddSales;