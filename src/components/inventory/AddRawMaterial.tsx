// import React, { useState } from 'react';
// // import { RawMaterial, Category } from '../types';
// import { useNavigate } from 'react-router-dom';

// interface Unit {
//     id: string;
//     name: string;
// }

// export interface RawMaterial {
//     id: string;
//     name: string;
//     description: string;
//     barcode?: string;
//     category: Category;
//     purchaseUnit: string;
//     consumptionUnit: string;
//     purchasePrice: number;
//     internalPrice: number;
//     reconciliationPrice: number;
//     normalLoss: number;
//     taxType: 'GST' | 'VAT';
//     taxPercentage: number;
//     minStockLevel: number;
//     minStockUnit: string;
//     atParStockLevel: number;
//     atParStockUnit: string;
//     closingStockFrequency: 'daily' | 'weekly';
//     hsnCode: string;
//     isPrivate: boolean;
//     hasExpiry: boolean;
//     useMaterials: boolean;
//     quantity: number;
//     quantityUnit: string;
//     gtin: string;
//     brand: string;
//     isFavorite: boolean;
//     isAvailable: boolean;
//     createdAt: Date;
//     modifiedAt: Date;
//     createdBy: string;
//     modifiedBy: string;
// }

// export type Category = 'Vegetable' | 'Oils' | 'Spices' | 'Dairy' | 'Meat' | 'Grains';
// const AddRawMaterial: React.FC<{ onAdd: (material: RawMaterial) => void }> = ({ onAdd }) => {
//     const navigate = useNavigate();
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
//         quantityUnit: 'gm',
//         gtin: '',
//         brand: '',
//         isFavorite: false,
//         isAvailable: true,
//         createdAt: new Date(),
//         modifiedAt: new Date(),
//         createdBy: '',
//         modifiedBy: '',
//     });

//     const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

//     const showMessage = (text: string, type: 'success' | 'error') => {
//         setMessage({ text, type });
//         setTimeout(() => setMessage(null), 3000);
//     };

//     const handleAddMaterial = () => {
//         if (!newMaterial.name || !newMaterial.category) {
//             showMessage('Please fill in all required fields (Name and Category)', 'error');
//             return;
//         }
//         if (newMaterial.purchasePrice < 0 || newMaterial.internalPrice < 0 || newMaterial.reconciliationPrice < 0) {
//             showMessage('Prices cannot be negative', 'error');
//             return;
//         }
//         if (newMaterial.normalLoss < 0 || newMaterial.normalLoss > 100) {
//             showMessage('Normal Loss % must be between 0 and 100', 'error');
//             return;
//         }
//         if (newMaterial.taxPercentage < 0) {
//             showMessage('Tax Percentage cannot be negative', 'error');
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
//         onAdd(material);
//         showMessage('Raw material added successfully', 'success');
//         setTimeout(() => navigate('/'), 1000); // Navigate back after a short delay to show message
//     };

//     return (
//         <div className="container mx-auto p-4">
//             {message && (
//                 <div className={`fixed top-4 right-4 p-4 rounded shadow-lg ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
//                     {message.text}
//                 </div>
//             )}
//             <h2 className="text-2xl font-bold mb-6">Add Item</h2>
//             <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
//                 {/* Basic Info */}
//                 <div>
//                     <h3 className="font-semibold mb-2">Basic Information</h3>
//                     <input
//                         type="text"
//                         placeholder="Name *"
//                         value={newMaterial.name}
//                         onChange={(e) => setNewMaterial({ ...newMaterial, name: e.target.value })}
//                         className="border p-2 rounded w-full mb-2"
//                         required
//                     />
//                     <textarea
//                         placeholder="Description"
//                         value={newMaterial.description}
//                         onChange={(e) => setNewMaterial({ ...newMaterial, description: e.target.value })}
//                         className="border p-2 rounded w-full mb-2"
//                         rows={3}
//                     />
//                     <input
//                         type="text"
//                         placeholder="Barcode/Short Code"
//                         value={newMaterial.barcode}
//                         onChange={(e) => setNewMaterial({ ...newMaterial, barcode: e.target.value })}
//                         className="border p-2 rounded w-full mb-2"
//                     />
//                     <select
//                         value={newMaterial.category}
//                         onChange={(e) => setNewMaterial({ ...newMaterial, category: e.target.value as Category })}
//                         className="border p-2 rounded w-full"
//                         required
//                     >
//                         <option value="">Select Category *</option>
//                         {categories.map(cat => (
//                             <option key={cat} value={cat}>{cat}</option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Units */}
//                 <div>
//                     <h3 className="font-semibold mb-2">Units</h3>
//                     <div className="grid grid-cols-2 gap-4">
//                         <select
//                             value={newMaterial.purchaseUnit}
//                             onChange={(e) => setNewMaterial({ ...newMaterial, purchaseUnit: e.target.value })}
//                             className="border p-2 rounded"
//                         >
//                             <option value="">Select Purchase Unit</option>
//                             {units.map(unit => (
//                                 <option key={unit.id} value={unit.id}>{unit.name}</option>
//                             ))}
//                         </select>
//                         <select
//                             value={newMaterial.consumptionUnit}
//                             onChange={(e) => setNewMaterial({ ...newMaterial, consumptionUnit: e.target.value })}
//                             className="border p-2 rounded"
//                         >
//                             <option value="">Select Consumption Unit</option>
//                             {units.map(unit => (
//                                 <option key={unit.id} value={unit.id}>{unit.name}</option>
//                             ))}
//                         </select>
//                     </div>
//                 </div>

//                 {/* Prices */}
//                 {/* <div>
//                     <h3 className="font-semibold mb-2">Prices</h3>
//                     <input
//                         type="number"
//                         placeholder="Purchase Price"
//                         value={newMaterial.purchasePrice}
//                         onChange={(e) => setNewMaterial({ ...newMaterial, purchasePrice: Number(e.target.value) })}
//                         className="border p-2 rounded w-full mb-2"
//                         min="0"
//                         step="0.01"
//                     />
//                     <input
//                         type="number"
//                         placeholder="Internal Transfer/Sale Price"
//                         value={newMaterial.internalPrice}
//                         onChange={(e) => setNewMaterial({ ...newMaterial, internalPrice: Number(e.target.value) })}
//                         className="border p-2 rounded w-full mb-2"
//                         min="0"
//                         step="0.01"
//                     />
//                     <input
//                         type="number"
//                         placeholder="Reconciliation Price"
//                         value={newMaterial.reconciliationPrice}
//                         onChange={(e) => setNewMaterial({ ...newMaterial, reconciliationPrice: Number(e.target.value) })}
//                         className="border p-2 rounded w-full mb-2"
//                         min="0"
//                         step="0.01"
//                     />
//                     <input
//                         type="number"
//                         placeholder="Normal Loss %"
//                         value={newMaterial.normalLoss}
//                         onChange={(e) => setNewMaterial({ ...newMaterial, normalLoss: Number(e.target.value) })}
//                         className="border p-2 rounded w-full"
//                         min="0"
//                         max="100"
//                         step="0.1"
//                     />
//                 </div> */}

//                 <div>
//                     <h3 className="font-semibold mb-2">Prices</h3>
//                     <div className="space-y-4">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                                 Purchase Price (Cost Price)
//                             </label>
//                             <input
//                                 type="number"
//                                 value={newMaterial.purchasePrice}
//                                 onChange={(e) => setNewMaterial({ ...newMaterial, purchasePrice: Number(e.target.value) })}
//                                 className="border p-2 rounded w-full"
//                                 min="0"
//                                 step="0.01"
//                                 placeholder="Enter purchase price"
//                             />
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                                 Sale Price (Internal Transfer Price)
//                             </label>
//                             <input
//                                 type="number"
//                                 value={newMaterial.internalPrice}
//                                 onChange={(e) => setNewMaterial({ ...newMaterial, internalPrice: Number(e.target.value) })}
//                                 className="border p-2 rounded w-full"
//                                 min="0"
//                                 step="0.01"
//                                 placeholder="Enter sale price"
//                             />
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                                 Reconciliation Price
//                             </label>
//                             <input
//                                 type="number"
//                                 value={newMaterial.reconciliationPrice}
//                                 onChange={(e) => setNewMaterial({ ...newMaterial, reconciliationPrice: Number(e.target.value) })}
//                                 className="border p-2 rounded w-full"
//                                 min="0"
//                                 step="0.01"
//                                 placeholder="Enter reconciliation price"
//                             />
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                                 Normal Loss (%)
//                             </label>
//                             <input
//                                 type="number"
//                                 value={newMaterial.normalLoss}
//                                 onChange={(e) => setNewMaterial({ ...newMaterial, normalLoss: Number(e.target.value) })}
//                                 className="border p-2 rounded w-full"
//                                 min=""
//                                 max="100"
//                                 step="0.1"
//                                 placeholder="Enter normal loss percentage"
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 {/* Taxes */}
//                 <div>
//                     <h3 className="font-semibold mb-2">Taxes</h3>
//                     <div className="flex items-center space-x-4 mb-2">
//                         <label className="flex items-center">
//                             <input
//                                 type="radio"
//                                 checked={newMaterial.taxType === 'GST'}
//                                 onChange={() => setNewMaterial({ ...newMaterial, taxType: 'GST' })}
//                                 className="mr-1"
//                             />
//                             GST
//                         </label>
//                         <label className="flex items-center">
//                             <input
//                                 type="radio"
//                                 checked={newMaterial.taxType === 'VAT'}
//                                 onChange={() => setNewMaterial({ ...newMaterial, taxType: 'VAT' })}
//                                 className="mr-1"
//                             />
//                             VAT
//                         </label>
//                     </div>
//                     <input
//                         type="number"
//                         placeholder="Tax Percentage"
//                         value={newMaterial.taxPercentage}
//                         onChange={(e) => setNewMaterial({ ...newMaterial, taxPercentage: Number(e.target.value) })}
//                         className="border p-2 rounded w-full"
//                         min="0"
//                         step="0.1"
//                     />
//                 </div>

//                 {/* Stocks */}
//                 <div>
//                     <h3 className="font-semibold mb-2">Stocks</h3>
//                     <div className="grid grid-cols-2 gap-4 mb-2">
//                         <select
//                             value={newMaterial.minStockUnit}
//                             onChange={(e) => setNewMaterial({ ...newMaterial, minStockUnit: e.target.value })}
//                             className="border p-2 rounded"
//                         >
//                             <option value="">Select Min Stock Unit</option>
//                             {units.map(unit => (
//                                 <option key={unit.id} value={unit.id}>{unit.name}</option>
//                             ))}
//                         </select>
//                         <input
//                             type="number"
//                             placeholder="Min Stock Level"
//                             value={newMaterial.minStockLevel}
//                             onChange={(e) => setNewMaterial({ ...newMaterial, minStockLevel: Number(e.target.value) })}
//                             className="border p-2 rounded"
//                             min="0"
//                         />
//                     </div>
//                     <div className="grid grid-cols-2 gap-4 mb-2">
//                         <select
//                             value={newMaterial.atParStockUnit}
//                             onChange={(e) => setNewMaterial({ ...newMaterial, atParStockUnit: e.target.value })}
//                             className="border p-2 rounded"
//                         >
//                             <option value="">Select At Par Stock Unit</option>
//                             {units.map(unit => (
//                                 <option key={unit.id} value={unit.id}>{unit.name}</option>
//                             ))}
//                         </select>
//                         <input
//                             type="number"
//                             placeholder="At Par Stock Level"
//                             value={newMaterial.atParStockLevel}
//                             onChange={(e) => setNewMaterial({ ...newMaterial, atParStockLevel: Number(e.target.value) })}
//                             className="border p-2 rounded"
//                             min="0"
//                         />
//                     </div>
//                     <select
//                         value={newMaterial.closingStockFrequency}
//                         onChange={(e) => setNewMaterial({ ...newMaterial, closingStockFrequency: e.target.value as 'daily' | 'weekly' })}
//                         className="border p-2 rounded w-full"
//                     >
//                         <option value="daily">Daily</option>
//                         <option value="weekly">Weekly</option>
//                     </select>
//                 </div>

//                 {/* Other */}
//                 <div>
//                     <h3 className="font-semibold mb-2">Other</h3>
//                     <input
//                         type="text"
//                         placeholder="HSN Code"
//                         value={newMaterial.hsnCode}
//                         onChange={(e) => setNewMaterial({ ...newMaterial, hsnCode: e.target.value })}
//                         className="border p-2 rounded w-full mb-2"
//                     />
//                     <div className="flex items-center space-x-4 mb-2">
//                         <label className="flex items-center">
//                             <input
//                                 type="checkbox"
//                                 checked={newMaterial.isPrivate}
//                                 onChange={(e) => setNewMaterial({ ...newMaterial, isPrivate: e.target.checked })}
//                                 className="mr-1"
//                             />
//                             Is Private
//                         </label>
//                         <label className="flex items-center">
//                             <input
//                                 type="checkbox"
//                                 checked={newMaterial.hasExpiry}
//                                 onChange={(e) => setNewMaterial({ ...newMaterial, hasExpiry: e.target.checked })}
//                                 className="mr-1"
//                             />
//                             Has Expiry
//                         </label>
//                     </div>
//                     <div className="flex items-center space-x-4 mb-2">
//                         <label className="flex items-center">
//                             <input
//                                 type="radio"
//                                 checked={newMaterial.useMaterials}
//                                 onChange={() => setNewMaterial({ ...newMaterial, useMaterials: true })}
//                                 className="mr-1"
//                             />
//                             Use Materials: On
//                         </label>
//                         <label className="flex items-center">
//                             <input
//                                 type="radio"
//                                 checked={!newMaterial.useMaterials}
//                                 onChange={() => setNewMaterial({ ...newMaterial, useMaterials: false })}
//                                 className="mr-1"
//                             />
//                             Off
//                         </label>
//                     </div>
//                     <div className="grid grid-cols-2 gap-4 mb-2">
//                         <input
//                             type="number"
//                             placeholder="Quantity"
//                             value={newMaterial.quantity}
//                             onChange={(e) => setNewMaterial({ ...newMaterial, quantity: Number(e.target.value) })}
//                             className="border p-2 rounded"
//                             min="0"
//                         />
//                         <select
//                             value={newMaterial.quantityUnit}
//                             onChange={(e) => setNewMaterial({ ...newMaterial, quantityUnit: e.target.value })}
//                             className="border p-2 rounded"
//                         >
//                             <option value="gm">Gram (gm)</option>
//                             <option value="ml">Milliliter (ml)</option>
//                         </select>
//                     </div>
//                     <input
//                         type="text"
//                         placeholder="GTIN"
//                         value={newMaterial.gtin}
//                         onChange={(e) => setNewMaterial({ ...newMaterial, gtin: e.target.value })}
//                         className="border p-2 rounded w-full mb-2"
//                     />
//                     <input
//                         type="text"
//                         placeholder="Brand"
//                         value={newMaterial.brand}
//                         onChange={(e) => setNewMaterial({ ...newMaterial, brand: e.target.value })}
//                         className="border p-2 rounded w-full"
//                     />
//                 </div>

//                 {/* Buttons */}
//                 <div className="flex justify-end space-x-2">
//                     <button
//                         onClick={() => navigate('/')}
//                         className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
//                     >
//                         Cancel
//                     </button>
//                     <button
//                         onClick={handleAddMaterial}
//                         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                     >
//                         Save Changes
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AddRawMaterial;




// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// interface Unit {
//     id: string;
//     name: string;
// }

// export interface RawMaterial {
//     id: string;
//     name: string;
//     description: string;
//     barcode?: string;
//     category: Category;
//     purchaseUnit: string;
//     consumptionUnit: string;
//     purchasePrice: number;
//     internalPrice: number;
//     reconciliationPrice: number;
//     normalLoss: number;
//     taxType: 'GST' | 'VAT';
//     taxPercentage: number;
//     minStockLevel: number;
//     minStockUnit: string;
//     atParStockLevel: number;
//     atParStockUnit: string;
//     closingStockFrequency: 'daily' | 'weekly';
//     hsnCode: string;
//     isPrivate: boolean;
//     hasExpiry: boolean;
//     useMaterials: boolean;
//     quantity: number;
//     quantityUnit: string;
//     gtin: string;
//     brand: string;
//     isFavorite: boolean;
//     isAvailable: boolean;
//     createdAt: Date;
//     modifiedAt: Date;
//     createdBy: string;
//     modifiedBy: string;
// }

// export type Category = 'Vegetable' | 'Oils' | 'Spices' | 'Dairy' | 'Meat' | 'Grains';

// const AddRawMaterial: React.FC<{ onAdd: (material: RawMaterial) => void }> = ({ onAdd }) => {
//     const navigate = useNavigate();
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
//         purchasePrice: NaN,
//         internalPrice: NaN,
//         reconciliationPrice: NaN,
//         normalLoss: NaN,
//         taxType: 'GST',
//         taxPercentage: NaN,
//         minStockLevel: NaN,
//         minStockUnit: '',
//         atParStockLevel: NaN,
//         atParStockUnit: '',
//         closingStockFrequency: 'daily',
//         hsnCode: '',
//         isPrivate: false,
//         hasExpiry: false,
//         useMaterials: false,
//         quantity: NaN,
//         quantityUnit: 'gm',
//         gtin: '',
//         brand: '',
//         isFavorite: false,
//         isAvailable: true,
//         createdAt: new Date(),
//         modifiedAt: new Date(),
//         createdBy: '',
//         modifiedBy: '',
//     });

//     const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

//     const showMessage = (text: string, type: 'success' | 'error') => {
//         setMessage({ text, type });
//         setTimeout(() => setMessage(null), 3000);
//     };

//     const handleAddMaterial = () => {
//         if (!newMaterial.name || !newMaterial.category) {
//             showMessage('Please fill in all required fields (Name and Category)', 'error');
//             return;
//         }
//         if (isNaN(newMaterial.purchasePrice) || newMaterial.purchasePrice < 0) {
//             showMessage('Please enter a valid non-negative Purchase Price', 'error');
//             return;
//         }
//         if (isNaN(newMaterial.internalPrice) || newMaterial.internalPrice < 0) {
//             showMessage('Please enter a valid non-negative Sale Price', 'error');
//             return;
//         }
//         if (isNaN(newMaterial.reconciliationPrice) || newMaterial.reconciliationPrice < 0) {
//             showMessage('Please enter a valid non-negative Reconciliation Price', 'error');
//             return;
//         }
//         if (isNaN(newMaterial.normalLoss) || newMaterial.normalLoss < 0 || newMaterial.normalLoss > 100) {
//             showMessage('Normal Loss % must be between 0 and 100', 'error');
//             return;
//         }
//         if (isNaN(newMaterial.taxPercentage) || newMaterial.taxPercentage < 0) {
//             showMessage('Tax Percentage cannot be negative', 'error');
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
//         onAdd(material);
//         showMessage('Raw material added successfully', 'success');
//         setTimeout(() => navigate('/'), 1000);
//     };

//     return (
//         <div className="container mx-auto p-6 max-w-4xl">
//             {message && (
//                 <div className={`fixed top-4 right-4 p-4 rounded shadow-lg ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
//                     {message.text}
//                 </div>
//             )}
//             <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Add New Raw Material</h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-lg">
//                 {/* Left Column */}
//                 <div className="space-y-4">
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Item Name *</label>
//                         <input
//                             type="text"
//                             value={newMaterial.name}
//                             onChange={(e) => setNewMaterial({ ...newMaterial, name: e.target.value })}
//                             className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-300"
//                             placeholder="Enter item name"
//                             required
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
//                         <select
//                             value={newMaterial.category}
//                             onChange={(e) => setNewMaterial({ ...newMaterial, category: e.target.value as Category })}
//                             className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-300"
//                             required
//                         >
//                             <option value="">Select a category</option>
//                             {categories.map(cat => (
//                                 <option key={cat} value={cat}>{cat}</option>
//                             ))}
//                         </select>
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                         <textarea
//                             value={newMaterial.description}
//                             onChange={(e) => setNewMaterial({ ...newMaterial, description: e.target.value })}
//                             className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-300"
//                             rows={3}
//                             placeholder="Enter description"
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Barcode/Short Code</label>
//                         <input
//                             type="text"
//                             value={newMaterial.barcode}
//                             onChange={(e) => setNewMaterial({ ...newMaterial, barcode: e.target.value })}
//                             className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-300"
//                             placeholder="Enter barcode"
//                         />
//                     </div>

//                     <div className="grid grid-cols-2 gap-4">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Unit</label>
//                             <select
//                                 value={newMaterial.purchaseUnit}
//                                 onChange={(e) => setNewMaterial({ ...newMaterial, purchaseUnit: e.target.value })}
//                                 className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-300"
//                             >
//                                 <option value="">Select unit</option>
//                                 {units.map(unit => (
//                                     <option key={unit.id} value={unit.id}>{unit.name}</option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Consumption Unit</label>
//                             <select
//                                 value={newMaterial.consumptionUnit}
//                                 onChange={(e) => setNewMaterial({ ...newMaterial, consumptionUnit: e.target.value })}
//                                 className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-300"
//                             >
//                                 <option value="">Select unit</option>
//                                 {units.map(unit => (
//                                     <option key={unit.id} value={unit.id}>{unit.name}</option>
//                                 ))}
//                             </select>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Right Column */}
//                 <div className="space-y-4">
//                     <div className="space-y-2">
//                         <label className="block text-sm font-medium text-gray-700">Prices</label>
//                         <input
//                             type="number"
//                             value={isNaN(newMaterial.purchasePrice) ? '' : newMaterial.purchasePrice}
//                             onChange={(e) => setNewMaterial({ ...newMaterial, purchasePrice: Number(e.target.value) })}
//                             className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-300"
//                             placeholder="Purchase Price"
//                             step="0.01"
//                         />
//                         <input
//                             type="number"
//                             value={isNaN(newMaterial.internalPrice) ? '' : newMaterial.internalPrice}
//                             onChange={(e) => setNewMaterial({ ...newMaterial, internalPrice: Number(e.target.value) })}
//                             className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-300"
//                             placeholder="Sale Price"
//                             step="0.01"
//                         />
//                         <input
//                             type="number"
//                             value={isNaN(newMaterial.reconciliationPrice) ? '' : newMaterial.reconciliationPrice}
//                             onChange={(e) => setNewMaterial({ ...newMaterial, reconciliationPrice: Number(e.target.value) })}
//                             className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-300"
//                             placeholder="Reconciliation Price"
//                             step="0.01"
//                         />
//                         <input
//                             type="number"
//                             value={isNaN(newMaterial.normalLoss) ? '' : newMaterial.normalLoss}
//                             onChange={(e) => setNewMaterial({ ...newMaterial, normalLoss: Number(e.target.value) })}
//                             className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-300"
//                             placeholder="Normal Loss %"
//                             step="0.1"
//                             max="100"
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Tax Information</label>
//                         <div className="flex space-x-4 mb-2">
//                             <label className="flex items-center">
//                                 <input
//                                     type="radio"
//                                     checked={newMaterial.taxType === 'GST'}
//                                     onChange={() => setNewMaterial({ ...newMaterial, taxType: 'GST' })}
//                                     className="mr-1"
//                                 />
//                                 GST
//                             </label>
//                             <label className="flex items-center">
//                                 <input
//                                     type="radio"
//                                     checked={newMaterial.taxType === 'VAT'}
//                                     onChange={() => setNewMaterial({ ...newMaterial, taxType: 'VAT' })}
//                                     className="mr-1"
//                                 />
//                                 VAT
//                             </label>
//                         </div>
//                         <input
//                             type="number"
//                             value={isNaN(newMaterial.taxPercentage) ? '' : newMaterial.taxPercentage}
//                             onChange={(e) => setNewMaterial({ ...newMaterial, taxPercentage: Number(e.target.value) })}
//                             className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-300"
//                             placeholder="Tax Percentage"
//                             step="0.1"
//                         />
//                     </div>

//                     <div className="grid grid-cols-2 gap-4">
//                         <div>
//                             <select
//                                 value={newMaterial.minStockUnit}
//                                 onChange={(e) => setNewMaterial({ ...newMaterial, minStockUnit: e.target.value })}
//                                 className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-300"
//                             >
//                                 <option value="">Min Stock Unit</option>
//                                 {units.map(unit => (
//                                     <option key={unit.id} value={unit.id}>{unit.name}</option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div>
//                             <input
//                                 type="number"
//                                 value={isNaN(newMaterial.minStockLevel) ? '' : newMaterial.minStockLevel}
//                                 onChange={(e) => setNewMaterial({ ...newMaterial, minStockLevel: Number(e.target.value) })}
//                                 className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-300"
//                                 placeholder="Min Stock Level"
//                             />
//                         </div>
//                     </div>

//                     <div>
//                         <input
//                             type="text"
//                             value={newMaterial.hsnCode}
//                             onChange={(e) => setNewMaterial({ ...newMaterial, hsnCode: e.target.value })}
//                             className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-300"
//                             placeholder="HSN Code"
//                         />
//                     </div>

//                     <div className="flex flex-wrap gap-4">
//                         <label className="flex items-center">
//                             <input
//                                 type="checkbox"
//                                 checked={newMaterial.isPrivate}
//                                 onChange={(e) => setNewMaterial({ ...newMaterial, isPrivate: e.target.checked })}
//                                 className="mr-1"
//                             />
//                             Private
//                         </label>
//                         <label className="flex items-center">
//                             <input
//                                 type="checkbox"
//                                 checked={newMaterial.hasExpiry}
//                                 onChange={(e) => setNewMaterial({ ...newMaterial, hasExpiry: e.target.checked })}
//                                 className="mr-1"
//                             />
//                             Has Expiry
//                         </label>
//                         <label className="flex items-center">
//                             <input
//                                 type="checkbox"
//                                 checked={newMaterial.useMaterials}
//                                 onChange={(e) => setNewMaterial({ ...newMaterial, useMaterials: e.target.checked })}
//                                 className="mr-1"
//                             />
//                             Use Materials
//                         </label>
//                     </div>
//                 </div>

//                 {/* Bottom Section */}
//                 <div className="col-span-full space-y-4">
//                     <div className="grid grid-cols-2 gap-4">
//                         <input
//                             type="number"
//                             value={isNaN(newMaterial.quantity) ? '' : newMaterial.quantity}
//                             onChange={(e) => setNewMaterial({ ...newMaterial, quantity: Number(e.target.value) })}
//                             className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-300"
//                             placeholder="Quantity"
//                         />
//                         <select
//                             value={newMaterial.quantityUnit}
//                             onChange={(e) => setNewMaterial({ ...newMaterial, quantityUnit: e.target.value })}
//                             className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-300"
//                         >
//                             <option value="gm">Gram (gm)</option>
//                             <option value="ml">Milliliter (ml)</option>
//                         </select>
//                     </div>

//                     <div className="grid grid-cols-2 gap-4">
//                         <input
//                             type="text"
//                             value={newMaterial.gtin}
//                             onChange={(e) => setNewMaterial({ ...newMaterial, gtin: e.target.value })}
//                             className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-300"
//                             placeholder="GTIN"
//                         />
//                         <input
//                             type="text"
//                             value={newMaterial.brand}
//                             onChange={(e) => setNewMaterial({ ...newMaterial, brand: e.target.value })}
//                             className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-300"
//                             placeholder="Brand"
//                         />
//                     </div>

//                     <div className="flex justify-end space-x-4">
//                         <button
//                             onClick={() => navigate('/')}
//                             className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             onClick={handleAddMaterial}
//                             className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//                         >
//                             Save Item
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AddRawMaterial;







import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Unit {
    id: string;
    name: string;
}

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
    quantityUnit: string;
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

const AddRawMaterial: React.FC<{ onAdd: (material: RawMaterial) => void }> = ({ onAdd }) => {
    const navigate = useNavigate();
    const categories: Category[] = ['Vegetable', 'Oils', 'Spices', 'Dairy', 'Meat', 'Grains'];
    const units: Unit[] = [
        { id: 'gm', name: 'Gram (gm)' },
        { id: 'kg', name: 'Kilogram (kg)' },
        { id: 'ml', name: 'Milliliter (ml)' },
        { id: 'l', name: 'Liter (l)' },
        { id: 'pcs', name: 'Pieces (pcs)' },
    ];

    const [newMaterial, setNewMaterial] = useState<RawMaterial>({
        id: '',
        name: '',
        description: '',
        barcode: '',
        category: '' as Category,
        purchaseUnit: '',
        consumptionUnit: '',
        purchasePrice: NaN,
        internalPrice: NaN,
        reconciliationPrice: NaN,
        normalLoss: NaN,
        taxType: 'GST',
        taxPercentage: NaN,
        minStockLevel: NaN,
        minStockUnit: '',
        atParStockLevel: NaN,
        atParStockUnit: '',
        closingStockFrequency: 'daily',
        hsnCode: '',
        isPrivate: false,
        hasExpiry: false,
        useMaterials: false,
        quantity: NaN,
        quantityUnit: '',
        gtin: '',
        brand: '',
        isFavorite: false,
        isAvailable: false,
        createdAt: new Date(),
        modifiedAt: new Date(),
        createdBy: '',
        modifiedBy: '',
    });

    const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

    const showMessage = (text: string, type: 'success' | 'error') => {
        setMessage({ text, type });
        setTimeout(() => setMessage(null), 3000);
    };

    const handleAddMaterial = () => {
        if (!newMaterial.name || !newMaterial.category) {
            showMessage('Please fill in all required fields (Name and Category)', 'error');
            return;
        }
        if (isNaN(newMaterial.purchasePrice) || newMaterial.purchasePrice < 0) {
            showMessage('Please enter a valid non-negative Purchase Price', 'error');
            return;
        }
        if (isNaN(newMaterial.internalPrice) || newMaterial.internalPrice < 0) {
            showMessage('Please enter a valid non-negative Sale Price', 'error');
            return;
        }
        if (isNaN(newMaterial.reconciliationPrice) || newMaterial.reconciliationPrice < 0) {
            showMessage('Please enter a valid non-negative Reconciliation Price', 'error');
            return;
        }
        if (isNaN(newMaterial.normalLoss) || newMaterial.normalLoss < 0 || newMaterial.normalLoss > 100) {
            showMessage('Normal Loss % must be between 0 and 100', 'error');
            return;
        }
        if (isNaN(newMaterial.taxPercentage) || newMaterial.taxPercentage < 0) {
            showMessage('Tax Percentage cannot be negative', 'error');
            return;
        }

        const material: RawMaterial = {
            ...newMaterial,
            id: crypto.randomUUID(),
            createdAt: new Date(),
            modifiedAt: new Date(),
            createdBy: 'user@example.com',
            modifiedBy: 'user@example.com',
        };
        onAdd(material);
        showMessage('Raw material added successfully', 'success');
        setTimeout(() => navigate('/'), 1000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-6">
            {message && (
                <div className={`fixed top-6 right-6 px-6 py-3 rounded-lg shadow-xl text-white font-medium animate-fade-in
                    ${message.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
                    {message.text}
                </div>
            )}
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">Add New Material</h2>

                <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
                    {/* Basic Information */}
                    <section className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">Basic Information</h3>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Item Name *"
                                value={newMaterial.name}
                                onChange={(e) => setNewMaterial({ ...newMaterial, name: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                                required
                            />
                            <textarea
                                placeholder="Description"
                                value={newMaterial.description}
                                onChange={(e) => setNewMaterial({ ...newMaterial, description: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                                rows={3}
                            />
                            <input
                                type="text"
                                placeholder="Barcode/Short Code"
                                value={newMaterial.barcode}
                                onChange={(e) => setNewMaterial({ ...newMaterial, barcode: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                            />
                            <select
                                value={newMaterial.category}
                                onChange={(e) => setNewMaterial({ ...newMaterial, category: e.target.value as Category })}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                                required
                            >
                                <option value="">Select Category *</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </section>

                    {/* Units */}
                    <section className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">Units</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <select
                                value={newMaterial.purchaseUnit}
                                onChange={(e) => setNewMaterial({ ...newMaterial, purchaseUnit: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                            >
                                <option value="">Purchase Unit</option>
                                {units.map(unit => (
                                    <option key={unit.id} value={unit.id}>{unit.name}</option>
                                ))}
                            </select>
                            <select
                                value={newMaterial.consumptionUnit}
                                onChange={(e) => setNewMaterial({ ...newMaterial, consumptionUnit: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                            >
                                <option value="">Consumption Unit</option>
                                {units.map(unit => (
                                    <option key={unit.id} value={unit.id}>{unit.name}</option>
                                ))}
                            </select>
                        </div>
                    </section>

                    {/* Prices */}
                    <section className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">Pricing</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Purchase Price</label>
                                <input
                                    type="number"
                                    value={isNaN(newMaterial.purchasePrice) ? '' : newMaterial.purchasePrice}
                                    onChange={(e) => setNewMaterial({ ...newMaterial, purchasePrice: Number(e.target.value) })}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                                    placeholder="Enter amount"
                                    step="0.01"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Sale Price</label>
                                <input
                                    type="number"
                                    value={isNaN(newMaterial.internalPrice) ? '' : newMaterial.internalPrice}
                                    onChange={(e) => setNewMaterial({ ...newMaterial, internalPrice: Number(e.target.value) })}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                                    placeholder="Enter amount"
                                    step="0.01"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Reconciliation Price</label>
                                <input
                                    type="number"
                                    value={isNaN(newMaterial.reconciliationPrice) ? '' : newMaterial.reconciliationPrice}
                                    onChange={(e) => setNewMaterial({ ...newMaterial, reconciliationPrice: Number(e.target.value) })}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                                    placeholder="Enter amount"
                                    step="0.01"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Normal Loss (%)</label>
                                <input
                                    type="number"
                                    value={isNaN(newMaterial.normalLoss) ? '' : newMaterial.normalLoss}
                                    onChange={(e) => setNewMaterial({ ...newMaterial, normalLoss: Number(e.target.value) })}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                                    placeholder="Enter percentage"
                                    step="0.1"
                                    max="100"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Taxes */}
                    <section className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">Tax Details</h3>
                        <div className="flex items-center gap-6 mb-4">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    checked={newMaterial.taxType === 'GST'}
                                    onChange={() => setNewMaterial({ ...newMaterial, taxType: 'GST' })}
                                    className="w-4 h-4 text-blue-600"
                                />
                                GST
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    checked={newMaterial.taxType === 'VAT'}
                                    onChange={() => setNewMaterial({ ...newMaterial, taxType: 'VAT' })}
                                    className="w-4 h-4 text-blue-600"
                                />
                                VAT
                            </label>
                        </div>
                        <input
                            type="number"
                            value={isNaN(newMaterial.taxPercentage) ? '' : newMaterial.taxPercentage}
                            onChange={(e) => setNewMaterial({ ...newMaterial, taxPercentage: Number(e.target.value) })}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                            placeholder="Tax Percentage"
                            step="0.1"
                        />
                    </section>

                    {/* Stocks */}
                    <section className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">Stock Management</h3>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <select
                                value={newMaterial.minStockUnit}
                                onChange={(e) => setNewMaterial({ ...newMaterial, minStockUnit: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                            >
                                <option value="">Min Stock Unit</option>
                                {units.map(unit => (
                                    <option key={unit.id} value={unit.id}>{unit.name}</option>
                                ))}
                            </select>
                            <input
                                type="number"
                                value={isNaN(newMaterial.minStockLevel) ? '' : newMaterial.minStockLevel}
                                onChange={(e) => setNewMaterial({ ...newMaterial, minStockLevel: Number(e.target.value) })}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                                placeholder="Min Stock Level"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <select
                                value={newMaterial.atParStockUnit}
                                onChange={(e) => setNewMaterial({ ...newMaterial, atParStockUnit: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                            >
                                <option value="">At Par Stock Unit</option>
                                {units.map(unit => (
                                    <option key={unit.id} value={unit.id}>{unit.name}</option>
                                ))}
                            </select>
                            <input
                                type="number"
                                value={isNaN(newMaterial.atParStockLevel) ? '' : newMaterial.atParStockLevel}
                                onChange={(e) => setNewMaterial({ ...newMaterial, atParStockLevel: Number(e.target.value) })}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                                placeholder="At Par Stock Level"
                            />
                        </div>
                        <select
                            value={newMaterial.closingStockFrequency}
                            onChange={(e) => setNewMaterial({ ...newMaterial, closingStockFrequency: e.target.value as 'daily' | 'weekly' })}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                        >
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                        </select>
                    </section>

                    {/* Other */}
                    <section className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">Additional Details</h3>
                        <input
                            type="text"
                            value={newMaterial.hsnCode}
                            onChange={(e) => setNewMaterial({ ...newMaterial, hsnCode: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                            placeholder="HSN Code"
                        />
                        <div className="flex flex-wrap gap-6 mb-4">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={newMaterial.isPrivate}
                                    onChange={(e) => setNewMaterial({ ...newMaterial, isPrivate: e.target.checked })}
                                    className="w-4 h-4 text-blue-600 rounded"
                                />
                                Private Item
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={newMaterial.hasExpiry}
                                    onChange={(e) => setNewMaterial({ ...newMaterial, hasExpiry: e.target.checked })}
                                    className="w-4 h-4 text-blue-600 rounded"
                                />
                                Has Expiry
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={newMaterial.useMaterials}
                                    onChange={(e) => setNewMaterial({ ...newMaterial, useMaterials: e.target.checked })}
                                    className="w-4 h-4 text-blue-600 rounded"
                                />
                                Use Materials
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={newMaterial.isAvailable}
                                    onChange={(e) => setNewMaterial({ ...newMaterial, isAvailable: e.target.checked })}
                                    className="w-4 h-4 text-blue-600 rounded"
                                />
                                Available
                            </label>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <input
                                type="number"
                                value={isNaN(newMaterial.quantity) ? '' : newMaterial.quantity}
                                onChange={(e) => setNewMaterial({ ...newMaterial, quantity: Number(e.target.value) })}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                                placeholder="Quantity"
                            />
                            <select
                                value={newMaterial.quantityUnit}
                                onChange={(e) => setNewMaterial({ ...newMaterial, quantityUnit: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                            >
                                <option value="">Quantity Unit</option>
                                <option value="gm">Gram (gm)</option>
                                <option value="ml">Milliliter (ml)</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                value={newMaterial.gtin}
                                onChange={(e) => setNewMaterial({ ...newMaterial, gtin: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                                placeholder="GTIN"
                            />
                            <input
                                type="text"
                                value={newMaterial.brand}
                                onChange={(e) => setNewMaterial({ ...newMaterial, brand: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                                placeholder="Brand"
                            />
                        </div>
                    </section>

                    {/* Buttons */}
                    <div className="flex justify-end gap-4 pt-4 border-t">
                        <button
                            onClick={() => navigate('/')}
                            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleAddMaterial}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                        >
                            Save Material
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddRawMaterial;