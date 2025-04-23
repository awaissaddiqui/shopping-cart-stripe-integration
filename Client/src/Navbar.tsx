// src/components/Navbar.tsx
import React from "react";
import { Link } from "react-router";
import { ShoppingCart } from "lucide-react";

interface NavbarProps {
    cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount }) => {
    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-xl font-bold text-[#636bf6]">
                    MyShop
                </Link>

                {/* Cart */}
                <Link to="/cart" className="relative flex items-center text-gray-700 hover:text-[#636bf6]">
                    <ShoppingCart className="w-6 h-6" />
                    {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                            {cartCount}
                        </span>
                    )}
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
