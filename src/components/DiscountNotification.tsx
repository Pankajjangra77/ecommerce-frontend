import React from 'react';
import { Copy } from 'lucide-react';
import { DISCOUNT_PERCENTAGE } from '../config/constants';

interface DiscountNotificationProps {
  code: string;
  onClose: () => void;
}

export const DiscountNotification: React.FC<DiscountNotificationProps> = ({ code, onClose }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="fixed top-4 right-4 bg-white rounded-lg shadow-lg p-6 max-w-md border-l-4 border-green-500 animate-slide-in">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-800">🎉 Congratulations!</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      </div>
      <p className="text-gray-600 mb-3">
        You've earned a special {DISCOUNT_PERCENTAGE}% discount on your next order!
      </p>
      <div className="bg-gray-50 rounded-md p-3 flex items-center justify-between">
        <code className="text-lg font-mono font-semibold text-blue-600">
          {code}
        </code>
        <button
          onClick={copyToClipboard}
          className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
        >
          <Copy size={16} />
          Copy
        </button>
      </div>
    </div>
  );
}