import React, { createContext, useContext, useReducer } from 'react';
import { CartItem, Order, DiscountCode, Product } from '../types';

interface StoreState {
  cart: CartItem[];
  orders: Order[];
  discountCodes: DiscountCode[];
  currentDiscount: string | null;
  latestDiscountCode: string | null; 
}

type Action =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'PLACE_ORDER'; payload: Order }
  | { type: 'GENERATE_DISCOUNT'; payload: DiscountCode }
  | { type: 'USE_DISCOUNT'; payload: string }
  | { type: 'CLEAR_LATEST_DISCOUNT' }; 

const initialState: StoreState = {
  cart: [],
  orders: [],
  discountCodes: [],
  currentDiscount: null,
  latestDiscountCode: null, 
};

const StoreContext = createContext<{
  state: StoreState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

const storeReducer = (state: StoreState, action: Action): StoreState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };
    }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case 'PLACE_ORDER':
      return {
        ...state,
        orders: [...state.orders, action.payload],
        cart: [],
        currentDiscount: null,
      };

    case 'GENERATE_DISCOUNT':
      return {
        ...state,
        discountCodes: [...state.discountCodes, action.payload],
        latestDiscountCode: action.payload.code, 
      };

    case 'USE_DISCOUNT':
      return {
        ...state,
        currentDiscount: action.payload,
        discountCodes: state.discountCodes.map(code =>
          code.code === action.payload ? { ...code, used: true } : code
        ),
      };

    case 'CLEAR_LATEST_DISCOUNT':
      return {
        ...state,
        latestDiscountCode: null,
      };

    default:
      return state;
  }
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};