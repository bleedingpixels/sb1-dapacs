import React from 'react';
import './Tabs.css';

export const Tabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="border-b">
      <div className="flex gap-4">
        <button
          onClick={() => onTabChange('manual')}
          className={`py-2 px-4 ${
            activeTab === 'manual'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Manual Entry
        </button>
        <button
          onClick={() => onTabChange('upload')}
          className={`py-2 px-4 ${
            activeTab === 'upload'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Upload CSV
        </button>
      </div>
    </div>
  );
};