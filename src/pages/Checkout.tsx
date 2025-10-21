import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { OrderContext } from "../contexts/OrderContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/Toast";
import { v4 as uuidv4 } from "uuid";

export default function Checkout() {
  const cart = useContext(CartContext)!;
  const orders = useContext(OrderContext)!;
  const nav = useNavigate();
  const { push } = useToast();

  const handleConfirm = () => {
    if (cart.cart.length === 0) {
      push("Cart is empty");
      return;
    }
    const order = {
      id: uuidv4(),
      date: new Date().toISOString(),
      items: cart.cart,
      total: cart.total,
    };
    orders.addOrder(order);
    cart.clearCart();
    push("Order placed");
    nav("/orders");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <div className="mb-4 border rounded p-3">
        {cart.cart.map((it) => (
          <div key={it.id} className="flex justify-between py-2">
            <div>{it.title} x {it.quantity}</div>
            <div>${(it.price * it.quantity).toFixed(2)}</div>
          </div>
        ))}
        <div className="flex justify-between border-t pt-3 mt-3 font-bold">
          <div>Total</div>
          <div>${cart.total.toFixed(2)}</div>
        </div>
      </div>

      <button onClick={handleConfirm} className="bg-green-600 text-white px-4 py-2 rounded">
        Confirm Order
      </button>
    </div>
  );
}
