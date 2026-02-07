import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const {
    cart,
    removeFromCart,
    clearCart,
    increaseQty,
    decreaseQty,
  } = useContext(CartContext);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

 
  // Empty cart
   if (!cart.length) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl mb-4">Your Cart is Empty 🛒</h1>
        <Link
          to="/"
          className="bg-black text-white px-5 py-2 rounded-lg"
        >
          Go to Menu
        </Link>
      </div>
    );
  }

   // Main UI
   return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item._id}
            className="
              flex items-center justify-between
              bg-white rounded-xl shadow p-4
            "
          >
            {/* Item info */}
            <div>
              <h2 className="font-semibold">{item.name}</h2>
              <p className="text-sm text-gray-500">
                ₹{item.price}
              </p>
            </div>

            {/* Quantity controls */}
            <div className="flex items-center gap-3">

              <button
                onClick={() => decreaseQty(item._id)}
                className="w-8 h-8 border rounded hover:bg-gray-100"
              >
                −
              </button>

              <span className="font-semibold w-6 text-center">
                {item.quantity}
              </span>

              <button
                onClick={() => increaseQty(item._id)}
                className="w-8 h-8 border rounded hover:bg-gray-100"
              >
                +
              </button>

              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red-600 ml-3 text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-8 border-t pt-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">
          Total: ₹{total}
        </h2>

        <div className="space-x-3">
          <button
            onClick={clearCart}
            className="px-4 py-2 border rounded-lg"
          >
            Clear
          </button>

          <Link
            to="/checkout"
            className="bg-black text-white px-5 py-2 rounded-lg"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
