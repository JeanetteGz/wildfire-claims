import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Setup', icon: '⚙️' },
    { path: '/inventory', label: 'Inventory', icon: '📦' },
    { path: '/documentation', label: 'Documentation', icon: '📄' },
    { path: '/submission', label: 'Submission', icon: '📨' },
    { path: '/settings', label: 'Settings', icon: '⚙️' }
  ];

  const overlay = isOpen && (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
      onClick={onClose}
    />
  );

  return (
    <>
      {overlay}
      <aside
        className={`fixed left-0 top-16 h-full bg-white dark:bg-gray-800 shadow-md z-30 transform transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 w-64`}
      >
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => onClose()}
                  className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;