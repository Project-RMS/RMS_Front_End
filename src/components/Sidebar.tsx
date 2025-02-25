




import { ChefHat, Users, ClipboardList, Settings, BarChart3, LogOut, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation(); // Get the current route

  const menuItems = [
    { icon: BarChart3, label: 'Table Management', path: '/' },
    { icon: ClipboardList, label: 'Menus', path: '/orders' },
    { icon: ChefHat, label: 'Inventory', path: '/kitchen' },
    { icon: Users, label: 'Staff', path: '/staff' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg border-r border-gray-200 transform transition-transform duration-300 ease-in-out z-30 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <ChefHat className="h-8 w-8 text-blue-600" />
            <h1 className="text-xl font-bold">RMS Dashboard</h1>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close Menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              onClick={onClose} // Close sidebar on click (mobile)
              className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg transition-colors ${location.pathname === item.path
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
                }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <Link
          to="/login" // Adjust this to your logout route or handle logout logic
          onClick={onClose}
          className="flex items-center gap-3 w-full px-3 py-2 text-red-600 rounded-lg hover:bg-red-50 transition-colors mt-auto absolute bottom-8"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </Link>
      </div>
    </>
  );
};

export default Sidebar;
