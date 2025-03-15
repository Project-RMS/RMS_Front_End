// RawMaterialConversion.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiCopy, FiTrash2, FiDownload } from 'react-icons/fi';

interface Conversion {
    id: number;
    name: string;
    category: string;
    qty: number;
    createdDate: string;
    modifiedDate: string;
    selected: boolean;
}

const RawMaterialconversion: React.FC = () => {
    // State declarations
    const [conversions, setConversions] = useState<Conversion[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [conversionType, setConversionType] = useState<string>('standard');

    // Sample categories for dropdown
    const categories = ['All', 'Metals', 'Plastics', 'Composites', 'Others'];
    const conversionTypes = ['Conversion', 'Custom', 'Batch', 'Special'];

    // Initial data
    useEffect(() => {
        const sampleData: Conversion[] = [
            {
                id: 1,
                name: 'Steel Rod',
                category: 'Metals',
                qty: 100,
                createdDate: '2025-03-01',
                modifiedDate: '2025-03-05',
                selected: false
            },
            {
                id: 2,
                name: 'Plastic Sheet',
                category: 'Plastics',
                qty: 50,
                createdDate: '2025-03-02',
                modifiedDate: '2025-03-06',
                selected: false
            }
        ];
        setConversions(sampleData);
    }, []);

    // Handle checkbox selection
    const handleSelect = (id: number) => {
        setConversions(prev =>
            prev.map(conv =>
                conv.id === id ? { ...conv, selected: !conv.selected } : conv
            )
        );
    };

    // Handle search
    const filteredConversions = conversions.filter(conv => {
        const matchesSearch = conv.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || conv.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Handle copy conversion
    const handleCopy = () => {
        const selected = conversions.filter(conv => conv.selected);
        if (selected.length === 0) {
            alert('Please select at least one conversion to copy');
            return;
        }
        const newConversions = selected.map(conv => ({
            ...conv,
            id: Date.now() + Math.random(),
            selected: false,
            createdDate: new Date().toISOString().split('T')[0]
        }));
        setConversions(prev => [...prev, ...newConversions]);
    };

    // Handle delete multiple
    const handleDelete = () => {
        const selectedCount = conversions.filter(conv => conv.selected).length;
        if (selectedCount === 0) {
            alert('Please select at least one conversion to delete');
            return;
        }
        if (window.confirm(`Are you sure you want to delete ${selectedCount} conversion(s)?`)) {
            setConversions(prev => prev.filter(conv => !conv.selected));
        }
    };

    // Handle export to Excel
    const handleExport = () => {
        const csvContent = [
            ['Name', 'Category', 'Quantity', 'Created Date', 'Modified Date'],
            ...conversions.map(conv => [
                conv.name,
                conv.category,
                conv.qty,
                conv.createdDate,
                conv.modifiedDate
            ])
        ]
            .map(row => row.join(','))
            .join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'conversions.csv';
        link.click();
    };

    // Reset filters
    const handleShowAll = () => {
        setSearchTerm('');
        setSelectedCategory('All');
    };

    return (
        <div className="w-full min-h-screen bg-gray-100 p-6">
            {/* Top Bar */}
            <div className="w-full bg-white shadow-md p-4 mb-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h1 className="text-xl font-semibold text-gray-800">Raw Material Conversion</h1>
                        <Link
                            to="/conversion/raw-material/add"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                        >
                            Setup Raw Material Conversion
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <select
                            value={conversionType}
                            onChange={(e) => setConversionType(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {conversionTypes.map(type => (
                                <option key={type} value={type.toLowerCase()}>
                                    {type}
                                </option>
                            ))}
                        </select>
                        <button
                            onClick={handleExport}
                            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                        >
                            <FiDownload /> Export Excel
                        </button>
                    </div>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="w-full bg-white shadow-md p-4 mb-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <input
                            type="text"
                            placeholder="Name"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                        <button
                            onClick={() => { }}
                            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                        >
                            <FiSearch /> Search
                        </button>
                        <button
                            onClick={handleShowAll}
                            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                        >
                            Show All
                        </button>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleCopy}
                            className="flex items-center gap-2 bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition"
                        >
                            <FiCopy /> Copy Conversion
                        </button>
                        <button
                            onClick={handleDelete}
                            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                        >
                            <FiTrash2 /> Delete Multiple Conversion
                        </button>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="w-full bg-white shadow-md overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-4">
                                <input
                                    type="checkbox"
                                    onChange={(e) => {
                                        setConversions(prev =>
                                            prev.map(conv => ({ ...conv, selected: e.target.checked }))
                                        );
                                    }}
                                    checked={conversions.every(conv => conv.selected)}
                                />
                            </th>
                            <th className="p-4">Name</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Qty</th>
                            <th className="p-4">Created Date</th>
                            <th className="p-4">Modified Date</th>
                            <th className="p-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredConversions.map(conv => (
                            <tr key={conv.id} className="border-b hover:bg-gray-50">
                                <td className="p-4">
                                    <input
                                        type="checkbox"
                                        checked={conv.selected}
                                        onChange={() => handleSelect(conv.id)}
                                    />
                                </td>
                                <td className="p-4">{conv.name}</td>
                                <td className="p-4">{conv.category}</td>
                                <td className="p-4">{conv.qty}</td>
                                <td className="p-4">{conv.createdDate}</td>
                                <td className="p-4">{conv.modifiedDate}</td>
                                <td className="p-4">
                                    <button className="text-blue-600 hover:underline">Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RawMaterialconversion;