import React, { useState } from 'react';

// Types
interface RawMaterial {
    id: string;
    name: string;
    unit: string;
    selected: boolean;
}

interface MenuItem {
    id: string;
    name: string;
    area: string;
    checked: boolean;
}

const AreaRecipe: React.FC = () => {
    // State
    const [topSearchTerm, setTopSearchTerm] = useState('');
    const [materialSearchTerm, setMaterialSearchTerm] = useState('');
    const [menuSearchTerm, setMenuSearchTerm] = useState('');
    const [materials, setMaterials] = useState<RawMaterial[]>([
        { id: '1', name: 'Flour', unit: 'kg', selected: false },
        { id: '2', name: 'Sugar', unit: 'g', selected: false },
        { id: '3', name: 'Butter', unit: 'g', selected: false },
        { id: '4', name: 'Eggs', unit: 'pcs', selected: false },
    ]);
    const [menuItems, setMenuItems] = useState<MenuItem[]>([
        { id: '1', name: 'Cake', area: 'Bakery', checked: false },
        { id: '2', name: 'Cookies', area: 'Bakery', checked: false },
        { id: '3', name: 'Bread', area: 'Bakery', checked: false },
    ]);

    // Handlers
    const handleRadioChange = (id: string) => {
        const updatedMaterials = materials.map(material => ({
            ...material,
            selected: material.id === id
        }));
        setMaterials(updatedMaterials);
    };

    const handleAddMaterial = () => {
        if (materialSearchTerm.trim()) {
            setMaterials([...materials, {
                id: Date.now().toString(),
                name: materialSearchTerm.trim(),
                unit: 'unit',
                selected: false
            }]);
            setMaterialSearchTerm('');
        }
    };

    const handleCheckboxChange = (id: string) => {
        const updatedItems = menuItems.map(item =>
            item.id === id ? { ...item, checked: !item.checked } : item
        );
        setMenuItems(updatedItems);
    };

    const handleAddMenuItem = () => {
        if (menuSearchTerm.trim()) {
            setMenuItems([...menuItems, {
                id: Date.now().toString(),
                name: menuSearchTerm.trim(),
                area: 'Custom',
                checked: false
            }]);
            setMenuSearchTerm('');
        }
    };

    const handleSave = () => {
        const selectedMaterial = materials.find(m => m.selected);
        const selectedItems = menuItems.filter(item => item.checked);
        alert(`Recipe Saved!\nMaterial: ${selectedMaterial?.name || 'None'} ${selectedMaterial?.unit || ''}\nItems: ${selectedItems.map(i => `${i.name} (${i.area})`).join(', ') || 'None'}`);
    };

    const handleCancel = () => {
        setMaterials(materials.map(m => ({ ...m, selected: false })));
        setMenuItems(menuItems.map(i => ({ ...i, checked: false })));
        setMaterialSearchTerm('');
        setMenuSearchTerm('');
        setTopSearchTerm('');
    };

    // Filtering
    const filteredMaterials = materials.filter(m =>
        m.name.toLowerCase().includes(materialSearchTerm.toLowerCase()) &&
        m.name.toLowerCase().includes(topSearchTerm.toLowerCase())
    );

    const filteredMenuItems = menuItems.filter(i =>
        i.name.toLowerCase().includes(menuSearchTerm.toLowerCase()) &&
        i.name.toLowerCase().includes(topSearchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Top Search Area */}
                <div className="bg-white border rounded-lg p-6 mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Area Recipe Maker</h1>
                    <input
                        type="text"
                        placeholder="Search all items..."
                        value={topSearchTerm}
                        onChange={(e) => setTopSearchTerm(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                {/* Cards Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Raw Materials Card */}
                    <div className="bg-white border rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Step 1: Raw Materials</h2>

                        <div className="mb-4 flex gap-2">
                            <input
                                type="text"
                                placeholder="Search or add material..."
                                value={materialSearchTerm}
                                onChange={(e) => setMaterialSearchTerm(e.target.value)}
                                className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button
                                onClick={handleAddMaterial}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Add
                            </button>
                        </div>

                        <div className="space-y-2 max-h-96 overflow-y-auto">
                            {filteredMaterials.map(material => (
                                <div key={material.id} className="flex items-center">
                                    <input
                                        type="radio"
                                        id={material.id}
                                        name="material"
                                        checked={material.selected}
                                        onChange={() => handleRadioChange(material.id)}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <label htmlFor={material.id} className="ml-2 flex-1 text-gray-700">
                                        {material.name} <span className="text-gray-500">({material.unit})</span>
                                    </label>
                                </div>
                            ))}
                            {filteredMaterials.length === 0 && (
                                <p className="text-gray-500 text-center py-2">No materials found</p>
                            )}
                        </div>

                        <div className="mt-4 text-sm text-gray-600">
                            Selected: {materials.find(m => m.selected)?.name || 'None'}
                        </div>
                    </div>

                    {/* Menu Items Card */}
                    <div className="bg-white border rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Step 2: Menu Items</h2>

                        <div className="mb-4 flex gap-2">
                            <input
                                type="text"
                                placeholder="Search or add item..."
                                value={menuSearchTerm}
                                onChange={(e) => setMenuSearchTerm(e.target.value)}
                                className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button
                                onClick={handleAddMenuItem}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Add
                            </button>
                        </div>

                        <div className="space-y-2 max-h-96 overflow-y-auto">
                            {filteredMenuItems.map(item => (
                                <div key={item.id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={item.id}
                                        checked={item.checked}
                                        onChange={() => handleCheckboxChange(item.id)}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <label htmlFor={item.id} className="ml-2 flex-1 text-gray-700">
                                        {item.name} <span className="text-gray-500">({item.area})</span>
                                    </label>
                                </div>
                            ))}
                            {filteredMenuItems.length === 0 && (
                                <p className="text-gray-500 text-center py-2">No items found</p>
                            )}
                        </div>

                        <div className="mt-6 flex justify-between items-center">
                            <span className="text-sm text-gray-600">
                                Selected: {menuItems.filter(i => i.checked).length} items
                            </span>
                            <div className="space-x-2">
                                <button
                                    onClick={handleCancel}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AreaRecipe;