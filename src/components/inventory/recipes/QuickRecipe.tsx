import React, { useState } from 'react';

// Types
interface RawMaterial {
    id: string;
    name: string;
    selected: boolean;
}

interface MenuItem {
    id: string;
    name: string;
    quantity: number;
    checked: boolean;
}

const QuickRecipe: React.FC = () => {
    // State for Raw Materials
    const [materialSearchTerm, setMaterialSearchTerm] = useState('');
    const [materials, setMaterials] = useState<RawMaterial[]>([
        { id: '1', name: 'Flour', selected: false },
        { id: '2', name: 'Sugar', selected: false },
        { id: '3', name: 'Butter', selected: false },
        { id: '4', name: 'Eggs', selected: false },
        { id: '5', name: 'Milk', selected: false },
    ]);

    // State for Menu Items
    const [menuSearchTerm, setMenuSearchTerm] = useState('');
    const [menuItems, setMenuItems] = useState<MenuItem[]>([
        { id: '1', name: 'Cake', quantity: 0, checked: false },
        { id: '2', name: 'Cookies', quantity: 0, checked: false },
        { id: '3', name: 'Bread', quantity: 0, checked: false },
        { id: '4', name: 'Muffins', quantity: 0, checked: false },
    ]);

    // Raw Materials Handlers
    const handleRadioChange = (id: string) => {
        const updatedMaterials = materials.map(material => ({
            ...material,
            selected: material.id === id
        }));
        setMaterials(updatedMaterials);
    };

    const filteredMaterials = materials.filter(material =>
        material.name.toLowerCase().includes(materialSearchTerm.toLowerCase())
    );

    // Menu Items Handlers
    const handleCheckboxChange = (id: string) => {
        const updatedItems = menuItems.map(item =>
            item.id === id ? { ...item, checked: !item.checked } : item
        );
        setMenuItems(updatedItems);
    };

    const handleQuantityChange = (id: string, value: number) => {
        const updatedItems = menuItems.map(item =>
            item.id === id ? { ...item, quantity: Math.max(0, value) } : item
        );
        setMenuItems(updatedItems);
    };

    const handleSave = () => {
        const selectedMaterials = materials.filter(m => m.selected);
        const selectedItems = menuItems.filter(item => item.checked && item.quantity > 0);
        console.log('Saved recipe:', { rawMaterials: selectedMaterials, menuItems: selectedItems });
        alert('Recipe saved successfully!\n\nSelected Materials: ' +
            selectedMaterials.map(m => m.name).join(', ') +
            '\nMenu Items: ' +
            selectedItems.map(i => `${i.name} (${i.quantity})`).join(', ')
        );
    };

    const handleCancel = () => {
        setMaterials(materials.map(material => ({ ...material, selected: false })));
        setMenuItems(menuItems.map(item => ({ ...item, checked: false, quantity: 0 })));
        setMaterialSearchTerm('');
        setMenuSearchTerm('');
    };

    const filteredMenuItems = menuItems.filter(item =>
        item.name.toLowerCase().includes(menuSearchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-10 text-gray-800 bg-white py-4 rounded-lg shadow">
                    Quick Recipe Maker
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Raw Materials Card - Left Side */}
                    <div className="bg-white shadow-xl rounded-xl overflow-hidden flex flex-col h-[calc(100vh-12rem)]">
                        <div className="bg-blue-600 p-4">
                            <h2 className="text-2xl font-semibold text-white">Step 1 - Raw Materials</h2>
                            <p className="text-blue-100 text-sm mt-1">Select one primary ingredient</p>
                        </div>

                        <div className="p-6 flex-1 overflow-y-auto">
                            <div className="mb-5">
                                <input
                                    type="text"
                                    placeholder="Search raw materials..."
                                    value={materialSearchTerm}
                                    onChange={(e) => setMaterialSearchTerm(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                                />
                            </div>

                            <div className="space-y-4">
                                {filteredMaterials.map(material => (
                                    <div
                                        key={material.id}
                                        className="flex items-center p-2 hover:bg-gray-50 rounded-md transition-colors"
                                    >
                                        <input
                                            type="radio"
                                            id={material.id}
                                            name="rawMaterial"
                                            checked={material.selected}
                                            onChange={() => handleRadioChange(material.id)}
                                            className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                                        />
                                        <label
                                            htmlFor={material.id}
                                            className="ml-3 text-gray-700 text-lg cursor-pointer flex-1"
                                        >
                                            {material.name}
                                        </label>
                                    </div>
                                ))}
                                {filteredMaterials.length === 0 && (
                                    <p className="text-gray-500 text-center">No materials found</p>
                                )}
                            </div>
                        </div>

                        <div className="p-4 bg-gray-50 border-t">
                            <p className="text-sm text-gray-600">
                                Selected: {materials.find(m => m.selected)?.name || 'None'}
                            </p>
                        </div>
                    </div>

                    {/* Menu Items Card - Right Side */}
                    <div className="bg-white shadow-xl rounded-xl overflow-hidden flex flex-col h-[calc(100vh-12rem)]">
                        <div className="bg-green-600 p-4">
                            <h2 className="text-2xl font-semibold text-white">Step 2 - Menu Items</h2>
                            <p className="text-green-100 text-sm mt-1">Select items and quantities</p>
                        </div>

                        <div className="p-6 flex-1 overflow-y-auto">
                            <div className="mb-5">
                                <input
                                    type="text"
                                    placeholder="Search menu items..."
                                    value={menuSearchTerm}
                                    onChange={(e) => setMenuSearchTerm(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm"
                                />
                            </div>

                            <div className="space-y-4">
                                {filteredMenuItems.map(item => (
                                    <div
                                        key={item.id}
                                        className="flex items-center p-2 hover:bg-gray-50 rounded-md transition-colors"
                                    >
                                        <input
                                            type="checkbox"
                                            id={item.id}
                                            checked={item.checked}
                                            onChange={() => handleCheckboxChange(item.id)}
                                            className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300"
                                        />
                                        <label
                                            htmlFor={item.id}
                                            className="ml-3 text-gray-700 text-lg flex-1 cursor-pointer"
                                        >
                                            {item.name}
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={item.quantity}
                                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 0)}
                                            className="w-20 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed shadow-sm"
                                            disabled={!item.checked}
                                        />
                                    </div>
                                ))}
                                {filteredMenuItems.length === 0 && (
                                    <p className="text-gray-500 text-center">No items found</p>
                                )}
                            </div>
                        </div>

                        <div className="p-4 bg-gray-50 border-t flex justify-between items-center">
                            <p className="text-sm text-gray-600">
                                Selected: {menuItems.filter(i => i.checked).length} items
                            </p>
                            <div className="space-x-3">
                                <button
                                    onClick={handleCancel}
                                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                                >
                                    Save Recipe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuickRecipe;