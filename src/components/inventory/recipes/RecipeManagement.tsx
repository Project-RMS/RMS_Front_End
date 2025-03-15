// src/components/RecipeManagement.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    FaPlus,
    FaCopy,
    FaSearch,
    FaTrash,
    FaEdit,
    FaFileExport,
    FaFileImport,
    FaCalendarAlt,
    FaRedo
} from 'react-icons/fa';

interface Recipe {
    id: number;
    name: string;
    modifiedDate: Date;
    createdBy: string;
    modifiedBy: string;
}

const RecipeManagement: React.FC = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [selectedRecipes, setSelectedRecipes] = useState<number[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [dateRange, setDateRange] = useState<{ start: string; end: string }>({ start: '', end: '' });

    // Initialize sample data
    useEffect(() => {
        const sampleRecipes: Recipe[] = [
            { id: 1, name: "Chocolate Cake", modifiedDate: new Date("2025-03-10"), createdBy: "John", modifiedBy: "John" },
            { id: 2, name: "Pizza Dough", modifiedDate: new Date("2025-03-09"), createdBy: "Mary", modifiedBy: "Mary" },
        ];
        setRecipes(sampleRecipes);
    }, []);

    // Selection handlers
    const handleSelectRecipe = (id: number) => {
        setSelectedRecipes(prev =>
            prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        setSelectedRecipes(selectedRecipes.length === recipes.length ? [] : recipes.map(r => r.id));
    };

    // Delete handler
    const handleDeleteMultiple = () => {
        if (selectedRecipes.length === 0) return alert("Please select recipes to delete");
        if (window.confirm(`Delete ${selectedRecipes.length} recipes?`)) {
            setRecipes(recipes.filter(r => !selectedRecipes.includes(r.id)));
            setSelectedRecipes([]);
        }
    };

    // Filter recipes
    const filteredRecipes = recipes.filter(recipe => {
        const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
        const recipeDate = recipe.modifiedDate;
        const startDate = dateRange.start ? new Date(dateRange.start) : null;
        const endDate = dateRange.end ? new Date(dateRange.end) : null;

        const matchesDate = (!startDate || recipeDate >= startDate) &&
            (!endDate || recipeDate <= endDate);

        return matchesSearch && matchesDate;
    });

    // Format date for display
    const formatDate = (date: Date) => date.toLocaleDateString();

    return (
        <div className="w-full min-h-screen bg-gray-50 p-6">
            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
                <div className="flex flex-wrap gap-3">
                    <Link to="/recipes-management/add-recipe" className="btn-primary">
                        <FaPlus className="mr-2" /> Add New Recipe
                    </Link>
                    <Link to="/recipes-management/quick-recipe" className="btn-primary">
                        <FaPlus className="mr-2" /> Quick Recipe
                    </Link>
                    <Link to="/recipes-management/area-recipe" className="btn-primary">
                        <FaPlus className="mr-2" /> Area Recipe
                    </Link>
                    <Link to="/recipes-management/copy-recipe" className="btn-primary">
                        <FaCopy className="mr-2" /> Copy Recipe
                    </Link>
                </div>
                <div className="flex gap-3">
                    <select className="btn-select">
                        <option value="">Import <FaFileImport className="inline ml-2" /></option>
                        <option value="csv">CSV</option>
                        <option value="json">JSON</option>
                        <option value="xml">XML</option>
                    </select>
                    <select className="btn-select">
                        <option value="">Export <FaFileExport className="inline ml-2" /></option>
                        <option value="csv">CSV</option>
                        <option value="json">JSON</option>
                        <option value="pdf">PDF</option>
                    </select>
                    <button onClick={handleDeleteMultiple} className="btn-danger">
                        <FaTrash className="mr-2" /> Delete Selected
                    </button>
                </div>
            </div>

            {/* Filter Section */}
            <div className="bg-white p-4 rounded-lg shadow mb-6">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="relative flex-1 min-w-[200px]">
                        <input
                            type="text"
                            placeholder="Search recipes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
                    </div>

                   

                    <button className="btn-primary">
                        <FaSearch className="mr-2" /> Search
                    </button>
                    <button
                        onClick={() => {
                            setSearchTerm('');
                            setDateRange({ start: '', end: '' });
                        }}
                        className="btn-secondary"
                    >
                        <FaRedo className="mr-2" /> Show ALL
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-blue-50">
                        <tr>
                            <th className="p-3 text-left">
                                <input
                                    type="checkbox"
                                    checked={selectedRecipes.length === recipes.length && recipes.length > 0}
                                    onChange={handleSelectAll}
                                />
                            </th>
                            <th className="p-3 text-left text-blue-700">Name</th>
                            <th className="p-3 text-left text-blue-700">Modified Date</th>
                            <th className="p-3 text-left text-blue-700">Created By</th>
                            <th className="p-3 text-left text-blue-700">Modified By</th>
                            <th className="p-3 text-left text-blue-700">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRecipes.map((recipe) => (
                            <tr key={recipe.id} className="border-t hover:bg-blue-50">
                                <td className="p-3">
                                    <input
                                        type="checkbox"
                                        checked={selectedRecipes.includes(recipe.id)}
                                        onChange={() => handleSelectRecipe(recipe.id)}
                                    />
                                </td>
                                <td className="p-3">{recipe.name}</td>
                                <td className="p-3">{formatDate(recipe.modifiedDate)}</td>
                                <td className="p-3">{recipe.createdBy}</td>
                                <td className="p-3">{recipe.modifiedBy}</td>
                                <td className="p-3">
                                    <div className="flex gap-3">
                                        <button className="text-blue-600 hover:text-blue-800">
                                            <FaEdit />
                                        </button>
                                        <button className="text-blue-600 hover:text-blue-800">
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredRecipes.length === 0 && (
                    <div className="p-4 text-center text-blue-600">No recipes found</div>
                )}
            </div>
        </div>
    );
};

export default RecipeManagement;