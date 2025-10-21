import { Routes, Route, Link, NavLink, Navigate } from "react-router-dom";
import ProductsPage from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import { useAuth } from "./contexts/AuthContext";
import { useCart } from "./hooks/useCart";
import { PrivateRoute } from "./components/PrivateRoute";

export default function App() {
  const { user, logout } = useAuth();
  const { count } = useCart();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link to="/products" className="font-bold text-lg">Shopping</Link>
          <NavLink to="/products" className={({ isActive }) => isActive ? "text-blue-600" : "text-gray-600"}>Products</NavLink>
          <NavLink to="/cart" className={({ isActive }) => isActive ? "text-blue-600" : "text-gray-600"}>Cart</NavLink>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">Items: <span className="font-semibold">{count}</span></div>
          {user ? (
            <div className="flex items-center gap-3">
              <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full" />
              <div className="text-sm">
                <div className="font-medium">{user.name}</div>
              </div>
              <button onClick={logout} className="text-sm text-red-600">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="text-sm text-blue-600">Login</Link>
          )}
        </div>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<div className="p-6">Not found</div>} />
        </Routes>
      </main>
    </div>
  );
}
