// SalesReturn.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface SalesReturn {
    reqNo: string;
    status: string;
    to: string;
    date: string;
}

const ConsumtionRequest: React.FC = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedTo, setSelectedTo] = useState('');
    const [reqNo, setReqNo] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');

    const toOptions = ['Warehouse 1', 'Warehouse 2', 'Store 1', 'Store 2'];
    const statusOptions = ['Pending', 'Approved', 'Rejected', 'Processed'];

    const handleSearch = () => {
        console.log('Searching with:', { startDate, endDate, selectedTo, reqNo, selectedStatus });
    };

    const handleShowAll = () => {
        setStartDate('');
        setEndDate('');
        setSelectedTo('');
        setReqNo('');
        setSelectedStatus('');
        console.log('Showing all records');
    };

    return (
        <div className="w-full min-h-screen bg-gray-100">
            {/* Header Section */}
            <div className="w-full px-6 py-8 bg-white border-b border-gray-200">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-800">Sales Return</h1>
                    <div className="flex gap-4">
                        <Link
                            to="/consumtion/request/add"
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                            Add Request
                        </Link>
                        <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                            </svg>
                            Export
                        </button>
                    </div>
                </div>
            </div>

            {/* Filter Section */}
            <div className="w-full px-6 py-6 bg-gray-50 border-b border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-600 mb-1">Start Date</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-600 mb-1">End Date</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-600 mb-1">To</label>
                        <select
                            value={selectedTo}
                            onChange={(e) => setSelectedTo(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        >
                            <option value="">Select Destination</option>
                            {toOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-600 mb-1">Request No.</label>
                        <input
                            type="text"
                            value={reqNo}
                            onChange={(e) => setReqNo(e.target.value)}
                            placeholder="Enter Request No."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-600 mb-1">Status</label>
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        >
                            <option value="">Select Status</option>
                            {statusOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-end gap-4">
                        <button
                            onClick={handleSearch}
                            className="w-full bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            Search
                        </button>
                        <button
                            onClick={handleShowAll}
                            className="w-full bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                        >
                            Show All
                        </button>
                    </div>
                </div>
            </div>

           
        </div>
    );
};

export default ConsumtionRequest;