import React from 'react';
import { X } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';

interface CartItemProps {
  item: CartItemType;
  onQuantityChange: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  onQuantityChange,
  onRemove,
}) => (
  <div className="py-4 flex items-center justify-between">
    <div className="flex items-center gap-4">
      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 object-cover rounded"
      />
      <div>
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-gray-600">${item.price.toFixed(2)}</p>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <button
          onClick={() => onQuantityChange(item.id, item.quantity - 1)}
          className="px-2 py-1 bg-gray-100 rounded"
        >
          -
        </button>
        <span className="w-8 text-center">{item.quantity}</span>
        <button
          onClick={() => onQuantityChange(item.id, item.quantity + 1)}
          className="px-2 py-1 bg-gray-100 rounded"
        >
          +
        </button>
      </div>
      <button
        onClick={() => onRemove(item.id)}
        className="text-red-500"
      >
        <X size={20} />
      </button>
    </div>
  </div>
);