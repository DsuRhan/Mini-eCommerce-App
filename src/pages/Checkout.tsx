import { useCart } from "../hooks/useCart";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    // simulasi checkout
    alert(`Order placed: ${items.length} items - Total $${total.toFixed(2)}`);
    clearCart();
    navigate("/products");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <div className="mb-4">
        {items.map((it) => (
          <div key={it.product.id} className="flex justify-between py-2 border-b">
            <div>{it.product.title} x {it.quantity}</div>
            <div>${(it.product.price * it.quantity).toFixed(2)}</div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center py-4 border-t">
        <div className="font-bold">Total</div>
        <div className="font-bold">${total.toFixed(2)}</div>
      </div>
      <button onClick={handleCheckout} className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
        Place Order
      </button>
    </div>
  );
}
