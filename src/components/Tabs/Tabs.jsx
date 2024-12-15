import React from 'react';
import './Tabs.css';

export function Tabs({ activeTab, onTabChange }) {
  return (
    <div className="tabs">
      <button
        className={activeTab === 'manual' ? 'active' : ''}
        onClick={() => onTabChange('manual')}
      >
        Manual Entry
      </button>
      <button
        className={activeTab === 'csv' ? 'active' : ''}
        onClick={() => onTabChange('csv')}
      >
        CSV Upload
      </button>
    </div>
  );
}