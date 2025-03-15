// // ThirdPartySupplier.tsx
// import React, { useState } from 'react';
// import {
//     FaEye,
//     FaEdit,
//     FaLink,
//     FaMoneyBillWave,
//     FaSearch,
//     FaPlus
// } from 'react-icons/fa';

// interface Supplier {
//     id: number;
//     name: string;
//     type: string;
//     email: string;
//     company: string;
//     phone: string;
//     gstNo: string;
//     fssaiLicNo: string;
//     status: 'active' | 'inactive';
// }

// const ThirdPartySupplier: React.FC = () => {
//     const [suppliers, setSuppliers] = useState<Supplier[]>([
//         {
//             id: 1,
//             name: "John Doe",
//             type: "Vendor",
//             email: "john@example.com",
//             company: "ABC Corp",
//             phone: "123-456-7890",
//             gstNo: "GST123456",
//             fssaiLicNo: "FSSAI789",
//             status: "active"
//         }
//         // Add more sample data as needed
//     ]);

//     const [nameSearch, setNameSearch] = useState('');
//     const [companySearch, setCompanySearch] = useState('');

//     const handleSearch = () => {
//         // Implement search logic here
//         console.log('Searching:', { nameSearch, companySearch });
//     };

//     const handleShowAll = () => {
//         setNameSearch('');
//         setCompanySearch('');
//         // Reset to show all suppliers
//     };

//     return (
//         <div className="container mx-auto p-4">
//             {/* Top Section */}
//             <div className="flex justify-between items-center mb-6 bg-gray-100 p-4 rounded-lg">
//                 <div className="flex items-center gap-4">
//                     <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
//                         <FaPlus /> Add New Supplier
//                     </button>

//                     <div className="relative">
//                         <select className="appearance-none bg-white border border-gray-300 rounded px-4 py-2 pr-8">
//                             <option>Action</option>
//                             <option>Active</option>
//                             <option>Inactive</option>
//                         </select>
//                     </div>

//                     <div className="relative">
//                         <select className="appearance-none bg-white border border-gray-300 rounded px-4 py-2 pr-8">
//                             <option>Import</option>
//                             <option>CSV</option>
//                             <option>Excel</option>
//                         </select>
//                     </div>

//                     <div className="relative">
//                         <select className="appearance-none bg-white border border-gray-300 rounded px-4 py-2 pr-8">
//                             <option>Export</option>
//                             <option>CSV</option>
//                             <option>Excel</option>
//                             <option>PDF</option>
//                         </select>
//                     </div>
//                 </div>
//             </div>

//             {/* Search Section */}
//             <div className="flex gap-4 mb-6">
//                 <input
//                     type="text"
//                     placeholder="Search by name..."
//                     value={nameSearch}
//                     onChange={(e) => setNameSearch(e.target.value)}
//                     className="border border-gray-300 rounded px-4 py-2 flex-1"
//                 />
//                 <input
//                     type="text"
//                     placeholder="Search by company..."
//                     value={companySearch}
//                     onChange={(e) => setCompanySearch(e.target.value)}
//                     className="border border-gray-300 rounded px-4 py-2 flex-1"
//                 />
//                 <button
//                     onClick={handleSearch}
//                     className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//                 >
//                     <FaSearch /> Search
//                 </button>
//                 <button
//                     onClick={handleShowAll}
//                     className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
//                 >
//                     Show All
//                 </button>
//             </div>

//             {/* Table Section */}
//             <div className="overflow-x-auto">
//                 <table className="w-full border-collapse">
//                     <thead>
//                         <tr className="bg-gray-200">
//                             <th className="p-3 text-left"><input type="checkbox" /></th>
//                             <th className="p-3 text-left">Name</th>
//                             <th className="p-3 text-left">Type</th>
//                             <th className="p-3 text-left">Email</th>
//                             <th className="p-3 text-left">Company</th>
//                             <th className="p-3 text-left">Phone</th>
//                             <th className="p-3 text-left">GST No</th>
//                             <th className="p-3 text-left">FSSAI Lic No</th>
//                             <th className="p-3 text-left">Status</th>
//                             <th className="p-3 text-left">Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {suppliers.map((supplier) => (
//                             <tr key={supplier.id} className="border-b hover:bg-gray-50">
//                                 <td className="p-3"><input type="checkbox" /></td>
//                                 <td className="p-3">{supplier.name}</td>
//                                 <td className="p-3">{supplier.type}</td>
//                                 <td className="p-3">{supplier.email}</td>
//                                 <td className="p-3">{supplier.company}</td>
//                                 <td className="p-3">{supplier.phone}</td>
//                                 <td className="p-3">{supplier.gstNo}</td>
//                                 <td className="p-3">{supplier.fssaiLicNo}</td>
//                                 <td className="p-3">
//                                     <span className={`px-2 py-1 rounded ${supplier.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//                                         }`}>
//                                         {supplier.status}
//                                     </span>
//                                 </td>
//                                 <td className="p-3">
//                                     <div className="flex gap-2">
//                                         <button className="text-blue-500 hover:text-blue-700" title="View">
//                                             <FaEye />
//                                         </button>
//                                         <button className="text-green-500 hover:text-green-700" title="Edit">
//                                             <FaEdit />
//                                         </button>
//                                         <button className="text-purple-500 hover:text-purple-700" title="Map Raw Material">
//                                             <FaLink />
//                                         </button>
//                                         <button className="text-yellow-500 hover:text-yellow-700" title="Bulk Payment">
//                                             <FaMoneyBillWave />
//                                         </button>
//                                     </div>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default ThirdPartySupplier;





// src/components/ThirdPartySupplier.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FaEye,
    FaEdit,
    FaLink,
    FaMoneyBillWave,
    FaSearch,
    FaPlus
} from 'react-icons/fa';
import * as XLSX from 'xlsx';

interface Supplier {
    id: number;
    name: string;
    type: string;
    email: string;
    company: string;
    phone: string;
    gstNo: string;
    fssaiLicNo: string;
    status: 'active' | 'inactive';
}

const ThirdPartySupplier: React.FC = () => {
    const navigate = useNavigate();
    const [suppliers, setSuppliers] = useState<Supplier[]>([
        {
            id: 1,
            name: "John Doe",
            type: "Vendor",
            email: "john@example.com",
            company: "ABC Corp",
            phone: "123-456-7890",
            gstNo: "GST123456",
            fssaiLicNo: "FSSAI789",
            status: "active"
        }
    ]);
    const [nameSearch, setNameSearch] = useState('');
    const [companySearch, setCompanySearch] = useState('');
    const [selectedSuppliers, setSelectedSuppliers] = useState<number[]>([]);

    const handleSearch = () => {
        const filtered = suppliers.filter(supplier =>
            supplier.name.toLowerCase().includes(nameSearch.toLowerCase()) &&
            supplier.company.toLowerCase().includes(companySearch.toLowerCase())
        );
        setSuppliers(filtered);
    };

    const handleShowAll = () => {
        setNameSearch('');
        setCompanySearch('');
        // Here you would typically fetch all suppliers from API
        // For now, we'll just reset to initial state
        setSuppliers(suppliers);
    };

    const handleActionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const action = e.target.value;
        if (action === 'active' || action === 'inactive') {
            const updatedSuppliers = suppliers.map(supplier =>
                selectedSuppliers.includes(supplier.id)
                    ? { ...supplier, status: action as 'active' | 'inactive' }
                    : supplier
            );
            setSuppliers(updatedSuppliers);
            setSelectedSuppliers([]);
        }
    };

    const handleExportExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(suppliers);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Suppliers");
        XLSX.writeFile(workbook, "suppliers.xlsx");
    };

    const handleImportExcel = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const data = new Uint8Array(event.target?.result as ArrayBuffer);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const importedData = XLSX.utils.sheet_to_json<Supplier>(worksheet);
                setSuppliers(importedData);
            };
            reader.readAsArrayBuffer(file);
        }
    };

    const toggleSupplierSelection = (id: number) => {
        setSelectedSuppliers(prev =>
            prev.includes(id)
                ? prev.filter(sid => sid !== id)
                : [...prev, id]
        );
    };

    return (
        <div className="container mx-auto p-4">
            {/* Top Section */}
            <div className="flex justify-between items-center mb-6 bg-gray-100 p-4 rounded-lg">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/suppliers/third-party/add-supplier')}
                        className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        <FaPlus /> Add New Supplier
                    </button>

                    <select
                        onChange={handleActionChange}
                        className="appearance-none bg-white border border-gray-300 rounded px-4 py-2 pr-8"
                    >
                        <option value="">Action</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>

                    <div className="relative">
                        <input
                            type="file"
                            accept=".xlsx, .xls"
                            onChange={handleImportExcel}
                            className="opacity-0 absolute w-full h-full"
                        />
                        <button className="bg-white border border-gray-300 rounded px-4 py-2">
                            Import Excel
                        </button>
                    </div>

                    <button
                        onClick={handleExportExcel}
                        className="bg-white border border-gray-300 rounded px-4 py-2"
                    >
                        Export Excel
                    </button>
                </div>
            </div>

            {/* Search Section */}
            <div className="flex gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={nameSearch}
                    onChange={(e) => setNameSearch(e.target.value)}
                    className="border border-gray-300 rounded px-4 py-2 flex-1"
                />
                <input
                    type="text"
                    placeholder="Search by company..."
                    value={companySearch}
                    onChange={(e) => setCompanySearch(e.target.value)}
                    className="border border-gray-300 rounded px-4 py-2 flex-1"
                />
                <button
                    onClick={handleSearch}
                    className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    <FaSearch /> Search
                </button>
                <button
                    onClick={handleShowAll}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                    Show All
                </button>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-3 text-left"><input type="checkbox" /></th>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Type</th>
                            <th className="p-3 text-left">Email</th>
                            <th className="p-3 text-left">Company</th>
                            <th className="p-3 text-left">Phone</th>
                            <th className="p-3 text-left">GST No</th>
                            <th className="p-3 text-left">FSSAI Lic No</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {suppliers.map((supplier) => (
                            <tr key={supplier.id} className="border-b hover:bg-gray-50">
                                <td className="p-3">
                                    <input
                                        type="checkbox"
                                        checked={selectedSuppliers.includes(supplier.id)}
                                        onChange={() => toggleSupplierSelection(supplier.id)}
                                    />
                                </td>
                                <td className="p-3">{supplier.name}</td>
                                <td className="p-3">{supplier.type}</td>
                                <td className="p-3">{supplier.email}</td>
                                <td className="p-3">{supplier.company}</td>
                                <td className="p-3">{supplier.phone}</td>
                                <td className="p-3">{supplier.gstNo}</td>
                                <td className="p-3">{supplier.fssaiLicNo}</td>
                                <td className="p-3">
                                    <span className={`px-2 py-1 rounded ${supplier.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                        {supplier.status}
                                    </span>
                                </td>
                                <td className="p-3">
                                    <div className="flex gap-2">
                                        <button className="text-blue-500 hover:text-blue-700" title="View">
                                            <FaEye />
                                        </button>
                                        <button className="text-green-500 hover:text-green-700" title="Edit">
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => navigate(`/map-raw-materials/${supplier.id}`)}
                                            className="text-purple-500 hover:text-purple-700"
                                            title="Map Raw Material"
                                        >
                                            <FaLink />
                                        </button>
                                        <button
                                            onClick={() => navigate(`/bulk-payment/${supplier.id}`)}
                                            className="text-yellow-500 hover:text-yellow-700"
                                            title="Bulk Payment"
                                        >
                                            <FaMoneyBillWave />
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

export default ThirdPartySupplier;