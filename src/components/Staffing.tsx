




// src/pages/Staffing.tsx

// import React, { useState } from 'react';
// import { StaffMember, NewStaffForm } from './staff/TypeStaff';
// import { UserCircleIcon, PlusCircleIcon } from '@heroicons/react/outline';
// import { motion } from 'framer-motion';
// import { memo } from 'react';

// // Role-specific colors for visual distinction
// const roleColors: Record<StaffMember['role'], string> = {
//     Chef: 'text-red-500',
//     Waiter: 'text-green-500',
//     Manager: 'text-blue-500',
//     Cleaner: 'text-yellow-500',
// };

// // Staff Card Component with animations
// const StaffCard = memo(
//     ({
//         staff,
//         onRoleChange,
//         onShiftToggle,
//     }: {
//         staff: StaffMember;
//         onRoleChange: (id: number, newRole: StaffMember['role']) => void;
//         onShiftToggle: (id: number) => void;
//     }) => {
//         const roleColor = roleColors[staff.role];
//         const shiftText = staff.shiftStatus === 'On Duty' ? 'On Duty' : 'Off Duty';
//         const shiftColor = staff.shiftStatus === 'On Duty' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';

//         return (
//             <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3 }}
//                 className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-all"
//             >
//                 <div className="flex justify-between items-center">
//                     <div className="flex items-center gap-3">
//                         <UserCircleIcon className={`h-8 w-8 ${roleColor}`} />
//                         <div>
//                             <h3 className="text-lg font-semibold text-gray-800">{staff.name}</h3>
//                             <p className="text-sm text-gray-600">Role: {staff.role}</p>
//                             <p className="text-sm text-gray-600">Status: {staff.status}</p>
//                         </div>
//                     </div>
//                     <div className="flex items-center gap-2">
//                         <select
//                             value={staff.role}
//                             onChange={(e) => onRoleChange(staff.id, e.target.value as StaffMember['role'])}
//                             className="border border-gray-300 rounded-md p-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         >
//                             <option value="Chef">Chef</option>
//                             <option value="Waiter">Waiter</option>
//                             <option value="Manager">Manager</option>
//                             <option value="Cleaner">Cleaner</option>
//                         </select>
//                         <button
//                             onClick={() => onShiftToggle(staff.id)}
//                             className={`px-2 py-1 text-xs font-medium rounded-full ${shiftColor}`}
//                         >
//                             {shiftText}
//                         </button>
//                     </div>
//                 </div>
//             </motion.div>
//         );
//     }
// );

// // Add Staff Form Component with Heroicons
// const AddStaffForm: React.FC<{ onAdd: (newStaff: NewStaffForm) => void }> = ({ onAdd }) => {
//     const [name, setName] = useState('');
//     const [role, setRole] = useState<NewStaffForm['role']>('Waiter');

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         if (name.trim()) {
//             onAdd({ name, role });
//             setName('');
//             setRole('Waiter');
//         }
//     };

//     return (
//         <motion.form
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}
//             onSubmit={handleSubmit}
//             className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200"
//         >
//             <h2 className="text-xl font-bold mb-4 text-gray-800">Add New Staff</h2>
//             <div className="flex flex-col gap-4">
//                 <div>
//                     <label className="block text-sm font-medium text-gray-700">Staff Name</label>
//                     <input
//                         type="text"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         placeholder="Enter staff name"
//                         className="mt-1 w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium text-gray-700">Role</label>
//                     <select
//                         value={role}
//                         onChange={(e) => setRole(e.target.value as NewStaffForm['role'])}
//                         className="mt-1 w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                         <option value="Chef">Chef</option>
//                         <option value="Waiter">Waiter</option>
//                         <option value="Manager">Manager</option>
//                         <option value="Cleaner">Cleaner</option>
//                     </select>
//                 </div>
//                 <button
//                     type="submit"
//                     className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
//                 >
//                     <PlusCircleIcon className="h-5 w-5" />
//                     Add Staff
//                 </button>
//             </div>
//         </motion.form>
//     );
// };

// // Main Staff Page Component
// const Staffing: React.FC = () => {
//     const [staffList, setStaffList] = useState<StaffMember[]>([
//         { id: 1, name: 'John Doe', role: 'Chef', status: 'Active', shiftStatus: 'On Duty' },
//         { id: 2, name: 'Jane Smith', role: 'Waiter', status: 'Active', shiftStatus: 'Off Duty' },
//         { id: 3, name: 'Mike Johnson', role: 'Manager', status: 'Inactive', shiftStatus: 'Off Duty' },
//     ]);

//     const handleAddStaff = (newStaff: NewStaffForm) => {
//         const newId = staffList.length + 1;
//         setStaffList([...staffList, { id: newId, ...newStaff, status: 'Active', shiftStatus: 'On Duty' }]);
//     };

//     const handleRoleChange = (id: number, newRole: StaffMember['role']) => {
//         setStaffList(
//             staffList.map((staff) =>
//                 staff.id === id ? { ...staff, role: newRole } : staff
//             )
//         );
//     };

//     const handleShiftToggle = (id: number) => {
//         setStaffList(
//             staffList.map((staff) =>
//                 staff.id === id
//                     ? {
//                         ...staff,
//                         shiftStatus: staff.shiftStatus === 'On Duty' ? 'Off Duty' : 'On Duty',
//                     }
//                     : staff
//             )
//         );
//     };

//     return (
//         <div className="p-6 max-w-4xl mx-auto">
//             <motion.h1
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="text-3xl font-bold mb-6 text-gray-800"
//             >
//                 Restaurant Staff Management
//             </motion.h1>

//             {/* Add Staff Form */}
//             <AddStaffForm onAdd={handleAddStaff} />

//             {/* Staff List with Animations */}
//             <div className="space-y-4">
//                 {staffList.map((staff) => (
//                     <StaffCard
//                         key={staff.id}
//                         staff={staff}
//                         onRoleChange={handleRoleChange}
//                         onShiftToggle={handleShiftToggle}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Staffing;





// src/pages/Staffing.tsx

// import React, { useState } from 'react';
// import { StaffMember, NewStaffForm } from './staff/TypeStaff';
// import { UserCircleIcon, PlusCircleIcon, ClockIcon, UserIcon } from '@heroicons/react/outline';
// import { motion } from 'framer-motion';
// import { memo } from 'react';

// // Role-specific colors and icons
// const roleStyles: Record<
//     StaffMember['role'],
//     { color: string; label: string }
// > = {
//     Chef: { color: 'text-red-500', label: 'Chef' },
//     Waiter: { color: 'text-green-500', label: 'Waiter' },
//     Manager: { color: 'text-blue-500', label: 'Manager' },
//     Cleaner: { color: 'text-yellow-500', label: 'Cleaner' },
// };

// // Staff Card Component with Sections
// const StaffCard = memo(
//     ({
//         staff,
//         onRoleChange,
//         onShiftToggle,
//     }: {
//         staff: StaffMember;
//         onRoleChange: (id: number, newRole: StaffMember['role']) => void;
//         onShiftToggle: (id: number) => void;
//     }) => {
//         const { color: roleColor, label: roleLabel } = roleStyles[staff.role];
//         const shiftColor =
//             staff.shiftStatus === 'On Duty' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
//         const statusColor =
//             staff.status === 'Active' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800';

//         return (
//             <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3 }}
//                 className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-all mb-4"
//             >
//                 {/* Section 1: Staff Info */}
//                 <div className="flex items-center gap-3 mb-4">
//                     <UserCircleIcon className={`h-8 w-8 ${roleColor}`} />
//                     <div>
//                         <h3 className="text-lg font-semibold text-gray-800">{staff.name}</h3>
//                         <p className="text-sm text-gray-600 flex items-center gap-1">
//                             <UserIcon className="h-4 w-4" /> Role: {roleLabel}
//                         </p>
//                     </div>
//                 </div>

//                 {/* Section 2: Status and Shift */}
//                 <div className="flex justify-between items-center mb-4">
//                     <div className="flex gap-2">
//                         <span
//                             className={`px-2 py-1 text-xs font-medium rounded-full ${statusColor}`}
//                         >
//                             {staff.status}
//                         </span>
//                         <span
//                             className={`px-2 py-1 text-xs font-medium rounded-full ${shiftColor}`}
//                         >
//                             <ClockIcon className="h-4 w-4 inline mr-1" />
//                             {staff.shiftStatus}
//                         </span>
//                     </div>
//                 </div>

//                 {/* Section 3: Actions */}
//                 <div className="flex justify-between items-center">
//                     <select
//                         value={staff.role}
//                         onChange={(e) => onRoleChange(staff.id, e.target.value as StaffMember['role'])}
//                         className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                         <option value="Chef">Chef</option>
//                         <option value="Waiter">Waiter</option>
//                         <option value="Manager">Manager</option>
//                         <option value="Cleaner">Cleaner</option>
//                     </select>
//                     <button
//                         onClick={() => onShiftToggle(staff.id)}
//                         className="bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-700 transition-colors text-sm"
//                     >
//                         Toggle Shift
//                     </button>
//                 </div>
//             </motion.div>
//         );
//     }
// );

// // Add Staff Form Component
// const AddStaffForm: React.FC<{ onAdd: (newStaff: NewStaffForm) => void }> = ({ onAdd }) => {
//     const [name, setName] = useState('');
//     const [role, setRole] = useState<NewStaffForm['role']>('Waiter');

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         if (name.trim()) {
//             onAdd({ name, role });
//             setName('');
//             setRole('Waiter');
//         }
//     };

//     return (
//         <motion.form
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}
//             onSubmit={handleSubmit}
//             className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200"
//         >
//             <h2 className="text-xl font-bold mb-4 text-gray-800">Add New Staff</h2>
//             <div className="flex flex-col gap-4">
//                 <div>
//                     <label className="block text-sm font-medium text-gray-700">Staff Name</label>
//                     <input
//                         type="text"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         placeholder="Enter staff name"
//                         className="mt-1 w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium text-gray-700">Role</label>
//                     <select
//                         value={role}
//                         onChange={(e) => setRole(e.target.value as NewStaffForm['role'])}
//                         className="mt-1 w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                         <option value="Chef">Chef</option>
//                         <option value="Waiter">Waiter</option>
//                         <option value="Manager">Manager</option>
//                         <option value="Cleaner">Cleaner</option>
//                     </select>
//                 </div>
//                 <button
//                     type="submit"
//                     className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
//                 >
//                     <PlusCircleIcon className="h-5 w-5" />
//                     Add Staff
//                 </button>
//             </div>
//         </motion.form>
//     );
// };

// // Main Staff Page Component
// const Staffing: React.FC = () => {
//     const [staffList, setStaffList] = useState<StaffMember[]>([
//         { id: 1, name: 'John Doe', role: 'Chef', status: 'Active', shiftStatus: 'On Duty' },
//         { id: 2, name: 'Jane Smith', role: 'Waiter', status: 'Active', shiftStatus: 'Off Duty' },
//         { id: 3, name: 'Mike Johnson', role: 'Manager', status: 'Inactive', shiftStatus: 'Off Duty' },
//     ]);

//     const handleAddStaff = (newStaff: NewStaffForm) => {
//         const newId = staffList.length + 1;
//         setStaffList([...staffList, { id: newId, ...newStaff, status: 'Active', shiftStatus: 'On Duty' }]);
//     };

//     const handleRoleChange = (id: number, newRole: StaffMember['role']) => {
//         setStaffList(
//             staffList.map((staff) =>
//                 staff.id === id ? { ...staff, role: newRole } : staff
//             )
//         );
//     };

//     const handleShiftToggle = (id: number) => {
//         setStaffList(
//             staffList.map((staff) =>
//                 staff.id === id
//                     ? {
//                         ...staff,
//                         shiftStatus: staff.shiftStatus === 'On Duty' ? 'Off Duty' : 'On Duty',
//                     }
//                     : staff
//             )
//         );
//     };

//     return (
//         <div className="p-6 max-w-4xl mx-auto">
//             <motion.h1
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="text-3xl font-bold mb-6 text-gray-800"
//             >
//                 Restaurant Staff Management
//             </motion.h1>

//             {/* Add Staff Form */}
//             <AddStaffForm onAdd={handleAddStaff} />

//             {/* Staff List */}
//             <div className="space-y-4">
//                 {staffList.map((staff) => (
//                     <StaffCard
//                         key={staff.id}
//                         staff={staff}
//                         onRoleChange={handleRoleChange}
//                         onShiftToggle={handleShiftToggle}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Staffing;



// src/pages/Staffing.tsx

// import React, { useState } from 'react';
// import { StaffMember, NewStaffForm } from './staff/TypeStaff';
// import { UserCircleIcon, PlusCircleIcon, ClockIcon } from '@heroicons/react/outline';
// import { motion } from 'framer-motion';
// import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

// // Role-specific styles
// const roleStyles: Record<
//     StaffMember['role'],
//     { color: string; bgColor: string; label: string }
// > = {
//     Chef: { color: 'text-red-600', bgColor: 'bg-red-50', label: 'Chefs' },
//     Waiter: { color: 'text-green-600', bgColor: 'bg-green-50', label: 'Waiters' },
//     Manager: { color: 'text-blue-600', bgColor: 'bg-blue-50', label: 'Managers' },
//     Cleaner: { color: 'text-yellow-600', bgColor: 'bg-yellow-50', label: 'Cleaners' },
// };

// // Staff Tile Component
// const StaffTile: React.FC<{
//     staff: StaffMember;
//     index: number;
//     onShiftToggle: (id: number) => void;
// }> = ({ staff, index, onShiftToggle }) => {
//     const { color } = roleStyles[staff.role];
//     const shiftColor = staff.shiftStatus === 'On Duty' ? 'text-green-600' : 'text-gray-600';

//     return (
//         <Draggable draggableId={staff.id.toString()} index={index}>
//             {(provided) => (
//                 <motion.div
//                     ref={provided.innerRef}
//                     {...provided.draggableProps}
//                     {...provided.dragHandleProps}
//                     initial={{ opacity: 0, scale: 0.95 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ duration: 0.2 }}
//                     className="p-3 bg-white rounded-md shadow-sm border border-gray-200 flex items-center justify-between hover:bg-gray-50 transition-all"
//                 >
//                     <div className="flex items-center gap-2">
//                         <UserCircleIcon className={`h-6 w-6 ${color}`} />
//                         <div>
//                             <p className="text-sm font-medium text-gray-800">{staff.name}</p>
//                             <p className="text-xs text-gray-600 flex items-center gap-1">
//                                 <ClockIcon className={`h-4 w-4 ${shiftColor}`} />
//                                 {staff.shiftStatus}
//                             </p>
//                         </div>
//                     </div>
//                     <button
//                         onClick={() => onShiftToggle(staff.id)}
//                         className="text-sm text-blue-600 hover:text-blue-800"
//                     >
//                         {staff.shiftStatus === 'On Duty' ? 'Off' : 'On'}
//                     </button>
//                 </motion.div>
//             )}
//         </Draggable>
//     );
// };

// // Add Staff Form Component
// const AddStaffForm: React.FC<{ onAdd: (newStaff: NewStaffForm) => void }> = ({ onAdd }) => {
//     const [name, setName] = useState('');
//     const [role, setRole] = useState<NewStaffForm['role']>('Waiter');

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         if (name.trim()) {
//             onAdd({ name, role });
//             setName('');
//             setRole('Waiter');
//         }
//     };

//     return (
//         <motion.form
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             onSubmit={handleSubmit}
//             className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200"
//         >
//             <h2 className="text-xl font-bold mb-4 text-gray-800">Add New Staff</h2>
//             <div className="grid grid-cols-2 gap-4">
//                 <div>
//                     <label className="block text-sm font-medium text-gray-700">Staff Name</label>
//                     <input
//                         type="text"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         placeholder="Enter staff name"
//                         className="mt-1 w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium text-gray-700">Role</label>
//                     <select
//                         value={role}
//                         onChange={(e) => setRole(e.target.value as NewStaffForm['role'])}
//                         className="mt-1 w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                         <option value="Chef">Chef</option>
//                         <option value="Waiter">Waiter</option>
//                         <option value="Manager">Manager</option>
//                         <option value="Cleaner">Cleaner</option>
//                     </select>
//                 </div>
//             </div>
//             <button
//                 type="submit"
//                 className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 w-full"
//             >
//                 <PlusCircleIcon className="h-5 w-5" />
//                 Add Staff
//             </button>
//         </motion.form>
//     );
// };

// // Main Staff Page Component
// const Staffing: React.FC = () => {
//     const [staffList, setStaffList] = useState<StaffMember[]>([
//         { id: 1, name: 'John Doe', role: 'Chef', status: 'Active', shiftStatus: 'On Duty' },
//         { id: 2, name: 'Jane Smith', role: 'Waiter', status: 'Active', shiftStatus: 'Off Duty' },
//         { id: 3, name: 'Mike Johnson', role: 'Manager', status: 'Inactive', shiftStatus: 'Off Duty' },
//         { id: 4, name: 'Sara Lee', role: 'Cleaner', status: 'Active', shiftStatus: 'On Duty' },
//     ]);

//     const handleAddStaff = (newStaff: NewStaffForm) => {
//         const newId = staffList.length + 1;
//         setStaffList([...staffList, { id: newId, ...newStaff, status: 'Active', shiftStatus: 'On Duty' }]);
//     };

//     const handleShiftToggle = (id: number) => {
//         setStaffList(
//             staffList.map((staff) =>
//                 staff.id === id
//                     ? { ...staff, shiftStatus: staff.shiftStatus === 'On Duty' ? 'Off Duty' : 'On Duty' }
//                     : staff
//             )
//         );
//     };

//     const handleDragEnd = (result: DropResult) => {
//         const { source, destination } = result;
//         if (!destination) return;

//         const sourceRole = source.droppableId as StaffMember['role'];
//         const destRole = destination.droppableId as StaffMember['role'];
//         if (sourceRole === destRole) return;

//         const staffToMove = staffList.find((s) => s.id.toString() === result.draggableId);
//         if (!staffToMove) return;

//         setStaffList(
//             staffList.map((staff) =>
//                 staff.id === staffToMove.id ? { ...staff, role: destRole } : staff
//             )
//         );
//     };

//     const roles: StaffMember['role'][] = ['Chef', 'Waiter', 'Manager', 'Cleaner'];

//     return (
//         <div className="p-6 max-w-5xl mx-auto">
//             <motion.h1
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="text-3xl font-bold mb-6 text-gray-800"
//             >
//                 Restaurant Staff Dashboard
//             </motion.h1>

//             {/* Add Staff Form */}
//             <AddStaffForm onAdd={handleAddStaff} />

//             {/* Staff Grid by Role */}
//             <DragDropContext onDragEnd={handleDragEnd}>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                     {roles.map((role) => {
//                         const { color, bgColor, label } = roleStyles[role];
//                         const roleStaff = staffList.filter((staff) => staff.role === role);

//                         return (
//                             <Droppable droppableId={role} key={role}>
//                                 {(provided) => (
//                                     <div
//                                         className={`p-4 rounded-lg ${bgColor} border border-gray-200 shadow-md`}
//                                         ref={provided.innerRef}
//                                         {...provided.droppableProps}
//                                     >
//                                         <h2 className={`text-lg font-semibold ${color} mb-3 flex items-center gap-2`}>
//                                             <UserCircleIcon className="h-6 w-6" />
//                                             {label} ({roleStaff.length})
//                                         </h2>
//                                         <div className="space-y-2 min-h-[100px]">
//                                             {roleStaff.map((staff, index) => (
//                                                 <StaffTile
//                                                     key={staff.id}
//                                                     staff={staff}
//                                                     index={index}
//                                                     onShiftToggle={handleShiftToggle}
//                                                 />
//                                             ))}
//                                             {roleStaff.length === 0 && (
//                                                 <p className="text-sm text-gray-500">No staff assigned</p>
//                                             )}
//                                             {provided.placeholder}
//                                         </div>
//                                     </div>
//                                 )}
//                             </Droppable>
//                         );
//                     })}
//                 </div>
//             </DragDropContext>
//         </div>
//     );
// };

// export default Staffing;




// src/pages/Staffing.tsx

// import React, { useState } from 'react';
// import { StaffMember, NewStaffForm } from './staff/TypeStaff';
// import { UserCircleIcon, PlusCircleIcon, ClockIcon } from '@heroicons/react/outline';
// import { motion } from 'framer-motion';
// import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

// // Role-specific styles with enhanced gradients and borders
// const roleStyles: Record<
//     StaffMember['role'],
//     { color: string; bgGradient: string; border: string; label: string }
// > = {
//     Chef: {
//         color: 'text-red-600',
//         bgGradient: 'bg-gradient-to-br from-red-50 to-red-100',
//         border: 'border-red-200',
//         label: 'Chefs',
//     },
//     Waiter: {
//         color: 'text-green-600',
//         bgGradient: 'bg-gradient-to-br from-green-50 to-green-100',
//         border: 'border-green-200',
//         label: 'Waiters',
//     },
//     Manager: {
//         color: 'text-blue-600',
//         bgGradient: 'bg-gradient-to-br from-blue-50 to-blue-100',
//         border: 'border-blue-200',
//         label: 'Managers',
//     },
//     Cleaner: {
//         color: 'text-yellow-600',
//         bgGradient: 'bg-gradient-to-br from-yellow-50 to-yellow-100',
//         border: 'border-yellow-200',
//         label: 'Cleaners',
//     },
// };

// // Staff Tile Component with Enhanced Styling
// const StaffTile: React.FC<{
//     staff: StaffMember;
//     index: number;
//     onShiftToggle: (id: number) => void;
// }> = ({ staff, index, onShiftToggle }) => {
//     const { color } = roleStyles[staff.role];
//     const shiftColor = staff.shiftStatus === 'On Duty' ? 'bg-green-500' : 'bg-gray-400';
//     const statusColor = staff.status === 'Active' ? 'bg-blue-500' : 'bg-gray-500';

//     return (
//         <Draggable draggableId={staff.id.toString()} index={index}>
//             {(provided) => (
//                 <motion.div
//                     ref={provided.innerRef}
//                     {...provided.draggableProps}
//                     {...provided.dragHandleProps}
//                     initial={{ opacity: 0, scale: 0.95 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ duration: 0.2 }}
//                     className="p-4 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex items-center justify-between"
//                     style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)' }}
//                 >
//                     {/* Left: Staff Info */}
//                     <div className="flex items-center gap-3">
//                         <div className="relative">
//                             <UserCircleIcon className={`h-8 w-8 ${color}`} />
//                             <div
//                                 className={`absolute -top-1 -right-1 h-3 w-3 ${statusColor} rounded-full border-2 border-white`}
//                             />
//                         </div>
//                         <div>
//                             <p className="text-sm font-semibold text-gray-900 tracking-tight">{staff.name}</p>
//                             <p className="text-xs text-gray-500 flex items-center gap-1">
//                                 <ClockIcon className={`h-4 w-4 ${shiftColor} text-white rounded-full p-0.5`} />
//                                 <span className="font-medium">{staff.shiftStatus}</span>
//                             </p>
//                         </div>
//                     </div>

//                     {/* Right: Shift Toggle */}
//                     <button
//                         onClick={() => onShiftToggle(staff.id)}
//                         className={`px-2 py-1 text-xs font-medium rounded-full ${staff.shiftStatus === 'On Duty'
//                                 ? 'bg-green-100 text-green-700 hover:bg-green-200'
//                                 : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                             } transition-colors`}
//                     >
//                         {staff.shiftStatus === 'On Duty' ? 'Off' : 'On'}
//                     </button>
//                 </motion.div>
//             )}
//         </Draggable>
//     );
// };

// // Add Staff Form Component with Enhanced Styling
// const AddStaffForm: React.FC<{ onAdd: (newStaff: NewStaffForm) => void }> = ({ onAdd }) => {
//     const [name, setName] = useState('');
//     const [role, setRole] = useState<NewStaffForm['role']>('Waiter');

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         if (name.trim()) {
//             onAdd({ name, role });
//             setName('');
//             setRole('Waiter');
//         }
//     };

//     return (
//         <motion.form
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             onSubmit={handleSubmit}
//             className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100"
//         >
//             <h2 className="text-xl font-bold mb-4 text-gray-800">Add New Staff</h2>
//             <div className="grid grid-cols-2 gap-4">
//                 <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Staff Name</label>
//                     <input
//                         type="text"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         placeholder="Enter staff name"
//                         className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
//                     />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
//                     <select
//                         value={role}
//                         onChange={(e) => setRole(e.target.value as NewStaffForm['role'])}
//                         className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
//                     >
//                         <option value="Chef">Chef</option>
//                         <option value="Waiter">Waiter</option>
//                         <option value="Manager">Manager</option>
//                         <option value="Cleaner">Cleaner</option>
//                     </select>
//                 </div>
//             </div>
//             <button
//                 type="submit"
//                 className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 w-full shadow-md"
//             >
//                 <PlusCircleIcon className="h-5 w-5" />
//                 Add Staff
//             </button>
//         </motion.form>
//     );
// };

// // Main Staff Page Component
// const Staffing: React.FC = () => {
//     const [staffList, setStaffList] = useState<StaffMember[]>([
//         { id: 1, name: 'John Doe', role: 'Chef', status: 'Active', shiftStatus: 'On Duty' },
//         { id: 2, name: 'Jane Smith', role: 'Waiter', status: 'Active', shiftStatus: 'Off Duty' },
//         { id: 3, name: 'Mike Johnson', role: 'Manager', status: 'Inactive', shiftStatus: 'Off Duty' },
//         { id: 4, name: 'Sara Lee', role: 'Cleaner', status: 'Active', shiftStatus: 'On Duty' },
//     ]);

//     const handleAddStaff = (newStaff: NewStaffForm) => {
//         const newId = staffList.length + 1;
//         setStaffList([...staffList, { id: newId, ...newStaff, status: 'Active', shiftStatus: 'On Duty' }]);
//     };

//     const handleShiftToggle = (id: number) => {
//         setStaffList(
//             staffList.map((staff) =>
//                 staff.id === id
//                     ? { ...staff, shiftStatus: staff.shiftStatus === 'On Duty' ? 'Off Duty' : 'On Duty' }
//                     : staff
//             )
//         );
//     };

//     const handleDragEnd = (result: DropResult) => {
//         const { source, destination } = result;
//         if (!destination) return;

//         const sourceRole = source.droppableId as StaffMember['role'];
//         const destRole = destination.droppableId as StaffMember['role'];
//         if (sourceRole === destRole) return;

//         const staffToMove = staffList.find((s) => s.id.toString() === result.draggableId);
//         if (!staffToMove) return;

//         setStaffList(
//             staffList.map((staff) =>
//                 staff.id === staffToMove.id ? { ...staff, role: destRole } : staff
//             )
//         );
//     };

//     const roles: StaffMember['role'][] = ['Chef', 'Waiter', 'Manager', 'Cleaner'];

//     return (
//         <div className="p-6 max-w-5xl mx-auto">
//             <motion.h1
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="text-3xl font-bold mb-8 text-gray-800 tracking-tight"
//             >
//                 Restaurant Staff Dashboard
//             </motion.h1>

//             {/* Add Staff Form */}
//             <AddStaffForm onAdd={handleAddStaff} />

//             {/* Staff Grid by Role */}
//             <DragDropContext onDragEnd={handleDragEnd}>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                     {roles.map((role) => {
//                         const { color, bgGradient, border, label } = roleStyles[role];
//                         const roleStaff = staffList.filter((staff) => staff.role === role);

//                         return (
//                             <Droppable droppableId={role} key={role}>
//                                 {(provided) => (
//                                     <div
//                                         className={`p-4 rounded-lg ${bgGradient} ${border} shadow-md`}
//                                         ref={provided.innerRef}
//                                         {...provided.droppableProps}
//                                     >
//                                         <h2 className={`text-lg font-semibold ${color} mb-3 flex items-center gap-2`}>
//                                             <UserCircleIcon className="h-6 w-6" />
//                                             {label} ({roleStaff.length})
//                                         </h2>
//                                         <div className="space-y-3 min-h-[100px]">
//                                             {roleStaff.map((staff, index) => (
//                                                 <StaffTile
//                                                     key={staff.id}
//                                                     staff={staff}
//                                                     index={index}
//                                                     onShiftToggle={handleShiftToggle}
//                                                 />
//                                             ))}
//                                             {roleStaff.length === 0 && (
//                                                 <p className="text-sm text-gray-500 italic">No staff assigned</p>
//                                             )}
//                                             {provided.placeholder}
//                                         </div>
//                                     </div>
//                                 )}
//                             </Droppable>
//                         );
//                     })}
//                 </div>
//             </DragDropContext>
//         </div>
//     );
// };

// export default Staffing;




// src/pages/Staffing.tsx

// import React, { useState } from 'react';
// import { StaffMember, NewStaffForm } from './staff/TypeStaff';
// import { UserCircleIcon, PlusCircleIcon, ClockIcon, XIcon } from '@heroicons/react/outline';
// import { motion, AnimatePresence } from 'framer-motion';

// // Role-specific styles
// const roleStyles: Record<
//     StaffMember['role'],
//     { color: string; badgeBg: string; label: string }
// > = {
//     Chef: { color: 'text-red-600', badgeBg: 'bg-red-100', label: 'Chefs' },
//     Waiter: { color: 'text-green-600', badgeBg: 'bg-green-100', label: 'Waiters' },
//     Manager: { color: 'text-blue-600', badgeBg: 'bg-blue-100', label: 'Managers' },
//     Cleaner: { color: 'text-yellow-600', badgeBg: 'bg-yellow-100', label: 'Cleaners' },
// };

// // Staff Card Component
// const StaffCard: React.FC<{
//     staff: StaffMember;
//     onRoleChange: (id: number, newRole: StaffMember['role']) => void;
//     onShiftToggle: (id: number) => void;
// }> = ({ staff, onRoleChange, onShiftToggle }) => {
//     const { color, badgeBg } = roleStyles[staff.role];
//     const shiftColor = staff.shiftStatus === 'On Duty' ? 'text-green-600' : 'text-gray-600';

//     return (
//         <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             transition={{ duration: 0.2 }}
//             className="bg-white p-3 rounded-md shadow-sm border border-gray-100 hover:bg-gray-50 transition-all flex items-center justify-between"
//         >
//             {/* Left: Staff Info */}
//             <div className="flex items-center gap-2">
//                 <UserCircleIcon className={`h-6 w-6 ${color}`} />
//                 <div>
//                     <p className="text-sm font-medium text-gray-800">{staff.name}</p>
//                     <div className="flex items-center gap-2">
//                         <span className={`text-xs ${badgeBg} ${color} px-1.5 py-0.5 rounded-full`}>
//                             {staff.role}
//                         </span>
//                         <p className="text-xs text-gray-500 flex items-center gap-1">
//                             <ClockIcon className={`h-4 w-4 ${shiftColor}`} />
//                             {staff.shiftStatus}
//                         </p>
//                     </div>
//                 </div>
//             </div>

//             {/* Right: Actions */}
//             <div className="flex items-center gap-2">
//                 <select
//                     value={staff.role}
//                     onChange={(e) => onRoleChange(staff.id, e.target.value as StaffMember['role'])}
//                     className="text-xs border border-gray-300 rounded-md p-1 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
//                 >
//                     <option value="Chef">Chef</option>
//                     <option value="Waiter">Waiter</option>
//                     <option value="Manager">Manager</option>
//                     <option value="Cleaner">Cleaner</option>
//                 </select>
//                 <button
//                     onClick={() => onShiftToggle(staff.id)}
//                     className={`text-xs px-2 py-1 rounded-md ${staff.shiftStatus === 'On Duty'
//                             ? 'bg-green-100 text-green-700 hover:bg-green-200'
//                             : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                         } transition-colors`}
//                 >
//                     {staff.shiftStatus === 'On Duty' ? 'Off' : 'On'}
//                 </button>
//             </div>
//         </motion.div>
//     );
// };

// // Add Staff Modal Component
// const AddStaffModal: React.FC<{
//     isOpen: boolean;
//     onClose: () => void;
//     onAdd: (newStaff: NewStaffForm) => void;
// }> = ({ isOpen, onClose, onAdd }) => {
//     const [name, setName] = useState('');
//     const [role, setRole] = useState<NewStaffForm['role']>('Waiter');

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         if (name.trim()) {
//             onAdd({ name, role });
//             setName('');
//             setRole('Waiter');
//             onClose();
//         }
//     };

//     return (
//         <AnimatePresence>
//             {isOpen && (
//                 <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//                 >
//                     <motion.div
//                         initial={{ scale: 0.95, opacity: 0 }}
//                         animate={{ scale: 1, opacity: 1 }}
//                         exit={{ scale: 0.95, opacity: 0 }}
//                         transition={{ duration: 0.2 }}
//                         className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
//                     >
//                         <div className="flex justify-between items-center mb-4">
//                             <h2 className="text-xl font-bold text-gray-800">Add New Staff</h2>
//                             <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//                                 <XIcon className="h-5 w-5" />
//                             </button>
//                         </div>
//                         <form onSubmit={handleSubmit} className="space-y-4">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Staff Name</label>
//                                 <input
//                                     type="text"
//                                     value={name}
//                                     onChange={(e) => setName(e.target.value)}
//                                     placeholder="Enter staff name"
//                                     className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
//                                 <select
//                                     value={role}
//                                     onChange={(e) => setRole(e.target.value as NewStaffForm['role'])}
//                                     className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 >
//                                     <option value="Chef">Chef</option>
//                                     <option value="Waiter">Waiter</option>
//                                     <option value="Manager">Manager</option>
//                                     <option value="Cleaner">Cleaner</option>
//                                 </select>
//                             </div>
//                             <button
//                                 type="submit"
//                                 className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
//                             >
//                                 <PlusCircleIcon className="h-5 w-5" />
//                                 Add Staff
//                             </button>
//                         </form>
//                     </motion.div>
//                 </motion.div>
//             )}
//         </AnimatePresence>
//     );
// };

// // Main Staff Page Component
// const Staffing: React.FC = () => {
//     const [staffList, setStaffList] = useState<StaffMember[]>([
//         { id: 1, name: 'John Doe', role: 'Chef', status: 'Active', shiftStatus: 'On Duty' },
//         { id: 2, name: 'Jane Smith', role: 'Waiter', status: 'Active', shiftStatus: 'Off Duty' },
//         { id: 3, name: 'Mike Johnson', role: 'Manager', status: 'Inactive', shiftStatus: 'Off Duty' },
//         { id: 4, name: 'Sara Lee', role: 'Cleaner', status: 'Active', shiftStatus: 'On Duty' },
//     ]);
//     const [activeTab, setActiveTab] = useState<StaffMember['role']>('Chef');
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     const handleAddStaff = (newStaff: NewStaffForm) => {
//         const newId = staffList.length + 1;
//         setStaffList([...staffList, { id: newId, ...newStaff, status: 'Active', shiftStatus: 'On Duty' }]);
//     };

//     const handleRoleChange = (id: number, newRole: StaffMember['role']) => {
//         setStaffList(
//             staffList.map((staff) =>
//                 staff.id === id ? { ...staff, role: newRole } : staff
//             )
//         );
//     };

//     const handleShiftToggle = (id: number) => {
//         setStaffList(
//             staffList.map((staff) =>
//                 staff.id === id
//                     ? { ...staff, shiftStatus: staff.shiftStatus === 'On Duty' ? 'Off Duty' : 'On Duty' }
//                     : staff
//             )
//         );
//     };

//     const roles: StaffMember['role'][] = ['Chef', 'Waiter', 'Manager', 'Cleaner'];
//     const filteredStaff = staffList.filter((staff) => staff.role === activeTab);

//     return (
//         <div className="p-6 max-w-4xl mx-auto relative">
//             <motion.h1
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="text-3xl font-bold mb-6 text-gray-800"
//             >
//                 Restaurant Staff Management
//             </motion.h1>

//             {/* Tabs */}
//             <div className="flex border-b border-gray-200 mb-6">
//                 {roles.map((role) => {
//                     const { color, label } = roleStyles[role];
//                     const isActive = activeTab === role;
//                     return (
//                         <button
//                             key={role}
//                             onClick={() => setActiveTab(role)}
//                             className={`px-4 py-2 text-sm font-medium ${isActive
//                                     ? `${color} border-b-2 border-current`
//                                     : 'text-gray-500 hover:text-gray-700'
//                                 } transition-colors`}
//                         >
//                             {label} ({staffList.filter((s) => s.role === role).length})
//                         </button>
//                     );
//                 })}
//             </div>

//             {/* Staff Cards for Active Tab */}
//             <div className="space-y-3">
//                 <AnimatePresence>
//                     {filteredStaff.map((staff) => (
//                         <StaffCard
//                             key={staff.id}
//                             staff={staff}
//                             onRoleChange={handleRoleChange}
//                             onShiftToggle={handleShiftToggle}
//                         />
//                     ))}
//                 </AnimatePresence>
//                 {filteredStaff.length === 0 && (
//                     <p className="text-sm text-gray-500 text-center py-4">No staff in this role</p>
//                 )}
//             </div>

//             {/* Floating Action Button */}
//             <motion.button
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => setIsModalOpen(true)}
//                 className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
//             >
//                 <PlusCircleIcon className="h-6 w-6" />
//             </motion.button>

//             {/* Add Staff Modal */}
//             <AddStaffModal
//                 isOpen={isModalOpen}
//                 onClose={() => setIsModalOpen(false)}
//                 onAdd={handleAddStaff}
//             />
//         </div>
//     );
// };

// export default Staffing;






// src/pages/Staffing.tsx

import React, { useState } from 'react';
import { StaffMember, NewStaffForm } from './staff/TypeStaff';
import { UserCircleIcon, PlusCircleIcon, ClockIcon } from '@heroicons/react/outline';
import { motion, AnimatePresence } from 'framer-motion';

// Role-specific styles with enhanced beautification
const roleStyles: Record<
    StaffMember['role'],
    { color: string; badgeBg: string; gradient: string; label: string }
> = {
    Chef: {
        color: 'text-red-600',
        badgeBg: 'bg-red-100',
        gradient: 'bg-gradient-to-r from-red-50 to-red-100',
        label: 'Chefs',
    },
    Waiter: {
        color: 'text-green-600',
        badgeBg: 'bg-green-100',
        gradient: 'bg-gradient-to-r from-green-50 to-green-100',
        label: 'Waiters',
    },
    Manager: {
        color: 'text-blue-600',
        badgeBg: 'bg-blue-100',
        gradient: 'bg-gradient-to-r from-blue-50 to-blue-100',
        label: 'Managers',
    },
    Cleaner: {
        color: 'text-yellow-600',
        badgeBg: 'bg-yellow-100',
        gradient: 'bg-gradient-to-r from-yellow-50 to-yellow-100',
        label: 'Cleaners',
    },
};

// Staff Card Component with Beautification
const StaffCard: React.FC<{
    staff: StaffMember;
    onRoleChange: (id: number, newRole: StaffMember['role']) => void;
    onShiftToggle: (id: number) => void;
}> = ({ staff, onRoleChange, onShiftToggle }) => {
    const { color, badgeBg, gradient } = roleStyles[staff.role];
    const shiftColor = staff.shiftStatus === 'On Duty' ? 'text-green-600' : 'text-gray-600';

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`${gradient} p-3 rounded-md shadow-md border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex items-center justify-between`}
        >
            {/* Left: Staff Info */}
            <div className="flex items-center gap-3">
                <UserCircleIcon className={`h-7 w-7 ${color} drop-shadow-sm`} />
                <div>
                    <p className="text-sm font-semibold text-gray-900 tracking-tight">{staff.name}</p>
                    <div className="flex items-center gap-2">
                        <span className={`text-xs ${badgeBg} ${color} px-2 py-0.5 rounded-full shadow-sm`}>
                            {staff.role}
                        </span>
                        <p className="text-xs text-gray-600 flex items-center gap-1">
                            <ClockIcon className={`h-4 w-4 ${shiftColor}`} />
                            {staff.shiftStatus}
                        </p>
                    </div>
                </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
                <select
                    value={staff.role}
                    onChange={(e) => onRoleChange(staff.id, e.target.value as StaffMember['role'])}
                    className="text-xs border border-gray-200 rounded-md p-1 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="Chef">Chef</option>
                    <option value="Waiter">Waiter</option>
                    <option value="Manager">Manager</option>
                    <option value="Cleaner">Cleaner</option>
                </select>
                <button
                    onClick={() => onShiftToggle(staff.id)}
                    className={`text-xs px-2 py-1 rounded-full shadow-sm ${staff.shiftStatus === 'On Duty'
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        } transition-colors`}
                >
                    {staff.shiftStatus === 'On Duty' ? 'Off' : 'On'}
                </button>
            </div>
        </motion.div>
    );
};

// Inline Add Staff Form Component
const AddStaffInlineForm: React.FC<{
    isOpen: boolean;
    onAdd: (newStaff: NewStaffForm) => void;
}> = ({ isOpen, onAdd }) => {
    const [name, setName] = useState('');
    const [role, setRole] = useState<NewStaffForm['role']>('Waiter');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onAdd({ name, role });
            setName('');
            setRole('Waiter');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white p-4 rounded-md shadow-md border border-gray-200 mb-4"
                >
                    <form onSubmit={handleSubmit} className="flex items-center gap-3">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Staff name"
                            className="flex-1 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                        />
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value as NewStaffForm['role'])}
                            className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                        >
                            <option value="Chef">Chef</option>
                            <option value="Waiter">Waiter</option>
                            <option value="Manager">Manager</option>
                            <option value="Cleaner">Cleaner</option>
                        </select>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-md"
                        >
                            <PlusCircleIcon className="h-5 w-5" />
                            Add
                        </button>
                    </form>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// Main Staff Page Component
const Staffing: React.FC = () => {
    const [staffList, setStaffList] = useState<StaffMember[]>([
        { id: 1, name: 'John Doe', role: 'Chef', status: 'Active', shiftStatus: 'On Duty' },
        { id: 2, name: 'Jane Smith', role: 'Waiter', status: 'Active', shiftStatus: 'Off Duty' },
        { id: 3, name: 'Mike Johnson', role: 'Manager', status: 'Inactive', shiftStatus: 'Off Duty' },
        { id: 4, name: 'Sara Lee', role: 'Cleaner', status: 'Active', shiftStatus: 'On Duty' },
    ]);
    const [activeTab, setActiveTab] = useState<StaffMember['role']>('Chef');
    const [isAdding, setIsAdding] = useState(false);

    const handleAddStaff = (newStaff: NewStaffForm) => {
        const newId = staffList.length + 1;
        setStaffList([...staffList, { id: newId, ...newStaff, status: 'Active', shiftStatus: 'On Duty' }]);
    };

    const handleRoleChange = (id: number, newRole: StaffMember['role']) => {
        setStaffList(
            staffList.map((staff) =>
                staff.id === id ? { ...staff, role: newRole } : staff
            )
        );
    };

    const handleShiftToggle = (id: number) => {
        setStaffList(
            staffList.map((staff) =>
                staff.id === id
                    ? { ...staff, shiftStatus: staff.shiftStatus === 'On Duty' ? 'Off Duty' : 'On Duty' }
                    : staff
            )
        );
    };

    const roles: StaffMember['role'][] = ['Chef', 'Waiter', 'Manager', 'Cleaner'];
    const filteredStaff = staffList.filter((staff) => staff.role === activeTab);

    return (
        <div className="p-6 max-w-4xl mx-auto bg-gray-50 min-h-screen">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold mb-6 text-gray-800 tracking-tight"
            >
                Restaurant Staff Management
            </motion.h1>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-6 bg-white rounded-t-md shadow-sm">
                {roles.map((role) => {
                    const { color, label } = roleStyles[role];
                    const isActive = activeTab === role;
                    return (
                        <button
                            key={role}
                            onClick={() => setActiveTab(role)}
                            className={`px-5 py-3 text-sm font-medium ${isActive
                                    ? `${color} bg-white border-b-2 border-current rounded-t-md`
                                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                                } transition-all duration-200`}
                        >
                            {label} ({staffList.filter((s) => s.role === role).length})
                        </button>
                    );
                })}
            </div>

            {/* Add Staff Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsAdding(!isAdding)}
                className="mb-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-md"
            >
                <PlusCircleIcon className="h-5 w-5" />
                {isAdding ? 'Cancel' : 'Add Staff'}
            </motion.button>

            {/* Inline Add Staff Form */}
            <AddStaffInlineForm isOpen={isAdding} onAdd={handleAddStaff} />

            {/* Staff Cards for Active Tab */}
            <div className="space-y-3">
                <AnimatePresence>
                    {filteredStaff.map((staff) => (
                        <StaffCard
                            key={staff.id}
                            staff={staff}
                            onRoleChange={handleRoleChange}
                            onShiftToggle={handleShiftToggle}
                        />
                    ))}
                </AnimatePresence>
                {filteredStaff.length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4 italic">No staff in this role</p>
                )}
            </div>
        </div>
    );
};

export default Staffing;