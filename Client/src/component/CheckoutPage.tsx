import React from "react";
import axios from "axios";
import { useNavigate } from "react-router";

interface CartData {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
}

interface CheckoutPageProps {
    cart: CartData[];
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ cart }) => {
    const navigate = useNavigate();

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleCheckout = async () => {
        try {
            const { data } = await axios.post("http://localhost:8000/create-payment-session", {
                productList: cart
            });

            if (data.url) {
                window.location.href = data.url; // redirect to Stripe checkout
            }
        } catch (error) {
            console.error("Stripe checkout error:", error);
            alert("Payment session creation failed.");
        }
    };

    return (
        <div className="p-8 max-w-3xl mx-auto bg-white rounded-xl shadow">
            <h1 className="text-2xl font-bold mb-4">Checkout Summary</h1>

            <div className="space-y-4">
                {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center border-b pb-2">
                        <div>
                            <h3 className="font-semibold">{item.title}</h3>
                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-right font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                ))}
            </div>

            <div className="mt-6 flex justify-between text-xl font-bold border-t pt-4">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
            </div>

            <button
                onClick={handleCheckout}
                className="mt-6 w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
            >
                Proceed to Payment
            </button>
        </div>
    );
};

export default CheckoutPage;
