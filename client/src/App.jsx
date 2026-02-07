import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderStatus from "./pages/OrderStatus";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import AdminDashboard from "./pages/AdminDashboard";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <CartProvider>
      {/* ✅ Toast container (must be rendered once globally) */}
      <Toaster position="top-center" />

      <BrowserRouter>
        {/* Navbar outside routes */}
        <Navbar />

        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order/:id" element={<OrderStatus />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
