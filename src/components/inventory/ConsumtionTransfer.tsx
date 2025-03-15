import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    PencilIcon,
    EyeIcon,
    MailIcon,
    XCircleIcon
} from '@heroicons/react/outline';

interface StockData {
    id: string;
    from: string;
    invoiceDate: string;
    invoiceNo: string;
    poMrnNo: string;
    total: number;
    payment: string;
    createdBy: string;
    status: string;
}

const mockData: StockData[] = [
    {
        id: '1',
        from: 'Supplier A',
        invoiceDate: '2025-03-01',
        invoiceNo: 'INV001',
        poMrnNo: 'PO001',
        total: 1500.00,
        payment: 'Paid',
        createdBy: 'John Doe',
        status: 'Completed'
    },
];

const ConsumtionTransfer: React.FC = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [fromFilter, setFromFilter] = useState('all');
    const [invoiceNo, setInvoiceNo] = useState('');
    const [paymentFilter, setPaymentFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');

    const handleSearch = () => {
        console.log('Searching with filters:', {
            startDate,
            endDate,
            fromFilter,
            invoiceNo,
            paymentFilter,
            statusFilter,
            typeFilter
        });
    };

    const handleShowAll = () => {
        setStartDate('');
        setEndDate('');
        setFromFilter('all');
        setInvoiceNo('');
        setPaymentFilter('');
        setStatusFilter('');
        setTypeFilter('');
    };

    return (
        <div className="w-full min-h-screen bg-gray-50 p-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Consumption Transfer</h1>
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <Link
                        to="/consumtion/transfer/add"
                        className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors font-medium text-center w-full sm:w-auto"
                    >
                        Add Transfer
                    </Link>
                    <select
                        className="border border-gray-300 rounded-md px-4 py-2 bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto"
                    >
                        <option value="export">Export</option>
                        <option value="pdf">PDF</option>
                        <option value="csv">CSV</option>
                        <option value="excel">Excel</option>
                    </select>
                </div>
            </div>

            {/* Filter Section */}
            <div className="mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: 'Start Date', type: 'date', value: startDate, onChange: setStartDate },
                        { label: 'End Date', type: 'date', value: endDate, onChange: setEndDate },
                        {
                            label: 'To', type: 'select', value: fromFilter, onChange: setFromFilter,
                            options: [
                                { value: 'all', label: 'All' },
                                { value: 'supplier', label: 'Supplier' },
                                { value: 'kitchen', label: 'Kitchen' }
                            ]
                        },
                        { label: 'Invoice No', type: 'text', value: invoiceNo, onChange: setInvoiceNo },
                        {
                            label: 'Payment', type: 'select', value: paymentFilter, onChange: setPaymentFilter,
                            options: [
                                { value: '', label: 'All' },
                                { value: 'paid', label: 'Paid' },
                                { value: 'pending', label: 'Pending' }
                            ]
                        },
                        {
                            label: 'Status', type: 'select', value: statusFilter, onChange: setStatusFilter,
                            options: [
                                { value: '', label: 'All' },
                                { value: 'completed', label: 'Completed' },
                                { value: 'pending', label: 'Pending' },
                                { value: 'cancelled', label: 'Cancelled' }
                            ]
                        },
                        {
                            label: 'Type', type: 'select', value: typeFilter, onChange: setTypeFilter,
                            options: [
                                { value: '', label: 'All' },
                                { value: 'type', label: 'Select Type' },
                                { value: 'internal', label: 'Internal Transfer' },
                                { value: 'manual', label: 'Manual Stock' }
                            ]
                        }
                    ].map((field, index) => (
                        <div key={index}>
                            <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
                            {field.type === 'select' ? (
                                <select
                                    value={field.value}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-700"
                                >
                                    {field.options!.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type={field.type}
                                    value={field.value}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            )}
                        </div>
                    ))}
                </div>
                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={handleSearch}
                        className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors font-medium w-full sm:w-auto"
                    >
                        Search
                    </button>
                    <button
                        onClick={handleShowAll}
                        className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors font-medium w-full sm:w-auto"
                    >
                        Show All
                    </button>
                </div>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead className="bg-gray-100">
                        <tr>
                            {['From', 'Invoice Date', 'Invoice No', 'PO/MRN No', 'Total', 'Payment', 'Created By', 'Status', 'Action'].map((header) => (
                                <th
                                    key={header}
                                    className="p-3 text-left text-sm font-semibold text-gray-700 border-b"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {mockData.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-3 border-b text-gray-900">{item.from}</td>
                                <td className="p-3 border-b text-gray-900">{item.invoiceDate}</td>
                                <td className="p-3 border-b text-gray-900">{item.invoiceNo}</td>
                                <td className="p-3 border-b text-gray-900">{item.poMrnNo}</td>
                                <td className="p-3 border-b text-gray-900">${item.total.toFixed(2)}</td>
                                <td className="p-3 border-b">
                                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${item.payment === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {item.payment}
                                    </span>
                                </td>
                                <td className="p-3 border-b text-gray-900">{item.createdBy}</td>
                                <td className="p-3 border-b">
                                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${item.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                        item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="p-3 border-b">
                                    <div className="flex gap-3">
                                        <Link to={`/stock-purchase/edit/${item.id}`} className="text-indigo-600 hover:text-indigo-800 transition-colors">
                                            <PencilIcon className="h-5 w-5" />
                                        </Link>
                                        <Link to={`/stock-purchase/view/${item.id}`} className="text-green-600 hover:text-green-800 transition-colors">
                                            <EyeIcon className="h-5 w-5" />
                                        </Link>
                                        <button className="text-gray-600 hover:text-gray-800 transition-colors">
                                            <MailIcon className="h-5 w-5" />
                                        </button>
                                        <button className="text-red-600 hover:text-red-800 transition-colors">
                                            <XCircleIcon className="h-5 w-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ConsumtionTransfer;