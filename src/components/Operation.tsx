import React from 'react';
import { Link } from 'react-router-dom';
import {
    FaBox,
    FaCashRegister,
    FaClipboardList,
    FaComments,
    FaCreditCard,
    FaDesktop,
    FaDollarSign,
    FaFileInvoiceDollar,
    FaGlobe,
    FaHeadset,
    FaHistory,
    FaHome,
    FaLanguage,
    FaMoneyBillWave,
    FaMotorcycle,
    FaQuestionCircle,
    FaShoppingCart,
    FaStore,
    FaSync,
    FaTable,
    FaTv,
    FaUser,
    FaUsers,
    FaWallet,
} from 'react-icons/fa';

interface OperationCardProps {
    icon: React.ReactNode;
    title: string;
    path: string;
}

const OperationCard: React.FC<OperationCardProps> = ({ icon, title, path }) => (
    <Link
        to={path}
        className="bg-white p-3 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-teal-500 flex flex-col items-center justify-center h-24 w-28 hover:bg-teal-50 group"
    >
        <div className="text-3xl text-teal-600 mb-2 group-hover:text-teal-800 transition-colors">
            {icon}
        </div>
        <h3 className="text-xs font-medium text-gray-700 group-hover:text-teal-800 text-center transition-colors">
            {title}
        </h3>
    </Link>
);

const Operation: React.FC = () => {
    const operationsItems = [
        { icon: <FaShoppingCart />, title: 'Orders', path: '/operations/orders' },
        { icon: <FaGlobe />, title: 'Online Orders', path: '/operations/online-orders' },
        { icon: <FaClipboardList />, title: 'KOTs', path: '/operations/kots' },
        { icon: <FaUsers />, title: 'Customers', path: '/operations/customers' },
        { icon: <FaMoneyBillWave />, title: 'Cash Flow', path: '/operations/cash-flow' },
        { icon: <FaFileInvoiceDollar />, title: 'Expense', path: '/operations/expense' },
        { icon: <FaCreditCard />, title: 'Withdrawal', path: '/operations/withdrawal' },
        { icon: <FaCashRegister />, title: 'Cash Top-up', path: '/operations/cash-topup' },
        { icon: <FaBox />, title: 'Inventory', path: '/operations/inventory' },
        { icon: <FaComments />, title: 'Notification', path: '/operations/notifications' },
        { icon: <FaTable />, title: 'Table', path: '/operations/tables' },
        { icon: <FaWallet />, title: 'Virtual Wallet', path: '/operations/virtual-wallet' },
        { icon: <FaSync />, title: 'Manual Sync', path: '/operations/manual-sync' },
        { icon: <FaHeadset />, title: 'Help', path: '/operations/help' },
        { icon: <FaDesktop />, title: 'Live View', path: '/operations/live-view' },
        { icon: <FaDollarSign />, title: 'Due Payment', path: '/operations/due-payment' },
        { icon: <FaLanguage />, title: 'Language Profile', path: '/operations/language-profile' },
        { icon: <FaUser />, title: 'Billing User Profile', path: '/operations/billing-profile' },
        { icon: <FaMoneyBillWave />, title: 'Currency Conversion', path: '/operations/currency-conversion' },
        { icon: <FaHome />, title: 'Table Reservation', path: '/operations/table-reservation' },
        { icon: <FaHistory />, title: 'Day End History', path: '/operations/day-end-history' },
        { icon: <FaComments />, title: 'Feedback', path: '/operations/feedback' },
        { icon: <FaMotorcycle />, title: 'Delivery Boys', path: '/operations/delivery-boys' },
        { icon: <FaTv />, title: 'LED Display', path: '/operations/led-display' },
    ];

    return (
        <div className="min-h-screen bg-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center ">
                <FaStore className="text-teal-600" /> Operations
            </h2>
            <div className="grid grid-cols-8 gap-4">
                {operationsItems.map((item, index) => (
                    <OperationCard
                        key={index}
                        icon={item.icon}
                        title={item.title}
                        path={item.path}
                    />
                ))}
            </div>
        </div>
    );
};

export default Operation;




// import React from 'react';
// import { Link } from 'react-router-dom';
// import {
//     FaBox,
//     FaCashRegister,
//     FaClipboardList,
//     FaComments,
//     FaCreditCard,
//     FaDesktop,
//     FaDollarSign,
//     FaFileInvoiceDollar,
//     FaGlobe,
//     FaHeadset,
//     FaHistory,
//     FaHome,
//     FaLanguage,
//     FaMoneyBillWave,
//     FaMotorcycle,
//     FaQuestionCircle,
//     FaShoppingCart,
//     FaStore,
//     FaSync,
//     FaTable,
//     FaTv,
//     FaUser,
//     FaUsers,
//     FaWallet,
// } from 'react-icons/fa';

// interface OperationCardProps {
//     icon: React.ReactNode;
//     title: string;
//     path: string;
// }

// const OperationCard: React.FC<OperationCardProps> = ({ icon, title, path }) => (
//     <Link
//         to={path}
//         className="relative flex flex-col items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-white to-gray-50 shadow-md hover:shadow-xl transition-all duration-300 group overflow-hidden"
//     >
//         {/* Radial hover effect */}
//         <div className="absolute inset-0 bg-teal-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 radial-gradient" />

//         {/* Icon */}
//         <div className="text-2xl text-teal-600 group-hover:text-teal-800 transition-colors z-10">
//             {icon}
//         </div>

//         {/* Title - Hidden by default, appears on hover */}
//         <div className="absolute bottom-0 w-full bg-teal-800 bg-opacity-75 text-white text-xs font-medium text-center py-1 opacity-0 group-hover:opacity-100 transform translate-y-full group-hover:translate-y-0 transition-all duration-300 z-10">
//             {title}
//         </div>
//     </Link>
// );

// const Operation: React.FC = () => {
//     const operationsItems = [
//         { icon: <FaShoppingCart />, title: 'Orders', path: '/operations/orders' },
//         { icon: <FaGlobe />, title: 'Online Orders', path: '/operations/online-orders' },
//         { icon: <FaClipboardList />, title: 'KOTs', path: '/operations/kots' },
//         { icon: <FaUsers />, title: 'Customers', path: '/operations/customers' },
//         { icon: <FaMoneyBillWave />, title: 'Cash Flow', path: '/operations/cash-flow' },
//         { icon: <FaFileInvoiceDollar />, title: 'Expense', path: '/operations/expense' },
//         { icon: <FaCreditCard />, title: 'Withdrawal', path: '/operations/withdrawal' },
//         { icon: <FaCashRegister />, title: 'Cash Top-up', path: '/operations/cash-topup' },
//         { icon: <FaBox />, title: 'Inventory', path: '/operations/inventory' },
//         { icon: <FaComments />, title: 'Notification', path: '/operations/notifications' },
//         { icon: <FaTable />, title: 'Table', path: '/operations/tables' },
//         { icon: <FaWallet />, title: 'Virtual Wallet', path: '/operations/virtual-wallet' },
//         { icon: <FaSync />, title: 'Manual Sync', path: '/operations/manual-sync' },
//         { icon: <FaHeadset />, title: 'Help', path: '/operations/help' },
//         { icon: <FaDesktop />, title: 'Live View', path: '/operations/live-view' },
//         { icon: <FaDollarSign />, title: 'Due Payment', path: '/operations/due-payment' },
//         { icon: <FaLanguage />, title: 'Language Profile', path: '/operations/language-profile' },
//         { icon: <FaUser />, title: 'Billing User Profile', path: '/operations/billing-profile' },
//         { icon: <FaMoneyBillWave />, title: 'Currency Conversion', path: '/operations/currency-conversion' },
//         { icon: <FaHome />, title: 'Table Reservation', path: '/operations/table-reservation' },
//         { icon: <FaHistory />, title: 'Day End History', path: '/operations/day-end-history' },
//         { icon: <FaComments />, title: 'Feedback', path: '/operations/feedback' },
//         { icon: <FaMotorcycle />, title: 'Delivery Boys', path: '/operations/delivery-boys' },
//         { icon: <FaTv />, title: 'LED Display', path: '/operations/led-display' },
//     ];

//     return (
//         <div className="min-h-screen bg-gray-200 p-8">
//             <h2 className="text-3xl font-bold text-gray-800 mb-10 flex items-center gap-3">
//                 <FaStore className="text-teal-600" /> Operations Dashboard
//             </h2>
//             <div className="flex flex-wrap gap-6 justify-center">
//                 {operationsItems.map((item, index) => (
//                     <OperationCard
//                         key={index}
//                         icon={item.icon}
//                         title={item.title}
//                         path={item.path}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Operation;




// import React from 'react';
// import { Link } from 'react-router-dom';
// import {
//     FaBox,
//     FaCashRegister,
//     FaClipboardList,
//     FaComments,
//     FaCreditCard,
//     FaDesktop,
//     FaDollarSign,
//     FaFileInvoiceDollar,
//     FaGlobe,
//     FaHeadset,
//     FaHistory,
//     FaHome,
//     FaLanguage,
//     FaMoneyBillWave,
//     FaMotorcycle,
//     FaQuestionCircle,
//     FaShoppingCart,
//     FaStore,
//     FaSync,
//     FaTable,
//     FaTv,
//     FaUser,
//     FaUsers,
//     FaWallet,
// } from 'react-icons/fa';

// interface OperationCardProps {
//     icon: React.ReactNode;
//     title: string;
//     path: string;
//     gradient: string;
//     index: number;
// }

// const OperationCard: React.FC<OperationCardProps> = ({ icon, title, path, gradient, index }) => (
//     <Link
//         to={path}
//         className={`relative w-48 h-32 rounded-2xl shadow-lg backdrop-blur-md bg-opacity-80 border border-white border-opacity-20 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl group`}
//         style={{
//             background: `linear-gradient(135deg, ${gradient})`,
//             animation: `float 4s ease-in-out infinite`,
//             animationDelay: `${index * 0.2}s`, // Staggered animation
//         }}
//     >
//         {/* Glass overlay */}
//         <div className="absolute inset-0 bg-white bg-opacity-10 rounded-2xl" />

//         {/* Content */}
//         <div className="relative z-10 flex items-center justify-start h-full p-4">
//             <div className="text-4xl text-white mr-4 drop-shadow-md">{icon}</div>
//             <div className="text-white font-semibold text-base drop-shadow-md">{title}</div>
//         </div>

//         {/* Hover shine effect */}
//         <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300 bg-gradient-to-r from-white to-transparent rounded-2xl" />
//     </Link>
// );

// const Operation: React.FC = () => {
//     const operationsItems = [
//         { icon: <FaShoppingCart />, title: 'Orders', path: '/operations/orders', gradient: '#FF6B6B, #FF8E53' },
//         { icon: <FaGlobe />, title: 'Online Orders', path: '/operations/online-orders', gradient: '#4ECDC4, #45B7D1' },
//         { icon: <FaClipboardList />, title: 'KOTs', path: '/operations/kots', gradient: '#96CEB4, #CEEAD6' },
//         { icon: <FaUsers />, title: 'Customers', path: '/operations/customers', gradient: '#FFB6C1, #FF69B4' },
//         { icon: <FaMoneyBillWave />, title: 'Cash Flow', path: '/operations/cash-flow', gradient: '#FFD700, #FFA500' },
//         { icon: <FaFileInvoiceDollar />, title: 'Expense', path: '/operations/expense', gradient: '#FF4500, #FF6347' },
//         { icon: <FaCreditCard />, title: 'Withdrawal', path: '/operations/withdrawal', gradient: '#8A2BE2, #DDA0DD' },
//         { icon: <FaCashRegister />, title: 'Cash Top-up', path: '/operations/cash-topup', gradient: '#32CD32, #9ACD32' },
//         { icon: <FaBox />, title: 'Inventory', path: '/operations/inventory', gradient: '#4682B4, #87CEEB' },
//         { icon: <FaComments />, title: 'Notification', path: '/operations/notifications', gradient: '#FF1493, #C71585' },
//         { icon: <FaTable />, title: 'Table', path: '/operations/tables', gradient: '#20B2AA, #48D1CC' },
//         { icon: <FaWallet />, title: 'Virtual Wallet', path: '/operations/virtual-wallet', gradient: '#BA55D3, #9370DB' },
//         { icon: <FaSync />, title: 'Manual Sync', path: '/operations/manual-sync', gradient: '#00CED1, #00B7EB' },
//         { icon: <FaHeadset />, title: 'Help', path: '/operations/help', gradient: '#FF00FF, #DA70D6' },
//         { icon: <FaDesktop />, title: 'Live View', path: '/operations/live-view', gradient: '#1E90FF, #4169E1' },
//         { icon: <FaDollarSign />, title: 'Due Payment', path: '/operations/due-payment', gradient: '#FFDAB9, #FFA07A' },
//         { icon: <FaLanguage />, title: 'Language Profile', path: '/operations/language-profile', gradient: '#ADFF2F, #7CFC00' },
//         { icon: <FaUser />, title: 'Billing User Profile', path: '/operations/billing-profile', gradient: '#DAA520, #F4A460' },
//         { icon: <FaMoneyBillWave />, title: 'Currency Conversion', path: '/operations/currency-conversion', gradient: '#FF6347, #FF4500' },
//         { icon: <FaHome />, title: 'Table Reservation', path: '/operations/table-reservation', gradient: '#98FB98, #00FA9A' },
//         { icon: <FaHistory />, title: 'Day End History', path: '/operations/day-end-history', gradient: '#B0C4DE, #778899' },
//         { icon: <FaComments />, title: 'Feedback', path: '/operations/feedback', gradient: '#FF69B4, #FFB6C1' },
//         { icon: <FaMotorcycle />, title: 'Delivery Boys', path: '/operations/delivery-boys', gradient: '#FFA500, #FF8C00' },
//         { icon: <FaTv />, title: 'LED Display', path: '/operations/led-display', gradient: '#00BFFF, #1E90FF' },
//     ];

//     return (
//         <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-8">
//             <h2 className="text-4xl font-extrabold text-white mb-12 flex items-center gap-4 tracking-wide drop-shadow-lg">
//                 <FaStore className="text-teal-400" /> Operations Universe
//             </h2>
//             <div className="flex flex-wrap gap-6 justify-center max-w-7xl mx-auto">
//                 {operationsItems.map((item, index) => (
//                     <OperationCard
//                         key={index}
//                         icon={item.icon}
//                         title={item.title}
//                         path={item.path}
//                         gradient={item.gradient}
//                         index={index}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Operation;