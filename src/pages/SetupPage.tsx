import React, { useState } from 'react';

interface RoomItem {
  id: string;
  name: string;
  checked: boolean;
  items: {
    id: string;
    name: string;
    checked: boolean;
  }[];
}

const initialRooms: RoomItem[] = [
  {
    id: 'living-room',
    name: 'Living Room',
    checked: false,
    items: [
      { id: 'sofa', name: 'Sofa/Couch', checked: false },
      { id: 'tv', name: 'TV', checked: false },
      { id: 'coffee-table', name: 'Coffee Table', checked: false },
      { id: 'entertainment-center', name: 'Entertainment Center', checked: false },
      { id: 'end-tables', name: 'End Tables', checked: false },
      { id: 'lamps', name: 'Lamps', checked: false },
      { id: 'rug', name: 'Area Rug', checked: false },
      { id: 'curtains', name: 'Curtains/Blinds', checked: false },
      { id: 'decor', name: 'Wall Decor/Art', checked: false },
      { id: 'bookshelf', name: 'Bookshelf', checked: false }
    ]
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    checked: false,
    items: [
      { id: 'refrigerator', name: 'Refrigerator', checked: false },
      { id: 'stove', name: 'Stove/Oven', checked: false },
      { id: 'microwave', name: 'Microwave', checked: false },
      { id: 'dishwasher', name: 'Dishwasher', checked: false },
      { id: 'coffee-maker', name: 'Coffee Maker', checked: false },
      { id: 'toaster', name: 'Toaster', checked: false },
      { id: 'blender', name: 'Blender', checked: false },
      { id: 'pots-pans', name: 'Pots & Pans', checked: false },
      { id: 'dishes', name: 'Dishes/Utensils', checked: false },
      { id: 'table-chairs', name: 'Table & Chairs', checked: false }
    ]
  },
  {
    id: 'bedrooms',
    name: 'Bedrooms',
    checked: false,
    items: [
      { id: 'bed', name: 'Bed', checked: false },
      { id: 'mattress', name: 'Mattress', checked: false },
      { id: 'dresser', name: 'Dresser', checked: false },
      { id: 'nightstand', name: 'Nightstands', checked: false },
      { id: 'lamps', name: 'Lamps', checked: false },
      { id: 'mirror', name: 'Mirror', checked: false },
      { id: 'bedding', name: 'Bedding Sets', checked: false },
      { id: 'tv', name: 'TV', checked: false },
      { id: 'closet', name: 'Closet Items', checked: false },
      { id: 'window-treatments', name: 'Window Treatments', checked: false }
    ]
  },
  {
    id: 'bathroom',
    name: 'Bathroom',
    checked: false,
    items: [
      { id: 'towels', name: 'Towels', checked: false },
      { id: 'shower-curtain', name: 'Shower Curtain', checked: false },
      { id: 'rugs', name: 'Bath Rugs', checked: false },
      { id: 'storage', name: 'Storage Cabinet', checked: false },
      { id: 'mirror', name: 'Mirror', checked: false },
      { id: 'toiletries', name: 'Toiletries', checked: false },
      { id: 'appliances', name: 'Hair Dryer/Tools', checked: false }
    ]
  },
  {
    id: 'office',
    name: 'Home Office',
    checked: false,
    items: [
      { id: 'desk', name: 'Desk', checked: false },
      { id: 'chair', name: 'Office Chair', checked: false },
      { id: 'computer', name: 'Computer/Laptop', checked: false },
      { id: 'printer', name: 'Printer', checked: false },
      { id: 'supplies', name: 'Office Supplies', checked: false },
      { id: 'lamp', name: 'Desk Lamp', checked: false },
      { id: 'storage', name: 'Filing Cabinet', checked: false }
    ]
  },
  {
    id: 'garage',
    name: 'Garage',
    checked: false,
    items: [
      { id: 'tools', name: 'Tools', checked: false },
      { id: 'lawn-mower', name: 'Lawn Mower', checked: false },
      { id: 'outdoor-tools', name: 'Outdoor Tools', checked: false },
      { id: 'storage', name: 'Storage Units', checked: false },
      { id: 'workbench', name: 'Workbench', checked: false },
      { id: 'bikes', name: 'Bicycles', checked: false },
      { id: 'sports', name: 'Sports Equipment', checked: false }
    ]
  },
  {
    id: 'outdoor',
    name: 'Outdoor/Patio',
    checked: false,
    items: [
      { id: 'furniture', name: 'Patio Furniture', checked: false },
      { id: 'grill', name: 'Grill', checked: false },
      { id: 'decor', name: 'Outdoor Decor', checked: false },
      { id: 'lighting', name: 'Outdoor Lighting', checked: false },
      { id: 'gardening', name: 'Gardening Tools', checked: false },
      { id: 'pots', name: 'Plant Pots', checked: false }
    ]
  }
];

const SetupPage: React.FC = () => {
  const [rooms, setRooms] = useState(initialRooms);
  const [customItems, setCustomItems] = useState<{ [key: string]: string }>({});
  const [showOtherInput, setShowOtherInput] = useState<string | null>(null);

  const handleItemCheck = (roomId: string, itemId: string) => {
    setRooms(rooms.map(room => {
      if (room.id === roomId) {
        return {
          ...room,
          items: room.items.map(item => 
            item.id === itemId ? { ...item, checked: !item.checked } : item
          )
        };
      }
      return room;
    }));
  };

  const handleOtherCheck = (roomId: string) => {
    setShowOtherInput(showOtherInput === roomId ? null : roomId);
  };

  const handleAddCustomItem = (roomId: string, itemName: string) => {
    if (itemName.trim()) {
      setRooms(rooms.map(room => {
        if (room.id === roomId) {
          return {
            ...room,
            items: [
              ...room.items,
              {
                id: `custom-${Date.now()}`,
                name: itemName.trim(),
                checked: true
              }
            ]
          };
        }
        return room;
      }));
      setCustomItems({ ...customItems, [roomId]: '' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Setup Your Claim</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Room Inventory</h2>
        <div className="space-y-6">
          {rooms.map(room => (
            <div key={room.id} className="border-b dark:border-gray-700 pb-4">
              <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">{room.name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-4">
                {room.items.map(item => (
                  <div key={item.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => handleItemCheck(room.id, item.id)}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300"
                    />
                    <label className="ml-2 text-gray-700 dark:text-gray-300">{item.name}</label>
                  </div>
                ))}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={showOtherInput === room.id}
                    onChange={() => handleOtherCheck(room.id)}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300"
                  />
                  <label className="ml-2 text-gray-700 dark:text-gray-300">Other</label>
                  {showOtherInput === room.id && (
                    <div className="flex items-center ml-2">
                      <input
                        type="text"
                        value={customItems[room.id] || ''}
                        onChange={(e) => setCustomItems({
                          ...customItems,
                          [room.id]: e.target.value
                        })}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleAddCustomItem(room.id, customItems[room.id] || '');
                          }
                        }}
                        placeholder="Enter item name"
                        className="ml-2 p-1 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                      <button
                        onClick={() => handleAddCustomItem(room.id, customItems[room.id] || '')}
                        className="ml-2 px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Add
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
          Continue to Documentation
        </button>
      </div>
    </div>
  );
};

export default SetupPage;