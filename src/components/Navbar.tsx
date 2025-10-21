import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { Sun, Moon, ShoppingCart, LogOut } from "lucide-react";

export function Navbar() {
  const { user, ready, logout } = useContext(AuthContext)!;
  const { theme, setTheme } = useContext(ThemeContext)!;//Property 'setTheme' does not exist on type 'ThemeContextType'
  const nav = useNavigate();

  if (!ready) return null; // biar tidak flicker saat awal load

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.className = newTheme === "dark" ? "dark" : "";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleLogout = () => {
    logout();
    nav("/login");
  };

  return (
    <nav
      className={`flex items-center justify-between px-6 py-3 shadow-md sticky top-0 z-50
      ${theme === 'dark' ? "bg-white/80" : "bg-zinc-900/80"} backdrop-blur transition`}
    >
      <div className="flex items-center gap-4">
        <Link to="/home" className="font-bold text-lg hover:text-blue-600">
          🛍️ ShopSmart
        </Link>
        <Link to="/products" className="text-sm hover:text-blue-500">
          Products
        </Link>
        {user && (
          <>
            <Link to="/cart" className="text-sm hover:text-blue-500">
              Cart
            </Link>
            <Link to="/orders" className="text-sm hover:text-blue-500">
              Orders
            </Link>
          </>
        )}
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700"
        >
          {theme === "dark" ? (
            <Sun size={18} className="text-yellow-400" />
          ) : (
            <Moon size={18} className="text-gray-700" />
          )}
        </button>

        {user ? (
          <div className="flex items-center gap-3">
            <Link to="/profile" className="flex items-center gap-2">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full border border-gray-300 dark:border-zinc-700"
              />
              <span className="text-sm font-medium">{user.name}</span>
            </Link>
            <button
              onClick={handleLogout}
              className="p-2 rounded hover:bg-gray-200 dark:hover:bg-zinc-700"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Login
            </Link>
            <ShoppingCart size={20} className="text-gray-700 dark:text-gray-300" />
          </div>
        )}
      </div>
    </nav>
  );
}
