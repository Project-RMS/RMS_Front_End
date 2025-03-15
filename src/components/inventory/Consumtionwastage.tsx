// ConsumtionWastage.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface FilterState {
    startDate: string;
    endDate: string;
    status: string;
    category: string;
    categoryWise: string;
    search: string;
}

const ConsumtionWastage: React.FC = () => {
    const [filters, setFilters] = useState<FilterState>({
        startDate: '',
        endDate: '',
        status: '',
        category: '',
        categoryWise: '',
        search: ''
    });

    // Status options
    const statusOptions = [
        { value: '', label: 'All Status' },
        { value: 'pending', label: 'Pending' },
        { value: 'in_progress', label: 'In Progress' },
        { value: 'completed', label: 'Completed' }
    ];

    // Category options
    const categoryOptions = [
        { value: '', label: 'All Categories' },
        { value: 'food', label: 'Food' },
        { value: 'material', label: 'Material' },
        { value: 'equipment', label: 'Equipment' }
    ];

    // Category wise options
    const categoryWiseOptions = [
        { value: '', label: 'All' },
        { value: 'daily', label: 'Daily' },
        { value: 'weekly', label: 'Weekly' },
        { value: 'monthly', label: 'Monthly' }
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleExport = () => {
        // Implement export functionality here
        console.log('Exporting data with filters:', filters);
    };

    const handleShowAll = () => {
        setFilters({
            startDate: '',
            endDate: '',
            status: '',
            category: '',
            categoryWise: '',
            search: ''
        });
    };

    return (
        <div className="w-full bg-gray-100 p-4 shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-4">
                {/* Left Section - Action Buttons */}
                <div className="flex items-center gap-3">
                    <Link
                        to="/consumtion/wastage/add"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                    >
                        Add Wastage
                    </Link>
                    <button
                        onClick={handleExport}
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Export
                    </button>
                </div>

                {/* Right Section - Filters */}
                <div className="flex flex-wrap items-center gap-3">
                    {/* Start Date */}
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-600 mb-1">Start Date</label>
                        <input
                            type="date"
                            name="startDate"
                            value={filters.startDate}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* End Date */}
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-600 mb-1">End Date</label>
                        <input
                            type="date"
                            name="endDate"
                            value={filters.endDate}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Status Dropdown */}
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-600 mb-1">Status</label>
                        <select
                            name="status"
                            value={filters.status}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[120px]"
                        >
                            {statusOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Category Dropdown */}
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-600 mb-1">Category</label>
                        <select
                            name="category"
                            value={filters.category}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[120px]"
                        >
                            {categoryOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Category Wise Dropdown */}
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-600 mb-1">Category Wise</label>
                        <select
                            name="categoryWise"
                            value={filters.categoryWise}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[120px]"
                        >
                            {categoryWiseOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Search */}
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-600 mb-1">Search</label>
                        <input
                            type="text"
                            name="search"
                            value={filters.search}
                            onChange={handleInputChange}
                            placeholder="Search wastage..."
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[200px]"
                        />
                    </div>

                    {/* Show All Button */}
                    <button
                        onClick={handleShowAll}
                        className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200 mt-6"
                    >
                        Show All
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConsumtionWastage;