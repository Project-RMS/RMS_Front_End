




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
  Plus // Added Plus icon for "New Order"
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface TopBarProps {
  onMenuClick: () => void;
}

const TopBar = ({ onMenuClick }: TopBarProps) => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
            aria-label="Toggle Menu"
          >
            <Menu className="h-8 w-8" />
          </button>
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>
          {/* Added New Order Link */}
          <Link
            to="/"
            className="text-gray-700 hover:text-white p-2 rounded-lg hover:bg-green-600 flex items-center gap-2 transition-colors"
            title="New Order"
          >
            <Plus className="h-6 w-6" />
            <span className="hidden md:inline text-sm font-medium">New Order</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100">
            <LayoutDashboard className="h-6 w-6" />
          </Link>

          <Link to="/home" className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100">
            <Home className="h-6 w-6" />
          </Link>

          <Link to="/timer" className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100">
            <Clock className="h-6 w-6" />
          </Link>

          <Link to="/coffee" className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100">
            <Coffee className="h-6 w-6" />
          </Link>

          <button className="relative text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100">
            <BellRing className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </button>

          <div className="flex items-center gap-4">
            <Link to="/profile" className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100">
              <UserCircle className="h-6 w-6" />
            </Link>

            <Link to="/logout" className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100">
              <LogOut className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;