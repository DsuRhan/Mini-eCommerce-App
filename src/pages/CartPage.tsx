import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../components/Toast";

export default function CartPage() {
  const cart = useContext(CartContext)!;
  const nav = useNavigate();
  const { push } = useToast();

  if (cart.cart.length === 0)
    return (
      <div className="p-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="mb-4">Cart kosong.</p>
          <Link to="/products" className="px-3 py-2 bg-blue-600 text-white rounded">
            Shop now
          </Link>
        </div>
      </div>
    );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <div className="space-y-3">
        {cart.cart.map((it) => (
          <div key={it.id} className="flex items-center justify-between border rounded p-3">
            <div className="flex items-center gap-3">
              <img src={it.image} alt={it.title} className="h-14 object-contain" />
              <div>
                <div className="font-semibold">{it.title}</div>
                <div className="text-sm text-gray-600">Qty: {it.quantity}</div>
              </div>
            </div>
            <div className="text-right">
              <div>${(it.price * it.quantity).toFixed(2)}</div>
              <button
                onClick={() => {
                  cart.removeFromCart(it.id);
                  push("Removed from cart");
                }}
                className="text-sm text-red-600 mt-1"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div>
          <button
            onClick={() => {
              cart.clearCart();
              push("Cart cleared");
            }}
            className="text-sm text-gray-600 mr-4"
          >
            Clear cart
          </button>
          <Link to="/products" className="text-sm text-blue-600">
            Continue shopping
          </Link>
        </div>

        <div className="text-right">
          <div className="font-bold">Total: ${cart.total.toFixed(2)}</div>
          <button
            onClick={() => {
              nav("/checkout");
            }}
            className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
