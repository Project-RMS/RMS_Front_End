// src/components/AddRecipe.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaTrash, FaSave, FaTimes } from 'react-icons/fa';

interface RecipeItem {
    id: number;
    name: string;
    qty: number;
    unit: string;
    area: string;
}

const AddRecipe: React.FC = () => {
    const navigate = useNavigate();

    // State management
    const [selectedRecipeType, setSelectedRecipeType] = useState('');
    const [recipeName, setRecipeName] = useState('');
    const [items, setItems] = useState<RecipeItem[]>([]);
    const [newItem, setNewItem] = useState({
        name: '',
        qty: 0,
        unit: '',
        area: ''
    });

    // Recipe type options
    const recipeTypes = [
        { value: 'breakfast', label: 'Breakfast' },
        { value: 'lunch', label: 'Lunch' },
        { value: 'dinner', label: 'Dinner' },
        { value: 'dessert', label: 'Dessert' },
    ];

    // Unit options
    const unitOptions = ['g', 'kg', 'ml', 'l', 'pcs', 'tbsp', 'tsp'];

    // Handle adding new item
    const handleAddItem = () => {
        if (!newItem.name || newItem.qty <= 0 || !newItem.unit || !newItem.area) {
            alert('Please fill all fields for the new item');
            return;
        }

        const item: RecipeItem = {
            id: Date.now(), // Simple unique ID
            ...newItem
        };

        setItems([...items, item]);
        setNewItem({ name: '', qty: 0, unit: '', area: '' });
    };

    // Handle deleting item
    const handleDeleteItem = (id: number) => {
        setItems(items.filter(item => item.id !== id));
    };

    // Handle save recipe
    const handleSave = () => {
        if (!selectedRecipeType || !recipeName || items.length === 0) {
            alert('Please select recipe type, enter a name, and add at least one item');
            return;
        }

        const recipeData = {
            type: selectedRecipeType,
            name: recipeName,
            items: items,
            createdDate: new Date(),
        };

        console.log('Saving recipe:', recipeData);
        // Add your API call here to save the recipe
        navigate('/'); // Redirect to recipe management page
    };

    // Handle cancel
    const handleCancel = () => {
        if (window.confirm('Are you sure you want to cancel? All changes will be lost.')) {
            navigate('/');
        }
    };

    return (
        <div className="w-full min-h-screen bg-gray-50 p-6">
            {/* Recipe Type Selector */}
            <div className="mb-6">
                <select
                    value={selectedRecipeType}
                    onChange={(e) => setSelectedRecipeType(e.target.value)}
                    className="w-full max-w-xs px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 text-blue-700"
                >
                    <option value="">Select Recipe Type</option>
                    {recipeTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                            {type.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Recipe Name */}
            <div className="mb-6">
                <input
                    type="text"
                    value={recipeName}
                    onChange={(e) => setRecipeName(e.target.value)}
                    placeholder="Enter recipe name"
                    className="w-full max-w-md px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
                {recipeName && (
                    <button
                        onClick={handleSave}
                        className="btn-primary mt-2 ml-4"
                    >
                        <FaSave className="mr-2" /> Save Recipe
                    </button>
                )}
            </div>

            {/* Selected Recipe Heading */}
            {recipeName && (
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-blue-700">
                        {recipeName} Ingredients
                    </h2>
                </div>
            )}

            {/* Items Table */}
            <div className="bg-white rounded-lg shadow overflow-x-auto mb-6">
                <table className="w-full">
                    <thead className="bg-blue-50">
                        <tr>
                            <th className="p-3 text-left text-blue-700">Name</th>
                            <th className="p-3 text-left text-blue-700">Quantity</th>
                            <th className="p-3 text-left text-blue-700">Unit</th>
                            <th className="p-3 text-left text-blue-700">Area</th>
                            <th className="p-3 text-left text-blue-700">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id} className="border-t hover:bg-blue-50">
                                <td className="p-3">{item.name}</td>
                                <td className="p-3">{item.qty}</td>
                                <td className="p-3">{item.unit}</td>
                                <td className="p-3">{item.area}</td>
                                <td className="p-3">
                                    <button
                                        onClick={() => handleDeleteItem(item.id)}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {items.length === 0 && (
                    <div className="p-4 text-center text-blue-600">
                        No items added yet
                    </div>
                )}
            </div>

            {/* Add New Item Form */}
            <div className="bg-white p-4 rounded-lg shadow mb-6">
                <h3 className="text-lg font-medium text-blue-700 mb-4">Add New Item</h3>
                <div className="flex flex-wrap items-center gap-4">
                    <input
                        type="text"
                        value={newItem.name}
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                        placeholder="Item name"
                        className="flex-1 min-w-[200px] px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                    <input
                        type="number"
                        value={newItem.qty || ''}
                        onChange={(e) => setNewItem({ ...newItem, qty: parseFloat(e.target.value) || 0 })}
                        placeholder="Quantity"
                        min="0"
                        step="0.1"
                        className="w-32 px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                    <select
                        value={newItem.unit}
                        onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                        className="w-32 px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:border-blue-500"
                    >
                        <option value="">Unit</option>
                        {unitOptions.map((unit) => (
                            <option key={unit} value={unit}>
                                {unit}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        value={newItem.area}
                        onChange={(e) => setNewItem({ ...newItem, area: e.target.value })}
                        placeholder="Area"
                        className="flex-1 min-w-[200px] px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                    <button
                        onClick={handleAddItem}
                        className="btn-primary"
                    >
                        <FaPlus className="mr-2" /> Add Item
                    </button>
                </div>
            </div>

            {/* Save and Cancel Buttons */}
            <div className="flex justify-end gap-4">
                <button
                    onClick={handleSave}
                    className="btn-primary"
                >
                    <FaSave className="mr-2" /> Save Recipe
                </button>
                <button
                    onClick={handleCancel}
                    className="btn-secondary"
                >
                    <FaTimes className="mr-2" /> Cancel
                </button>
            </div>
        </div>
    );
};

export default AddRecipe;