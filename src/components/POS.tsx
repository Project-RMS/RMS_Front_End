import React, { useState } from 'react';
import {
  
  ChevronUpIcon,
  SearchIcon,
  XIcon,
  MenuIcon,
  ChartBarIcon,
  ClipboardListIcon,
  UsersIcon,
  CogIcon,
  LogoutIcon,
} from '@heroicons/react/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
  onNavigate: (page: string) => void;
  currentPage: string;
}

const POS = ({ isOpen, onClose, onToggle, onNavigate, currentPage }: SidebarProps) => {
  // State for search input and dropdowns
  const [searchQuery, setSearchQuery] = useState('');
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  // Menu categories with sub-items
  const menuCategories = [
    {
      label: 'Starters',
      path: 'starters',
      items: ['Spring Rolls', 'Garlic Bread', 'Soup of the Day'],
    },
    {
      label: 'Main Course',
      path: 'main-course',
      items: ['Grilled Chicken', 'Pasta Alfredo', 'Steak'],
    },
    {
      label: 'Desserts',
      path: 'desserts',
      items: ['Chocolate Lava Cake', 'Cheesecake', 'Ice Cream'],
    },
    {
      label: 'Beverages',
      path: 'beverages',
      items: ['Coffee', 'Lemonade', 'Wine'],
    },
  ];

  // General navigation items
  const navItems = [
    { icon: ChartBarIcon, label: 'Dashboard', path: 'dashboard' },
    { icon: ClipboardListIcon, label: 'Orders', path: 'orders' },
    { icon: UsersIcon, label: 'Staff', path: 'staff' },
    { icon: CogIcon, label: 'Settings', path: 'settings' },
  ];

  // Filter menu items based on search query
  const filteredCategories = menuCategories.map((category) => ({
    ...category,
    items: category.items.filter((item) =>
      item.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  }));

  return (
    <>
      {/* Hamburger Menu Button */}
      <button
        onClick={onToggle}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 text-gray-700 hover:text-gray-900 focus:outline-none"
      >
        {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: isOpen ? 0 : '-100%' }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className={`fixed lg:static inset-y-0 left-0 w-72 bg-white border-r border-gray-200 px-4 py-6 z-30 lg:translate-x-0`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <img src="/chef-hat.svg" alt="Chef Hat" className="h-8 w-8 text-blue-600" /> {/* Replace with your icon */}
            <h1 className="text-xl font-bold text-gray-800">RMS Dashboard</h1>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <XIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          />
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                onNavigate(item.path);
                onClose();
              }}
              className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg transition-colors ${
                currentPage === item.path
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Menu Categories */}
        <div className="mt-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase mb-2">Menu Categories</h2>
          <div className="space-y-2">
            {filteredCategories.map((category) => (
              <div key={category.label}>
                <button
                  onClick={() => {
                    setOpenCategory(openCategory === category.path ? null : category.path);
                    onNavigate(category.path);
                  }}
                  className={`flex items-center justify-between w-full px-3 py-2 rounded-lg transition-colors ${
                    currentPage === category.path
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span>{category.label}</span>
                  {openCategory === category.path ? (
                    <ChevronUpIcon className="h-5 w-5" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5" />
                  )}
                </button>
                <AnimatePresence>
                  {openCategory === category.path && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-6 space-y-1 mt-1"
                    >
                      {category.items.length > 0 ? (
                        category.items.map((item) => (
                          <li
                            key={item}
                            className="px-3 py-1 text-gray-600 hover:bg-gray-50 rounded cursor-pointer"
                            onClick={() => onClose()}
                          >
                            {item}
                          </li>
                        ))
                      ) : (
                        <li className="px-3 py-1 text-gray-400">No items found</li>
                      )}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={onClose}
          className="flex items-center gap-3 w-full px-3 py-2 text-red-600 rounded-lg hover:bg-red-50 transition-colors absolute bottom-8"
        >
          <LogoutIcon className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </motion.div>
    </>
  );
};

export default POS;