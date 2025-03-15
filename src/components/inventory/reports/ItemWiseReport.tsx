// src/components/TransferReportFilter.tsx
import React, { useState, FormEvent } from 'react';

// Define types
interface FilterState {
    exportType: string;
    below: string;
    rawMaterial: string;
    category: string;
    salesType: string;
    fromDate: string;
    toDate: string;
}

interface TransferReportFilterProps {
    onSearch: (filters: FilterState) => void;
    onShowAll: () => void;
}

const TransferReportFilter: React.FC<TransferReportFilterProps> = ({ onSearch, onShowAll }) => {
    // Initial state
    const [filters, setFilters] = useState<FilterState>({
        exportType: 'pdf',
        below: 'all',
        rawMaterial: '',
        category: 'all',
        salesType: 'all',
        fromDate: '',
        toDate: '',
    });

    // Dropdown options
    const exportOptions = [
        { value: 'pdf', label: 'PDF' },
        { value: 'excel', label: 'Excel' },
        { value: 'csv', label: 'CSV' },
    ];

    const belowOptions = [
        { value: 'all', label: 'All' },
        { value: 'warehouse', label: 'Warehouse' },
        { value: 'store', label: 'Store' },
        { value: 'department', label: 'Department' },
    ];

    const categoryOptions = [
        { value: 'all', label: 'All Categories' },
        { value: 'electronics', label: 'Electronics' },
        { value: 'furniture', label: 'Furniture' },
        { value: 'clothing', label: 'Clothing' },
    ];

    const salesTypeOptions = [
        { value: 'all', label: 'All Types' },
        { value: 'retail', label: 'Retail' },
        { value: 'wholesale', label: 'Wholesale' },
        { value: 'transfer', label: 'Transfer' },
    ];

    // Handle input changes
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle search submission
    const handleSearch = (e: FormEvent) => {
        e.preventDefault();

        // Date validation
        if (filters.fromDate && filters.toDate) {
            if (new Date(filters.fromDate) > new Date(filters.toDate)) {
                alert('From Date cannot be later than To Date');
                return;
            }
        }

        onSearch(filters);
    };

    // Handle show all
    const handleShowAll = () => {
        const resetFilters: FilterState = {
            exportType: 'pdf',
            below: 'all',
            rawMaterial: '',
            category: 'all',
            salesType: 'all',
            fromDate: '',
            toDate: '',
        };
        setFilters(resetFilters);
        onShowAll();
    };

    return (
        <div className="w-full bg-gray-100 py-6 px-8">
            <form onSubmit={handleSearch}>
                {/* Export Section - Top */}
                <div className="w-full mb-6">
                    <div className="flex items-center gap-4 w-[200px]">
                        <label className="block text-sm font-medium text-gray-700">
                            Export
                        </label>
                        <select
                            name="exportType"
                            value={filters.exportType}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            {exportOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Filter Section - Below */}
                <div className="flex items-end gap-6 flex-wrap">
                    {/* Below Dropdown */}
                    <div className="flex-1 min-w-[180px]">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Below
                        </label>
                        <select
                            name="below"
                            value={filters.below}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            {belowOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Raw Material Input */}
                    <div className="flex-1 min-w-[180px]">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Raw Material
                        </label>
                        <input
                            type="text"
                            name="rawMaterial"
                            value={filters.rawMaterial}
                            onChange={handleInputChange}
                            placeholder="Enter material name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Category Dropdown */}
                    <div className="flex-1 min-w-[180px]">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Category
                        </label>
                        <select
                            name="category"
                            value={filters.category}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            {categoryOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Sales Type Dropdown */}
                    <div className="flex-1 min-w-[180px]">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Type Sales
                        </label>
                        <select
                            name="salesType"
                            value={filters.salesType}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            {salesTypeOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* From Date */}
                    <div className="flex-1 min-w-[180px]">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            From Date
                        </label>
                        <input
                            type="date"
                            name="fromDate"
                            value={filters.fromDate}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* To Date */}
                    <div className="flex-1 min-w-[180px]">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            To Date
                        </label>
                        <input
                            type="date"
                            name="toDate"
                            value={filters.toDate}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                        >
                            Search
                        </button>
                        <button
                            type="button"
                            onClick={handleShowAll}
                            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
                        >
                            Show All
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

// src/App.tsx
const ItemWiseReport: React.FC = () => {
    const handleSearch = (filters: FilterState) => {
        console.log('Searching with filters:', filters);
        // Implement your search logic here
    };

    const handleShowAll = () => {
        console.log('Showing all transfer reports');
        // Implement your show all logic here
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <TransferReportFilter onSearch={handleSearch} onShowAll={handleShowAll} />
            {/* Add your report content here */}
        </div>
    );
};

export default ItemWiseReport;