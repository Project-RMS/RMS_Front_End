// import React, { useState, useEffect } from 'react';
// import { TableIcon, PlusIcon, XIcon } from '@heroicons/react/outline';
// import { AnimatePresence, motion } from 'framer-motion';
// import * as XLSX from 'xlsx';

// // Types and constants moved to separate sections
// type TableArea = 'AC Premium' | 'Garden' | 'Bar';
// type TableStatus = 'Available' | 'Occupied' | 'Running Table' | 'Printed Table' | 'Running KOT Table';

// interface Table {
//   id: string;
//   number: number;
//   area: TableArea;
//   status: TableStatus;
//   capacity: number;
//   reservation?: {
//     time: string;
//     customerName: string;
//     phone: string;
//   };
// }

// interface BookingData extends Omit<Table, 'id' | 'status' | 'capacity'> {
//   time: any;
//   phone: any;
//   customerName: any;
//   date: string;
//   numberOfGuests: number;
//   specialRequests: string;
//   advanceAmount: number;
//   bookingSource: string;
//   email: string;
// }

// interface MenuItem {
//   id: string;
//   name: string;
//   price: number;
// }

// interface MenuCategory {
//   id: string;
//   name: string;
//   items: MenuItem[];
// }

// const AREAS: TableArea[] = ['AC Premium', 'Garden', 'Bar'];
// const STATUS_COLORS = {
//   Available: 'bg-emerald-100 border-emerald-600',
//   Occupied: 'bg-red-100 border-red-600',
//   'Running Table': 'bg-blue-100 border-blue-600',
//   'Printed Table': 'bg-purple-100 border-purple-600',
//   'Running KOT Table': 'bg-amber-100 border-amber-600'
// };

// const initialTables: Table[] = [
//   // AC Premium
//   ...Array.from({ length: 5 }, (_, i) => ({
//     id: `ac${i + 1}`,
//     number: i + 1,
//     area: 'AC Premium' as TableArea,
//     status: 'Available' as TableStatus,
//     capacity: i % 2 === 0 ? 4 : 6
//   })),
//   // Garden
//   ...Array.from({ length: 5 }, (_, i) => ({
//     id: `g${i + 1}`,
//     number: i + 1,
//     area: 'Garden' as TableArea,
//     status: 'Available' as TableStatus,
//     capacity: i % 2 === 0 ? 8 : 6
//   })),
//   // Bar
//   ...Array.from({ length: 5 }, (_, i) => ({
//     id: `bar${i + 1}`,
//     number: i + 1,
//     area: 'Bar' as TableArea,
//     status: 'Available' as TableStatus,
//     capacity: 4
//   }))
// ];

// const categories: MenuCategory[] = [
//   {
//     id: 'appetizers',
//     name: 'Appetizers',
//     items: [
//       { id: 'item1', name: 'Item 1', price: 10.99 },
//       { id: 'item2', name: 'Item 2', price: 12.99 },
//       { id: 'item3', name: 'Item 3', price: 9.99 },
//     ],
//   },
//   {
//     id: 'entrees',
//     name: 'Entrees',
//     items: [
//       { id: 'item4', name: 'Item 4', price: 19.99 },
//       { id: 'item5', name: 'Item 5', price: 22.99 },
//       { id: 'item6', name: 'Item 6', price: 18.99 },
//     ],
//   },
//   {
//     id: 'desserts',
//     name: 'Desserts',
//     items: [
//       { id: 'item7', name: 'Item 7', price: 7.99 },
//       { id: 'item8', name: 'Item 8', price: 8.99 },
//       { id: 'item9', name: 'Item 9', price: 6.99 },
//     ],
//   },
// ];

// const Booking: React.FC = () => {
//   const [tables, setTables] = useState<Table[]>(initialTables);
//   const [selectedTable, setSelectedTable] = useState<Table | null>(null);
//   const [isBookingPanelOpen, setIsBookingPanelOpen] = useState(false);
//   const [isMenuPanelOpen, setIsMenuPanelOpen] = useState(false);
//   const [orderItems, setOrderItems] = useState<MenuItem[]>([]);
//   const [bookingForm, setBookingForm] = useState<Omit<BookingData, 'area' | 'number'>>({
//     customerName: '',
//     phone: '',
//     email: '',
//     time: '',
//     date: new Date().toISOString().split('T')[0],
//     numberOfGuests: 1,
//     specialRequests: '',
//     advanceAmount: 0,
//     bookingSource: 'Walk-in'
//   });

//   // Excel handling
//   const [excelData, setExcelData] = useState<BookingData[]>([]);
//   const excelFileName = 'table_bookings.xlsx';

//   useEffect(() => {
//     const savedData = localStorage.getItem(excelFileName);
//     if (savedData) setExcelData(JSON.parse(savedData));
//   }, []);

//   const exportToExcel = (data: BookingData) => {
//     const updatedData = [...excelData, data];
//     const ws = XLSX.utils.json_to_sheet(updatedData.map((d, i) => ({
//       '#': i + 1,
//       'Table': d.number,
//       'Area': d.area,
//       'Customer': d.customerName,
//       'Phone': d.phone,
//       'Guests': d.numberOfGuests,
//       'Time': d.time,
//       'Date': d.date,
//       'Advance': d.advanceAmount,
//       'Source': d.bookingSource
//     })));
    
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, 'Bookings');
//     XLSX.writeFile(wb, excelFileName);
//     localStorage.setItem(excelFileName, JSON.stringify(updatedData));
//   };

//   const handleTableClick = (table: Table) => {
//     setSelectedTable(table);
//     if (table.status === 'Available') {
//       setIsBookingPanelOpen(true);
//     } else if (table.status === 'Occupied') {
//       setIsMenuPanelOpen(true);
//     }
//   };

//   const handleAddMenuItem = (item: MenuItem) => {
//     setOrderItems(prev => [...prev, item]);
//   };

//   const updateTableStatus = (tableId: string, status: TableStatus) => {
//     setTables(tables.map(t => t.id === tableId ? { ...t, status } : t));
//   };

//   const handleBookingSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!selectedTable) return;

//     const bookingData: BookingData = {
//       ...selectedTable,
//       ...bookingForm,
//       date: bookingForm.date,
//       numberOfGuests: Math.min(bookingForm.numberOfGuests, selectedTable.capacity)
//     };

//     setTables(tables.map(t => 
//       t.id === selectedTable.id ? { 
//         ...t, 
//         status: 'Occupied',
//         reservation: {
//           time: bookingForm.time,
//           customerName: bookingForm.customerName,
//           phone: bookingForm.phone
//         }
//       } : t
//     ));

//     exportToExcel(bookingData);
//     resetForm();
//   };

//   const resetForm = () => {
//     setBookingForm({
//       customerName: '',
//       phone: '',
//       email: '',
//       time: '',
//       date: new Date().toISOString().split('T')[0],
//       numberOfGuests: 1,
//       specialRequests: '',
//       advanceAmount: 0,
//       bookingSource: 'Walk-in'
//     });
//     setIsBookingPanelOpen(false);
//     setSelectedTable(null);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
//       {/* Main Layout */}
//       <div className="flex flex-col lg:flex-row h-full">
//         {/* Table Grid Section */}
//         <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
//           <div className="max-w-7xl mx-auto space-y-6">
//             {/* Header */}
//             <header className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
//               <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 flex items-center gap-3">
//                 <TableIcon className="h-8 w-8 text-blue-600" />
//                 Restaurant Table Management
//               </h1>
//             </header>

//             {/* Status Legend */}
//             <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
//               <h3 className="text-lg font-semibold mb-4 text-gray-800">Table Status</h3>
//               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
//                 {Object.entries(STATUS_COLORS).map(([status, color]) => (
//                   <div key={status} 
//                     className={`${color} rounded-lg p-3 flex items-center justify-center text-sm font-medium transition-transform hover:scale-105`}>
//                     {status}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Table Sections */}
//             {AREAS.map(area => (
//               <Section key={area} title={area}>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
//                   {tables.filter(t => t.area === area).map(table => (
//                     <TableCard
//                       key={table.id}
//                       table={table}
//                       onClick={() => handleTableClick(table)}
//                       onStatusChange={updateTableStatus}
//                       isSelected={selectedTable?.id === table.id}
//                     />
//                   ))}
//                   <AddTableButton area={area} onAdd={() => {}} />
//                 </div>
//               </Section>
//             ))}
//           </div>
//         </div>

//         {/* Booking Panel */}
//         <AnimatePresence>
//           {isBookingPanelOpen && selectedTable && (
//             <motion.div
//               initial={{ x: '100%', opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               exit={{ x: '100%', opacity: 0 }}
//               transition={{ type: 'spring', damping: 30 }}
//               className="fixed inset-y-0 right-0 w-full md:w-[480px] bg-white shadow-2xl border-l border-gray-200 z-50"
//             >
//               <BookingPanel
//                 table={selectedTable}
//                 form={bookingForm}
//                 onFormChange={setBookingForm}
//                 onSubmit={handleBookingSubmit}
//                 onClose={resetForm}
//               />
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Menu Panel */}
//         <AnimatePresence>
//           {isMenuPanelOpen && selectedTable && (
//             <motion.div
//               initial={{ x: '100%', opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               exit={{ x: '100%', opacity: 0 }}
//               transition={{ type: 'spring', damping: 30 }}
//               className="fixed inset-y-0 right-0 w-full md:w-[480px] bg-white shadow-2xl border-l border-gray-200 z-50"
//             >
//               <div className="h-full flex flex-col">
//                 <div className="bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center">
//                   <div>
//                     <h2 className="text-xl font-bold text-gray-900">Table {selectedTable.number}</h2>
//                     <p className="text-sm text-gray-600">Add Menu Items</p>
//                   </div>
//                   <button 
//                     onClick={() => setIsMenuPanelOpen(false)}
//                     className="rounded-full p-2 hover:bg-gray-100 transition-colors"
//                   >
//                     <XIcon className="h-6 w-6 text-gray-500" />
//                   </button>
//                 </div>

//                 <div className="flex-1 overflow-y-auto p-6">
//                   <div className="space-y-6">
//                     {/* Menu Categories */}
//                     {categories.map((category) => (
//                       <div key={category.id} className="space-y-4">
//                         <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
//                         <div className="grid grid-cols-1 gap-3">
//                           {category.items.map((item) => (
//                             <button
//                               key={item.id}
//                               onClick={() => handleAddMenuItem(item)}
//                               className="flex justify-between items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
//                             >
//                               <span className="font-medium">{item.name}</span>
//                               <span className="text-gray-600">${item.price?.toFixed(2)}</span>
//                             </button>
//                           ))}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Order Summary */}
//                 {orderItems.length > 0 && (
//                   <div className="border-t border-gray-200 p-4 bg-white">
//                     <div className="space-y-4">
//                       <div className="flex justify-between items-center">
//                         <span className="font-semibold">Total Items:</span>
//                         <span>{orderItems.length}</span>
//                       </div>
//                       <div className="flex justify-between items-center">
//                         <span className="font-semibold">Total Amount:</span>
//                         <span className="text-xl font-bold">
//                           ${orderItems.reduce((sum, item) => sum + (item.price || 0), 0).toFixed(2)}
//                         </span>
//                       </div>
//                       <button
//                         className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
//                         onClick={() => {
//                           // Handle order submission
//                           alert('Order placed successfully!');
//                           setOrderItems([]);
//                           setIsMenuPanelOpen(false);
//                         }}
//                       >
//                         Place Order
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// // Sub-components
// const StatusLegend: React.FC = () => (
//   <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
//     <h3 className="text-sm font-semibold mb-3 text-gray-600">TABLE STATUS</h3>
//     <div className="flex flex-wrap gap-3">
//       {Object.entries(STATUS_COLORS).map(([status, color]) => (
//         <div key={status} className="flex items-center gap-2">
//           <div className={`w-4 h-4 rounded ${color}`} />
//           <span className="text-sm text-gray-700">{status}</span>
//         </div>
//       ))}
//     </div>
//   </div>
// );

// const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
//   <section className="mb-8">
//     <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
//     {children}
//   </section>
// );

// const TableCard: React.FC<{
//   table: Table;
//   onClick: () => void;
//   onStatusChange: (id: string, status: TableStatus) => void;
//   isSelected: boolean;
// }> = ({ table, onClick, onStatusChange, isSelected }) => (
//   <motion.div
//     whileHover={{ scale: 1.02 }}
//     whileTap={{ scale: 0.98 }}
//     className={`relative overflow-hidden rounded-xl border-2 transition-all ${
//       STATUS_COLORS[table.status]
//     } ${
//       isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''
//     } hover:shadow-lg`}
//   >
//     <div className="p-4">
//       <div className="flex justify-between items-start mb-3">
//         <div>
//           <h3 className="text-xl font-bold text-gray-900">Table {table.number}</h3>
//           <p className="text-sm text-gray-600 mt-1">
//             Capacity: {table.capacity} guests
//           </p>
//         </div>
//         <select
//           value={table.status}
//           onChange={(e) => onStatusChange(table.id, e.target.value as TableStatus)}
//           className="text-sm px-2 py-1 rounded-lg bg-white/80 backdrop-blur border border-gray-200 hover:bg-white"
//           onClick={(e) => e.stopPropagation()}
//         >
//           {Object.keys(STATUS_COLORS).map((status) => (
//             <option key={status} value={status}>{status}</option>
//           ))}
//         </select>
//       </div>
//       {table.reservation && (
//         <div className="mt-3 pt-3 border-t border-gray-200/50">
//           <p className="text-sm font-medium text-gray-900 truncate">
//             {table.reservation.customerName}
//           </p>
//           <p className="text-xs text-gray-600 mt-1">
//             {table.reservation.time}
//           </p>
//         </div>
//       )}
//     </div>
//     <div 
//       className="absolute inset-0 cursor-pointer"
//       onClick={onClick}
//     />
//   </motion.div>
// );

// const BookingPanel: React.FC<{
//   table: Table;
//   form: Omit<BookingData, 'area' | 'number'>;
//   onFormChange: (data: Omit<BookingData, 'area' | 'number'>) => void;
//   onSubmit: (e: React.FormEvent) => void;
//   onClose: () => void;
// }> = ({ table, form, onFormChange, onSubmit, onClose }) => (
//   <div className="h-full flex flex-col bg-gray-50">
//     <div className="bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center">
//       <div>
//         <h2 className="text-xl font-bold text-gray-900">Table {table.number}</h2>
//         <p className="text-sm text-gray-600 mt-1">Capacity: {table.capacity} guests</p>
//       </div>
//       <button 
//         onClick={onClose}
//         className="rounded-full p-2 hover:bg-gray-100 transition-colors"
//       >
//         <XIcon className="h-6 w-6 text-gray-500" />
//       </button>
//     </div>

//     <form onSubmit={onSubmit} className="flex-1 overflow-y-auto">
//       <div className="p-6 space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <InputField
//             label="Customer Name"
//             value={form.customerName}
//             onChange={(v) => onFormChange({ ...form, customerName: v })}
//             required
//             placeholder="Enter customer name"
//           />
//           <InputField
//             label="Phone"
//             type="tel"
//             value={form.phone}
//             onChange={(v) => onFormChange({ ...form, phone: v })}
//             required
//             placeholder="Enter phone number"
//           />
//         </div>

//         <InputField
//           label="Email"
//           type="email"
//           value={form.email}
//           onChange={(v) => onFormChange({ ...form, email: v })}
//           placeholder="Enter email address"
//         />

//         <div className="grid grid-cols-2 gap-4">
//           <InputField
//             label="Time"
//             type="time"
//             value={form.time}
//             onChange={(v) => onFormChange({ ...form, time: v })}
//             required
//           />
//           <InputField
//             label="Date"
//             type="date"
//             value={form.date}
//             onChange={(v) => onFormChange({ ...form, date: v })}
//             required
//           />
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//           <InputField
//             label="Number of Guests"
//             type="number"
//             min="1"
//             max={table.capacity}
//             value={form.numberOfGuests.toString()}
//             onChange={(v) => onFormChange({ ...form, numberOfGuests: parseInt(v) })}
//           />
//           <InputField
//             label="Advance Amount"
//             type="number"
//             value={form.advanceAmount.toString()}
//             onChange={(v) => onFormChange({ ...form, advanceAmount: parseInt(v) })}
//           />
//         </div>

//         <SelectField
//           label="Booking Source"
//           options={['Walk-in', 'Phone', 'Online', 'Third-party']}
//           value={form.bookingSource}
//           onChange={(v) => onFormChange({ ...form, bookingSource: v })}
//         />

//         <TextAreaField
//           label="Special Requests"
//           value={form.specialRequests}
//           onChange={(v) => onFormChange({ ...form, specialRequests: v })}
//           placeholder="Enter any special requests or notes"
//         />
//       </div>

//       <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex gap-3">
//         <button
//           type="button"
//           onClick={onClose}
//           className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors"
//         >
//           Confirm Booking
//         </button>
//       </div>
//     </form>
//   </div>
// );

// // Utility components
// const InputField: React.FC<{
//   label: string;
//   value: string;
//   onChange: (value: string) => void;
// } & React.InputHTMLAttributes<HTMLInputElement>> = ({ label, value, onChange, ...props }) => (
//   <div>
//     <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
//     <input
//       {...props}
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//     />
//   </div>
// );

// const TextAreaField: React.FC<{
//   label: string;
//   value: string;
//   onChange: (value: string) => void;
// }> = ({ label, value, onChange }) => (
//   <div>
//     <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
//     <textarea
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24"
//     />
//   </div>
// );

// const SelectField: React.FC<{
//   label: string;
//   value: string;
//   options: string[];
//   onChange: (value: string) => void;
// }> = ({ label, value, options, onChange }) => (
//   <div>
//     <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
//     <select
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//     >
//       {options.map(option => (
//         <option key={option} value={option}>{option}</option>
//       ))}
//     </select>
//   </div>
// );

// const AddTableButton: React.FC<{ area: TableArea; onAdd: () => void }> = ({ area, onAdd }) => (
//   <motion.button
//     whileHover={{ scale: 1.05 }}
//     className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 flex flex-col items-center justify-center text-gray-500 hover:text-blue-600"
//     onClick={onAdd}
//   >
//     <PlusIcon className="h-6 w-6 mb-1" />
//     <span className="text-sm">Add Table</span>
//   </motion.button>
// );

// export default Booking;






// src/components/Booking.tsx
// import React, { useState } from 'react';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// // Type definitions
// interface RestaurantTable {
//   id: number;
//   tableNumber: string;
//   section: string;
//   capacity: number;
//   status: 'available' | 'running' | 'printed' | 'paid' | 'runningKOT';
//   orderAmount?: number;
//   reservationTime?: string;
// }

// const initialTables: RestaurantTable[] = [
//   // Ground Floor (12 tables)
//   { id: 1, tableNumber: '1', section: 'Ground Floor', capacity: 4, status: 'available', orderAmount: 0 },
//   { id: 2, tableNumber: '2', section: 'Ground Floor', capacity: 6, status: 'running', orderAmount: 325.00 },
//   { id: 3, tableNumber: '3', section: 'Ground Floor', capacity: 4, status: 'printed', orderAmount: 155.00 },
//   { id: 4, tableNumber: '4', section: 'Ground Floor', capacity: 4, status: 'paid', orderAmount: 180.00 },
//   { id: 5, tableNumber: '5', section: 'Ground Floor', capacity: 2, status: 'runningKOT', orderAmount: 0 },
//   { id: 6, tableNumber: '6', section: 'Ground Floor', capacity: 4, status: 'available', orderAmount: 0 },
//   { id: 7, tableNumber: '7', section: 'Ground Floor', capacity: 6, status: 'running', orderAmount: 200.00 },
//   { id: 8, tableNumber: '8', section: 'Ground Floor', capacity: 4, status: 'printed', orderAmount: 250.00 },
//   { id: 9, tableNumber: '9', section: 'Ground Floor', capacity: 4, status: 'paid', orderAmount: 300.00 },
//   { id: 10, tableNumber: '10', section: 'Ground Floor', capacity: 2, status: 'runningKOT', orderAmount: 0 },
//   { id: 11, tableNumber: '11', section: 'Ground Floor', capacity: 4, status: 'available', orderAmount: 0 },
//   { id: 12, tableNumber: '12', section: 'Ground Floor', capacity: 6, status: 'running', orderAmount: 400.00 },

//   // Basement (8 tables)
//   { id: 13, tableNumber: '13', section: 'Basement', capacity: 4, status: 'available', orderAmount: 0 },
//   { id: 14, tableNumber: '14', section: 'Basement', capacity: 6, status: 'running', orderAmount: 180.00 },
//   { id: 15, tableNumber: '15', section: 'Basement', capacity: 4, status: 'printed', orderAmount: 120.00 },
//   { id: 16, tableNumber: '16', section: 'Basement', capacity: 4, status: 'paid', orderAmount: 220.00 },
//   { id: 17, tableNumber: '17', section: 'Basement', capacity: 2, status: 'runningKOT', orderAmount: 0 },
//   { id: 18, tableNumber: '18', section: 'Basement', capacity: 4, status: 'available', orderAmount: 0 },
//   { id: 19, tableNumber: '19', section: 'Basement', capacity: 6, status: 'running', orderAmount: 300.00 },
//   { id: 20, tableNumber: '20', section: 'Basement', capacity: 4, status: 'printed', orderAmount: 150.00 },

//   // Party Hall (6 tables)
//   { id: 21, tableNumber: 'Hall 1', section: 'Party Hall', capacity: 10, status: 'available', orderAmount: 0 },
//   { id: 22, tableNumber: 'Hall 2', section: 'Party Hall', capacity: 10, status: 'running', orderAmount: 450.00 },
//   { id: 23, tableNumber: 'Hall 3', section: 'Party Hall', capacity: 8, status: 'printed', orderAmount: 500.00 },
//   { id: 24, tableNumber: 'Hall 4', section: 'Party Hall', capacity: 10, status: 'paid', orderAmount: 600.00 },
//   { id: 25, tableNumber: 'Hall 5', section: 'Party Hall', capacity: 8, status: 'runningKOT', orderAmount: 0 },
//   { id: 26, tableNumber: 'Hall 6', section: 'Party Hall', capacity: 10, status: 'available', orderAmount: 0 },
// ];

// const Booking: React.FC = () => {
//   const [tables, setTables] = useState<RestaurantTable[]>(initialTables);
//   const [newTable, setNewTable] = useState<Omit<RestaurantTable, 'id'>>({
//     tableNumber: '',
//     section: '',
//     capacity: 0,
//     status: 'available',
//     orderAmount: 0,
//   });
//   const [searchTerm, setSearchTerm] = useState<string>('');

//   const sections = [...new Set(tables.map(table => table.section))];

//   // Add new table
//   const handleAddTable = (e: React.FormEvent) => {
//     e.preventDefault();
//     const tableToAdd: RestaurantTable = {
//       id: tables.length + 1,
//       ...newTable,
//     };
//     setTables([...tables, tableToAdd]);
//     setNewTable({ tableNumber: '', section: '', capacity: 0, status: 'available', orderAmount: 0 });
//   };

//   // Update table status
//   const handleStatusChange = (id: number, newStatus: RestaurantTable['status']) => {
//     setTables(tables.map(table =>
//       table.id === id
//         ? {
//             ...table,
//             status: newStatus,
//             orderAmount: newStatus === 'running' || newStatus === 'printed' || newStatus === 'paid' ? (table.orderAmount || 0) : 0,
//           }
//         : table
//     ));
//   };

//   // Clear table
//   const handleClearTable = (id: number) => {
//     setTables(tables.map(table =>
//       table.id === id ? { ...table, status: 'available', orderAmount: 0, reservationTime: undefined } : table
//     ));
//   };

//   // Update order amount
//   const handleUpdateOrderAmount = (id: number, amount: number) => {
//     setTables(tables.map(table =>
//       table.id === id ? { ...table, orderAmount: amount } : table
//     ));
//   };

//   // Handle drag and drop
//   const onDragEnd = (result: any) => {
//     if (!result.destination) return;

//     const newTables = Array.from(tables);
//     const [reorderedItem] = newTables.splice(result.source.index, 1);
//     newTables.splice(result.destination.index, 0, reorderedItem);

//     setTables(newTables);
//   };

//   // Filter tables by search term
//   const filteredTables = tables.filter(table =>
//     table.tableNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     table.section.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="container mx-auto p-4">
//       {/* Header - Enhanced Petpooja Style */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">Petpooja Table View</h1>
//         <div className="flex gap-4">
//           <input
//             type="text"
//             placeholder="Search Tables..."
//             value={searchTerm}
//             onChange={e => setSearchTerm(e.target.value)}
//             className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
//           />
//           <button className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition">Delivery</button>
//           <button className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition">Pick Up</button>
//           <button
//             onClick={handleAddTable}
//             className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition"
//           >
//             + Add Table
//           </button>
//         </div>
//       </div>

//       {/* Add Table Form - Enhanced */}
//       <form onSubmit={handleAddTable} className="mb-6 bg-gray-100 p-4 rounded-lg shadow-md">
//         <div className="grid grid-cols-1 md:grid-cols-6 gap-2">
//           <input
//             type="text"
//             placeholder="Table Number (e.g., 1)"
//             value={newTable.tableNumber}
//             onChange={e => setNewTable({ ...newTable, tableNumber: e.target.value })}
//             className="p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//             required
//           />
//           <input
//             type="text"
//             placeholder="Section (e.g., Ground Floor)"
//             value={newTable.section}
//             onChange={e => setNewTable({ ...newTable, section: e.target.value })}
//             className="p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//             required
//           />
//           <input
//             type="number"
//             placeholder="Capacity"
//             value={newTable.capacity}
//             onChange={e => setNewTable({ ...newTable, capacity: parseInt(e.target.value) })}
//             className="p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//             min="1"
//             required
//           />
//           <select
//             value={newTable.status}
//             onChange={e => setNewTable({ ...newTable, status: e.target.value as RestaurantTable['status'] })}
//             className="p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//           >
//             <option value="available">Available</option>
//             <option value="running">Running</option>
//             <option value="printed">Printed</option>
//             <option value="paid">Paid</option>
//             <option value="runningKOT">Running KOT</option>
//           </select>
//           <input
//             type="number"
//             placeholder="Order Amount (₹)"
//             value={newTable.orderAmount || ''}
//             onChange={e => setNewTable({ ...newTable, orderAmount: parseFloat(e.target.value) || 0 })}
//             className="p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//           />
//           <button type="submit" className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600 transition text-sm">
//             Add Table
//           </button>
//         </div>
//       </form>

//       {/* Table Sections - Drag and Drop Grid Layout with More Tables and Smaller Size */}
//       <div className="space-y-8">
//         {sections.map(section => (
//           <div key={section} className="w-full">
//             <h2 className="text-xl font-semibold mb-4 bg-gray-200 p-2 rounded">{section}</h2>
//             <DragDropContext onDragEnd={onDragEnd}>
//               <Droppable droppableId={section} direction="horizontal">
//                 {(provided) => (
//                   <div
//                     ref={provided.innerRef}
//                     {...provided.droppableProps}
//                     className="grid grid-cols-7 gap-2 overflow-x-auto p-2 bg-white shadow-md rounded-lg"
//                   >
//                     {filteredTables
//                       .filter(table => table.section === section)
//                       .map((table, index) => (
//                         <Draggable key={table.id} draggableId={table.id.toString()} index={index}>
//                           {(provided) => (
//                             <div
//                               ref={provided.innerRef}
//                               {...provided.draggableProps}
//                               {...provided.dragHandleProps}
//                               className={`relative p-2 border rounded-lg text-center cursor-pointer hover:shadow-md transition-all duration-200 ${
//                                 table.status === 'available'
//                                   ? 'bg-gray-100 border-gray-300'
//                                   : table.status === 'running'
//                                   ? 'bg-blue-100 border-blue-300'
//                                   : table.status === 'printed'
//                                   ? 'bg-green-100 border-green-300'
//                                   : table.status === 'paid'
//                                   ? 'bg-yellow-100 border-yellow-300'
//                                   : 'bg-orange-100 border-orange-300'
//                               }`}
//                             >
//                               <span className="font-bold text-xs">{table.tableNumber}</span>
//                               <span className="text-xs">Cap: {table.capacity}</span>
//                               <span className="text-[10px]">{table.status.charAt(0).toUpperCase() + table.status.slice(1)}</span>
//                               {table.orderAmount && table.orderAmount > 0 && (
//                                 <span className="text-[10px] text-gray-600">₹{table.orderAmount.toFixed(2)}</span>
//                               )}
//                               <div className="mt-1 flex flex-col gap-1">
//                                 <select
//                                   value={table.status}
//                                   onChange={e => handleStatusChange(table.id, e.target.value as RestaurantTable['status'])}
//                                   className="text-[10px] p-0.5 border rounded w-full"
//                                 >
//                                   <option value="available">Available</option>
//                                   <option value="running">Running</option>
//                                   <option value="printed">Printed</option>
//                                   <option value="paid">Paid</option>
//                                   <option value="runningKOT">Running KOT</option>
//                                 </select>
//                                 <input
//                                   type="number"
//                                   placeholder="Order"
//                                   value={table.orderAmount || ''}
//                                   onChange={e => handleUpdateOrderAmount(table.id, parseFloat(e.target.value) || 0)}
//                                   className="text-[10px] p-0.5 border rounded w-full"
//                                 />
//                                 <button
//                                   onClick={() => handleClearTable(table.id)}
//                                   className="text-[10px] bg-gray-500 text-white px-0.5 py-0.5 rounded hover:bg-gray-600 transition"
//                                 >
//                                   Clear
//                                 </button>
//                               </div>
//                             </div>
//                           )}
//                         </Draggable>
//                       ))}
//                     {provided.placeholder}
//                   </div>
//                 )}
//               </Droppable>
//             </DragDropContext>
//           </div>
//         ))}
//       </div>

//       {/* Legend - Enhanced Petpooja Style */}
//       <div className="mt-4 flex flex-wrap gap-4 text-sm">
//         <span className="flex items-center gap-2"><span className="w-4 h-4 bg-gray-100 border border-gray-300 rounded"></span> Blank Table</span>
//         <span className="flex items-center gap-2"><span className="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></span> Running Table</span>
//         <span className="flex items-center gap-2"><span className="w-4 h-4 bg-green-100 border border-green-300 rounded"></span> Printed Table</span>
//         <span className="flex items-center gap-2"><span className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></span> Paid Table</span>
//         <span className="flex items-center gap-2"><span className="w-4 h-4 bg-orange-100 border border-orange-300 rounded"></span> Running KOT</span>
//       </div>
//     </div>
//   );
// };

// export default Booking;




// src/components/Booking.tsx
// import React, { useState } from 'react';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// // Type definitions
// interface RestaurantTable {
//   id: number;
//   tableNumber: string;
//   section: string;
//   capacity: number;
//   status: 'available' | 'running' | 'printed' | 'paid' | 'runningKOT';
//   orderAmount?: number;
//   reservationTime?: string;
// }

// const initialTables: RestaurantTable[] = [
//   // Ground Floor (12 tables)
//   { id: 1, tableNumber: '1', section: 'Ground Floor', capacity: 4, status: 'available', orderAmount: 0 },
//   { id: 2, tableNumber: '2', section: 'Ground Floor', capacity: 6, status: 'running', orderAmount: 325.00 },
//   { id: 3, tableNumber: '3', section: 'Ground Floor', capacity: 4, status: 'printed', orderAmount: 155.00 },
//   { id: 4, tableNumber: '4', section: 'Ground Floor', capacity: 4, status: 'paid', orderAmount: 180.00 },
//   { id: 5, tableNumber: '5', section: 'Ground Floor', capacity: 2, status: 'runningKOT', orderAmount: 0 },
//   { id: 6, tableNumber: '6', section: 'Ground Floor', capacity: 4, status: 'available', orderAmount: 0 },
//   { id: 7, tableNumber: '7', section: 'Ground Floor', capacity: 6, status: 'running', orderAmount: 200.00 },
//   { id: 8, tableNumber: '8', section: 'Ground Floor', capacity: 4, status: 'printed', orderAmount: 250.00 },
//   { id: 9, tableNumber: '9', section: 'Ground Floor', capacity: 4, status: 'paid', orderAmount: 300.00 },
//   { id: 10, tableNumber: '10', section: 'Ground Floor', capacity: 2, status: 'runningKOT', orderAmount: 0 },
//   { id: 11, tableNumber: '11', section: 'Ground Floor', capacity: 4, status: 'available', orderAmount: 0 },
//   { id: 12, tableNumber: '12', section: 'Ground Floor', capacity: 6, status: 'running', orderAmount: 400.00 },

//   // Basement (8 tables)
//   { id: 13, tableNumber: '13', section: 'Basement', capacity: 4, status: 'available', orderAmount: 0 },
//   { id: 14, tableNumber: '14', section: 'Basement', capacity: 6, status: 'running', orderAmount: 180.00 },
//   { id: 15, tableNumber: '15', section: 'Basement', capacity: 4, status: 'printed', orderAmount: 120.00 },
//   { id: 16, tableNumber: '16', section: 'Basement', capacity: 4, status: 'paid', orderAmount: 220.00 },
//   { id: 17, tableNumber: '17', section: 'Basement', capacity: 2, status: 'runningKOT', orderAmount: 0 },
//   { id: 18, tableNumber: '18', section: 'Basement', capacity: 4, status: 'available', orderAmount: 0 },
//   { id: 19, tableNumber: '19', section: 'Basement', capacity: 6, status: 'running', orderAmount: 300.00 },
//   { id: 20, tableNumber: '20', section: 'Basement', capacity: 4, status: 'printed', orderAmount: 150.00 },

//   // Party Hall (6 tables)
//   { id: 21, tableNumber: 'Hall 1', section: 'Party Hall', capacity: 10, status: 'available', orderAmount: 0 },
//   { id: 22, tableNumber: 'Hall 2', section: 'Party Hall', capacity: 10, status: 'running', orderAmount: 450.00 },
//   { id: 23, tableNumber: 'Hall 3', section: 'Party Hall', capacity: 8, status: 'printed', orderAmount: 500.00 },
//   { id: 24, tableNumber: 'Hall 4', section: 'Party Hall', capacity: 10, status: 'paid', orderAmount: 600.00 },
//   { id: 25, tableNumber: 'Hall 5', section: 'Party Hall', capacity: 8, status: 'runningKOT', orderAmount: 0 },
//   { id: 26, tableNumber: 'Hall 6', section: 'Party Hall', capacity: 10, status: 'available', orderAmount: 0 },
// ];

// const Booking: React.FC = () => {
//   const [tables, setTables] = useState<RestaurantTable[]>(initialTables);
//   const [newTable, setNewTable] = useState<Omit<RestaurantTable, 'id'>>({
//     tableNumber: '',
//     section: '',
//     capacity: 0,
//     status: 'available',
//     orderAmount: 0,
//   });
//   const [searchTerm, setSearchTerm] = useState<string>('');

//   const sections = [...new Set(tables.map(table => table.section))];

//   // Add new table
//   const handleAddTable = (e: React.FormEvent) => {
//     e.preventDefault();
//     const tableToAdd: RestaurantTable = {
//       id: tables.length + 1,
//       ...newTable,
//     };
//     setTables([...tables, tableToAdd]);
//     setNewTable({ tableNumber: '', section: '', capacity: 0, status: 'available', orderAmount: 0 });
//   };

//   // Update table status
//   const handleStatusChange = (id: number, newStatus: RestaurantTable['status']) => {
//     setTables(tables.map(table =>
//       table.id === id
//         ? {
//             ...table,
//             status: newStatus,
//             orderAmount: newStatus === 'running' || newStatus === 'printed' || newStatus === 'paid' ? (table.orderAmount || 0) : 0,
//           }
//         : table
//     ));
//   };

//   // Clear table
//   const handleClearTable = (id: number) => {
//     setTables(tables.map(table =>
//       table.id === id ? { ...table, status: 'available', orderAmount: 0, reservationTime: undefined } : table
//     ));
//   };

//   // Update order amount (now handled on the orders page)
//   const handleUpdateOrderAmount = (id: number, amount: number) => {
//     setTables(tables.map(table =>
//       table.id === id ? { ...table, orderAmount: amount } : table
//     ));
//   };

//   // Handle drag and drop
//   const onDragEnd = (result: any) => {
//     if (!result.destination) return;

//     const newTables = Array.from(tables);
//     const [reorderedItem] = newTables.splice(result.source.index, 1);
//     newTables.splice(result.destination.index, 0, reorderedItem);

//     setTables(newTables);
//   };

//   // Filter tables by search term
//   const filteredTables = tables.filter(table =>
//     table.tableNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     table.section.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Navigate to orders page for a table
//   const handleTableClick = (tableNumber: string) => {
//     // Simulate opening a new page for orders (replace with React Router or navigation logic)
//     window.open(`/orders/${tableNumber}`, '_blank');
//   };

//   return (
//     <div className="container mx-auto p-4">
//       {/* Header - Enhanced Petpooja Style */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">Petpooja Table View</h1>
//         <div className="flex gap-4">
//           <input
//             type="text"
//             placeholder="Search Tables..."
//             value={searchTerm}
//             onChange={e => setSearchTerm(e.target.value)}
//             className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
//           />
//           <button className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition">Delivery</button>
//           <button className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition">Pick Up</button>
//           <button
//             onClick={handleAddTable}
//             className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition"
//           >
//             + Add Table
//           </button>
//         </div>
//       </div>

//       {/* Add Table Form - Enhanced */}
//       <form onSubmit={handleAddTable} className="mb-6 bg-gray-100 p-4 rounded-lg shadow-md">
//         <div className="grid grid-cols-1 md:grid-cols-6 gap-2">
//           <input
//             type="text"
//             placeholder="Table Number (e.g., 1)"
//             value={newTable.tableNumber}
//             onChange={e => setNewTable({ ...newTable, tableNumber: e.target.value })}
//             className="p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//             required
//           />
//           <input
//             type="text"
//             placeholder="Section (e.g., Ground Floor)"
//             value={newTable.section}
//             onChange={e => setNewTable({ ...newTable, section: e.target.value })}
//             className="p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//             required
//           />
//           <input
//             type="number"
//             placeholder="Capacity"
//             value={newTable.capacity}
//             onChange={e => setNewTable({ ...newTable, capacity: parseInt(e.target.value) })}
//             className="p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//             min="1"
//             required
//           />
//           <select
//             value={newTable.status}
//             onChange={e => setNewTable({ ...newTable, status: e.target.value as RestaurantTable['status'] })}
//             className="p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//           >
//             <option value="available">Available</option>
//             <option value="running">Running</option>
//             <option value="printed">Printed</option>
//             <option value="paid">Paid</option>
//             <option value="runningKOT">Running KOT</option>
//           </select>
//           <input
//             type="number"
//             placeholder="Order Amount (₹)"
//             value={newTable.orderAmount || ''}
//             onChange={e => setNewTable({ ...newTable, orderAmount: parseFloat(e.target.value) || 0 })}
//             className="p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//           />
//           <button type="submit" className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600 transition text-sm">
//             Add Table
//           </button>
//         </div>
//       </form>

//       {/* Table Sections - Drag and Drop Grid Layout with Minimal Info */}
//       <div className="space-y-8">
//         {sections.map(section => (
//           <div key={section} className="w-full">
//             <h2 className="text-xl font-semibold mb-4 bg-gray-200 p-2 rounded">{section}</h2>
//             <DragDropContext onDragEnd={onDragEnd}>
//               <Droppable droppableId={section} direction="horizontal">
//                 {(provided) => (
//                   <div
//                     ref={provided.innerRef}
//                     {...provided.droppableProps}
//                     className="grid grid-cols-7 gap-2 overflow-x-auto p-2 bg-white shadow-md rounded-lg"
//                   >
//                     {filteredTables
//                       .filter(table => table.section === section)
//                       .map((table, index) => (
//                         <Draggable key={table.id} draggableId={table.id.toString()} index={index}>
//                           {(provided) => (
//                             <div
//                               ref={provided.innerRef}
//                               {...provided.draggableProps}
//                               {...provided.dragHandleProps}
//                               className={`relative p-2 border rounded-lg text-center cursor-pointer hover:shadow-md transition-all duration-200 ${
//                                 table.status === 'available'
//                                   ? 'bg-gray-100 border-gray-300'
//                                   : table.status === 'running'
//                                   ? 'bg-blue-100 border-blue-300'
//                                   : table.status === 'printed'
//                                   ? 'bg-green-100 border-green-300'
//                                   : table.status === 'paid'
//                                   ? 'bg-yellow-100 border-yellow-300'
//                                   : 'bg-orange-100 border-orange-300'
//                               }`}
//                               onClick={() => handleTableClick(table.tableNumber)}
//                             >
//                               <span className="font-bold text-xs">{table.tableNumber}</span>
//                             </div>
//                           )}
//                         </Draggable>
//                       ))}
//                     {provided.placeholder}
//                   </div>
//                 )}
//               </Droppable>
//             </DragDropContext>
//           </div>
//         ))}
//       </div>

//       {/* Legend - Enhanced Petpooja Style */}
//       <div className="mt-4 flex flex-wrap gap-4 text-sm">
//         <span className="flex items-center gap-2"><span className="w-4 h-4 bg-gray-100 border border-gray-300 rounded"></span> Blank Table</span>
//         <span className="flex items-center gap-2"><span className="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></span> Running Table</span>
//         <span className="flex items-center gap-2"><span className="w-4 h-4 bg-green-100 border border-green-300 rounded"></span> Printed Table</span>
//         <span className="flex items-center gap-2"><span className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></span> Paid Table</span>
//         <span className="flex items-center gap-2"><span className="w-4 h-4 bg-orange-100 border border-orange-300 rounded"></span> Running KOT</span>
//       </div>
//     </div>
//   );
// };

// export default Booking;







