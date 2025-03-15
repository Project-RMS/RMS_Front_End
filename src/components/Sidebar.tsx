











// // import { ChefHat, Users, ClipboardList, Settings, BarChart3, LogOut, X } from 'lucide-react';
// import { ChefHat, Users, ClipboardList, Settings, BarChart3, LogOut, X, Clock } from 'lucide-react';
// import { Link, useLocation } from 'react-router-dom';

// interface SidebarProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
//   const location = useLocation(); // Get the current route

//   const handleItemClick = (label: string) => {
//     // Don't close the sidebar when clicking on Inventory
//     if (label === 'Inventory') {
//       return;
//     }
//     // Close for all other menu items
//     onClose();
//   };
 
//   const menuItems = [
//     { icon: BarChart3, label: 'Table Management', path: '/' }, // Already good - BarChart3 fits analytics/management
//     { icon: ClipboardList, label: 'Menus', path: '/orders' }, // Already good - ClipboardList fits for menu lists
//     { icon: ChefHat, label: 'Operations', path: '/operation' }, // Already good - ChefHat fits kitchen operations
//     { icon: BarChart3, label: 'Reports', path: '/reports' }, // Changed to BarChart3 for reporting/analytics
//     { icon: BarChart3, label: 'Inventory', path: '/inventory' }, // Changed to BarChart3 for reporting/inventory
//     { icon: Clock, label: 'Day End', path: '/datend' }, // Changed to Clock as it relates to time/day ending
//     { icon: Users, label: 'Staff', path: '/staff' }, // Already good - Users fits for staff management
//     { icon: Settings, label: 'Settings', path: '/settings' }, // Already good - Settings is perfect
//     { icon: LogOut, label: 'Logout', path: '/logout' }, // Changed to LogOut to match the logout action
//   ];

//   return (
//     <>
//       {/* Overlay */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-20"
//           // onClick={onClose}
//           onClick={() => handleItemClick(item.label)}
//         ></div>
//       )}

//       {/* Sidebar */}
//       <div
//         className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg border-r border-gray-200 transform transition-transform duration-300 ease-in-out z-30 ${
//           isOpen ? 'translate-x-0' : '-translate-x-full'
//         }`}
//       >
//         <div className="flex items-center justify-between p-4 border-b border-gray-200">
//           <div className="flex items-center gap-3">
//             <ChefHat className="h-8 w-8 text-blue-600" />
//             <h1 className="text-xl font-bold">RMS Dashboard</h1>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
//             aria-label="Close Menu"
//           >
//             <X className="h-6 w-6" />
//           </button>
//         </div>

//         <nav className="space-y-2">
//           {menuItems.map((item) => (
//             <Link
//               key={item.label}
//               to={item.path}
//               onClick={onClose} // Close sidebar on click (mobile)
//               className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg transition-colors ${location.pathname === item.path
//                   ? 'bg-blue-50 text-blue-700'
//                   : 'text-gray-700 hover:bg-gray-100'
//                 }`}
//             >
//               <item.icon className="h-5 w-5" />
//               <span>{item.label}</span>
//             </Link>
//           ))}
//         </nav>

//         <Link
//           to="/login" // Adjust this to your logout route or handle logout logic
//           onClick={onClose}
//           className="flex items-center gap-3 w-full px-3 py-2 text-red-600 rounded-lg hover:bg-red-50 transition-colors mt-auto absolute bottom-8"
//         >
//           <LogOut className="h-5 w-5" />
//           <span>Logout</span>
//         </Link>
//       </div>
//     </>
//   );
// };

// export default Sidebar;




import {
  LayoutDashboard,
  MenuSquare,
  Utensils,
  BarChart2,
  Package,
  Clock,
  UsersRound,
  Settings,
  LogOut,
  X
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();

  const handleItemClick = (label: string) => {
    if (label === 'Inventory') return;
    onClose();
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Table Layout', path: '/' }, // Renamed for restaurant feel
    { icon: MenuSquare, label: 'Menu Cards', path: '/orders' }, // More dining-specific
    { icon: Utensils, label: 'Kitchen Ops', path: '/operation' }, // Dining utensils for kitchen
    { icon: BarChart2, label: 'Sales Reports', path: '/reports' }, // Restaurant-specific reporting
    { icon: Package, label: 'Stock Room', path: '/inventory' }, // Thematic rename
    { icon: Clock, label: 'Close Shift', path: '/dayend' }, // Restaurant shift term
    { icon: UsersRound, label: 'Crew', path: '/staff' }, // Warmer term than "Staff"
    { icon: Settings, label: 'Preferences', path: '/settings' }, // Softer term
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-amber-900 bg-opacity-70 z-20 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-72 bg-gradient-to-b from-amber-50 via-white to-amber-50 shadow-xl border-r border-amber-100 transform transition-transform duration-300 ease-in-out z-30 ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-amber-200 bg-amber-100/50">
          <div className="flex items-center gap-3">
            <Utensils className="h-9 w-9 text-amber-700 animate-spin-slow" />
            <h1 className="text-2xl font-serif text-amber-900 tracking-wide">
              Savor RMS
            </h1>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-amber-200/50 text-amber-700 hover:text-amber-900 transition-all duration-200"
            aria-label="Close Menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-5 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              onClick={() => handleItemClick(item.label)}
              className={`flex items-center gap-4 w-full px-4 py-3 rounded-lg transition-all duration-300 group ${location.pathname === item.path
                  ? 'bg-amber-600 text-white shadow-lg'
                  : 'text-amber-800 hover:bg-amber-100 hover:text-amber-900'
                }`}
            >
              <item.icon
                className={`h-6 w-6 ${location.pathname === item.path
                    ? 'text-white'
                    : 'text-amber-600 group-hover:text-amber-900'
                  } transition-colors duration-200`}
              />
              <span className="font-medium text-base tracking-tight">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-8 w-full px-5">
          <Link
            to="/logout"
            onClick={onClose}
            className="flex items-center gap-4 w-full px-4 py-3 text-red-700 rounded-lg hover:bg-red-100 hover:text-red-800 transition-all duration-300 group"
          >
            <LogOut className="h-6 w-6 text-red-700 group-hover:text-red-800 transition-colors duration-200" />
            <span className="font-medium text-base tracking-tight">Sign Out</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

// Add this to your global CSS or a stylesheet
