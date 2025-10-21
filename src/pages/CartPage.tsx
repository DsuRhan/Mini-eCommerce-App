import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { useAuth } from "../contexts/AuthContext";

export default function CartPage() {
  const { items, total, remove, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <section className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <ErrorBoundary>
        {items.length === 0 ? (
          <div className="p-6 bg-gray-50 rounded">Cart kosong. <Link to="/products" className="text-blue-600">Belanja dulu.</Link></div>
        ) : (
          <div className="space-y-4">
            {items.map((it) => (
              <div key={it.product.id} className="flex items-center justify-between border p-3 rounded">
                <div className="flex items-center gap-4">
                  <img src={it.product.image} alt={it.product.title} className="h-12 object-contain" />
                  <div>
                    <div className="font-semibold">{it.product.title}</div>
                    <div className="text-sm text-gray-600">Qty: {it.quantity}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div>${(it.product.price * it.quantity).toFixed(2)}</div>
                  <button className="text-sm text-red-600 mt-1" onClick={() => remove(it.product.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center">
              <div>
                <button className="text-sm text-gray-600 mr-4" onClick={() => clearCart()}>
                  Clear Cart
                </button>
                <Link to="/products" className="text-sm text-blue-600">Continue Shopping</Link>
              </div>
              <div>
                <div className="font-bold">Total: ${total.toFixed(2)}</div>
                <button
                  onClick={() => {
                    if (!user) navigate("/login", { state: { from: "/checkout" } });
                    else navigate("/checkout");
                  }}
                  className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </ErrorBoundary>
    </section>
  );
}
