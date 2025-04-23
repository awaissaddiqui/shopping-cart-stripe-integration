import React, { useEffect, useState } from 'react';
import { Product } from './main';

interface ProductPageProps {
  onAddToCart: (product: Product) => void;
}

const ProductPage: React.FC<ProductPageProps> = ({ onAddToCart }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-[#636bf6] text-center mb-8">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ">
        {products.map(product => (
          <div key={product.id} className="bg-white  rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform">
            <img src={product.image} alt={product.title} className="w-full h-48 object-contain bg-gray-100 p-4" />
            <div className="p-4 text-center">
              <h2 className="text-lg text-[#00de99] font-semibold">{product.title}</h2>
              <p className="text-[#3a1d9b] font-bold">${product.price.toFixed(2)}</p>
              <button
                onClick={() => onAddToCart(product)}
                className="mt-4 bg-[#636bf6] cursor-pointer text-white font-bold px-6 py-3 rounded-md hover:bg-[#00de99] hover:text-[#3a1d9b]"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
