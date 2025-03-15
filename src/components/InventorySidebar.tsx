// // components/InventorySidebar.tsx
// import React, { useState } from 'react';
// import {
//     FaBars,
//     FaShoppingBag,
//     FaHome,
//     FaBoxes,
//     FaFlask,
//     FaBook,
//     FaChartBar,
//     FaUsers,
//     FaShoppingCart,
//     FaUtensils,
//     FaExchangeAlt,
//     FaFileAlt,
//     FaRuler,
//     FaCog,
//     FaAngleDown,
//     FaAngleRight
// } from 'react-icons/fa';
// import { Link } from 'react-router-dom'; // Import Link from react-router-dom

// interface MenuItem {
//     title: string;
//     icon: JSX.Element;
//     path?: string;
//     subItems?: { title: string; path: string }[];
// }

// const InventorySidebar: React.FC = () => {
//     const [isOpen, setIsOpen] = useState(true);
//     const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

//     const menuItems: MenuItem[] = [
//         { title: 'Back to Billing', icon: <FaHome />, path: '/orders' },
//         { title: 'Inventory Dashboard', icon: <FaBoxes />, path: '/inventory/dashboard' },
//         { title: 'Raw Material', icon: <FaFlask />, path: '/inventory/raw-materials' },
//         { title: 'Item Recipes', icon: <FaBook />, path: '/recipes-management' },
//         { title: 'Closing Stock', icon: <FaChartBar />, path: '/inventory/closing-stock' },
//         {
//             title: 'Suppliers',
//             icon: <FaUsers />,
//             subItems: [
//                 { title: 'Suppilers/Third Party', path: '/suppliers/third-party' },
//                 { title: 'Purchase Invoice Settlement', path: '/suppliers/purchase-invoice' },
//                 // { title: 'Supplier Details', path: '/suppliers/details' }
//             ]
//         },
//         {
//             title: 'Purchase',
//             icon: <FaShoppingCart />,
//             subItems: [
//                 { title: 'Stock Purchase', path: '/purchase/request/stock' },
//                 { title: 'Request For Purchase', path: '/purchase/request' },
//                 { title: 'Purchase Return', path: '/purchase/return' }
//             ]
//         },
//         {
//             title: 'Consumption',
//             icon: <FaUtensils />,
//             subItems: [
//                 { title: 'Sales', path: '/consumtion/sales' },
//                 { title: 'Transfer', path: '/consumtion/transfer' },
//                 { title: 'Request for Sales Return', path: '/consumtion/request' },
//                 { title: 'Sales Return', path: '/consumtion/sales-return' },
//                 { title: 'Wastage', path: '/consumtion/wastage' },
//                 { title: 'Expired Material', path: '/consumtion/expire' },
//                 { title: 'Closing Stock', path: '/consumtion/closing-stock' }
//             ]
//         },
//         {
//             title: 'Conversion',
//             icon: <FaExchangeAlt />,
//             subItems: [
//                 { title: 'Convert Raw Material', path: '/conversion/raw-material' },
                
//             ]
//         },
//         {
//             title: 'Report',
//             icon: <FaFileAlt />,
//             subItems: [
//                 { title: 'Current Stock', path: '/report/current-report' },
//                 { title: 'Stock Summary', path: '/report/sales' },
//                 { title: 'Consumption', path: '/report/consumption-report' },
//                 { title: 'Opening-Closing', path: '/report/closing-opening-report' },
//                 { title: 'Purchase', path: '/report/purchase-report' },
//                 { title: 'Supplier', path: '/report/supplier-report' },
//                 { title: 'Internal Transfer', path: '/report/internal-report' },
//                 { title: 'Item Wise Internal Transfer', path: '/report/internal-report' },
//                 { title: 'Manual Adjustment Report', path: '/report/internal-report' },
//                 { title: 'Food Casting', path: '/report/internal-report' },
//             ]
//         },
//         { title: 'Units', icon: <FaRuler />, path: '/inventory/units-table' },
//         { title: 'Inventory Settings', icon: <FaCog />, path: '/settings' },
//     ];

//     const toggleSubmenu = (title: string) => {
//         setActiveSubmenu(activeSubmenu === title ? null : title);
//     };

//     return (
//         <div className={`sticky  left-0  max-h-full ${isOpen ? 'w-80' : 'w-20'} bg-white shadow-2xl transition-all duration-300 z-20 overflow-y-auto`}>
//             {/* Toggle Button */}
//             <div className="absolute -right-3 top-4 bg-purple-600 p-2 rounded-full cursor-pointer transform transition-all duration-300 hover:scale-110"
//                 onClick={() => setIsOpen(!isOpen)}>
//                 <FaBars className="text-white w-5 h-5" />
//             </div>

//             {/* Menu */}
//             <ul className="p-4 space-y-1">
//                 {menuItems.map((item) => (
//                     <li key={item.title}>
//                         <div className="flex flex-col">
//                             <Link
//                                 to={item.path || '#'}
//                                 className="flex items-center justify-between p-2 rounded-xl text-gray-700 hover:bg-purple-50 hover:text-purple-600 cursor-pointer transition-all duration-200"
//                                 onClick={() => item.subItems && toggleSubmenu(item.title)}
//                             >
//                                 <div className="flex items-center gap-2">
//                                     <span className="text-xl text-purple-500">{item.icon}</span>
//                                     <span className={`${!isOpen && 'hidden'} font-medium`}>{item.title}</span>
//                                 </div>
//                                 {item.subItems && isOpen && (
//                                     <span className="text-purple-500">
//                                         {activeSubmenu === item.title ? <FaAngleDown /> : <FaAngleRight />}
//                                     </span>
//                                 )}
//                             </Link>

//                             {/* Submenu */}
//                             {item.subItems && isOpen && activeSubmenu === item.title && (
//                                 <ul className="ml-10 space-y-1 mt-1 animate-slideDown">
//                                     {item.subItems.map((subItem) => (
//                                         <li key={subItem.title}>
//                                             <Link
//                                                 to={subItem.path}
//                                                 className="block p-2 text-sm text-gray-600 hover:bg-purple-100 hover:text-purple-600 rounded-lg cursor-pointer transition-all duration-200"
//                                             >
//                                                 {subItem.title}
//                                             </Link>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             )}
//                         </div>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default InventorySidebar;



// import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';

// // Custom SVG Icons
// const Icons = {
//     Menu: () => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 12h18M3 6h18M3 18h18" strokeWidth="2" /></svg>,
//     Home: () => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" strokeWidth="2" /></svg>,
//     Dashboard: () => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>,
//     Flask: () => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M10 2v7.31l-4 4a2 2 0 00-.57 1.41V22h12v-7.28a2 2 0 00-.57-1.41l-4-4V2H10z" strokeWidth="2" /></svg>,
//     Book: () => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 19.5A2.5 2.5 0 016.5 17H20M6.5 2H20v15H6.5a2.5 2.5 0 00-2.5 2.5V4.5A2.5 2.5 0 016.5 2z" strokeWidth="2" /></svg>,
//     Chart: () => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 3v18h18M7 16v-6M12 16v-3M17 16v-9" strokeWidth="2" /></svg>,
//     Users: () => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 3a4 4 0 100 8 4 4 0 000-8zm8 10a4 4 0 110-8 4 4 0 010 8z" strokeWidth="2" /></svg>,
//     Cart: () => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" strokeWidth="2" /></svg>,
//     Utensils: () => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M7 2v11a2 2 0 002 2h6a2 2 0 002-2V2M3 8h4M17 8h4M9 22h6" strokeWidth="2" /></svg>,
//     Exchange: () => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M16 3h5m0 0v5m0-5l-6 6M8 21H3m0 0v-5m0 5l6-6" strokeWidth="2" /></svg>,
//     File: () => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" strokeWidth="2" /></svg>,
//     Ruler: () => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20.7 7l-11 11M3 3h18v18H3V3zM7 7h.01M7 11h.01M7 15h.01M11 7h.01M11 11h.01M11 15h.01M15 7h.01M15 11h.01" strokeWidth="2" /></svg>,
//     Cog: () => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 15a3 3 0 100-6 3 3 0 000 6zm0 0v6m4.24-13.76l1.42 1.42M19.07 4.93l-1.42 1.42M6.34 17.66l-1.42 1.42M4.93 19.07l1.42-1.42" strokeWidth="2" /></svg>,
// };

// // Menu Configuration
// const menuItems = [
//     { id: 'billing', title: 'Back to Billing', icon: 'Home', to: '/orders' },
//     { id: 'dashboard', title: 'Inventory Dashboard', icon: 'Dashboard', to: '/inventory/dashboard' },
//     { id: 'raw-material', title: 'Raw Material', icon: 'Flask', to: '/inventory/raw-materials' },
//     { id: 'recipes', title: 'Item Recipes', icon: 'Book', to: '/recipes-management' },
//     { id: 'closing-stock', title: 'Closing Stock', icon: 'Chart', to: '/inventory/closing-stock' },
//     {
//         id: 'suppliers',
//         title: 'Suppliers',
//         icon: 'Users',
//         children: [
//             { id: 'third-party', title: 'Suppliers/Third Party', to: '/suppliers/third-party' },
//             { id: 'purchase-invoice', title: 'Purchase Invoice Settlement', to: '/suppliers/purchase-invoice' },
//         ],
//     },
//     {
//         id: 'purchase',
//         title: 'Purchase',
//         icon: 'Cart',
//         children: [
//             { id: 'stock-purchase', title: 'Stock Purchase', to: '/purchase/request/stock' },
//             { id: 'request-purchase', title: 'Request For Purchase', to: '/purchase/request' },
//             { id: 'purchase-return', title: 'Purchase Return', to: '/purchase/return' },
//         ],
//     },
//     {
//         id: 'consumption',
//         title: 'Consumption',
//         icon: 'Utensils',
//         children: [
//             { id: 'sales', title: 'Sales', to: '/consumption/sales' },
//             { id: 'transfer', title: 'Transfer', to: '/consumption/transfer' },
//             { id: 'request-sales-return', title: 'Request for Sales Return', to: '/consumption/request' },
//             { id: 'sales-return', title: 'Sales Return', to: '/consumption/sales-return' },
//             { id: 'wastage', title: 'Wastage', to: '/consumption/wastage' },
//             { id: 'expired', title: 'Expired Material', to: '/consumption/expire' },
//             { id: 'closing-stock-consumption', title: 'Closing Stock', to: '/consumption/closing-stock' },
//         ],
//     },
//     {
//         id: 'conversion',
//         title: 'Conversion',
//         icon: 'Exchange',
//         children: [
//             { id: 'convert-raw', title: 'Convert Raw Material', to: '/conversion/raw-material' },
//         ],
//     },
//     {
//         id: 'report',
//         title: 'Report',
//         icon: 'File',
//         children: [
//             { id: 'current-stock', title: 'Current Stock', to: '/report/current-report' },
//             { id: 'stock-summary', title: 'Stock Summary', to: '/report/sales' },
//             { id: 'consumption-report', title: 'Consumption', to: '/report/consumption-report' },
//             { id: 'opening-closing', title: 'Opening-Closing', to: '/report/closing-opening-report' },
//             { id: 'purchase-report', title: 'Purchase', to: '/report/purchase-report' },
//             { id: 'supplier-report', title: 'Supplier', to: '/report/supplier-report' },
//             { id: 'internal-transfer', title: 'Internal Transfer', to: '/report/internal-report' },
//             { id: 'item-wise-transfer', title: 'Item Wise Internal Transfer', to: '/report/internal-report' },
//             { id: 'manual-adjustment', title: 'Manual Adjustment Report', to: '/report/internal-report' },
//             { id: 'food-casting', title: 'Food Casting', to: '/report/internal-report' },
//         ],
//     },
//     { id: 'units', title: 'Units', icon: 'Ruler', to: '/inventory/units-table' },
//     { id: 'settings', title: 'Inventory Settings', icon: 'Cog', to: '/settings' },
// ];

// // Radial Menu Item Component
// const RadialMenuItem = ({ item, isOpen, angle, radius }: { item: any; isOpen: boolean; angle: number; radius: number }) => {
//     const [isHovered, setIsHovered] = useState(false);
//     const Icon = Icons[item.icon];
//     const hasChildren = !!item.children;

//     const x = Math.cos(angle) * radius;
//     const y = Math.sin(angle) * radius;

//     return (
//         <motion.div
//             initial={{ x: 0, y: 0, opacity: 0 }}
//             animate={{ x: isOpen ? x : 0, y: isOpen ? y : 0, opacity: isOpen ? 1 : 0 }}
//             transition={{ duration: 0.3, ease: 'easeOut' }}
//             className="absolute"
//             onHoverStart={() => setIsHovered(true)}
//             onHoverEnd={() => setIsHovered(false)}
//         >
//             <NavLink
//                 to={item.to || '#'}
//                 className={({ isActive }) =>
//                     `flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md ${isActive ? 'ring-2 ring-indigo-500' : 'hover:bg-indigo-50'
//                     } transition-all duration-200`
//                 }
//             >
//                 <Icon />
//             </NavLink>

//             <AnimatePresence>
//                 {(isHovered || !isOpen) && (
//                     <motion.div
//                         initial={{ opacity: 0, scale: 0.8 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         exit={{ opacity: 0, scale: 0.8 }}
//                         className="absolute left-14 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm whitespace-nowrap"
//                     >
//                         {item.title}
//                     </motion.div>
//                 )}
//             </AnimatePresence>

//             {hasChildren && isHovered && isOpen && (
//                 <div className="absolute left-16 top-0">
//                     {item.children.map((child: any, index: number) => (
//                         <motion.div
//                             key={child.id}
//                             initial={{ opacity: 0, y: -10 }}
//                             animate={{ opacity: 1, y: index * 40 }}
//                             className="flex items-center gap-2 mt-2"
//                         >
//                             <NavLink
//                                 to={child.to}
//                                 className={({ isActive }) =>
//                                     `flex items-center gap-2 px-3 py-2 bg-white rounded-lg shadow-md ${isActive ? 'text-indigo-600' : 'text-gray-700'
//                                     } hover:bg-indigo-50`
//                                 }
//                             >
//                                 <span>{child.title}</span>
//                             </NavLink>
//                         </motion.div>
//                     ))}
//                 </div>
//             )}
//         </motion.div>
//     );
// };

// // Main Component
// const InventorySidebar: React.FC = () => {
//     const [isOpen, setIsOpen] = useState(false);

//     return (
//         <div className="fixed left-0 top-0 h-screen w-20 bg-gradient-to-b from-indigo-700 to-indigo-900 z-30 flex items-center justify-center">
//             <div className="relative">
//                 {/* Toggle Button */}
//                 <motion.button
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => setIsOpen(!isOpen)}
//                     className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg"
//                 >
//                     <Icons.Menu />
//                 </motion.button>

//                 {/* Radial Menu */}
//                 <AnimatePresence>
//                     {isOpen && (
//                         <motion.div
//                             initial={{ scale: 0 }}
//                             animate={{ scale: 1 }}
//                             exit={{ scale: 0 }}
//                             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
//                         >
//                             {menuItems.map((item, index) => {
//                                 const angle = (index / menuItems.length) * 2 * Math.PI - Math.PI / 2;
//                                 return (
//                                     <RadialMenuItem
//                                         key={item.id}
//                                         item={item}
//                                         isOpen={isOpen}
//                                         angle={angle}
//                                         radius={100}
//                                     />
//                                 );
//                             })}
//                         </motion.div>
//                     )}
//                 </AnimatePresence>
//             </div>
//         </div>
//     );
// };

// export default InventorySidebar;








import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Chalkboard-Themed Icons
const Icons = {
    ToggleOpen: () => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 12h16M12 4v16" strokeWidth="2" /></svg>,
    ToggleClose: () => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2" /></svg>,
    Billing: () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 3h14v18H5zM8 7h8M8 11h8" strokeWidth="2" /></svg>,
    Dashboard: () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M12 3v18M3 12h18" strokeWidth="2" /></svg>,
    Ingredients: () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 2v20M8 6h8M8 10h4" strokeWidth="2" /></svg>,
    Recipes: () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 4h16v16H4zM8 8h8" strokeWidth="2" /></svg>,
    Stock: () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 3h18v18H3zM7 7h10" strokeWidth="2" /></svg>,
    Suppliers: () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="8" r="4" /><path d="M6 20c0-3 2-6 6-6s6 3 6 6" strokeWidth="2" /></svg>,
    Purchase: () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 3h18l-2 12H5L3 3zm2 14h14" strokeWidth="2" /></svg>,
    Consumption: () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 2v20M8 6h8" strokeWidth="2" /></svg>,
    Conversion: () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 12h16M8 8l-4 4 4 4m8-8l4 4-4 4" strokeWidth="2" /></svg>,
    Report: () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 4h16v16H4zM8 8h8M8 12h4" strokeWidth="2" /></svg>,
    Units: () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 6h18M3 12h18M3 18h18" strokeWidth="2" /></svg>,
    Settings: () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="3" /><path d="M12 6v-3m0 12v3m-6-6h-3m12 0h3" strokeWidth="2" /></svg>,
};

// Menu Configuration (All Items Included)
const menuItems = [
    { id: 'billing', title: 'Back to Billing', icon: 'Billing', to: '/orders' },
    { id: 'dashboard', title: 'Inventory Dashboard', icon: 'Dashboard', to: '/inventory/dashboard' },
    { id: 'raw-material', title: 'Raw Material', icon: 'Ingredients', to: '/inventory/raw-materials' },
    { id: 'recipes', title: 'Item Recipes', icon: 'Recipes', to: '/recipes-management' },
    { id: 'closing-stock', title: 'Closing Stock', icon: 'Stock', to: '/inventory/closing-stock' },
    {
        id: 'suppliers',
        title: 'Suppliers',
        icon: 'Suppliers',
        children: [
            { id: 'third-party', title: 'Suppliers/Third Party', to: '/suppliers/third-party' },
            { id: 'purchase-invoice', title: 'Purchase Invoice Settlement', to: '/suppliers/purchase-invoice' },
        ],
    },
    {
        id: 'purchase',
        title: 'Purchase',
        icon: 'Purchase',
        children: [
            { id: 'stock-purchase', title: 'Stock Purchase', to: '/purchase/request/stock' },
            { id: 'request-purchase', title: 'Request For Purchase', to: '/purchase/request' },
            { id: 'purchase-return', title: 'Purchase Return', to: '/purchase/return' },
        ],
    },
    {
        id: 'consumption',
        title: 'Consumption',
        icon: 'Consumption',
        children: [
            { id: 'sales', title: 'Sales', to: '/consumption/sales' },
            { id: 'transfer', title: 'Transfer', to: '/consumption/transfer' },
            { id: 'request-sales-return', title: 'Request for Sales Return', to: '/consumption/request' },
            { id: 'sales-return', title: 'Sales Return', to: '/consumption/sales-return' },
            { id: 'wastage', title: 'Wastage', to: '/consumption/wastage' },
            { id: 'expired', title: 'Expired Material', to: '/consumption/expire' },
            { id: 'closing-stock-consumption', title: 'Closing Stock', to: '/consumption/closing-stock' },
        ],
    },
    {
        id: 'conversion',
        title: 'Conversion',
        icon: 'Conversion',
        children: [
            { id: 'convert-raw', title: 'Convert Raw Material', to: '/conversion/raw-material' },
        ],
    },
    {
        id: 'report',
        title: 'Report',
        icon: 'Report',
        children: [
            { id: 'current-stock', title: 'Current Stock', to: '/report/current-report' },
            { id: 'stock-summary', title: 'Stock Summary', to: '/report/sales' },
            { id: 'consumption-report', title: 'Consumption', to: '/report/consumption-report' },
            { id: 'opening-closing', title: 'Opening-Closing', to: '/report/closing-opening-report' },
            { id: 'purchase-report', title: 'Purchase', to: '/report/purchase-report' },
            { id: 'supplier-report', title: 'Supplier', to: '/report/supplier-report' },
            { id: 'internal-transfer', title: 'Internal Transfer', to: '/report/internal-report' },
            { id: 'item-wise-transfer', title: 'Item Wise Internal Transfer', to: '/report/internal-report' },
            { id: 'manual-adjustment', title: 'Manual Adjustment Report', to: '/report/internal-report' },
            { id: 'food-casting', title: 'Food Casting', to: '/report/internal-report' },
        ],
    },
    { id: 'units', title: 'Units', icon: 'Units', to: '/inventory/units-table' },
    { id: 'settings', title: 'Inventory Settings', icon: 'Settings', to: '/settings' },
];

// Menu Item Component
const MenuItem = ({ item }: { item: any }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const Icon = Icons[item.icon];

    return (
        <li className="relative">
            <NavLink
                to={item.to || '#'}
                onClick={() => item.children && setIsExpanded(!isExpanded)}
                className={({ isActive }) =>
                    `flex items-center justify-between p-3 rounded-lg bg-opacity-10 bg-white ${isActive ? 'text-yellow-300 font-bold' : 'text-white hover:text-yellow-200'
                    } transition-all duration-300`}
            >
                <div className="flex items-center gap-3">
                    <Icon />
                    <span className="text-sm font-handwritten">{item.title}</span>
                </div>
                {item.children && (
                    <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M6 9l6 6 6-6" strokeWidth="2" /></svg>
                    </motion.div>
                )}
            </NavLink>

            <AnimatePresence>
                {item.children && isExpanded && (
                    <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="ml-8 mt-2 space-y-2"
                    >
                        {item.children.map((child: any) => (
                            <li key={child.id}>
                                <NavLink
                                    to={child.to}
                                    className={({ isActive }) =>
                                        `block p-2 text-sm rounded-lg bg-opacity-10 bg-white ${isActive ? 'text-yellow-300 font-bold' : 'text-white hover:text-yellow-200'
                                        } transition-all duration-200 font-handwritten`}
                                >
                                    {child.title}
                                </NavLink>
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </li>
    );
};

// Main Component
const RestaurantInventoryNav: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative z-20">
            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-[70px] left-4 p-2 bg-yellow-500 text-black rounded-full shadow-lg z-30"
            >
                {isOpen ? <Icons.ToggleClose /> : <Icons.ToggleOpen />}
            </motion.button>

            {/* Sliding Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ y: '-100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '-100%' }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                        className="fixed top-[60px] left-0 w-full bg-black bg-opacity-90 text-white p-6 shadow-lg border-b border-yellow-500 overflow-y-auto max-h-[calc(100vh-60px)]"
                        style={{ backgroundImage: 'url(/chalkboard-texture.jpg)', backgroundSize: 'cover' }} // Optional: Add a chalkboard texture image
                    >
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-2xl font-handwritten text-yellow-300 mb-6">Inventory Menu</h2>
                            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {menuItems.map((item) => (
                                    <MenuItem key={item.id} item={item} />
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};



export default RestaurantInventoryNav;