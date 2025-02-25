import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  Package,
  Users,
  Database,
  FileText,
  ChevronDown,
  Store,
  Clock,
  Printer,
  Mail,
  UserPlus,
  UserCog,
  Shield,
  BarChart,
  FileSpreadsheet,
  Receipt,
  Bell,
  ChefHat,
  Utensils,
  Timer,
  Flame,
  Thermometer,
  Sandwich,
  ScrollText,
  AlertTriangle,
  Workflow,
} from 'lucide-react';

const Settings = () => {
  const [activeSection, setActiveSection] = useState<string | null>('general');

  const settingsSections = [
    {
      id: 'general',
      title: 'General Settings',
      icon: SettingsIcon,
      items: [
        { label: 'Restaurant Information', icon: Store },
        { label: 'Business Hours', icon: Clock },
        { label: 'Receipt Printer Setup', icon: Printer },
        { label: 'Email Notifications', icon: Mail },
      ],
    },
    {
      id: 'kitchen',
      title: 'Kitchen Management',
      icon: ChefHat,
      items: [
        { 
          label: 'Kitchen Display System',
          icon: Workflow,
          description: 'Configure KDS screens and order flow'
        },
        { 
          label: 'Recipe Management',
          icon: ScrollText,
          description: 'Manage recipes, portions, and cooking instructions'
        },
        { 
          label: 'Equipment Monitoring',
          icon: Thermometer,
          description: 'Track kitchen equipment status and maintenance'
        },
        { 
          label: 'Prep Stations',
          icon: Utensils,
          description: 'Configure prep station layouts and assignments'
        },
        { 
          label: 'Cook Times',
          icon: Timer,
          description: 'Set and monitor standard cooking times'
        },
        { 
          label: 'Menu Engineering',
          icon: Sandwich,
          description: 'Optimize menu items and categories'
        },
        { 
          label: 'Quality Control',
          icon: AlertTriangle,
          description: 'Set quality standards and checkpoints'
        },
        { 
          label: 'Temperature Logs',
          icon: Flame,
          description: 'Monitor and record food temperatures'
        },
      ],
    },
    {
      id: 'inventory',
      title: 'Inventory Management',
      icon: Package,
      items: [
        { label: 'Stock Management', icon: Package },
        { label: 'Suppliers', icon: Store },
        { label: 'Low Stock Alerts', icon: Bell },
        { label: 'Purchase Orders', icon: FileText },
      ],
    },
    {
      id: 'users',
      title: 'User Management',
      icon: Users,
      items: [
        { label: 'Staff Accounts', icon: UserPlus },
        { label: 'Roles & Permissions', icon: Shield },
        { label: 'Staff Schedule', icon: Clock },
        { label: 'Performance', icon: UserCog },
      ],
    },
    {
      id: 'backup',
      title: 'Backup & Recovery',
      icon: Database,
      items: [
        { label: 'Automated Backups', icon: Database },
        { label: 'Data Export', icon: FileSpreadsheet },
        { label: 'Restore Data', icon: Database },
        { label: 'Backup History', icon: Clock },
      ],
    },
    {
      id: 'reports',
      title: 'Reports & Analytics',
      icon: FileText,
      items: [
        { label: 'Sales Reports', icon: BarChart },
        { label: 'Inventory Reports', icon: Package },
        { label: 'Staff Reports', icon: Users },
        { label: 'Financial Reports', icon: Receipt },
      ],
    },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your restaurant system settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1 space-y-2">
          {settingsSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                activeSection === section.id
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <section.icon className="h-5 w-5" />
                <span className="font-medium">{section.title}</span>
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform ${
                activeSection === section.id ? 'transform rotate-180' : ''
              }`} />
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          {settingsSections.map((section) => (
            <div
              key={section.id}
              className={`bg-white rounded-lg border border-gray-200 ${
                activeSection === section.id ? 'block' : 'hidden'
              }`}
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">{section.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {section.items.map((item) => (
                    <button
                      key={item.label}
                      className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-medium text-gray-900">{item.label}</h3>
                        <p className="text-sm text-gray-500">
                          {item.description || `Configure ${item.label.toLowerCase()}`}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;