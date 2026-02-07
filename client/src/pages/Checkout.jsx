import { useContext, useState } from "react";
import axios from "../api/axios";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, clearCart, cartTotal } = useContext(CartContext);
  const [form, setForm] = useState({
    customerName: "",
    address: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    
    if (!form.customerName || !form.address || !form.phone) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

    
      const items = cart.map((c) => ({
        menuItemId: c._id,
        quantity: c.quantity,
      }));

      const res = await axios.post("/orders", { ...form, items });

      clearCart();
      navigate(`/order/${res.data._id}`);
    } catch (err) {
      console.error("Order failed:", err);
      alert("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

     
      <input
        name="customerName"
        placeholder="Name"
        onChange={handleChange}
        className="border p-2 w-full mb-3 rounded"
      />

      <input
        name="address"
        placeholder="Address"
        onChange={handleChange}
        className="border p-2 w-full mb-3 rounded"
      />

      <input
        name="phone"
        placeholder="Phone"
        onChange={handleChange}
        className="border p-2 w-full mb-4 rounded"
      />

      
      <p className="font-semibold mb-4">Total: ₹{cartTotal}</p>

      <button
        onClick={submit}
        disabled={loading || cart.length === 0}
        className="bg-black text-white px-4 py-2 w-full rounded disabled:opacity-50"
      >
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
}
