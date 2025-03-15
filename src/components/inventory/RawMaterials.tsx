// src/components/RawMaterials.tsx
// import React, { useState } from 'react';
// // import { RawMaterial, Category } from '../types';
// import { PencilIcon, EyeIcon } from '@heroicons/react/outline';


// // src/types.ts
// export interface RawMaterial {
//     id: string;
//     name: string;
//     category: string;
//     isFavorite: boolean;
//     isAvailable: boolean;
//     createdAt: Date;
//     modifiedAt: Date;
//     createdBy: string;
//     modifiedBy: string;
//     barcode?: string;
// }

// export type Category = 'Vegetable' | 'Oils' | 'Spices' | 'Dairy' | 'Meat' | 'Grains';


// // src/components/RawMaterials.tsx
// import React, { useState } from 'react';
// // import { RawMaterial, Category } from '../types';
// import { PencilIcon, EyeIcon } from '@heroicons/react/outline';

// const RawMaterials: React.FC = () => {
//     const [materials, setMaterials] = useState<RawMaterial[]>([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
//     const [newMaterial, setNewMaterial] = useState({
//         name: '',
//         category: '' as Category,
//         isFavorite: false,
//         isAvailable: true,
//     });
//     const [editingMaterial, setEditingMaterial] = useState<RawMaterial | null>(null);
//     const [viewingMaterial, setViewingMaterial] = useState<RawMaterial | null>(null);
//     const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

//     const categories: Category[] = ['Vegetable', 'Oils', 'Spices', 'Dairy', 'Meat', 'Grains'];

//     // Show message function
//     const showMessage = (text: string, type: 'success' | 'error') => {
//         setMessage({ text, type });
//         setTimeout(() => setMessage(null), 3000); // Message disappears after 3 seconds
//     };

//     // Add new material
//     const handleAddMaterial = () => {
//         if (!newMaterial.name || !newMaterial.category) {
//             showMessage('Please fill in all required fields', 'error');
//             return;
//         }
//         const material: RawMaterial = {
//             id: crypto.randomUUID(),
//             ...newMaterial,
//             createdAt: new Date(),
//             modifiedAt: new Date(),
//             createdBy: 'user@example.com',
//             modifiedBy: 'user@example.com',
//         };
//         setMaterials([...materials, material]);
//         setNewMaterial({ name: '', category: '' as Category, isFavorite: false, isAvailable: true });
//         showMessage('Raw material added successfully', 'success');
//     };

//     // Edit material
//     const handleEditMaterial = () => {
//         if (!editingMaterial?.name || !editingMaterial?.category) {
//             showMessage('Please fill in all required fields', 'error');
//             return;
//         }
//         if (editingMaterial) {
//             setMaterials(materials.map(m =>
//                 m.id === editingMaterial.id
//                     ? { ...editingMaterial, modifiedAt: new Date(), modifiedBy: 'user@example.com' }
//                     : m
//             ));
//             setEditingMaterial(null);
//             showMessage('Raw material updated successfully', 'success');
//         }
//     };

//     // Save all materials
//     const handleSaveMaterials = () => {
//         // Simulate API call
//         if (materials.length === 0) {
//             showMessage('No materials to save', 'error');
//             return;
//         }
//         showMessage('All materials saved successfully', 'success');
//     };

//     // Copy selected materials
//     const handleCopyMaterials = () => {
//         if (selectedMaterials.length === 0) {
//             showMessage('Please select materials to copy', 'error');
//             return;
//         }
//         const copied = materials.filter(m => selectedMaterials.includes(m.id));
//         const newMaterials = copied.map(m => ({
//             ...m,
//             id: crypto.randomUUID(),
//             name: `${m.name} (Copy)`,
//             createdAt: new Date(),
//             modifiedAt: new Date(),
//         }));
//         setMaterials([...materials, ...newMaterials]);
//         showMessage(`${selectedMaterials.length} material(s) copied successfully`, 'success');
//     };

//     // Import/Export handlers
//     const handleExportAll = () => {
//         if (materials.length === 0) {
//             showMessage('No materials to export', 'error');
//             return;
//         }
//         const json = JSON.stringify(materials);
//         const blob = new Blob([json], { type: 'application/json' });
//         const url = URL.createObjectURL(blob);
//         const link = document.createElement('a');
//         link.href = url;
//         link.download = 'raw_materials.json';
//         link.click();
//         showMessage('All materials exported successfully', 'success');
//     };

//     const handleExportCurrent = () => {
//         const filtered = materials.filter(m =>
//             m.name.toLowerCase().includes(searchTerm.toLowerCase())
//         );
//         if (filtered.length === 0) {
//             showMessage('No matching materials to export', 'error');
//             return;
//         }
//         const json = JSON.stringify(filtered);
//         const blob = new Blob([json], { type: 'application/json' });
//         const url = URL.createObjectURL(blob);
//         const link = document.createElement('a');
//         link.href = url;
//         link.download = 'raw_materials_current.json';
//         link.click();
//         showMessage('Current page exported successfully', 'success');
//     };

//     const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (!file) {
//             showMessage('Please select a file', 'error');
//             return;
//         }
//         const reader = new FileReader();
//         reader.onload = (event) => {
//             try {
//                 const data = JSON.parse(event.target?.result as string);
//                 setMaterials(data);
//                 showMessage('Materials imported successfully', 'success');
//             } catch {
//                 showMessage('Invalid file format', 'error');
//             }
//         };
//         reader.readAsText(file);
//     };

//     // Selection handlers
//     const toggleSelectAll = () => {
//         if (selectedMaterials.length === filteredMaterials.length) {
//             setSelectedMaterials([]);
//         } else {
//             setSelectedMaterials(filteredMaterials.map(m => m.id));
//         }
//     };

//     const toggleSelectMaterial = (id: string) => {
//         setSelectedMaterials(prev =>
//             prev.includes(id)
//                 ? prev.filter(materialId => materialId !== id)
//                 : [...prev, id]
//         );
//     };

//     const filteredMaterials = materials.filter(m =>
//         m.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//         <div className="container mx-auto p-4 relative">
//             {/* Message Notification */}
//             {message && (
//                 <div className={`fixed top-4 right-4 p-4 rounded shadow-lg ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'
//                     } text-white`}>
//                     {message.text}
//                 </div>
//             )}

//             {/* Top Section */}
//             <div className="mb-4 flex flex-col md:flex-row gap-4">
//                 <button
//                     onClick={handleAddMaterial}
//                     className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                 >
//                     Add Raw Material
//                 </button>
//                 <select className="border p-2 rounded">
//                     <option value="">Action</option>
//                     <option value="toggleFavorite">Toggle Favorite</option>
//                     <option value="toggleAvailable">Toggle Available</option>
//                 </select>
//                 <div className="relative">
//                     <select className="border p-2 rounded appearance-none">
//                         <option>Import</option>
//                     </select>
//                     <input
//                         type="file"
//                         accept=".json"
//                         onChange={handleImport}
//                         className="absolute inset-0 opacity-0 cursor-pointer"
//                     />
//                 </div>
//                 <select
//                     onChange={(e) => {
//                         if (e.target.value === 'exportCurrent') handleExportCurrent();
//                         if (e.target.value === 'exportAll') handleExportAll();
//                     }}
//                     className="border p-2 rounded"
//                 >
//                     <option value="">Export</option>
//                     <option value="exportCurrent">Export Current Page</option>
//                     <option value="exportAll">Export All</option>
//                 </select>
//             </div>

//             {/* Middle Section */}
//             <div className="mb-4 flex flex-col md:flex-row gap-4 items-start md:items-center">
//                 <input
//                     type="text"
//                     placeholder="Name"
//                     value={newMaterial.name}
//                     onChange={(e) => setNewMaterial({ ...newMaterial, name: e.target.value })}
//                     className="border p-2 rounded w-full md:w-48"
//                 />
//                 <select
//                     value={newMaterial.category}
//                     onChange={(e) => setNewMaterial({ ...newMaterial, category: e.target.value as Category })}
//                     className="border p-2 rounded w-full md:w-48"
//                 >
//                     <option value="">Select Category</option>
//                     {categories.map(cat => (
//                         <option key={cat} value={cat}>{cat}</option>
//                     ))}
//                 </select>
//                 <input
//                     type="text"
//                     placeholder="Search by name..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="border p-2 rounded w-full md:w-48"
//                 />
//                 <button
//                     onClick={() => {
//                         setMaterials([]);
//                         showMessage('All materials cleared', 'success');
//                     }}
//                     className="bg-gray-500 text-white px-4 py-2 rounded"
//                 >
//                     Show All
//                 </button>
//                 <button
//                     onClick={handleSaveMaterials}
//                     className="bg-green-500 text-white px-4 py-2 rounded"
//                 >
//                     Save Raw Material
//                 </button>
//                 <button
//                     onClick={handleCopyMaterials}
//                     className="bg-purple-500 text-white px-4 py-2 rounded"
//                 >
//                     Copy Raw Material
//                 </button>
//             </div>

//             {/* Table */}
//             <div className="overflow-x-auto">
//                 <table className="min-w-full bg-white">
//                     <thead className="bg-gray-100">
//                         <tr>
//                             <th className="p-3 text-left">
//                                 <input
//                                     type="checkbox"
//                                     checked={selectedMaterials.length === filteredMaterials.length && filteredMaterials.length > 0}
//                                     onChange={toggleSelectAll}
//                                 />
//                             </th>
//                             <th className="p-3 text-left">Name</th>
//                             <th className="p-3 text-left">Category</th>
//                             <th className="p-3 text-left">Favorite</th>
//                             <th className="p-3 text-left">Available</th>
//                             <th className="p-3 text-left">Modified</th>
//                             <th className="p-3 text-left">By</th>
//                             <th className="p-3 text-left">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filteredMaterials.map(material => (
//                             <tr key={material.id} className="border-b">
//                                 <td className="p-3">
//                                     <input
//                                         type="checkbox"
//                                         checked={selectedMaterials.includes(material.id)}
//                                         onChange={() => toggleSelectMaterial(material.id)}
//                                     />
//                                 </td>
//                                 <td className="p-3">{material.name}</td>
//                                 <td className="p-3">{material.category}</td>
//                                 <td className="p-3">
//                                     <input
//                                         type="checkbox"
//                                         checked={material.isFavorite}
//                                         onChange={() => {
//                                             setMaterials(materials.map(m =>
//                                                 m.id === material.id ? { ...m, isFavorite: !m.isFavorite } : m
//                                             ));
//                                             showMessage(`Favorite status updated for ${material.name}`, 'success');
//                                         }}
//                                     />
//                                 </td>
//                                 <td className="p-3">
//                                     <input
//                                         type="checkbox"
//                                         checked={material.isAvailable}
//                                         onChange={() => {
//                                             setMaterials(materials.map(m =>
//                                                 m.id === material.id ? { ...m, isAvailable: !m.isAvailable } : m
//                                             ));
//                                             showMessage(`Availability updated for ${material.name}`, 'success');
//                                         }}
//                                     />
//                                 </td>
//                                 <td className="p-3">{material.modifiedAt.toLocaleString()}</td>
//                                 <td className="p-3">{material.modifiedBy}</td>
//                                 <td className="p-3 flex space-x-2">
//                                     <button
//                                         onClick={() => setEditingMaterial(material)}
//                                         className="text-blue-500"
//                                     >
//                                         <PencilIcon className="h-5 w-5" />
//                                     </button>
//                                     <button
//                                         onClick={() => setViewingMaterial(material)}
//                                         className="text-green-500"
//                                     >
//                                         <EyeIcon className="h-5 w-5" />
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Edit Modal */}
//             {editingMaterial && (
//                 <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
//                     <div className="bg-white p-6 rounded-lg w-full max-w-md">
//                         <h2 className="text-xl font-bold mb-4">Edit Raw Material</h2>
//                         <div className="space-y-4">
//                             <input
//                                 type="text"
//                                 value={editingMaterial.name}
//                                 onChange={(e) => setEditingMaterial({ ...editingMaterial, name: e.target.value })}
//                                 className="border p-2 rounded w-full"
//                             />
//                             <select
//                                 value={editingMaterial.category}
//                                 onChange={(e) => setEditingMaterial({ ...editingMaterial, category: e.target.value as Category })}
//                                 className="border p-2 rounded w-full"
//                             >
//                                 {categories.map(cat => (
//                                     <option key={cat} value={cat}>{cat}</option>
//                                 ))}
//                             </select>
//                             <div className="flex items-center space-x-2">
//                                 <input
//                                     type="checkbox"
//                                     checked={editingMaterial.isFavorite}
//                                     onChange={(e) => setEditingMaterial({ ...editingMaterial, isFavorite: e.target.checked })}
//                                 />
//                                 <span>Favorite</span>
//                             </div>
//                             <div className="flex items-center space-x-2">
//                                 <input
//                                     type="checkbox"
//                                     checked={editingMaterial.isAvailable}
//                                     onChange={(e) => setEditingMaterial({ ...editingMaterial, isAvailable: e.target.checked })}
//                                 />
//                                 <span>Available</span>
//                             </div>
//                             <div className="flex justify-end space-x-2">
//                                 <button
//                                     onClick={() => setEditingMaterial(null)}
//                                     className="bg-gray-500 text-white px-4 py-2 rounded"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     onClick={handleEditMaterial}
//                                     className="bg-blue-500 text-white px-4 py-2 rounded"
//                                 >
//                                     Save
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* View Modal */}
//             {viewingMaterial && (
//                 <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
//                     <div className="bg-white p-6 rounded-lg w-full max-w-md">
//                         <h2 className="text-xl font-bold mb-4">View Raw Material</h2>
//                         <div className="space-y-4">
//                             <p><strong>Name:</strong> {viewingMaterial.name}</p>
//                             <p><strong>Category:</strong> {viewingMaterial.category}</p>
//                             <p><strong>Favorite:</strong> {viewingMaterial.isFavorite ? 'Yes' : 'No'}</p>
//                             <p><strong>Available:</strong> {viewingMaterial.isAvailable ? 'Yes' : 'No'}</p>
//                             <p><strong>Created:</strong> {viewingMaterial.createdAt.toLocaleString()}</p>
//                             <p><strong>Modified:</strong> {viewingMaterial.modifiedAt.toLocaleString()}</p>
//                             <p><strong>By:</strong> {viewingMaterial.modifiedBy}</p>
//                             <div className="flex justify-end">
//                                 <button
//                                     onClick={() => setViewingMaterial(null)}
//                                     className="bg-gray-500 text-white px-4 py-2 rounded"
//                                 >
//                                     Close
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default RawMaterials;




export interface RawMaterial {
    id: string;
    name: string;
    description: string;
    barcode?: string;
    category: Category;
    purchaseUnit: string;
    consumptionUnit: string;
    purchasePrice: number;
    internalPrice: number;
    reconciliationPrice: number;
    normalLoss: number;
    taxType: 'GST' | 'VAT';
    taxPercentage: number;
    minStockLevel: number;
    minStockUnit: string;
    atParStockLevel: number;
    atParStockUnit: string;
    closingStockFrequency: 'daily' | 'weekly';
    hsnCode: string;
    isPrivate: boolean;
    hasExpiry: boolean;
    useMaterials: boolean;
    quantity: number;
    gtin: string;
    brand: string;
    isFavorite: boolean;
    isAvailable: boolean;
    createdAt: Date;
    modifiedAt: Date;
    createdBy: string;
    modifiedBy: string;
}

export type Category = 'Vegetable' | 'Oils' | 'Spices' | 'Dairy' | 'Meat' | 'Grains';





// import React, { useState } from 'react';
// // import { RawMaterial, Category } from '../types';
// import { PencilIcon, EyeIcon } from '@heroicons/react/outline';

// interface Unit {
//     id: string;
//     name: string;
// }

// const RawMaterials: React.FC = () => {
//     const [materials, setMaterials] = useState<RawMaterial[]>([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
//     const [showAddModal, setShowAddModal] = useState(false);
//     const [editingMaterial, setEditingMaterial] = useState<RawMaterial | null>(null);
//     const [viewingMaterial, setViewingMaterial] = useState<RawMaterial | null>(null);
//     const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

//     const categories: Category[] = ['Vegetable', 'Oils', 'Spices', 'Dairy', 'Meat', 'Grains'];
//     const units: Unit[] = [
//         { id: 'gm', name: 'Gram (gm)' },
//         { id: 'kg', name: 'Kilogram (kg)' },
//         { id: 'ml', name: 'Milliliter (ml)' },
//         { id: 'l', name: 'Liter (l)' },
//         { id: 'pcs', name: 'Pieces (pcs)' },
//     ];

//     const [newMaterial, setNewMaterial] = useState<RawMaterial>({
//         id: '',
//         name: '',
//         description: '',
//         barcode: '',
//         category: '' as Category,
//         purchaseUnit: '',
//         consumptionUnit: '',
//         purchasePrice: 0,
//         internalPrice: 0,
//         reconciliationPrice: 0,
//         normalLoss: 0,
//         taxType: 'GST',
//         taxPercentage: 0,
//         minStockLevel: 0,
//         minStockUnit: '',
//         atParStockLevel: 0,
//         atParStockUnit: '',
//         closingStockFrequency: 'daily',
//         hsnCode: '',
//         isPrivate: false,
//         hasExpiry: false,
//         useMaterials: false,
//         quantity: 0,
//         gtin: '',
//         brand: '',
//         isFavorite: false,
//         isAvailable: true,
//         createdAt: new Date(),
//         modifiedAt: new Date(),
//         createdBy: '',
//         modifiedBy: '',
//     });

//     const showMessage = (text: string, type: 'success' | 'error') => {
//         setMessage({ text, type });
//         setTimeout(() => setMessage(null), 3000);
//     };

//     const handleAddMaterial = () => {
//         if (!newMaterial.name || !newMaterial.category) {
//             showMessage('Please fill in all required fields (Name and Category)', 'error');
//             return;
//         }
//         const material: RawMaterial = {
//             ...newMaterial,
//             id: crypto.randomUUID(),
//             createdAt: new Date(),
//             modifiedAt: new Date(),
//             createdBy: 'user@example.com',
//             modifiedBy: 'user@example.com',
//         };
//         setMaterials([...materials, material]);
//         setNewMaterial({
//             id: '',
//             name: '',
//             description: '',
//             barcode: '',
//             category: '' as Category,
//             purchaseUnit: '',
//             consumptionUnit: '',
//             purchasePrice: 0,
//             internalPrice: 0,
//             reconciliationPrice: 0,
//             normalLoss: 0,
//             taxType: 'GST',
//             taxPercentage: 0,
//             minStockLevel: 0,
//             minStockUnit: '',
//             atParStockLevel: 0,
//             atParStockUnit: '',
//             closingStockFrequency: 'daily',
//             hsnCode: '',
//             isPrivate: false,
//             hasExpiry: false,
//             useMaterials: false,
//             quantity: 0,
//             gtin: '',
//             brand: '',
//             isFavorite: false,
//             isAvailable: true,
//             createdAt: new Date(),
//             modifiedAt: new Date(),
//             createdBy: '',
//             modifiedBy: '',
//         });
//         setShowAddModal(false);
//         showMessage('Raw material added successfully', 'success');
//     };

//     const handleEditMaterial = () => {
//         if (!editingMaterial?.name || !editingMaterial?.category) {
//             showMessage('Please fill in all required fields', 'error');
//             return;
//         }
//         if (editingMaterial) {
//             setMaterials(materials.map(m =>
//                 m.id === editingMaterial.id
//                     ? { ...editingMaterial, modifiedAt: new Date(), modifiedBy: 'user@example.com' }
//                     : m
//             ));
//             setEditingMaterial(null);
//             showMessage('Raw material updated successfully', 'success');
//         }
//     };

//     const handleSaveMaterials = () => {
//         if (materials.length === 0) {
//             showMessage('No materials to save', 'error');
//             return;
//         }
//         showMessage('All materials saved successfully', 'success');
//     };

//     const handleCopyMaterials = () => {
//         if (selectedMaterials.length === 0) {
//             showMessage('Please select materials to copy', 'error');
//             return;
//         }
//         const copied = materials.filter(m => selectedMaterials.includes(m.id));
//         const newMaterials = copied.map(m => ({
//             ...m,
//             id: crypto.randomUUID(),
//             name: `${m.name} (Copy)`,
//             createdAt: new Date(),
//             modifiedAt: new Date(),
//         }));
//         setMaterials([...materials, ...newMaterials]);
//         showMessage(`${selectedMaterials.length} material(s) copied successfully`, 'success');
//     };

//     const handleExportAll = () => {
//         if (materials.length === 0) {
//             showMessage('No materials to export', 'error');
//             return;
//         }
//         const json = JSON.stringify(materials);
//         const blob = new Blob([json], { type: 'application/json' });
//         const url = URL.createObjectURL(blob);
//         const link = document.createElement('a');
//         link.href = url;
//         link.download = 'raw_materials.json';
//         link.click();
//         showMessage('All materials exported successfully', 'success');
//     };

//     const handleExportCurrent = () => {
//         const filtered = materials.filter(m =>
//             m.name.toLowerCase().includes(searchTerm.toLowerCase())
//         );
//         if (filtered.length === 0) {
//             showMessage('No matching materials to export', 'error');
//             return;
//         }
//         const json = JSON.stringify(filtered);
//         const blob = new Blob([json], { type: 'application/json' });
//         const url = URL.createObjectURL(blob);
//         const link = document.createElement('a');
//         link.href = url;
//         link.download = 'raw_materials_current.json';
//         link.click();
//         showMessage('Current page exported successfully', 'success');
//     };

//     const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (!file) {
//             showMessage('Please select a file', 'error');
//             return;
//         }
//         const reader = new FileReader();
//         reader.onload = (event) => {
//             try {
//                 const data = JSON.parse(event.target?.result as string);
//                 setMaterials(data.map((m: any) => ({
//                     ...m,
//                     createdAt: new Date(m.createdAt),
//                     modifiedAt: new Date(m.modifiedAt),
//                 })));
//                 showMessage('Materials imported successfully', 'success');
//             } catch {
//                 showMessage('Invalid file format', 'error');
//             }
//         };
//         reader.readAsText(file);
//     };

//     const toggleSelectAll = () => {
//         if (selectedMaterials.length === filteredMaterials.length) {
//             setSelectedMaterials([]);
//         } else {
//             setSelectedMaterials(filteredMaterials.map(m => m.id));
//         }
//     };

//     const toggleSelectMaterial = (id: string) => {
//         setSelectedMaterials(prev =>
//             prev.includes(id)
//                 ? prev.filter(materialId => materialId !== id)
//                 : [...prev, id]
//         );
//     };

//     const filteredMaterials = materials.filter(m =>
//         m.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//         <div className="container mx-auto p-4 relative">
//             {message && (
//                 <div className={`fixed top-4 right-4 p-4 rounded shadow-lg ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
//                     {message.text}
//                 </div>
//             )}

//             {/* Top Section */}
//             <div className="mb-4 flex flex-col md:flex-row gap-4">
//                 <button
//                     onClick={() => setShowAddModal(true)}
//                     className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                 >
//                     Add Raw Material
//                 </button>
//                 <select className="border p-2 rounded">
//                     <option value="">Action</option>
//                     <option value="toggleFavorite">Toggle Favorite</option>
//                     <option value="toggleAvailable">Toggle Available</option>
//                 </select>
//                 <div className="relative">
//                     <select className="border p-2 rounded appearance-none">
//                         <option>Import</option>
//                     </select>
//                     <input
//                         type="file"
//                         accept=".json"
//                         onChange={handleImport}
//                         className="absolute inset-0 opacity-0 cursor-pointer"
//                     />
//                 </div>
//                 <select
//                     onChange={(e) => {
//                         if (e.target.value === 'exportCurrent') handleExportCurrent();
//                         if (e.target.value === 'exportAll') handleExportAll();
//                     }}
//                     className="border p-2 rounded"
//                 >
//                     <option value="">Export</option>
//                     <option value="exportCurrent">Export Current Page</option>
//                     <option value="exportAll">Export All</option>
//                 </select>
//             </div>

//             {/* Middle Section */}
//             <div className="mb-4 flex flex-col md:flex-row gap-4 items-start md:items-center">
//                 <input
//                     type="text"
//                     placeholder="Search by name..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="border p-2 rounded w-full md:w-48"
//                 />
//                 <button
//                     onClick={() => {
//                         setMaterials([]);
//                         showMessage('All materials cleared', 'success');
//                     }}
//                     className="bg-gray-500 text-white px-4 py-2 rounded"
//                 >
//                     Clear All
//                 </button>
//                 <button
//                     onClick={handleSaveMaterials}
//                     className="bg-green-500 text-white px-4 py-2 rounded"
//                 >
//                     Save All
//                 </button>
//                 <button
//                     onClick={handleCopyMaterials}
//                     className="bg-purple-500 text-white px-4 py-2 rounded"
//                 >
//                     Copy Selected
//                 </button>
//             </div>

//             {/* Table */}
//             <div className="overflow-x-auto">
//                 <table className="min-w-full bg-white">
//                     <thead className="bg-gray-100">
//                         <tr>
//                             <th className="p-3 text-left">
//                                 <input
//                                     type="checkbox"
//                                     checked={selectedMaterials.length === filteredMaterials.length && filteredMaterials.length > 0}
//                                     onChange={toggleSelectAll}
//                                 />
//                             </th>
//                             <th className="p-3 text-left">Name</th>
//                             <th className="p-3 text-left">Category</th>
//                             <th className="p-3 text-left">Favorite</th>
//                             <th className="p-3 text-left">Available</th>
//                             <th className="p-3 text-left">Modified</th>
//                             <th className="p-3 text-left">By</th>
//                             <th className="p-3 text-left">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filteredMaterials.map(material => (
//                             <tr key={material.id} className="border-b">
//                                 <td className="p-3">
//                                     <input
//                                         type="checkbox"
//                                         checked={selectedMaterials.includes(material.id)}
//                                         onChange={() => toggleSelectMaterial(material.id)}
//                                     />
//                                 </td>
//                                 <td className="p-3">{material.name}</td>
//                                 <td className="p-3">{material.category}</td>
//                                 <td className="p-3">
//                                     <input
//                                         type="checkbox"
//                                         checked={material.isFavorite}
//                                         onChange={() => {
//                                             setMaterials(materials.map(m =>
//                                                 m.id === material.id ? { ...m, isFavorite: !m.isFavorite } : m
//                                             ));
//                                             showMessage(`Favorite status updated for ${material.name}`, 'success');
//                                         }}
//                                     />
//                                 </td>
//                                 <td className="p-3">
//                                     <input
//                                         type="checkbox"
//                                         checked={material.isAvailable}
//                                         onChange={() => {
//                                             setMaterials(materials.map(m =>
//                                                 m.id === material.id ? { ...m, isAvailable: !m.isAvailable } : m
//                                             ));
//                                             showMessage(`Availability updated for ${material.name}`, 'success');
//                                         }}
//                                     />
//                                 </td>
//                                 <td className="p-3">{material.modifiedAt.toLocaleString()}</td>
//                                 <td className="p-3">{material.modifiedBy}</td>
//                                 <td className="p-3 flex space-x-2">
//                                     <button
//                                         onClick={() => setEditingMaterial(material)}
//                                         className="text-blue-500"
//                                     >
//                                         <PencilIcon className="h-5 w-5" />
//                                     </button>
//                                     <button
//                                         onClick={() => setViewingMaterial(material)}
//                                         className="text-green-500"
//                                     >
//                                         <EyeIcon className="h-5 w-5" />
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Add Material Modal */}
//             {showAddModal && (
//                 <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center overflow-y-auto">
//                     <div className="bg-white p-6 rounded-lg w-full max-w-2xl my-8">
//                         <h2 className="text-xl font-bold mb-4">Add Item</h2>
//                         <div className="space-y-6">
//                             {/* Basic Info */}
//                             <div>
//                                 <h3 className="font-semibold mb-2">Basic Information</h3>
//                                 <input
//                                     type="text"
//                                     placeholder="Name *"
//                                     value={newMaterial.name}
//                                     onChange={(e) => setNewMaterial({ ...newMaterial, name: e.target.value })}
//                                     className="border p-2 rounded w-full mb-2"
//                                 />
//                                 <textarea
//                                     placeholder="Description"
//                                     value={newMaterial.description}
//                                     onChange={(e) => setNewMaterial({ ...newMaterial, description: e.target.value })}
//                                     className="border p-2 rounded w-full mb-2"
//                                 />
//                                 <input
//                                     type="text"
//                                     placeholder="Barcode/Short Code"
//                                     value={newMaterial.barcode}
//                                     onChange={(e) => setNewMaterial({ ...newMaterial, barcode: e.target.value })}
//                                     className="border p-2 rounded w-full mb-2"
//                                 />
//                                 <select
//                                     value={newMaterial.category}
//                                     onChange={(e) => setNewMaterial({ ...newMaterial, category: e.target.value as Category })}
//                                     className="border p-2 rounded w-full"
//                                 >
//                                     <option value="">Select Category *</option>
//                                     {categories.map(cat => (
//                                         <option key={cat} value={cat}>{cat}</option>
//                                     ))}
//                                 </select>
//                             </div>

//                             {/* Units */}
//                             <div>
//                                 <h3 className="font-semibold mb-2">Units</h3>
//                                 <div className="grid grid-cols-2 gap-4">
//                                     <select
//                                         value={newMaterial.purchaseUnit}
//                                         onChange={(e) => setNewMaterial({ ...newMaterial, purchaseUnit: e.target.value })}
//                                         className="border p-2 rounded"
//                                     >
//                                         <option value="">Purchase Unit</option>
//                                         {units.map(unit => (
//                                             <option key={unit.id} value={unit.id}>{unit.name}</option>
//                                         ))}
//                                     </select>
//                                     <select
//                                         value={newMaterial.consumptionUnit}
//                                         onChange={(e) => setNewMaterial({ ...newMaterial, consumptionUnit: e.target.value })}
//                                         className="border p-2 rounded"
//                                     >
//                                         <option value="">Consumption Unit</option>
//                                         {units.map(unit => (
//                                             <option key={unit.id} value={unit.id}>{unit.name}</option>
//                                         ))}
//                                     </select>
//                                 </div>
//                             </div>

//                             {/* Prices */}
//                             <div>
//                                 <h3 className="font-semibold mb-2">Prices</h3>
//                                 <input
//                                     type="number"
//                                     placeholder="Purchase Price"
//                                     value={newMaterial.purchasePrice}
//                                     onChange={(e) => setNewMaterial({ ...newMaterial, purchasePrice: Number(e.target.value) })}
//                                     className="border p-2 rounded w-full mb-2"
//                                 />
//                                 <input
//                                     type="number"
//                                     placeholder="Internal Transfer/Sale Price"
//                                     value={newMaterial.internalPrice}
//                                     onChange={(e) => setNewMaterial({ ...newMaterial, internalPrice: Number(e.target.value) })}
//                                     className="border p-2 rounded w-full mb-2"
//                                 />
//                                 <input
//                                     type="number"
//                                     placeholder="Reconciliation Price"
//                                     value={newMaterial.reconciliationPrice}
//                                     onChange={(e) => setNewMaterial({ ...newMaterial, reconciliationPrice: Number(e.target.value) })}
//                                     className="border p-2 rounded w-full mb-2"
//                                 />
//                                 <input
//                                     type="number"
//                                     placeholder="Normal Loss %"
//                                     value={newMaterial.normalLoss}
//                                     onChange={(e) => setNewMaterial({ ...newMaterial, normalLoss: Number(e.target.value) })}
//                                     className="border p-2 rounded w-full"
//                                 />
//                             </div>

//                             {/* Taxes */}
//                             <div>
//                                 <h3 className="font-semibold mb-2">Taxes</h3>
//                                 <div className="flex items-center space-x-4 mb-2">
//                                     <label>
//                                         <input
//                                             type="radio"
//                                             checked={newMaterial.taxType === 'GST'}
//                                             onChange={() => setNewMaterial({ ...newMaterial, taxType: 'GST' })}
//                                         />
//                                         GST
//                                     </label>
//                                     <label>
//                                         <input
//                                             type="radio"
//                                             checked={newMaterial.taxType === 'VAT'}
//                                             onChange={() => setNewMaterial({ ...newMaterial, taxType: 'VAT' })}
//                                         />
//                                         VAT
//                                     </label>
//                                 </div>
//                                 <input
//                                     type="number"
//                                     placeholder="Tax Percentage"
//                                     value={newMaterial.taxPercentage}
//                                     onChange={(e) => setNewMaterial({ ...newMaterial, taxPercentage: Number(e.target.value) })}
//                                     className="border p-2 rounded w-full"
//                                 />
//                             </div>

//                             {/* Stocks */}
//                             <div>
//                                 <h3 className="font-semibold mb-2">Stocks</h3>
//                                 <div className="grid grid-cols-2 gap-4 mb-2">
//                                     <select
//                                         value={newMaterial.minStockUnit}
//                                         onChange={(e) => setNewMaterial({ ...newMaterial, minStockUnit: e.target.value })}
//                                         className="border p-2 rounded"
//                                     >
//                                         <option value="">Min Stock Unit</option>
//                                         {units.map(unit => (
//                                             <option key={unit.id} value={unit.id}>{unit.name}</option>
//                                         ))}
//                                     </select>
//                                     <input
//                                         type="number"
//                                         placeholder="Min Stock Level"
//                                         value={newMaterial.minStockLevel}
//                                         onChange={(e) => setNewMaterial({ ...newMaterial, minStockLevel: Number(e.target.value) })}
//                                         className="border p-2 rounded"
//                                     />
//                                 </div>
//                                 <div className="grid grid-cols-2 gap-4 mb-2">
//                                     <select
//                                         value={newMaterial.atParStockUnit}
//                                         onChange={(e) => setNewMaterial({ ...newMaterial, atParStockUnit: e.target.value })}
//                                         className="border p-2 rounded"
//                                     >
//                                         <option value="">At Par Stock Unit</option>
//                                         {units.map(unit => (
//                                             <option key={unit.id} value={unit.id}>{unit.name}</option>
//                                         ))}
//                                     </select>
//                                     <input
//                                         type="number"
//                                         placeholder="At Par Stock Level"
//                                         value={newMaterial.atParStockLevel}
//                                         onChange={(e) => setNewMaterial({ ...newMaterial, atParStockLevel: Number(e.target.value) })}
//                                         className="border p-2 rounded"
//                                     />
//                                 </div>
//                                 <select
//                                     value={newMaterial.closingStockFrequency}
//                                     onChange={(e) => setNewMaterial({ ...newMaterial, closingStockFrequency: e.target.value as 'daily' | 'weekly' })}
//                                     className="border p-2 rounded w-full"
//                                 >
//                                     <option value="daily">Daily</option>
//                                     <option value="weekly">Weekly</option>
//                                 </select>
//                             </div>

//                             {/* Other */}
//                             <div>
//                                 <h3 className="font-semibold mb-2">Other</h3>
//                                 <input
//                                     type="text"
//                                     placeholder="HSN Code"
//                                     value={newMaterial.hsnCode}
//                                     onChange={(e) => setNewMaterial({ ...newMaterial, hsnCode: e.target.value })}
//                                     className="border p-2 rounded w-full mb-2"
//                                 />
//                                 <div className="flex items-center space-x-4 mb-2">
//                                     <label>
//                                         <input
//                                             type="checkbox"
//                                             checked={newMaterial.isPrivate}
//                                             onChange={(e) => setNewMaterial({ ...newMaterial, isPrivate: e.target.checked })}
//                                         />
//                                         Is Private
//                                     </label>
//                                     <label>
//                                         <input
//                                             type="checkbox"
//                                             checked={newMaterial.hasExpiry}
//                                             onChange={(e) => setNewMaterial({ ...newMaterial, hasExpiry: e.target.checked })}
//                                         />
//                                         Has Expiry
//                                     </label>
//                                 </div>
//                                 <div className="flex items-center space-x-4 mb-2">
//                                     <label>
//                                         <input
//                                             type="radio"
//                                             checked={newMaterial.useMaterials}
//                                             onChange={() => setNewMaterial({ ...newMaterial, useMaterials: true })}
//                                         />
//                                         Use Materials: On
//                                     </label>
//                                     <label>
//                                         <input
//                                             type="radio"
//                                             checked={!newMaterial.useMaterials}
//                                             onChange={() => setNewMaterial({ ...newMaterial, useMaterials: false })}
//                                         />
//                                         Off
//                                     </label>
//                                 </div>
//                                 <input
//                                     type="number"
//                                     placeholder="Quantity (gm/ml)"
//                                     value={newMaterial.quantity}
//                                     onChange={(e) => setNewMaterial({ ...newMaterial, quantity: Number(e.target.value) })}
//                                     className="border p-2 rounded w-full mb-2"
//                                 />
//                                 <input
//                                     type="text"
//                                     placeholder="GTIN"
//                                     value={newMaterial.gtin}
//                                     onChange={(e) => setNewMaterial({ ...newMaterial, gtin: e.target.value })}
//                                     className="border p-2 rounded w-full mb-2"
//                                 />
//                                 <input
//                                     type="text"
//                                     placeholder="Brand"
//                                     value={newMaterial.brand}
//                                     onChange={(e) => setNewMaterial({ ...newMaterial, brand: e.target.value })}
//                                     className="border p-2 rounded w-full"
//                                 />
//                             </div>

//                             {/* Buttons */}
//                             <div className="flex justify-end space-x-2">
//                                 <button
//                                     onClick={() => setShowAddModal(false)}
//                                     className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     onClick={handleAddMaterial}
//                                     className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                                 >
//                                     Save Changes
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* Edit Modal */}
//             {editingMaterial && (
//                 <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
//                     <div className="bg-white p-6 rounded-lg w-full max-w-md">
//                         <h2 className="text-xl font-bold mb-4">Edit Raw Material</h2>
//                         <div className="space-y-4">
//                             <input
//                                 type="text"
//                                 value={editingMaterial.name}
//                                 onChange={(e) => setEditingMaterial({ ...editingMaterial, name: e.target.value })}
//                                 className="border p-2 rounded w-full"
//                             />
//                             <select
//                                 value={editingMaterial.category}
//                                 onChange={(e) => setEditingMaterial({ ...editingMaterial, category: e.target.value as Category })}
//                                 className="border p-2 rounded w-full"
//                             >
//                                 {categories.map(cat => (
//                                     <option key={cat} value={cat}>{cat}</option>
//                                 ))}
//                             </select>
//                             <div className="flex items-center space-x-2">
//                                 <input
//                                     type="checkbox"
//                                     checked={editingMaterial.isFavorite}
//                                     onChange={(e) => setEditingMaterial({ ...editingMaterial, isFavorite: e.target.checked })}
//                                 />
//                                 <span>Favorite</span>
//                             </div>
//                             <div className="flex items-center space-x-2">
//                                 <input
//                                     type="checkbox"
//                                     checked={editingMaterial.isAvailable}
//                                     onChange={(e) => setEditingMaterial({ ...editingMaterial, isAvailable: e.target.checked })}
//                                 />
//                                 <span>Available</span>
//                             </div>
//                             <div className="flex justify-end space-x-2">
//                                 <button
//                                     onClick={() => setEditingMaterial(null)}
//                                     className="bg-gray-500 text-white px-4 py-2 rounded"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     onClick={handleEditMaterial}
//                                     className="bg-blue-500 text-white px-4 py-2 rounded"
//                                 >
//                                     Save
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* View Modal */}
//             {viewingMaterial && (
//                 <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
//                     <div className="bg-white p-6 rounded-lg w-full max-w-md">
//                         <h2 className="text-xl font-bold mb-4">View Raw Material</h2>
//                         <div className="space-y-4">
//                             <p><strong>Name:</strong> {viewingMaterial.name}</p>
//                             <p><strong>Description:</strong> {viewingMaterial.description}</p>
//                             <p><strong>Barcode:</strong> {viewingMaterial.barcode || 'N/A'}</p>
//                             <p><strong>Category:</strong> {viewingMaterial.category}</p>
//                             <p><strong>Purchase Unit:</strong> {viewingMaterial.purchaseUnit || 'N/A'}</p>
//                             <p><strong>Consumption Unit:</strong> {viewingMaterial.consumptionUnit || 'N/A'}</p>
//                             <p><strong>Purchase Price:</strong> {viewingMaterial.purchasePrice}</p>
//                             <p><strong>Internal Price:</strong> {viewingMaterial.internalPrice}</p>
//                             <p><strong>Reconciliation Price:</strong> {viewingMaterial.reconciliationPrice}</p>
//                             <p><strong>Normal Loss %:</strong> {viewingMaterial.normalLoss}</p>
//                             <p><strong>Tax Type:</strong> {viewingMaterial.taxType}</p>
//                             <p><strong>Tax %:</strong> {viewingMaterial.taxPercentage}</p>
//                             <p><strong>Min Stock:</strong> {viewingMaterial.minStockLevel} {viewingMaterial.minStockUnit}</p>
//                             <p><strong>At Par Stock:</strong> {viewingMaterial.atParStockLevel} {viewingMaterial.atParStockUnit}</p>
//                             <p><strong>Closing Stock Frequency:</strong> {viewingMaterial.closingStockFrequency}</p>
//                             <p><strong>HSN Code:</strong> {viewingMaterial.hsnCode || 'N/A'}</p>
//                             <p><strong>Private:</strong> {viewingMaterial.isPrivate ? 'Yes' : 'No'}</p>
//                             <p><strong>Has Expiry:</strong> {viewingMaterial.hasExpiry ? 'Yes' : 'No'}</p>
//                             <p><strong>Use Materials:</strong> {viewingMaterial.useMaterials ? 'On' : 'Off'}</p>
//                             <p><strong>Quantity:</strong> {viewingMaterial.quantity}</p>
//                             <p><strong>GTIN:</strong> {viewingMaterial.gtin || 'N/A'}</p>
//                             <p><strong>Brand:</strong> {viewingMaterial.brand || 'N/A'}</p>
//                             <p><strong>Favorite:</strong> {viewingMaterial.isFavorite ? 'Yes' : 'No'}</p>
//                             <p><strong>Available:</strong> {viewingMaterial.isAvailable ? 'Yes' : 'No'}</p>
//                             <p><strong>Created:</strong> {viewingMaterial.createdAt.toLocaleString()}</p>
//                             <p><strong>Modified:</strong> {viewingMaterial.modifiedAt.toLocaleString()}</p>
//                             <p><strong>By:</strong> {viewingMaterial.modifiedBy}</p>
//                             <div className="flex justify-end">
//                                 <button
//                                     onClick={() => setViewingMaterial(null)}
//                                     className="bg-gray-500 text-white px-4 py-2 rounded"
//                                 >
//                                     Close
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default RawMaterials;



import React, { useState } from 'react';
// import { RawMaterial, Category } from '../types';
import { PencilIcon, EyeIcon } from '@heroicons/react/outline';
import { useNavigate } from 'react-router-dom';

const RawMaterials: React.FC = () => {
    const [materials, setMaterials] = useState<RawMaterial[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
    const [editingMaterial, setEditingMaterial] = useState<RawMaterial | null>(null);
    const [viewingMaterial, setViewingMaterial] = useState<RawMaterial | null>(null);
    const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

    const navigate = useNavigate();
    const categories: Category[] = ['Vegetable', 'Oils', 'Spices', 'Dairy', 'Meat', 'Grains'];

    const showMessage = (text: string, type: 'success' | 'error') => {
        setMessage({ text, type });
        setTimeout(() => setMessage(null), 3000);
    };

    const handleEditMaterial = () => {
        if (!editingMaterial?.name || !editingMaterial?.category) {
            showMessage('Please fill in all required fields', 'error');
            return;
        }
        if (editingMaterial) {
            setMaterials(materials.map(m =>
                m.id === editingMaterial.id
                    ? { ...editingMaterial, modifiedAt: new Date(), modifiedBy: 'user@example.com' }
                    : m
            ));
            setEditingMaterial(null);
            showMessage('Raw material updated successfully', 'success');
        }
    };

    const handleSaveMaterials = () => {
        if (materials.length === 0) {
            showMessage('No materials to save', 'error');
            return;
        }
        showMessage('All materials saved successfully', 'success');
    };

    const handleCopyMaterials = () => {
        if (selectedMaterials.length === 0) {
            showMessage('Please select materials to copy', 'error');
            return;
        }
        const copied = materials.filter(m => selectedMaterials.includes(m.id));
        const newMaterials = copied.map(m => ({
            ...m,
            id: crypto.randomUUID(),
            name: `${m.name} (Copy)`,
            createdAt: new Date(),
            modifiedAt: new Date(),
        }));
        setMaterials([...materials, ...newMaterials]);
        showMessage(`${selectedMaterials.length} material(s) copied successfully`, 'success');
    };

    const handleExportAll = () => {
        if (materials.length === 0) {
            showMessage('No materials to export', 'error');
            return;
        }
        const json = JSON.stringify(materials);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'raw_materials.json';
        link.click();
        showMessage('All materials exported successfully', 'success');
    };

    const handleExportCurrent = () => {
        const filtered = materials.filter(m =>
            m.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (filtered.length === 0) {
            showMessage('No matching materials to export', 'error');
            return;
        }
        const json = JSON.stringify(filtered);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'raw_materials_current.json';
        link.click();
        showMessage('Current page exported successfully', 'success');
    };

    const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            showMessage('Please select a file', 'error');
            return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target?.result as string);
                setMaterials(data.map((m: any) => ({
                    ...m,
                    createdAt: new Date(m.createdAt),
                    modifiedAt: new Date(m.modifiedAt),
                })));
                showMessage('Materials imported successfully', 'success');
            } catch {
                showMessage('Invalid file format', 'error');
            }
        };
        reader.readAsText(file);
    };

    const toggleSelectAll = () => {
        if (selectedMaterials.length === filteredMaterials.length) {
            setSelectedMaterials([]);
        } else {
            setSelectedMaterials(filteredMaterials.map(m => m.id));
        }
    };

    const toggleSelectMaterial = (id: string) => {
        setSelectedMaterials(prev =>
            prev.includes(id)
                ? prev.filter(materialId => materialId !== id)
                : [...prev, id]
        );
    };

    const filteredMaterials = materials.filter(m =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto p-4 relative">
            {message && (
                <div className={`fixed top-4 right-4 p-4 rounded shadow-lg ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                    {message.text}
                </div>
            )}

            <div className="mb-4 flex flex-col md:flex-row gap-4">
                <button
                    onClick={() => navigate('/add-raw-material')}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Add Raw Material
                </button>
                <select className="border p-2 rounded">
                    <option value="">Action</option>
                    <option value="toggleFavorite">Toggle Favorite</option>
                    <option value="toggleAvailable">Toggle Available</option>
                </select>
                <div className="relative">
                    <select className="border p-2 rounded appearance-none">
                        <option>Import</option>
                    </select>
                    <input
                        type="file"
                        accept=".json"
                        onChange={handleImport}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                </div>
                <select
                    onChange={(e) => {
                        if (e.target.value === 'exportCurrent') handleExportCurrent();
                        if (e.target.value === 'exportAll') handleExportAll();
                    }}
                    className="border p-2 rounded"
                >
                    <option value="">Export</option>
                    <option value="exportCurrent">Export Current Page</option>
                    <option value="exportAll">Export All</option>
                </select>
            </div>

            <div className="mb-4 flex flex-col md:flex-row gap-4 items-start md:items-center">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-2 rounded w-full md:w-48"
                />
                <button
                    onClick={() => {
                        setMaterials([]);
                        showMessage('All materials cleared', 'success');
                    }}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                    Clear All
                </button>
                <button
                    onClick={handleSaveMaterials}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    Save All
                </button>
                <button
                    onClick={handleCopyMaterials}
                    className="bg-purple-500 text-white px-4 py-2 rounded"
                >
                    Copy Selected
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left">
                                <input
                                    type="checkbox"
                                    checked={selectedMaterials.length === filteredMaterials.length && filteredMaterials.length > 0}
                                    onChange={toggleSelectAll}
                                />
                            </th>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Category</th>
                            <th className="p-3 text-left">Favorite</th>
                            <th className="p-3 text-left">Available</th>
                            <th className="p-3 text-left">Modified</th>
                            <th className="p-3 text-left">By</th>
                            <th className="p-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMaterials.map(material => (
                            <tr key={material.id} className="border-b">
                                <td className="p-3">
                                    <input
                                        type="checkbox"
                                        checked={selectedMaterials.includes(material.id)}
                                        onChange={() => toggleSelectMaterial(material.id)}
                                    />
                                </td>
                                <td className="p-3">{material.name}</td>
                                <td className="p-3">{material.category}</td>
                                <td className="p-3">
                                    <input
                                        type="checkbox"
                                        checked={material.isFavorite}
                                        onChange={() => {
                                            setMaterials(materials.map(m =>
                                                m.id === material.id ? { ...m, isFavorite: !m.isFavorite } : m
                                            ));
                                            showMessage(`Favorite status updated for ${material.name}`, 'success');
                                        }}
                                    />
                                </td>
                                <td className="p-3">
                                    <input
                                        type="checkbox"
                                        checked={material.isAvailable}
                                        onChange={() => {
                                            setMaterials(materials.map(m =>
                                                m.id === material.id ? { ...m, isAvailable: !m.isAvailable } : m
                                            ));
                                            showMessage(`Availability updated for ${material.name}`, 'success');
                                        }}
                                    />
                                </td>
                                <td className="p-3">{material.modifiedAt.toLocaleString()}</td>
                                <td className="p-3">{material.modifiedBy}</td>
                                <td className="p-3 flex space-x-2">
                                    <button
                                        onClick={() => setEditingMaterial(material)}
                                        className="text-blue-500"
                                    >
                                        <PencilIcon className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={() => setViewingMaterial(material)}
                                        className="text-green-500"
                                    >
                                        <EyeIcon className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            {editingMaterial && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Edit Raw Material</h2>
                        <div className="space-y-4">
                            <input
                                type="text"
                                value={editingMaterial.name}
                                onChange={(e) => setEditingMaterial({ ...editingMaterial, name: e.target.value })}
                                className="border p-2 rounded w-full"
                            />
                            <select
                                value={editingMaterial.category}
                                onChange={(e) => setEditingMaterial({ ...editingMaterial, category: e.target.value as Category })}
                                className="border p-2 rounded w-full"
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={editingMaterial.isFavorite}
                                    onChange={(e) => setEditingMaterial({ ...editingMaterial, isFavorite: e.target.checked })}
                                />
                                <span>Favorite</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={editingMaterial.isAvailable}
                                    onChange={(e) => setEditingMaterial({ ...editingMaterial, isAvailable: e.target.checked })}
                                />
                                <span>Available</span>
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    onClick={() => setEditingMaterial(null)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleEditMaterial}
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* View Modal */}
            {viewingMaterial && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">View Raw Material</h2>
                        <div className="space-y-4">
                            <p><strong>Name:</strong> {viewingMaterial.name}</p>
                            <p><strong>Description:</strong> {viewingMaterial.description}</p>
                            <p><strong>Barcode:</strong> {viewingMaterial.barcode || 'N/A'}</p>
                            <p><strong>Category:</strong> {viewingMaterial.category}</p>
                            <p><strong>Purchase Unit:</strong> {viewingMaterial.purchaseUnit || 'N/A'}</p>
                            <p><strong>Consumption Unit:</strong> {viewingMaterial.consumptionUnit || 'N/A'}</p>
                            <p><strong>Purchase Price:</strong> {viewingMaterial.purchasePrice}</p>
                            <p><strong>Internal Price:</strong> {viewingMaterial.internalPrice}</p>
                            <p><strong>Reconciliation Price:</strong> {viewingMaterial.reconciliationPrice}</p>
                            <p><strong>Normal Loss %:</strong> {viewingMaterial.normalLoss}</p>
                            <p><strong>Tax Type:</strong> {viewingMaterial.taxType}</p>
                            <p><strong>Tax %:</strong> {viewingMaterial.taxPercentage}</p>
                            <p><strong>Min Stock:</strong> {viewingMaterial.minStockLevel} {viewingMaterial.minStockUnit}</p>
                            <p><strong>At Par Stock:</strong> {viewingMaterial.atParStockLevel} {viewingMaterial.atParStockUnit}</p>
                            <p><strong>Closing Stock Frequency:</strong> {viewingMaterial.closingStockFrequency}</p>
                            <p><strong>HSN Code:</strong> {viewingMaterial.hsnCode || 'N/A'}</p>
                            <p><strong>Private:</strong> {viewingMaterial.isPrivate ? 'Yes' : 'No'}</p>
                            <p><strong>Has Expiry:</strong> {viewingMaterial.hasExpiry ? 'Yes' : 'No'}</p>
                            <p><strong>Use Materials:</strong> {viewingMaterial.useMaterials ? 'On' : 'Off'}</p>
                            <p><strong>Quantity:</strong> {viewingMaterial.quantity} {viewingMaterial.quantityUnit}</p>
                            <p><strong>GTIN:</strong> {viewingMaterial.gtin || 'N/A'}</p>
                            <p><strong>Brand:</strong> {viewingMaterial.brand || 'N/A'}</p>
                            <p><strong>Favorite:</strong> {viewingMaterial.isFavorite ? 'Yes' : 'No'}</p>
                            <p><strong>Available:</strong> {viewingMaterial.isAvailable ? 'Yes' : 'No'}</p>
                            <p><strong>Created:</strong> {viewingMaterial.createdAt.toLocaleString()}</p>
                            <p><strong>Modified:</strong> {viewingMaterial.modifiedAt.toLocaleString()}</p>
                            <p><strong>By:</strong> {viewingMaterial.modifiedBy}</p>
                            <div className="flex justify-end">
                                <button
                                    onClick={() => setViewingMaterial(null)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RawMaterials;