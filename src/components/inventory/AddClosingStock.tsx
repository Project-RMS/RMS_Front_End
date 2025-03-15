// // AddClosingStock.tsx
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaTrash } from 'react-icons/fa';

// interface StockItem {
//     id: number;
//     checked: boolean;
//     rawMaterial: string;
//     currentStock: number;
//     unit: string;
//     comments: string;
// }

// const rawMaterialOptions = {
//     Dairy: ['Milk', 'Cheese', 'Butter', 'Yogurt'],
//     Grains: ['Rice', 'Wheat', 'Oats', 'Barley'],
//     Vegetables: ['Potato', 'Carrot', 'Tomato', 'Onion'],
// };

// const unitOptions = ['kg', 'liters', 'units', 'bags'];

// const AddClosingStock: React.FC = () => {
//     const navigate = useNavigate();
//     const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
//     const [category, setCategory] = useState<string>('Dairy');
//     const [stockItems, setStockItems] = useState<StockItem[]>([]);

//     const addNewItem = () => {
//         const newItem: StockItem = {
//             id: Date.now(), // Using timestamp for unique ID
//             checked: false,
//             rawMaterial: rawMaterialOptions[category as keyof typeof rawMaterialOptions][0],
//             currentStock: 0,
//             unit: unitOptions[0],
//             comments: '',
//         };
//         setStockItems([...stockItems, newItem]);
//     };

//     const handleItemChange = (id: number, field: keyof StockItem, value: string | number | boolean) => {
//         setStockItems(stockItems.map(item =>
//             item.id === id ? { ...item, [field]: value } : item
//         ));
//     };

//     const handleDelete = (id: number) => {
//         setStockItems(stockItems.filter(item => item.id !== id));
//     };

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         // Here you would typically send the stockItems to your API or parent component
//         console.log('Stock Items to Save:', { date, category, stockItems });
//         navigate('/');
//     };

//     return (
//         <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
//             <h1 className="text-3xl font-bold mb-6 text-gray-800">Closing Stock Details</h1>

//             {/* Date Section */}
//             <div className="mb-6">
//                 <label className="block text-lg font-medium text-gray-700 mb-2">Date</label>
//                 <input
//                     type="date"
//                     value={date}
//                     onChange={(e) => setDate(e.target.value)}
//                     className="w-full max-w-xs border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//             </div>

//             {/* Raw Material Details Section */}
//             <div className="mb-6">
//                 <label className="block text-lg font-medium text-gray-700 mb-2">Raw Material Details</label>
//                 <div className="flex items-center space-x-4 mb-4">
//                     <select
//                         value={category}
//                         onChange={(e) => setCategory(e.target.value)}
//                         className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                         {Object.keys(rawMaterialOptions).map(cat => (
//                             <option key={cat} value={cat}>{cat}</option>
//                         ))}
//                     </select>
//                     <button
//                         onClick={addNewItem}
//                         className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition flex items-center"
//                     >
//                         Add New
//                     </button>
//                 </div>

//                 {/* Table */}
//                 {stockItems.length > 0 && (
//                     <div className="overflow-x-auto shadow-md rounded-lg">
//                         <table className="w-full border-collapse">
//                             <thead className="bg-gray-200">
//                                 <tr>
//                                     <th className="p-3 text-left">Select</th>
//                                     <th className="p-3 text-left">Raw Material</th>
//                                     <th className="p-3 text-left">Current Stock</th>
//                                     <th className="p-3 text-left">Unit</th>
//                                     <th className="p-3 text-left">Comments</th>
//                                     <th className="p-3 text-left">Action</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {stockItems.map((item) => (
//                                     <tr key={item.id} className="border-b hover:bg-gray-50">
//                                         <td className="p-3">
//                                             <input
//                                                 type="checkbox"
//                                                 checked={item.checked}
//                                                 onChange={(e) => handleItemChange(item.id, 'checked', e.target.checked)}
//                                                 className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                                             />
//                                         </td>
//                                         <td className="p-3">
//                                             <select
//                                                 value={item.rawMaterial}
//                                                 onChange={(e) => handleItemChange(item.id, 'rawMaterial', e.target.value)}
//                                                 className="w-full border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                             >
//                                                 {rawMaterialOptions[category as keyof typeof rawMaterialOptions].map(material => (
//                                                     <option key={material} value={material}>{material}</option>
//                                                 ))}
//                                             </select>
//                                         </td>
//                                         <td className="p-3">
//                                             <input
//                                                 type="number"
//                                                 value={item.currentStock}
//                                                 onChange={(e) => handleItemChange(item.id, 'currentStock', parseFloat(e.target.value) || 0)}
//                                                 className="w-full border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                                 min="0"
//                                             />
//                                         </td>
//                                         <td className="p-3">
//                                             <select
//                                                 value={item.unit}
//                                                 onChange={(e) => handleItemChange(item.id, 'unit', e.target.value)}
//                                                 className="w-full border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                             >
//                                                 {unitOptions.map(unit => (
//                                                     <option key={unit} value={unit}>{unit}</option>
//                                                 ))}
//                                             </select>
//                                         </td>
//                                         <td className="p-3">
//                                             <input
//                                                 type="text"
//                                                 value={item.comments}
//                                                 onChange={(e) => handleItemChange(item.id, 'comments', e.target.value)}
//                                                 className="w-full border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                             />
//                                         </td>
//                                         <td className="p-3">
//                                             <button
//                                                 onClick={() => handleDelete(item.id)}
//                                                 className="text-red-600 hover:text-red-800 transition"
//                                             >
//                                                 <FaTrash />
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}
//             </div>

//             {/* Form Actions */}
//             <div className="flex justify-between mt-6">
//                 <button
//                     onClick={handleSubmit}
//                     className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
//                     disabled={stockItems.length === 0}
//                 >
//                     Save All
//                 </button>
//                 <Link
//                     to="/"
//                     className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition"
//                 >
//                     Cancel
//                 </Link>
//             </div>
//         </div>
//     );
// };

// export default AddClosingStock;



// AddClosingStock.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash, FaPlus } from 'react-icons/fa';

interface StockItem {
    id: number;
    checked: boolean;
    rawMaterial: string;
    currentStock: number;
    unit: string;
    comments: string;
    errors?: Partial<Record<keyof Omit<StockItem, 'id' | 'checked'>, string>>;
}

const rawMaterialOptions = {
    Dairy: ['Milk', 'Cheese', 'Butter', 'Yogurt'],
    Grains: ['Rice', 'Wheat', 'Oats', 'Barley'],
    Vegetables: ['Potato', 'Carrot', 'Tomato', 'Onion'],
};

const unitOptions = ['kg', 'liters', 'units', 'bags'];

const AddClosingStock: React.FC = () => {
    const navigate = useNavigate();
    const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [category, setCategory] = useState<string>('Dairy');
    const [stockItems, setStockItems] = useState<StockItem[]>([]);
    const [formError, setFormError] = useState<string>('');

    const validateItem = (item: StockItem): StockItem => {
        const errors: Partial<Record<keyof Omit<StockItem, 'id' | 'checked'>, string>> = {};
        if (!item.rawMaterial) errors.rawMaterial = 'Raw material is required';
        if (item.currentStock < 0) errors.currentStock = 'Stock cannot be negative';
        if (!item.unit) errors.unit = 'Unit is required';
        return { ...item, errors: Object.keys(errors).length > 0 ? errors : undefined };
    };

    const addNewItem = () => {
        const newItem: StockItem = {
            id: Date.now(),
            checked: false,
            rawMaterial: rawMaterialOptions[category as keyof typeof rawMaterialOptions][0],
            currentStock: 0,
            unit: unitOptions[0],
            comments: '',
        };
        setStockItems([...stockItems, validateItem(newItem)]);
    };

    const handleItemChange = (id: number, field: keyof StockItem, value: string | number | boolean) => {
        setStockItems(stockItems.map(item => {
            if (item.id !== id) return item;
            const updatedItem = { ...item, [field]: value };
            return validateItem(updatedItem);
        }));
    };

    const handleDelete = (id: number) => {
        setStockItems(stockItems.filter(item => item.id !== id));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validatedItems = stockItems.map(validateItem);
        setStockItems(validatedItems);

        const hasErrors = validatedItems.some(item => item.errors && Object.keys(item.errors).length > 0);
        if (hasErrors) {
            setFormError('Please fix all errors before saving');
            return;
        }

        if (stockItems.length === 0) {
            setFormError('Please add at least one stock item');
            return;
        }

        setFormError('');
        console.log('Stock Items to Save:', { date, category, stockItems });
        navigate('/');
    };

    return (
        <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Closing Stock Details</h1>

                {/* Date Section */}
                <div className="mb-6">
                    <label className="block text-lg font-medium text-gray-700 mb-2">Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full max-w-xs border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                    />
                </div>

                {/* Raw Material Details Section */}
                <div className="mb-6">
                    <label className="block text-lg font-medium text-gray-700 mb-2">Raw Material Details</label>
                    <div className="flex items-center space-x-4 mb-4">
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            {Object.keys(rawMaterialOptions).map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                        <button
                            onClick={addNewItem}
                            className="bg-green-400 text-white px-4 py-2 rounded-md hover:bg-pink-400 transition flex items-center space-x-2"
                        >
                            <FaPlus /> <span>Add New</span>
                        </button>
                    </div>

                    {/* Table */}
                    {stockItems.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="p-3 text-left text-sm font-semibold text-gray-600">Select</th>
                                        <th className="p-3 text-left text-sm font-semibold text-gray-600">Raw Material</th>
                                        <th className="p-3 text-left text-sm font-semibold text-gray-600">Current Stock</th>
                                        <th className="p-3 text-left text-sm font-semibold text-gray-600">Unit</th>
                                        <th className="p-3 text-left text-sm font-semibold text-gray-600">Comments</th>
                                        <th className="p-3 text-left text-sm font-semibold text-gray-600">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stockItems.map((item) => (
                                        <tr key={item.id} className="border-b hover:bg-gray-50">
                                            <td className="p-3">
                                                <input
                                                    type="checkbox"
                                                    checked={item.checked}
                                                    onChange={(e) => handleItemChange(item.id, 'checked', e.target.checked)}
                                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                />
                                            </td>
                                            <td className="p-3">
                                                <select
                                                    value={item.rawMaterial}
                                                    onChange={(e) => handleItemChange(item.id, 'rawMaterial', e.target.value)}
                                                    className={`w-full border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ${item.errors?.rawMaterial ? 'border-red-500' : ''}`}
                                                >
                                                    {rawMaterialOptions[category as keyof typeof rawMaterialOptions].map(material => (
                                                        <option key={material} value={material}>{material}</option>
                                                    ))}
                                                </select>
                                                {item.errors?.rawMaterial && (
                                                    <span className="text-red-500 text-xs mt-1">{item.errors.rawMaterial}</span>
                                                )}
                                            </td>
                                            <td className="p-3">
                                                <input
                                                    type="number"
                                                    value={item.currentStock}
                                                    onChange={(e) => handleItemChange(item.id, 'currentStock', parseFloat(e.target.value) || 0)}
                                                    className={`w-full border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ${item.errors?.currentStock ? 'border-red-500' : ''}`}
                                                    min="0"
                                                />
                                                {item.errors?.currentStock && (
                                                    <span className="text-red-500 text-xs mt-1">{item.errors.currentStock}</span>
                                                )}
                                            </td>
                                            <td className="p-3">
                                                <select
                                                    value={item.unit}
                                                    onChange={(e) => handleItemChange(item.id, 'unit', e.target.value)}
                                                    className={`w-full border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ${item.errors?.unit ? 'border-red-500' : ''}`}
                                                >
                                                    {unitOptions.map(unit => (
                                                        <option key={unit} value={unit}>{unit}</option>
                                                    ))}
                                                </select>
                                                {item.errors?.unit && (
                                                    <span className="text-red-500 text-xs mt-1">{item.errors.unit}</span>
                                                )}
                                            </td>
                                            <td className="p-3">
                                                <input
                                                    type="text"
                                                    value={item.comments}
                                                    onChange={(e) => handleItemChange(item.id, 'comments', e.target.value)}
                                                    className="w-full border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </td>
                                            <td className="p-3">
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="text-red-600 hover:text-red-800 transition"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-gray-500 italic">No items added yet. Click "Add New" to start.</p>
                    )}
                </div>

                {/* Form Error */}
                {formError && (
                    <div className="mb-4 text-red-500 text-sm">{formError}</div>
                )}

                {/* Form Actions */}
                <div className="flex justify-between items-center mt-6">
                    <button
                        onClick={handleSubmit}
                        className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                        disabled={stockItems.length === 0}
                    >
                        Save All
                    </button>
                    <Link
                        to="/"
                        className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition"
                    >
                        Cancel
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AddClosingStock;