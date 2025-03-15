




// import {
//   Menu,
//   Search,
//   LogOut,
//   UserCircle,
//   LayoutDashboard,
//   BellRing,
//   Clock,
//   Home,
//   Coffee
// } from 'lucide-react';
// import { Link } from 'react-router-dom';

// interface TopBarProps {
//   onMenuClick: () => void;
// }

// const TopBar = ({ onMenuClick }: TopBarProps) => {
//   return (
//     <header className="bg-white border-b border-gray-200 px-4 py-3">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-4">
//           <button
//             onClick={onMenuClick}
//             className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
//             aria-label="Toggle Menu"
//           >
//             <Menu className="h-8 w-8" />
//           </button>
//           <div className="relative hidden sm:block">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search..."
//               className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
//             />
//           </div>
//         </div>

//         <div className="flex items-center gap-4">
//           <Link to="/dashboard" className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100">
//             <LayoutDashboard className="h-6 w-6" />
//           </Link>

//           <Link to="/home" className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100">
//             <Home className="h-6 w-6" />
//           </Link>

//           <Link to="/timer" className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100">
//             <Clock className="h-6 w-6" />
//           </Link>

//           <Link to="/coffee" className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100">
//             <Coffee className="h-6 w-6" />
//           </Link>

//           <button className="relative text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100">
//             <BellRing className="h-6 w-6" />
//             <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
//               3
//             </span>
//           </button>

//           <div className="flex items-center gap-4">
//             <Link to="/profile" className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100">
//               <UserCircle className="h-6 w-6" />
//             </Link>

//             <Link to="/logout" className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100">
//               <LogOut className="h-6 w-6" />
//             </Link>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default TopBar;




// import {
//   Menu,
//   Search,
//   LogOut,
//   UserCircle,
//   LayoutDashboard,
//   BellRing,
//   Clock,
//   Home,
//   Coffee,
//   Plus // Added Plus icon for "New Order"
// } from 'lucide-react';
// import { Link } from 'react-router-dom';

// interface TopBarProps {
//   onMenuClick: () => void;
// }

// const TopBar = ({ onMenuClick }: TopBarProps) => {
//   return (
//     <header className="bg-white border-b border-gray-200 px-4 py-3">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-4">
//           <button
//             onClick={onMenuClick}
//             className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
//             aria-label="Toggle Menu"
//           >
//             <Menu className="h-8 w-8" />
//           </button>
//           <div className="relative hidden sm:block">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search..."
//               className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
//             />
//           </div>
//           {/* Added New Order Link */}
//           <Link
//             to="/"
//             className="text-gray-700 hover:text-white p-2 rounded-lg hover:bg-green-600 flex items-center gap-2 transition-colors"
//             title="New Order"
//           >
//             <Plus className="h-6 w-6" />
//             <span className="hidden md:inline text-sm font-medium">New Order</span>
//           </Link>
//         </div>

//         <div className="flex items-center gap-4">
//           <Link to="/dashboard" className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100">
//             <LayoutDashboard className="h-6 w-6" />
//           </Link>

//           <Link to="/home" className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100">
//             <Home className="h-6 w-6" />
//           </Link>

//           <Link to="/timer" className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100">
//             <Clock className="h-6 w-6" />
//           </Link>

//           <Link to="/coffee" className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100">
//             <Coffee className="h-6 w-6" />
//           </Link>

//           <button className="relative text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100">
//             <BellRing className="h-6 w-6" />
//             <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
//               3
//             </span>
//           </button>

//           <div className="flex items-center gap-4">
//             <Link to="/profile" className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100">
//               <UserCircle className="h-6 w-6" />
//             </Link>

//             <Link to="/logout" className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100">
//               <LogOut className="h-6 w-6" />
//             </Link>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default TopBar;



import {
  Menu,
  Search,
  LogOut,
  UserCircle,
  LayoutDashboard,
  BellRing,
  Clock,
  Home,
  Coffee,
  Plus,
} from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';

interface TopBarProps {
  onMenuClick: () => void;
  userInitials?: string;
  notificationCount?: number;
}

interface NavItem {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  showLabel?: boolean;
}

// Navigation items configuration
const NAV_ITEMS: NavItem[] = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/home', icon: Home, label: 'Home' },
  { to: '/timer', icon: Clock, label: 'Timer' },
  { to: '/coffee', icon: Coffee, label: 'Coffee' },
];

const TopBar = ({
  onMenuClick,
  userInitials = 'JD',
  notificationCount = 3
}: TopBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const NavButton = ({ to, icon: Icon, label }: NavItem) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `p-2 rounded-lg transition-colors flex items-center gap-2 ${isActive
          ? 'text-blue-600 bg-blue-50'
          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
        }`
      }
      title={label}
    >
      <Icon className="h-6 w-6" />
    </NavLink>
  );

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-10">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Toggle Menu"
          >
            <Menu className="h-8 w-8" />
          </button>

          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-64 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:text-white bg-green-50 hover:bg-green-600 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span className="hidden md:inline text-sm font-medium">New Order</span>
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {NAV_ITEMS.map((item) => (
            <NavButton key={item.to} {...item} />
          ))}

          <button className="relative p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors">
            <BellRing className="h-6 w-6" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </button>

          <Link
            to="/profile"
            className="flex items-center gap-2 p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
              {userInitials}
            </div>
          </Link>

          <Link
            to="/logout"
            className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <LogOut className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default TopBar;