import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Settings, 
  CreditCard, 
  Package, 
  FormInput,
  LogOut
} from 'lucide-react';
import { Button } from './ui';

const Sidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Calendar, label: 'Reservations', path: '/reservations' },
    { icon: Package, label: 'Services', path: '/services' },
    { icon: CreditCard, label: 'Payments', path: '/payments' },
    { icon: FormInput, label: 'Custom Fields', path: '/custom-fields' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="w-64 bg-white h-screen fixed left-0 top-0 shadow-lg">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold text-gray-800">Auto Service Admin</h1>
      </div>
      <nav className="p-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center p-3 rounded-lg mb-2 transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="absolute bottom-0 w-full p-4 border-t">
        <Button
          variant="ghost"
          icon={LogOut}
          className="w-full justify-start text-gray-600 hover:text-red-600 hover:bg-red-50"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;