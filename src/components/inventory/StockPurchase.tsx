// // StockPurchase.tsx
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

// Mock data - replace with API call in production
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
    // Add more mock data as needed
];

const StockPurchase: React.FC = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [fromFilter, setFromFilter] = useState('all');
    const [invoiceNo, setInvoiceNo] = useState('');
    const [paymentFilter, setPaymentFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');

    const handleSearch = () => {
        // Implement search logic here
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
        // Reset all filters
        setStartDate('');
        setEndDate('');
        setFromFilter('all');
        setInvoiceNo('');
        setPaymentFilter('');
        setStatusFilter('');
        setTypeFilter('');
    };

    return (
        <div className="container mx-auto p-6">
            {/* Top Section */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Stock Purchase</h1>
                <div className="space-x-4">
                    <Link
                        to="/purchase/request/stock/add"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Add Purchase
                    </Link>
                    <select className="border rounded-lg px-3 py-2 text-gray-700">
                        <option value="export">Export</option>
                        <option value="pdf">PDF</option>
                        <option value="csv">CSV</option>
                        <option value="excel">Excel</option>
                    </select>
                </div>
            </div>

            {/* Filter Section */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                        <select
                            value={fromFilter}
                            onChange={(e) => setFromFilter(e.target.value)}
                            className="w-full border rounded-lg px-3 py-2"
                        >
                            <option value="all">All</option>
                            <option value="supplier">Supplier</option>
                            <option value="kitchen">Kitchen</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Invoice No</label>
                        <input
                            type="text"
                            value={invoiceNo}
                            onChange={(e) => setInvoiceNo(e.target.value)}
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Payment</label>
                        <select
                            value={paymentFilter}
                            onChange={(e) => setPaymentFilter(e.target.value)}
                            className="w-full border rounded-lg px-3 py-2"
                        >
                            <option value="">All</option>
                            <option value="paid">Paid</option>
                            <option value="pending">Pending</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full border rounded-lg px-3 py-2"
                        >
                            <option value="">All</option>
                            <option value="completed">Completed</option>
                            <option value="pending">Pending</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                        <select
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                            className="w-full border rounded-lg px-3 py-2"
                        >
                            <option value="">All</option>
                            <option value="type">Select Type</option>
                            <option value="internal">Internal Transfer</option>
                            <option value="manual">Manual Stock</option>
                        </select>
                    </div>
                </div>
                <div className="mt-4 flex space-x-4">
                    <button
                        onClick={handleSearch}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Search
                    </button>
                    <button
                        onClick={handleShowAll}
                        className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                        Show All
                    </button>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-lg shadow-md overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">From</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice No</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">PO/MRN No</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created By</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {mockData.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">{item.from}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.invoiceDate}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.invoiceNo}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.poMrnNo}</td>
                                <td className="px-6 py-4 whitespace-nowrap">${item.total.toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 rounded-full text-xs ${item.payment === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {item.payment}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.createdBy}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 rounded-full text-xs ${item.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                            item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                        }`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex space-x-2">
                                        <Link to={`/stock-purchase/edit/${item.id}`} className="text-blue-600 hover:text-blue-800">
                                            <PencilIcon className="h-5 w-5" />
                                        </Link>
                                        <Link to={`/stock-purchase/view/${item.id}`} className="text-green-600 hover:text-green-800">
                                            <EyeIcon className="h-5 w-5" />
                                        </Link>
                                        <button className="text-gray-600 hover:text-gray-800">
                                            <MailIcon className="h-5 w-5" />
                                        </button>
                                        <button className="text-red-600 hover:text-red-800">
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

export default StockPurchase;





// StockPurchase.tsx
// import React, { useState, useEffect, ChangeEvent } from 'react';
// import { Link } from 'react-router-dom';
// import {
//     PencilIcon,
//     EyeIcon,
//     MailIcon,
//     XCircleIcon
// } from '@heroicons/react/outline';

// interface StockData {
//     id: string;
//     from: string;
//     invoiceDate: string;
//     invoiceNo: string;
//     poMrnNo: string;
//     total: number;
//     payment: 'Paid' | 'Pending' | 'Failed';
//     createdBy: string;
//     status: 'Completed' | 'Pending' | 'Cancelled';
// }

// interface FilterState {
//     startDate: string;
//     endDate: string;
//     from: string;
//     invoiceNo: string;
//     payment: string;
//     status: string;
//     type: string;
//     page: number;
//     pageSize: number;
// }

// const StockPurchase: React.FC = () => {
//     // State management
//     const [filters, setFilters] = useState<FilterState>({
//         startDate: '',
//         endDate: '',
//         from: 'all',
//         invoiceNo: '',
//         payment: '',
//         status: '',
//         type: '',
//         page: 1,
//         pageSize: 10
//     });
//     const [stockData, setStockData] = useState<StockData[]>([]);
//     const [totalItems, setTotalItems] = useState(0);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);

//     // Fetch data from API
//     const fetchStockData = async () => {
//         try {
//             setLoading(true);
//             setError(null);

//             // Replace with your actual API endpoint
//             const response = await fetch(`/api/stock-purchase?${new URLSearchParams({
//                 ...filters,
//                 page: filters.page.toString(),
//                 pageSize: filters.pageSize.toString()
//             })}`);

//             if (!response.ok) throw new Error('Failed to fetch stock data');

//             const data = await response.json();
//             setStockData(data.items);
//             setTotalItems(data.total);
//         } catch (err) {
//             setError(err instanceof Error ? err.message : 'An error occurred');
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Initial fetch and filter changes
//     useEffect(() => {
//         fetchStockData();
//     }, [filters.page, filters.pageSize]);

//     // Handle input changes
//     const handleFilterChange = (
//         e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
//     ) => {
//         const { name, value } = e.target;
//         setFilters(prev => ({
//             ...prev,
//             [name]: value,
//             page: 1 // Reset to first page when filters change
//         }));
//     };

//     const handleSearch = () => {
//         fetchStockData();
//     };

//     const handleReset = () => {
//         setFilters({
//             startDate: '',
//             endDate: '',
//             from: 'all',
//             invoiceNo: '',
//             payment: '',
//             status: '',
//             type: '',
//             page: 1,
//             pageSize: 10
//         });
//         fetchStockData();
//     };

//     const handlePageChange = (newPage: number) => {
//         setFilters(prev => ({ ...prev, page: newPage }));
//     };

//     // Export handler
//     const handleExport = async (format: string) => {
//         try {
//             // Implement export logic based on format (pdf/csv/excel)
//             const response = await fetch(`/api/stock-purchase/export?format=${format}&${new URLSearchParams(filters)}`);
//             const blob = await response.blob();
//             const url = window.URL.createObjectURL(blob);
//             const link = document.createElement('a');
//             link.href = url;
//             link.download = `stock-purchase.${format}`;
//             link.click();
//         } catch (err) {
//             setError('Failed to export data');
//         }
//     };

//     return (
//         <div className="container mx-auto p-6 max-w-7xl">
//             {/* Header */}
//             <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
//                 <h1 className="text-3xl font-bold text-gray-900">Stock Purchase Management</h1>
//                 <div className="flex gap-4">
//                     <Link
//                         to="/stock-purchase/add"
//                         className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
//                     >
//                         <span>Add Purchase</span>
//                     </Link>
//                     <select
//                         onChange={(e) => handleExport(e.target.value)}
//                         className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500"
//                     >
//                         <option value="">Export As</option>
//                         <option value="pdf">PDF</option>
//                         <option value="csv">CSV</option>
//                         <option value="excel">Excel</option>
//                     </select>
//                 </div>
//             </div>

//             {/* Filters */}
//             <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
//                         <input
//                             type="date"
//                             name="startDate"
//                             value={filters.startDate}
//                             onChange={handleFilterChange}
//                             className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
//                         />
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
//                         <input
//                             type="date"
//                             name="endDate"
//                             value={filters.endDate}
//                             onChange={handleFilterChange}
//                             className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
//                         />
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
//                         <select
//                             name="from"
//                             value={filters.from}
//                             onChange={handleFilterChange}
//                             className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
//                         >
//                             <option value="all">All</option>
//                             <option value="supplier">Supplier</option>
//                             <option value="kitchen">Kitchen</option>
//                         </select>
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Invoice No</label>
//                         <input
//                             type="text"
//                             name="invoiceNo"
//                             value={filters.invoiceNo}
//                             onChange={handleFilterChange}
//                             className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
//                         />
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Payment</label>
//                         <select
//                             name="payment"
//                             value={filters.payment}
//                             onChange={handleFilterChange}
//                             className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
//                         >
//                             <option value="">All</option>
//                             <option value="Paid">Paid</option>
//                             <option value="Pending">Pending</option>
//                             <option value="Failed">Failed</option>
//                         </select>
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//                         <select
//                             name="status"
//                             value={filters.status}
//                             onChange={handleFilterChange}
//                             className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
//                         >
//                             <option value="">All</option>
//                             <option value="Completed">Completed</option>
//                             <option value="Pending">Pending</option>
//                             <option value="Cancelled">Cancelled</option>
//                         </select>
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
//                         <select
//                             name="type"
//                             value={filters.type}
//                             onChange={handleFilterChange}
//                             className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
//                         >
//                             <option value="">All</option>
//                             <option value="internal">Internal Transfer</option>
//                             <option value="manual">Manual Stock</option>
//                         </select>
//                     </div>
//                 </div>
//                 <div className="mt-6 flex gap-4">
//                     <button
//                         onClick={handleSearch}
//                         disabled={loading}
//                         className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
//                     >
//                         {loading ? 'Searching...' : 'Search'}
//                     </button>
//                     <button
//                         onClick={handleReset}
//                         disabled={loading}
//                         className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors disabled:bg-gray-400"
//                     >
//                         Reset
//                     </button>
//                 </div>
//             </div>

//             {/* Error Message */}
//             {error && (
//                 <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded" role="alert">
//                     <p>{error}</p>
//                 </div>
//             )}

//             {/* Table */}
//             <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//                 <div className="overflow-x-auto">
//                     <table className="min-w-full divide-y divide-gray-200">
//                         <thead className="bg-gray-50">
//                             <tr>
//                                 {[
//                                     'From',
//                                     'Invoice Date',
//                                     'Invoice No',
//                                     'PO/MRN No',
//                                     'Total',
//                                     'Payment',
//                                     'Created By',
//                                     'Status',
//                                     'Action'
//                                 ].map((header) => (
//                                     <th
//                                         key={header}
//                                         className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
//                                     >
//                                         {header}
//                                     </th>
//                                 ))}
//                             </tr>
//                         </thead>
//                         <tbody className="divide-y divide-gray-200">
//                             {loading ? (
//                                 <tr>
//                                     <td colSpan={9} className="px-6 py-4 text-center text-gray-500">
//                                         Loading...
//                                     </td>
//                                 </tr>
//                             ) : stockData.length === 0 ? (
//                                 <tr>
//                                     <td colSpan={9} className="px-6 py-4 text-center text-gray-500">
//                                         No data available
//                                     </td>
//                                 </tr>
//                             ) : (
//                                 stockData.map((item) => (
//                                     <tr key={item.id} className="hover:bg-gray-50 transition-colors">
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.from}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.invoiceDate}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.invoiceNo}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.poMrnNo}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.total.toFixed(2)}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap">
//                                             <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.payment === 'Paid' ? 'bg-green-100 text-green-800' :
//                                                     item.payment === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
//                                                         'bg-red-100 text-red-800'
//                                                 }`}>
//                                                 {item.payment}
//                                             </span>
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.createdBy}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap">
//                                             <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.status === 'Completed' ? 'bg-green-100 text-green-800' :
//                                                     item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
//                                                         'bg-red-100 text-red-800'
//                                                 }`}>
//                                                 {item.status}
//                                             </span>
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap">
//                                             <div className="flex items-center gap-3">
//                                                 <Link
//                                                     to={`/stock-purchase/edit/${item.id}`}
//                                                     className="text-blue-600 hover:text-blue-800 transition-colors"
//                                                     title="Edit"
//                                                 >
//                                                     <PencilIcon className="h-5 w-5" />
//                                                 </Link>
//                                                 <Link
//                                                     to={`/stock-purchase/view/${item.id}`}
//                                                     className="text-green-600 hover:text-green-800 transition-colors"
//                                                     title="View"
//                                                 >
//                                                     <EyeIcon className="h-5 w-5" />
//                                                 </Link>
//                                                 <button
//                                                     className="text-gray-600 hover:text-gray-800 transition-colors"
//                                                     title="Email"
//                                                 >
//                                                     <MailIcon className="h-5 w-5" />
//                                                 </button>
//                                                 <button
//                                                     className="text-red-600 hover:text-red-800 transition-colors"
//                                                     title="Cancel"
//                                                 >
//                                                     <XCircleIcon className="h-5 w-5" />
//                                                 </button>
//                                             </div>
//                                         </td>
//                                     </tr>
//                                 ))
//                             )}
//                         </tbody>
//                     </table>
//                 </div>

//                 {/* Pagination */}
//                 {!loading && stockData.length > 0 && (
//                     <div className="px-6 py-4 border-t border-gray-200">
//                         <div className="flex items-center justify-between">
//                             <div className="text-sm text-gray-700">
//                                 Showing {(filters.page - 1) * filters.pageSize + 1} to{' '}
//                                 {Math.min(filters.page * filters.pageSize, totalItems)} of {totalItems} entries
//                             </div>
//                             <div className="flex gap-2">
//                                 <button
//                                     onClick={() => handlePageChange(filters.page - 1)}
//                                     disabled={filters.page === 1}
//                                     className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
//                                 >
//                                     Previous
//                                 </button>
//                                 <button
//                                     onClick={() => handlePageChange(filters.page + 1)}
//                                     disabled={filters.page * filters.pageSize >= totalItems}
//                                     className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
//                                 >
//                                     Next
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default StockPurchase;