// // // components/PurchaseRequest.tsx
// // import React, { useState } from 'react';

// // interface FilterState {
// //     startDate: string;
// //     endDate: string;
// //     to: string;
// //     requestNo: string;
// //     payment: string;
// //     status: string;
// // }

// // const PurchaseRequest: React.FC = () => {
// //     const [filters, setFilters] = useState<FilterState>({
// //         startDate: '',
// //         endDate: '',
// //         to: 'all',
// //         requestNo: '',
// //         payment: 'all',
// //         status: 'all',
// //     });

// //     const toOptions = ['All', 'Supplier', 'Kitchen'];
// //     const paymentOptions = ['All', 'Cash', 'Credit', 'Bank Transfer'];
// //     const statusOptions = ['All', 'Saved', 'Sent & Email', 'Processed', 'Cancelled', 'Pending for Approval'];

// //     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
// //         setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
// //     };

// //     const handleSearch = () => console.log('Search filters:', filters);
// //     const handleExport = (format: string) => console.log('Export format:', format);

// //     return (
// //         <div className="w-full max-w-7xl mx-auto p-4 bg-white shadow-md rounded-lg">
// //             <div className="flex flex-wrap items-center justify-between gap-4">
// //                 {/* Left Side - Button and Export */}
// //                 <div className="flex items-center gap-4">
// //                     <button
// //                         className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 whitespace-nowrap"
// //                         onClick={() => console.log('Request Purchase clicked')}
// //                     >
// //                         Add Request for Purchase
// //                     </button>
// //                     <select
// //                         className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                         onChange={(e) => handleExport(e.target.value)}
// //                     >
// //                         <option value="">Export</option>
// //                         <option value="pdf">PDF</option>
// //                         <option value="excel">Excel</option>
// //                         <option value="csv">CSV</option>
// //                     </select>
// //                 </div>

// //                 {/* Right Side - Filters and Buttons */}
// //                 <div className="flex flex-wrap items-center gap-4">
// //                     <input
// //                         type="date"
// //                         name="startDate"
// //                         value={filters.startDate}
// //                         onChange={handleInputChange}
// //                         className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                     />
// //                     <input
// //                         type="date"
// //                         name="endDate"
// //                         value={filters.endDate}
// //                         onChange={handleInputChange}
// //                         className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                     />
// //                     <select
// //                         name="to"
// //                         value={filters.to}
// //                         onChange={handleInputChange}
// //                         className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                     >
// //                         {toOptions.map((option) => (
// //                             <option key={option} value={option.toLowerCase()}>
// //                                 {option}
// //                             </option>
// //                         ))}
// //                     </select>
// //                     <input
// //                         type="text"
// //                         name="requestNo"
// //                         value={filters.requestNo}
// //                         onChange={handleInputChange}
// //                         placeholder="Request No"
// //                         className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                     />
// //                     <select
// //                         name="payment"
// //                         value={filters.payment}
// //                         onChange={handleInputChange}
// //                         className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                     >
// //                         {paymentOptions.map((option) => (
// //                             <option key={option} value={option.toLowerCase()}>
// //                                 {option}
// //                             </option>
// //                         ))}
// //                     </select>
// //                     <select
// //                         name="status"
// //                         value={filters.status}
// //                         onChange={handleInputChange}
// //                         className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                     >
// //                         {statusOptions.map((option) => (
// //                             <option key={option} value={option.toLowerCase()}>
// //                                 {option}
// //                             </option>
// //                         ))}
// //                     </select>
// //                     <button
// //                         className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
// //                         onClick={handleSearch}
// //                     >
// //                         Search
// //                     </button>
// //                     <button
// //                         className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 whitespace-nowrap"
// //                         onClick={() => console.log('Show all clicked')}
// //                     >
// //                         Show All
// //                     </button>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default PurchaseRequest;



// // components/PurchaseRequest.tsx
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom'; // Import Link from react-router-dom

// interface FilterState {
//     startDate: string;
//     endDate: string;
//     to: string;
//     requestNo: string;
//     payment: string;
//     status: string;
// }

// const PurchaseRequest: React.FC = () => {
//     const [filters, setFilters] = useState<FilterState>({
//         startDate: '',
//         endDate: '',
//         to: 'all',
//         requestNo: '',
//         payment: 'all',
//         status: 'all',
//     });

//     const toOptions = ['All', 'Supplier', 'Kitchen'];
//     const paymentOptions = ['All', 'Cash', 'Credit', 'Bank Transfer'];
//     const statusOptions = ['All', 'Saved', 'Sent & Email', 'Processed', 'Cancelled', 'Pending for Approval'];

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//         setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//     };

//     const handleSearch = () => console.log('Search filters:', filters);
//     const handleExport = (format: string) => console.log('Export format:', format);

//     return (
//         <div className="w-full max-w-7xl mx-auto p-4 bg-white shadow-md rounded-lg">
//             <div className="flex flex-wrap items-center justify-between gap-4">
//                 {/* Left Side - Button and Export */}
//                 <div className="flex items-center gap-4">
//                     <Link
//                         to="/add-purchase-request" // Define the route path
//                         className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 whitespace-nowrap inline-block"
//                         onClick={() => console.log('Navigating to add purchase request')}
//                     >
//                         Add Request for Purchase
//                     </Link>
//                     <select
//                         className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         onChange={(e) => handleExport(e.target.value)}
//                     >
//                         <option value="">Export</option>
//                         <option value="pdf">PDF</option>
//                         <option value="excel">Excel</option>
//                         <option value="csv">CSV</option>
//                     </select>
//                 </div>

//                 {/* Right Side - Filters and Buttons */}
//                 <div className="flex flex-wrap items-center gap-4">
//                     <input
//                         type="date"
//                         name="startDate"
//                         value={filters.startDate}
//                         onChange={handleInputChange}
//                         className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     <input
//                         type="date"
//                         name="endDate"
//                         value={filters.endDate}
//                         onChange={handleInputChange}
//                         className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     <select
//                         name="to"
//                         value={filters.to}
//                         onChange={handleInputChange}
//                         className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                         {toOptions.map((option) => (
//                             <option key={option} value={option.toLowerCase()}>
//                                 {option}
//                             </option>
//                         ))}
//                     </select>
//                     <input
//                         type="text"
//                         name="requestNo"
//                         value={filters.requestNo}
//                         onChange={handleInputChange}
//                         placeholder="Request No"
//                         className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     <select
//                         name="payment"
//                         value={filters.payment}
//                         onChange={handleInputChange}
//                         className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                         {paymentOptions.map((option) => (
//                             <option key={option} value={option.toLowerCase()}>
//                                 {option}
//                             </option>
//                         ))}
//                     </select>
//                     <select
//                         name="status"
//                         value={filters.status}
//                         onChange={handleInputChange}
//                         className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                         {statusOptions.map((option) => (
//                             <option key={option} value={option.toLowerCase()}>
//                                 {option}
//                             </option>
//                         ))}
//                     </select>
//                     <button
//                         className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
//                         onClick={handleSearch}
//                     >
//                         Search
//                     </button>
//                     <button
//                         className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 whitespace-nowrap"
//                         onClick={() => console.log('Show all clicked')}
//                     >
//                         Show All
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PurchaseRequest;


// components/PurchaseRequest.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    PencilIcon,
    EyeIcon,
    MailIcon,
    ChevronDownIcon
} from '@heroicons/react/outline'; // Using Heroicons for icons

interface FilterState {
    startDate: string;
    endDate: string;
    to: string;
    requestNo: string;
    payment: string;
    status: string;
}

interface PurchaseRequestData {
    id: number;
    to: string;
    date: string;
    requestNo: string;
    total: number;
    payment: string;
    createdBy: string;
    status: string;
}

const PurchaseRequest: React.FC = () => {
    const [filters, setFilters] = useState<FilterState>({
        startDate: '',
        endDate: '',
        to: 'all',
        requestNo: '',
        payment: 'all',
        status: 'all',
    });

    // Sample data - replace with your API call
    const [requests, setRequests] = useState<PurchaseRequestData[]>([
        { id: 1, to: 'Supplier', date: '2025-03-06', requestNo: 'PR001', total: 1500, payment: 'Credit', createdBy: 'John Doe', status: 'Pending for Approval' },
        { id: 2, to: 'Kitchen', date: '2025-03-05', requestNo: 'PR002', total: 800, payment: 'Cash', createdBy: 'Jane Smith', status: 'Processed' },
    ]);

    const toOptions = ['All', 'Supplier', 'Kitchen'];
    const paymentOptions = ['All', 'Cash', 'Credit', 'Bank Transfer'];
    const statusOptions = ['All', 'Saved', 'Sent & Email', 'Processed', 'Cancelled', 'Pending for Approval'];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSearch = () => {
        // Implement search logic here
        console.log('Search filters:', filters);
        // You would typically filter the requests array based on filters here
    };

    const handleExport = (format: string) => {
        console.log('Export format:', format);
        // Implement export logic here (PDF, Excel, CSV)
    };

    const handleEdit = (id: number) => {
        console.log('Edit request:', id);
        // Implement edit logic or navigation
    };

    const handleView = (id: number) => {
        console.log('View request:', id);
        // Implement view logic or navigation
    };

    const handleEmail = (id: number) => {
        console.log('Email request:', id);
        // Implement email sending logic
    };

    const handleShowAll = () => {
        console.log('Show all requests');
        // Reset filters and show all data
        setFilters({
            startDate: '',
            endDate: '',
            to: 'all',
            requestNo: '',
            payment: 'all',
            status: 'all',
        });
    };

    return (
        <div className="w-full max-w-7xl mx-auto p-4 bg-white shadow-md rounded-lg">
            {/* Filter Section */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                    <Link
                        to="/purchase/request/add-purchase-request"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 whitespace-nowrap inline-block"
                    >
                        Add Request for Purchase
                    </Link>
                    <div className="relative">
                        <select
                            className="appearance-none border border-gray-300 rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => handleExport(e.target.value)}
                        >
                            <option value="">Export</option>
                            <option value="pdf">PDF</option>
                            <option value="excel">Excel</option>
                            <option value="csv">CSV</option>
                        </select>
                        <ChevronDownIcon className="w-5 h-5 absolute right-2 top-1/2 -translate-y-1/2 text-gray-500" />
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    <input type="date" name="startDate" value={filters.startDate} onChange={handleInputChange} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <input type="date" name="endDate" value={filters.endDate} onChange={handleInputChange} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <select name="to" value={filters.to} onChange={handleInputChange} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        {toOptions.map((option) => <option key={option} value={option.toLowerCase()}>{option}</option>)}
                    </select>
                    <input type="text" name="requestNo" value={filters.requestNo} onChange={handleInputChange} placeholder="Request No" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <select name="payment" value={filters.payment} onChange={handleInputChange} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        {paymentOptions.map((option) => <option key={option} value={option.toLowerCase()}>{option}</option>)}
                    </select>
                    <select name="status" value={filters.status} onChange={handleInputChange} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        {statusOptions.map((option) => <option key={option} value={option.toLowerCase()}>{option}</option>)}
                    </select>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700" onClick={handleSearch}>Search</button>
                    <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 whitespace-nowrap" onClick={handleShowAll}>Show All</button>
                </div>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th className="px-6 py-3">To</th>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Request No</th>
                            <th className="px-6 py-3">Total</th>
                            <th className="px-6 py-3">Payment</th>
                            <th className="px-6 py-3">Created By</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((request) => (
                            <tr key={request.id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4">{request.to}</td>
                                <td className="px-6 py-4">{request.date}</td>
                                <td className="px-6 py-4">{request.requestNo}</td>
                                <td className="px-6 py-4">${request.total.toLocaleString()}</td>
                                <td className="px-6 py-4">{request.payment}</td>
                                <td className="px-6 py-4">{request.createdBy}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs ${request.status === 'Processed' ? 'bg-green-100 text-green-800' :
                                            request.status === 'Pending for Approval' ? 'bg-yellow-100 text-yellow-800' :
                                                request.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                                                    'bg-gray-100 text-gray-800'
                                        }`}>
                                        {request.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 flex gap-2">
                                    <button onClick={() => handleEdit(request.id)} className="text-blue-600 hover:text-blue-800">
                                        <PencilIcon className="w-5 h-5" />
                                    </button>
                                    <button onClick={() => handleView(request.id)} className="text-green-600 hover:text-green-800">
                                        <EyeIcon className="w-5 h-5" />
                                    </button>
                                    <button onClick={() => handleEmail(request.id)} className="text-gray-600 hover:text-gray-800">
                                        <MailIcon className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PurchaseRequest;