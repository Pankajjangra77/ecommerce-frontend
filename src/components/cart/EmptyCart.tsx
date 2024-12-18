import React from 'react';
import { ShoppingBag } from 'lucide-react';

export const EmptyCart: React.FC = () => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="text-center">
      <ShoppingBag className="mx-auto mb-4 text-gray-400" size={48} />
      <p className="text-gray-600">Your cart is empty</p>
    </div>
  </div>
);