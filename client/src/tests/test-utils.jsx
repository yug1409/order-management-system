import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "../context/CartContext";

export function TestWrapper({ children }) {
  return (
    <BrowserRouter>
      <CartProvider>
        {children}
      </CartProvider>
    </BrowserRouter>
  );
}
