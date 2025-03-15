// import React, { useState, ChangeEvent } from 'react';
// import { FaStar, FaSearch } from 'react-icons/fa';

// interface StockItem {
//   id: number;
//   category: string;
//   rawMaterial: string;
//   existingStock: number;
//   currentStock: number;
//   comments: string;
//   isFavorite: boolean;
// }

// const ClosingStock: React.FC = () => {
//   // State declarations
//   const [stockItems, setStockItems] = useState<StockItem[]>([
//     { id: 1, category: 'Dairy', rawMaterial: 'Milk', existingStock: 100, currentStock: 85, comments: '', isFavorite: false },
//     { id: 2, category: 'Grains', rawMaterial: 'Rice', existingStock: 200, currentStock: 180, comments: '', isFavorite: false },
//   ]);
//   const [searchTerm, setSearchTerm] = useState<string>('');
//   const [selectedCategory, setSelectedCategory] = useState<string>('');
//   const [selectedDate, setSelectedDate] = useState<string>('');
//   const [calculationType, setCalculationType] = useState<string>('daily');

//   // Handler functions
//   const handleAddClosingStock = () => {
//     const newItem: StockItem = {
//       id: stockItems.length + 1,
//       category: 'New',
//       rawMaterial: 'New Material',
//       existingStock: 0,
//       currentStock: 0,
//       comments: '',
//       isFavorite: false
//     };
//     setStockItems([...stockItems, newItem]);
//   };

//   const handleImport = (e: ChangeEvent<HTMLSelectElement>) => {
//     console.log('Importing from:', e.target.value);
//     // Add your import logic here
//   };

//   const handleSearch = () => {
//     // Filter logic based on search term, category, and date
//     console.log('Searching with:', { searchTerm, selectedCategory, selectedDate, calculationType });
//   };

//   const toggleFavorite = (id: number) => {
//     setStockItems(stockItems.map(item =>
//       item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
//     ));
//   };

//   const handleInputChange = (id: number, field: keyof StockItem, value: string | number) => {
//     setStockItems(stockItems.map(item =>
//       item.id === id ? { ...item, [field]: value } : item
//     ));
//   };

//   return (
//     <div className="container mx-auto p-4">
//       {/* Top Section */}
//       <div className="flex justify-between mb-4">
//         <button
//           onClick={handleAddClosingStock}
//           className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
//         >
//           Add Closing Stock
//         </button>
//         <select
//           onChange={handleImport}
//           className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           <option value="">Import</option>
//           <option value="csv">CSV</option>
//           <option value="excel">Excel</option>
//           <option value="json">JSON</option>
//         </select>
//       </div>

//       {/* Search Section */}
//       <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search Raw Material"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//         </div>
//         <select
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//           className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           <option value="">Category</option>
//           <option value="Dairy">Dairy</option>
//           <option value="Grains">Grains</option>
//           <option value="Vegetables">Vegetables</option>
//         </select>
//         <input
//           type="date"
//           value={selectedDate}
//           onChange={(e) => setSelectedDate(e.target.value)}
//           className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <select
//           value={calculationType}
//           onChange={(e) => setCalculationType(e.target.value)}
//           className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           <option value="daily">Daily</option>
//           <option value="weekly">Weekly</option>
//           <option value="monthly">Monthly</option>
//         </select>
//         <button
//           onClick={handleSearch}
//           className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
//         >
//           Load
//         </button>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto">
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="p-3 text-left">Favorite</th>
//               <th className="p-3 text-left">Category</th>
//               <th className="p-3 text-left">Raw Material</th>
//               <th className="p-3 text-left">Existing Stock</th>
//               <th className="p-3 text-left">Current Stock</th>
//               <th className="p-3 text-left">Comments</th>
//             </tr>
//           </thead>
//           <tbody>
//             {stockItems.map((item) => (
//               <tr key={item.id} className="border-b hover:bg-gray-50">
//                 <td className="p-3">
//                   <FaStar
//                     className={`cursor-pointer ${item.isFavorite ? 'text-yellow-400' : 'text-gray-400'}`}
//                     onClick={() => toggleFavorite(item.id)}
//                   />
//                 </td>
//                 <td className="p-3">
//                   <input
//                     type="text"
//                     value={item.category}
//                     onChange={(e) => handleInputChange(item.id, 'category', e.target.value)}
//                     className="w-full border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </td>
//                 <td className="p-3">
//                   <input
//                     type="text"
//                     value={item.rawMaterial}
//                     onChange={(e) => handleInputChange(item.id, 'rawMaterial', e.target.value)}
//                     className="w-full border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </td>
//                 <td className="p-3">
//                   <input
//                     type="number"
//                     value={item.existingStock}
//                     onChange={(e) => handleInputChange(item.id, 'existingStock', parseFloat(e.target.value))}
//                     className="w-full border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </td>
//                 <td className="p-3">
//                   <input
//                     type="number"
//                     value={item.currentStock}
//                     onChange={(e) => handleInputChange(item.id, 'currentStock', parseFloat(e.target.value))}
//                     className="w-full border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </td>
//                 <td className="p-3">
//                   <input
//                     type="text"
//                     value={item.comments}
//                     onChange={(e) => handleInputChange(item.id, 'comments', e.target.value)}
//                     className="w-full border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ClosingStock;




import React, { useState, ChangeEvent } from 'react';
import { FaStar, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface StockItem {
    id: number;
    category: string;
    rawMaterial: string;
    existingStock: number;
    currentStock: number;
    comments: string;
    isFavorite: boolean;
}

const ClosingStock: React.FC = () => {
    // State declarations
    const [stockItems, setStockItems] = useState<StockItem[]>([
        { id: 1, category: 'Dairy', rawMaterial: 'Milk', existingStock: 100, currentStock: 85, comments: '', isFavorite: false },
        { id: 2, category: 'Grains', rawMaterial: 'Rice', existingStock: 200, currentStock: 180, comments: '', isFavorite: false },
    ]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [calculationType, setCalculationType] = useState<string>('daily');

    // Handler functions
    const handleImport = (e: ChangeEvent<HTMLSelectElement>) => {
        console.log('Importing from:', e.target.value);
        // Add your import logic here
    };

    const handleSearch = () => {
        // Filter logic based on search term, category, and date
        console.log('Searching with:', { searchTerm, selectedCategory, selectedDate, calculationType });
    };

    const toggleFavorite = (id: number) => {
        setStockItems(stockItems.map(item =>
            item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
        ));
    };

    const handleInputChange = (id: number, field: keyof StockItem, value: string | number) => {
        setStockItems(stockItems.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    return (
        <div className="container mx-auto p-4">
            {/* Top Section */}
            <div className="flex justify-between mb-4">
                <Link
                    to="/inventory/closing-stock/add-closing-stock"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Add Closing Stock
                </Link>
                <select
                    onChange={handleImport}
                    className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Import</option>
                    <option value="csv">CSV</option>
                    <option value="excel">Excel</option>
                    <option value="json">JSON</option>
                </select>
            </div>

            {/* Search Section */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search Raw Material"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Category</option>
                    <option value="Dairy">Dairy</option>
                    <option value="Grains">Grains</option>
                    <option value="Vegetables">Vegetables</option>
                </select>
                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                    value={calculationType}
                    onChange={(e) => setCalculationType(e.target.value)}
                    className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                </select>
                <button
                    onClick={handleSearch}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                >
                    Load
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-3 text-left">Favorite</th>
                            <th className="p-3 text-left">Category</th>
                            <th className="p-3 text-left">Raw Material</th>
                            <th className="p-3 text-left">Existing Stock</th>
                            <th className="p-3 text-left">Current Stock</th>
                            <th className="p-3 text-left">Comments</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stockItems.map((item) => (
                            <tr key={item.id} className="border-b hover:bg-gray-50">
                                <td className="p-3">
                                    <FaStar
                                        className={`cursor-pointer ${item.isFavorite ? 'text-yellow-400' : 'text-gray-400'}`}
                                        onClick={() => toggleFavorite(item.id)}
                                    />
                                </td>
                                <td className="p-3">
                                    <input
                                        type="text"
                                        value={item.category}
                                        onChange={(e) => handleInputChange(item.id, 'category', e.target.value)}
                                        className="w-full border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </td>
                                <td className="p-3">
                                    <input
                                        type="text"
                                        value={item.rawMaterial}
                                        onChange={(e) => handleInputChange(item.id, 'rawMaterial', e.target.value)}
                                        className="w-full border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </td>
                                <td className="p-3">
                                    <input
                                        type="number"
                                        value={item.existingStock}
                                        onChange={(e) => handleInputChange(item.id, 'existingStock', parseFloat(e.target.value))}
                                        className="w-full border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </td>
                                <td className="p-3">
                                    <input
                                        type="number"
                                        value={item.currentStock}
                                        onChange={(e) => handleInputChange(item.id, 'currentStock', parseFloat(e.target.value))}
                                        className="w-full border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </td>
                                <td className="p-3">
                                    <input
                                        type="text"
                                        value={item.comments}
                                        onChange={(e) => handleInputChange(item.id, 'comments', e.target.value)}
                                        className="w-full border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ClosingStock;