// components/ConsumptionReport.tsx
import React, { useState } from 'react';
import { FiCalendar, FiSearch } from 'react-icons/fi';

const ConsumptionReport: React.FC = () => {
    // State management
    const [exportOption, setExportOption] = useState<string>('pdf');
    const [category, setCategory] = useState<string>('all');
    const [fromDate, setFromDate] = useState<string>('');
    const [toDate, setToDate] = useState<string>('');

    // Sample categories for dropdown
    const categories = [
        { value: 'all', label: 'All Categories' },
        { value: 'electronics', label: 'Electronics' },
        { value: 'raw-materials', label: 'Raw Materials' },
        { value: 'finished-goods', label: 'Finished Goods' },
    ];

    // Export options
    const exportOptions = [
        { value: 'pdf', label: 'PDF' },
        { value: 'excel', label: 'Excel' },
        { value: 'csv', label: 'CSV' },
    ];

    // Handle form submission
    const handleSearch = () => {
        console.log({
            exportOption,
            category,
            fromDate,
            toDate
        });
        // Add your search logic here
    };

    // Handle show all
    const handleShowAll = () => {
        setCategory('all');
        setFromDate('');
        setToDate('');
        // Add your show all logic here
    };

    return (
        <div className="w-full bg-white p-6 shadow-md border-b border-gray-200">
            <div className="max-w-7xl mx-auto">
                {/* Top Section - Export */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Consumption Report</h2>
                    <div className="relative">
                        <select
                            value={exportOption}
                            onChange={(e) => setExportOption(e.target.value)}
                            className="appearance-none bg-gray-100 text-gray-700 border border-gray-300 rounded-lg py-2 px-4 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-200 transition-all duration-200"
                        >
                            {exportOptions.map((option) => (
                                <option key={option.value} value={option.value} className="text-gray-800">
                                    Export as {option.label}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Filter Section */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {/* Raw Material */}
                    <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Raw Material</label>
                        <input
                            type="text"
                            placeholder="Enter material name"
                            className="w-full bg-white text-gray-700 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                        />
                    </div>

                    {/* Category Dropdown */}
                    <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <div className="relative">
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full appearance-none bg-white text-gray-700 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {categories.map((cat) => (
                                    <option key={cat.value} value={cat.value} className="text-gray-800">
                                        {cat.label}
                                    </option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* From Date */}
                    <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                        <div className="relative">
                            <input
                                type="date"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                                className="w-full bg-white text-gray-700 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <FiCalendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>

                    {/* To Date */}
                    <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                        <div className="relative">
                            <input
                                type="date"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                                className="w-full bg-white text-gray-700 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <FiCalendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="md:col-span-1 flex items-end gap-2">
                        <button
                            onClick={handleSearch}
                            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            <FiSearch /> Search
                        </button>
                        <button
                            onClick={handleShowAll}
                            className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-all duration-200"
                        >
                            Show All
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConsumptionReport;