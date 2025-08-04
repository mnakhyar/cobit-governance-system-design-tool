import React from 'react';
import { Design } from '../services/apiService';

interface DesignStatusBarProps {
  currentDesign?: Design | null;
  isModified: boolean;
  lastSaved?: Date;
  className?: string;
}

const DesignStatusBar: React.FC<DesignStatusBarProps> = ({
  currentDesign,
  isModified,
  lastSaved,
  className = ''
}) => {
  const getStatusColor = () => {
    if (!currentDesign) return 'text-gray-500';
    if (isModified) return 'text-orange-600';
    return 'text-green-600';
  };

  const getStatusText = () => {
    if (!currentDesign) return 'New Design';
    if (isModified) return 'Modified';
    return 'Saved';
  };

  const getStatusIcon = () => {
    if (!currentDesign) return '📄';
    if (isModified) return '⚠️';
    return '✅';
  };

  return (
    <div className={`bg-white border-t border-gray-200 px-4 py-2 flex items-center justify-between text-sm ${className}`}>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <span>{getStatusIcon()}</span>
          <span className={`font-medium ${getStatusColor()}`}>
            {getStatusText()}
          </span>
        </div>
        
        {currentDesign && (
          <div className="flex items-center space-x-2">
            <span className="text-gray-500">Design:</span>
            <span className="font-medium text-gray-900">{currentDesign.name}</span>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-4">
        {lastSaved && (
          <div className="text-gray-500">
            Last saved: {lastSaved.toLocaleTimeString()}
          </div>
        )}
        
        {currentDesign && (
          <div className="text-gray-500">
            ID: {currentDesign._id?.substring(0, 8)}...
          </div>
        )}
      </div>
    </div>
  );
};

export default DesignStatusBar; 