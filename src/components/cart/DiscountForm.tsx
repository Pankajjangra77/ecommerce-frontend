import React from 'react';

interface DiscountFormProps {
  discountCode: string;
  onDiscountCodeChange: (code: string) => void;
  onApplyDiscount: () => void;
  error?: string;
  appliedCode?: string | null;
}

export const DiscountForm: React.FC<DiscountFormProps> = ({
  discountCode,
  onDiscountCodeChange,
  onApplyDiscount,
  error,
  appliedCode,
}) => (
  <div>
    <div className="flex items-center gap-2 mb-4">
      <input
        type="text"
        value={discountCode}
        onChange={(e) => onDiscountCodeChange(e.target.value)}
        placeholder="Enter discount code"
        className="flex-1 px-4 py-2 border rounded"
      />
      <button
        onClick={onApplyDiscount}
        className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
      >
        Apply
      </button>
    </div>
    {error && (
      <p className="text-red-500 text-sm mb-4">{error}</p>
    )}
    {appliedCode && (
      <p className="text-green-600 mb-4">
        Discount code {appliedCode} applied!
      </p>
    )}
  </div>
);