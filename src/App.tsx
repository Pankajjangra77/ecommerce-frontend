import React from 'react';
import { StoreProvider } from './context/StoreContext';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { products } from './data/products';
import { ShoppingBag } from 'lucide-react';
import { useStore } from './context/StoreContext';
import { DiscountNotification } from './components/DiscountNotification';

function AppContent() {
  const { state, dispatch } = useStore();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <ShoppingBag className="text-blue-600" />
            E-Commerce Store
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
          <div className="lg:col-span-1">
            <Cart />
          </div>
        </div>
      </main>

      {state.latestDiscountCode && (
        <DiscountNotification
          code={state.latestDiscountCode}
          onClose={() => dispatch({ type: 'CLEAR_LATEST_DISCOUNT' })}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}

export default App;