import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const location = useLocation();


  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinkClass = (path) =>
    `hover:text-gray-300 ${
      location.pathname === path ? "underline font-semibold" : ""
    }`;

  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center shadow-md">
      
      <Link to="/" className="text-xl font-bold tracking-wide">
        Order Management
      </Link>

     
      <div className="flex items-center gap-6">
        <Link to="/" className={navLinkClass("/")}>
          Menu
        </Link>

        <Link to="/cart" className={`relative ${navLinkClass("/cart")}`}>
          Cart
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-xs px-2 py-0.5 rounded-full">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
