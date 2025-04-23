import axios from 'axios';
import React, { useState } from 'react';

interface CartItem {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
}

interface ProductCartProps {
    cart: CartItem[];
    setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const ProductCart: React.FC<ProductCartProps> = ({ cart, setCart }) => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const updateQuantity = (id: number, delta: number) => {
        setCart(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );
    };

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const { data } = await axios.post("http://localhost:8000/create-payment-session", {
                productList: cart
            });
            if (data.url) {
                window.location.href = data.url; // redirect to Stripe checkout
            }

        } catch (error) {
            setError("Payment session creation failed.");
            console.error("Stripe checkout error:", error);
        }
    }
    if (error) {
        return (
            <div className="p-8 max-w-3xl mx-auto bg-white rounded-xl shadow">
                <h1 className="text-2xl font-bold mb-4">Error</h1>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 overflow-x-auto">
                <table className="min-w-full bg-white border border-[#3a1d9b] rounded-xl shadow">
                    <thead className="bg-[#3a1d9b] text-white">
                        <tr>
                            <th className="p-4 text-left">Product</th>
                            <th className="p-4 text-center">Price</th>
                            <th className="p-4 text-center">Quantity</th>
                            <th className="p-4 text-center">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map(item => (
                            <tr key={item.id} className="border-t">
                                <td className="p-4 flex items-center gap-4">
                                    <img src={item.image} alt={item.title} className="w-16 h-16 object-contain" />
                                    <span>{item.title}</span>
                                </td>
                                <td className="p-4 text-center">${item.price.toFixed(2)}</td>
                                <td className="p-4 text-center">
                                    <div className="flex justify-center items-center gap-2">
                                        <button onClick={() => updateQuantity(item.id, -1)} className="px-2 py-1 cursor-pointer bg-[#00de99] rounded">-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, 1)} className="px-2 py-1 cursor-pointer bg-[#00de99] rounded">+</button>
                                    </div>
                                </td>
                                <td className="p-4 text-center font-semibold">${(item.price * item.quantity).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <form onSubmit={handleSubmit}>

                <div className="bg-white p-6 rounded-xl shadow h-fit">

                    <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                    {cart.map(item => (
                        <div key={item.id} className="flex justify-between mb-2">
                            <span>{item.title}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                    <hr className="my-4" />
                    <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    <button type='submit' className={`mt-4 w-full cursor-pointer ${loading
                        ? "opacity-50 cursor-not-allowed" : ""
                        } bg-[#3a1d9b] text-white font-bold py-2 rounded hover:bg-[#00de99]`}>
                        {loading ? "Loading..." : "Proceed to Payment"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductCart;
