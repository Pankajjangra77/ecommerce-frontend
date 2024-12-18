export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  discountCode?: string;
  discountAmount: number;
  finalTotal: number;
  date: Date;
}

export interface DiscountCode {
  code: string;
  used: boolean;
  orderNumber: number;
}