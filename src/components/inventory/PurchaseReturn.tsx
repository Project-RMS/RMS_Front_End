// PurchaseReturn.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface FilterData {
    startDate: string;
    endDate: string;
    to: string;
    invoiceNo: string;
    payment: string;
    status: string;
}

const PurchaseReturn: React.FC = () => {
    const [filters, setFilters] = useState<FilterData>({
        startDate: '',
        endDate: '',
        to: '',
        invoiceNo: '',
        payment: '',
        status: 'all',
    });

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

    // Handle search
    const handleSearch = () => {
        console.log('Search filters:', filters);
        // Add your search logic here
    };

    // Handle show all
    const handleShowAll = () => {
        setFilters({
            startDate: '',
            endDate: '',
            to: '',
            invoiceNo: '',
            payment: '',
            status: 'all',
        });
        // Add your show all logic here
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-lg">
            {/* Top Section */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Purchase Returns</h2>
                <div className="space-x-3">
                    <Link
                        to="/purchase/return/add"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        + Purchase Return
                    </Link>
                    <select
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="export">Export</option>
                        <option value="pdf">PDF</option>
                        <option value="excel">Excel</option>
                        <option value="csv">CSV</option>
                    </select>
                </div>
            </div>

            {/* Filter Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                {/* Start Date */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date
                    </label>
                    <input
                        type="date"
                        name="startDate"
                        value={filters.startDate}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* End Date */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Date
                    </label>
                    <input
                        type="date"
                        name="endDate"
                        value={filters.endDate}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* To */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        To
                    </label>
                    <select
                        name="to"
                        value={filters.to}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Vendor</option>
                        <option value="vendor1">Vendor 1</option>
                        <option value="vendor2">Vendor 2</option>
                        <option value="vendor3">Vendor 3</option>
                    </select>
                </div>

                {/* Invoice No */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Invoice No
                    </label>
                    <input
                        type="text"
                        name="invoiceNo"
                        value={filters.invoiceNo}
                        onChange={handleInputChange}
                        placeholder="Enter invoice number"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Payment */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Payment
                    </label>
                    <select
                        name="payment"
                        value={filters.payment}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Payment</option>
                        <option value="paid">Paid</option>
                        <option value="pending">Pending</option>
                        <option value="partial">Partial</option>
                    </select>
                </div>

                {/* Status */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                    </label>
                    <select
                        name="status"
                        value={filters.status}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">All</option>
                        <option value="saved">Saved</option>
                        <option value="sent">Sent/Email</option>
                        <option value="processed">Processed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            {/* Buttons */}
            <div className="mt-4 flex justify-end space-x-3">
                <button
                    onClick={handleSearch}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Search
                </button>
                <button
                    onClick={handleShowAll}
                    className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                >
                    Show All
                </button>
            </div>
        </div>
    );
};

export default PurchaseReturn;