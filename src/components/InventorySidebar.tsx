// // components/InventorySidebar.tsx
import React, { useState } from 'react';
import {
    FaBars,
    FaShoppingBag,
    FaHome,
    FaBoxes,
    FaFlask,
    FaBook,
    FaChartBar,
    FaUsers,
    FaShoppingCart,
    FaUtensils,
    FaExchangeAlt,
    FaFileAlt,
    FaRuler,
    FaCog,
    FaAngleDown,
    FaAngleRight
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface MenuItem {
    title: string;
    icon: JSX.Element;
    path?: string;
    subItems?: { title: string; path: string }[];
}

const InventorySidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
    const navigate = useNavigate();

    const menuItems: MenuItem[] = [
        // { title: 'Back to Order', icon: <FaShoppingBag />, path: '/order' },
        { title: 'Back to Billing', icon: <FaHome />, path: '/orders' },
        { title: 'Inventory Dashboard', icon: <FaBoxes />, path: '/inventory' },
        { title: 'Raw Material', icon: <FaFlask />, path: '/raw-material' },
        { title: 'Item Recipes', icon: <FaBook />, path: '/recipes' },
        { title: 'Closing Stock', icon: <FaChartBar />, path: '/closing-stock' },
        {
            title: 'Suppliers',
            icon: <FaUsers />,
            subItems: [
                { title: 'Add Supplier', path: '/suppliers/add' },
                { title: 'View Suppliers', path: '/suppliers/view' },
                { title: 'Supplier Details', path: '/suppliers/details' }
            ]
        },
        {
            title: 'Purchase',
            icon: <FaShoppingCart />,
            subItems: [
                { title: 'New Purchase', path: '/purchase/new' },
                { title: 'Purchase History', path: '/purchase/history' },
                { title: 'Pending Orders', path: '/purchase/pending' }
            ]
        },
        {
            title: 'Consumption',
            icon: <FaUtensils />,
            subItems: [
                { title: 'Daily Consumption', path: '/consumption/daily' },
                { title: 'Weekly Report', path: '/consumption/weekly' },
                { title: 'Trends', path: '/consumption/trends' }
            ]
        },
        {
            title: 'Conversion',
            icon: <FaExchangeAlt />,
            subItems: [
                { title: 'Convert Items', path: '/conversion/convert' },
                { title: 'History', path: '/conversion/history' },
                { title: 'Rates', path: '/conversion/rates' }
            ]
        },
        {
            title: 'Report',
            icon: <FaFileAlt />,
            subItems: [
                { title: 'Stock Report', path: '/report/stock' },
                { title: 'Sales Report', path: '/report/sales' },
                { title: 'Monthly Summary', path: '/report/monthly' }
            ]
        },
        { title: 'Units', icon: <FaRuler />, path: '/units' },
        { title: 'Inventory Settings', icon: <FaCog />, path: '/settings' },
    ];

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    const toggleSubmenu = (title: string) => {
        setActiveSubmenu(activeSubmenu === title ? null : title);
    };

    return (
        <div className={`h-screen ${isOpen ? 'w-80' : 'w-20'} bg-white shadow-2xl transition-all duration-300 relative overflow-y-auto`}>
            {/* Toggle Button */}
            <div className="absolute -right-3 top-4 bg-purple-600 p-2 rounded-full cursor-pointer transform transition-all duration-300 hover:scale-110"
                onClick={() => setIsOpen(!isOpen)}>
                <FaBars className="text-white w-5 h-5" />
            </div>

           

            {/* Menu */}
            <ul className="p-4 space-y-1">
                {menuItems.map((item) => (
                    <li key={item.title}>
                        <div
                            className="flex items-center justify-between p-2 rounded-xl text-gray-700 hover:bg-purple-50 hover:text-purple-600 cursor-pointer transition-all duration-200"
                            onClick={() => {
                                if (item.subItems) toggleSubmenu(item.title);
                                if (item.path) handleNavigation(item.path);
                            }}
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-xl text-purple-500">{item.icon}</span>
                                <span className={`${!isOpen && 'hidden'} font-medium`}>{item.title}</span>
                            </div>
                            {item.subItems && isOpen && (
                                <span className="text-purple-500">
                                    {activeSubmenu === item.title ? <FaAngleDown /> : <FaAngleRight />}
                                </span>
                            )}
                        </div>

                        {/* Submenu */}
                        {item.subItems && isOpen && activeSubmenu === item.title && (
                            <ul className="ml-10 space-y-1 mt-1 animate-slideDown">
                                {item.subItems.map((subItem) => (
                                    <li
                                        key={subItem.title}
                                        className="p-2 text-sm text-gray-600 hover:bg-purple-100 hover:text-purple-600 rounded-lg cursor-pointer transition-all duration-200"
                                        onClick={() => handleNavigation(subItem.path)}
                                    >
                                        {subItem.title}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InventorySidebar;




// components/Sidebar.tsx
// import React, { useState } from 'react';
// import {
//     FaTimes,
//     FaShoppingBag,
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
//     FaChevronDown,
//     FaChevronUp
// } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';

// interface MenuItem {
//     title: string;
//     icon: JSX.Element;
//     path?: string;
//     subItems?: { title: string; path: string }[];
// }

// const InventorySidebar: React.FC = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
//     const navigate = useNavigate();

//     const menuItems: MenuItem[] = [
//         { title: 'Back to Order', icon: <FaShoppingBag />, path: '/orders' },
//         { title: 'Inventory Dashboard', icon: <FaBoxes />, path: '/inventory' },
//         { title: 'Raw Material', icon: <FaFlask />, path: '/raw-material' },
//         { title: 'Item Recipes', icon: <FaBook />, path: '/recipes' },
//         { title: 'Closing Stock', icon: <FaChartBar />, path: '/closing-stock' },
//         {
//             title: 'Suppliers',
//             icon: <FaUsers />,
//             subItems: [
//                 { title: 'Add Supplier', path: '/suppliers/add' },
//                 { title: 'View Suppliers', path: '/suppliers/view' },
//                 { title: 'Supplier Details', path: '/suppliers/details' }
//             ]
//         },
//         {
//             title: 'Purchase',
//             icon: <FaShoppingCart />,
//             subItems: [
//                 { title: 'New Purchase', path: '/purchase/new' },
//                 { title: 'Purchase History', path: '/purchase/history' },
//                 { title: 'Pending Orders', path: '/purchase/pending' }
//             ]
//         },
//         {
//             title: 'Consumption',
//             icon: <FaUtensils />,
//             subItems: [
//                 { title: 'Daily Consumption', path: '/consumption/daily' },
//                 { title: 'Weekly Report', path: '/consumption/weekly' },
//                 { title: 'Trends', path: '/consumption/trends' }
//             ]
//         },
//         {
//             title: 'Conversion',
//             icon: <FaExchangeAlt />,
//             subItems: [
//                 { title: 'Convert Items', path: '/conversion/convert' },
//                 { title: 'History', path: '/conversion/history' },
//                 { title: 'Rates', path: '/conversion/rates' }
//             ]
//         },
//         {
//             title: 'Report',
//             icon: <FaFileAlt />,
//             subItems: [
//                 { title: 'Stock Report', path: '/report/stock' },
//                 { title: 'Sales Report', path: '/report/sales' },
//                 { title: 'Monthly Summary', path: '/report/monthly' }
//             ]
//         },
//         { title: 'Units', icon: <FaRuler />, path: '/units' },
//         { title: 'Inventory Settings', icon: <FaCog />, path: '/settings' },
//     ];

//     const handleNavigation = (path: string) => {
//         navigate(path);
//         setIsOpen(false); // Close Inventorysidebar after navigation
//     };

//     const toggleSubmenu = (title: string) => {
//         setActiveSubmenu(activeSubmenu === title ? null : title);
//     };

//     return (
//         <div className="relative">
//             {/* Toggle Button */}
//             <div
//                 className="fixed top-6 left-6 z-50 bg-gradient-to-r from-blue-500 to-blue-600 p-2 rounded-lg cursor-pointer hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
//                 onClick={() => setIsOpen(!isOpen)}
//             >
//                 <FaTimes className={`text-white w-5 h-5 transform transition-transform duration-300 ${isOpen ? 'rotate-0' : 'rotate-45'}`} />
//             </div>

//             {/* InventorySidebar */}
//             <div
//                 className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
//                     } z-40`}
//             >
//                 {/* Header */}
//                 <div className="p-6 pt-20">
//                     <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
//                         <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">I</span>
//                         Inventory
//                     </h1>
//                 </div>

//                 {/* Menu */}
//                 <ul className="px-4 space-y-1">
//                     {menuItems.map((item) => (
//                         <li key={item.title}>
//                             <div
//                                 className="flex items-center justify-between p-3 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-all duration-200"
//                                 onClick={() => {
//                                     if (item.subItems) toggleSubmenu(item.title);
//                                     if (item.path) handleNavigation(item.path);
//                                 }}
//                             >
//                                 <div className="flex items-center gap-3">
//                                     <span className="text-lg text-blue-500">{item.icon}</span>
//                                     <span className="text-sm font-medium">{item.title}</span>
//                                 </div>
//                                 {item.subItems && (
//                                     <span className="text-blue-500">
//                                         {activeSubmenu === item.title ? <FaChevronUp /> : <FaChevronDown />}
//                                     </span>
//                                 )}
//                             </div>

//                             {/* Submenu */}
//                             {item.subItems && activeSubmenu === item.title && (
//                                 <ul className="ml-6 space-y-1 mt-1 animate-fadeIn">
//                                     {item.subItems.map((subItem) => (
//                                         <li
//                                             key={subItem.title}
//                                             className="p-2 text-sm text-gray-600 hover:bg-blue-100 hover:text-blue-600 rounded-md cursor-pointer transition-all duration-200"
//                                             onClick={() => handleNavigation(subItem.path)}
//                                         >
//                                             {subItem.title}
//                                         </li>
//                                     ))}
//                                 </ul>
//                             )}
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// };

// export default InventorySidebar;