// CopyRecipe.tsx
import React, { useState } from 'react';

interface MenuItem {
    id: number;
    name: string;
}

const CopyRecipe: React.FC = () => {
    // State management
    const [copyFromSearch, setCopyFromSearch] = useState('');
    const [copyToSearch, setCopyToSearch] = useState('');
    const [selectedFromItem, setSelectedFromItem] = useState<number | null>(null);
    const [selectedToItems, setSelectedToItems] = useState<number[]>([]);
    const [fromItems, setFromItems] = useState<MenuItem[]>([
        { id: 1, name: "Margherita Pizza" },
        { id: 2, name: "Pepperoni Pizza" },
        { id: 3, name: "Pasta Alfredo" },
        { id: 4, name: "Garlic Bread" },
    ]);
    const [toItems, setToItems] = useState<MenuItem[]>([
        { id: 1, name: "Cheese Pizza" },
        { id: 2, name: "Spaghetti" },
        { id: 3, name: "Lasagna" },
        { id: 4, name: "Breadsticks" },
    ]);
    const [newFromItem, setNewFromItem] = useState('');
    const [newToItem, setNewToItem] = useState('');

    // Filter functions
    const filteredFromItems = fromItems.filter(item =>
        item.name.toLowerCase().includes(copyFromSearch.toLowerCase())
    );

    const filteredToItems = toItems.filter(item =>
        item.name.toLowerCase().includes(copyToSearch.toLowerCase())
    );

    // Handle selections
    const handleFromSelect = (id: number) => {
        setSelectedFromItem(id);
    };

    const handleToSelect = (id: number) => {
        setSelectedToItems(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    };

    // Add new items
    const addFromItem = () => {
        if (!newFromItem.trim()) return;
        const newId = Math.max(...fromItems.map(item => item.id), 0) + 1;
        setFromItems([...fromItems, { id: newId, name: newFromItem.trim() }]);
        setNewFromItem('');
    };

    const addToItem = () => {
        if (!newToItem.trim()) return;
        const newId = Math.max(...toItems.map(item => item.id), 0) + 1;
        setToItems([...toItems, { id: newId, name: newToItem.trim() }]);
        setNewToItem('');
    };

    // Handle save
    const handleSave = () => {
        if (selectedFromItem === null) {
            alert('Please select an item to copy from');
            return;
        }
        if (selectedToItems.length === 0) {
            alert('Please select at least one destination');
            return;
        }

        const fromItem = fromItems.find(item => item.id === selectedFromItem);
        console.log('Copying:', fromItem, 'to:', selectedToItems);
        // Add your save logic here (e.g., API call)

        handleCancel();
    };

    // Handle cancel
    const handleCancel = () => {
        setSelectedFromItem(null);
        setSelectedToItems([]);
        setCopyFromSearch('');
        setCopyToSearch('');
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 w-full">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Left Card - Copy From */}
                    <div className="flex-1 bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Copy From</h2>

                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Search Margherita..."
                                value={copyFromSearch}
                                onChange={(e) => setCopyFromSearch(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Add Item Form */}
                        <div className="mb-4 flex gap-2">
                            <input
                                type="text"
                                placeholder="Add new item..."
                                value={newFromItem}
                                onChange={(e) => setNewFromItem(e.target.value)}
                                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                onClick={addFromItem}
                                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                            >
                                Add
                            </button>
                        </div>

                        <div className="overflow-x-auto max-h-96 overflow-y-auto">
                            <table className="w-full text-left">
                                <thead className="sticky top-0 bg-gray-200">
                                    <tr>
                                        <th className="p-3 w-16">#</th>
                                        <th className="p-3">Menu Item Name</th>
                                        <th className="p-3 w-16">Select</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredFromItems.map((item) => (
                                        <tr key={item.id} className="border-b hover:bg-gray-50">
                                            <td className="p-3">{item.id}</td>
                                            <td className="p-3">{item.name}</td>
                                            <td className="p-3">
                                                <input
                                                    type="radio"
                                                    name="fromItem"
                                                    checked={selectedFromItem === item.id}
                                                    onChange={() => handleFromSelect(item.id)}
                                                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Right Card - Copy To */}
                    <div className="flex-1 bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Copy To</h2>

                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={copyToSearch}
                                onChange={(e) => setCopyToSearch(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Add Item Form */}
                        <div className="mb-4 flex gap-2">
                            <input
                                type="text"
                                placeholder="Add new item..."
                                value={newToItem}
                                onChange={(e) => setNewToItem(e.target.value)}
                                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                onClick={addToItem}
                                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                            >
                                Add
                            </button>
                        </div>

                        <div className="overflow-x-auto max-h-96 overflow-y-auto">
                            <table className="w-full text-left">
                                <thead className="sticky top-0 bg-gray-200">
                                    <tr>
                                        <th className="p-3 w-16">#</th>
                                        <th className="p-3">Menu Item Name</th>
                                        <th className="p-3 w-16">Select</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredToItems.map((item) => (
                                        <tr key={item.id} className="border-b hover:bg-gray-50">
                                            <td className="p-3">{item.id}</td>
                                            <td className="p-3">{item.name}</td>
                                            <td className="p-3">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedToItems.includes(item.id)}
                                                    onChange={() => handleToSelect(item.id)}
                                                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="mt-6 flex justify-end gap-4">
                    <button
                        onClick={handleCancel}
                        className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CopyRecipe;