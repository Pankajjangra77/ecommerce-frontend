import { API_BASE_URL } from '../config/constants';
import { CartItem } from '../types';

// const API_BASE_URL = 'http://localhost:8000/api';

interface CheckoutData {
  items: {
    product: number;
    quantity: number;
    price: number;
  }[];
  total: number;
  discount_code?: string | null;
  discount_amount: number;
  final_total: number;
}

export const fetchProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/products/`);
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
};

export const validateDiscount = async (code: string) => {
  const response = await fetch(`${API_BASE_URL}/discount/validate/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  });
  if (!response.ok) throw new Error('Failed to validate discount code');
  return response.json();
};

export const checkout = async (cart: CartItem[], discountCode: string | null, subtotal: number, discountAmount: number, finalTotal: number) => {
  const orderData: CheckoutData = {
    items: cart.map(item => ({
      product: item.id,
      quantity: item.quantity,
      price: item.price
    })),
    total: subtotal,
    discount_code: discountCode,
    discount_amount: discountAmount,
    final_total: finalTotal
  };

  const response = await fetch(`${API_BASE_URL}/cart/checkout/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Checkout failed');
  }

  return response.json();
};