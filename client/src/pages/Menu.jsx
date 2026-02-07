import { useEffect, useState, useContext } from "react";
import axios from "../api/axios";
import { CartContext } from "../context/CartContext";
import MenuCard from "../components/MenuCard";
import toast from "react-hot-toast";

export default function Menu() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { addToCart } = useContext(CartContext);

  
  // Fetch Menu
  
  const fetchMenu = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get("/menu");
      setMenu(res.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load menu. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  //Add to cart + toast
  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success("Added to cart successfully 🛒");
  };

  
  // Loading Skeleton
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-64 bg-gray-200 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  
  // Error state
  
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <p className="text-red-600 text-lg mb-4">{error}</p>
        <button
          onClick={fetchMenu}
          className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Retry
        </button>
      </div>
    );
  }

 
  // Empty state
  
  if (!menu.length) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
        No menu items available
      </div>
    );
  }

 
  // Main UI
 
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center mb-10">
         Menu
        </h1>

        {/* Grid */}
        <div className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3 
          xl:grid-cols-4 
          gap-8
        ">
          {menu.map((item) => (
            <div
              key={item._id}
              className="transform hover:-translate-y-1 hover:scale-[1.02] transition duration-300"
            >
              <MenuCard
                item={item}
                onAdd={handleAddToCart}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


