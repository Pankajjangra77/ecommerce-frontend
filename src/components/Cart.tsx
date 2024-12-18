import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { validateDiscount, checkout } from '../services/api';
import { CartItem } from './cart/CartItem';
import { CartSummary } from './cart/CartSummary';
import { DiscountForm } from './cart/DiscountForm';
import { EmptyCart } from './cart/EmptyCart';
import { Notification } from './ui/Notification';

export const Cart: React.FC = () => {
  const { state, dispatch } = useStore();
  const [discountCode, setDiscountCode] = useState('');
  const [discountError, setDiscountError] = useState('');
  const [checkoutError, setCheckoutError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const subtotal = state.cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const discountAmount = state.currentDiscount ? subtotal * 0.1 : 0;
  const total = subtotal - discountAmount;

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity < 1) return;
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const handleRemoveItem = (id: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const handleApplyDiscount = async () => {
    if (!discountCode.trim()) {
      setDiscountError('Please enter a discount code');
      return;
    }

    try {
      const response = await validateDiscount(discountCode);
      if (response.valid) {
        dispatch({ type: 'USE_DISCOUNT', payload: discountCode });
        setDiscountCode('');
        setDiscountError('');
        setNotification({
          message: 'Discount code applied successfully!',
          type: 'success'
        });
      } else {
        setDiscountError('Invalid or already used discount code');
      }
    } catch (err) {
      setDiscountError('Failed to validate discount code');
    }
  };

  const handleCheckout = async () => {
    if (state.cart.length === 0) return;
    
    setIsProcessing(true);
    setCheckoutError('');

    try {
      const response = await checkout(
        state.cart,
        state.currentDiscount,
        subtotal,
        discountAmount,
        total
      );

      dispatch({
        type: 'PLACE_ORDER',
        payload: {
          id: response.order.order_id,
          items: [...state.cart],
          total: subtotal,
          discountCode: state.currentDiscount,
          discountAmount,
          finalTotal: total,
          date: new Date(),
        }
      });

      if (response.discount_code) {
        dispatch({
          type: 'GENERATE_DISCOUNT',
          payload: {
            code: response.discount_code,
            used: false,
            orderNumber: state.orders.length + 1
          }
        });
      }

      setNotification({
        message: `Order placed successfully! Order ID: ${response.order.order_id}`,
        type: 'success'
      });
      
    } catch (err) {
      setCheckoutError(err instanceof Error ? err.message : 'Checkout failed');
      setNotification({
        message: 'Failed to place order. Please try again.',
        type: 'error'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (state.cart.length === 0) {
    return <EmptyCart />;
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
        <div className="divide-y">
          {state.cart.map(item => (
            <CartItem
              key={item.id}
              item={item}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemoveItem}
            />
          ))}
        </div>

        <div className="mt-6 border-t pt-4">
          <DiscountForm
            discountCode={discountCode}
            onDiscountCodeChange={setDiscountCode}
            onApplyDiscount={handleApplyDiscount}
            error={discountError}
            appliedCode={state.currentDiscount}
          />

          <CartSummary
            subtotal={subtotal}
            discountAmount={discountAmount}
            total={total}
          />

          {checkoutError && (
            <p className="text-red-500 text-sm mt-4 mb-2">{checkoutError}</p>
          )}

          <button
            onClick={handleCheckout}
            disabled={isProcessing}
            className="w-full mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-blue-400"
          >
            {isProcessing ? 'Processing...' : 'Checkout'}
          </button>
        </div>
      </div>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </>
  );
};