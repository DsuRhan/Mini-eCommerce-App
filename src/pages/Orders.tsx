import  { useContext } from "react";
import { OrderContext } from "../contexts/OrderContext";

export default function OrdersPage() {
  const orders = useContext(OrderContext)!;

  if (orders.orders.length === 0)
    return <div className="p-6">No orders yet. Go shopping.</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Order History</h2>
      <div className="space-y-4">
        {orders.orders
          .slice()
          .reverse()
          .map((o) => (
            <div key={o.id} className="border rounded p-4 bg-white dark:bg-gray-800">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold">Order #{o.id}</div>
                  <div className="text-sm text-gray-600">{new Date(o.date).toLocaleString()}</div>
                </div>
                <div className="font-bold">${o.total.toFixed(2)}</div>
              </div>
              <div className="mt-3">
                {o.items.map((it) => (
                  <div key={it.id} className="flex justify-between text-sm py-1">
                    <div>{it.title} x {it.quantity}</div>
                    <div>${(it.price * it.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
