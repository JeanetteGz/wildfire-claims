import React from 'react';

const InventoryPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Inventory</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <p className="text-gray-700 dark:text-gray-200">Manage your inventory items here.</p>
      </div>
    </div>
  );
};

export default InventoryPage;