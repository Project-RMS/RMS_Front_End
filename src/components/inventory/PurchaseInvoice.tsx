// // src/components/AddSupplier.tsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaSearch, FaSave, FaTimes } from 'react-icons/fa';

// interface Payment {
//     id: number;
//     from: string;
//     paymentDate: string;
//     paymentMode: string;
//     total: number;
//     paidAmount: number;
//     remainingAmount: number;
//     enterAmount: number;
// }

// const AddSupplier: React.FC = () => {
//     const navigate = useNavigate();

//     // Form states
//     const [fromSearch, setFromSearch] = useState('');
//     const [supplierSearch, setSupplierSearch] = useState('');
//     const [startDate, setStartDate] = useState('');
//     const [endDate, setEndDate] = useState('');

//     // Table states
//     const [payments, setPayments] = useState<Payment[]>([]);
//     const [newPayment, setNewPayment] = useState({
//         from: '',
//         paymentDate: '',
//         paymentMode: '',
//         total: 0,
//         paidAmount: 0,
//         enterAmount: 0
//     });

//     const handleSearch = () => {
//         // Implement search logic here based on filters
//         console.log('Searching with:', { fromSearch, supplierSearch, startDate, endDate });
//         // You would typically filter payments here based on the search criteria
//     };

//     const handleAddPayment = () => {
//         const remaining = newPayment.total - (newPayment.paidAmount + newPayment.enterAmount);

//         const payment: Payment = {
//             id: payments.length + 1,
//             from: newPayment.from,
//             paymentDate: newPayment.paymentDate,
//             paymentMode: newPayment.paymentMode,
//             total: newPayment.total,
//             paidAmount: newPayment.paidAmount + newPayment.enterAmount,
//             remainingAmount: remaining > 0 ? remaining : 0,
//             enterAmount: newPayment.enterAmount
//         };

//         setPayments([...payments, payment]);
//         setNewPayment({
//             from: '',
//             paymentDate: '',
//             paymentMode: '',
//             total: 0,
//             paidAmount: 0,
//             enterAmount: 0
//         });
//     };

//     const handleSave = () => {
//         // Save all data to your backend or state management
//         console.log('Saving supplier with payments:', payments);
//         navigate('/');
//     };

//     return (
//         <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
//             {/* Header */}
//             <div className="flex justify-between items-center mb-6">
//                 <h1 className="text-3xl font-bold text-gray-800">Add New Supplier Payments</h1>
//                 <button
//                     onClick={() => navigate('/')}
//                     className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
//                 >
//                     <FaTimes /> Cancel
//                 </button>
//             </div>

//             {/* Search Section */}
//             <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//                 <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
//                     <div className="relative">
//                         <select
//                             value={fromSearch}
//                             onChange={(e) => setFromSearch(e.target.value)}
//                             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                         >
//                             <option value="">Select From</option>
//                             <option value="vendor">Vendor</option>
//                             <option value="distributor">Distributor</option>
//                             <option value="manufacturer">Manufacturer</option>
//                         </select>
//                     </div>

//                     <div className="relative">
//                         <select
//                             value={supplierSearch}
//                             onChange={(e) => setSupplierSearch(e.target.value)}
//                             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                         >
//                             <option value="">Select Supplier</option>
//                             <option value="supplier1">Supplier 1</option>
//                             <option value="supplier2">Supplier 2</option>
//                             <option value="supplier3">Supplier 3</option>
//                         </select>
//                     </div>

//                     <input
//                         type="date"
//                         value={startDate}
//                         onChange={(e) => setStartDate(e.target.value)}
//                         className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     />

//                     <input
//                         type="date"
//                         value={endDate}
//                         onChange={(e) => setEndDate(e.target.value)}
//                         className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     />

//                     <button
//                         onClick={handleSearch}
//                         className="flex items-center justify-center gap-2 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
//                     >
//                         <FaSearch /> Search
//                     </button>
//                 </div>
//             </div>

//             {/* Payment Input Form */}
//             <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//                 <h2 className="text-xl font-semibold text-gray-700 mb-4">Add Payment Details</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
//                     <input
//                         type="text"
//                         placeholder="From"
//                         value={newPayment.from}
//                         onChange={(e) => setNewPayment({ ...newPayment, from: e.target.value })}
//                         className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                     />
//                     <input
//                         type="date"
//                         value={newPayment.paymentDate}
//                         onChange={(e) => setNewPayment({ ...newPayment, paymentDate: e.target.value })}
//                         className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                     />
//                     <select
//                         value={newPayment.paymentMode}
//                         onChange={(e) => setNewPayment({ ...newPayment, paymentMode: e.target.value })}
//                         className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                     >
//                         <option value="">Payment Mode</option>
//                         <option value="cash">Cash</option>
//                         <option value="card">Card</option>
//                         <option value="bank">Bank Transfer</option>
//                     </select>
//                     <input
//                         type="number"
//                         placeholder="Total"
//                         value={newPayment.total || ''}
//                         onChange={(e) => setNewPayment({ ...newPayment, total: Number(e.target.value) })}
//                         className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                     />
//                     <input
//                         type="number"
//                         placeholder="Paid Amount"
//                         value={newPayment.paidAmount || ''}
//                         onChange={(e) => setNewPayment({ ...newPayment, paidAmount: Number(e.target.value) })}
//                         className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                     />
//                     <div className="flex gap-2">
//                         <input
//                             type="number"
//                             placeholder="Enter Amount"
//                             value={newPayment.enterAmount || ''}
//                             onChange={(e) => setNewPayment({ ...newPayment, enterAmount: Number(e.target.value) })}
//                             className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 flex-1"
//                         />
//                         <button
//                             onClick={handleAddPayment}
//                             className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition-colors"
//                         >
//                             Add
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* Payments Table */}
//             <div className="bg-white rounded-lg shadow-md overflow-hidden">
//                 <table className="w-full">
//                     <thead className="bg-gray-100">
//                         <tr>
//                             <th className="p-4 text-left text-gray-600 font-semibold">From</th>
//                             <th className="p-4 text-left text-gray-600 font-semibold">Payment Date</th>
//                             <th className="p-4 text-left text-gray-600 font-semibold">Payment Mode</th>
//                             <th className="p-4 text-left text-gray-600 font-semibold">Total</th>
//                             <th className="p-4 text-left text-gray-600 font-semibold">Paid Amount</th>
//                             <th className="p-4 text-left text-gray-600 font-semibold">Remaining Amount</th>
//                             <th className="p-4 text-left text-gray-600 font-semibold">Enter Amount</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {payments.map((payment) => (
//                             <tr key={payment.id} className="border-b hover:bg-gray-50 transition-colors">
//                                 <td className="p-4">{payment.from}</td>
//                                 <td className="p-4">{payment.paymentDate}</td>
//                                 <td className="p-4">{payment.paymentMode}</td>
//                                 <td className="p-4">${payment.total.toFixed(2)}</td>
//                                 <td className="p-4">${payment.paidAmount.toFixed(2)}</td>
//                                 <td className="p-4">${payment.remainingAmount.toFixed(2)}</td>
//                                 <td className="p-4">${payment.enterAmount.toFixed(2)}</td>
//                             </tr>
//                         ))}
//                         {payments.length === 0 && (
//                             <tr>
//                                 <td colSpan={7} className="p-4 text-center text-gray-500">
//                                     No payments added yet
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Save Button */}
//             <div className="mt-6 flex justify-end">
//                 <button
//                     onClick={handleSave}
//                     className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
//                 >
//                     <FaSave /> Save Supplier
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default AddSupplier;




// src/components/AddSupplier.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaSave, FaTimes, FaPlus, FaTrash } from 'react-icons/fa';

interface Payment {
    id: number;
    from: string;
    paymentDate: string;
    paymentMode: string;
    total: number;
    paidAmount: number;
    remainingAmount: number;
    enterAmount: number;
}

const PurchaseInvoice: React.FC = () => {
    const navigate = useNavigate();

    // Form states
    const [fromSearch, setFromSearch] = useState('');
    const [supplierSearch, setSupplierSearch] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // Table states
    const [payments, setPayments] = useState<Payment[]>([]);
    const [newPayment, setNewPayment] = useState({
        from: '',
        paymentDate: '',
        paymentMode: '',
        total: 0,
        paidAmount: 0,
        enterAmount: 0
    });

    const handleSearch = () => {
        console.log('Searching:', { fromSearch, supplierSearch, startDate, endDate });
        // Implement your search logic here
    };

    const handleAddPayment = () => {
        if (!newPayment.from || !newPayment.paymentDate || !newPayment.paymentMode || newPayment.total <= 0) {
            alert('Please fill all required fields with valid values');
            return;
        }

        const remaining = newPayment.total - (newPayment.paidAmount + newPayment.enterAmount);

        const payment: Payment = {
            id: payments.length + 1,
            from: newPayment.from,
            paymentDate: newPayment.paymentDate,
            paymentMode: newPayment.paymentMode,
            total: newPayment.total,
            paidAmount: newPayment.paidAmount + newPayment.enterAmount,
            remainingAmount: remaining > 0 ? remaining : 0,
            enterAmount: newPayment.enterAmount
        };

        setPayments([...payments, payment]);
        setNewPayment({
            from: '',
            paymentDate: '',
            paymentMode: '',
            total: 0,
            paidAmount: 0,
            enterAmount: 0
        });
    };

    const handleDeletePayment = (id: number) => {
        setPayments(payments.filter(payment => payment.id !== id));
    };

    const handleSave = () => {
        if (payments.length === 0) {
            alert('Please add at least one payment before saving');
            return;
        }
        console.log('Saving:', { payments });
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="w-full max-w-7xl mx-auto">
                {/* Header Card */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex justify-between items-center w-full">
                        <h1 className="text-2xl font-bold text-gray-800">Add Supplier Payments</h1>
                        <button
                            onClick={() => navigate('/')}
                            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                        >
                            <FaTimes /> Cancel
                        </button>
                    </div>

                    {/* Search Form */}
                    <div className="mt-6 w-full grid grid-cols-1 md:grid-cols-5 gap-4">
                        <select
                            value={fromSearch}
                            onChange={(e) => setFromSearch(e.target.value)}
                            className="w-full p-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                        >
                            <option value="">Select From</option>
                            <option value="vendor">Vendor</option>
                            <option value="distributor">Distributor</option>
                            <option value="manufacturer">Manufacturer</option>
                        </select>

                        <select
                            value={supplierSearch}
                            onChange={(e) => setSupplierSearch(e.target.value)}
                            className="w-full p-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                        >
                            <option value="">Select Supplier</option>
                            <option value="supplier1">Supplier 1</option>
                            <option value="supplier2">Supplier 2</option>
                            <option value="supplier3">Supplier 3</option>
                        </select>

                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full p-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-gray-400"
                            placeholder="Start Date"
                        />

                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full p-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-gray-400"
                            placeholder="End Date"
                        />

                        <button
                            onClick={handleSearch}
                            className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-colors shadow-sm"
                        >
                            <FaSearch /> Search
                        </button>
                    </div>
                </div>

                {/* Payment Input Card */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Add Payment Details</h2>
                    <div className="w-full grid grid-cols-1 md:grid-cols-7 gap-4">
                        <input
                            type="text"
                            placeholder="From *"
                            value={newPayment.from}
                            onChange={(e) => setNewPayment({ ...newPayment, from: e.target.value })}
                            className="w-full p-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                        />
                        <input
                            type="date"
                            value={newPayment.paymentDate}
                            onChange={(e) => setNewPayment({ ...newPayment, paymentDate: e.target.value })}
                            className="w-full p-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-gray-400"
                            placeholder="Payment Date *"
                        />
                        <select
                            value={newPayment.paymentMode}
                            onChange={(e) => setNewPayment({ ...newPayment, paymentMode: e.target.value })}
                            className="w-full p-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                        >
                            <option value="">Payment Mode *</option>
                            <option value="cash">Cash</option>
                            <option value="card">Card</option>
                            <option value="bank">Bank Transfer</option>
                        </select>
                        <input
                            type="number"
                            placeholder="Total *"
                            value={newPayment.total || ''}
                            onChange={(e) => setNewPayment({ ...newPayment, total: Number(e.target.value) })}
                            className="w-full p-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                            min="0"
                        />
                        <input
                            type="number"
                            placeholder="Paid Amount"
                            value={newPayment.paidAmount || ''}
                            onChange={(e) => setNewPayment({ ...newPayment, paidAmount: Number(e.target.value) })}
                            className="w-full p-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                            min="0"
                        />
                        <input
                            type="number"
                            placeholder="Enter Amount"
                            value={newPayment.enterAmount || ''}
                            onChange={(e) => setNewPayment({ ...newPayment, enterAmount: Number(e.target.value) })}
                            className="w-full p-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                            min="0"
                        />
                        <button
                            onClick={handleAddPayment}
                            className="w-full flex items-center justify-center gap-2 bg-green-500 text-white p-3 rounded-md hover:bg-green-600 transition-colors shadow-sm"
                        >
                            <FaPlus /> Add
                        </button>
                    </div>
                </div>

                {/* Payments Table Card */}
                <div className="bg-white rounded-lg shadow-md p-6 overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead className="bg-blue-50 text-blue-700">
                            <tr>
                                <th className="p-3 text-left font-semibold w-1/6">From</th>
                                <th className="p-3 text-left font-semibold w-1/6">Payment Date</th>
                                <th className="p-3 text-left font-semibold w-1/6">Payment Mode</th>
                                <th className="p-3 text-left font-semibold w-1/6">Total</th>
                                <th className="p-3 text-left font-semibold w-1/6">Paid Amount</th>
                                <th className="p-3 text-left font-semibold w-1/6">Remaining</th>
                                <th className="p-3 text-left font-semibold w-1/6">Entered</th>
                                <th className="p-3 text-left font-semibold w-1/12">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment) => (
                                <tr key={payment.id} className="border-b hover:bg-blue-50 transition-colors">
                                    <td className="p-3 w-1/6">{payment.from}</td>
                                    <td className="p-3 w-1/6">{payment.paymentDate}</td>
                                    <td className="p-3 w-1/6">{payment.paymentMode}</td>
                                    <td className="p-3 w-1/6">${payment.total.toFixed(2)}</td>
                                    <td className="p-3 w-1/6">${payment.paidAmount.toFixed(2)}</td>
                                    <td className="p-3 w-1/6 text-red-600">${payment.remainingAmount.toFixed(2)}</td>
                                    <td className="p-3 w-1/6">${payment.enterAmount.toFixed(2)}</td>
                                    <td className="p-3 w-1/12">
                                        <button
                                            onClick={() => handleDeletePayment(payment.id)}
                                            className="text-red-500 hover:text-red-700 transition-colors"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {payments.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="p-4 text-center text-gray-500">
                                        No payments added yet. Add a payment above to get started!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Summary and Save */}
                <div className="mt-6 bg-white rounded-lg shadow-md p-6 flex justify-between items-center">
                    <div className="text-gray-700">
                        <p>Total Payments: <span className="font-semibold">{payments.length}</span></p>
                        <p>Total Amount: <span className="font-semibold">${payments.reduce((sum, p) => sum + p.total, 0).toFixed(2)}</span></p>
                        <p>Total Remaining: <span className="font-semibold text-red-600">${payments.reduce((sum, p) => sum + p.remainingAmount, 0).toFixed(2)}</span></p>
                    </div>
                    <button
                        onClick={handleSave}
                        className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors shadow-md"
                    >
                        <FaSave /> Save Payments
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PurchaseInvoice;