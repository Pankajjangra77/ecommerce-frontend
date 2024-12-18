import React from 'react';

interface CartSummaryProps {
  subtotal: number;
  discountAmount: number;
  total: number;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  subtotal,
  discountAmount,
  total,
}) => (
  <div className="space-y-2 text-right">
    <p>
      Subtotal: <span className="font-semibold">${subtotal.toFixed(2)}</span>
    </p>
    {discountAmount > 0 && (
      <p className="text-green-600">
        Discount: -${discountAmount.toFixed(2)}
      </p>
    )}
    <p className="text-xl font-bold">
      Total: ${total.toFixed(2)}
    </p>
  </div>
);