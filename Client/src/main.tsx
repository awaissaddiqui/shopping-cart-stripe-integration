import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { BrowserRouter, Routes, Route } from 'react-router';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import ProductPage from './ProductPage';
import ProductCart from './ProductCart';
import CheckoutPage from './component/CheckoutPage';
import Navbar from './Navbar';
// import PaymentSuccess from './pages/PaymentSuccess'; // optional
// import PaymentCancel from './pages/PaymentCancel';   // optional

const stripePromise = loadStripe(import.meta.env.VITE_REACT_PUB_KEY!);

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

const App = () => {
  const [cart, setCart] = React.useState<Product[]>([]);
  const handleAddToCart = (product: Product) => {
    // console.log(product);
    setCart(prev => {
      const exists = prev.find(p => p.id === product.id);
      return exists ? prev.map(p => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p)
        : [...prev, { ...product, quantity: 1 }];
    });
  };

  return (
    <Elements stripe={stripePromise}>
      <BrowserRouter>
        <Navbar cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} />
        <Routes>
          <Route path="/" element={<ProductPage onAddToCart={handleAddToCart} />} />
          <Route path="/cart" element={<ProductCart cart={cart} setCart={setCart} />} />
          <Route path="/checkout" element={<CheckoutPage cart={cart} />} />
        </Routes>
      </BrowserRouter>

    </Elements>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
