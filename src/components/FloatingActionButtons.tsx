'use client';
import { useState } from 'react';
import { 
  FiMaximize2, 
  FiMinimize2, 
  FiFilter, 
  FiMessageSquare, 
  FiEdit3, 
  FiDownload,
  FiShare2,
  FiSettings
} from 'react-icons/fi';

interface FABProps {
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onToggleFilters: () => void;
  onOpenChat: () => void;
  onAddNotes: () => void;
  onExportData: () => void;
  onShareData: () => void;
  onOpenSettings: () => void;
}

export default function FloatingActionButtons({
  isFullscreen,
  onToggleFullscreen,
  onToggleFilters,
  onOpenChat,
  onAddNotes,
  onExportData,
  onShareData,
  onOpenSettings
}: FABProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const fabItems = [
    {
      icon: FiFilter,
      label: 'Toggle Filters',
      onClick: onToggleFilters,
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      icon: FiMessageSquare,
      label: 'Open Chat',
      onClick: onOpenChat,
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      icon: FiEdit3,
      label: 'Add Notes',
      onClick: onAddNotes,
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      icon: FiDownload,
      label: 'Export Data',
      onClick: onExportData,
      color: 'bg-orange-500 hover:bg-orange-600'
    },
    {
      icon: FiShare2,
      label: 'Share Data',
      onClick: onShareData,
      color: 'bg-pink-500 hover:bg-pink-600'
    },
    {
      icon: FiSettings,
      label: 'Settings',
      onClick: onOpenSettings,
      color: 'bg-gray-500 hover:bg-gray-600'
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded FAB Menu */}
      {isExpanded && (
        <div className="mb-4 space-y-3">
          {fabItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-end gap-3 opacity-0 animate-in slide-in-from-bottom-2 fade-in-0"
              style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'forwards' }}
            >
              <span className="px-3 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm rounded-lg shadow-lg whitespace-nowrap">
                {item.label}
              </span>
              <button
                onClick={() => {
                  item.onClick();
                  setIsExpanded(false);
                }}
                className={`w-12 h-12 ${item.color} text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center`}
              >
                <item.icon size={20} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Main FAB */}
      <button
        onClick={() => {
          if (isExpanded) {
            setIsExpanded(false);
          } else {
            onToggleFullscreen();
          }
        }}
        className={`w-14 h-14 ${
          isFullscreen 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-blue-500 hover:bg-blue-600'
        } text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center`}
      >
        {isFullscreen ? <FiMinimize2 size={24} /> : <FiMaximize2 size={24} />}
      </button>

      {/* Secondary FAB for expanding menu */}
      {isFullscreen && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-12 h-12 bg-gray-600 hover:bg-gray-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center mt-3 ${
            isExpanded ? 'rotate-45' : ''
          }`}
        >
          <span className="text-xl font-bold">+</span>
        </button>
      )}
    </div>
  );
}
