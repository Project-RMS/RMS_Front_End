// src/components/ReportFilter.tsx
import React, { useState, FormEvent } from 'react';

// Define types for the component
interface FilterState {
    exportType: string;
    below: string;
    reportType: string;
    fromDate: string;
    toDate: string;
}

interface ReportFilterProps {
    onSearch: (filters: FilterState) => void;
    onShowAll: () => void;
}

const ReportFilter: React.FC<ReportFilterProps> = ({ onSearch, onShowAll }) => {
    // Initial state for all filters
    const [filters, setFilters] = useState<FilterState>({
        exportType: 'pdf',
        below: 'all',
        reportType: 'summary',
        fromDate: '',
        toDate: '',
    });

    // Options for dropdowns
    const exportOptions = [
        { value: 'pdf', label: 'PDF' },
        { value: 'excel', label: 'Excel' },
        { value: 'csv', label: 'CSV' },
    ];

    const belowOptions = [
        { value: 'all', label: 'All' },
        { value: 'department', label: 'Department' },
        { value: 'team', label: 'Team' },
        { value: 'individual', label: 'Individual' },
    ];

    const reportTypeOptions = [
        { value: 'summary', label: 'Summary' },
        { value: 'detailed', label: 'Detailed' },
        { value: 'analytics', label: 'Analytics' },
    ];

    // Handle input changes for all form elements
    const handleInputChange = (
        e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSearch = (e: FormEvent) => {
        e.preventDefault();

        // Validate dates if both are provided
        if (filters.fromDate && filters.toDate) {
            if (new Date(filters.fromDate) > new Date(filters.toDate)) {
                alert('From Date cannot be later than To Date');
                return;
            }
        }

        onSearch(filters);
    };

    // Handle show all button click
    const handleShowAll = () => {
        const resetFilters: FilterState = {
            exportType: 'pdf',
            below: 'all',
            reportType: 'summary',
            fromDate: '',
            toDate: '',
        };
        setFilters(resetFilters);
        onShowAll();
    };

    return (
        <div className="w-full bg-gray-100 py-6 px-8">
            <form
                onSubmit={handleSearch}
                className="flex items-end gap-6 flex-wrap"
            >
                {/* Export Dropdown */}
                <div className="flex-1 min-w-[180px]">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
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

                {/* Report Type Dropdown */}
                <div className="flex-1 min-w-[180px]">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type
                    </label>
                    <select
                        name="reportType"
                        value={filters.reportType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        {reportTypeOptions.map((option) => (
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
            </form>
        </div>
    );
};

// src/InternalReport.tsx
const InternalReport: React.FC = () => {
    const handleSearch = (filters: FilterState) => {
        console.log('Searching with filters:', filters);
        // Add your search logic here
    };

    const handleShowAll = () => {
        console.log('Showing all reports');
        // Add your show all logic here
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <ReportFilter onSearch={handleSearch} onShowAll={handleShowAll} />
            {/* Add your report content here */}
        </div>
    );
};

export default InternalReport;